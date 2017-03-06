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
		var function_body = "var temp = '';";
		function_body += "temp += '";
		text.replace(matcher,function(match,interpolate,evaluate,offset){
			//找到第一个匹配后，将前面部分作为普通字符串拼接的表达式
			//添加了处理转义字符
			function_body += text.slice(index,offset)
				.replace(escaper, function(match) { return '\\' + escapes[match]; });

			//如果是<% ... %>直接作为代码片段，evaluate就是捕获的分组
			if(evaluate){
				function_body += "';" + evaluate + "temp += '";
			}
			//如果是<%= ... %>拼接字符串，interpolate就是捕获的分组
			if(interpolate){
				function_body += "' + " + interpolate + " + '";
			}
			//递增index，跳过evaluate或者interpolate
			index = offset + match.length;
			//这里的return没有什么意义，因为关键不是替换text，而是构建function_body
			return match;
		});
		//最后的代码应该是返回temp
		function_body += "';return temp;";
		var render = new Function('obj', function_body);
		return render(data);
	}
