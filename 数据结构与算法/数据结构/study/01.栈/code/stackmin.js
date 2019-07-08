// 返回栈中最小的元素
const Stack = require('./stack')

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
