# vue 懒加载的写法

> 在我们打包构建的时候，JavaScript的包会变得非常的大，导致首页加载时间过长，浪费流量等问题。合理的方式是我们通过路由把对应的组建进行分割，然后当路由被访问的时候才加载对应的组建，这样就会高效很多。

### 常见的几种懒加载写法

```javascript
1.resolve => require([URL], resolve),支持性好 
2.() => system.import(URL) , webpack2官网上已经声明将逐渐废除,不推荐使用
3.() => import(URL), webpack2官网推荐使用,属于es7范畴,需要配合babel的syntax-dynamic-import插件使用。
```

### vue中路由懒加载

```
routes:[
  {
    path: '/hello',
    name: 'hello',
    //懒加载
    component: resolve => require(['../components/hello'], resolve),
  }
]
```

### vue中的组建懒加载

```javascript
components: {
  test:resolve => {
    require(['../../component/test'],resolve)
  }
}
```

### vue动态传参加载

> 注意：这里需要强调的是import哪里的路由一定要字符串拼接，否则汇报错误 
>
> 需要依赖插件 syntax-dynamic-import ，

```javascript
let _import =  file =>  () => import('@/' + file)
{
    path: '/hello',
    name: 'hello',
    component: _import('components/hello')
  }
 // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
```





