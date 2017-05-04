# Mongoose 学习笔记

### 简介  
    Mongoose是在nodejs异步环境下对mongodb进行便捷操作的对象模型工具  

### 安装mongoose  

    npm install mongoose  

-  安装成功后 使用require('mongoose') 使用

### 连接字符串

- 创建一个db.js
```
let mongoose = require('mongoose'),
    uri = 'mongodb://localhost:27017/blog';

/**
 * 连接
 */
mongoose.connect(uri);
let db = mongoose.connection;

/**
  * 连接成功
  */
db.on('connected', function () {    
    console.log('Mongoose connection open to ' + uri);  
});    

/**
 * 连接异常
 */
db.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
db.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});    

module.exports = monooose
```

- 在命令行使用node调用 打印以下信息 
- `Mongoose connection open to mongodb://localhost/blog`

### Schema
    schema 是mongoose里用到的一种数据模式，可以理解为表结构的定义；
    每个Schema会映射到mongodb中的一个collection，他不具备操作数据库的能力 
    可以想成是我们要储存什么样的数据，相当于js的构造函数

- 上边我们通过module.exprots 导出了mongoose对象
- 下边定义一个Schema

```
/*
* 定义一个Schema  用户信息
 */

let mongoose = require('./db.js'),
    Schema = mongoose.Schema;


let UserSchema = new Schema({
    username : { type: String }, //用户账号
    userpwd: {type: String}, //密码
    userage: {type: Number}, //年龄
    logindate : { type: Date}//最后登录时间
})

```

- 定义已Schema ，只需指定字段名和类型
- schema Types 内置类型如下
    + String
    + Number
    + Boolean
    + Array
    + Buffer
    + Date
    + ObjectId | Oid
    + Mixed
### 生成Model

- model室友schema生成的模型，可以对数据库操作

```
/*
* 定义一个Schema  用户信息
 */
let mongoose = require('./db.js'),
    Schema = mongoose.Schema;


let UserSchema = new Schema({
    username : { type: String }, //用户账号
    userpwd: {type: String}, //密码
    userage: {type: Number}, //年龄
    logindate : { type: Date}//最后登录时间
})

/*
* 生成model 
* 这里生成User  数据库会自动把User生成为Users
 */
module.exports = mongoose.model('User',UserSchema);
```

### 常见的数据库操作
- 插入数据 `Model#save([fn])`
```
/**
 * 插入
 */
function insert() {
 
    let user = new User({
        username : 'leo',                 //用户账号
        userpwd: 'qwe123',                            //密码
        userage: 27,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    user.save((err, res)=> {

        if (err) {
            console.log("Error:" + err);
        }       
        console.log("Res:" + res);

    });
}

insert();

/*
*可以在命令行查看
* 执行 db.users.find().pretty()
 */
```
- 更新数据 `Model.update(conditions, update, [options], [callback])`
```
function update(){
    let wherestr = {'username' : 'leo'};
    let updatestr = {'userpwd': 'qwe12345'};
    
    User.update(wherestr, updatestr, (err, res)=>{
        if (err) {
           throw ("Error:" + err);
        }
       
        console.log("Res:" + res);

    })
}

update();
```
- 常用方法还有findByIdAndUpdate，这种比较有指定性，就是根据_id
`Model.findByIdAndUpdate(id, [update], [options], [callback])`
```
function findByIdAndUpdate(){
    var id = '5902eee7f7417cd8fa5830e4';
    var updatestr = {'userpwd': 'qwe12345'};
    
    User.findByIdAndUpdate(id, updatestr, function(err, res){
        if (err) {
           throw err
        }
        
         console.log("Res:" + res);

    })
}

findByIdAndUpdate();

//其它更新方法

Model.findOneAndUpdate([conditions], [update], [options], [callback])　
```
- 删除数据  `Model.remove(conditions, [callback])`
```
function del(){
        let wherestr = {'username':'leo'};

        User.remove(wherestr,(err,res)=>{
            if(err){
                throw err
            }
            console.log(`Res:${res}`)
        })
    }
    del();

其它常用方法还有： 
　　Model.findByIdAndRemove(id, [options], [callback])　　　　　　
　　Model.findOneAndRemove(conditions, [options], [callback])
```
- 条件查询 `Model.find(conditions, [fields], [options], [callback])`
```
// 查询数据库
    function getByConditions(){
        let wherestr = {'username' : 'leo'};
        
        User.find(wherestr,(err, res)=>{
            if (err) {
               throw err
            }

            console.log(`Res:${res}`);
        })
    }

getByConditions();

//也可以传入对象 第2个参数可以设置要查询输出的字段
function getByConditions(){
    var wherestr = {'username' : 'leo'};
    var opt = {"username": 1 ,"_id": 0};
    
    User.find(wherestr, opt, (err, res)=>{
        if (err) {
            throw err
        }
        console.log("Res:" + res);
    })
}

/*
*比如我要查询年龄范围条件应该怎么写呢
*User.find({userage: {$gte: 21, $lte: 65}}, callback);    //这表示查询年龄大于等21而且小于等于65岁
 */

其实类似的还有：　
　　$or　　　　或关系
　　$nor　　　 或关系取反
　　$gt　　　　大于
　　$gte　　　 大于等于
　　$lt　　　　 小于
　　$lte　　　  小于等于
　　$ne            不等于
　　$in             在多个值范围内
　　$nin           不在多个值范围内
　　$all            匹配数组中多个值
　　$regex　　正则，用于模糊查询
　　$size　　　匹配数组大小
　　$maxDistance　　范围查询，距离（基于LBS）
　　$mod　　   取模运算
　　$near　　　邻域查询，查询附近的位置（基于LBS）
　　$exists　　  字段是否存在
　　$elemMatch　　匹配内数组内的元素
　　$within　　范围查询（基于LBS）
　　$box　　　 范围查询，矩形范围（基于LBS）
　　$center       范围醒询，圆形范围（基于LBS）
　　$centerSphere　　范围查询，球形范围（基于LBS）
　　$slice　　　　查询字段集合中的元素（比如从第几个之后，第N到第M个元素）
```
- 数量查询 `Model.count(conditions, [callback])`
```
function getCountByConditions(){
        let wherestr = {};
        User.count(wherestr,(err,res)=>{
            if(err){
                throw err
            }
            console.log(`Res:${res}`)
        })
    }
    getCountByConditions();
```
- 根据Id查询 `Model.findById(id, [fields], [options], [callback])`
```
function getById(){
        let id = '5902eee7f7417cd8fa5830e4';

        User.findById(id,(err,res)=>{
            if(err){
                throw err
            }
            console.log(`Res:${res}/nid`)
        })
    }
    getById()
```
- 模糊查询
```
```
- 分页查询
```
function getByPager(){
        
        let pageSize = 5;                   //一页多少条
        let currentPage = 1;                //当前第几页
        let sort = {'logindate':-1};        //排序（按登录时间倒序）
        let condition = {};                 //条件
        let skipnum = (currentPage - 1) * pageSize;   //跳过数
        
        User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec((err, res)=> {
            if (err) {
                throw err
            }
              console.log("Res:" + res);
        })
    }

    getByPager();
```

- 其他操作
    + 索引和默认值  

 ```
    let mongoose = require('./db.js'),
        Schema = mongoose.Schema;
    let UserSchema = new Schema({          
        username : { type: String , index: true},                    //用户账号
        userpwd: {type: String},                        //密码
        userage: {type: Number},                        //年龄
        logindate : { type: Date, default:Date.now}                       //最近登录时间
    });

    　//index ：建索引
    　//default：默认值
    module.exports = mongoose.model('User',UserSchema);

 ```


+ 其它常用方法

    - `Model.distinct(field, [conditions], [callback])` //去重

    - `Model.findOne(conditions, [fields], [options], [callback])` //查找一条记录

    - `Model.findOneAndRemove(conditions, [options], [callback])` //查找一条记录并删除

    - `Model.findOneAndUpdate([conditions], [update], [options], [callback])` //查找一条记录并更新 