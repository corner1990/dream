;(function(window,undefined){
	var template = function(json){
		var temp = '';
		//开始变换
		temp += '<ul>';
		for(var key in json){
			temp += '<li class="'+json[key].class+'">'+json[key].val+'</li>';
		}

		temp +='</ul>'
	}

	//传入参数 然后调用即可
	template(items)
})(window,undefined)