### 扩展mongoose模型
> 业务分层

`service(多个模型)->到单个模型->model 模型定义`
`service(多个模型)->到单个模型->model (模型定义+扩展方法)`

### statics 对类进行扩展

> 当针对所有集合操作的扩展在使用这个扩展
>
> 根据用户名查找用户文档

```js
 // this指向model
// 扩展方法
PersonSchema.statics.findByUsername = function (username, callback) {
    return this.findOne({ username }, callback);
}

// 调用
Person.findByUsername('zfpx', function (err, doc) {
    console.log(doc);
});

```

- methods 对实例进行扩展

  > 只对当前文档进行操作的的时候使用这个方法扩展

```js
// 扩展方法
PersonSchema.methods.exist = function (callback) {
    let query = { username: this.username, password: this.password };
    return this.model('Person').findOne(query, callback);
}

let person = new Person({
   username: 'hello',
   password: '123456',
   phone: '12312312312',
   firstname: 'first',
   lastname: 'last' });

// 调用扩展方法
person.exist(function (err, doc) {
console.log(err, doc);
});


```

- virutal虚拟属性，(类似vue中的计算属性)

  + virtual是虚拟属性的意思，即原来Schema定义里是不存在该属性，后来通过virutal方法赋予的属
  + Schema中定义的属性是要保存到数据库里的，而virtual属性基于已有属性做的二次定义。
  + 模型属性 = Schema定义的属性+virtual属性

  ```js
  // 定义虚拟属性
  PersonSchema.virtual('fullname').get(function () {
      //this指向实例
      return this.firstname + this.lastname;
  
  });
  
  let Person = conn.model('Person', PersonSchema);
  
  let person = new Person({
          username: 'hello',
          password: '123456',
          phone: '12312312',
          firstname: 'first',
          lastname: 'last' 
      });
  
  // 获取属性
  console.log(person.fullname);
  
  ```

  


### hook

> 在用户注册保存的时候，需要先把密码通过salt生成hash密码，并再次赋给password，
>
> 我们在Schema上定义hook：
```js
// 定义hook
PersonSchema.pre('save', function (next) {
    this.password =  crypto.createHmac('sha256',secret)
        .update(this.password)
        .digest('hex');
    next();
});

// 定义hook
PersonSchema.statics.login = function (username, password, callback) {
    password = crypto.createHmac('sha256', secret).update(password).digest('hex');
    return this.findOne({ username, password }, callback);
}
// 调用
Person.login('leo', '123456', function (err, doc) {
    console.log(err, doc);
});
```
### schema 插件
> Schemas是可插拔的，也就是说，它们提供在应用预先打包能力来扩展他们的功能。

```js
// 自己新建一个文件，导出以下插件
module.exports = exports = function lastModified(schema,options){
  schema.add({lastModify:Date});
  schema.pre('save',function(next){
    this.lastModify = new Date;
    next();
  });
  if(options&& options.index){
    schema.path('lastModify').index(options.index);
  }
}

// 在需要使用插件的地方那个引入插件
let plugin = require('./plugin');
let Person = new Schema({});
Person.plugin(plugin,{index:true});
// Person 是用户自己定义的Schema
// Person.plugin 是为Person增加plugin
// plugin有2个参数
// 插件对象 plugin
// 配置项 {index:true}
schema.add({age:Number});
```


### MongoDB 聚合

> MongoDB中聚合(aggregate)主要用于处理数据(诸如统计平均值,求和等)，并返回计算后的数据结果。有点类似sql语句中的 count(*)。 aggregate() 方法 MongoDB中聚合的方法使用aggregate()。

- 语法

> aggregate() 方法的基本语法格式如下所示：

```js
db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)
```

- 分组

>  现在我们通过以上集合计算每个作者所写的文章数，使用aggregate()计算结果如下：

```js
db.article.insert({uid:1,content:'1'});
db.article.insert({uid:2,content:'2'});
db.article.insert({uid:1,content:'3'});
db.article.aggregate([{$group:{_id:'$uid',total:{$sum:1}}}]);

{ "_id" : 2, "total" : 1 }
{ "_id" : 1, "total" : 2 }

select uid, count(*) total from article group by uid

```

- 聚合的表达式

  | 表达式   | 描述                                         | 实例                                                         |
  | -------- | -------------------------------------------- | ------------------------------------------------------------ |
  | sum      | 计算总和                                     | `db.mycol.aggregate([{$group : {_id : "$uid", num_tutorial : {$sum : "$visit"}}}])` |
  | avg      | 计算平均值                                   | `db.mycol.aggregate([{$group : {_id : "$uid", num_tutorial : {$avg : "$visit"}}}])` |
  | min      | 获取集合中所有文档对应值得最小值             | `db.mycol.aggregate([{$group : {_id : "$uid", num_tutorial : {$min : "$visit"}}}])` |
  | max      | 获取集合中所有文档对应值得最大值             | `db.mycol.aggregate([{$group : {_id : "$uid", num_tutorial : {$max : "$visit"}}}])` |
  | push     | 在结果文档中插入值到一个数组中               | `db.mycol.aggregate([{$group : {_id : "$uid", url : {$push: "$url"}}}])` |
  | addToSet | 在结果文档中插入值到一个数组中，但不创建副本 | `db.mycol.aggregate([{$group : {_id : "$uid", url : {$addToSet : "$url"}}}])` |
  | first    | 根据资源文档的排序获取第一个文档数据         | `db.mycol.aggregate([{$group : {_id : "$uid", first_url : {$first : "$url"}}}])` |
  | last     | 根据资源文档的排序获取最后一个文档数据       | `db.mycol.aggregate([{$group : {_id : "$uid", last_url : {$last : "$url"}}}])` |

  ```js
  db.article.insert({uid:1,content:'3',url:'url1'});
  db.article.aggregate([{$group : {_id : "$uid", url : {$push: "$url"}}}])
  ```

  

- 管道的概念

  > 管道在Unix和Linux中一般用于将当前命令的输出结果作为下一个命令的参数。 MongoDB的聚合管道将MongoDB文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

  

  - $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
  + $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
  - $limit：用来限制MongoDB聚合管道返回的文档数。
  - $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
  - $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
  - $group：将集合中的文档分组，可用于统计结果。
  - $sort：将输入文档排序后输出。



- 过滤显示字段

    ```js
    db.article.aggregate(
        { $project : {
            _id:0,
            content : 1 ,
        }}
     );
    ```



- 过滤文档

    ```js
    db.article.aggregate([
            { $match : { visit : { $gt : 10, $lte : 200 } } },
            { $group: { _id: '$uid', count: { $sum: 1 } } }
    ]);

    ```

- 跳过指定数量

  ```js
  db.article.aggregate( [
      { $match : { visit : { $gt : 10, $lte : 200 } } },
      { $group: { _id: '$uid', count: { $sum: 1 } } },
      { $skip : 1 }
   ] );
  
  ```

- Mongoose中使用

    ```js
    Article.aggregate([
        { $match : { visit : { $gt : 10, $lte : 200 } } },
        { $group: { _id: '$uid', count: { $sum: 1 } } },
        { $skip : 1 }
     ])

    ```

