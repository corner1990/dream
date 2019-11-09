# 获取对象信息

# 使用type()
# 判断对象类型，使用type()函数：
print(type(123))
print(type('123'))
print(type([]))

def fn():
    pass;

print(type(fn))

# 判断基本数据类型可以直接写int，str等，但如果要判断一个对象是否是函数怎么办？
# 可以使用types模块中定义的常量：
import types;

print(type(fn) == types.FunctionType)

# 使用isinstance()
    # 对于class的继承关系来说，使用type()就很不方便。我们要判断class的类型，可以使用isinstance()函数。
class Animal(object):
    pass;
class Cat(Animal):
    pass;

cat = Cat()
print(isinstance([], list))
print(isinstance([], (list, tuple)))
print(isinstance(cat, Animal))


# 使用dir()
# 如果要获得一个对象的所有属性和方法，可以使用dir()函数，它返回一个包含字符串的list，
# 比如，获得一个str对象的所有属性和方法：

print(dir('123'))
print("123".index('3'))

# 类似__xxx__的属性和方法在Python中都是有特殊用途的，比如__len__方法返回长度。在Python中，
# 如果你调用len()函数试图获取一个对象的长度，实际上，在len()函数内部，
# 它自动去调用该对象的__len__()方法，
# 所以，下面的代码是等价的：
print(len('ABC'))
print('ABC'.__len__())

# 自己写的类，如果也想用len(myObj)的话，就自己写一个__len__()方法：
class MyDog(object):
    def __len__(slef):
        return 100;

dog = MyDog()
print(len(dog))

# 把属性和方法列出来是不够的，配合getattr()、setattr()以及hasattr()，我们可以直接操作一个对象的状态：
class MyObj(object):
    def __len__(self):
        return 10;
    def __init__(self):
        self.x = 9;
    def power(self):
        return self.x * self.x;

obj = MyObj()
print(obj.x)
print(hasattr(obj, 'x'))
print(hasattr(obj, 'hh'))
setattr(obj,'x', '123')
print(getattr(obj, 'x'))