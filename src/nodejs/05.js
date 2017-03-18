
/* 文件写入 */
'use strict';

const fs = require('fs');
const path = require('path');
let file = path.join(__dirname,'/1.txt');
// // 异步文件写入  
// fs.writeFile(path.join(__dirname,'/1.txt'),JSON.stringify({name: 'leo',age: 19,gander:'man'}),(err)=>{
// 	if(err){
// 		console.log(err)
// 	}else{
// 		console.log('success')
// 	}
// })

// 同步步文件写入  
// fs.writeFile(path.join(__dirname,'/1.txt'),'hello world',(err)=>{
// 	if(err){
// 		console.log(err)
// 	}else {
// 		console.log('success')
// 	}
// });

//文件追加
// fs.appendFile(path.join(__dirname,'/1.txt'),'\n2017',(err)=>{
// 	if(err){
// 		console.log(err)
// 	}else {
// 		console.log('success')
// 	}
// });