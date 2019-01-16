# mysql学习值安装配置

### 数据库的作用

- 存储大量数据，方便检索和访问
- 保持数据信息一致性，完整性
- 共享和安全
- 通过组合分析，产生新的有用的信息



### 数据库基本概念

- 实体

  > 只要是在客观世界存在的，可以被描述出来的都是实体

- 数据库(DB)

  > 就是数据仓库，可以存放结构化的数据

- 数据库管理系统(DBMS)

  > 一种系统软件，提供操作数据库的环境，可以通过数据库管理系统对数据进行CRUD。

- SQL

  > 结构化查询语言，专门用来和数据库经i选哪个交流的语言，几乎所有的DAMS都支持

- SQL规范

  - SQL语句不缺分大小写，建议SQL关键字大写，表名和列表小写
  - 命令用分号隔开
  - 命令可以缩进和换行，一种类型的的关键字放在一行
  - 可以单行和多行注释
    - `#`  和 `--`是单行注释
    - /**/ 多行注释

  ### 数据表

- 表是数据库中包含所有数据的数据库对象，也是其它对象的基础。

- 表定义是一个列的集合，数据在表中是按行和列的格式组织的，用来存放数据

- 行也称为记录用来存放一个个实体，列称为字段用来描述实体的某一个属性 学生管理系统



### MySQL简介

MySQL是一种关系数据库管理系统，关系数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。MySQL所使用的 SQL 语言是用于访问[数据库](https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E5%BA%93/103728)的最常用标准化语言

- 特点

  - 开源，免费
  - 性能高
  - 安装使用都简单

- 安装MySQL

  - [下载](https://dev.mysql.com/downloads/mysql/5.5.html)

  - 安装MySQL

    - 同意授权协议，进入下一步

    - typical：常用配置，Custom：自定义，complete：完整安装，功能很多

    - 通常选择typical，然后等待安装完成，后边默认会启动MySQL实例,并且安装下载，我们点击finsh即可

    - 弹出一个安装窗口，点击下一步

    - Detailed：详细配置，standard：标准安装，这里选择详细配置，进入下一步

    - developer： 开发模式，MySQL只能使用最小化的空间，server：服务器模式，可以占用中等内存，Deicated：MySQL会使用用经可能多的内存，这里选择developer，然后下载

    - 数据库用途：Multifunctional： 多功能数据库，可以优化服务器；Transactional： 支持事物；Non-Transaction：不支持事物；

    - MySQL的存储引擎：InnoDB：支持事物，速度会慢很多； MYISAM：不支持事物，但是速度会慢

    - 这里选择第一种，multifunctional，然后下一步

    - 选择存放数据的存储空间，进入下一步

    - 选择支持的并发配置：Decision：程序自己计算并发数； online：根据活动的链接自己计算；Manual：自定义设置， 这里选择第一个，进入下一步

    - enable tcp/ip:启用tcp/ip的网络，设置端口, Add firewall 选项，设置防火墙白名单;enable Strict：选择严格数据库模式，这里取消，然后进入下一步

    - 选择编码模式：standard： 默认编码；best support：多语言支持； manual selected： 手工指定；这里选择第三种，选择语言为utf8，选择下一步

    - Install as Windows server： 安装为一个服务（会和机器一起启动），选择服务名；Include Bin Directory：加入环境变量； 这里都选择勾选，然后进入下一步

    - 安全设置：modify： 设置用户名和密码；create an anonymous：创建匿名账户，然后执行安装；

- 启动MySQL

    ```bash
    net start MySQL
    net stop MySQL
    ```

- 手动在配置文件修改MySQL

    - 文件目录：`C:\Program Files\MySQL\MySQL Server 5.5\my.ini`, 常用配置如下：

    - port 端口号
    - basedir 安装目录
    - datadir 数据存放访目录
    - charcter-set-server 字符集
    - default-storage-engine 存储引擎
    - sql-mode 语法模式
    - max-connections 最大连接数

- 链接数据库

    ```baseh
    mysql -h 127.0.0.1 -P 3306 -uroot -p123456
    exit
    ```



### 总结

> 到了这里，MySQL数据库安装完毕，下一个学习MySQL的常用操作
























