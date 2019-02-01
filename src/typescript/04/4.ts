/* 
* 范形
* generic type ， 
 */
function calculate<T>(value:T):T{
    return value
}
// 调用函数的时候讲类型传递过去
console.log(calculate<string>('leo'))
console.log(calculate<number>(1))

// 类的泛形使用
class MyArray <T> {
    private list:T[] = []

    add(value:T) {
        this.list.push(value)
    }
    max():T{
        let ret = this.list[0]
        for(let i=1; i < this.list.length; i++) {
            if (this.list[i] > ret) ret = this.list[i]
        }

        return ret
    }
}
let arr1 = new MyArray<number>()
arr1.add(1)
arr1.add(23)
arr1.add(15)
arr1.add(65)
arr1.add(175)
console.log(arr1.max())