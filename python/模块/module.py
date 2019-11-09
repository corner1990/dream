#Iusr/bin/env python3
# -*- coding:utf-8 -*-
# 模块
    # 模块是一组Python代码的集合，可以使用其他模块，也可以被其他模块使用。
    # 为了编写可维护的代码，我们把很多函数分组，分别放到不同的文件里，这样，
    # 每个文件包含的代码就相对较少，很多编程语言都采用这种组织代码的方式。
    # 在Python中，一个.py文件就称之为一个模块（Module）。


# 使用 模块
'a test module';
__autor__ = 'leo';

import sys;

def test():
    args = sys.argv;
    if len(args) == 1:
        print('hello world!');
    elif len(args) == 2:
        print('hello，%s!' % args[1]);
    else:
        print('too many argument');
    
if __name__ == '__main__':
    test();

# 作用域
    # 在一个模块中，我们可能会定义很多函数和变量，但有的函数和变量我们希望给别人使用，
    # 有的函数和变量我们希望仅仅在模块内部使用。在Python中，是通过_前缀来实现的。
    # 正常的函数和变量名是公开的（public），可以被直接引用，比如：abc，x123，PI等
    # 类似__xxx__这样的变量是特殊变量，可以被直接引用，但是有特殊用途，比如上面的__author__，
    # __name__就是特殊变量，hello模块定义的文档注释也可以用特殊变量__doc__访问，
    # 我们自己的变量一般不要用这种变量名；
    # 类似_xxx和__xxx这样的函数或变量就是非公开的（private），不应该被直接引用，比如_abc，__abc等；


# 安装第三方模块
    # 在Python中，安装第三方模块，是通过包管理工具pip完成的。
    # 如果你正在使用Windows，请参考安装Python一节的内容，确保安装时勾选了pip和Add python.exe to Path。
    # 在命令提示符窗口下尝试运行pip，如果Windows提示未找到命令，可以重新运行安装程序添加pip。
    # 注意：Mac或Linux上有可能并存Python 3.x和Python 2.x，因此对应的pip命令是pip3。

# 安装
# pip install Pillow

# 安装常用模块
    # 在使用Python时，我们经常需要用到很多第三方库，例如，上面提到的Pillow，以及MySQL驱动程序，
    # Web框架Flask，科学计算Numpy等。用pip一个一个安装费时费力，还需要考虑兼容性。
    # 我们推荐直接使用Anaconda，这是一个基于Python的数据处理和科学计算平台，
    # 它已经内置了许多非常有用的第三方库，我们装上Anaconda，就相当于把数十个第三方模块自动安装好了，
    # 非常简单易用。
    # 直接import numpy等已安装的第三方模块。


# 模块搜索路径
    # 当我们试图加载一个模块时，Python会在指定的路径下搜索对应的.py文件，如果找不到，就会报错：
    # 默认情况下，Python解释器会搜索当前目录、所有已安装的内置模块和第三方模块，
    # 搜索路径存放在sys模块的path变量中：
    # import sys

# 添加自己的搜索目录，有两种方法
    # 一是直接修改sys.path，添加要搜索的目录
    # import sys
    # 第二种方法是设置环境变量PYTHONPATH，该环境变量的内容会被自动添加到模块搜索路径中。
    # 设置方式与设置Path环境变量类似。注意只需要添加你自己的搜索路径，Python自己本身的搜索路径不受影响。


