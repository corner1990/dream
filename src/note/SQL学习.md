# SQL学习

### 什么是SQL

> Structured Query Language: 结构化查询语言

### 为什么要用SQL

- 使用界面操作数据库不方便
- 我们需要通过应用程序去操作数据库

### SQL的组成

- DDL(data definition language) 是数据定义语言，主要命令有：`CREATE `, `ALTER`, `DROP`,等，DDL主要是用在定义或改变表(TABLE)的结构，数据类型，表之间的链接和约束等初始化工作，大多数都在建立表的时候使用
- DML(data manipultion language) 是数据操纵语言，它是`SELECT`, `UPDATE`, `INSERT`, `DELETE`，这四条命令用来对数据库里的数据进行操作的语言
- DCL(data control language) 是数据库操纵语言，是用来设置或者更改数据库用户角色或者角色权限的语句，主要有：`GRANT`,`REVOKE`

### SQL 运算符

> 是一种符号，它是用来进行列之间或者变量之间比较和数学运算的

- 算数运算符

| 运算符 | 说明                                                 |
| ------ | ---------------------------------------------------- |
| +      | 加运算，求两个数或表达式相加的和，如1+1              |
| -      | 减少减运算，求两个数或表达式相减的差，如4-1          |
| *      | 乘运算，求两个数或表达式相乘的积，如2*2              |
| /      | 除运算，求两个数或表达式相除的商，如6/4的值为1       |
| %      | 取模运算，求两个数或表达式相除的余数，如：6%4的值为2 |

- 逻辑运算符

| 运算符 | 说明                                       |
| ------ | ------------------------------------------ |
| AND    | 当且仅当两个布尔表达式都为true时，返回TRUE |
| OR     | 当且仅当两个布尔表达式都为false，返回FALSE |
| NOT    | 布尔表达式的值取反                         |

- 比较运算符

| 运算符 | 说明     |
| ------ | -------- |
| =      | 等于     |
| >      | 大于     |
| <      | 小于     |
| <>     | 不等于   |
| >=     | 大于等于 |
| <=     | 小于等于 |
| !=     | 不等于   |



## 常用DDL实例

### 创建表

语法：`CREATE TABLE 表名(列，列，列)`

```sql
-- 创建表
CREATE TABLE `student` (
id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50),
age INT(11),
city VARCHAR(50)
)

-- 查询表结构
DESC student;
```

### 增加列

语法：`ALTER TABLE 表名 ADD COLUMN 列名 数据类型 是否可以为空 唯一性限制 ATERT age`, ater 表格该列添加到age列后边

```sql
-- 增加列
ALTER TABLE student ADD COLUMN idcard VARCHAR(20) NULL UNIQUE AFTER age;

-- 查询表结构
DESC student;
```

### 修改列

语法：`ALTER TABLE 表名 MODIFY COLUMN 需要修改的列 修改属性...;`

```sql
-- 修改列
ALTER TABLE  student MODIFY COLUMN 	idcard VARCHAR(30);

-- 查询表结构
DESC student;
```

### 删除列

语法：`ALTER TABLE 表名 DROP COLUMN 删除的列名;`

```sql
-- 删除一列
ALTER TABLE student DROP COLUMN idcard;

-- 查询表结构
DESC student;
```

### 增加主键约束

语法：`ALTER TABLE 表名 ADD PRIMARY KEY(列名);`

```sql
-- 增加主键约束
ALTER TABLE student ADD PRIMARY KEY(id);

-- 查询表结构
DESC student;
```

### 增加唯一索引

语法：`ALTER TABLE 表名 ADD UNIQUE INDEX 索引名(列)`

```sql
-- 增加位唯一索引
ALTER TABLE student ADD UNIQUE INDEX uq_idcard(idcard)

-- 查询表结构
DESC student;
```

### 增加默认约束

语法：`ALTER TABLE 表名 MODIFY COLUMN 列名 VARCHAR(50) DEFAULT 默认值;`

```sql
-- 增加默认约束
ALTER TABLE student MODIFY COLUMN city VARCHAR(50) DEFAULT '北京';

-- 查询表结构
DESC student;
```

### 增加外键约束

语法：`ALTER TABLE 增加外键的表 ADD CONSTRAINT 外键名称 FOREIGN KEY(关联外键的字段) REFERENCES 引用的外键的表(引用的外键的表字段)`

```sql
-- 因为外键需要依赖别的表做依赖，这里先创建两个表，一个课程表course，一个成绩表score

CREATE TABLE course(
id INT(11) PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(50)
);

CREATE TABLE score(
student_id INT(11),
course_id INT(11),
grade INT
);

-- 增加外键约束
ALTER TABLE score ADD CONSTRAINT fk_student_id FOREIGN KEY(student_id) REFERENCES student(id)

-- 查询表结构
DESC student;
```

### 删除外键

语法：`ALTER TABLE 数据表格 DROP FOREIGN KEY 外键字段;`

```sql
-- 删除外键
ALTER TABLE score DROP FOREIGN KEY fk_student_id;
```

## DML常用操作

### 查询所有

语法：`SELECT * FROM 表名;`

```sql
-- 查询所有
SELECT * FROM student;
```

### 插入数据

语法：`INSERT INTO student(key, key) VALUES(value, value)`

```sql
INSERT INTO student(name, age, idcard, city) VALUES('zhangsan', 10, 12345, 'bj')
INSERT INTO student(name, age, idcard, city) VALUES('leo', 12, 23456, 'gd')
INSERT INTO student(name, age, idcard, city) VALUES('mem', 10, 12375, 'bj')
INSERT INTO student(name, age, idcard, city) VALUES('hah', 12, 23456, 'gd')
```

### 更新数据

语法：`UPDATE student SET key=val,key=val WHERE 条件`

```sql
-- 多列同时更新使用逗号隔开，一定要加更新条件，防止更新错误
-- 多个条件联合使用and关键字链接 `id=7 AND age=10`
-- 判断某个字段是否为空 `age is NULL OR age=`

UPDATE student SET name='lisi',age=33 WHERE id=1
```

### 删除语句

语法：`DELETE FROM 表名 WHERE 条件`

```sql
-- DELETE 语句是对整个镜像操作的，因此不需要提供列名
-- 如果要删除主表，则要先删除字表记录
DELETE FROM student WHERE id=2
```

### 截断表

> 截断整个表中的数据,数据清空，单表结构，列，约束等不被改动，不能用于有外键约束的表表列重新开始编号，因为日志，数据也不能回复，所以工作中尽量不使用

语法：`TRUNCATE 表名`

```sql
TRUNCATE student; -- 删除所有行，操作不会写入日志，无法再恢复数据 
DELETE FROM student; -- 删除所有行 delete操作会被写入日志，可以恢复数据
```

### 数据查询

语法：`SELECT <列名> FROM <表名> ORDER BY 排序的列名> [ASC或者desc]`

```sql
-- 数据查询
-- 查询就是从客户端发出查询清酒到数据库，并从数据库返回查询的过程
-- 每次执行查询都只是从数据表中提取数据，并按表的方式呈现出来
-- 查询产生的是虚拟表，并不会保存起来

-- 查询北京的同学，按照id的倒序排列
SELECT *
FROM student
WHERE city='bj'
ORDER BY id DESC
```

### 自定义列名

```sql
-- 自定义列名
SELECT id AS '主键', name AS '姓名'
FROM student
WHERE city='bj'
ORDER BY id DESC;


SELECT id AS '主键', name AS '姓名', 1+2 '和'
FROM student
WHERE city='bj'
ORDER BY id DESC;
```

### 查询空行

语法：

```sql
-- 查询空行
SELECT *
FROM student
WHERE city IS NULL OR city=''
```

### 分页查询

语法：`SELECT * FROM 表名 LIMIT 跳过条数,查询条数`

```sql
-- 分页查询
-- SELECT * FROM student LIMIT 跳过的条数，查询条数
SELECT *
FROM student
LIMIT 2,2
```

### 查询常量

语法：

```sql
SELECT id,name,age,city,'中国' as country
FROM student
```

### 查询不同的条件

语法：`SELECT  DISTINCT 列名 FROM 表单名`

```sql
-- 查询同学们来自那些不同的城市 DISTINCT 相同的只会出现一次
SELECT  DISTINCT city
FROM student

SELECT name, DISTINCT city, age
FROM student
```

### 总结

> 以上是SQL常用的建表和数据库操作，做了一个简单的使用，下一章会加一些使用的实例代码。。。。供自己以后参考