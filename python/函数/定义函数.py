# 定义函数
    # 在Python中，定义一个函数要使用def语句，依次写出函数名、括号、括号中的参数和冒号:，
    # 然后，在缩进块中编写函数体，函数的返回值用return语句返回。
def mySayHello(name):
    print(name, 'say: hello');

# 调用函数
mySayHello('leo')

# 定义一个获取和的值
def sumNum(num1, num2):
    return num1 + num2;

print(sumNum(100, 12))

# 空函数
# 如果想定义一个什么事也不做的空函数，可以用pass语句：
def pop():
    pass;
# pass语句什么都不做，那有什么用？实际上pass可以用来作为占位符，
# 比如现在还没想好怎么写函数的代码，就可以先放一个pass，让代码能运行起来。


# 参数检查
    # 调用函数时，如果参数个数不对，Python解释器会自动检查出来，并抛出TypeError
    # 数据类型检查可以用内置函数isinstance()实现：
def check(x):
    if not isinstance(x, (str)):
        raise TypeError('type error');
    return x;

print(check('111'))
# print(check(0))

# 返回多个值
import math;
def getNum (a, b):
    a = a + 10;
    b = b - 1;
    return a, b;
print(getNum(10, 10))

# 定义函数时，需要确定函数名和参数个数；

# 如果有必要，可以先对参数的数据类型做检查；

# 函数体内部可以用return随时返回函数结果；

# 函数执行完毕也没有return语句时，自动return None。

# 函数可以同时返回多个值，但其实就是一个tuple。