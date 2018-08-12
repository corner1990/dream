// Content-Encoding: gzip 服务端
// Accept-Encoding: gzip, deflate, br 客户端

let fs = require('fs')
let path = require('path')
let zlib = require('zlib')

function zip (src) {
  // 压缩流， 转化流
  let pathInfo = path.parse(src) // 拿到解析后的路径信息
  // {
  //   root: '/',
  //     dir: '/Users/a002/Documents/dream/src/zfnode/cache',
  //       base: '1.txt',
  //         ext: '.txt',
  //           name: '1'
  // }

  let gzip = zlib.createGzip()
  fs.createReadStream(src)
    .pipe(gzip)
    .pipe(fs.createWriteStream(`${pathInfo.dir}/${pathInfo.name}.gz`))
}

function unzip (src) {
  let pathInfo = path.parse(src) // 拿到解析后的路径信息
  let gunzip = zlib.createGunzip()
  
  fs.createReadStream(src)
    .pipe(gunzip)
    .pipe(fs.createWriteStream(`${pathInfo.dir}/${pathInfo.name}${pathInfo.name}.txt`))
}


// zip(path.join(__dirname, './1.txt'))
unzip(path.join(__dirname, './1.gz'))

