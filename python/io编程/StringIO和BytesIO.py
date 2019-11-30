# StringIO和BytesIO
# 数据读写不一定是文件，也可以在内存中读写。
# StringIO顾名思义就是在内存中读写str。

# 创建一个stringIO
# from io import StringIO
# f = StringIO()
# f.write('hello');
# f.write(' ');
# f.write('world!')

# print(f.getvalue())


# 要读取StringIO，可以用一个str初始化StringIO，然后，像读文件一样读取

# from io import StringIO
# f = StringIO('Hello!\nHi!\nGoodbye!')
# while True:
#     s = f.readline()
#     if s == '':
#          break
#     print(s.strip())


# BytesIO
# StringIO操作的只能是str，如果要操作二进制数据，就需要使用BytesIO。

# BytesIO实现了在内存中读写bytes，我们创建一个BytesIO，然后写入一些bytes：
from io import BytesIO
f = BytesIO()
f.write('中文'.encode('utf-8')) # 注意，写入的不是str，而是经过UTF-8编码的bytes。

print(f.getvalue())

f2 = BytesIO(b'\xe4\xb8\xad\xe6\x96\x87')
# StringIO和BytesIO是在内存中操作str和bytes的方法，使得和读写文件具有一致的接口。
print(f2.read())