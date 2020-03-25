var reverse = function(x) {
  let num = x
  const max = Math.pow(2, 32) - 1
  num = (Math.abs(num)).toString()
  let res = Number(num.split('').reverse().join(''))
  console.log(res, max)
  return res > max ? 0 : x > 0 ? res : -res
};
console.log(reverse(-2147483412))
// console.log(reverse(-123))