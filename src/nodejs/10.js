'use strict';
//文件流的操作 读取  
//

const fs = require('fs');
const path = require('path');

let target = 'F:\\';

//这种方法 文件太大会耗费很多内存，
//看不到文件进度
//文件太大容易操作失败  
// fs.readFile(path.join(target,'day05.rar'),(err,data)=>{
// 	if(err){throw err}
	
// 	fs.writeFile(path.join(target,'06.rar'),data,err=>{
// 		if(err){
// 			throw err
// 		}

// 		console.log('拷贝完成')
// 	})
// })

let read = fs.createReadStream(path.join(target,'下午02-文件流写入.web.mkv'));

let wirte = fs.createWriteStream(path.join(target,'文件流写入.web.mkv'));

//磁盘：7200转 6100转 转速越快 读写越快 资源消耗更大

fs.stat(path.join(target,'下午02-文件流写入.web.mkv'),(err,stats)=>{
	if(stats){
		read.on('data',(chunk)=>{
			wirte.write(chunk,()=>{
				console.info('写入了一点点')
			});
			console.log(`读取了一点：${chunk.length}`)

		})
	}
})