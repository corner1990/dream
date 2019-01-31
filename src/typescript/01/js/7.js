"use strict";
/*
* any 任何值
* void any的反面，不能有任何值
* never 永远不会有返回值
*/
// 这个函数一旦执行，就不会结束的时候使用nerver
function sum() {
    while (true) {
        console.log(true);
    }
}
function multi() {
    // 函数永远不会执行完毕
    throw Error('ok');
}
function divide(a, b) {
    return a / b;
}
divide(10, 2);
