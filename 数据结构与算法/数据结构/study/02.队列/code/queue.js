/**
 * 队列的构造函数ES5
 */
function Queue() {
  let items = []

  this.enqueue = (item) => {
    items.push(item)
  }
  this.dequeue= () => {
    return items.shift()
  }
  this.head = () => {
    return items[0]
  }
  this.tail = () => {
    return items[items.length-1]
  }
  this.size = () => {
    return items.length
  }
  this.clear = () => {
    items = []
  }
  this.isEmpty = () => {
    return items.length === 0
  }
}
module.exports = Queue
