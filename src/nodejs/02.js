// 同步和异步调用  
// 
// 
const fs = require('fs');
const path = require('path');

console.time('async');
console.log(__dirname,'dirname')
fs.readFile(path.join(__dirname,'./01.js'),'utf8',(error,data) => {
	if(error){ throw error;}
	console.log(data)
})

console.timeEnd('async')