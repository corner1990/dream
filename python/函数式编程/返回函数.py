# 返回函数
    # 函数作为返回值
    # 高阶函数除了可以接受函数作为参数外，还可以把函数作为结果值返回。
def calc_sum(*args):
    sum = 0;
    for n in args:
        sum = sum + n;
    return sum;

# print(calc_sum(1, 2, 3, 4, 5))

def lazy_sum(*args):
    def sum():
        res = 0;
        for n in args:
            res = res + n;
        return res;
    return sum;
f = lazy_sum(1, 2, 3, 4, 6, 7);
# print(f())

# 闭包
# 返回的函数在其定义内部引用了局部变量args，所以，当一个函数返回了一个函数后，
# 其内部的局部变量还被新函数引用，所以，闭包用起来简单，实现起来可不容易。
# 另一个需要注意的问题是，返回的函数并没有立刻执行，而是直到调用了f()才执行。
# def count():
#     res = [];
#     for i in range(1, 4):
#         def f():
#             return i * i;
#         res.append(f);
#     return res;

# 修改为闭包
def count():
    res = [];
    def f(j):
        def g():
            return j * j;
        return g;
    for n in range(1, 4):
        res.append(f(n));
    return res;

f1, f2, f3 = count();
print(f1())
print(f2())
print(f3())


