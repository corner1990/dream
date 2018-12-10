### MongoDB简介
- Mongodb是一个开源的NoSQL数据库，相比MySQL那样的关系型数据库，它更显得 轻巧、灵活，非常适合在数据规模很大、事和性不强的场合下使用。
- 同时它也是一个对象数据库，没有表和行的概念，也没有固定的模式和结构，所有的数据都是以文档的形式存存储(文档，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组、甚至是一个嵌套文档)，数据格式就是JSON。
### Mongoose是什么？
- Mongoose是MongoDB的一个对象模型工具

- 同时它也是针对MongoDB操作的一个对象模型库,封装了MongoDB对文档的的一些增删改查等常用方法

- 让NodeJS操作Mongodb数据库变得更加灵活简单

- Mongoose因为封装了MongoDB对文档操作的常用方法，可以高效处理mongodb,还提供了类似Schema的功能，如hook、plugin、virtual、populate等机制。

- 官网 [mongoosejs](https://mongoosejs.com/)


### 使用 mongoose

- 安装mongoose

 ```
$ npm install mongoose
 ```



- 使用mongoose

  -  user 用户名
  - pass 密码
  - ip IP地址
  - port 端口号
  - database 数据库

  ```javascript
  
    var mongoose = require('mongoose');
    var connection = mongoose.createConnection("mongodb://127.0.0.1/test");
  
    connection.on('error', function (error) {
     console.log('数据库连接失败: ' + error);
  
    });
  
    connection.on('open', function (error) {
     console.log('数据库连接成功');
  
    });
  
  ```

    

### Schema

> Schema是数据库集合的模型骨架 定义了集合中的字段的名称和类型以及默认值等信息	

- Schema.Type
- NodeJS中的基本数据类型都属于 Schema.Type 另外Mongoose还定义了自己的类型 基本属性类型有:
  - 字符串(String)
  - 日期型(Date)
  - 数值型(Number)
  - 布尔型(Boolean)
  - null
  - 数组([])
  - 内嵌文档
- 定义Schema

```javascript
 var personSchema = new Schema({
      name:String, //姓名
      binary:Buffer,//二进制
      living:Boolean,//是否活着
      birthday:Date,//生日
      age:Number,//年龄
      _id:Schema.Types.ObjectId,  //主键
      _fk:Schema.Types.ObjectId,  //外键
      array:[],//数组
      arrOfString:[String],//字符串数组
      arrOfNumber:[Number],//数字数组
      arrOfDate:[Date],//日期数组
      arrOfBuffer:[Buffer],//Buffer数组
      arrOfBoolean:[Boolean],//布尔值数组
      arrOfObjectId:[Schema.Types.ObjectId]//对象ID数组
      nested:{ //内嵌文档
        name:String,
      }

// 如果说对象中的字段在Schema中没有，则会被忽略
// 如说说对象中的字段少于Schema中的字段，则缺少的字段不会被保存，或者保存Schema中的默认值
// 存储的字段和Schema中定义的类型不同，回报错
                               
```



```javascript
let p = new Person();
p.name= 'leo';
p.age = 25;
p.birthday = new Date();
p.married = false;
p.mixed= {any:{other:'other'}};
p._otherId = new mongoose.Types.ObjectId;
p.hobby.push('smoking');
p.ofString.push('string');
p.ofNumber.pop(3);
p.ofDates.addToSet(new Date);
p.ofBuffer.pop();
p.ofMixed = ['anything',3,{name:'leo'}];
p.nested.name = 'leo';
```



### Model

- Model是由通过Schema构造而成 除了具有Schema定义的数据库骨架以外，还可以操作数据库 如何通过Schema来创建Model呢，如下:

  ```javascript
  //连接数据库
  mongoose.connect("mongodb://123.57.143.189:27017/test");
  
  //两个参数表示定义一个模型
  var PersonModel = mongoose.model("Person", PersonSchema);
  
  // 如果该Model已经定义，则可以直接通过名字获取
  var PersonModel = mongoose.model('Person');//一个参数表示获取已定义的模型
  
  // 拥有了Model，我们也就拥有了操作数据库的能力 在数据库中的集合名称等于 模型名转小写再转复数,比如
  // Person>person>people,Child>child>children
  
  // Model 是模型，操作的是猪哥哥集合
  ```



### Entity简述

> 通过Model创建的实体，它也可以操作数据库 使用Model创建Entity，如下示例：

```javascript
 var personEntity = new PersonModel({
     name : "leo",
     age  : 6

 });

//Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作,但Model比Entity可以实现的功能更多
// Entity 操作的是自己本身，不会对整个集合处理

```

- 保存Entity

```javascript
let mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/persons");

let PersonSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 0}
});

let PersonModel = mongoose.model("Person", PersonSchema);
let PersonEntity = new PersonModel({
    name: "leo",
    age: 6

});

// 使用回调的方式接收参数
PersonEntity.save(function (error, doc) {
    if (error) {
        console.log("error :" + error);
    } else {
       //doc是返回刚存的person对象 
        console.log(doc);
    }

});

// 使用promise
PersonEntity.save()
.then(doc => {
    //doc是返回刚存的person对象 
     console.log(doc);
}, err => {
    console.log('err', err)
})
```





### ObjectId

- 存储在mongodb集合中的每个文档都有一个默认的主键_id 这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId 该类型的值由系统自己生成，从某种意义上几乎不会重复 ObjectId是一个12字节的 BSON 类型字符串。按照字节顺序，依次代表：
  - 4字节：UNIX时间戳
  - 3字节：表示运行MongoDB的机器
  - 2字节：表示生成此_id的进程
  - 3字节：由一个随机数开始的计数器生成的值
- 每一个文档都有一个特殊的键_id，这个键在文档所属的集合中是唯一的。

### 基础操作

- **查询**

语法: `Model.find(查询条件,callback);`

```javascript
// 
// 代码
Model.find({},function(error,docs){
  //若没有向find传递参数，默认的是显示所有文档
});

Model.find({ "age": 6 }, function (error, docs) {
  if(error){
    console.log("error :" + error);
  }else{
    console.log(docs); //docs: age为6的所有文档
  }
});


```



- **Model保存**

语法: `Model.create(文档数据, callback))`

```javascript
 PersonModel.create({ name:"leo", age:7}, function(error,doc){
    if(error) {
        console.log(error);
    } else {
        console.log(doc);
    }
});

```



- **Entity保存**

语法: `Entity.save(callback))`

```javascript
let PersonEntity = new PersonModel({name:"leo",age: 9});

PersonEntity.save(function(error,doc) {
   if(error) {
      console.log(error);
   } else {
      console.log(doc);
   }
});

```

- **更新**

语法:  `Model.update(查询条件,更新对象,callback);`

```javascript

let conditions = {name : 'leo'};
let update = {$set : { age : 100 }};

  PersonModel.update(conditions, update, function(error){
      if(error) {
          console.log(error);
      } else {
          console.log('Update success!');
        }
    });

// 请注意如果匹配到多条记录，默认只更新一条，如果要更新匹配到的所有记录的话需要加一个参数 {multi:true}

```

- **删除**

语法: `Model.remove(查询条件,callback);`

```javascript
var conditions = { name: 'leo' };

PersonModel.remove(conditions, function(error){
    if(error) {
          console.log(error);
    } else {
        console.log('Delete success!');
    }
});

```



### 基本查询

- 准备数据

```js
PersonModel.create([
    { name: "leo1", age: 1 },
    { name: "leo2", age: 2 },
    { name: "leo3", age: 3 },
    { name: "leo4", age: 4 },
    { name: "leo5", age: 5 },
    { name: "leo6", age: 6 },
    { name: "leo7", age: 7 },
    { name: "leo8", age: 8 },
    { name: "leo9", age: 9 },
    { name: "leo10", age: 10 }
], function (error, docs) {
    if (error) {
        console.log(error);
    } else {
        console.log('save ok');
    }

});

```



- 属性过滤

语法:  `find(Conditions,field,callback)`

```javascript
//field省略或为Null，则返回所有属性。
//返回只包含name、age两个键的所有记录
Model.find({},{name:1, age:1, _id:0}，function(err,docs){
   //docs 查询结果集
})

// 我们只需要把显示的属性设置为大于零的数就可以，当然1是最好理解的，id是默认返回，如果不要显示加上("id":0)

```

- findOne(查询单条)

  > 与find相同，但只返回单个文档，也就说当查询到即一个符合条件的数据时，将停止继续查询，并返回查询结果

语法：`findOne(Conditions,callback)` 

```javascript
TestModel.findOne({ age: 6}, function (err, doc){
       // 查询符合age等于6的第一条数据
       // doc是查询结果
});
```



- findById(按ID单条数据),

  > 与findOne相同，但它只接收文档的_id作为参数，返回单个文档 语法

语法： `findById(_id, callback)`

```js
PersonModel.findById(person._id, function (err, doc){
     //doc 查询结果文档
});

```



- $gt、$lt(大于、小于)

> 查询时我们经常会碰到要根据某些字段进行条件筛选查询，比如说Number类型，怎么办呢，我们就可以使用$gt(>)、$lt(<)、$lte(<=)、$gte(>=)操作符进行排除性的查询，如下示例：

```js
Model.find({"age":{"$gt":6}},function(error,docs){
   //查询所有nage大于6的数据
});

Model.find({"age":{"$lt":6}},function(error,docs){
   //查询所有nage小于6的数据
});

Model.find({"age":{"$gt":6,"$lt":9}},function(error,docs){
  //查询所有nage大于6小于9的数据
});

```



- $ne(不等于)

> $ne(!=)操作符的含义相当于不等于、不包含，查询时我们可通过它进行条件判定，具体使用方法如下：

```javascript
Model.find({ age:{ $ne:6}},function(error,docs){
  //查询age不等于6的所有数据
});

```



- $in(包含)

> 和$ne操作符相反，$in相当于包含、等于，查询时查找包含于指定字段条件的数据

```javascript
Model.find({ age:{ $in: 6}},function(error,docs){
   //查询age等于6的所有数据
});

Model.find({ age:{$in:[6,7]}},function(error,docs){
  //可以把多个值组织成一个数组
});

```



- $or(或者)

> 可以查询多个键值的任意给定值，只要满足其中一个就可返回，用于存在多个条件判定的情况下使用，如下示例：

```js
Model.find({"$or":[{"name":"leo"},{"age":6}]},function(error,docs){
    //查询name为leo或age为6的全部文档
});

```



- $exists(是否存在)

> $exists操作符，可用于判断某些关键字段是否存在来进行条件查询。如下示例：

```js
Model.find({name: {$exists: true}},function(error,docs){
      //查询所有存在name属性的文档
});

Model.find({email: {$exists: false}},function(error,docs){
      //查询所有不存在email属性的文档
});

```



### 高级查询

>  可以限制结果的数量,跳过部分结果,根据任意键对结果进行各种排序
>
> 所有这些选项都要在查询被发送到服务器之前指定

- limit(限制数量)

> 在查询操作中,有时数据量会很大,这时我们就需要对返回结果的数量进行限制 那么我们就可以使用limit函数，通过它来限制结果数量。 

语法: `find(Conditions,fields,options,callback);`

```javascript
Model.find({},null,{limit:20},function(err,docs){
        console.log(docs);
});
// 如果匹配的结果不到20个，则返回匹配数量的结果，也就是说limit函数指定的是上限而非下限
```



- skip(跳过/略过的数量)

> skip函数的功能是略过指定数量的匹配结果，返回余下的查询结果 如下示例：

语法： `find(Conditions,fields,options,callback);`

```javascript
Model.find({},null,{skip:4},function(err,docs){
        console.log(docs);
});
// 上述查询，如果查询结果数量中少于4个的话，则不会返回任何结果。
```

- sort函数

> sort函数可以将查询结果数据进行排序操作 该函数的参数是一个或多个键/值对 键代表要排序的键名,值代表排序的方向,1是升序,-1是降序

语法: `find(Conditions,fields,options,callback)`

```js
Model.find({},null,{sort:{age:-1}},function(err,docs){
      //查询所有数据，并按照age降序顺序返回数据docs
});
sort函数可根据用户自定义条件有选择性的来进行排序显示数据结果。
```


- 分页查询
```js
Model('User').find({})
  .sort({createAt:-1})
  .skip((pageNum-1)*pageSize)
  .limit(pageSize)
  .populate('user')
  .exec(function(err,docs){
     console.log(docs);
  });
```

- populate

  > pupulate 填充的意思，把集合文档中的一个外链转换成对应的文档，将对应的外键转换为对象
  >
  > 下边是栗子：

```javascript
var mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/201606blog');

//定义课程Schema
var CourseSchema = new mongoose.Schema({
    name:String
});
var CourseModel = mongoose.model('Course',CourseSchema);
var PersonSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    // 外键 别的集合的主键
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course' //指明此外键是哪个集合中的外键
    }
});

var PersonModel = mongoose.model('Person',PersonSchema);
// 保存数据
CourseModel.create({name:'node.js'},function(err,course){
    PersonModel.create({name:'leo',course:course._id},function(err,doc){
        console.log(doc);
        PersonModel.findById(doc._id).populate('course').exec(function(err,doc){
            console.log(doc);
        })
    })
});


// 查询
PersonModel.findOne({name: 'leo'})
       .populate({
           path: 'course',
       })
       .exec(function (err, data) {
          console.log(data);
		})

// 多个外键的写法
PersonModel.findOne({name: 'leo'})
       .populate({
           path: 'xxx',
       })
	   .populate({
           path: 'xxx',
       })
	  .populate({// 嵌套外键
           path: 'xxx.xxx',
       })
       .exec(function (err, data) {
          console.log(data);
		})


```

