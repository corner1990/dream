# 迭代器
    # 直接作用于for循环的数据类型有以下几种
    # 一类是集合数据类型，如list、tuple、dict、set、str等；
    # 一类是generator，包括生成器和带yield的generator function。

# 使用isinstance()判断一个对象是否是Iterable对象
from collections.abc import Iterable;
print(isinstance([], Iterable))
print(isinstance({}, Iterable))
print(isinstance('abc', Iterable));
print(isinstance((x for x in range(10)), Iterable));

