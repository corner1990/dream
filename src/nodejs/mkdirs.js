//循环创建文件夹  

'use strict';
const fs = require('fs');
const path = require('path');

//创建文件，定义模块成员，到处模块成员，载入模块成员，使用模块

function mkdirs(pathname,callback){
	//得到文件的绝对路径
	let root = path.dirname(module.parent.filename);
	//判断传入的是否是一个绝对路径  
	pathname = path.isAbsolute(pathname) ? pathname : path.join(root,pathname);
	//获取要创建的部分
	let relativepath = pathname.replace(root,'');
	let folders = relativepath.split(path.sep);

	if(folders.length > 15){
		return console.log('文件嵌套太深，请减少嵌套层级')
		
	}

	try{console.log(1)
		let pre = '';
		folders.forEach(folder=>{
			try{
				fs.statSync(path.join(root,pre,folder))
			} catch (err){
				fs.mkdirSync(path.join(root,pre,folder));
				pre = path.join(pre,folder)
				callback && callback();
			}
		})
	} catch(err){console.log(2)
		callback && callback();
	}
	
}

module.exports = mkdirs;