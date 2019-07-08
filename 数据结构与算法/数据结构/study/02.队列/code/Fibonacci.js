/**
 * 队列实现斐波那契额数列
 */

const Queue = require('./queue')

function fibonacci(n) {
  let queue = new Queue()
  let index = 0
  queue.enqueue(1)
  queue.enqueue(1)
  while (index < n - 2) {
    let del_item = queue.dequeue()
    let head_item = queue.head()
    let next_item = del_item + head_item
    queue.enqueue(next_item)
    index ++
  }
  queue.dequeue()
  return queue.head()
}

console.log(fibonacci(3))
console.log(fibonacci(4))
console.log(fibonacci(5))
