
// 实现一个简单的栈
function Stack() {
  let items = [] // 存储数据
  
  // 定义方法
  // 1.添加元素(压栈)
  this.push = (item) => {
    items.push(item)
  }
  // 2.弹出元素pop
  this.pop = () => {
    return items.pop()
  }
  // 3.返回栈顶元素
  this.top = () => {
    return items[items.length-1]
  }
  // 4.检查栈是否为空
  this.isEmpty = () => {
    return items.length == 0
  }
  // 5.返回栈的大小
  this.size = () => {
    return items.length
  }
  // 6.清空栈
  this.clear = () => {
    items = []
  }
}

// 实际运用
// 1.括号匹配
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

// 2.后缀表达式
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

// 3.实现返回栈最小的元素
function StackMin() {
  let data_stack = new Stack()
  let min_stack = new Stack()
  this.push = (item) => {
    data_stack.push(item)
    if (min_stack.isEmpty() || item < min_stack.top()) {
      min_stack.push(item)
    } else {
      min_stack.push(min_stack.top())
    }
  }
  this.pop = () => {
    data_stack.pop()
    min_stack.pop()
  }
  this.min = () => {
    return min_stack.top()
  }
}
let stackMin = new StackMin()
stackMin.push(1)
stackMin.push(2)
stackMin.push(4)
console.log(stackMin.min())
stackMin.push(0)
console.log(stackMin.min())
stackMin.pop()
console.log(stackMin.min())

module.exports = Stack
