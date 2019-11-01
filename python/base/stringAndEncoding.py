
# 字符串和编码
    # 字符串也是一种数据类型，但是字符串存在编码问题
    # Unicode应运而生。Unicode把所有语言都统一到一套编码里，这样就不会再有乱码问题了。

# Python 字符串
    # 因为Python的诞生比Unicode标准发布的时间还要早，所以最早的Python只支持ASCII编码，
    # 普通的字符串'ABC'在Python内部都是ASCII编码的。
    # Python 提供了 ord 和 chr 函数可以把字母对应的字符串相互转换
# print(ord('a')); # 97;
# print(chr(97)); # a; 注意： chr只能传入数字类型，传入字符串会报错
    # Python在后来添加了对Unicode的支持，以Unicode表示的字符串用u'...'表示
# print('u中文');

    # len 函数读取字符串的长度

    
s = '123';
print(len('1314141'));

# 由于Python源代码也是一个文本文件，所以，当你的源代码中包含中文的时候，在保存源代码时，
# 就需要务必指定保存为UTF-8编码。当Python解释器读取源代码时，为了让它按UTF-8编码读取，
# 通常在文件开头写上这两行:
    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

# 由于历史遗留问题，Python 2.x版本虽然支持Unicode，但在语法上需要'xxx'和u'xxx'两种字符串表示方式。
# 在Python 3.x版本中，把'xxx'和u'xxx'统一成Unicode编码，
# 即写不写前缀u都是一样的，而以字节形式表示的字符串则必须加上b前缀：b'xxx'。