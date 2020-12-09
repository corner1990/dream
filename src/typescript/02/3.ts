// 实现一个attr函数
function attr (key:string):any;
function attr (key:string, val:any):boolean;
interface OBj{
    [key: string]: any
}
let obj:OBj = {}
function attr (key: string, val: any) {
    if (arguments.length > 1) {
        obj[key] = val;
    } else {
        return obj[key]
    }
}

attr('name', 'leo')
console.log(attr
