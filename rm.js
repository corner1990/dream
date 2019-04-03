const fs = require('fs')
const path = require('path')

let p = path.resolve(__dirname, '../src')
function rmFile (name, p, callback) {
	let reg = new RegExp(`${name}$`, 'ig');
	fs.readdir(p, (err, files) => {
		function next(index) {
			if (index == files.length) return callback()
			let curr = files[index]
			let newPath = path.join(p, curr)

			fs.stat(newPath, (err, stat) => {
				debugger
				if (stat.isDirectory()) {
					rmFile('.map', newPath, () => {next(index+1)})
				} else {
					if (reg.test(newPath)) {
						fs.unlink(newPath, () => {next(index+1)})
					} else {
						next(index+1)
					}

				}
			})
		}
		next(0)
	})
}

rmFile('\.map', p, () => {console.log('结束了')})
