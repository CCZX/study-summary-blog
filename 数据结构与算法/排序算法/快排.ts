
function quick(arr: number[], left: number, right: number) {
  let index:number | undefined
  if (arr.length > 1) {
    index = partition(arr, left, right)
    if (left < index - 1) {
      quick(arr, left, index)
    }
    if (index < right) {
      quick(arr, index, right)
    }
  }
}

function partition(arr: number[], left: number, right: number):number {
  let flag:number = arr[Math.floor((right+left)/2)]
  let i:number = left
  let j:number = right
  while (i <= j) {
    while (arr[i] < flag) {
      i++
    }
    while (arr[j] > flag) {
      j--
    }
    if(i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i++
      j--
    }
  }
  return i
}

let arr:Array<number> = [3,4,1,5,2]
quick(arr, 0, 4)

