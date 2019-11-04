# 函数的参数
    # 定义函数的时候，我们把参数的名字和位置确定下来，函数的接口定义就完成了。
    # 对于函数的调用者来说，只需要知道如何传递正确的参数，以及函数将返回什么样的值就够了，
    # 函数内部的复杂逻辑被封装起来，调用者无需了解。

def power(x):
    return x * x;
# 对于power(x)函数，参数x就是一个位置参数。
# 当我们调用power函数时，必须传入有且仅有的一个参数x：
print(power(3))

# 默认参数
def power2(x = 5):
    return x * x;
print(power2())
print(3)

# 可变参数
    # 在Python函数中，还可以定义可变参数。顾名思义，
    # 可变参数就是传入的参数个数是可变的，可以是1个、2个到任意个，还可以是0个
def clac(numers):
    sum = 0;
    for n in numers:
        sum = sum + n;
    return sum;
# 这么调用，必须将参数处理为数组， 所以需要简化
print(clac([1, 2, 3, 4, 5]))
# 定义可变参数和定义一个list或tuple参数相比，仅仅在参数前面加了一个*号。在函数内部，
# 参数numbers接收到的是一个tuple，因此，函数代码完全不变。但是，调用该函数时，
# 可以传入任意个参数，
# 如果利用可变参数，调用函数的方式可以简化成如下
def clac2(*numers):
    sum = 0;
    for n in numers:
        sum = sum + n;
    return sum;

print(clac2(1, 2, 4, 6, 8))

# 已经有一个list或者tuple，要调用一个可变参数
nums = [1, 4, 6, 8]

# *nums表示把nums这个list的所有元素作为可变参数传进去。
print(clac2(*nums))


# 关键字参数
    # 关键字参数允许你传入0个或任意个含参数名的参数，这些关键字参数在函数内部自动组装为一个dict
def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw);

person('leo', 30)
# 以传入任意个数的关键字参数
# 关键字参数有什么用？它可以扩展函数的功能。比如，在person函数里，
# 我们保证能接收到name和age这两个参数，但是，如果调用者愿意提供更多的参数，我们也能收到
person('leo', 30, city = 'sz')

# 命名关键字参数
    # 关键字参数，函数的调用者可以传入任意不受限制的关键字参数。
    # 至于到底传入了哪些，就需要在函数内部通过kw检查
def person2(name, age, **kw):
    # 进行参数检查，做对应的处理
    if 'city' in kw:
        pass;
    if 'job' in kw:
        pass;
    print('name:', name, 'age:', age, 'other:', kw);
person2('leo', 30, city = 'sz')

# 关键字参数**kw不同，命名关键字参数需要一个特殊分隔符*，*后面的参数被视为命名关键字参数。
# 要限制关键字参数的名字，就可以用命名关键字参数，例如，只接收city和job作为关键字参数
def person3(name, age, *, city, job):
    print(name, age, city, job)
person3('Jack', 24, city='Beijing', job='Engineer')

# 如果函数定义中已经有了一个可变参数，后面跟着的命名关键字参数就不再需要一个特殊分隔符*了
def person4(name, age, *args, city, job):
    print(name, age, args, city, job)
# 命名关键字参数必须传入参数名，这和位置参数不同。如果没有传入参数名，调用将报错：



# 参数组合
# 在Python中定义函数，可以用必选参数、默认参数、可变参数、关键字参数和命名关键字参数，
# 这5种参数都可以组合使用。
# 但是请注意，参数定义的顺序必须是：必选参数、默认参数、可变参数、命名关键字参数和关键字参数。