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

let code = '50'

attr('name', 'leo');
console.log(attr('name'));
