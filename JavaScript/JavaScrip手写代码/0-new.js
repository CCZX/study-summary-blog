/**
 * new 操作符所做的事情
 * 1. 创建一个全新的对象
 * 2. 执行__proto__连接
 * 3. 使this指向创建的对象
 * 4. 通过new创建的每个对象最终被__proto__连接到这个函数的prototype上
 * 5. 如果函数没有显示的返回object，那么new表达式中的函数调用将返回该对象引用。
 */

function New(fun) {
  let res = {}
  if (fun.prototype !== null) {
    res.__proto__ = fun.prototype
  }
  let ret = fun.apply(res, Array.prototype.slice.call(arguments, 1))
  if (typeof ret === "object" || typeof ret === "funcion" && ret !== null) {
    return ret
  }
  return res
}


function A(a, b) {
  this.a = a
  this.b = b
}

let obj = New(A, 1, 2)

let obj1= new A(1, 2)

console.log(obj, obj1)

