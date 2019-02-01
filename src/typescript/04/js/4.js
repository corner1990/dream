"use strict";
/*
* 范形
* generic type ，
 */
function calculate(value) {
    return value;
}
// 调用函数的时候讲类型传递过去
console.log(calculate('leo'));
console.log(calculate(1));
// 类的泛形使用
var MyArray = /** @class */ (function () {
    function MyArray() {
        this.list = [];
    }
    MyArray.prototype.add = function (value) {
        this.list.push(value);
    };
    MyArray.prototype.max = function () {
        var ret = this.list[0];
        for (var i = 1; i < this.list.length; i++) {
            if (this.list[i] > ret)
                ret = this.list[i];
        }
        return ret;
    };
    return MyArray;
}());
var arr1 = new MyArray();
arr1.add(1);
arr1.add(23);
arr1.add(15);
arr1.add(65);
arr1.add(175);
console.log(arr1.max());
