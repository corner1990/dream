"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* 静态属性
* 静态方法
*/
var Person2 = /** @class */ (function () {
    function Person2() {
    }
    // 加上static表示方法是静态属性，属于累的属性，可以通过类调用，但是不会给子实例继承
    Person2.getName = function () { };
    Person2.message = 'hello';
    return Person2;
}());
var p2 = new Person2();
console.log(Person2.message);
console.log(p2.message);
/*
* 多态
*/
// 语法抽离实例
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.speak = function () {
        throw Error('不可以调用');
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.speak = function () {
        console.log('小狗汪汪汪！');
    };
    return Dog;
}(Animal));
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.speak = function () {
        console.log('小猫喵喵喵！');
    };
    return Cat;
}(Animal));
var cat = new Cat();
var dog = new Dog();
dog.speak();
cat.speak();
// 抽象方法
/*
* 定义抽象类
* 不可以直接实例化，只能飞别的实例做继承
*/
var Animal2 = /** @class */ (function () {
    function Animal2() {
    }
    return Animal2;
}());
/*
* 子类继承抽象父类
* 子类中必须实现父类抽象的方法，否则会报错
*/
var Cat2 = /** @class */ (function (_super) {
    __extends(Cat2, _super);
    function Cat2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat2.prototype.speak = function () {
        console.log('小猫喵喵喵！');
    };
    return Cat2;
}(Animal2));
