# 继承和多态
    # 在OOP程序设计中，当我们定义一个class的时候，可以从某个现有的class继承，
    # 新的class称为子类（Subclass），而被继承的class称为基类、父类或超类（Base class、Super class）。

    # 定义一个父类
class Animal(object):
    def run(self):
        print('Animal is running...');

# 定义子类
# class Dog(Animal):
#     pass;

# class Cat(Animal):
#     pass;

# cat = Cat();
# dog = Dog();

# dog.run()
# cat.run()

# 给子类添加方法
class Dog(Animal):
    def run(self):
        print('Dog is running...');
    def eat(self):
        print('Eating meat...');
dog = Dog()
dog.run()
dog.eat()

# 当子类和父类都存在相同的run()方法时，我们说，子类的run()覆盖了父类的run()，在代码运行的时候，
# 总是会调用子类的run()。这样，我们就获得了继承的另一个好处：多态。

# 判断一个变量是否是某个类型可以用isinstance()
print(isinstance(dog.eat, object))