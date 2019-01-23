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
-- 自定义函数
-- 自定义一个函数，返回中文的当前时间
CREATE FUNCTION Z3NOW() RETURNS VARCHAR(255)
RETURN DATE_FORMAT(NOW(), '%Y年%m月%d日 %H点%i分%s秒');

-- 调用自定义函数
SELECT Z3NOW() -- 2019年01月21日 14点53分14秒


-- 定义可以接收参数的函数
CREATE FUNCTION ZADD(num1 INT, num2 INT) RETURNS INT
RETURN num1 + num2

-- 调用函数 
SELECT ZADD(2,4) -- 6


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

-- 模糊查询

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



-- 聚合函数
-- 对一组值进行计算，并返回结算后的值，一般用来统计数据

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





-- 子查询
-- 自查询就是只出现在其他SQL语句中的select语句
-- outer QUERY/Inner QUERY
-- 子查询指嵌套在查询内部，且必须出现在圆括号中
-- 子查询可以包含多个关键字或条件
-- 子查询的外层查询可以是：SELECT，INSERT，UPDATE SET
-- 子查询可以返回常量，一行数据，一列数据或者其他子查询

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

-- 表连接
-- JOIN = INNER JOIN = CROSS JOIN内连接
-- LEFT [OUTER] JOIN 左外链接
-- RIGHT [OUTER] JOIN 右外链接
-- ON 连接条件

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

```

