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
	
###	CORS 简单的实例

```

//如果服务器可以接受这个请求，就在 Access-Contorol-Allow-Origin 头部中回发相同的远信息
origin:http//:www.baidu.com

Access-Contorol-Allow-Origin:http//:www.baidu.com

```

### IE 对CORS的实现
+ 在IE中引入了XHR（XDomainRequest）类型。这个对象与XHR类似，但能实现安全可靠的跨域通信。
+ XDR对象的安全机制部分实现了w3c的CORS规范。
+ XDR 与 XHR的不同
	- cookie 不会随请求发送，也不会随响应返回
	- 只能设置请求头部信息中的Content-Type 字段
	- 不能范文响应头部信息
	- 只支持 get 和 post 请求
	
	
		
```
//CORS
var xdr = new XDomainRwquest();
	xdr.onload = function(){
		console.log(xdr.responseText)
	}

	xdr.open('get','localhost');
	xdr.send(null);
//xdr接受到响应后，只能访问文本，没有办法确定状态，而且子还要响应邮效就会触发load事件，

//错误处理
//xdr 同样可以使用xdr.abort() 终止请求，timeout来设置请求超时，设置

var xdr = new XDomainRwquest();
	xdr.onload = function(){
		console.log(xdr.responseText)
	}

	xdr.onerror = function(){
		console.log('An Error occurrend')
	}

	xdr.timeout = 2000;
	xdr.ontimeout = function(){
		console.log('Request took too long')
	}

	xdr.open('get','localhost');
	xdr.contentType = 'appliaction/x-www-from-urlencoded';
	xdr.send(null);
	
```

### 其他浏览器对CORS的实现
	Firefox.3.5+,Safair4+,chrome,IOS版Safari和Android平台中的Webkit都通过XMLHttpRequest对象实现了CORS的原生支持。
	
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
		try{
			if( (xhr.status >= 200 && <= 300) || xhr.status == 304 ){
				console.info(xht.responseText)
			}else{
				console.warn('Request was unsuccessfun:'+ xhr.status )
			}
		}catch(ex){
			//由 ontimeout时间处理程序处理

		}
	}

}
xhr.open('get','localhost/reg.php',true);
xhr.setRequestHeader('Content-Type','x-www-from-urlencoded;charset=UTF-8');

xhr.send(null);
```
- 与IE的xdr不同的是，可以通过xhr对象访问status和statusText，而且还支持同步请求。
- 安全方面，有如下限制：

	+ 不能使用 `setRequestHeader` 设置自定义头部
	+ 不能发送和接受cookie；
	+ 调用 `getAllResponsHeader()` 总会返回空字符串
	
### Prefighted Requests

	CORS 通过一种教 Prefighted Requests 的透明服务器验证机制支持开发人员自定义个头部，
	get或post之外的方法，以及不同类型的主体内容。
	
- 使用下列情况，回想服务器发一个Prefighted请求。这种请求只用OPTENS方法

	+ Origin: 与简单的请求相同
	+ Access-Control-Request-Method：请求自身使用的方法。
	+ Access-Control-Request-Header：（可选）自定义头部信息多个头部用逗号分隔。
	
- 带有自定义头部的NCZ使用POST方法发送请求

	+ origin:http://www.nczonline.net
	+ Access-Control-Request: POST
	+ Access-Control-Request-Header: NCZ
	
- 服务器可以决定是否允许这种类型的请求。服务器在响应中发送如下头部

	+ Access-Control-Allow-Origin : 与简单的请求相同
	+ Access-Control-Allow-Methods:允许的方法，用逗号分割
	+ Access-Control-Allow-Headers:允许的头部，多个头部以逗号隔开
	+ Access-Control-Max-Age:应该将这个Prefight请求缓存多久
	
```
//例如 服务器返回

Access-Control-Allow-Origin : http://www.nczonline.net
Access-Control-Allow-Methods:POST,GET
Access-Control-Allow-Headers:NCZ
Access-Control-Max-Age:172000

```

### 带凭证的请求

- 默认情况下，跨域请求不提供凭证（cookie、HTTP认证、客户端SSL证明）；
- 通过将widthCredentials属性设置为true，可以指定某个请求应该发送凭据。
- 服务器接受带凭证的请求，头部返回 `Access-Control-Allow-Credentials:true`
- 如果发送的是带凭证的请求，但服务器响应中没有包含这个头部，那么浏览器就不会吧响应交给javascript(responseText为空，status为0，调用onerror事件处理)

### 跨浏览器的 COSRS

- 浏览器对CORS的支持程度并不都一样，但所有的浏览器都支持简单的(非Prefilight和不带凭证的)请求，为了兼容，我们需要手动处理。
- 检测XHR是否支持CORS是最简单的方法，就是检查是否支持widthCredentials属性，在结合XDomainRequest对象是否存在，就可以兼顾所有的浏览器了

```
	function createCORSRquest(method,url){
		var xhr = new XMLHttpRequest();

		if('withCredentials' in xhr){
			xhr.open(method,url,true)
		}else if(typeof XDomainRequest != 'undefined'){
			xhr = new XDomainRequest();
			xhr.open(method,url)
		}else{
			xhr = null;
		}

		return xhr
	}

	var res = createCORSRquest('get','localhost');
	//检查是否得到对象
	if(res){
		res.onload = function(){
			//对 res.responseText处理
		}
		res.send();
	}
	
```

- Firefox、Safari和chrome中的XMLRequest对象和IE中的XDomainRequest对象类似，都提供了类似的接口，这两个对象共同的属性/方法如下：

	+ abort():用于停止正在进行的请求
	+ onerror：用于替代onreadystatechange检测错误
	+ onload：用于替代onreadystatechange检测成功
	+ responseText：用于取得响应内容
	+ send():用于发送请求
	
## 其他跨域技术

### 图像ping
	即跨域请求技术是使用 `<img>`标签，
	
- 动态创建乳香经常用于图像ping。图像Ping食欲服务器进行简单，单项的跨域通信的一种方法
- 请求的数据是通过查询字符串的方式发送的，而响应的内容可以是任意内容，但通常是像素位图或者204响应
- 图像Ping最长用于跟踪用户点击页面或动态广告曝光数。
- 图像Ping有两个主要的缺点：

	+	只能发送 `GET` 请求
	+	无法访问服务器返回的文本
	

### JSONP

- JSONP 是JSON width Padding（填充是JSON或参数式JSON）的简写，是应用JSON的一种新方法，
- JSONP 看起来和JSON差不错，只不过是被包含着函数调用中的JSON，
- JSONP 由两个部分组成

	+ 回调函数：回调函数是当响应到来事应该在页面调用的函数。回调函数的名字一般在请求时指定，
	+ 数据：就是传入回调函数的 JSON 数据
	
```
function handleReponse(res){
	console.log(res)
}

var script = document.createElement('script');
script.src = 'localhost?callback=handleReponse';
document.body.insertBefore(script,document.body.fristChild)


//返回树数据形式
handleReponse({n:n,n1:n1})
```

## Comet
	Comet 是 一种高级的 ajax 技术。Comet能够让信息近乎实时的被推送到页面上，非常适合处理体育比赛和股票报价等场景。
	
### Comet有两种实现方式，长轮询和流
- 长轮询是传统轮询（也称为短轮询）的一个翻版，级浏览器定时向服务器发送请求，看有么有更新数据。
- 长轮询把短轮询颠倒了一下。页面发送一个请求，服务器一直保持链接打开，知道有数据可发送，发送完数据以后，浏览器关闭链接，随即又发起一个到服务器的心请求，这个过程在页面打开期间一直重复不断。
- 无论长轮询还是短轮询，浏览器都要在接受到数据之前，先发起对服务器的链接。两者最大的区别在于服务器如何发送数据。

	+ 短轮询是立即发送数据，无论数据是否有效
	+ 长轮询是等待发送数据
	
- 第二种流行的Comet的实现是HTTP流。就是浏览器向服务器发送一个请求，而服务器保持链接打开，然后周期性的向浏览器发送数据。
- 在Firefox，Safari，Opera和Chrome中，通过帧听readystatechange 事件检测readyState的值是否为3，就可以利用XHR对象实现HTTP流

```
// http流

function createStreamingClient(url,progress,finished){
	var xhr = new XMLHttpRequest(),
		received = 0;

		xhr.open('get',url,true);

		xhr.onreadystatechange = function(){
			var result;

			if(xhr.readyState == 3){
				// 只取得最新数据并调整计数器
				result = xhr.responseText.substring(received);
				received +=result.length;
				
				//调用progress回调
				progress(result)
				
			}else if(xhr.readyState == 4){
				finished(xhr.responseText)
			}
		};

		xhr.send(null);
		return xhr
}

var client = createStreamingClient('localhost/index.php',
					function(data){
						console.log('Received' + data)
					},
					function(data){
						console.log('Done!');
					}
)


// createStreamingClient 函数接收三个参数：需要连接的url，在接收到数据调用的函数，关闭链接是调用的函数

```

## 服务器发送事件

	SSE（Server-Sent Event，服务器发送事件），就是围绕只读Comet交互推出的API或者模式。SSE API
	用于创建到服务器的单项链接，服务器通过这个链接可以发送任意数量的数据。
	服务器响应的MIME类型必须是text/event-steam，而且是浏览器中的JavaScript API 可以解析的格式输出
	
### SSE API
	SSE 的javaScriptAPI于其他传递消息的javaScriptAPI很相似。要预订新的事件流，首先要创建一个新的Eventsource对象，并传入一个入口点
- EventSource的实例有一个`readyState`属性，值为0表死活正连接到服务器，值为1表示打开了链接，值为2表示关闭了链接
- 三个事件

	+ open：在建立链接时触发
	+ message：从服务器接受到新事件是触发
	+ error：在无法简历链接是触发
- 服务器发送的数据以字符串的形式保存在event.data中
- 默认情况下，EventSource对象会保持于服务器的活动链接。如果链接断开，还会重新链接，这就意味着SSE适合长轮询和http流。
- 想断开链接，不在链接 调用`close`方法
	
```
<!--新建对象 URL必须和对象同源-->
var  source = new EventSource('myevent.php');

<!--处理接受到的数据-->
source.onmessage = function(e){
	var data = e.data;
}
<!--关闭链接-->

source.close();

```

### 事件流
- 所谓的服务器事件会通过一个持久的HTTP响应发送，这个响应的MIME类型为Text/eventStream。响应的格式
	是纯文本，最简单的情况是每个数据都带有data前缀
- 对于多个连续的data:开头的数据行，将作为多段数据解析，每个值之间以一个换行符分割。
- 只有在包含data：的数据行后边有空行是，才会触发`message`事件，因此在服务器上生成事件流的时候需要定义ID
- 设置了ID后，EventSource对象更总上一次触发事件，如果链接断开，会向服务器发送一个包含名为Last-Event-Id的特殊HTTP头部的请IQu，以便服务器知道下一次该触发那个事件。在多次连接的事件流中，这种机制可以保证浏览器以正确的顺序链接数据段

```
<!--基本格式-->
data:foo

data:bar

data:leo
data:19

<!--设置ID-->
data：join
id：1
```


















	
	





	