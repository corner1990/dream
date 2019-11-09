# 访问和限制
    # 在Class内部，可以有属性和方法，而外部代码可以通过直接调用实例变量的方法来操作数据，
    # 这样，就隐藏了内部的复杂逻辑。
class Student3(object):
    def __init__(self, name, age, money):
        self.name = name;
        self.age = age;
        self.__money = money;
    
    def sayHi(self):
        print('hello, I\'m %s, %s years old this year' % (self.name, self.age));

bart3 = Student3('lucy', 18, 200);
bart3.sayHi();
# print(bart3.__money); # 会报错

# 内部属性不被外部访问，可以把属性的名称前加上两个下划线__，在Python中，实例的变量名如果以__开头，
# 就变成了一个私有变量（private），只有内部可以访问，外部不能访问