# 文件读写
    # 读写文件是最常见的IO操作。Python内置了读写文件的函数，用法和C是兼容的。

# 读取文件
    # 要以读文件的模式打开一个文件对象，使用Python内置的open()函数，传入文件名和标示符
# 打开文件， 文件不存在会报错，需要做处理
# f = open('./1.txt', 'r', encoding='utf8');
# 读取文件
# context = f.read();
# print(context)

# 关闭文件
# f.close();


# 读取二进制文件
    # 要读取二进制文件，比如图片、视频等等，用'rb'模式打开文件即可
# f = open('./test.jpg', 'rb')

# 字符编码
# 要读取非UTF-8编码的文本文件，需要给open()函数传入encoding参数
#  f = open('/Users/michael/gbk.txt', 'r', encoding='gbk')

# 写文件
# 写文件和读文件是一样的，唯一区别是调用open()函数时，传入标识符'w'或者'wb'表示写文本文件或写二进制文件
f = open('./1.txt', 'w')
f.write('Hello, world 22!')
f.close()