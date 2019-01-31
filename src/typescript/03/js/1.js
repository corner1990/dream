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
* 定义类
*/
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
var p = new Person('leo', 10);
console.log(p.getName());
// 类的继承
var Parent = /** @class */ (function () {
    function Parent(name, age) {
        this.name = name;
        this.age = age;
    }
    Parent.prototype.getName = function () {
        return this.name;
    };
    return Parent;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(name, age, no) {
        var _this = _super.call(this, name, age) // 调用父类的构造函数
         || this;
        _this.no = no;
        return _this;
    }
    Student.prototype.getNo = function () {
        return this.no;
    };
    return Student;
}(Parent));
var s1 = new Student('hello', 12, 121212);
console.log(s1);
/*
* 修饰符
* public 公开的，自己，子类都可以访问
* protected 受保护的只有自己和子类可以访问
* private 私有的 只有自己访问
*/
var Father = /** @class */ (function () {
    function Father(name, age, money) {
        this.name = name;
        this.age = age;
        this.money = this.money;
    }
    Father.prototype.getName = function () {
        return this.name;
    };
    Father.prototype.getAge = function () {
        return this.age;
    };
    Father.prototype.getMoney = function () {
        return this.money;
    };
    return Father;
}());
var Child = /** @class */ (function (_super) {
    __extends(Child, _super);
    function Child() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Child.prototype.getAge = function () {
        return this.age;
    };
    return Child;
}(Father));
var c = new Child('test', 10, 100);
console.log(c.getName());
console.log(c.getAge());
console.log(c.getMoney());
