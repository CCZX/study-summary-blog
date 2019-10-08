function quick(arr, left, right) {
  let index
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

function partition(arr, left, right) {
  let flag = arr[Math.floor((left + right) / 2)]
  let i,j
  while (i <= j) {
    if (att[i] < flag) {
      i++
    }
    if (arr[j] > flag) {
      j--
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]
      i ++
      j --
    }
  }
  return i
}
