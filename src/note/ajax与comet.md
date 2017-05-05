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

	for( i=0,len = form.elements.length ; i < len; i++){
		field = form.elements[i];
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
					parts.push(encodeURICompotent(field.name)+'='+encodeURICompotent(optVal))
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
					parts.push(encodeURICompotent(field.name)+'='+
						encodeURICompotent(field.value))
				}
		}
		
	}

	return parts.join('&')
}
```


	
	





	