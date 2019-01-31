"use strict";
var obj = {};
function attr(key, val) {
    if (arguments.length > 1) {
        obj[key] = val;
    }
    else {
        return obj[key];
    }
}
attr('name', 'leo');
console.log(attr('name'));
