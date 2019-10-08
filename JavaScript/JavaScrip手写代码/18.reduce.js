Array.prototype.myReduce = function (cb, init) {
  if (typeof cb !== 'function') {
    return
  }
  let mul
  if (init) {
    mul = init
  } else {
    mul = this[0]
  }
  for (let i = 0; i < this.length; i++) {
    mul = cb(mul, this[i], i, this)
  }
  return mul
}