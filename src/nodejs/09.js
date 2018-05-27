
// 将market文档转换为html

const fs = require('fs'),
	path = require('path'),
	marked = require('marked');

let target = path.join(__dirname,process.argv[2] || '');
let filename = path.extname(target);
console.log(target)
let template = `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<style>{{style}}</style>
			</head>
			<body>
				<div class="g-wrap vs">{{html}}</div>
			</body>
			</html>`;
let _style = '';
fs.readFile(path.join(__dirname,'github.css'),(err,css)=>{
	if(err) throw err;
	_style = css.toString();
	template = template.replace('{{style}}',_style);
	console.log(1)
})


fs.watch(target, (curr,prev) =>{console.log(2)
	if(curr != 'change'){
		return
	}
	let html = '';

	fs.readFile(target,(err,data)=>{console.log(3)
		if(err){
			throw err
		}

		html =marked( data.toString() );
	
		template = template.replace('{{html}}',html);
		fs.writeFile(target.replace(filename,'html'),template,(err)=>{
			if(err) throw err;
			console.log('写入文件')
		})
	})

})