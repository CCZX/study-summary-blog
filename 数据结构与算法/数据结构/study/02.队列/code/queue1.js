/**
 * 队列的构造函数ES6
 */
let Queue = (function () {
  let items = new WeakMap() 
  // WeakMap结构与Map结构基本类似。区别是它只接受对象作为键名，
  // 不接受其他类型的值作为键名。键名是对象的弱引用，当对象被回收后，
  // WeakMap自动移除对应的键值对，WeakMap结构有助于防止内存泄漏。 
  class Queue {
    constructor() {
      items.set(this, [])
    }
    // 入队列
    enqueue(item) {
      let queue = items.get(this)
      queue.push(item)
    }
    // 出队列
    dequeue() {
      return items.get(this).shift()
    }
    // 返回队列头
    head() {
      let queue = items.get(this)
      return queue[0]
    }
    // 返回队列大小
    size() {
      let queue = items.get(this)
      return queue.length
    }
    // 清空队列
    clear() {
      items.set(this, [])
    }
    // 判断队列是否为空
    isEmpty() {
      let queue = items.get(this)
      return queue.length === 0
    }
    // 返回队尾
    tail() {
      let queue = items.get(this)
      return queue[queue.length - 1]
    }
  }
  return Queue
})()
let queue = new Queue()
queue.enqueue(1)