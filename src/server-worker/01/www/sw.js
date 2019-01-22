// serviceWorker
// 增加缓存
/* 
这里我们 新增了一个 install 事件监听器，接着在事件上接了一个 ExtendableEvent.waitUntil() 方法——这会确保 Service Worker 
不会在 waitUntil() 里面的代码执行完毕之前安装完成。
在 waitUntil() 内，我们使用了 caches.open() 方法来创建了一个叫做 v1 的新的缓存，将会是我们的站点资源缓存的第一个版本。它返回了一个创建缓存的 promise，
当它 resolved 的时候，我们接着会调用在创建的缓存示例上的一个方法 addAll()，这个方法的参数是一个由一组相对于 origin 的 URL 组成的数组，
这些 URL 就是你想缓存的资源的列表。
如果 promise 被 rejected，安装就会失败，这个 worker 不会做任何事情。这也是可以的，因为你可以修复你的代码，在下次注册发生的时候，又可以进行尝试。
当安装成功完成之后，Service Worker 就会激活。在第一次你的 Service Worker 注册／激活时，这并不会有什么不同。但是当 Service Worker 更新的时候 ，就不太一样了。
*/

/* install 的优点是第二次访问即可离线，缺点是需要将需要缓存的 URL 在编译时插入到脚本中，增加代码量和降低可维护性； */
// this.addEventListener('install', function (e) {
//     e.waitUntil(
//         caches.open('test-cache-v1').then(function (cache) {
//             return cache.addAll([
//                 '/',
//                 '/index.html',
//                 '/index.js'
//             ])
//         })
//     )
// })


// 自定义请求响应
/* 
每次任何被 Service Worker 控制的资源被请求到时，都会触发 fetch 事件，这些资源包括了指定的 scope 内的 html 文档，
和这些 html 文档内引用的其他任何资源（比如 index.html 发起了一个跨域的请求来嵌入一个图片，这个也会通过 Service Worker），
这下 Service Worker 代理服务器的形象开始慢慢露出来了，而这个代理服务器的钩子就是凭借 scope 和 fetch 事件两大利器就能把站点的请求管理的井井有条。
*/

// this.addEventListener('fetch', function (event) {
//     /*  fetch 的优点是无需更改编译过程，也不会产生额外的流量，缺点是需要多一次访问才能离线可用。 */
//     console.log('tetetetee fetchfetchfetchfetch', event)
//     event.respondWith(
//         caches.match(e.request).then(function (res) {
//             // 检测是否又缓存，有的话直接从缓存中读取文件，不请求后台
//             if (res) {
//                 return res
//             }

//             // 如果service worker缓存中灭有，那就发起一个请求
//             var request = e.request.clone()
//             return fetch(request).then(function (res) {
//                 // 劫持到请求
//                 // 请求失败了，直接返回失败的结果就好了。。
//                 if (!httpRes || httpRes.status !== 200) {
//                     return httpRes;
//                 }

//                 // 请求成功的话，将文件加入缓存
//                 var responseClone = res.clone()
//                 caches.open('test-cache-v1').then(function (cache) {
//                     cache.put(e.request, responseClone)
//                 })

//             })
//         })
//     )
// })
// this.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request).then(function (response) {
//             // 来来来，代理可以搞一些代理的事情

//             // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
//             if (response) {
//                 return response;
//             }

//             // 如果 service worker 没有返回，那就得直接请求真实远程服务
//             var request = event.request.clone(); // 把原始请求拷过来
//             return fetch(request).then(function (httpRes) {

//                 // http请求的返回已被抓到，可以处置了。

//                 // 请求失败了，直接返回失败的结果就好了。。
//                 if (!httpRes || httpRes.status !== 200) {
//                     return httpRes;
//                 }

//                 // 请求成功的话，将请求缓存起来。
//                 var responseClone = httpRes.clone();
//                 caches.open('test-cache-v1').then(function (cache) {
//                     cache.put(event.request, responseClone);
//                 });

//                 return httpRes;
//             });
//         })
//     );
// });





//缓存仓库名字
var cacheStorageKey = 'minimal-pwa-8'  

//需要缓存的文件
var cacheList = [
  "/",
  "index.html",
  "main.css",
  "e.png",
  "pwa-fonts.png"
]
//处理安装事件
self.addEventListener('install', function(e) {
  console.log('service 缓存!')
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('添加到缓存列表:', cacheList)
      return cache.addAll(cacheList)
    }).then(function() {
      console.log('跳过等待!')
      return self.skipWaiting()
    }).catch(err => {console.log('err', err)})
  )
})


//处理activate事件
self.addEventListener('activate', function(e) {
  console.log('激活缓存')

  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        console.log('cacheNames', cacheNames)
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      console.log('Clients claims.')
      return self.clients.claim()
    })
  )
})

//处理fetch事件
self.addEventListener('fetch', function(e) {
  console.log('Fetch event:', e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        console.log('Using cache for:', e.request.url)
        return response
      }
      console.log('Fallback to fetch:', e.request.url)
      return fetch(e.request.url)
    })
  )
})








