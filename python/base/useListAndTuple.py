# 使用List
list1 = [ 1, 2, 3, 4, 5 ];
# 打印list1所有类容
print(list1); # 输出: [1, 2, 3, 4, 5]

# 打印list1长度
print(len(list1)); # 输出: 5;

# 读取list1下标为1的值， 可以输入任意长度，如果list1中没有，
print(list1[1]); # 输出 2

# 给list中添加数据 list.insert(index, value)
list1.insert(0, 0);
print(list1); # 输出： [0, 1, 2, 3, 4, 5]， 可以发现将 0 已经插入list1

# 删除list中的值使用pop方法，不穿值默认最后一个，传值为需要删除的下标
# 删除list中最后一为值
list1.pop();
print(list1); # 输出： [0, 1, 2, 3, 4]

# 删除list1中下标为0的值
list1.pop(0);
print(list1); # 输出： [1, 2, 3, 4]

# 替换某个位置的值
list1[0] = -1;
print(list1); # 输出： [-1, 2, 3, 4]


# tuple
    # 有序列表叫做元组，tuple。tuple和list非常类似，但是tuple一旦初始化就不能修改，
    
classmaters = ('leo', 'lucy', 'lili')
# classmates这个tuple不能变了，它也没有append()，insert()这样的方法
print(classmaters);  # 输出： ('leo', 'lucy', 'lili')