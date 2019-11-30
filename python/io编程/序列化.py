# 序列化
# 把变量从内存中变成可存储或传输的过程称之为序列化，在Python中叫pickling，
# 在其他语言中也被称之为serialization，marshalling，flattening等等，都是一个意思。
# 序列化之后，就可以把序列化后的内容写入磁盘，或者通过网络传输到别的机器上。

# 反过来，把变量内容从序列化的对象重新读到内存里称之为反序列化，即unpickling。


# Python提供了pickle模块来实现序列化。
import pickle

d = dict(name = 'le0', age = 20, gender = 'nan')
# pickle.dumps()方法把任意对象序列化成一个bytes，然后，就可以把这个bytes写入文件
pl = pickle.dumps(d)
# print(pl)

# pickle.dump()直接把对象序列化后写入一个file-like Object
import os;
p = os.path.join(os.path.abspath('.'), '1.txt')
# print(p)
# f = open(p, 'wb');
# pickle.dump(d, f);
# f.close();

# 当我们要把对象从磁盘读到内存时，可以先把内容读到一个bytes，
# 然后用pickle.loads()方法反序列化出对象，
# 也可以直接用pickle.load()方法从一个file-like Object中直接反序列化出对象。
# 我们打开另一个Python命令行来反序列化刚才保存的对象
# f2 = open(p, 'rb')
# d = pickle.load(f2)
# print(d)

# JSON
# JSON表示的对象就是标准的JavaScript语言的对象，JSON和Python内置的数据类型对应如下：
# {} = dict
# [] = list
# "string" = str
# 1234.56 = int或float
# true/false = True/False
# null = None
# ython内置的json模块提供了非常完善的Python对象到JSON格式的转换。

import json;
# d1 = dict(name='Bob', age=20, score=88);
# # dumps()方法返回一个str，内容就是标准的JSON。
# j = json.dumps(d1);
# print(j)

# 要把JSON反序列化为Python对象，用loads()或者对应的load()方法，前者把JSON的字符串反序列化，后
# print(json.loads(j))

# json 进阶
# Python的dict对象可以直接序列化为JSON的{}，
# 不过，很多时候，我们更喜欢用class表示对象，比如定义Student类，然后序列化

class Student(object):
    def __init__(self, name, age, gender):
        self.name = name;
        self.age = age;
        self.gender = gender


s = Student('leo', 18, 'nan')
# json.dumps() 还有其他的参数可以传入 https://docs.python.org/3/library/json.html#json.dumps
# 可选参数default就是把任意一个对象变成一个可序列为JSON的对象，我们只需要为Student专门写一个转换函数，再把函数传进去即可：
def studentToDict(std):
    return {
        'name': std.name,
        'age': std.age,
        'gender': std.gender
    }

print(s)
print(json.dumps(s, default=studentToDict))


