	var matcher = /<%=([\s\S]+?)%>|<%([\s\S]+?)%>|$/g;

	//模板文本中的特殊字符转义处理
	var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
	var escapes = {
	    "'":      "'",
	    '\\':     '\\',
	    '\r':     'r',
	    '\n':     'n',
	    '\t':     't',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	//text: 传入的模板文本字串
	//data: 数据对象
	var template = function(text,data){
		var index = 0;//记录当前扫描到哪里了
		var fn_bd = "var temp = '';";
		fn_bd += "temp += '";
		text.replace(matcher,function(match,inter,eval,offset){
			//找到第一个匹配后，将前面部分作为普通字符串拼接的表达式
			//添加了处理转义字符
			fn_bd += text.slice(index,offset)
				.replace(escaper, function(match) { return '\\' + escapes[match]; });

			//如果是<% ... %>直接作为代码片段，eval就是捕获的分组
			if(eval){
				fn_bd += "';" + eval + "temp += '";
			}
			//如果是<%= ... %>拼接字符串，inter就是捕获的分组
			if(inter){
				fn_bd += "' + " + inter + " + '";
			}
			//递增index，跳过eval或者inter
			index = offset + match.length;
			//这里的return没有什么意义，因为关键不是替换text，而是构建fn_bd
			return match;
		});
		//最后的代码应该是返回temp
		fn_bd += "';return temp;";
		var render = new Function('obj', fn_bd);
		return render(data);
	}
