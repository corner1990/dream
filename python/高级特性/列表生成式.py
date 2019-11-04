# 列表生成器
# 使用rang生成连续的列表，例如1-10的列表
print(list(range(1, 11)))

# 如果想生成1*1, 2*2....的列表，需要使用循环
L = [];
for x in range(1, 11):
    L.append(x *x);
    
print(L);

# 环太繁琐，而列表生成式则可以用一行语句代替循环生成上面的lis
L2 = [x * x for x in range(1, 11)]
print(L2)

# for循环后面还可以加上if判断，这样我们就可以筛选出仅偶数的平方
L3 = [x * x for x in range(1, 11) if x % 2 == 0]
print(L3)

# 使用两层循环，可以生成全排列
L4 = [m + n for m in 'abc' for n in 'xyz'];
print(L4)

# 使用for循环 迭代 key 和value 
# for循环其实可以同时使用两个甚至多个变量，比如dict的items()可以同时迭代key和value：
d = {'x': 1, 'y': 2, 'z': 3};
for x,v in d.items():
    print(x, ': ', v)

L5 = [k + '=' + str(v) for k, v in d.items()]
print(L5)