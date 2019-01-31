// 实现一个attr函数
function attr (key:string):any;
function attr (key:string, val:any):boolean;

let obj = {}
function attr (key: string, val: any) {
    if (arguments.length > 1) {
        obj[key] = val;
    } else {
        return obj[key]
    }
}

attr('name', 'leo')
console.log(attr('name'))
