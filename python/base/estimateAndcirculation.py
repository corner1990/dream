# 条件判断和循环
    # 计算机之所以能做很多自动化的任务，因为它可以自己做条件判断。
age = 20;

if age >= 18:
    print('your age is', age);
    print('adult');
    # 输出：
    # your age is 20
    # adult

# 也可以给if添加一个else语句，意思是，如果if判断是False，不要执行if的内容，去把else执行了

age2 = 3;

if age2 >= 18:
    print('your age is', age2);
    print('adult');
else:
    print('your age is', age2);
    print('tennager');

age3 = 20
if age3 >= 6:
    print('teenager');
elif age3 >= 18:
    print('adult');
else:
    print('kid');

# 还可以写多个判断条件，如下：
# if <条件判断1>:
#     <执行1>
# elif <条件判断2>:
#     <执行2>
# elif <条件判断3>:
#     <执行3>
# else:
#     <执行4>


# 循环：
    # python的循环有两种，一种是for...in循环，依次把list或tuple中的每个元素迭代出来
names = ['leo', 'jon', 'lucy', 'peter'];

for name in names:
    print(name)

# 想计算1-10的整数之和，可以用一个sum变量做累加
sum = 0;
for x in [1, 2, 3, 4, 5, 6, 7, 8]:
    sum = sum + x;
print('sum: ', sum); # 输出： 36


# 如果要计算1-100的整数之和，从1写到100有点困难，幸好Python提供一个range()函数，
# 可以生成一个整数序列，比如range(5)生成的序列是从0开始小于5的整数
list3 = range(5);
print(list3)

# 几算 0 - 100 的和
sum2 = 0
for x in range(101):
    sum2 = sum2 + x
print(sum2); # 输出：5050

# 第二种循环是while循环，只要条件满足，就不断循环，条件不满足时退出循环。
sum = 0;
n = 50;
while n > 0:
    sum = sum + n;
    n = n - 2;
print(sum);


# raw_input
    # 用raw_input()读取用户的输入，这样可以自己输入
# birth = raw_input('birth: ')
# if birth < 2000:
#     print('00前');
# else:
#     print('00后');
