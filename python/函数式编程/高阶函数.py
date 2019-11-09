# 高阶函数
    # 变量指向函数
    # 函数名也是变量
    # 换入函数

def add(x, y, f):
    return f(x) + f(y);

x = -5
y = 6;
f = abs;

sum = add(x, y, f)
print('sum:', sum);


# map 和 reduce函数
    # map()函数接收两个参数，一个是函数，一个是Iterable，
    # map将传入的函数依次作用到序列的每个元素，并把结果作为新的Iterator返回。
    # reduce把一个函数作用在一个序列[x1, x2, x3, ...]上，这个函数必须接收两个参数，
    # reduce把结果继续和序列的下一个元素做累积计算
# l1 = [1, 2, 3, 4, 5, 6]

# def square(num):
#     return num * num;
# l2 = map(square, l1);
# print(list(l2))

# from functools import reduce;
# def add(a, b):
#     return a + b;
# num3 = reduce(add, l1)
# print(num3)

# filter
    # filter()函数用于过滤序列。
    # filter()也接收一个函数和一个序列。和map()不同的是，
    # filter()把传入的函数依次作用于每个元素，然后根据返回值是True还是False决定保留还是丢弃该元素。

# l3 = [1, 2, 3, 4, 5, 6]
# def is_odd(n):
#     return n % 2 == 1;
# print(list(filter(is_odd, l3)))

# sorted
    # 排序算法
    # 排序也是在程序中经常用到的算法。无论使用冒泡排序还是快速排序，
    # 排序的核心是比较两个元素的大小。如果是数字，我们可以直接比较，
    # 但如果是字符串或者两个dict呢？直接比较数学上的大小是没有意义的，
    # 因此，比较的过程必须通过函数抽象出来。
l4 = [89, 23, 45, 12, 10, -40, -10]
l5 = sorted(l4)
print(l5)

    # sorted()函数也是一个高阶函数，它还可以接收一个key函数来实现自定义的排序，
l6 = sorted(l4, key=abs)