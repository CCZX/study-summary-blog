let insertSort = (list) => {
  let array = [...list]
  let j,tmp
  for (let i = 1; i < array.length; i++) {
    const element = array[i];
    j = i
    tmp = array[i]
    while (j > 0 && array[j - 1] > tmp) {
      array[j] = array[j-1]
      j --
    }
    array[j] = tmp
  }
  return array
}
let list = [1,23,4,23,2,342,141,12]
console.log(insertSort(list))
