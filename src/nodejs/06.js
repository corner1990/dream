'use strict';
//打印当前目录所有文件  
//
const fs = require('fs');
const path = require('path');
require('./timeformat');

//获取当前有没有传入目标路劲
let target = path.join(__dirname,process.argv[2] || './');

// fs.readdir 读取文件夹
fs.readdir(target,(err,files)=>{

	//files 是一个数组
	files.forEach(file =>{
		// console.log(target,file)
		//获取文件信息 fs.stat()
		fs.stat(path.join(target,file),(err,stats)=>{
			if(err){
				console.log(err)
			}else{
				// console.log(stats)
				console.log(`${stats.atime.format('yyyy-mm-dd HH:MM')}\t${stats.size}\t${file}`)
			}
		})
	})
})