###事件DOMContentLoaded和load的区别
    他们的区别是，触发的时机不一样，先触发DOMContentLoaded事件，后触发load事件。
####一.什么是DOMContentLoaded事件？
>
1.如果页面中静态的写有script标签，DOMContentLoaded事件需要等待JS执行完才触发。而script标签中的JS需要等待位于其前面的CSS的加载完成。        
2.DOMContentLoaded就是在JS（不包括动态插入的JS）执行完之后，才会触发的事件。       
3.DOMContentLoaded事件本身不会等待CSS文件、图片、iframe加载完成。      
4.它的触发时机是：加载完页面，解析完所有标签（不包括执行CSS和JS），并如规范中所说的设置interactive和执行每个静态的script标签中的JS，然后触发。
####DOM文档加载的步骤为
>
1.解析HTML结构。         
2.加载外部脚本和样式表文件。     
3.解析并执行脚本代码。        
4.DOM树构建完成。//DOMContentLoaded       
5.加载图片等外部文件。               
6.页面加载完毕。//load            
>>在第4步，会触发DOMContentLoaded事件。在第6步，触发load事件。


js原生
```     
document.addEventListener("DOMContentLoaded", function() {
   // ...代码...
}, false);

window.addEventListener("load", function() {
    // ...do more...
}, false);
```
用jQuery这么写
```
// DOMContentLoaded
$(document).ready(function() {
    // ...do more...
});

//load
$(document).load(function() {
    // ...do more...
});
```
>我们常用的jQuery的$(document).ready()方法，就是对DOMContentLoaded事件的监听（当然，其内部还会通过模拟DOMContentLoaded事件和监听onload事件来提供降级方案）。通常推荐在DOMContentLoaded事件触发的时候为DOM元素注册事件。所以尽快的让DOMContentLoaded事件触发，就意味着能够尽快让页面可交互：

>减小CSS文件体积，把单个CSS文件分成几个文件以并行加载，减少CSS对JS的阻塞时间
次要的JS文件，通过动态插入script标签来加载（动态插入的script标签不阻塞DOMContentLoaded事件的触发）
>CSS中使用的精灵图，可以利用对img的预加载，放在html中跟CSS文件一起加载