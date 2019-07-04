Function.prototype.bind2 = function (content) {
  if (typeof this != "function") {
    throw Error("not a function")
  }
  let fn = this // foo
  let args = [...arguments].slice(1)

  let resFn = function () {
    return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments))
  }
  console.log(this instanceof resFn)
  function tmp() {}
  tmp.prototype = this.prototype
  resFn.prototype = new tmp()

  return resFn
}

let obj = {
  value: 1
}

function foo() {
  console.log(this.value)
}

let bar = foo.bind2(obj)
bar()
let bar1 = foo.bind2()
bar1()
