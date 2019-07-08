// 后缀表达式
const Stack = require('./stack')

function calcExp(exp) {
  let stack = new Stack()
  for (let i = 0; i < exp.length; i++) {
    let item = exp[i]
    if (['+', '-', '*', '/'].includes(item)) {
      let val1 = stack.pop()
      let val2 = stack.pop()
      let exp_str = val2 + item + val1
      let res = parseInt(eval(exp_str))
      stack.push(res.toString())
    } else {
      stack.push(item)
    }
  }
  return stack.pop()
}

console.log(calcExp(['4', '13', '5', '/', '*']))
