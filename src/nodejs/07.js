

//递归目录树  
//
//先写一层的情况  
//抽象递归参数  
//找到突破点（避免死循环）
//调用自身，在特定的情况（可定会存在的）不调用
//

'use strict';
//打印当前目录所有文件  
//
const fs = require('fs');
const path = require('path');
require('./timeformat');
Encoding.default_external = Encoding.find('utf-8')
//获取当前有没有传入目标路劲
let target = path.join(__dirname,process.argv[2] || './');

paintParth(target,0);

function paintParth(target,depth){

	let dirinfo = fs.readdirSync(target);
	let dirs = [];
	let files = [];

	let depthStr = new Array(depth + 1).join('│ ');

	dirinfo.forEach(info =>{
		let stats = fs.statSync(path.join(target,info))
		if(stats.isFile()){
			files.push(info)
		}else{
			dirs.push(info)
		}
	})

	//'└─'

	dirs.forEach(file =>{//打印文件夹
		console.log(`${depthStr}'├─'}${file}`);
		
		paintParth(path.join(target,`${file}`),depth + 1)
		
	})

	let count = files.length - 1;
	files.forEach(file=>{//打印文件
		console.log(`${depthStr}${count-- ? '─' : '└'}${file}`)
	})
}



