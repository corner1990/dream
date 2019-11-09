# 类和实例
    # 面向对象最重要的概念就是类（Class）和实例（Instance），必须牢记类是抽象的模板，
    # 比如Student类，而实例是根据类创建出来的一个个具体的“对象”，每个对象都拥有相同的方法，
    # 但各自的数据可能不同。

# 定义一个类
    # class后面紧接着是类名，即Student，类名通常是大写开头的单词，紧接着是(object)，
    # 表示该类是从哪个类继承下来的，继承的概念我们后面再讲，通常，如果没有合适的继承类，
    # 就使用object类，这是所有类最终都会继承的类。
class Student(object):
    pass;

# 创建实例
    # 创建实例是通过类名+()实现的
bart = Student()
print(bart)

# 给类设置属性
bart.name = 'leo';
bart.age = 18;

# 访问变量
print(bart.name)

# 类可以起到模板的作用，因此，可以在创建实例的时候，把一些我们认为必须绑定的属性强制填写进去。
# 通过定义一个特殊的__init__方法，在创建实例的时候，就把name，score等属性绑上去
# 注意到__init__方法的第一个参数永远是self，表示创建的实例本身，因此，在__init__方法内部，
# 就可以把各种属性绑定到self，因为self就指向创建的实例本身。

# 有了__init__方法，在创建实例的时候，就不能传入空的参数了，必须传入与__init__方法匹配的参数，
# 但self不需要传，Python解释器自己会把实例变量传进去：

class Student2(object):
    def __init__(self, name, age):
        self.name = name;
        self.age = age;


bart2 = Student2('peter', 20);
print(bart2.name)

# 数据封装
    # 面向对象编程的一个重要特点就是数据封装。在上面的Student类中，
    # 每个实例就拥有各自的name和score这些数据。我们可以通过函数来访问这些数据，
    # 比如打印一个学生的成绩：

class Student3(object):
    def __init__(self, name, age):
        self.name = name;
        self.age = age;
    
    def sayHi(self):
        print('hello, I\'m %s, %s years old this year' % (self.name, self.age));

bart3 = Student3('lucy', 18)
bart3.sayHi();
