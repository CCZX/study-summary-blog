let list = [1,2,4,23,52,3,71,18,9]
let list1 = [1,21,31,41,51,61,71,81,91]
let count = 1
let bubbleSort = (list) => {
  // let arr = list.slice()
  let arr = [...list]
  let flag = true
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        flag = false
        
      }
      count ++
    }
    if (flag) {
      break
    }
  }
  return arr
}
// console.time('bubble')
// console.log(bubbleSort(list))
// console.timeEnd('bubble')
console.time('bubble1')
console.log(bubbleSort(list))
console.timeEnd('bubble1')
console.log('count' + count)
// console.log(list)