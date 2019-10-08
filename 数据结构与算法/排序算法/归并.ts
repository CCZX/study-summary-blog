function mergeSort(arr:Array<number>):Array<number> {
  let list:Array<number> = [...arr]
  if (list.length < 1) {
    return list
  }
  let mid:number = list.length / 2
  let left:Array<number> = list.slice(0, mid)
  let right:Array<number> = list.slice(mid, list.length)
  merge(mergeSort(left), mergeSort(right))
}

function merge(leftArr:Array<number>, rightArr:Array<number>):Array<number> {
  let res:Array<number> = []
  let left:number = 0
  let right:number = 0
  if (left < leftArr.length && right < rightArr.length) {
    if (leftArr[left] < rightArr[right]) {
      res.push(leftArr[left++])
    } else {
      res.push(rightArr[right++])
    }
  }
  while (left < leftArr.length) {
    res.push(leftArr[left++])
  }
  while (right < rightArr.length) {
    res.push(rightArr[right++])
  }
  return res
}
