let selectionSort = function (list) {
  let arr = [...list]
  let len = arr.length
  let indexMin
  for (let i = 0; i < len; i++) {
    indexMin = i
    for(let j = i; j < len; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j
      }
    }
    if (i !== indexMin) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]]
    }
  }
  return arr
}

let list = [1,23,4,23,2,342,141,12]
console.log(selectionSort(list))
