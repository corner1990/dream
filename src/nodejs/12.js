
//stock  
//


const net = require('net');

const server = net.createServer((scoket)=>{
	//当有客户端与我连接的时候触发
	let ip = scoket.address();
	let add = scoket.remontAddress;
	console.log(add)
})

let prot = 8184;
server.listen(prot,err=>{
	//成功监听3600 端口后执行 如果监听失败(或者被别人占用了)会有error
	if(err){
		console.log('监听失败，端口被占用');
		return false;
	}

	console.log(`服务端正常启动监听${prot}端口`)
})