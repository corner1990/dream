#coding=utf-8

print('hello python')

str1='123456789'

# print(str1)

# print(str1[0])

# print(str1[0: 3])

# print(str1[0: -2])

# print(str1[3:])
print(str1[5: -1])

var1 = 'hello world!'

name = 'leo'
 
print ("字符串拼接 : ",( var1[:6] + name) )


# for i, v in enumerate(['aaa', 'bbb', 'ccc']):
#     print('index: ', i, 'value: ', v);

from collections import deque;

queue = deque(['AA', 'BB', 'CC',])

print(queue)

queue.appendleft('EE')
queue.appendleft('FF')
print(queue)

first = queue.popleft();
print('first: ',first)

second = queue.popleft();
print('second: ',second);

print('queue: ', queue)


list1 = [2, 4, 6]

list2 = [3*x for x in list1]
print('list1:', list1)
print('list2:', list2)

list3 = [[x, x**4] for x in list1 ]
print('list3: ', list3)