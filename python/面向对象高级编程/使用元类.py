# 使用元类

# type()
    # 动态语言和静态语言最大的不同，就是函数和类的定义，不是编译时定义的，而是运行时动态创建的。

# class Hello (object):
#     def hello(self, name = 'world'):
#         print('Hello, %s.' % name);

# h = Hello()
# h.hello()

# type()函数可以查看一个类型或变量的类型，Hello是一个class，它的类型就是type，
# 而h是一个实例，它的类型就是class Hello。
# print(type(h))
# print(type(Hello)) # 类的类型是type, 实例的累心是class


# type()函数既可以返回一个对象的类型，又可以创建出新的类型，
# 比如，我们可以通过type()函数创建出Hello2类，而无需通过class Hello(object)...的定义

# 要创建一个class对象，type()函数依次传入3个参数：

    # class的名称；
    # 继承的父类集合，注意Python支持多重继承，如果只有一个父类，别忘了tuple的单元素写法；
    # class的方法名称与函数绑定，这里我们把函数fn绑定到方法名hello上。
def fn(self, name = 'world'):
    print('hello2, %s.' % name);

Hello2 = type('Hello2', (object, ), dict(hello = fn)); # 创建Hello class
h2 = Hello2()
h2.hello()


# metaclass
    # 除了使用type()动态创建类以外，要控制类的创建行为，还可以使用metaclass
    # metaclass是类的模板，所以必须从`type`类型派生：

class ListMetaclas(type):
    def __new__(cls, name, bases, attrs):
        attrs['add'] = lambda self, value: self.append(value);

        return type.__new__(cls, name, bases, attrs);

class MyList(list, metaclass = ListMetaclas):
    pass;
# __new__()方法接收到的参数依次是：
    # 当前准备创建的类的对象；
    # 类的名字；
    # 类继承的父类集合；
    # 类的方法集合。

L = MyList();
L.add(1);
print(L)