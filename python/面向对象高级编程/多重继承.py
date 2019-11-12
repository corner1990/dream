# 多重继承
    # 继承是面向对象编程的一个重要的方式，因为通过继承，子类就可以扩展父类的功能。

class Animal(object):
    pass;

class Brid(Animal):
    pass;

class Dog(Animal):
    pass;


class YinWu(Brid):
    pass;

class SaMo(Dog):
    pass;

# 给动物添加单独的属性
class Runnable(object):
    def run(self):
        print('Running...');

class Flyable(object):
    def fly(self):
        print('Flyable...');

# 对需要功能的类多继承一个类就可以实现
# 通过多重继承，一个子类就可以同时获得多个父类的所有功能
class ErHa(Dog, Runnable):
    pass;

class BuGu(Brid, Flyable):
    pass;

erha = ErHa();
erha.run()


# MixIn
# MixIn的目的就是给一个类增加多个功能，这样，在设计类的时候，
# 我们优先考虑通过多重继承来组合多个MixIn的功能，而不是设计多层次的复杂的继承关系。

# Python自带了TCPServer和UDPServer这两类网络服务，
# 而要同时服务多个用户就必须使用多进程或多线程模型，
# 这两种模型由ForkingMixIn和ThreadingMixIn提供。通过组合，我们就可以创造出合适的服务来。

# tcp 服务
class myTcpServer(TcpServer, ForkingMixIn):
    pass;

# 多线程UDP
class myUDPServer(UDPServer, ThreadingMixIn):
    pass;

# 不需要复杂而庞大的继承链，只要选择组合不同的类的功能，就可以快速构造出所需的子类。