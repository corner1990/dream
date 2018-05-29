## DOM事件学习
### 什么是事件
+ 事件分为两部分：
    - 行为本身：
        + `onclick`：点击事件
        + `onmouseover`，`onmousemover(onmouserenter)`，`onmousemove`，`onmouseout(onmouseleave)`，`onmouseup`,`onmousewheel(鼠标滚动行为)` ->等等鼠标事件
        + `onfocus`,`onblur` //获取焦点和失去焦点
        + `keyup`，`keydown` //键盘按下和键盘弹起事件...
    - 事件绑定：给某一个行为绑定方法
```
//dom 一级事件绑定 行为定义在当前元素的私有属性上
var div = document.querySelector('div');
div.onclick = function(){
    alert('用户点击了div')
}
//dom 二级事件绑定 addEventListenter：这个属性石定义在当前元素的所属EventTarget这个类的原型上
div.addEventLitener('mouserover', function(){
    alert('鼠标在div上')
    }, false)
```

### 事件对象兼容处理
- 我们把函数定义的部分当做一个值赋值给元素的行为（函数表达式）
- 当我们触发元素的行为的时候，会执行对应绑定的方法
- 当我们绑定事件以后，浏览器默认给这个方法传递一个参数->事件对象(MouseEvent)
    + 事件对象是一个数据类型的值，里边保存了很多属名和属性值。这些都是记录事件对象的相关信息的
    + 以click为例,得到MouseEvent对象，该对象的原形链如下：MouseEvent --> UIEvent --> Object
    + MouseEvent记录的是页面唯一一个鼠标每一次触发时候的相关信息，和到底是在那个元素上触发没有关系
- 事件对象MouseEvent的兼容问题
    + 对象本身获取存在兼容问题，标准浏览器汇总时浏览器给方法传递参数，我们只需要定义形参e就可以获取的到(例子看下边代码-> 获取事件对象)，在IE6 ~ 8 中浏览器不会给方法传递参数，我们需要的话，需要到window.event中获取查找
    + ` var e = e || window.event`

```
//html
<div id="div" style="width: 100px;height: 100px;background: #06c;"></div>

//js
 var el = document.querySelector('#div')
    el.onclick= function(e){
        var e = e || window.event;//获取事件对象并兼容低版本浏览器
         e.target = e.target || e.srcElement;//获取事件源并兼容低版本IE
         e.pageX = e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft))
         e.pageY = e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
        console.log('e',e)
        // 打印效果如下
        // MouseEvent {isTrusted: true, screenX: 349, screenY: 164, clientX: 66, clientY: 79, …}
        //e.type: 存储的是当前鼠标触发的行为类型，上例为'click'
        //
        //e.clientX/e.clientY:当前鼠标触发带你距离当前屏幕上角的x/y轴的坐标
        //
        //e.target: 事件源，当前鼠标触发的是哪个元素，那么它存储的就是那个元素，但是在IE6~8中不存在这个属性
        (e.target的值是undefined)，我们使用e.srcElement来获取事件源
        //
        //e.pageX/e.pageY:当前鼠标触发点距离body左上角(页面第一屏幕最上端)的x/y轴的坐标，但是在IE6~8中没有这个属性，
        我们通过使用clientY+滚动的高度来获取也可以,因为浏览器的原因，需要document.documentElement || document.body
        来做个兼容
        //
        //e.preventDefault:阻止浏览器的默认行为，在IE6~8中么有这个方法，需要使用e.returnValue = false;
        e.preventDefault ? e.preventDefault() : e.returnValue = false; //阻止默认行为
        return false; //也可以阻止默认行为

        // e.stopPropagation: 阻止事件的冒泡传播，在IE6~8中不兼容，使用e.cancelBubble = true 替代
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true; //阻止事件冒泡

        // KeyboardEvent
        // e.keyCode : 当前键盘上每一个键对应的值
        // 空格键(space) -> 32
        // 删除键(Backspace) -> 8
        // 回车键(Enter) -> 13
        // 删除键(del) -> 46
        // ....
    }
```

### 事件的传播机制

- 捕获阶段：浏览器由外向内依次查找元素
- 目标阶段：当前事件源的本身操作
- 冒泡阶段：又事件源向父级依次触发相关的行为(是我们最常见的冒泡机制)
- 使用DOM0级事件绑定给元素的某一个行为绑定的方法，都是在行为触发后的冒泡阶段执行方法的
- addEventListenter方法
    + 第一个参数是行为的类型，
    + 第二个参数是给当前行为绑定的方法
    + 第三个是布尔值，控制在那个阶段发生： true--> 在捕获阶段发生； false --> 在冒泡节点发生
- 事件委托/事件代理： 利用事件的冒泡机制（触发当前元素的某个行为，它的所有父级元素的同类事件都会被触发），如果一个容器汇总有很多元素都要绑定点击事件，我们没有必要一个个的绑定，只需要给你最外层容器绑定一个点击事件即可，在这个方法执行的时候，通过事件源来进行不同的操作。

### DOM2事件基础 `addEventListener`
    我们使用DOM2事件绑定，其实是让box通过原型链一直找到EventTarget这个内置类的原型上的addEventListener方法实现的  

- DOM0级事件绑定：只能给一个元素的某一个行为绑定一次方法，第二次绑定会把前边的覆盖掉
- DOM2：可以给某一个元素的同一个行为绑定多个不同的方法
- DOM0中的行为类型，我们用DOM2一样可以绑定，而且DOM2还提供了一些DOM0没有的行为
    + DOMContentLoaded：当页面中的DOM结构（HTML结构加载完成）触发的行为
    + `window.onload=function(){}`:当页面中所有的资源都加载完成（图片、HTML结构、音视频...）才会执行的函数，并且在一个页面只能用一次，后面在写会把前边的覆盖掉，？因为他是采用DOM0级事件绑定，所以只能绑定一次
- 在标准浏览器下
    + `addEventListener`: 可以给元素的某一个行为绑定多个方法
    + `addEventListener`：元素绑定多个行为的时候，在我们触发元素行为以后，浏览器程序池会按照我们给元素绑定事件的顺序执行函数
    + `addEventListener`：事件执行的过程中，`this`始终指向当前元素
- 在非标准浏览器下
    + 没有`addEventListener`方法,使用`attachEvent`兼容
    + `el.attachEvent(eventType, fn)`:绑定方法传入两个值，第一个是事件类型（需要加前缀on，addEventListener不需要加），第二个是绑定的方法
    + `attachEvent`只能在捕获阶段运行，我们没法改变
    + `attachEvent`事件不会按照我们事件绑定的顺序执行
    + `attachEvent`绑定事件以后，我们触发事件，执行函数的时候`this`指向`window`
- 解除事件绑定
    + 标准浏览器下
        - `el.removeEventListener('click', fn1, false)`
        - 必须保证元素，事件，fn，事件执行阶段一致才能解绑成功，否则无效
    + 非标准浏览器下
        - 'el.detachEvent('onclick', fn1)'
        - 必须保证元素，事件，fn一致才能解绑成功，否则无效
        - 强调一点，目前对于IE8一下的兼容只作为了解，不深入研究，毕竟是过时的东西，没有太多的意义，时间宝贵，生命有限，且行且珍惜
- 事件池(浏览器自带)
    + 事件池：用来存储当前元素的行为绑定的方法的(浏览器)
    + 类似与一个如下表格,浏览器在绑定事件的时候会先查看元素这个行为上有没有绑定同样的方法，帮了的话不重复绑定
    + 调用的时候会按照顺序，右上而下一次调用
    + 非标准浏览器下会有顺序问题，即程序的调用时混乱的；重复问题：IE6-8可以给同一个元素的同一个行为绑定多个相同的方法

| 类型        | 方法        | 阶段  |
|: ----------- |:-----------:| -----:|
| click       | fn1         | 冒泡  |
| click       | fn2         | 冒泡  |
| click       | fn3         | 冒泡  |
| mousenter   | fn4         | 捕获  |


```
//DOM2中的事件绑定和解绑
//html
<div id="div" style="width: 100px;height: 100px;background: #06c;"></div>

//js
    var el = document.querySelector('#div')
    //同一个行为绑定多个事件
    el.addEventListener('click', fn1, false)
    el.addEventListener('click', fn2, false)
    el.addEventListener('click', fn3, false)
    //解除事件绑定
    el.removeEventListener('click', fn1, false)
    
    function fn1 (e){
        console.log('fn1')
    }
    function fn2 (e){
        console.log('fn2')
    }
    function fn3 (e){
        console.log('fn3', this)
    }
    //执行打印效果如下
    fn1
    fn2
    div#div
    //非标准浏览器下
    var el = document.getElementById('div')
    function fn1 (e){
        console.log('fn1')
    }
    function fn2 (e){
        console.log('fn2')
    }
    function fn3 (e){
        console.dir('fn3', this)
    }
    el.attachEvent('onclick', fn1)
    el.attachEvent('onclick', fn2)
    el.attachEvent('onclick', fn3)

    //打印结果如下
     [object] {location : file:///C:/Users/lixinglmf/Desktop/drupDown.html, history : [object],window : [object]...} //这里是window对象 不是el元素
     fn2 
     fn1 

     //解除事件绑定
      el.detachEvent('onclick', fn1)

```

- IE6-8下兼容问题解决之this指向
```
//html
<div id="div" style="width: 100px;height: 100px;background: #06c;"></div>

//js
var el = document.getElementById('div')
    on(el,'click', fn1)
    on(el,'click', fn1)
    on(el,'click', fn2)
    on(el,'click', fn3)
    on(el,'click', fn4)
//解除事件
//    off(el,'click', fn4)
//我们通过自定义函数来实现兼容on来实现兼容
// 绑定事件方法
function on(curEl, eventType, fn) {
        /*
        * on：处理DOM2级事件绑定的兼容性问题（绑定方法）
        * @parameter：
        * curEl：要绑定事件的元素
        * eventType：要绑定事件的类型（click, mouseover....）
        * fn: 绑定的方法
        *
        * 解决this执行问题的实现思路
        * 1.在对象上自顶一个事件池(数组)，用来保存我们要绑定的事件
        * 2.自己对传入的时间进行分装，然后存入自定义的事件池
        * 3.执行的时候，遍历事件池，找到对应的事件执行
         */
        // 判断浏览器是否支持addEventListener绑定事件
        if (window.addEventListener) {
            curEl.addEventListener(eventType, fn, false)
            return;
        }
        // 自定义事件池
        if (!curEl['myBind']) {//如果没有就执行创建
            curEl['myBind'] = [];
        }
        // 防止给一个事件绑定多次同样的方法
        var ary = curEl['myBind'],
            i = 0,
            len = ary.length;
        for(; i< len; i++) {
            var curFn = ary[i];
            if (curFn.photo == fn && curFn.eventType == eventType) {
                // 已经有相同的事件  不在进行重复绑定
                return;
            }
        }
        var tempFn = function(){
            //修正this指向curEl
            fn.call(curEl)
        }
        // 设置photo属性 移除事件的时候做判断条件
        tempFn.photo = fn;
        tempFn.eventType = eventType;
        // 将事件放入事件池
        curEl.myBind.push(tempFn)
        // tempFn.
        // 不支持addEventListener，我们手动写兼容
        curEl.attachEvent('on' + eventType, tempFn)
    }
    // 解除事件方法
    function off(curEl, eventType, fn) {
        /*
        * off：处理DOM2级事件绑定的兼容性问题（解除方法）
        * @parameter：
        * curEl：要绑定事件的元素
        * eventType：要绑定事件的类型（click, mouseover....）
        * fn: 绑定的方法
        *
        * 解决this执行问题的实现思路
        * 1.在对象上自顶一个事件池(数组)，用来保存我们要绑定的事件
        * 2.自己对传入的时间进行分装，然后存入自定义的事件池
        * 3.执行的时候，遍历事件池，找到对应的事件执行
         */
        if (window.addEventListener) {
            curEl.removeEventListener(eventType, fn, false)
            return;
        }
        // 兼容处理移除事件
        if (!curEl['myBind']) return;//如果没有 直接返回
         
         var ary = curEl['myBind'],//得到事件池
            i = 0,
            len = ary.length;
        for (; i < len; i++) {
            var curFn = ary[i];
            if (curFn.photo == fn && curFn.eventType == eventType) {//如果两个函数相同 则移除事件，退出循环
                ary.splice(i, 1);
                curEl.detachEvent('on'+ eventType, curFn)
                break;
            }
        }
    }
```

- 解决执行顺序，this执行，防止重复绑定事件，并兼容处理event对象
```
 // 绑定事件方法
    // 
    function on(curEl, eventType, fn) {
        /*
        * on：处理DOM2级事件绑定的兼容性问题（绑定方法）
        * @parameter：
        * curEl：要绑定事件的元素
        * eventType：要绑定事件的类型（click, mouseover....）
        * fn: 绑定的方法
        *
        * 解决this指向，执行顺序，兼容性检查问题的实现思路
        * 1.在对象上自顶一个事件池(数组：使用myEvent+eventType命名)，用来保存我们要绑定的事件
        * 2.绑定一个事件默认执行函数run
        * 3.执行run方法的时候的时候，遍历事件池，执行事件并修改this指向，
         */
        // 判断浏览器是否支持addEventListener绑定事件
        if (window.addEventListener) {
            curEl.addEventListener(eventType, fn, false)
            return;
        }
        // 自定义事件池
        if (!curEl['myBind'+eventType]) {//如果没有就执行创建
            curEl['myBind'+eventType] = [];
            
            // 不支持addEventListener，我们手动写兼容
            curEl.attachEvent('on' + eventType, run)
        }
        // 防止给一个事件绑定多次同样的方法
        var ary = curEl['myBind'+eventType],
            i = 0,
            len = ary.length;
        for(; i< len; i++) {
            var curFn = ary[i];
            if (curFn == fn ) {
                // 已经有相同的事件  不在进行重复绑定
                return;
            }
        }
        
        // 将事件放入事件池
        ary.push(fn)
        // tempFn.
        //定义一个run方法 里边处理兼容和解决this，执行顺序的问题
        function run (e){
            var e = e || window.event;
            var flag = e.target ? true : false;// ie6-8不支持e.tatget
            if(!flag){
                // 如果是非标准浏览器 进行兼容处理
                e.target = e.target || e.srcElement;
                e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft);
                e.pageY = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop);
                e.preventDefault = function () {
                    e.returnValue = false;
                }
                e.stopPropagation = function () {
                    e.cancelBubble = true;
                }
            }
            // 获取事件类型 然后调用
            var ary = e.target['myBind'+e.type],
                i = 0,
                len = ary.length;
            for(; i< len; i++) {
                var curFn = ary[i];
                curFn.call(e.target, e)
            }
        }
    }
    // 解除事件方法
    function off(curEl, eventType, fn) {
        /*
        * off：处理DOM2级事件绑定的兼容性问题（解除方法）
        * @parameter：
        * curEl：要绑定事件的元素
        * eventType：要绑定事件的类型（click, mouseover....）
        * fn: 绑定的方法
        *
        * 移除事件思路
        * 1.通过curEl['myBing'+eventType] 得到事件池
        * 2.遍历事件池，和传入的fn作对比，如果相同，则移除当前函数，跳出循环
         */
        if (window.addEventListener) {
            curEl.removeEventListener(eventType, fn, false)
            return;
        }
        // 兼容处理移除事件
        if (!curEl['myBind'+eventType]) return;//如果没有 直接返回
         
         var ary = curEl['myBind'+eventType],//得到事件池
            i = 0,
            len = ary.length;
        for (; i < len; i++) {
            var curFn = ary[i];
            if (curFn == fn) {//如果两个函数相同 则移除事件，退出循环
                ary.splice(i, 1);
                curEl.detachEvent('on'+ eventType, curFn)
                break;
            }
        }
    }

    var el = document.getElementById('div')
    on(el,'click', fn4)
    on(el,'click', fn1)
    on(el,'click', fn1)
    on(el,'click', fn2)
    on(el,'click', fn3)

    off(el,'click', fn3)
```




















































































