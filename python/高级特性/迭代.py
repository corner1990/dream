# 迭代
    # 如果给定一个list或tuple，我们可以通过for循环来遍历这个list或tuple，
    # 这种遍历我们称为迭代（Iteration）。

L = [1, 2, 3, 4, 5]
for i in L:
    print('index:', i)

# 获取索引 enumerate
for i, val in enumerate(L):
    print('index:', i, 'val:', val)
