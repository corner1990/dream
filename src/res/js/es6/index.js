'use strict';
~function(){
	function move({x =0,y=0} = {}){
		console.log(x,y);
	}
	move({x:3,y:10})
	move({x:4});
	move({});
	move();

	function add({x,y}={x:0,y:0}){
		console.log(x,y)
	}
	add({x:2,y:4});
	add({x:2});
	add({});
	add();
}()
