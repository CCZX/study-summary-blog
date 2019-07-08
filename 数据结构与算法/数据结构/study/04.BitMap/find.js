// function Find() {
//   let arr = new Array(100)


// }

let Find = (function () {
  let arr = new Array(100)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = 0
  }
  class Find {
    constructor() {
      this.datas = arr
    }
    add(num) {
      this.datas[num] = 1
    }
    isExit(num) {
      return this.datas[num] === 1 ? true : false
    }
  }
  return Find
})()

let find = new Find()
find.add(1)
console.log(find.isExit(1))
console.log(find.isExit(2))
// console.log(find.datas)

let val = 0
val = val | 1<<3
val = val | 1<<9
val = val | 1<<19
val = val | 1<<20
console.log(val)