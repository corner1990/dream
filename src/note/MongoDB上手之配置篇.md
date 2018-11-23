# MongoDB上手之配置篇

### 通过配置项启动数据库

| 参数      | 含义                             |
| --------- | -------------------------------- |
| --dbpath  | 指定数据库文件的目录             |
| --port    | 端口 默认是27017 28017           |
| --fork    | 以后台守护的方式进行启动         |
| --logpath | 指定日志文件输出路径             |
| --config  | 指定一个配置文件                 |
| --auth    | 以安全方式启动数据库，默认不验证 |

- mongo.conf

```js
dbpath=E:\mongo\data,
logpath=E:\mongo\log
port=5000
// 端口最大65535, 但是mongodb使用50000会自动退出，也不报错
```

- 启动服务器

```js
mongod --config mongo.conf
```

- 启动客户端

```js
mongo --port 50000
```

### 导入导出数据

这命令是保存成了文件格式

- mongoexport 导出数据
- mongoimport导入数据

| 参数          | 含义               |
| ------------- | ------------------ |
| -h [ --host ] | 连接的数据库       |
| --port        | 端口号             |
| -u            | 用户名             |
| -p            | 密码               |
| -d            | 导出的数据库       |
| -c            | 指定导出的集合     |
| -o            | 导出的文件存储路径 |
| -q            | 进行过滤           |

- 准备数据

```js
use school;
var students = [];
for(var i=1;i<=10;i++){
    students.push({name:'haha'+i,age:i});
}
db.students.insert(students);
db.students.find();
```

- 备份记录

```js
mongoexport -h 127.0.0.1 --port 50000  -d school -c students -o stu.bak
```

- 删除记录

```js
> db.students.remove({});
WriteResult({ "nRemoved" : 10 })
```

- 导入记录

```js
mongoimport --port 50000 --db school --collection students --file
stu.bak
```

###  备份与恢复

- **mongodump**

在Mongodb中我们使用mongodump命令来备份MongoDB数据。该命令可以导出所有数据到指定目录中。

> mongodump -h dbhost -d dbname -o dbdirectory
>
> - -h MongDB所在服务器地址，例如：127.0.0.1，当然也可以指定端口号：127.0.0.1:27017
> - -d 需要备份的数据库实例，例如：test
> - -o 备份的数据存放位置

```js
mongodump  -d school -o data.dmp
```

- mongorestore

mongodb使用 mongorestore 命令来恢复备份的数据。

- --host MongoDB所在服务器地址
- --db -d 需要恢复的数据库实例
- 最后的一个参数，设置备份数据所在位置

```js
mongorestore  data.dmp
mongorestore -d school data.bmp/school
```

> Mongodump可以backup整个数据库，而mongoexport要对每个collection进行操作，最主要的区别也是选择的标准是mongoexport输出的JSON比Mongodump的BSON可读性更高，进而可以直接对JSON文件进行操作然后还原数据（BSON转换JSON存在潜在兼容问题）。

- 直接拷贝数据

  > 直接把data目录拷贝一份

### 锁定和解锁数据库

为了数据的完整性和一致性，导出前要先锁定写入，导出后再解锁。

```js
> use admin;
switched to db admin
> db.runCommand({fsync:1,lock:1});
{
        "info" : "now locked against writes, use db.fsyncUnlock() to unlock",
        "seeAlso" : "http://dochub.mongodb.org/core/fsynccommand",
        "ok" : 1
}
> db.fsyncUnlock();
{ "ok" : 1, "info" : "unlock completed" }
```

### 安全措施

- 物理隔离
- 网络隔离
- 防火墙(IP/IP段/白名单/黑名单)
- 用户名和密码验证

### 用户管理

- **查看角色**

```js
show roles;
```

- **内置角色**
  - 数据库用户角色：read、readWrite；
  - 数据库管理角色：dbAdmin、dbOwner、userAdmin;
  - 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManage；
  - 备份恢复角色：backup、restore；
  - 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
  - 超级用户角色：root
  - 内部角色：__system


- **创建用户的方法**

```js
db.createUser({
    user:"root2",
    pwd:"123456",
    roles:[
        {
            role:"readWrite",
            db:"school"
        },
        'read'
   ]
})
> db.createUser({user:'root2',pwd:'123456',roles:[{role:'read',db:'school'}]});
Successfully added user: {
        "user" : "zfpx2",
        "roles" : [
                {
                        "role" : "read",
                        "db" : "school"
                }
        ]
}
```

- **查看用户的权限**

```js
> db.runCommand({usersInfo:'root2',showPrivileges:true});
{
        "users" : [
                {
                        "_id" : "admin.root2",
                        "user" : "root2",
                        "db" : "admin",
                        "roles" : [
                                {
                                        "role" : "read",
                                        "db" : "school"
                                }
                ]
}
```

-  **服务器启动权限认证**

```js
dbpath=E:\mongo\data
logpath=E:\mongo\log
port=50000
auth=true
```

**用户登录和修改密码**

```
> use admin;
> use admin;
switched to db admin
> db.auth('zfpx','123456')
1
> db.changeUserPassword('zfpx','123');
> db.auth('zfpx','123')
1
```

- **修改个人信息**

```js
db.runCommand({updateUser:'root',pwd:'123', customData:{
        name:'leo',
        email:'root@root.com',
        age:18,
}});
> db.runCommand({usersInfo:'root',showPrivileges:true})
```

- 用户的操作都需要在admin数据库下面进行操作
- 如果在某个数据库下面执行操作，那么只对当前数据库生效
- addUser已经废弃，默认会创建root用户，不安全，不再建议使用

### 数据库高级命令

- **准备数据**

```js
var students = [
        {name:'zfpx1',home:'北京',age:1},
        {name:'zfpx2',home:'北京',age:2},
        {name:'zfpx3',home:'北京',age:3},
        {name:'zfpx4',home:'广东',age:1},
        {name:'zfpx5',home:'广东',age:2},
        {name:'zfpx6',home:'广东',age:3}
]
db.students.insert(students);
```

- **count**

查看记录数

```js
db.students.find().count();
```

- **查找不重复的值 distinct**

```js
db.runCommand({distinct:'students',key:'home'}).values;

[ "北京", "广东" ]
```

- **group 分组**

```js
db.runCommand({
        group:{
                ns:集合名称，
                key:分组的键,
                initial:初始值,
            	query: 查询值,
                $reduce:分解器
                condition:条件,
                finalize:完成时的处理器
        }
});
```

- **按城市分组，求每个城市里符合条件的人的年龄总和**

```js
db.runCommand({
        group:{
                ns:'students',
                key:{home:true},
                initial:{total:0},
                $reduce:function(doc, result){
                     // doc 本次的文档
                     // result 上次的处理结果
                      result.total += doc.age;   
                },
                condition:{age:{$gt:1}},
                finalize:function(result){
                    result.desc = '本城市的总年龄为'+result.total;
                }
        }
});
```

- **删除集合**

```js
db.runCommand({drop:'students'});
```

- **runCommand常用命令**

```js
db.runCommand({buildInfo:1});
db.runCommand({getLastError:"students"});
db.persons.insert({_id:1,name:1});
db.persons.insert({_id:1,name:1});
db.runCommand({getLastError:"students"});
```

### 什么固定集合

MongoDB 固定集合（Capped Collections）是性能出色且有着固定大小的集合，对于大小固定，我们可以想象其就像一个环形队列，当集合空间用完后，再插入的元素就会覆盖最初始的头部的元素！ ![firstinfirstout](http://img.zhufengpeixun.cn/firstinfirstout.png)

-  **特性**
  + 没有索引
  + 插入和查询速度速度非常快 不需要重新分配空间
  + 特别适合存储日志

- **创建固定集合**
  - 我们通过createCollection来创建一个固定集合，且capped选项设置为true：
  - 还可以指定文档个数,加上max:1000属性：
  - 判断集合是否为固定集合: db.logs.isCapped()
  - size 是整个集合空间大小，单位为【KB】
  - max 是集合文档个数上线，单位是【个】
  - 如果空间大小到达上限，则插入下一个文档时，会覆盖第一个文档；如果文档个数到达上限，同样插入下一个文档时，会覆盖第一个文档。两个参数上限判断取的是【与】的逻辑。
  - capped 封顶的

    ```js
     db.createCollection('logs',{size:50,max:5,capped:true});
    ```

-  **非固定集合转为固定集合**

```js
db.runCommand({convertToCapped:"logs",size:5});
```

### gridfs

> gridfs是mongodb自带的文件系统，使用二进制存储文件。
>
> mongodb可以以BSON格式保存二进制对象。
>
> 但是BSON对象的体积不能超过4M。所以mongodb提供了mongofiles。它可以把一个大文件透明地分割成小文件（256K），从而保存大体积的数据。
>
> GridFS 用于存储和恢复那些超过16M（BSON文件限制）的文件(如：图片、音频、视频等)。
>
> GridFS 用两个集合来存储一个文件：fs.files与fs.chunks。
>
> 每个文件的实际内容被存在chunks(二进制数据)中,和文件有关的meta数据(filename,content_type,还有用户自定义的属性)将会被存在files集合中。

- **上传一个文件**
  - -d 数据库的名称
  - -l 源文件的位置
  - put 指定文件名

```js
mongofiles -d myfiles put test.txt
```

- **获取并下载文件**

```js
mongofiles -d myfiles  get 'test.txt'
```

-  **查看所有文件**

```js
mongofiles -d myfiles  list
>db.fs.files.find()
>db.fs.chunks.find({files_id:ObjectId('')})
```

- **删除文件**

```js
mongofiles -d myfiles delete "test.txt"
```

- **eval 服务器端脚本**
  - 执行JS语句
  - 定义JS全局变量
  - 定义函数
  - Stored JavaScript

```js
db.eval("1+1");
db.eval("return 'hello'");
db.system.js.insert({_id:"x",value:1});
db.eval("return x");
db.system.js.insert({_id:"say",value:function(){return 'hello'}});
db.eval("say()");
```