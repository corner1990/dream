// progress  进度条  
// 
// 
// 

var ProgerssBar = require('progress');

var bar = new ProgerssBar("progerss:[:bar]",{total: 50,});

var timer = setInterval(()=>{
	bar.tick();
	if(bar.complete){
		console.log('\ncomplete\n');
		clearInterval(timer)
	}
},100)





