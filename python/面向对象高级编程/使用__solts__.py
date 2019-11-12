# 使用__slots__
    # 想要限制实例的属性怎么办？比如，只允许对Student实例添加name和age属性。
    
# class Student(object):
#     __slots__ = ('name');
#     def __init__(self, name, age): # 用tuple定义允许绑定的属性名称
#         self.name = name;
#         self.age = age;

# s = Student('leo', 16)
# print(s.name)
# s.name = 'jhon'
# s.age = 12

# 使用propery
    # 在绑定属性时，如果我们直接把属性暴露出去，虽然写起来很简单，但是，没办法检查参数，导致可以把成绩随便改
    # 限制score的范围，可以通过一个set_score()方法来设置成绩，再通过一个get_score()来获取成绩，
    # 这样，在set_score()方法里，就可以检查参数

# class Student2(object):
#     def get_score(self):
#         return self._score;
#     def set_score(self, value):
#         if not isinstance(value, int):
#             raise ValueError('score must be a integer')
#         if value < 0 or value > 100:
#             raise ValueError('scoure must between 0 -100');
#         self._score = value;
    

# s = Student2()
# s.set_score(60)

# print(s.get_score())

# s.set_score(101)

# Python内置的@property装饰器就是负责把一个方法变成属性调用的
# property的使用。把一个getter方法变成属性，只需要加上@property就可以了，此时，@property本身又创建了另一个装饰器@score.setter，负责把一个setter方法变成属性赋值，于
class Student3(object):
    @property
    def score(self):
        return self._score;
    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be a integer')
        if value < 0 or value > 100:
            raise ValueError('scoure must between 0 -100');
        self._score = value;

s3 = Student3()
s3.score = 80;
print(s3.score);

s3.score = 101

# 可以定义只读属性，只定义getter方法，不定义setter方法就是一个只读属性：
class Student(object):

    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property
    def age(self):
        return 2015 - self._birth