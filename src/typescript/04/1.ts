/* 
* 接口约束
*
 */
/* 
* 属性类的接口
*/
interface userInterface{
    name: string,
    age: number,
    home?: string,
    height?:number
}
function getUserInfo (user: userInterface):void {
     console.log(`${user.name} ${user.age}`)
 }
function getVipInfo (user: userInterface):void {
    console.log(`${user.name} ${user.age}`)
}
 getUserInfo({name: 'leo', age: 10})
 getVipInfo({name: 'vip', age: 999})