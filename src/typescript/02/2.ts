/* 
* 函数的重载
* Java: 指两个或者两个一样的函数，参数的个数和类型不一样，执行不同的方法
*/
// 函数声明
function attr(val:string):void;
function attr(val:number):void;
function attr(val:boolean):void;

// 函数体
function attr(val:any):void {
    console.log(val)
}

attr('leo')
attr(20)
attr(true)