(() =>{
	let path = require('path');
	let fs = require('fs');
	let fireName = path.join(__dirname+'/../note/crumb.md');

	const readline = require('readline');
	// console.log(fs.readFileSync(fireName,'utf8'))

	var str  = fs.createReadStream(fireName)
	var data = '';
	str.on('data',(chunk)=>{
		data+=chunk;
		
	})

	str.on('end',()=>{
		//通知结束  此时data是完整文档
		console.log(data)
	})
})()