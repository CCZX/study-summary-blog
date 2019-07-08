/**
 * 使用栈实现队列
 */
const Stack = require('./../../01.栈/code/stack')
function StackToQueue() {
  let data_stack = new Stack()
  let empty_stack = new Stack()

  this.enqueue = (item) => {
    data_stack.push(item)
  }

  this.dequeue = () => {
    if (empty_stack.isEmpty()) {
      while (!data_stack.isEmpty()) {
        empty_stack.push(data_stack.pop())
      }
    }
    return empty_stack.pop()
  }

  this.head = () => {
    if (!data_stack.isEmpty()) {
      while (!data_stack.isEmpty()) {
        empty_stack.push(data_stack.pop())
      }
    }
    return empty_stack.top()
  }
}

let queue = new StackToQueue()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue.head())
console.log(queue.dequeue())
console.log(queue.head())
queue.enqueue(4)
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())

