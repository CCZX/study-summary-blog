function mergeSort(arr:number[]) {
  if (arr.length <= 1) {
    return arr
  }
  let mid:number = Math.floor(arr.length/2)
  let left:number[] = arr.slice(0, mid)
  let right:number[] = arr.slice(mid, arr.length)
  merge(mergeSort(left), mergeSort(right))
}

function merge(left:number[], right:number[]) {
  let i:number = 0
  let j:number = 0
  let res:number[] = []
  if (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      res.push(left[i++])
    } else {
      res.push(right[j++])
    }
  }
  while (i < left.length) {
    res.push(left[i++])
  }
  while (j < right.length) {
    res.push(right[j++])
  }
  return res
}

export default mergeSort
