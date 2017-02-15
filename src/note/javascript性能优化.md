#JavaScript性能优化

##加载和执行
	JavaScript执行过程耗时越久，浏览器等待响应的实践就越长。  
	意味着：<script>标签每次出现都霸道的样页面等待脚本的解析和执行。无论当前的JavaScript代码是内嵌的还是包含在外链文件中，页面的下载和渲染都必须停下来等待脚本的执行完成。这是页面生存周期的必要环节，因为脚本执行过程中可能会修改页面内容，  
-	脚本位置  
	+	理论上来讲，把于样式和行有关的脚本文件放在一起。并预先加载他们，有助于确保页面渲染和交互的正确性。由于脚本回阻塞页面其他资源的下载，应次推荐将所有script标签经可能的放到body标签底部，以减少对整个页面下载的影响。
-	阻止脚本  
	+	由于每个script标签出事下载是都会租塞页面渲染，所以减少页面包含的script标签数量，有助于改善这种情况。
-	无阻塞脚本  
	+	JavaScript倾向于阻止浏览器的某些处理过程，如处理http请求呵用户页面更新，见好骚JavaScript文件大小并闲置http请求数仅仅是创建响应迅速web应用的第一步，无阻塞脚本的秘诀在于，在页面加载完成后才加载JavaScript代码。用转业属于来说这意味着Window对象的load事件触发后再下载脚本，有多重方式可以实现这一效果。  
-	延迟的脚本  
	+	HTML4为script标签定义了一个扩展属性：defer。Defer属性指明本元素所包含的脚本不会修改DOM，因此代码能够安全的延迟执行。带defer的script标签可以放置在文档的任何位置，任何带有defer属性的script元素在DOM完成加载之前都不会被执行。无论内嵌还是外链，都是如此。  
`<script type="text/javascript" src="../*.js" defer></script>` 
-	动态脚本元素  
	由于文档对象模型DOM的存在，可以用JavaScript动态创建HTML中的所有内容。
	  
```
var script = document.createElement('script');
script.type = 'text/javascript'; 
//Firefox,opera,Chrome,Safari
script.onload = function(){
	alert('Script loaded')
} 
//IE
// 'uninitialized' 初始状态
// 'loading' 开始下载
// 'loaded' 下载结束
// 'interactive' 数据完成下载但尚不可用
// 'complete' 所有数据已准备就绪
script.onreadystatechange = function(){
	if(script.readyState == 'load' || script.readyState == 'complete'){
		script.onreadystatechange = null;
		alert('Script loaded.')
	}
}

script.src = 'file.js';
document.getElementByTagName[0].appendChild(script);

//在大多数情况下，我们只需要使用一个单一的方法来动态加载JavaScript文件，下边我们对其进行封装  
function loadScript(url,callback){
	var script = document.createElement('script');		script.type = 'text/javascript';
	if(script.readyState){//IE
		script.onreadystatechange = function(){
			if(script.readyState == 'load' || script.readyStat == 'complete'){
				script.onreadystatechange = null;
				callback();
			}
		}
	}else{//其他浏览器
		script.onlad = function(){
			callback();
		}
	}
	
	script.src = url;
	document.getElementByTagName('head')[0].appChild(script);
}

//加载单个文件
loadScript('...js',function(){
	alert('file is loaded');
})
//如果动态加载文件 并且需要注意加载顺序的话，为了确保加载顺序 可以将下载操作串联起来
loadScript('...js',function(){
	loadScript('...js',function(){
		loadScript('...js',function(){
			alert('file is loaded');
		})
	})	
})
```    

-	XMLHttpRequest 脚本注入  
	>	另一种无阻脚本加载脚本的方法是使用XMLHttpRequest(XHR)对象获取脚本并注入页面中 

	
```
var xhr = new XMLHttpRequest();
xhr.open('get','xx.js',true);
xhr.onreadystatechange = function(){
	if(xhr.readyState == 4){
		if(xhr.status >= 200 && xhr.status < 300 || xhr.status == 304){
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.text = xhr.responseText;
			document.body.appendChild(script);
		}
	}
}

xhr.send(null);
```

-	推荐使用无阻塞模式  
>	向页面中添加大量JavaScript的推荐方法需要两步：    

	+	1.先添加动态加载所需的代码。  
	+	2.然后加载初始化页面所需的剩下代码。  
	+	因为第一部分代码经可能的精简甚至可能只包含loadScript() 函数，他下载执行都很快，不会对页面邮太多影响，一旦初始代码就为，就用他来加载剩余的JavaScript.  
  


``` 
	<script type="text/javascript" src='loader.js'></script>
	<script>
		loadScript('xx.js',function(){
			Application.init();
		})
	</script>
```

##	 数据存取	
	计算机科学中有一个经典的问题是通过改变数据的存储位置来获取最佳的读写性能，  
	数据存储关系到代码执行过程中的数据的检索速度  

-	JavaScript中有一下四中基本的数据存储位置  
	+	字面量：字面量只代表自身，不存储在特定的位置。  
	JavaScript中的字面量有：字符串，数字，布尔值，对象，数组，函数，正则表达式，以及特殊的Null和undefined值。
	+	本地变量：开发人员使用关键字var定义的数据存储单元  
	+	数组元素：存储在JavaScript数组对象内部，以数字作为索引  
	+	对象成员：存储在JavaScript对象内部，以字符串作为索引
	
-	管理作用域  
>	作用域概念是理解JavaScript的关键所在，不仅仅从性能角度，还包括从功能的角度，作用域对JavaScript邮许多影响，从确定那些变量可以被函数访问，到确定this的赋值。JavaScript作用域同样关系到性能，要理解速度和作用域的关系，首先要理解作用域的工作原理。
-	作用域链和标识符解析
>	每一个JavaScript函数都表示为一个对象，更确切的说，是Function对象的一个实例。Function对象同其他对象一样，拥有可以编程访问的属性，和一系列不能通过代码访问而仅供JavaScript引擎存取的内部属性。其中一个内部属性是[[Scope]]，由ECMA-262标准第三版定义。  
>>	[[Scope]]包含了一个函数被创建的作用域对象集合。这个集合被成为函数的作用域链，它决定那些数据能被函数访问。函数作用域中的每个对象被称为一个可变对象，每个对象都以‘键值对‘的形式存在。当一个函数创建后，[[Scope]]的作用链会被创建此函数的作用域中的可访问的数据对象所填充。<br>
>>执行函数时会创建一个称为执行环境(execution context)的内部对象。一个执行环境定义了一个函数执行时的环境。函数每次执行环境都是独一无二的，所以多次调用同一个函数就会导致创建多个执行环境。当函执行完毕，执行环境就会被销毁。<br>
每个执行环境都有自己的作用域链，用于解析标识符。当执行环境被创建时，他的作用域链初始化为当前运行函数的[[Scope]]属性中的对象。<br>
在函数执行过程中，每遇到一个变量，都会经历一次标识符解析过程以决定从哪里获取或者存储数据。
-	标识符解析的性能
	标识解析是有代价的。一个表示符所在的位置越深，它的读写速度就越慢。因此，函数中读写局部变量总是最快的，而读写全局变量通常是最慢的(优化JavaScript引擎在某些情况下能有所改善)。  
	注：全局变量总是总是存在于执行环境作用域链的最末端，因此它也是最远的。  
	经验法则：如果某个夸作用域的值在一个函数内部被引用一次以上，那么就应该把它存储在局部变量里。
-	改变作用域链  
	>	一般来说，一个执行环境的作用域链是不会改变的。但是有两个语句可以在执行时临时改变作用域链。  

	+	第一个是with语句。  
	>	with 语句用来给对象的所有属性创建了一个变量。  一个新的变量被创建，它包含了参数指定对象的所有属性。这个对象被推入作用域链的首位，这意味着函数所有的局部变量处于第二个作用域链对象中，因此访问的代价更高了。  因此，最好避免使用with语句。
	+	第二个是try-catch语句  
	>	try-catch中的catch语句同样有相同的效果。当try中的代码发生错误，执行过程会自动跳转到catch子句。然后把异常对象推入一个变量对象并置于作用域链的首位。但是，catch语句一旦执行完毕，作用域链就会返回之前的状态    
	
	```
	try{
		methodThatMightCanuseAnError();
	}catch(ex){
		console.log(ex.message);//作用域链再在这里发生改变
	}
	```
	>	 如果使用得当，try-catch是个非常有用的语句，因此不完全弃用。首先，try-catch语句不应该用来解决JavaScript错误，如果知道某个错误经常出现那说明代码本身就用问题，应该尽早修复。其次应该尽量简化代码来是的catch子句对性能的影响最小化。一种推荐的方式是将错误委托给一个函数来处理栗子如下：  
	
	```
	try{
		methodThatMightCauseAnError()
	}catch(ex){
		handleError(ex)//委托给错误处理函数
	}
	//函数handleError是catch子句中唯一执行的代码。带函数接受错误产生的异常对象为参数，你可以适当灵活的处理错误。由于只执行一条语句，且没有局部变量的访问，作用域链的临时改变就不会影响代码性能。
	```
-	动态作用域
>	无论是with语句还是try-catch子句，或是包含eval()的函数，都被认为是动态作用域，动态作用域只存在与代码执行的过程中，因此无法通过静态分析(查看代码结构)检测出来。经过优化后的JavaScript引擎，尝试通过分析代码来确定那些变量可以在特定的时候被访问。这些引擎试图避开传统作用域链的查找，取代以标识符索引的方式进行快速查找。当涉及动态作用域时，这种优化就失效了。脚本引擎它必须切换回较慢的基于哈希表的标识符识别方式，这更像是传统的作用域链查找。因此，只有在确实有必要时才推荐使用动态作用域链。
-	闭包，作用域和内存
>	闭包是JavaScript最强大的特性之一，它允许函数访问局部作用域之外的数据。通常来说，函数的活动对象会随着执行环境一同销毁。但引入闭包时，由于引用仍然从在于闭包的[[Scope]]属性中，因此激活对象无法被销毁。这意味这脚本中的闭包于非闭包函数相比，需要更多的内存开销。
-	对象成员
>	对象成员包括属性和方法。在JavaScript中，二者有些许差异。一个被命名的对象成员能包含任何数据类型。既然函数也是一个对象，那么对象成员处传统的数据类型外，还可以包含函数。当一个被命名的成员引用了一个函数，该成员就被称为一个“方法”，相反，引用了非函数类型的成员就被成为“属性”。
-	原型
>	JavaScript中的对象是基于原型的。原型是其他对象的基础，它定义了一个新创建的对象所包含的成员列表。<br>
>	对象通过一个内部属性绑定到它的原型。在Firefox，chrome，Safari浏览起中，这个属性 _proto_ 对开发者可见，而其他浏览器却不允许脚本访问此属性。一旦创建一个内置对象（如object或Array）的实例，它会自动拥有一个Object实例作为原型。  
>	对象可以有两种成员：实例成员（也成为own成员）和原型成员。实例成员直接存在于对象实例中，原型成员则从对象原型继承而来。
-	原型连  
>	对象的原型决定了实例的类型。默认情况下，所有对象都是对象（Object）的实例，并继承了所有基本方法和属性。  
>	搜索实例成员比从字面量或者局部变量中读取数据代价更高，再加上遍历原型连带来的开销，让性能成为了很大问题。
-	嵌套成员  
>	由于对象的成员可能包含其他成员。每次遇到操作符，嵌套成员会导致JavaScript引擎会搜索所有对象成员。  
>	因此对象成员嵌套的越深，读取速度就会越慢
-	缓存对象成员值
>	通常来说，函数中如果要多次读取同一个对象属性，最佳做法是将属性值保存到局部变量中。局部变量能用来替代属性以避免多次查找带来的性能开销。特别是在处理嵌套对象成员时，会明显提升执行速度。  
<br>  

## DOM编程  
 
-	浏览器中的DOM
	+	文档对象模型（DOM）是一个独立于语言的，用于操作XML和HTML文档的程序接口（API）。  
	+	尽管DOM是个于语言无关的API，它在浏览器中的接口却是用JavaScript实现的。  
	+	浏览器中会吧DOM和JavaScript独立实现。
	+	两个相互独立的功能只要通过借口彼此连接，就会产生消耗，访问DOM的次数越多，消耗的性能也就越高，因此应该尽可能的减少消耗
-	DOM访问于修改  
	+	修改DOM元素会导致浏览器重新计算机页面的几何结构。  
	+	在循环中修改DOM会产生极大的性能开销，最好是讲需要修改的内容使用局部变量保存，一次性写入。  
	+	innerHTML 对比DOM方法  
	+		在老浏览器中innerHTML要比DOM方法生稍快一些，在新版的浏览器中，则相差无几。   
	
	+	节点克隆    
	>使用DOM方法更新页面内容中另一个途径是克隆已有元素，而不是创建新元素，换句话说就是使用document.cloneNode(elem[已存在节点])替换document.createElement().   
	在大多数浏览器中，克隆元素都要稍快于新建元素，但也不是特别名信啊。  
	
	+	HTML集合  
	+		html集合是包含了DOM节点引用的类的数组对象。  

		-	document.getELementsByName('name') //所有name等于name的元素
		-	document.getELementsByClassName(‘class’)  //所有class等于class的元素
		-	document.getElementsByTagName([p,div...])  //元素标签获取所有的节点 
	
		-	document.images //页面中所有的图片  
		-	document.links //所有a元素  
		-	document.forms //所有表单  
		
	>	访问集合元素时，我们应该先使用局部变量保存DOM集合，然后对局部变量进行遍历或者访问。  
	
	+	遍历DOM  
	+		DOM API提供了多种方法来读取文档中的特定部分。  
		-	获取DOM元素  
		>	可以使用childNodes得到元素集合，或者使用nextSibling 来获取每个相邻元素  在IE7 和IE6中nextSibling要比childNodes快很多。  
		
		-	元素节点  
		>	大部分浏览器中提供获取DOM元素的方法，而且效率要比JavaScript高很多。 
		
		<table>
			<tr>
				<th>属性名</th><th>被替代的属性</th>
			</tr>
			<tr>
				<td>children</td>
				<td>childNodes</td>
			</tr>
			<tr>
				<td>childElementCount</td>
				<td>childNode.length</td>
			</tr>
			<tr>
				<td>firstElementChild</td>
				<td>firthChild</td>
			</tr>
			<tr>
				<td>lastElementChild</td>
				<td>lasteChild</td>
			</tr>
			<tr>
				<td>nextElementSibling</td>
				<td>nextSibling</td>
			</tr>
			
			<tr>
				<td>previousElementSibling</td>
				<td>previousSibling</td>
			</tr>
		</table>   
		
		-	选择器API  
		>		对DOM中的特定元素操作时，开发者通常需要比较getElementById()和getElementBtTagName()更好的控制，  
				有时候，为了得到需要的元素列表，需要组合调用他们并遍历返回的节点，但是这种繁密的操作过程效率低下。  
				另一方面，如果浏览器支持的情况下可以使用querySelector(‘css选择器’)得到单个元素或者使用querySelectorAll(‘css选择器’)  
				来的到一个元素列表。  
		
-	重绘于重排  
	浏览器下载完页面中所有的组建：HTML标记，Javascript，CSS，图片之后会生成两个内部数据结构  
	1.DOM    
	>		表示页面结构  
	
	2.渲染树    
	>		表示DOM节点应该怎么显示  
	
	+	DOM树中的每一个需要显示的节点在渲染树中至少存在一个对应的节点(隐藏的DOM元素在渲染树中没有对应的节点)，渲染树中的节点被称为“帧(frames)”或“盒（boxes）”，符合CSS模型定义，理解页面元素为一个具有内边距（padding），外边距（margin），边框（border）和位置（position）的盒子。一旦DOM和渲染树构建完成，浏览器就开始显示（绘制 paint）页面元素。  
	+	当DOM的变化影响了元素的几何属性（宽和高），浏览器会使渲染树中收到影响的部分失效，并重新构造渲染树，这个过程叫做“重绘（reflow）”。完成重拍后，浏览器会重新绘制受影响的部分到屏幕中的过程称为“重拍（repaint）”  ，只要不改变也页面元素的几何属性，都不会重拍和重绘。  
	+	重排发生的时机  
		-	添加或者删除可见的DOM元素  
		-	元素位置改变   
		-	元素的尺寸改变（包括：外边距，内边距，边框宽度，宽度，高度等属性改变）  
		-	内容改变（文本改变或者图拍你被另外一个不同尺寸的图片替代）  
		-	页面渲染器初始化  
		-	浏览器窗口尺寸改变  
	+	渲染树变化的排队与刷新  
	>		由于每次重拍都会产生计算消耗，大多数浏览器通过队列化修改该并批量执行来优化重排过程，获取布局信息的操作会导致队列刷新并立即执行。  
		-	offsetTop，offsetLeft，offsetWidth，offsetHeight  
		-	scrollTop ...  
		-	clientTop ...  
		-	getComputedStyle() || (currentStyle in IE)   
		注：在修改过程中应该避免使用以上属性。他们都会导致刷新渲染队列，即使只是获取最近未发生改变的或者最新改变无关的布局信息。		
  
  	+	最小化重绘与重排  
  		1.改变样式    
  		>		合并所有的改变吼一西处理，这样只会修改DOM一次。比如使用添加CLass   
  		  
  		2.批量修改DOM  		
  		-  使元素脱离文档流  
  		-	对其应用多重改变  
  		-	把元素带回文档中    
  		
  		3.缓存布局信息  
  		缓存布局信息可以减少获取布局信息而导致浏览器重排和重绘的次数。  
  		
  		4.让元素脱离动画流  
  		-	使用绝对定位的页面上的动画元素，将其脱离文档流  
  		-	让元素动起来，当它扩大是，会临时覆盖部分页面，但这只是页面一个小区域的重绘过程，不会产生重绘和页面的大部分内容。  
  		-	当动画结束时恢复定位。从而只会移一次文档的其他元素。  
  		
  		5.IE和hover  
  		>	在IE7开始，IE允许任何元素(严格模式下)上使用：hover这个CSS伪类选择器。但是如果在大量元素使用了:hover，那么就会降低响应速度，在IE8下更明显。   
  		 
  		+	所谓的标准模式是指，浏览器按W3C标准解析执行代码；怪异模式则是使用浏览器自己的方式解析执行代码，因为不同浏览器解析执行的方式不一样，所以我们称之为怪异模式。浏览器解析时到底使用标准模式还是怪异模式，与你网页中的DTD声明直接相关，DTD声明定义了标准文档的类型（标准模式解析）文档类型，会使浏览器使用相应的方式加载网页并显示，忽略DTD声明,将使网页进入怪异模式(quirks mode)。  
  		+	如果你的网页代码不含有任何声明，那么浏览器就会采用怪异模式解析，便是如果你的网页代码含有DTD声明，浏览器就会按你所声明的标准解析。  
  		‘
		+	<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">’ 一个HTML4文档声明  
		
		5.事件委托  
		>		当页面中存在大量元素，而且每一个都要一次或多次绑定事件(如click)时，这种情况可能会影响性能。  
			每一个事件绑定都是有代价的，要么是加重了有诶安负担(更多的标签或者JavaScript代码)，  
			要么是增加里运行时间，需要访问和修改的DOM元素越多，应用程序也就越慢，一个简单呐而优雅的处理DOM事件的技术就是事件委托。   
			
		>	事件委托：事件逐层冒泡并能被父元素捕获，使用事件代理，只需给外层元素绑定一个事件处理器，处理所有子元素上触发的事件。  
		
		+	根据DOM标准，每个事件都要精力三个节点：  
			- 	捕获  
			-	到达目标  
			-	冒泡  
			>	IE不支持事件捕获，但是通过事件冒泡就可以实现委托
  		  
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>demo</title>
</head>
<body>
	<div>
		<ul class="menu">
			<li><a href="xxxx"></a></li>
		</ul>
	</div>
	<script>
		document.getElementById('menu').addEventListener('click',function(e){
			//浏览器  
			var e = e || window.event;
			var target = e.target || e.srcElement;
			var pageid,hrefparts;
			//是否为链接 非链接点击则退出  
			if(target.nodeName !== 'A'){
				return
			}

			//从链接中找到页面ID  
			hrefparts = target.href.split('/');
			pageid = hrefparts[hrefparts.length-1];
			pageid = pageid.replace('.html','');

			//更新页面  
			ajaxRequest('xhr.php?page='+= id,urdataPageContent);

			//浏览器阻止默认行为并取消冒泡  
			if(typeof e.preventDefault == 'function'){
				e.preventDefault();
				e.stopPropagation();
			}else{
				e.returnValue = false;
				e.cancelBubble = true;
			} 
		},true)
	</script>
</body>
```  

##算法和流程控制  
