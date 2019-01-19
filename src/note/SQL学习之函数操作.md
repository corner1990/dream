# SQL学习之函数操作

> 嗯，函数，函数，函数。。。。

## 字符串函数

> SQL提供了很多字符串操作方法，下班是一些常见的函数

| 函数名称  | 描述                           |
| --------- | ------------------------------ |
| CONCAT    | 字符串连接                     |
| CONCAT_WS | 使用指定的分隔符进行字符连接   |
| FORMAT    | 数字格式化                     |
| LOWER     | 转小写字母                     |
| UPPER     | 转大写字母                     |
| LEFT      | 返回字符串s开始的最左边n个字符 |
| RIGHT     | 返回字符串s开始的最左边n个字符 |

### 获取字符串长度

语法：`SELECT LENGTH(str)`

```sql
--  获取字符串长度
SELECT LENGTH('abtdst')
-- 6
```

### 字符串拼接

语法：`SELECT CONCAT(str, str1, str2...)`

```sql
--  字符串拼接
SELECT CONCAT('hello', 'world')
-- helloworld
```

### 带分割符的字符串

语法：`SELECT concat_WS(分隔符, str1, str2, str3)`

```sql
-- 如果符号 ，则会使用该符号作为分隔符链接后边的字符串
SELECT concat_WS('?','hello', 'world', 'hah')
-- hello?world?hah
```

### 字符串大小写

语法：`SELECT LOWER(str)`,  `SELECT UPPER(str)`

```sql
SELECT LOWER('HELLO WORLD')
-- hello world

SELECT UPPER('hello world')
-- HELLO WORLD
```

### 字符串截取

语法：`SELECT SUBSTR(str FROM start FOR end)`

```sql
-- 字符串截取
SELECT SUBSTR('helloworld' FROM 2 FOR 3)
-- ell
-- 注意：字符串截取的时候是从1开始，然后第二个参数表示取几个
```

### 小实例，首字母大写

- 使用`UPPER(SUBSTR(str, 1, 1)`将首字母大写
- 使用`LOWER(SUBSTR(str, 2))`将其余字符串小写
- 使用`CONCAT(str, str)`将前边两步处理后的字符串拼接到一起

```sql
-- 查询并将首字母大写
SELECT CONCAT(UPPER(SUBSTR(name, 1, 1)), LOWER(SUBSTR(name, 2))) FROM student
```



### 处理空格

语法：`SELECT TRIM(str)`, `SELECT LTRIM(str)`, `SELECT RTRIM(str)`

```sql
-- 去掉空格
SELECT TRIM(' hello ') -- 处理左右空格
SELECT LTRIM(' hello ') -- 处理做空格
SELECT RTRIM(' hello ') -- 处理有空格
```

### 处理指定字符串

语法：`SELECT TRIM(需要处理的字符串 FROM 原始字符串)`

```sql
-- 去除指定字符串
SELECT TRIM('@' FROM '@@hello$$')
-- hello$$

SELECT TRIM('$' FROM '@@hello$$')
-- @@hello
```

### 字符串余位补齐

语法：`SELECT LPAD`(str, 总长度, 填充字符串), `SELECT RPAD(str, 总长度, 填充字符串)`

```sql
-- 补齐多少位
SELECT LPAD('HELLO', 10, '@'), RPAD('HELLO', 10, '@')
-- @@@@@HELLO	HELLO@@@@@
```

### SQL加密算法

> 在保存密码是，我们不能直接保存明文，SQL为我们提供一个md5算法，因为md5算法是公开的，SQL为了安全，自己处理了一个加密算法供我们使用

语法：`SELECT PASSWORD(pwd)`

```sql
-- 加密算法
SELECT PASSWORD('hello');
-- *6B4F89A54E2D27ECD7E8DA05B4AB8FD9D1D8B119
```



### 替换字符串

语法：`SELECT REPLACE(str, 需要替换的字符串, 替换后的字符串);`

```sql
-- 替换字符串
SELECT REPLACE('hello', 'h', 'H');
-- Hello
```

### 格式化

语法： `SELECT FORMAT(number, 保留余位);`

```sql
-- 格式化
SELECT FORMAT(1000, 2), FORMAT(1000.234234, 2);
-- 1,000.00	1, 000.23
```



### 截取指定长度字符串

语法：`SELECT LEFT(str, len),  RIGHT(str, len)`





```sql
-- LEFT 从左边开始截取， 顺序
-- RIGHT 从右边开始读取，倒叙截取

-- 取左多少位 右多少位
SELECT LEFT('abcdef12345',5),  RIGHT('abcdef12345', 5)
-- abcdef, 12345

```





## 常用数学函数

| 函数名称 | 描述       |
| -------- | ---------- |
| CEIL     | 向上取整   |
| FLOOR    | 向下取整数 |
| DIV      | 整数取     |
| MOD      | 取余(取模) |
| POWER    | 幂运算     |
| ROUND    | 四舍五入   |
| TRUNCATE |            |

### 向上取整

语法：`SELECT CEIL(num)`

```sql
-- 向上取整
SELECT CEIL(10.1)
-- 11
```

### 向下取整

语法：`SELECT FLOOR(num)`

```sql
-- 向下取整
SELECT FLOOR(10.8)
-- 10
```

### 取余

语法：SELECT MOD(num)

```sql
-- 取余
SELECT MOD(10, 3)
-- 1
```

### 四舍五入

语法：`SELECT ROUND(num)`

```sql
-- 四舍五入
SELECT ROUND(10.4), ROUND(10.5);
-- 10, 11
```

### 保留指定小数位

语法：`SELECT TRUNCATE(num, 保留小数点后的位数)`

```sql
-- 截断, 直接暴力截断，不进行四舍五入
SELECT TRUNCATE(10.9999,2)
-- 10.99
```



## 常用日期函数

| 函数名称    | 描述           |
| ----------- | -------------- |
| NOW         | 当前日期和时间 |
| CURDATE     | 当前日期       |
| CURTIME     | 当前时间       |
| DATE_ADD    | 日期变化       |
| DATEDIFF    | 计算日期差     |
| DATE_FORMAT | 日期格式化     |

### 查看当前时间

语法： `SELECT NOW()`

```sql
-- 查看当前时间
SELECT NOW()
-- 2019-01-19 15:54:10
```

### 查看当前日期

语法：`SELECT CURDATE()`

```sql
-- 查看当前日期
SELECT CURDATE()
-- 2019-01-19
```

### 查看当前时间

语法：`SELECT CURTIME();`

```sql
-- 当前时间
SELECT CURTIME();
-- 15:54:10
```

### 查看当前年份

语法：`SELECT YEAR(NOW())`

```sql
-- 当前年
SELECT YEAR(NOW())
-- 2019
```

### 查询当前月

语法：`SELECT MONTH(NOW())`

```sql
-- 当前月
SELECT MONTH(NOW())
- 1
```

### 查询当前天

语法：`SELECT DAY(NOW())`

```sql
-- 当前天
SELECT DAY(NOW())
-- 19
```

### 查询当前小时

语法：`SELECT HOUR(NOW())`

```sql
-- 小时
SELECT HOUR(NOW())
--15
```

### 查询当前分钟

语法：`SELECT MINUTE(NOW())`

```sql
-- 分钟
SELECT MINUTE(NOW())
-- 54
```

### 查看当前秒钟

语法：`SELECT SECOND(NOW())`

```sql
-- 秒
SELECT SECOND(NOW())
-- 10
```

### 字符串转日期

- 占位符

| 序号 | 格式符 | 功能           |
| ---- | ------ | -------------- |
| 1    | %Y     | 4位的年份      |
| 2    | %y     | 2位的年份      |
| 3    | %m     | 月份(01,02)    |
| 4    | %c     | 月份(1,2)      |
| 5    | %d     | 日(01,02)      |
| 6    | %H     | 小时(24小时制) |
| 7    | %h     | 小时(12小时制) |
| 8    | %i     | 分钟(00,01)    |
| 9    | %s     | 秒(00,01)      |

语法：`SELECT STR_TO_DATE(timeStr,format)`

```sql
-- 字符串转日期
SELECT STR_TO_DATE('2019-01-19','%Y-%m-%d'),
	   STR_TO_DATE('01-19 2019','%m-%d %Y'),
	   STR_TO_DATE('2019 01 19','%Y %m %d');
	  
-- 2019-01-19	2019-01-19	2019-01-19
```

### 格式日期

语法：`SELECT DATE_FORMAT(time, fmt)`

```sql
-- 格式化日期
SELECT DATE_FORMAT(NOW(), '%Y年%m月%d日')
-- 2019年01月19日
```

### 计算未来时间

语法：`SELECT DATE_ADD(time,INTERVAL 10 时间类型[DAY, YEAR, MOUTH...])`

```sql
-- 当前时间上加指定日期或时间
SELECT DATE_ADD(NOW(),INTERVAL 10 DAY), -- 天数加10
	   DATE_ADD(NOW(),INTERVAL 10 MONTH), -- 月份加10
	   DATE_ADD(NOW(),INTERVAL 10 YEAR) -- 年份加10
	   
	   
-- 当前时间 2019-01-19 16:38:33
-- 计算后的时间 2019-01-29 16:37:56	2019-11-19 16:37:56	2029-01-19 16:37:56
```

### 计算时间差

语法：`SELECT DATEDIFF(需要比较的时间, 当前时间)`

```sql
-- 计算时间差
SELECT  DATEDIFF('2018-02-09', NOW()) AS '过去',
		DATEDIFF('2020-02-09', NOW()) AS '未来';
-- 这里计算后返回的是天数
```

### 其他常用方法



```sql

-- 查看链接
SELECT CONNECTION_ID()

-- 查看当前数据库
SELECT DATABASE()

-- 查看当前版本
SELECT VERSION();

-- 查看当前登录用户
-- MySQL可以按照登陆的IP地址给同一账号不同的权限
SELECT USER()

-- MD5摘要
SELECT MD5('hello'), MD5('hello') -- 5d41402abc4b2a76b9719d911017c592, 

-- 查看当前数据库用户
SELECT * FROM mysql.user;

```

### 流程控制

> 根据参数判断，返回不同的结果

语法：`SELECT IF( 1 > 0, 'A', 'B') AS 'TRUE', IF(1>2, 'A', 'B') AS 'FALSE'`

```sql
-- 流程控制
SELECT IF( 1 > 0, 'A', 'B') AS 'TRUE', IF(1>2, 'A', 'B') AS 'FALSE'

SELECT grade FROM score;
-- 写法一  这么写下边可以判断就
SELECT grade,
CASE
	WHEN grade >= 60 THEN '及格'
	WHEN grade < 60 THEN '不及格'
	ELSE
		'未知'
END CASE
FROM score;

-- 写法二 这么写后边判断只能给具体的值
SELECT grade,
CASE grade
	WHEN 100 THEN '良好'
	WHEN 60 THEN '一般般'
	ELSE
		'渣渣'
END
FROM score;
```

### 小实例

- 根据多列排序

```sql
-- 数据表如下
-- 表单数据如下
-- id name age iscard city level
-- 1	lisi	33	12345	bj	1-1
-- 3	leo	12	23456	gd	2-1
-- 5	mem	10	12375	bj	2-3
-- 9	nihao	22	453	北京	3-6
-- 10	houlai	14	7534	北京	3-3
--

-- CONVERT('111') 将字符串转化为数字
SELECT CONVERT('111',  SIGNED)

-- 使用第一个(1-1, 2-2)字符升序排序
SELECT * FROM student
ORDER BY SUBSTR(level, 1, 1)

-- 使用第二个(1-1, 2-2)字符降序排序
SELECT * FROM student
ORDER BY CONVERT(SUBSTR(level, 1, 1), SIGNED) ASC, CONVERT(SUBSTR(level, 3), SIGNED) DESC

-- id name age iscard city level
-- 1	lisi	33	12345	bj	1-1
-- 5	mem	10	12375	bj	2-3
-- 3	leo	12	23456	gd	2-1
-- 9	nihao	22	453	北京	3-6
-- 10	houlai	14	7534	北京	3-3


-- 读取指定字符串位置
SELECT INSTR(level, '-'), level FROM student;

-- 优化算法，可以读取多位参数进行排列
-- 思想很重要，一定要切结拆分，一点点的使用方法实现，具体可以参照函数式编程的思路
-- 实现步骤如下
-- 1.截取需要排序的字符串位置， 例如level格式如下： 1-2, 11-2, 22-3,33-44
-- 2. 使用INSTR拿到 字符 '-' 的位置，然后使用SUBSTR进行字符串截取
-- 3. SUBSTR(level, 1, INSTR(level,'-') - 1), 截取到第一部分字符串，
-- 4. SUBSTR(level, INSTR(level, '-') + 1), 截取到第二部分字符串
-- 5. 使用CONVERT将字符串转变为数字，CONVERT(numStr, SIGNED)
-- 6. 第一部分使用升序 ASC， 第二部分降序， DESC
-- 7. 执行语句，完成查询

SELECT * FROM student
ORDER BY CONVERT(SUBSTR(level, 1, INSTR(level,'-') - 1), SIGNED) ASC, 			
		 CONVERT(SUBSTR(level, INSTR(level, '-') + 1), SIGNED) DESC

-- 查询年龄超过13岁
SELECT * FROM student WHERE age > 13

-- 查询年龄超过13岁并且city是北京的同学
-- 思路如下：
-- 首先查找年龄大于13的
-- 然后使用关键字 AND 链接 第二个条件， city 不等于 ‘bj’
-- 执行语句，完成查询

SELECT * FROM student WHERE age > 13 AND city != 'bj'
```

### 总结

> 以上是简单的SQL函数学习，这里做一个简单的记录，方便后期调用
>
> 个人感觉想要学号SQL还是要研究一下函数式编程，才能更好的写好SQL语句，
>
> 我这里仅仅摸到皮毛，就不在说什么了。
>
> 鉴于现在就业市场比较低迷，只能说渐行渐珍惜吧，强化一下自身技能，有助于提高自己的竞争力，
>
> 正如在森林里遇到了老虎，我们不需要跑过老虎，只要能跑过大多数同伴就好了。。。