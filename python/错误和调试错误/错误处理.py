# 错误处理
    # 在程序运行的过程中，如果发生了错误，可以事先约定返回一个错误代码，
    # 这样，就可以知道是否有错，以及出错的原因。在操作系统提供的调用中，
    # 返回错误码非常常见。比如打开文件的函数open()，成功时返回文件描述符（就是一个整数），
    # 出错时返回-1。

def foo():
    r = some_funciton();
    if r == (-1):
        return (-1);
    
    return r;

def bar():
    r = foo();
    if r == (-1):
        print('Error');
    else:
        pass;

# bar()

# try
# try:
#     print('try....');
#     r = 10 / 0
#     print('retult:', r);

# except ZeroDivisionError as e:
#     print('expect:', e);
# finally:
#     print('finally..');

# print('end')

# 可以捕捉多个错误
# try:
#     print('try...')
#     r = 10 / int('a')
#     print('result:', r)
# except ValueError as e:
#     print('ValueError:', e)
# except ZeroDivisionError as e:
#     print('ZeroDivisionError:', e)
# finally:
#     print('finally...')
# print('END')

# 如果没有错误发生，可以在except语句块后面加一个else，当没有错误发生时，会自动执行else
# try:
#     print('try...')
#     r = 10 / int('2')
#     print('result:', r)
# except ValueError as e:
#     print('ValueError:', e)
# except ZeroDivisionError as e:
#     print('ZeroDivisionError:', e)
# else:
#     print('no error!')
# finally:
#     print('finally...')
# print('END')


# 调用栈
# 如果错误没有被捕获，它就会一直往上抛，最后被Python解释器捕获，打印一个错误信息，
# 然后程序退出

# def foo(s):
#     return 10 / int(s)

# def bar(s):
#     return foo(s) * 2

# def main():
#     bar('0')

# main()


# 记录错误
    # Python内置的logging模块可以非常容易地记录错误信息
    # 通过配置，logging还可以把错误记录到日志文件里，方便事后排查
# import logging;

# def foo(s):
#     return 10 / int(s);

# def bar(s):
#     return foo(s) * 2;

# def main():
#     try:
#         bar('0');
#     except Exception as e:
#         logging.exception(e);
    
# main();
# print('end')

# 抛出错误
# 要抛出错误，首先根据需要，可以定义一个错误的class，选择好继承关系，
# 然后，用raise语句抛出一个错误的实例：

class FooError(ValueError):
    pass;

def foo(s):
    n = int(s);
    if n == 0:
        raise FooError('Invalid Value: %s', % s);
    return 10 / n;

print(foo('0'))

