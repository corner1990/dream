# JS处理文件流

> 最近做一个项目，遇到了一个问题，就是导出Excel功能。多普通呀，多大众化，哪里都有，可惜我们后台说给我JSON数据，自己处理。我果断拒绝了，拒绝的里有是我菜，实现不了啊。然后后台开发看不下去了，就是转成文件流给我吧。他们那里是分布式部署，也没有办法持久化存储。遂发生了一下的故事

### 百度

> 没有怎么做过，肯定是百度啦，然后找打了一段代码,代码内容如下

```javascript
function download() {
	    var xmlResquest = new XMLHttpRequest();
	    xmlResquest.open("POST", "/eksoft/fileUpload/download", true);
	    xmlResquest.setRequestHeader("Content-type", "application/json");
	    xmlResquest.setRequestHeader("Authorization", "Bearer 6cda86e3-ba1c-4737-972c-f815304932ee");
	    xmlResquest.responseType = "blob";
	    xmlResquest.onload = function (oEvent) {

	    var content = xmlResquest.response;
	    var elink = document.createElement('a');
	    elink.download = "test.xlsx";
	    elink.style.display = 'none';
	    var blob = new Blob([content]);
	    elink.href = URL.createObjectURL(blob);
	    document.body.appendChild(elink);
	     elink.click();
	    document.body.removeChild(elink);
	    };
	     xmlResquest.send();
}
```

- 简单的分析了一下，自己有用的代码如下：

```javascript
var content = 'content';
var elink = document.createElement('a');
var blob = new Blob([content]);
	elink.download = "test.xlsx";
	elink.style.display = 'none';
	elink.href = URL.createObjectURL(blob);
	elink.click();
	
```

- 看到这里，发现有两个不认识的api，果断去mdn取经

### `createObjectURL`

-   `URL.createObjectURL()`, 静态方法，会创建一个`DOMString`,其中包含一个表示参数中给出的对象URL。这个URL的生命周期和创建他的窗口中的`document`绑定，这个新的URL对象表示`File`对象或者`Blob`对象。
- 语法：`objectURL = URL.createObjectURL(blob);`

### `revokeObjectURL`

- `URL.revokeObjectURL`静态方法。 来释放之前通过调用`createObjectURL`创建的已经存在的对象。当结束使用某个URL对象时，应该通过这个方法来访浏览器知道不再需要这个文件的引用了。
- 语法：`window.URL.revokeObjectURL(objectURL);` bjectURL: 是一个 `DOMString`，表示通过调用 `URL.createObjectURL` 方法产生的 URL 对象

### DOMString

- **DOMString** 是一个UTF-16字符串。由于JavaScript已经使用了这样的字符串，所以DOMString 直接映射到 一个`String`。
- 将 `null`传递给接受DOMString的方法或参数时通常会把其stringifies为“null”。

### 动手改造阶段

- 通过有了以上的条件，具备了自己动手改造的条件。
- 我的思路如下，
  - 通过fetch请求拿到数据流
  - 将下载的代码封装为一个函数
  - 将下载拿到的文件流直接传入该函数
  - 函数内部处理下载，然后删除该链接

```javascript
/**
 * 导出文件工具方法
 * 需要将返回的文件流对象直接传入,
 * 如果没有数据， 返回一个对象
 */
export let exportFile = (data, name = 'name') => {
	return data.blob().then((blob) => {
		if (blob.type.endsWith('/html')) {
			return {
				msg: "暂无数据"
			}
		}
		let downloadUrl = window.URL.createObjectURL(blob);
		let anchor = document.createElement("a");
		let filename = data.headers.get('Content-Disposition');
		anchor.href = downloadUrl;
		anchor.download = filename.replace('filename=', '');
		anchor.click();
		window.URL.revokeObjectURL(blob);
	})
}

```

- 改造后的方法如上，在本地实现了文件流保存到磁盘。
- 但是我代码到生产环境的时候发现fetch的response的type变了，在本地，response.type是base, 但是在线上去成了cors,嗯么么，具体别的没有感受到区别，就是报错了
- 到了这里，当然是检查自己的代码...ok，检查响应头....ok,百度... 没有类似的情况。找后端同事商量.....没有个所以然，  然后回头仔细看了一眼代码，提示filename.replace没有这个方法，索性自己慢慢的使用console.log查看，就是无法从data.headers中拿到文件描述了，然后在下载赋值文件名的时候报错了。
- 遂自己和后台商量了一下，采用简单的规则，我自己本地指定文件名，不读取相应头了。更在如下

```javascript
/**
 * 导出文件工具方法
 * 需要将返回的文件流对象直接传入,
 * 如果没有数据， 返回一个对象
 * 文件命名规范为手动传入一个文件名，然后加上日期，时分秒
 */
export let exportFile = (data, name = 'name') => {
	return data.blob().then((blob) => {
		if (blob.type.endsWith('/html')) {
			return {
				msg: "暂无数据"
			}
		}
		let downloadUrl = window.URL.createObjectURL(blob);
		let anchor = document.createElement("a");
		anchor.href = downloadUrl;

		anchor.download = `${name}${Format(new Date(), 'yyyyMMddhhmmss')}.csv`;
		anchor.click();
		window.URL.revokeObjectURL(blob);
	})
	

}

```

### 总结

> 到了这里，简单的文件处理就结束了，后台又差了一下，说这个会有兼容性问题，然后有一段处理兼容的代码，我这里目前没有管ie，遂没有验证，但是还是把代码贴过来，留着总是好的

```javascript
   if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename);
    } else {

    var a = document.createElement('a');
     blob.type = "application/excel";
     var url = createObjectURL(blob);
     a.href = url;
     a.download = filename;
     a.click();
     window.URL.revokeObjectURL(url);
    }
```

