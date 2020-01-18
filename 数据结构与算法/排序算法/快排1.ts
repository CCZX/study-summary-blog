function quick(arr:Array<number>, left:number, right:number) {
  let index:undefined | number
  if (arr.length > 1) {
    index = parttiton(arr, left, right)
    if (left < index - 1) {
      quick(arr, left, index)
    }
    if (index < right) {
      quick(arr, index, right)
    }
  }
}

function parttiton(arr:Array<number>, left:number, right:number):number {
  let flag:number = arr[Math.floor((left+right)/2)]
  let i = left
  let j = right
  while (i <= j) {
    while (arr[i] < flag) {
      i++
    }
    while (arr[j] > flag) {
      j--
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }
  return i
}
