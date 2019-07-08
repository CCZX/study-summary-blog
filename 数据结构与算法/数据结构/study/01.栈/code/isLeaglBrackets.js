// 检查表达式是否合法

const Stack = require('./stack')
function isLeaglBrackets(string) {
  let stack = new Stack()
  for (let i = 0; i < string.length; i++) {
    let item = string[i]
    // 左括号压栈
    if (item == '(') {
      stack.push(item)
    } else if (item == ')') { // 右括号先判度栈是否为空然后弹栈
      if (stack.isEmpty()) {
        return false
      } else {
        stack.pop()
      }
    }
  }
  return stack.isEmpty()
}

console.log(isLeaglBrackets('()()()'))
console.log(isLeaglBrackets('()(()'))
console.log(isLeaglBrackets('())(()'))