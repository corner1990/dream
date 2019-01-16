# MySQL学习之常用操作



### 新建数据

- 语法：`CREATE DATABSE 数据库名称`

```base
CREATE DATABSE databse_name;
```



### 新建数据表

- 语法：`CREATE TABLE 表名称(列名称 数据类型, 列名称 数据类型)`

```bash
CREATE TABLE student(id int, name varchar(255), age int);
```

### 切换数据库

- 语法： `USE database_name`

```bash
USE school;
```

### 查看有哪些表

```base
show tables;
show tables from mysql;
```

### 显示当前数据库

```bash
select database();
```

### 查询表结构

- 语法：`DESC table_name`

```base
DESC student
```

### MySQL数据类型

- 整数类型：BIT、BOOL、TINY INT、SMALL INT、MEDIUM INT、 INT、 BIG INT

  | MySQL数据类型 | 含义（有符号）                        |
  | ------------- | ------------------------------------- |
  | tinyint(m)    | 1个字节  范围(-128~127)               |
  | smallint(m)   | 2个字节  范围(-32768~32767)           |
  | mediumint(m)  | 3个字节  范围(-8388608~8388607)       |
  | int(m)        | 4个字节  范围(-2147483648~2147483647) |
  | bigint(m)     | 8个字节  范围(+-9.22*10的18次方)      |

  > 取值范围如果加了unsigned，则最大值翻倍，如tinyint unsigned的取值范围为(0~256)。
  >
  > int(m)里的m是表示SELECT查询结果集中的显示宽度，并不影响实际的取值范围，没有影响到显示的宽度，不知道这个m有什么用

- 浮点数类型：FLOAT、DOUBLE、DECIMAL

  浮点型(float和double)

  | MySQL数据类型 | 含义                                                |
  | ------------- | --------------------------------------------------- |
  | float(m,d)    | 单精度浮点型    8位精度(4字节)     m总个数，d小数位 |
  | double(m,d)   | 双精度浮点型    16位精度(8字节)    m总个数，d小数位 |

  > 设一个字段定义为float(6,3)，如果插入一个数123.45678,实际数据库里存的是123.457，但总个数还以实际为准，即6位。整数部分最大是3位，如果插入数12.123456，存储的是12.1234，如果插入12.12，存储的是12.1200.
  >
  > 定点数:
  >
  > 浮点型在数据库中存放的是近似值，而定点类型在数据库中存放的是精确值。 
  >
  > decimal(m,d) 参数m<65 是总个数，d<30且 d<m 是小数位。

- 字符串类型：CHAR、VARCHAR、TINY TEXT、TEXT、MEDIUM TEXT、LONGTEXT、TINY BLOB、BLOB、MEDIUM BLOB、LONG BLOB

  | MySQL数据类型 | 含义                            |
  | ------------- | ------------------------------- |
  | char(n)       | 固定长度，最多255个字符         |
  | varchar(n)    | 固定长度，最多65535个字符       |
  | tinytext      | 可变长度，最多255个字符         |
  | text          | 可变长度，最多65535个字符       |
  | mediumtext    | 可变长度，最多2的24次方-1个字符 |
  | longtext      | 可变长度，最多2的32次方-1个字符 |

  - char和varchar：

    1.char(n) 若存入字符数小于n，则以空格补于其后，查询之时再将空格去掉。所以char类型存储的字符串末尾不能有空格，varchar不限于此。 

    2.char(n) 固定长度，char(4)不管是存入几个字符，都将占用4个字节，varchar是存入的实际字符数+1个字节（n<=255）或2个字节(n>255)，

    所以varchar(4),存入3个字符将占用4个字节。 

    3.char类型的字符串检索速度要比varchar类型的快。

  - varchar和text： 

    1.varchar可指定n，text不能指定，内部存储varchar是存入的实际字符数+1个字节（n<=255）或2个字节(n>255)，text是实际字符数+2个字

    节。 

    2.text类型不能有默认值。 

    3.varchar可直接创建索引，text创建索引要指定前多少个字符。varchar查询速度快于text,在都创建索引的情况下，text的索引似乎不起作用。

     

  - 二进制数据(_Blob)

    1._BLOB和_text存储方式不同，_TEXT以文本方式存储，英文存储区分大小写，而_Blob是以二进制方式存储，不分大小写。

    2._BLOB存储的数据只能整体读出。 

    3._TEXT可以指定字符集，_BLO不用指定字符集

- 日期类型：Date、DateTime、TimeStamp、Time、Year
  | MySQL数据类型 | 含义                          |
  | ------------- | ----------------------------- |
  | date          | 日期 '2008-12-2'              |
  | time          | 时间 '12:25:36'               |
  | datetime      | 日期时间 '2008-12-2 22:06:44' |
  | timestamp     | 自动存储记录修改时间          |

  > 若定义一个字段为timestamp，这个字段里的时间数据会随其他字段修改的时候自动刷新，所以这个数据类型的字段可以存放这条记录最后被修改的时间。

- 其他数据类型：BINARY、VARBINARY、ENUM、SET、Geometry、Point、MultiPoint、LineString、MultiLineString、Polygon、GeometryCollection等


  - 数据类型的属性

| MySQL关键字        | 含义                     |
| ------------------ | ------------------------ |
| NULL               | 数据列可包含NULL值       |
| NOT NULL           | 数据列不允许包含NULL值   |
| DEFAULT            | 默认值                   |
| PRIMARY KEY        | 主键                     |
| AUTO_INCREMENT     | 自动递增，适用于整数类型 |
| UNSIGNED           | 无符号                   |
| CHARACTER SET name | 指定一个字符集           |



### 数据完整性

- 为了实现数据完整性，需要验证数据库中每行和每列数据是否符合要求
- 在创建的时候，应该保证以后输入是正确的，错误数据不允许输入

1. **域完整性**, 不同字段需要设置为各种合适的类型，比如年龄就是整数类型
2. **默认值**，如果 用户没有指定值的清况下给此字段提供一个预先设定的值
3. **非空约束**，可以指定某个字段不能为空，必须提供一个非空值



### 实体完整性

1. **主键约束**

   > 表中一列或者几列组合的值能用来唯一标识表中的每一行，这样的列或者列组合称为表的主键，主键表的数据不同重复。
   >
   > > 如果两列或者多列组合起来唯一标识表中的每一行，则该主键又称为"组合键"
   >

2. **主键的选择标准**

   1. 最少性 尽量选择单个键作为主键
   2. 稳定性 ，由于主键是用来在两个表间建立联接的，所以不能经常更新，最好就不更新

3. **外键**

   > 成绩表中的学生ID应该在学生表中是存在的 我们应该让成绩表中的ID只能引用学生表中的ID，它们的值应该是一一对应的，也就是说成绩表中的ID是成绩表中的外键，对应学生表的主键 ，这样就可以保证数据的引用完整性

4. **唯一约束**

唯一约束是指某个字段值是唯一的，在所有的记录中不能有重复的值.

> 学生的身份证号可以设置为唯一约束

5. **标识列**

- 当表中没有合适的列作为主键时可以考虑增加标识列，标识列是一个无实际业务含义的列，仅仅用来区分每条记录。

- 标识列的值是自动生成的，不能在该列上输入数据

  > 思考: 如果标识列id的初始值为1，增长量为3，则输入3行数据以后，再删除1行，下次再输入数据行的时候，标识值自动插入的值是多少?

6. **外键约束**

一个表的外键必须引用另一个表的主键,比如成绩表中的学生ID会引用学生表的主键，课程ID会引用成绩表的主键

- 主表没有记录，子表中不能添加相应的记录

- 修改和删除主表记录不能让子表记录孤立，必须相应修改和删除

- 数据操作 8.1 创建学生表

  ```sql
  -- 创建学生表
  CREATE TABLE student(
  	-- 行 类型 是否可以为空 键 自动增加
  	id INT NOT NULL PRIMARY KEY auto_increment,
  	name VARCHAR(64) NOT NULL,
  	age INT NOT NULL,
  	city VARCHAR(32)
  )
  
  -- 查询表
  SELECT * FROM student;
  
  -- 增加身份证号列
  ALTER TABLE student ADD COLUMN idcard VARCHAR(18) NULL;
  
  -- 修改列
  ALTER TABLE student MODIFY COLUMN idcard VARCHAR(32) NULL;
  
  -- 查询表结构
  DESC student;
  
  -- 删除一列
  ALTER TABLE student DROP COLUMN idcard; 
  ```

**添加约束**

```sql
DROP TABLE student;
-- 创建学生表
CREATE TABLE student(
	-- 行 类型 是否可以为空 键 自动增加
	id INT ,
	name VARCHAR(64) NOT NULL,
	age INT NOT NULL,
	city VARCHAR(32)
)

-- 查询表
SELECT * FROM student;

-- 增加身份证号列
ALTER TABLE student ADD COLUMN idcard VARCHAR(18) NULL;

-- 修改列
ALTER TABLE student MODIFY COLUMN idcard VARCHAR(32) NULL;

-- 查询表结构
DESC student;

-- 删除一列
ALTER TABLE student DROP COLUMN idcard; 

-- 添加主键约束
ALTER TABLE student ADD PRIMARY key(id)

-- 添加唯一约束
ALTER TABLE student ADD UNIQUE INDEX un_idcard(idcard)

-- 默认值约束
ALTER TABLE student MODIFY COLUMN city VARCHAR(64) DEFAULT '北京';

-- 修改id为自增
ALTER TABLE student MODIFY COLUMN id INT AUTO_INCREMENT;

-- 在age后边添加一列
ALTER TABLE student ADD COLUMN province VARCHAR(32) AFTER age;

-- 创建一个表 演示外键约束
CREATE TABLE score(
	student_id INT
)

DESC score;

-- 添加外键约束 
ALTER TABLE score ADD CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES student(id)

-- 删除约束
ALTER TABLE score DROP FOREIGN KEY fk_student_id

```







