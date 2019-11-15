import unittest;

from 单元测试 import Dict;

class TestDict(unittest.TestCase):
    def test_init(self):
        d = Dict(a=1, b='test')
        self.assertEqual(d.a, 1)
        self.assertEqual(d.b, 'test')
        self.assertTrue(isinstance(d, dict))

    def test_key(self):
        d = Dict()
        d['key'] = 'value'
        self.assertEqual(d.key, 'value')

    def test_attr(self):
        d = Dict()
        d.key = 'value'
        self.assertTrue('key' in d)
        self.assertEqual(d['key'], 'value')

    def test_keyerror(self):
        d = Dict()
        with self.assertRaises(KeyError):
            value = d['empty']

    def test_attrerror(self):
        d = Dict()
        with self.assertRaises(AttributeError):
            value = d.empty

# 运行单元测试
    # 最简单的运行方式是在mydict_test.py的最后加上两行代码：
    # 这样就可以把mydict_test.py当做正常的python脚本运行
    # python my_test.py
if __name__ == '__main__':
    unittest.main();

    # 另一种方法是在命令行通过参数-m unittest直接运行单元测试
    # python -m unittest my_test

# setUp与tearDown
    # 可以在单元测试中编写两个特殊的setUp()和tearDown()方法。
    # 这两个方法会分别在每调用一个测试方法的前后分别被执行。
class TestDict2(unittest.TestCase):

    def setUp(self):
        print('setUp...')

    def tearDown(self):
        print('tearDown...')