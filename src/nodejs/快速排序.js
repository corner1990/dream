function quickSort(arr) {


  　　if (arr.length <= 1) { return arr }
  
  
       console.log("原数组是:" + arr)
  
  
  　　var pivotIndex = Math.floor(arr.length / 2)
  
  
  　　var pivot = arr.splice(pivotIndex, 1)[0]
  
  
  　　var left = []
  
  
  　　var right = []
  
     console.log("将中介提取出来后数组是:" + arr)
  
  　　for (var i = 0 ; i < arr.length ; i++){
  
               console.log("此刻中介是:" + pivot + "当前元素是:" + arr[i])
  　　　　if (arr[i] < pivot) {
  
  　　　　　　left.push(arr[i])
              console.log("移动" + arr[i] + "到左边")
  
  　　　　} else {
  　　　　　　right.push(arr[i])
              console.log("移动" + arr[i] + "到右边")
  
  　　　　}
  
  
  
  
  　　}
  
  
  　　return quickSort(left).concat([pivot], quickSort(right))
  
  
  }
var nums = [2,3,4,3,1,5,7,122,341,-1]


console.log(quickSort(nums))