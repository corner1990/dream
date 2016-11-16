(function(){
	navShow();
	//头部导航
	function navShow(){
		
		var btn = s('.header .btn-more');
		var head = s('.header');

		on(btn,'touchend',function(e){
			stopPropagation(e);
			this.classList.toggle('bg-b');
			this.parentNode.classList.toggle('header-more');
		})
		on(head,'touchstart',function(e){
			stopPropagation(e);
		});
		on([document.body],'touchstart',function(){
			if(btn[0].classList.contains('bg-b')){
				btn[0].classList.toggle('bg-b');
				btn[0].parentNode.classList.toggle('header-more');
			}
			return;
		})
	}
	
	// banner方法
	banner();
	function banner(){
		var wrap = s('.banner');
		var list = s('.banner .list');
		var oNav = s('.banner .nav');
		var iNow = 0;
		var html = list[0].innerHTML;
		var listSX = 0;//list初始坐标
		var touchSX = 0;//鼠标开始坐标
		cssTransform(list[0],'translateX',0);

		// 复制元素内容，实现无缝
		html+=html;
		list[0].innerHTML = html;
		var length = list[0].children.length;
		cssTransform(list[0],'translateX',0);
		list[0].style.width =100 * length+'%';

		// 触摸触发事件
		on(list,'touchstart',function(e){
			// 取消transition
			this.style.transition='none';
			var translateX = cssTransform(list[0],'translateX');
			var iNow = Math.round(-translateX / wrap[0].offsetWidth);
			if(iNow == 0){
				iNow = Math.floor(length/2);
			}
			if(iNow == length-1){
				iNow = Math.floor(length/2)-1;
			}
			cssTransform(list[0],'translateX',-iNow*wrap[0].offsetWidth);
			// 获取手指
			var touch = e.changedTouches[0];
			touchSX = touch.pageX;
			listSX = cssTransform(list[0],'translateX');console.log(listSX);
		})

		// 滑动事件
		on(list,'touchmove',function(e){
				var touch = e.changedTouches[0];
				// 获取手指滑动的距离
				var stepX = (touch.pageX - touchSX);
				var tragetX = listSX+stepX;
				cssTransform(list[0],'translateX',tragetX);
			})

		// 手指抬起事件
		on(list,'touchend',function(e){
			var touch = e.changedTouches[0];
			// 设置transition
			this.style.transition='transform 0.3s linear';
			iNow = Math.round(cssTransform(list[0],'translateX')/wrap[0].offsetWidth);
			setNav(-iNow%5);
			cssTransform(list[0],'translateX',iNow*wrap[0].offsetWidth);
	
		})

		// 设置导航按钮
		function setNav(num){
			for(var i=0;i<oNav[0].children.length;i++){
				oNav[0].children[i].classList.remove('active');
			}
			oNav[0].children[num].classList.add('active');
		}
		

	}

	// 导航拖拽
	navTouch();
	function navTouch(){
		var wrap = s('.main-nav');//nav包裹
		var list = s('.main-nav .list');//图片列表
		var listSX = 0;//list初始坐标
		var touchSX = 0;//鼠标开始坐标
		var iNow = 1;//判断系数，用来实现橡皮筋效果
		cssTransform(list[0],'translateX',0);

		// 绑定事件
		on(list,'touchstart',function(e){
			this.style.transitionProperty="none";
			var touch =e.changedTouches[0];//得到触摸
			listSX= cssTransform(list[0],'translateX');
			touchSX = touch.pageX;
		})

		on(list,'touchmove',function(e){
			var touch = e.changedTouches[0];
			var disX = touch.pageX - touchSX ;
			var tragetX = listSX + disX ;
	
			if(tragetX > 0 || tragetX < wrap[0].offsetWidth - list[0].offsetWidth){//判断list的x是否到了最左边||最右边
				iNow -= 0.02;
				tragetX = listSX + disX*iNow;
			}
			cssTransform(list[0],'translateX',tragetX);
		})
		on(list,'touchend',function(e){
			this.style.transitionProperty="transform";
			iNow = 1;//还原系数
			// 设置x值
			if(cssTransform(list[0],'translateX') > 0){
				cssTransform(list[0],'translateX',0);
			}
			if(cssTransform(list[0],'translateX') < wrap[0].offsetWidth - list[0].offsetWidth){
				cssTransform(list[0],'translateX',wrap[0].offsetWidth - list[0].offsetWidth);
			}
		})
	}

	// tab切换
	function tab(el){
		// 获取包裹元素
		var wrap = s(el);
		//所有的选项卡
		var list = wrap[0].children;
		for(var i = 0;i < list.length; i++){
			// 通过自定义属性，给每个元素设置index
			list[i].setAttribute('index',i);
			// 绑定touchstart 事件
			on(list[i],'touchstart',function(e){
				stopPropagation(e);
				e.preventDefault();
				var index = this.getAttribute('index');
				// 所有元素切换class
				for(var i = 0;i < list.length; i++){
					list[i].classList.remove('active');
				}
				this.classList.add('active');
			})
		}
		
		
	}
	// mv首播tab
	tab('.tab-nav');
	// 正在流行tab
	tab('.move-nav');
})()

// 选择器
function s(str){
	if(!str){
		return;
	}
	var arr = str.split(' ');
	if(arr.length < 2){
		if(arr[0].slice(0,1) == '#'){
			return q(arr[0])
		}else{
			return qAll(arr[0]);
		}
	}else{
		var obj = q(arr[0]);
		for(var i=1; i<arr.length;i++){
			obj = qEvent(obj,arr[i]);
		}
		return obj;
	}
	// 遍历查找多个元素
	function qEvent(obj,str){
		if(str.slice(0,1) != '#'){
			return obj.querySelectorAll(str)
		}else{
			return obj.querySelector(str)
		}
		obj.querySelector(str);
	}
	// 查找一个数组
	function qAll(str){
		var elem = document.querySelectorAll(str);
		return elem;
	}
	// 查找一个元素
	function q(str){
		return document.querySelector(str);
	}
}


//绑定事件函数
function on(obj,type,fn){
	if(!obj[0]){//如果说是一个元素
		obj.addEventListener(type,fn,false);
	}else{
		//如果类数组
		if(obj.length <2){
			obj[0].addEventListener(type,fn,false);
		}else{
			for(var i =0;i<obj.length;i++){
				obj[i].addEventListener(type,fn,false);
			}
		}
	}
}

function off(obj,type,fn){
	if(arguments.length < 3){
		if(obj.length <2){
			obj[0].removeEventListener(type);
		}else{
			for(var i =0;i<obj.length;i++){
				obj[i].addEventListener(type);
			}
		}
	}else{
		if(obj.length <2){
			obj[0].removeEventListener(type,fn,false);
		}else{
			for(var i =0;i<obj.length;i++){
				obj[i].addEventListener(type,fn,false);
			}
		}
	}
	
}
function stopPropagation(e){
	var e = e || window.event;
	if(e.stopPropagation){//w3c阻止冒泡方法
		e.stopPropagation();
	}else{
		e.cancelBubble = true;//IE阻止冒泡方法
	}
}

// cssTransform兼容写法
function cssTransform(el,attr,val) {
	if(!el.transform){
		el.transform = {};
	}
	if(arguments.length>2) {
		el.transform[attr] = val;
		var sVal = "";
		for(var s in el.transform){
			switch(s) {
				case "rotate":
				case "skewX":
				case "skewY":
					sVal +=s+"("+el.transform[s]+"deg) ";
					break;
				case "translateX":
				case "translateY":
					sVal +=s+"("+el.transform[s]+"px) ";
					break;
				case "scaleX":
				case "scaleY":
				case "scale":
					sVal +=s+"("+el.transform[s]+") ";
					break;	
			}
			el.style.WebkitTransform = el.style.transform = sVal;
		}
	} else {
		val  = el.transform[attr];
		if(typeof val == "undefined" ) {
			if(attr == "scale" || attr == "scaleX" || attr == "scaleY"  ) {
				val = 1;
			} else {
				val = 0;
			}
		}
		return val;
	}
}


function navSwipe() {
	var navScroll = document.querySelector('#navScroll');
	var navs = document.querySelector('#navs'); 
	var startPoint = 0;
	var startX = 0;
	var minX = navScroll.clientWidth - navs.offsetWidth;
	var step = 1;
	var lastX = 0; //上次的距离
	var lastTime = 0;//上次的时间戳
	var lastDis = 0;
	var lastTimeDis = 0;
	navScroll.addEventListener(
		'touchstart', 
		function(e) {
			navs.style.transition = "none";
			startPoint = e.changedTouches[0].pageX;
			startX = cssTransform(navs,"translateX");
			step = 1;
			lastX = startX;
			lastTime = new Date().getTime();
			lastDis = 0;
			lastTimeDis = 0;
		}
	);
	navScroll.addEventListener(
		'touchmove', 
		function(e) {
			var nowPoint = e.changedTouches[0].pageX;
			var dis = nowPoint - startPoint;
			var left = startX + dis;
			var nowTime = new Date().getTime();
			if(left > 0) {
				step = 1-left / navScroll.clientWidth; //根据超出长度计算系数大小，超出的越到 系数越小
				left = parseInt(left*step);
				/*left = 0;*/
			}
			if(left < minX) {
				var over = minX - left; // 计算下超出值
				step = 1-over / navScroll.clientWidth; //根据超出值计算系数
				over = parseInt(over*step);
				left = minX - over;
				/*left = minX; */
			}
			lastDis = left-lastX; //距离差值
			lastTimeDis = nowTime - lastTime; //时间差值
			lastX = left;
			lastTime = nowTime;
			cssTransform(navs,"translateX",left);
		}
	);
	navScroll.addEventListener(
		'touchend', 
		function (){
			var speed = (lastDis/lastTimeDis)*300; //用距离差值/时间差值 = 速度   速度*系数 = 缓冲距离
			var left = cssTransform(navs,"translateX");
			var target = left + speed; //当前值 + 缓冲距离 = 目标点
			var type = "cubic-bezier(.34,.92,.58,.9)";
			var time = Math.abs(speed*.9);
			time = time<300?300:time;
			if(target > 0) {
				target = 0;
				type ="cubic-bezier(.08,1.44,.6,1.46)";
			}
			if(target < minX) {
				target = minX;
				type ="cubic-bezier(.08,1.44,.6,1.46)";
			}
			navs.style.transition = time+"ms " + type;
			cssTransform(navs,"translateX",target);
		}
	);
	
}