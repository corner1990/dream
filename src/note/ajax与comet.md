# Ajax与Comet
	ajax（Asynchronous Javascript + XML）。能够页面无刷新而向服务器发送请求。
	ajax的核心是xmlHttpRequest对象；
	
## XMLHttpRequest对象

- 创建XMLHttpRequest对象

```
function createXHR(){
	var xhr = null;
	if(XMLHttpRequest){
		xhr = new XMLHttpRequest()
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
}
//新建一个对象
var xhr = createXHR()
```

- xhr的用法
	+ open(),它接收三个参数
		- 发送的请求类型 get、post等
		- 请求的URL
		- 表示是否异步的布尔值  
	+ send(),发送请求时调用
		- 接受一个参数，即要作为请求主体发送的数据，如果不需要通过请求主体发送数据，则必须传入Null
	+ 服务器返回的XHR对象属性
		- responseText：作为响应主体被返回的文本
		- responseXML：如果响应的呢容是‘text/html’ 或者 ‘application/xml’，这个属性将包含着响应数据服务的XML DOM 文档
		- status ： 响应的HTTP状态
		- statusText： HTTP状态说明  
	+ 接收到响应后的操作
		- 检查status状态，已确定响应已经成功返回
			+ 200 成功返回，
			+ 304 表示请求的资源并没有被修改，可以直接使用浏览器中缓存的版本
	+ xhr对象的readyState属性，表示请求/响应过程的当前状态，有以下几个阶段
		- 0：未初始化；没有调用open()方法
		- 1：启动；已调用open()方法，但尚未调用send()方法
		- 2：发送；已经调用send()方法，但尚未接受到回应
		- 3：接受；已经接受到部分响应数据
		- 4：完成；已经接受到全部的响应数据，而且已经可以在客户端使用了
	
				
```


//检查返回状态
if(xhr.readyState == 4){
	if( (xhr.status >= 200 && <= 300) || xhr.status == 304 ){
		console.info(xht.responseText)
	}else{
		console.warn('Request was unsuccessfun:'+ xhr.status )
	}
}
// 打开一个请求
xhr.open('get','example.php',true)
//发送请求
xhr.send(null)

//注：URL是相对于执行代码的当前页面（也可以使用绝对路径）；调用open方法，并不会真正的发送请求，而只是启动一个请求，以备发送。
// 发送的请求只能在同一个域中使用相同端口和协议的URL，如果不是相同的端口，协议，都会引发安全问题而报错
// 必须在调用open()之前指定onreadystatechange事件处理程序才能确保跨浏览器兼容性。
```  

- HTTP头部信息
	+	每个HTTP请求和响应都会带有相应的头部信息，XHR对象提供了操作这两种头部（即请求头部和响应头部）信息的方法。  

	+ Accpet：浏览器能够处理的内容
	+ Accpet-Charset：浏览器能够显示的字符集。
	+ Accept-Encoding：浏览器能够处理的压缩编码。
	+ Accept-Language：浏览器当前设置的语言
	+ Connection：浏览器与服务器之间连接的类型
	+ Cookie：当前页面设置的任何cookie
	+ Host：发出的请求页面所在的域
	+ Referrer：发出请求页面的URI	。
	+ user-Agent：浏览器的用户代理字符串。  
	
```

function createXHR(){
	var xhr = null;
	if(XMLHttpRequest){
		xhr = new XMLHttpRequest()
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
}

var xhr = createXHR();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if( (xhr.status >= 200 && <= 300) || xhr.status == 304 ){
			console.info(xht.responseText)
		}else{
			console.warn('Request was unsuccessfun:'+ xhr.status )
		}
	}

}
xhr.open('get','localhost/reg.php',true);
xhr.setRequestHeader('myHeader','val')
xhr.send();

```

- GET请求
	+ get是最常见的类型，最长用于想服务器查询某些信息。
	+ 必要时，可以将查询字符串蚕食追加到URL末尾后边，以便将信息传给服务器
	+ 使用get请求要注意查询字符串格式。查询字符串每个参数的名称和值都必须使用encodeURIComponent()进行编码，然后才能放到URL的末尾，并且所有的名-值对都必须使用&号分割
	
```
//这样追加值
xhr.open('get','localhost/reg.php?name=val&age=12',true)

function addURLParm(url,obj){
	var obj = obj,
	url = url;
	for(var name in obj){
		url += url.indexOf('?') == -1 ? '?' : '&';
		url += encodeURICompotent(name) +'='+ encodeURICompotent(obj[name])
	}

	return url;

}

// 使用函数追加字符串可以确保格式良好
```

- POST请求  
>	通常用于向服务器发送应该被保存的数据 `xhr.open('post',url,true)`  



	+ post请求把数据作为请求主体
	+ 初始化post请求，在open第一个参数传入post
	+ 发送数据传入 `send()` 方法
	+ post请求需要设置请求头 `xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')`
	+ 向服务器发送数据
	
```
function createXHR(){
	var xhr = null;
	if(XMLHttpRequest){
		xhr = new XMLHttpRequest()
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return xhr
}

var xhr = createXHR();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if( (xhr.status >= 200 && <= 300) || xhr.status == 304 ){
			console.info(xht.responseText)
		}else{
			console.warn('Request was unsuccessfun:'+ xhr.status )
		}
	}

}
xhr.open('post','localhost/reg.php',true);
xhr.setRequestHeader('Content-Type','x-www-from-urlencoded;charset=UTF-8');
var form = document.getElementById('form');
xhr.send(serialize(form));

function  serialize(el) {
			// body...
			var el = el,
				parts = [],
				field = null,
				i,
				len,
				j,
				optLen,
				option,
				optVal;

			for( i=0,len = el.elements.length ; i < len; i++){
				field = el.elements[i];
				
				switch(field.type){
					case 'select-one':
					case 'select-multiple':
					if(field.name.length){
						for(j =0,optLen = field.options.length; j < optLen; j++){
							option = field.options[j];
							if(option.selected){
								optVal = '';
								if(option.hasAttribute){
									optVal = (option.hasAttribute('value') ?
										option.value : option.text)
								}else{
									optVal = (option.attributes('value').specified ?
										option.value : option.text)
								}
							}
							parts.push(encodeURIComponent(field.name)+'='+encodeURIComponent(optVal))
						}
					}
					break;
					case undefined: //字符集
					case 'file': // 文件输入
					case 'submit': //提交按钮
					case 'reset'://重置按钮
					case 'radio'://单选框
					case 'checkbox'://复选框
						if(!field.checked){
							break;
						}
					default:
						//不包含没有名字的字段
						if(field.name.length){
							parts.push(encodeURIComponent(field.name)+'='+
								encodeURIComponent(field.value))
						}
				}
				
			}
		
			return parts.join('&')
		}
```

### XMLHttpRrquest2级
	XMLHttpRequest1级只是把已有的XHR对象的实现细节描述了出来，而XMLHttpRquest2则进一步发展了XHR

- FormData

> 在web应用中频繁的使用一项功能就是数据序列化，XMLHttpRequest2 为此定义了FormData类型。

```
//新建FormData对象
var data = new FormData();

//添加数据 接受两个参数：键和值
data.append('name','leo');

// 也可以用表单元素的数据预先填入键值对
var data2 = new FromData(document.form[0])

//创建后可以发给xhr.send()
function createXHR(){
	var xhr = null;
	if(XMLHttpRequest){
		xhr = new XMLHttpRequest()
	}else{
		xhr = new ActiveXObject('Microsoft.XMLHTTP');
	}
	return xhr
}

var xhr = createXHR();
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if( (xhr.status >= 200 && <= 300) || xhr.status == 304 ){
			console.info(xht.responseText)
		}else{
			console.warn('Request was unsuccessfun:'+ xhr.status )
		}
	}

}
xhr.open('post','localhost/reg.php',true);
xhr.setRequestHeader('Content-Type','x-www-from-urlencoded;charset=UTF-8');
var form = document.getElementById('form');
xhr.send(new FormData(document.forms[0]】));

```

- 超时设定
> IE8给XHR对象添加了一个timeout 属性，表示请求在等待响应多少毫秒之后会被终止，后来被XMLHttpRequest2收入到规范中来

```
xhr.open('post','localhost/reg.php',true);
xhr.setRequestHeader('Content-Type','x-www-from-urlencoded;charset=UTF-8');
xhr.timeout = 1000;//设置超时时间为1秒钟
xht.tiemout = function(){
	alert('链接超时')
}

var form = document.getElementById('form');
xhr.send(new FormData(document.forms[0]】));
```

### overrideMimeType()方法
	用于重写XHR相应的MIME类型，这个方法也被纳入了XMLHttpReauest2级规范
	
`xhr.overrideMimeType('text/html')`

- 调用 `overrideMimeType()` 方法必须在 `send()` 方法调用之前

### 进度事件
	Progress Events规范是W3C的一个工作草案，定义了客户端于服务器通信的有关事件，主要针对XHR操作，
	目前邮6个进度事件
	
- loadstart ： 在接受到响应数据的第一个字节是触发
- Progress ： 在接受响应期间持续不断的触发
- error ：在请求发生错误时触发
- abort ：在因为调用 `abort()` 方法终止链接是触发
- load ： 在接收到完整响应数据时触发
- loadend： 在通信完成或者触发 error，abort或者load时间后触发

```
	//html
	<form action="#" onsubmit="return false" class="form">
			<input type="text" name="name" id="" value="name">
			<input type="text" name="pwd" id="" value="pwd">
			<input type="text" name="email" id="" value="email">
		</form>
	<div class="status"></div>
	
	//load 事件
	function createXHR(){
		var xhr = null;
		if(XMLHttpRequest){
			xhr = new XMLHttpRequest()
		}else{
			xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
	
		return xhr
	}
	
	var xhr = createXHR();
	console.log(xhr)
	
	xhr.onload = function(){
		if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 3004){
			console.log(xhr.responseText)
		}else{
			console.log('报错啦')
		}
	}
	
	xhr.onprogress = function(){
		var divStatus = document.querySelector('.status');
		if(event.lengthComputable){
			console.log(event)
			divStatus.innerHTML = event.total+ 'bytes';
		}
	}
	xhr.open('get','/crumb/zidingyishijian.html',true);
	xhr.send()

```

## 跨域资源共享（Cross-Origin-Resource-Sharing）
	通过XHR实现Ajax通信的一个主要限制，来源于跨域安全策略。默认情况下，XHR对象只能访问与包含
	他的页面位于同一个域的资源。
	CORS是w3c的一个工作草案，定义了在必须访问跨域资源时，浏览器与服务器应该如何沟通。
	CORS思想：就是使用自定义的HTTP头部让浏览器于服务器沟通，从而决定请求或响应的成功/失败。
	
-	CORS 简单的实例

```

//如果服务器可以接受这个请求，就在 Access-Contorol-Allow-Origin 头部中回发相同的远信息
origin:http//:www.baidu.com

Access-Contorol-Allow-Origin:http//:www.baidu.com

```

- IE 对CORS的实现
	+ 在IE中引入了XHR（XDomainRequest）类型。这个对象与XHR类似，但能实现安全可靠的跨域通信。
	+ XDR对象的安全机制部分实现了w3c的CORS规范。
	+ XDR 与 XHR的不同
		- cookie 不会随请求发送，也不会随响应返回
		- 只能设置请求头部信息中的Content-Type 字段
		- 不能范文响应头部信息
		- 只支持 get 和 post 请求




	
	





	