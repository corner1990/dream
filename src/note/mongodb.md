# MongoDB 

    MongoDB是一个跨平台，面向文档的数据库，提供高性能，高可用性和 易于扩展。MongoDB是工作在集合和文档上一种概念。  

### 数据库  
    数据库是一个集合的物理容器。每个数据库获取其自己设定在文件系统上的文件。一个单一的MongoDB服务器通常有多个数据库。  

### 集合  
    集合是一组MongoDB的文件。它与一个RDBMS表是等效的。集合不强制执行模式、集合中的文档可以有不同的字段。  
    通常在一个集合中的所有文件都是类似或相关的。  

### RDBMS 
    RDBMS即关系数据库管理系统(Relational Database Management System)，是将数据组织为相关的行和列的系统，  
    而管理关系数据库的计算机软件就是关系数据库管理系统，常用的数据库软件有Oracle、SQL Server等。  

### 文档  
    文档是一组键值对。文档具有动态模式。  
    动态模式：在同一个集合的文档字段或结构，并且相同的字段可以保持不同类型的数据。  

### 示例文档   

```
    {
       _id: ObjectId(7df78ad8902c)
       title: 'MongoDB', 
       description: 'MongoDB is no sql database',
       by: 'corner',
       url: 'www.baidu.com',
       tags: ['mongodb', 'database', 'NoSQL'],
       likes: 100, 
       comments: [  
          {
             user:'user1',
             message: 'My first comment',
             dateCreated: new Date(2017,3,31,2,15)
             like: 0 
          },
          {
             user:'user2',
             message: 'My second comments',
             dateCreated: new Date(2017,3,31,2,15),
             like: 5
          }
       ]
    }
```

### 在win上安装MongoDB  

- 在MongoDB官网[http://www.mongodb.org/downloads ](http://www.mongodb.org/downloads )下载MongoDB文件  
- 安装  
    + 提取下载的文件到c:\ 驱动器或其他位置。 确保压缩文件夹名称是 mongodb-win32-i386-[version] 或 mongodb-win32-x86_64-[version]. 这里 [version] 是MongoDB的下载版本。  
    + 打开命令行安装  

- 如果安装 MongoDB 在不同的位置（建议安装到 D:\software），那么需要设置路径 dbpath 在 mongod.exe 指向 data 备用路径。

```
//使用命令行进入mongodb的安装目录，我的在e:\根目录  
// 以下命令每行输入完回车
//mongo的安装盘符
lixinglong@JY-PC-2010142 C:>e:
//进入安装目录
lixinglong@JY-PC-2010142 E:\mongodb 
//进入程序所在目录
lixinglong@JY-PC-2010142 E:\mongodb > cd bin
//启动数据库服务
lixinglong@JY-PC-2010142 E:\mongodb\bin> mongod.exe --dbpath "e:\mongodb\blog" 
E:\mongodb\bin> mongo.exe
```

- 这里显示等待连接的控制台输出消息，指示mongo.ese成功运行
```
E:\MongoDB\bin>mongo.exe
MongoDB shell version: 3.0.4
connecting to: test
>db.test.save( { a: 1 } )
>db.test.find()
{ "_id" : ObjectId(5879b0f65a56a454), "a" : 1 }
>
```

- 这将显示已安装的MongoDB并成功运行。下一次鱼腥只需要命令号输入：

```
E:\mongodb\bin\mongod.exe --dbpath "e:\mongodb\blog"
E:\mongodb\bin\mongod.exe
```

### 创建数据库  
- MongoDB use DATABASE_NAME 用于创建数据库。该命令如果数据库不存在，将创建一个新的数据库， 否则将返回现有的数据库。
- 语法 
```
<!-- DATABASE_NAME 表示想要创建的数据库名称 -->

> use DATABASE_NAME

<!-- 创建一个数据库 名称是 blog  use blog-->

use blog  
switched to db blog

<!-- 检查当前选择的数据库 db-->

> db
blog

<!-- 查询数据库列表 show dbs -->


> show dbs
blog   0.000GB
local  0.000GB

<!-- 创建的数据库blog不存在于列表中。要显示的数据库,需要至少插入一个文档进去 -->

> db.blog insert({name: "leo","age":"18"})
> show dbs
> 
<!-- MongoDB 默认 的数据库是test。如果没有创建任何数据库，那么集合将被保存在测试数据库 -->
```

### 删除数据库

- `db.dropDatabase()` 命令用于删除现有的数据库  
- 语法  

```
<!-- 删除选定的数据库，如果没有指定任何数据库，那么它会删除默认的“test”数据库 -->

> db.dorpDatabase()
 
<!-- 删除blog数据库 -->

> db.dropDatabase()
 { "dropped" : "blog", "ok" : 1 }

```

### 创建集合  
- MongoDB 的 `db.createollection(name[,option])` 用于创建集合。在命令行中，name是集合的名称，option是一个对象，用于指定集合的配置  
- option 选项列表
```
{
    capped: Boolean,
    autoindexID : Boolean,
    size : number,
    max :number
}

//capped :（可选）如果为true，它启用上限集合。上限集合是一个固定大小的集合，当它达到其最大尺寸会自动覆盖最老的条目。 如果指定true，则还需要指定参数的大小。

//autoIndexID:（可选）如果为true，自动创建索引_id字段。默认的值是 false.

//size : （可选）指定的上限集合字节的最大尺寸。如果capped 是true，那么还需要指定这个字段。

// max :  （可选）指定上限集合允许的最大文件数。
```
- MongoDB中并不需要创建接话。当插入一下文档MongoDB会自动创建集合。
- 语法  
```
<!-- 新建一个users的集合 -->
> use conner
switched to db conner

> db.createCollection('users')
{ "ok" : 1 }

<!-- 使用show collections 命令来检查创建的集合 -->
> show collections
users
```
- 删除集合 `db.collection.drop()`  
- 语法
```
<!-- 删除集合 user -->
> db.user.drop() 
true
// 返回一个Boolean 值

```
### 插入文档  
- MongoDB 使用`insert()`方法
- 语法
```
<!-- 给集合 users 插入文档 -->
db.users.insert({name:"leo","age":"16"})

//如果我们不指定_id参数插入的文档，那么 MongoDB 将为文档分配一个唯一的ObjectId。
//_id 是12个字节十六进制数在一个集合的每个文档是唯一的。 如下：
_id: ObjectId(4 bytes timestamp, 3 bytes machine id, 2 bytes process id, 3 bytes incrementer)

//插入多个文档，可以通过文档 insert() 命令的数组方式。
db.users.insert(
    [{name:"leo","age":"16"},
    {name:"jon","age":"18"},
    {name:"ufo","age":"123456"}]
    )
```

### 查询文档
- 查询数据，使用`find()`方法；
- 语法  
```
<!-- 在集合 user 中查找数据 -->

> db.users.find()
{ "_id" : ObjectId("58de21e61ca0610f4922a616"), "name" : "leo", "age" : "16" }
{ "_id" : ObjectId("58de21e61ca0610f4922a617"), "name" : "jon", "age" : "18" }
{ "_id" : ObjectId("58de21e61ca0610f4922a618"), "name" : "ufo", "age" : "123456" }

<!-- 除了find()方法还有findOne()方法，仅返回一个文档。 -->
```

- 查询文档在一些条件的基础上，可以使用下面的操作   

| 操作 | 语法| 示例|
|:------:|----|----|
|Equality|{key:value}|db.mycol.find({"name":"leo"}).pretty()|
|Less Than | {key:{$lt:value}}   |  db.mycol.find({"likes":{$lt:50}}).pretty()|
|Less Than Equals|{key:{$lte:value}}|db.mycol.find({"likes":{$lte:50}}).pretty()   |
|Greater Than |{key:{$gt:value}} | db.mycol.find({"likes":{$gt:50}}).pretty()|
|Greater Than Equals|{key:{$gte:value}}|<value>}}   db.mycol.find({"likes":{$gte:50}}).pretty()|
|Not Equals|{key:{$ne:value}}|db.mycol.find({"likes":{$ne:50}}).pretty()|  

- AND 在MongoDB 
- 语法 
```
db.usera.find({key1:value1, key2:value2}).pretty()
```

- OR 在 MongoDB 
- 语法  
```
>db.users.find(
   {
      $or: [
         {key1: value1}, {key2:value2}
      ]
   }
).pretty()
```

- 使用 AND 和 OR 在一起  
```
db.mycol.find("likes": {$lt:10}, $or: [{"age": "12"}, {"name": "leo"}] }).pretty()
```

### 更新文档  
    MongoDB的update()和save()方法用于更新文档到一个集合。 update()方法将现有的文档中的值更新，而save()方法使用传递到save()  
    方法的文档替换现有的文档。

- MongoDB Update() 方法
```
<!-- update()方法的基本语法如下 -->
db.user.updata({key,value},{key,value})

<!-- 默认情况下，MongoDB将只更新单一文件，更新多，需要一个参数 'multi' 设置为 true。 -->
  db.mycol.update({key,value},{$set:{key,value}},{multi:true})

```
- MongoDB Save() 方法 
```
<!-- mongodb 的 save()方法如下所示的基本语法： -->

  db.COLLECTION_NAME.save({_id:ObjectId(),NEW_DATA})

```
### 删除文档  
    
    MongoDB 的 remove()方法用于从集合中删除文档。remove()方法接受两个参数。一个是标准缺失，第二是justOne标志

- deletion criteria 根据文件（可选），删除条件将被删除
- jsutOne 可选 如果设置为true或1，然后取出一个文档  
- 语法
```
// remove() 
 > db.users.find()
{ "_id" : ObjectId("58de21e61ca0610f4922a616"), "name" : "leo", "age" : "16" }
{ "_id" : ObjectId("58de21e61ca0610f4922a617"), "name" : "jon", "age" : "18" }
{ "_id" : ObjectId("58de21e61ca0610f4922a618"), "name" : "ufo", "age" : "123456" }
<!-- 删除name为ufo的文档 -->
> db.users.remove({name:'ufo'})
WriteResult({ "nRemoved" : 1 }) 

<!-- 只删除一个 -->
> db.COLLECTION_NAME.remove(DELETION_CRITERIA,1)

<!-- 删除所有文件 -->
> db.COLLECTION_NAME.remove()
```
### MongoDB 投影 
- mongodb投影意义是只选择需要的数据，而不是选择整个一个文档的数据。如果一个文档有5个字段，只需要显示3个，只从中选择3个字段。 
- MongoDB的find()方法，解释了MongoDB中查询文档接收的第二个可选的参数是要检索的字段列表。在MongoDB中，当执行find()方法，那么它会显示一个文档的所有字段。要限制这一点，需要设置字段列表值为1或0。1是用来显示字段，而0被用来隐藏字段。  
- 语法
```
> db.COLLECTION_NAME.find({},{KEY:1})
<!-- 请注意在执行find()方法时_id字段始终显示，如果不想要显示这个字段，那么需要将其设置为0 -->
```
### 限制文档  
- MongoDB Limit() 方法
- 要在MongoDB中限制记录，需要使用limit()方法。 limit() 方法接受一个数字类型的参数，这是要显示的文档数量。
- 语法： 
```
> db.COLLECTION_NAME.find().limit(NUMBER)

//如果不指定 limit()方法的参数数量，然后它会显示集合中的所有文档。
```

- MongoDB Skip() 方法
- 除了 limit()方法还有一个方法 skip()也接受数字类型参数并用于跳过文件数。
- 语法 
```
>db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
// skip()方法的默认值是0
```

### 文档排序

- 要排序MongoDB中的文档，需要使用 sort()方法。 sort() 方法接受一个包含字段列表以及排序顺序的文档。 要使用1和-1指定排序顺序。1用于升序，而-1是用于降序。
- 语法
```
> db.COLLECTION_NAME.find().sort({KEY:1})
> 
//如果不指定排序类型，那么 sort() 方法将以升序排列文档。
```

### MongoDB索引
- 索引支持查询高效率执行。如果没有索引，MongoDB必须扫描集合中的每一个文档，然后选择那些符合查询语句的文档。若需要 mongod 来处理大量数据，扫描是非常低效的。
- 索引是特殊的数据结构，存储在一个易于设置遍历形式的数据的一小部分。索引存储在索引中指定特定字段的值或一组字段，并排序字段的值。
- 要创建索引，需要使用MongoDB的ensureIndex()方法。
- 语法
```
db.users.ensureIndex({KEY:1})
//这里键是要创建索引字段，1是按名称升序排序。若以按降序创建索引，需要使用 -1.

//ensureIndex()方法，可以通过多个字段，来创建多个字段索引
>db.users.ensureIndex({"title":1,"description":-1})

```
