"use strict";
// void 类型
function greeting(name) {
    if (name === void 0) { name = 'leo'; }
    console.log("hello " + name);
}
greeting('leo');
var xx;
xx = (function () { throw new Error('worng'); })();
