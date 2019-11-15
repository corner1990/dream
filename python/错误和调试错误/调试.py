# 调试
# 1. 法简单直接粗暴有效，就是用print()把可能有问题的变量打印出来看看
# def foo(s):
#     n = int(s)
#     print('>>> n = %d' % n)
#     return 10 / n

# def main():
#     foo('0')

# main()

# 2. 断言，凡是用print()来辅助查看的地方，都可以用断言（assert）来替代：
# def foo(s):
#     n = int(s);
#     assert n != 0, 'n is zero';
#     # assert的意思是，表达式n != 0应该是True，否则，根据程序运行的逻辑，后面的代码肯定会出错
#     # 如果断言失败，assert语句本身就会抛出AssertionError：
#     return 10 / n;

# def main():
#     foo('0');

# main();

# $ python -O err.py
# 注意：断言的开关“-O”是英文大写字母O，不是数字0。

# 3. logging
# 把print()替换为logging是第3种方式，和assert比，logging不会抛出错误，而且可以输出到文件
# import logging;
# logging.basicConfig(level=logging.INFO)
# s = '0';
# n = int('s');
# logging.info('n = %d' % n);

# print(10 / n)

# 4. pdb
    # 启动Python的调试器pdb，让程序以单步方式运行，可以随时查看运行状态。我们先准备好程序：
s = '0';
n = int(s);
print(10 /n)

# 5. IDE Visual Studio Code：https://code.visualstudio.com/，需要安装Python插件。