# 函数递归
    # 在函数内部，可以调用其他函数。如果一个函数在内部调用自身本身，这个函数就是递归函数

def fact(n):
    if n == 1:
        return 1;
    return n * fact(n -1);

print(fact(1))
print(fact(4))