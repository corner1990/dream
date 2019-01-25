# SQL学习之自定义函数

### 前言

> 总有些需求是奇葩的，总有偷懒，是通过封装函数实现的，总有些骚操作，都是需要自定义的...

### SQL自定义函数

- 自定义函数是对MySQL的扩展，使用方式和内置函数相同
- 函数必须要有参数和返回值
- 函数可以接收任意类型的值，也可以接收这些类型的参数
- 函数体由合法的SQL语句组成
- 函数体可以是简单的SELECT语句或INSERT语句，如果是复合结构要用BEGIN...END
- 函数体也可以包含声明，循环和流程控制
- 返回值只能有一个

### 语法

```sql
-- 定义一个函数，返回中文的当前时间
CREATE FUNCTION ZNOW() RETURNS VARCHAR(255)
RETURN DATE_FORMAT(NOW(), '%Y年%m月%d日 %H点%i分%s秒');

-- 调用自定义函数
SELECT ZNOW() -- 2019年01月21日 14点53分14秒
```

- 可以接受参数的自定义函数

  ```sql
  -- 定义可以接收参数的函数
  CREATE FUNCTION ZADD(num1 INT, num2 INT) RETURNS INT
  RETURN num1 + num2
  
  -- 调用函数 
  SELECT ZADD(2,4) -- 6
  ```

- 定义多行代码函数

  ```sql
  -- 定义多行代码函数
  -- 准备一个数据表格
  CREATE TABLE stu2(id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50))
  
  SELECT * FROM stu2;
  DESC stu2;
  
  -- 函数功能，传入一个名称，函数里吧这个名字插入到stu2中，然后返回新生成的ID号
  
  CREATE FUNCTION ADD_USER(name VARCHAR(50)) RETURNS INT
  BEGIN
  INSERT INTO stu2(name) VALUES(name);
  -- 调用last_insert_id拿到最新的id
  RETURN LAST_INSERT_ID();
  END
  
  -- 调用函数
  SELECT ADD_USER('LEO'), ADD_USER('JAY'), ADD_USER('JAYY');
  ```

### 模糊查询

> 就是查询的条件是模糊的，不是特别明确的

- 通配符

  代替一个或多个真正的字符，与LIKE 关键字一起使用

  | 通配符 | 解释                             | 示例             | 符合条件         |
  | ------ | -------------------------------- | ---------------- | ---------------- |
  | _      | 一个字符                         | LIKE 'a_'        | as, ad...        |
  | %      | 任意长度字符串                   | LIKE 'c%'        | code, cool ...   |
  | []     | 括号中指定范围内一个字符         | LIKE '1[35]5'    | 135 or 155       |
  | [^]    | 不在括号中所指定范围内的一个字符 | LIKE  1\[^1-2]5' | 135, 145, 155... |

  - 查询姓名里包含a的 %
  - 查看姓名是以a开头的 %
  - 查看姓名第三个字符是a的 _

- 简单的使用demo

  ```sql
  -- 查询所有name为L开头的数据
  SELECT * FROM stu2 WHERE name LIKE 'L%'
  
  -- 查询所有name为Y为结尾的数据
  SELECT * FROM stu2 WHERE name LIKE '%Y'
  
  -- 查询所有name中包含a的结果
  SELECT * FROM stu2 WHERE name LIKE '%A%'
  
  -- 匹配单个字符
  SELECT * FROM stu2 WHERE name LIKE '%A_'
  
  
  -- 查询某一列在指定的规范内的记录，包括两个边界
  SELECT * FROM score WHERE grade BETWEEN 60 AND 100;
  -- 写法二
  SELECT * FROM score WHERE grade >= 60 AND grade <= 100;
  
  
  -- 查询某一个列的值是否在我们查询的列表中
  SELECT * FROM student;
  SELECT * FROM student WHERE city IN ('bj', 'gd');
  SELECT * FROM student WHERE city='bj' OR city = 'gd';
  
  -- 查询某一西字段为空的数据
  SELECT * FROM student WHERE age IS NULL;
  ```


### 聚合函数

> 对一组值进行计算，并返回计算后的值，一般用来统计数据

- 使用示例

  ```sql
  -- sum 求和
  SELECT SUM(age) FROM student WHERE city='bj'
  
  -- max计算最大值和最小值
  SELECT MAX(age) FROM student WHERE city='bj'
  SELECT MIN(age) FROM student WHERE city='bj'
  
  -- 求平均值
  SELECT AVG(age) FROM student WHERE city='bj';
  
  -- 统计记录数
  SELECT COUNT(age) FROM student WHERE city = 'bj'
  
  -- 分组函数
  -- 如果是分组的的话select后边只能更分组的列的聚合函数
  SELECT student_id, MIN(grade)
  FROM student
  WHERE grade > 0 -- 用来过滤分组前的记录
  GROUP BY student_id -- 分组字段
  HAVING MIN(grade) < 80; -- 用来过滤分组后的数据
  ORDER BY MIN(grade) ASC -- 排序 这里只能放聚合函数
  LIMIT 1,2-- 过滤
  ```

- 常见写法

  ```sql
  -- 统计每位同学的平均成绩表-单列分组
  SELECT student_id, AVG(grade)
  FROM score
  GROUP BY student_id
  
  
  -- 统计没门课程最高分，并按照分数从高到低排列
  SELECT course_id, MAX(grade) AS grade
  FROM score
  GROUP BY course_id
  ORDER BY grade DESC
  
  -- 统计各省的男女同学人数- 多列分组
  SELECT city, age, COUNT(id) FROM student
  GROUP BY city, age
  
  
  
  -- 统计学生人数超过1人的城市
  SELECT city, COUNT(1) AS count
  FROM student
  GROUP BY city
  HAVING count > 1
  ```

### 自查询

- 自查询就是只出现在其他SQL语句中的select语句
- outer QUERY/Inner QUERY
- 子查询指嵌套在查询内部，且必须出现在圆括号中
- 子查询可以包含多个关键字或条件
- 子查询的外层查询可以是：SELECT，INSERT，UPDATE SET
- 子查询可以返回常量，一行数据，一列数据或者其他子查询

```sql
-- 使用示例

-- 查询年龄大于平均年龄的同学
SELECT AVG(age) FROM student

SELECT * FROM student WHERE age > (SELECT AVG(age) FROM student)

-- ANY SOME ALL
-- ALL 大于所有值
-- 查询哪位同学的年龄
SELECT * FROM student WHERE age > ALL(SELECT age FROM student WHERE city='bj')

SELECT * FROM student WHERE age > ANY(SELECT age FROM student WHERE city='bj')

SELECT * FROM student WHERE age > SOME(SELECT age FROM student WHERE city='bj')



-- 查询有考试成绩的学生信息
SELECT * FROM score
SELECT * FROM student
SELECT * FROM student WHERE id IN (SELECT student_id FROM score)

-- 查询没有成绩的同学
SELECT * FROM student WHERE id NOT IN (SELECT student_id FROM score)

-- EXISTS not EXISTS
-- EXISTS 存在一条就不在查询了
SELECT * FROM student WHERE EXISTS(SELECT student_id FROM score WHERE student_id = student.id)

SELECT * FROM student WHERE NOT EXISTS(SELECT student_id FROM score WHERE student_id = student.id)
```



### 表连接

> 很多时候，更具不同的业务常见，我们会将数据保存在不同的数据表中，查询的时候大多数时候都是查询多个表

- JOIN = INNER JOIN = CROSS JOIN内连接
- LEFT [OUTER] JOIN 左外链接
- RIGHT [OUTER] JOIN 右外链接
- ON 连接条件

- 使用demo

```sql
-- 多表查询
-- 内联查询取交集
SELECT * FROM score INNER JOIN student ON score.student_id = student.id
-- 模拟内联查询
SELECT * FROM score,student WHERE score.student_id = student.id

-- 指定列查询
SELECT student.name, score.grade FROM score INNER JOIN student ON score.student_id = student.id

-- 连接多表查询
SELECT student.name, score.grade, course.name FROM score INNER JOIN student ON score.student_id = student.id
INNER JOIN course ON score.course_id = course.id

-- 左连接 读取左边表的全部和右边表和左边表的交集展示
SELECT * FROM student LEFT JOIN score ON student.id = score.student_id

-- 右连接
SELECT * FROM student RIGHT JOIN score ON student.id = score.student_id

-- 新建表
CREATE TABLE class(
 id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(50),
 parent_id int(20)
)

ALTER TABLE class MODIFY COLUMN id INT NOT NULL;
DESC class;

INSERT INTO class(id, name, parent_id) 
VALUES (1, '数码产品', 0), (2, '服装', 0), (3, '食品', 0), (4, '文体办公', 0), (5, 'ipad', 1), (6, '美特邦威', 2), (7, '蛋糕', 3)

SELECT * FROM class

-- 自连接
SELECT c1.id, c1.name, c2.name '父类'
FROM class c1 INNER JOIN class c2 ON c1.parent_id = c2.id

SELECT c1.id, c1.name,
IF(c2.name != '', c2.name, '顶级分类') '父类'
FROM class c1
LEFT JOIN class c2 
ON c1.parent_id = c2.id


-- 查询重复记录

-- 多表查询
-- 准备数据

INSERT INTO class(id, name, parent_id) VALUES(8, 'ipad', 1), (9, '美特邦威', 2), (10, '蛋糕', 3)
-- 开始查询 `SELECT * FROM class c1` 这么写可以开辟独立空间，想互链接

-- 查询到所有的重复的链接
SELECT * FROM class c1
WHERE c1.name IN
(SELECT name FROM class c2 GROUP BY name HAVING COUNT(name) > 1)

-- 拿到重复的分组
SELECT * FROM class c1
WHERE c1.name IN
(SELECT name FROM class c2 GROUP BY name HAVING COUNT(name) > 1)
AND c1.id IN
(SELECT MIN(id) FROM class GROUP BY name HAVING COUNT(name) > 1)

-- 拿到所有重复的id最大的数据
SELECT * FROM class c1
WHERE c1.name IN
(SELECT name FROM class c2 GROUP BY name HAVING COUNT(name) > 1)
AND c1.id NOT IN
(SELECT MIN(id) FROM class GROUP BY name HAVING COUNT(name) > 1)

-- SELECT * FROM class c2 GROUP BY name HAVING COUNT(name) > 1 拿到重复的字段


-- 创建一个表
CREATE TABLE province(
	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(64)
)


SELECT * FROM province
-- 查询student省份字段，并插入province表
INSERT INTO province(name) SELECT DISTINCT province FROM student

DELETE  FROM province 


-- 多表联合更新
UPDATE student INNER JOIN province ON student.province = province.name
SET student.province = province.id
WHERE student.province = province.name

select * FROM student


-- 多变联合更新 设置类型
ALTER TABLE student
CHANGE province province_id SMALLINT UNSIGNED NOT NULL

```



### 总结

> 学过知道才知道很多东西能不能实现，这里也是一个简单的小demo，方便自己理解，但是还是写不出来比较复杂的SQL，终究是需要多加练习，




