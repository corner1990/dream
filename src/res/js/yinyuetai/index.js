(function(){
	navShow();
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
		var list = s('.banner .list')
	}

	// 导航拖拽
	navTouch();
	function navTouch(){
		var wrap = s('.main-nav');//nav包裹
		var list = s('.main-nav .list');//图片列表
		var listSX = 0;//list初始坐标
		var touchSX = 0;//鼠标开始坐标
		cssTransform(list[0],'translateX',0);

		// 绑定事件
		on(wrap,'touchstart',function(e){
			var touch =e.changedTouches[0];//得到触摸
			var str = window.getComputedStyle(list[0]).transform;
			var patt = /(\d)+/g;
			var step = 0.8;
			listSX= -(parseInt(str.match(patt)[4]));
			touchSX = touch.pageX;

			on(wrap,'touchmove',function(e){
				var touch = e.changedTouches[0];
				listSX -= (touchSX - touch.pageX );
				touchSX = touch.pageX;
				if(listSX >=0){
					step -=0.01;
					listSX = (touchSX - touch.pageX ) * step;
				}else if(listSX <= wrap[0].offsetWidth - list[0].offsetWidth){
					step -=0.01
					listSX = (touchSX - touch.pageX ) * step;
				}
				cssTransform(list[0],'translateX',listSX);
			})
			on(wrap,'touchend',function(){
				step=0.8;
				if(listSX >=0){
					listSX = 0;
				}else if(listSX <= wrap[0].offsetWidth - list[0].offsetWidth){
					listSX = wrap[0].offsetWidth - list[0].offsetWidth;
				}
				cssTransform(list[0],'translateX',listSX);
			})
		})
	}
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
	if(obj.length <2){
		obj[0].addEventListener(type,fn,false);
	}else{
		for(var i =0;i<obj.length;i++){
			obj[i].addEventListener(type,fn,false);
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