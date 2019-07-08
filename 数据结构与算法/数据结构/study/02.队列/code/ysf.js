/**
 * 3.1、约瑟夫环
有一个数组a[100]存放0--99;要求每隔两个数删掉一个数，到末尾时循环至开头继续进行，求最后一个被删掉的数。
比如：前10个数是 0 1 2 3 4 5 6 7 8 9 10，所谓每隔两个数删掉一个数，其实就是把 2 5 8 删除掉。
 */
const Queue = require('./queue')

function delRing(list) {
  let queue = new Queue()
  let index = 0
  for (let i = 0; i < list.length; i++) {
    queue.enqueue(list[i])
  }
  while (queue.size() != 1) {
    // let item = queue.dequeue()
    // index+=1
    // if (index%3 == 0) {
    //   queue.enqueue(item)
    // }
    index ++
    index%3 === 0 ?  queue.enqueue(queue.dequeue()) : queue.dequeue()
    // 1 
  }
  return queue.head()
}

let arr = []
for (let index = 0; index < 10; index++) {
  arr.push(index)
}

console.log(delRing(arr))
