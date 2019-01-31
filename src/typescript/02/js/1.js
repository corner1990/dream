"use strict";
function greeting(name) {
    console.log('hello, ', name);
}
// ts 形参和实参要完全一样
function greeting2(name, age) { }
// 可选参数 必须是最后一个
function greeting3(name, age) { }
// 默认参数
function ajax(method, url) {
    if (method === void 0) { method = 'GET'; }
    console.log(method, url);
}
ajax('post', '/user');
// 剩余参数
function sum() {
    var numbers = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        numbers[_i] = arguments[_i];
    }
    return numbers.reduce(function (val, item) {
        return val + item;
    }, 0);
}
var ret = sum(1, 2, 3, 4);
console.log(ret);
