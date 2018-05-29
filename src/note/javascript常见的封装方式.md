# javascript常见的封装方式
    js是一门面向对象语言，其对象是用prototype属性来模拟  

### 常规的封装  
```
    function Person(name,age,sex){
                this.name = name;
                this.age = age;
                this.sex = sex;
            }

    Person.prototype = {
        constructor : Person,
        sayHello:function(){
            console.log('hello')
        }
    }

    <!-- 这种方式是比较常见的方式,比较直观,但是Person() 的职责是构造对象,如果把初始化的事情也放在里面完成,
    代码就会显得繁琐,应该放在一个方法里初始化好点呢? -->
```

### 优化后的封装  
```
  function Person(info){
    this._init(info);
  }
  
  Person.prototype = {
    constructor : Person,
    _init : function(info){
        this.name = info.name;
        this.age = info.age;
        this.sex = info.sex;
    },
    sayHello : function(){
        console.log('hello')
    }
  }
```

### new 的执行原理  

```
<!-- new 的执行过程可以用下边一个函数来代替 -->
var myNew = function(constructor, args) {
            var o = {};
            o.__proto__ = constructor.prototype;
            var res = constructor.apply(o, args);
            var type = typeof res;
            if (['string', 'number', 'boolean', 'null', 'undefined'].indexOf(type) !== -1) {
                return o;
            }
            return res;
        }

```
- 首先通过var o={} 构造一个空对象  
- 然后将构造函数的原型属性prototype赋值给o的原型对象_ptoro_。
- 此时，在执行this.init(info);这句话的时候，对象o就可以在其原型对象中查找_init方法。(原型链)  

        var res = construcor.apply(o,ages)

- 以o为上下文调用函数，同时将参数作为数组传递

        this._init_(info)  

- 这句话就会背o执行  
```
_init_ : function(info) {
        this.name = info.name;
        this.age = info.age;
        this.sex = info.sex;
    }

//以 o 为上下文调用，o也将拥有自己的 name,age,sex 属性。
```

- 如果在构造函数中，return 复合类型，包括对象，函数，和正则表达式，那么就会直接返回这个对象，否则，返回 o 。  
```
var type = typeof res;
    if(['string','number','boolean','null','undefined'].indexOf(type) !== -1){
        return o;
    }
    return res;
```   
### 测试一下
```
function Person(name){
    this.name = name
}

Person.prototype.sayHello = function(){
    console.log('hello world')
}

var ol = myNew(Person,['leo'])
console.log(ol)
ol.sayHello();

<!-- 控制台打印 -->
//Person {name: "leo"}
// hello world
```

### 类jquery 封装

    jQuery对象具有很强的集成性，可以作为函数调用，也可以做为对象调用，当作为函数调用的时候，可以无需new而返回它的一个实例，很方便。

- 示例代码  

```
var Person = function(info){
    return new Person.prototype.init(info)
}

Person.prototype = {
    constrcutor: Person,
    ining:function(info){
        this.name = info.name
    }
}

Person.prototype.init.prototype = Person.prototype;
<!-- 将对象的构造操作放在函数里边，而自己充当一个工厂 -->
```
- 不断调用prototype并不是一个直观的做法  
```
var Person = function(info){
    return new Person.fn.init(info);
}
 
Person.fn = Person.prototype = {
    constructor: Person,
    init:function(){
        this.name = info.name;
        this.sayHello = function(){
            this.makeArray();
        }
    }
    makeArray:function(){
        console.log(this.name);
    }
}
// 这句话的作用 
// 虽然把makeArray 等常用方法挂载到 Person.prorotype 下面,但还是会被 init 这个实例使用.
Person.fn.init.prototype = Person.fn;
```

- 最后用闭包封装  
```
var Person = (function(window){
        var Person = function(name){
            return new Person.fn.init(name)
        }

        Person.fn = Person.prototype = {
            constructor : Person,
            init : function(name){
                this.name = name;
                this.sayHello = function(){
                    this.makeArray()
                }
            },
            makeArray : function(){
                console.log(this.name)
            }
        }

        Person.fn.init.prototype = Person.fn;
        return Person
    })(window)

    var p = Person('leo');
    console.log(p);
    p.sayHello()

    //init {name: "leo"}
    // leo
```

### js提供的方法 

    js提供了一个object.create();可以传递一个对象Person,构造一个p，并且是p集成Person

```
var Person = {
    name :"leo",
    sayHello : function(){
    console.log(this.name)
    }
}
var p = Object.crteate(Person);
console.log(p); //Object {}
p.sayHello(); // leo
```
