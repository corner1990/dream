##1.根据给定的条件在原有的数组上，得到所需要的新数组

			var a = [-1, -1, 1, 2, -2, -2, -3, -3, 3, -3];
			function f(s, e) {
			var ret = [];
			for (var i in s) { // 根据原有的数组长度进行循环
			    ret.push(e(s[i]));
			}
			return ret;
			}
			f(a, function(n) {
			return n > 0 ? n : 0
			}); // 传输一个匿名函数作为逻辑判断
##2.比原生type或typeof更详细的类型监测方法

			function type(p) {
			/function.(\w*)\(\)/.test(p.constructor); //通过其构造函数来获取对应的类型。
			return RegExp.$1;
			}
			3.对象或数组的深拷贝，用于解决对象引用时值一改全改的问题。

			var copyObject = function(obj) {
			var result = {};
			for (var x in obj) {
			    result[x] = typeof obj === "object" ? copyObject(obj[x]) : obj[x]
			    //如果拷贝的值仍然是一个对象,那么重复执行当前方法。
			}　　
			return result;
			}
##4.通过正则表达式来获取Cookie的值

			function getCookie(name) {
			if (name && RegExp("(^| )" + name + "=([^;]*)(;|$)").exec(document.cookie)) return RegExp.$2;
			// (^| ) 不匹配第一个空格。
			// ([^;]*) 只匹配除了;号之外的所有字符。
			// (;|$) 匹配以;号或$为结尾的字符。
			}
			5.通过移位运算来替代”parseInt”

			~~3.14 = > 3;
			// ~~ 取整。~取当前数值的反码,~~表示再次取反，也就是得到当前自身（说明，JS中的“位”运算会将数值自动转换为整数）
##6.将数值转换为16进制的字符串（常用于表示色彩）

			(~~ (Math.random() * (1 << 24))).toString(16)
			// ~~ 通过位运算来取整。
			// << 左移位。将1的二进制数左移24位。而1<<24 == 2^24(RGB模式下最多可表示的色彩数量)
			// toString(16) 将数值转换为16进制的字符串输出。
			7.对象方法的兼容性检查

			if ('querySelector' in document) {}
##8.NodeList || HTMLCollection || Object转换为Array或具有Array的方法

			NodeList: 是指通过集合方法获得到的DOM节点列表，例如：document.getElementsByTagNmae,document.forms…等方法。
			HTMLCollection: HTML块，它与NodeList很像，但是NodeList只支持数字索引，而HTMLCollection可以支持名称作为索引。
			NodeList与HTMLCollection都具有以下类似： 具有数组的外观，但没有数组的方法 、具有length属性、支持索引来读取内容
			function makeArray(obj) {
			var rs = [],
			    len = obj.length;
			try {
			    rs = [].slice.call(obj, 0);
			} catch (e) { //for IE
			    for (var i = 0; j = obj[i++];) {
			        rs.push(j);
			    }
			}
			return rs;
			}
##9. 正则匹配清除两侧空格

			var trim = function(v){
			var patrn = /^\s*(.*?)\s+$/;
			return (patrn.test(v))? RegExp.$1 : '
			null ';
			}
##10. 时间格式化

			function dateFormat(t){        // t 是以秒为单位的值。
				var h = ~~(t/3600),        // t除以3600，取整，得到的就是小时。
				    m = ~~(t%3600/60),    // t求余3600，取模，得到的就是去除小时剩下的秒数（分钟 + 秒），再除以60，取整，得到的就是分钟。
				    s = ~~(t%3600%60);    // t求余3600，再求余60，剩下的自然就是“秒数”。

				 return h+'小时'+m+'分'+s+'秒';
			}