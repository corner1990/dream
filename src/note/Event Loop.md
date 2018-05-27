# Event Loop(事件循环)
    Event Loop是一个执行模型，在不同的地方，有不同的实现。浏览器和nodejs基于不同的技术实现了各自的Event Loop。
## nodejs中的 Event Loop
    要提前说明，nodejs和浏览器的Event Loop是两个有明确区分的事物，不能混为一谈。要养成看源码的习惯

- nodejs的Event是基于Libuv,而浏览器的Event Loop则在[HTML5规范中](https://www.w3.org/TR/html5/webappapis.html#event-loops)明确定义
- Libuv已经对Event Loop做出了实现。而HTML5规范中只是定义了浏览器中Event Loop的模型，具体实现由浏览器厂商实现。
- nodejs中的Event loop有两个地方可以参考nodejs[官方文档](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/), 另一个是Libuv的[官方文档](http://docs.libuv.org/en/v1.x/design.html),前者对nodejs有一个比较完整的描述，而后者则有更多的细节描述

### Event Loop的留个阶段(phase)
- nodejs中的Event loop分为6个阶段，每个阶段的作用如下（process.nextTick()在6个阶段结束的时候都会执行。后边介绍process.nextTice()）
    + timers: 执`setTimout()` 和`setInterval()`中到期的callBack。
    + I/O clallbacks： 上一轮循环中有少数I/OcallBack会被延迟到这一阶段执行
    + idle,prepare：仅内部使用
    + poll: 最为重要的阶段，执行I/O callBack，在适当的条件下会阻塞在这个阶段
    + check：执行setImmediate的callBack,([setImmediate](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setImmediate) 该方法用来把一些需要长时间运行的操作放在一个回调函数里,在浏览器完成后面的其他语句后,就立刻执行这个回调函数)
    + close callbacks：执行close事件的callback，例如scokey.on('close', fn)
```
       ┌───────────────────────┐
    ┌─>│        timers         │
    │  └──────────┬────────────┘
    │  ┌──────────┴────────────┐
    │  │     I/O callbacks     │
    │  └──────────┬────────────┘
    │  ┌──────────┴────────────┐
    │  │     idle, prepare     │
    │  └──────────┬────────────┘      ┌───────────────┐
    │  ┌──────────┴────────────┐      │   incoming:   │
    │  │         poll          │<─────┤  connections, │
    │  └──────────┬────────────┘      │   data, etc.  │
    │  ┌──────────┴────────────┐      └───────────────┘
    │  │        check          │
    │  └──────────┬────────────┘
    │  ┌──────────┴────────────┐
    └──┤    close callbacks    │
       └───────────────────────┘
```
- Event loop的每一次循环都需要依次经过上述的阶段。每个阶段都有自己的callback队列，每当进入某个阶段，都会从所属的队列中取出callback来执行。当队列为空或者被执行callback的数量达到系统的最大数量是，进入下一阶段。这留个阶段都执行完毕算一轮循环
- Event loop 的核心代码在deps/uv/src/unix/core.c
```
int uv_run(uv_loop_t* loop, uv_run_mode mode) {
  int timeout;
  int r;
  int ran_pending;

  /*
  从uv__loop_alive中我们知道event loop继续的条件是以下三者之一：
  1，有活跃的handles（libuv定义handle就是一些long-lived objects，例如tcp server这样）
  2，有活跃的request
  3，loop中的closing_handles
  */
  r = uv__loop_alive(loop);
  if (!r)
    uv__update_time(loop);

  while (r != 0 && loop->stop_flag == 0) {
    uv__update_time(loop);//更新时间变量，这个变量在uv__run_timers中会用到
    uv__run_timers(loop);//timers阶段
    ran_pending = uv__run_pending(loop);//从libuv的文档中可知，这个其实就是I/O callback阶段,ran_pending指示队列是否为空
    uv__run_idle(loop);//idle阶段
    uv__run_prepare(loop);//prepare阶段

    timeout = 0;

    /**
    设置poll阶段的超时时间，以下几种情况下超时会被设为0，这意味着此时poll阶段不会被阻塞，在下面的poll阶段我们还会详细讨论这个
    1，stop_flag不为0
    2，没有活跃的handles和request
    3，idle、I/O callback、close阶段的handle队列不为空
    否则，设为timer阶段的callback队列中，距离当前时间最近的那个
    **/    
    if ((mode == UV_RUN_ONCE && !ran_pending) || mode == UV_RUN_DEFAULT)
      timeout = uv_backend_timeout(loop);

    uv__io_poll(loop, timeout);//poll阶段
    uv__run_check(loop);//check阶段
    uv__run_closing_handles(loop);//close阶段
    //如果mode == UV_RUN_ONCE（意味着流程继续向前）时，在所有阶段结束后还会检查一次timers，这个的逻辑的原因不太明确
    
    if (mode == UV_RUN_ONCE) {
      uv__update_time(loop);
      uv__run_timers(loop);
    }

    r = uv__loop_alive(loop);
    if (mode == UV_RUN_ONCE || mode == UV_RUN_NOWAIT)
      break;
  }

  if (loop->stop_flag != 0)
    loop->stop_flag = 0;

  return r;
}
// 从上述代码可以看到event loop的六个阶段是依次执行的。值得注意的是，在UV_RUN_ONCE模式下，timers阶段在当前循环结束前还会得到一次的执行机会。
```
#### timers阶段
>   timer阶段的代码在deps/uv/src/unix/timer.c的uv__run_timers()中
```
void uv__run_timers(uv_loop_t* loop) {
  struct heap_node* heap_node;
  uv_timer_t* handle;

  for (;;) {
    heap_node = heap_min((struct heap*) &loop->timer_heap);//取出timer堆上超时时间最小的元素
    if (heap_node == NULL)
      break;
    //根据上面的元素，计算出handle的地址，head_node结构体和container_of的结合非常巧妙，值得学习
    handle = container_of(heap_node, uv_timer_t, heap_node);
    if (handle->timeout > loop->time)//如果最小的超时时间比循环运行的时间还要大，则表示没有到期的callback需要执行，此时退出timer阶段
      break;

    uv_timer_stop(handle);//将这个handle移除
    uv_timer_again(handle);//如果handle是repeat类型的，重新插入堆里
    handle->timer_cb(handle);//执行handle上的callback
  }
}
// 在timer阶段其实使用一个最小堆而不是队列来保存所有元素（其实也可以理解，因为timeout的callback是按照超时时间的顺序来调用的，并不是先进先出的队列逻辑），然后循环取出所有到期的callback执行。
```

#### I/O callbacks阶段
> I/O callbacks阶段的代码在deps/uv/src/unix/core.c的int uv__run_pending()中

```
static int uv__run_pending(uv_loop_t* loop) {
  QUEUE* q;
  QUEUE pq;
  uv__io_t* w;

  if (QUEUE_EMPTY(&loop->pending_queue))//如果队列为空则退出
    return 0;

  QUEUE_MOVE(&loop->pending_queue, &pq);//移动该队列

  while (!QUEUE_EMPTY(&pq)) {
    q = QUEUE_HEAD(&pq);//取出队列的头结点
    QUEUE_REMOVE(q);//将其移出队列
    QUEUE_INIT(q);//不再引用原来队列的元素
    w = QUEUE_DATA(q, uv__io_t, pending_queue);
    w->cb(loop, w, POLLOUT);//执行callbak直到队列为空
  }
  return 1;
}
// 根据libuv的文档，一些应该在上轮循环poll阶段执行的callback，因为某些原因不能执行，就会被延迟到这一轮的循环的I/O callbacks阶段执行。换句话说这个阶段执行的callbacks是上轮残留的。
```
#### idle和prepare阶段
> uv__run_idle()、uv__run_prepare()、uv__run_check()定义在文件deps/uv/src/unix/loop-watcher.c中，它们的逻辑非常相似，其中的实现利用了大量的宏（说实在我个人非常烦宏，它的可读性真的很差，为了那点点的性能而使用宏真是值得商榷）。

```
 void uv__run_##name(uv_loop_t* loop) {                                      
    uv_##name##_t* h;                                                         
    QUEUE queue;                                                              
    QUEUE* q;                                                                 
    QUEUE_MOVE(&loop->name##_handles, &queue);//用新的头节点取代旧的头节点，相当于将原队列移动到新队列                                
    while (!QUEUE_EMPTY(&queue)) {//当新队列不为空                                            
      q = QUEUE_HEAD(&queue);//取出新队列首元素                                                 
      h = QUEUE_DATA(q, uv_##name##_t, queue);//获取首元素中指向的handle                                
      QUEUE_REMOVE(q);//将这个元素移出新队列                                   
      QUEUE_INSERT_TAIL(&loop->name##_handles, q);//然后再插入旧队列尾部                            
      h->name##_cb(h);//执行对应的callback                                     
    }                                                                         
  } 

```

#### poll阶段
```
void uv__io_poll(uv_loop_t* loop, int timeout) {
    //...
    //处理观察者队列
    while (!QUEUE_EMPTY(&loop->watcher_queue)) {
        //...
    if (w->events == 0)
      op = UV__EPOLL_CTL_ADD;//新增监听这个事件
    else
      op = UV__EPOLL_CTL_MOD;//修改这个事件
    }
    //...
    //阻塞直到监听的事件来临，前面已经算好timeout以防uv_loop一直阻塞下去
    if (no_epoll_wait != 0 || (sigmask != 0 && no_epoll_pwait == 0)) {
      nfds = uv__epoll_pwait(loop->backend_fd,
                events,
                ARRAY_SIZE(events),
                timeout,
                sigmask);
      if (nfds == -1 && errno == ENOSYS)
        no_epoll_pwait = 1;
    } else {
      nfds = uv__epoll_wait(loop->backend_fd,
               events,
               ARRAY_SIZE(events),
               timeout);
      if (nfds == -1 && errno == ENOSYS)
        no_epoll_wait = 1;
    }
    //...
    for (i = 0; i < nfds; i++) {
        if (w == &loop->signal_io_watcher)
          have_signals = 1;
        else
          w->cb(loop, w, pe->events);//执行callback
    }
    //...
}

1.可见poll阶段的任务就是阻塞等待监听的事件来临，然后执行对应的callback，其中阻塞是带有超时时间的，以下几种情况都会使得超时时间为0
    uv_run处于UV_RUN_NOWAIT模式下
    uv_stop()被调用
    没有活跃的handles和request
    有活跃的idle handles
    有等待关闭的handles
2.如果上述都不符合，则超时时间为距离现在最近的timer；如果没有timer则poll阶段会一直阻塞下去
```

#### check阶段 
> 见上面的 idle和prepare阶段

#### close阶段
```
static void uv__run_closing_handles(uv_loop_t* loop) {
  uv_handle_t* p;
  uv_handle_t* q;

  p = loop->closing_handles;
  loop->closing_handles = NULL;

  while (p) {
    q = p->next_closing;
    uv__finish_close(p);
    p = q;
  }
}
非常浅显，就是循环关闭所有的closing handles，无需多言。其中的callback调用在uv__finish_close()中
```

#### process.nextTick在哪里 
> 文档中提到process.nextTick()不属于上面的任何一个phase，它在每个phase结束的时候都会运行。但是我们看到uv_run()中只是依次运行了6个phase的函数，并没有process.nextTick()影子，那它是怎么被驱动起来的呢？

- process.nextTick在js层面的实现
```
function nextTick(callback) {
    if (typeof callback !== 'function')
      throw new errors.TypeError('ERR_INVALID_CALLBACK');

    if (process._exiting)
      return;

    var args;
    switch (arguments.length) {
      case 1: break;
      case 2: args = [arguments[1]]; break;
      case 3: args = [arguments[1], arguments[2]]; break;
      case 4: args = [arguments[1], arguments[2], arguments[3]]; break;
      default:
        args = new Array(arguments.length - 1);
        for (var i = 1; i < arguments.length; i++)
          args[i - 1] = arguments[i];
    }

    push(new TickObject(callback, args, getDefaultTriggerAsyncId()));//将callback封装为一个对象放入队列中
  }
```

## 浏览器下的event loop
#### 执行栈与事件队列
- 当js代码执行的时候会将不同的变量存储在内存中的不同位置：堆(heap)和栈(stack)中来加以区分。其中堆中存放着对象。而栈中则存放着一些基础类型的变量以及对象的指针。
- 当我们调用一个方法的时候，js会生成一个与这个方法对应的执行环境(context)，又叫执行上下文。在这个执行华宁中存着这个方法的私有作用域，上层作用域的执行，方法的参数，这个作用域中定义的变量已经作用域的this对象。当一系列方法被一次调用的时候，因为js是单线程的，同一时间只能执行一个方法，于是这些方法被排队放在一个单独的地方。这个地方被称为栈。
- 当一个脚本第一次执行的时候，js引擎会解析这段代码，并将其中的同步代码按照执行顺序加入执行栈中，然后从头开始执行。如果当前执行的是一个方法，那么js回想执行栈中添加这个方法的执行环境，然后进入这个执行环境执行其中的代码。当这个执行环境中的代码执行完毕并返回结果以后，js会退出这个执行环境并把这个执行环境销毁，回到上一个方法的执行环境...这个过程反复进行，直到执行栈中的代码全部执行完毕。
- js引擎遇到一个异步事件后并不会一直等待其返回结果。而是会将这个事件挂起，继续执行栈中的其他任务。当一个一步事件返回结果后，js会将这个事件加入与当前执行栈不同的类外一个队列，我们称之为事件队列。被放入事件队列不会立即执行其回调，而是等待当前执行栈中所有的任务都执行完毕，主线程处于闲置状态时，主线程回去差红枣事件队列是否有任务。如果有，那么主线程会从中取出排在第一位的事件，并把这个时间对应的回调放入执行栈中，然后执行其中的同步代码...，如此循环。这个过程被称为事件循环(Event loop)

#### macro task 与 micro task
- 以上的事件循环过程是一个宏观的表述，实际上因为异步任务之间并不相同，因此他们的执行有限级也有区别。
- 不同的异步任务被分为两类：微任务(micro task) 和宏任务(macro task)
- 以下事件属于宏任务
    + `setInterval()`
    + `setTimeout()`
- 以下事件属于微任务
    + `new Promise()`
    + `new MutationObserver()`
    + `process.nextTick`
- 在一个事件循环中，异步事件返回结果后会被放到一个任务队列中。然而根据这个异步时事件的类型，这个时间实际上会被放入相对应的宏任务队列或者微任务队列中。并且当知心栈为空的时候，主线程会查看微任务是否有事件存在，如果不存在，那么再去宏任务队列中取出一个事件并把对应的回调函数放入当前执行栈。如果存在，则会依次从队列中取出事件，并将对应的回调函数放入执行栈中调用该事件。直到微任务队列为空，然后再去宏任务队列取出最前边的一个事件，进行循环调用。
```
setTimeout(function () {
    console.log(1);
});

new Promise(function(resolve,reject){
    console.log(2)
    resolve(3)
}).then(function(val){
    console.log(val);
})
结果为：
2
3
1

const interval = setInterval(() => {
  console.log('setInterval')
}, 0)

setTimeout(() => {  
  console.log('setTimeout 1')
  Promise.resolve().then(() => {
    console.log('promise 3')
  }).then(() => {
    console.log('promise 4')
  }).then(() => {
    setTimeout(() => {
      console.log('setTimeout 2')
      Promise.resolve().then(() => {
        console.log('promise 5')
      }).then(() => {
        console.log('promise 6')
      }).then(() => {
          clearInterval(interval)
      })
    }, 0)
  })
}, 0)

Promise.resolve().then(() => {
  console.log('promise 1')
}).then(() => {
  console.log('promise 2')
})

//输出结果
promise 1
promise 2
setInterval
setTimeout 1
promise 3
promise 4
setInterval // 大部分情况下2次, 少数情况下一次
setTimeout 2
promise 5
promise 6

```


