# 生成器
# 通过列表生成式，我们可以直接创建一个列表。但是，受到内存限制，列表容量肯定是有限的。
# 而且，创建一个包含100万个元素的列表，不仅占用很大的存储空间，
# 如果我们仅仅需要访问前面几个元素，那后面绝大多数元素占用的空间都白白浪费了。

# 所以，如果列表元素可以按照某种算法推算出来，
# 那我们是否可以在循环的过程中不断推算出后续的元素呢？这样就不必创建完整的list，
# 从而节省大量的空间。在Python中，这种一边循环一边计算的机制，
# 称为生成器：generator。

# 1. 创建一个generator
# l = [x * x for x in range(10)]
# print(l)

# g = (x * x for x in range(10))
# print(next(g)) # 打印第一个值
# 创建L和g的区别仅在于最外层的[]和()，L是一个list，而g是一个generator。

# 遍历g
# for n in g:
    # print(n);
# 创建了一个generator后，基本上永远不会调用next()，而是通过for循环来迭代它，
# 并且不需要关心StopIteration的错误。
# 创建了一个generator后，基本上永远不会调用next()，
# 而是通过for循环来迭代它，并且不需要关心StopIteration的错误。

# 打印斐波拉契数列
def fib(max):
    n, a, b = 0, 0, 1;
    while n < max:
        print(b);
        a, b = b, a + b;
        n = n + 1;
    return 'done';

# print(fib(10))

# 将fib函数修改为generator
def fib2(max):
    n, a, b = 0, 0, 1;
    while n < max:
        yield b;
        a, b = b, a + b;
        n = n + 1;
    return 'done';
f = fib2(6);

# print(f)

def conSigle(max):
    n, l = 0, [1];
    while n < max:
        yield l;
        l = initList(l)
        n = n + 1;
    return 'done';

def initList(l1):
    length, l2, i = len(l1), [], 0;
    
    while i < length:
        if i == 0:
            l2.append(l1[i]);
        else:
            a, b = l1[i], l1[i-1]
            l2.append(a + b);
        i = i + 1;
    
    l2.append(1)
    return l2;

f2 = conSigle(10);
# print(f2)
for n2 in f2:
    print(n2)