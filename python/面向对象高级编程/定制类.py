# 定制类
# 似__slots__这种形如__xxx__的变量或者函数名就要注意，这些在Python中是有特殊用途的。
# __slots__我们已经知道怎么用了，__len__()方法我们也知道是为了能让class作用于len()函数。


# __str__
# class Student(object):
#     def __init__(self, name):
#         self.name = name;
    
# print(Student('Michael'))

# 打印出一堆<__main__.Student object at 0x109afb190>，
# 方便打印查看,使用___str__方法
# class Student(object):
#     def __init__(self, name):
#         self.name = name;
#     def __str__(self):
#         return 'Student objct (name: %s)' % self.name;
    
# print(Student('Michael'))

# 直接显示变量调用的不是__str__()，而是__repr__()，
# 两者的区别是__str__()返回用户看到的字符串，而__repr__()返回程序开发者看到的字符串，
# 也就是说，__repr__()是为调试服务的。
# class Student(object):
#     def __init__(self, name):
#         self.name = name;
#     def __str__(self):
#         return 'Student objct (name: %s)' % self.name;
#     __repr__ = __str__;
    
# print(Student('Michael'))


# __iter__
# 实现一个__iter__()方法，该方法返回一个迭代对象，然后，
# Python的for循环就会不断调用该迭代对象的__next__()方法拿到循环的下一个值，
# 直到遇到StopIteration错误时退出循环。
# class Fib(object):
#     def __init__(self):
#         self.a, self.b = 0, 10;
    
#     def __iter__(self):
#         return self;
#     def __next__(self):
#         self.a, self.b = self.b, self.a + self.b 
#         if self.a > 1000: # 退出循环条件 
#             raise StopIteration();
#         return self.a; # 返回下一个值

# for n in Fib():
#     print('n:', n)


# __getitem__
# 要表现得像list那样按照下标取出元素，需要实现__getitem__()方法
# 实现一个__iter__()方法，该方法返回一个迭代对象，然后，
# Python的for循环就会不断调用该迭代对象的__next__()方法拿到循环的下一个值，
# 直到遇到StopIteration错误时退出循环。
class Fib(object):
    def __init__(self):
        self.a, self.b = 0, 10;
    
    def __iter__(self):
        return self;
    def __next__(self):
        self.a, self.b = self.b, self.a + self.b 
        if self.a > 1000: # 退出循环条件 
            raise StopIteration();
        return self.a; # 返回下一个值

    def __getitem__(self, n):
        a,b = 1, 1;
        for x in range(n):
            a, b =  b, a + b;
            return a;


f = Fib();
print(f[0])


