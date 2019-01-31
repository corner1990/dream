"use strict";
/*
* 使用接口约束类
*/
// 继承单个对象
var Dog = /** @class */ (function () {
    function Dog(name) {
        this.name = name;
        this.name = name;
    }
    Dog.prototype.speak = function (something) {
        console.log('小狗在' + something);
    };
    return Dog;
}());
var dog = new Dog('小甜甜');
dog.speak('哈哈');
var Bird = /** @class */ (function () {
    function Bird(name) {
        this.name = name;
        this.name = name;
    }
    Bird.prototype.speak = function (something) {
        console.log('小鸟在' + something);
    };
    Bird.prototype.fly = function () {
        console.log('小鸟在天空飞翔');
    };
    return Bird;
}());
var b = new Bird('xiaoliao');
console.log(b.fly());
