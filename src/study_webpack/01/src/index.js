import color from './color'
let src = require('./images/b.jpg')
console.log('hello webpack')
document.getElementById('app').innerHTML = 'hello'
// let img = new Image()
// img.src = src
// document.body.appendChild(img)
console.log(_.join(['a','b','c'],'@'));
// import './index.css'
console.log('color', color)
let getColor = () => color;
