# 操作文件和目录
# 如果我们要操作文件、目录，可以在命令行下面输入操作系统提供的各种命令来完成。比如dir、cp等命令。

# Python交互式命令行，我们来看看如何使用os模块的基本功能
import os;
# print(os.name) # 如果是posix，说明系统是Linux、Unix或Mac OS X，如果是nt，就是Windows系统。

# 获取详细信息 window 上不存在
# print(os.uname())


# 环境变量
# 在操作系统中定义的环境变量，全部保存在os.environ这个变量中，可以直接查看：
# print(os.environ) # 全部环境变量

# 获取某一个环境变量 os.environ.get('key')：
# print(os.environ.get('path'))

# 操作文件和目录
# 操作文件和目录的函数一部分放在os模块中，一部分放在os.path模块中，这一点要注意一下。查看、创建和删除目录可以这么调用

# 查看当前目录的绝对路径: os.path.abspath('.')
# print(os.path.abspath('.'))

# 在某个目录下创建一个新目录，首先把新目录的完整路径表示出来: 
# 拼接路劲 os.path.join()
p = os.path.join(os.path.abspath('.'), 'python/io编程/testDir')
print(p)

# 然后创建一个目录:
# os.mkdir(p)

# 删除一个目录
# os.rmdir(p)

# 获取文件名 os.path.splitext()
# os.path.splitext('/path/to/file.txt')

# 对文件重命名:
# os.rename('1.txt', '2.txt')
# 删掉文件:
# os.remove('2.txt')

# 拷贝文件
# shutil模块提供了copyfile()的函数，你还可以在shutil模块中找到很多实用函数，它们可以看做是os模块的补充
# Python的特性来过滤文件。比如我们要列出当前目录下的所有目录
# [x for x in os.listdir('.') if os.path.isdir(x)]

# 要列出所有的.py文件，也只需一行代码
# [x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py']







