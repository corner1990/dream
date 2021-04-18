// main() {
//   print(' hello dart');
// }
// 入口方法
// void main(List<String> args) {
//   print('object');
// }

// 变量
void main(List<String> args) {
  var str = '你好';
  var num = 1;
  print(str);
  print(num);

  String str2 = 'str2';
  int num2 = 2;
  double num3 = 3.3;
  List arr = [];
  arr.add('value');
  arr.add(123);

  var obj1 = {};
  Object obj2 = {};
  obj1['a'] = 'a';
  if (num2 <= num3) {
    print('$num2 <= $num3');
  }
  print(obj1);
}
