/**
 * call核心
 * 1. 将函数设为该对象的属性
 * 2. 执行并删除这个函数
 * 3. 指定this到函数并传入非定参数执行函数
 * 4. 如果不传参数默认指向为window
 * apply
 * apply实现与call类似只是传参方式不同
 */

Function.prototype.call2 = function(content = window) {
  content.fn = this;
  console.log(content)
  // console.log(content.fn) // bar
  let args = [...arguments].slice(1); // ["black", 18]
  // console.log(content.fn(...args))
  let result = content.fn(...args);
  delete content.fn;
  return result;
}
Function.prototype.apply2 = function (content = window) {
  content.fn = this
  let result
  if (arguments[1]) {
    result = content.fn(...this.arguments[1])
  } else {
    result = content.fn()
  }
  delete content.fn()
  return result
}
var foo = {
  value: 1
}
function bar(name, age) {
  console.log(name)
  console.log(age)
  console.log(this.value);
}
bar.call2(foo, 'black', '18') // black 18 1
// bar('black', '18')
