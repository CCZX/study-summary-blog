/**
 * 使用队列实现栈
 */

const Queue = require('./queue')

function queueToStack() {
  let queue_1 = new Queue()
  let queue_2 = new Queue()
  let data_queue = null
  let empty_queue = null
  let initQueue = () => {
    if (queue_1.isEmpty() && queue_2.isEmpty()) {
      data_queue = queue_1
      empty_queue = queue_2
    } else if (queue_1.isEmpty()) {
      data_queue = queue_2
      empty_queue = queue_1
    } else {
      data_queue = queue_1
      empty_queue = queue_2
    }
  }
  this.push = (item) => {
    initQueue()
    data_queue.enqueue(item)
  }
  this.top = () => {
    initQueue()
    return data_queue.tail()
  }
  this.pop = () => {
    initQueue()
    while (data_queue.size() > 1) {
      empty_queue.enqueue(data_queue.dequeue())
    }
    return data_queue.dequeue()
  }
}

let q_stack = new queueToStack()

q_stack.push(1)
q_stack.push(2)
q_stack.push(4)
console.log(q_stack.top())
console.log(q_stack.pop())
console.log(q_stack.top())
console.log(q_stack.pop())
console.log(q_stack.pop())
