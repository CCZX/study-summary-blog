/**
 * 杨辉三角
 */
const Queue = require('./queue')

function yanghui(n) {
  let queue = new Queue()
  queue.enqueue(1)
  // 第一层for循环控制表示打印几层
  for (let i = 1; i <= n; i++) {
    let line = ""
    let pre = 0 
    // 第二层for循环控制打印第i层
    for (let j = 0; j < i; j++) {
      let item = queue.dequeue() // 1
      // console.log(item)
      line += item + " " // line = '""1" "'
      // console.log(line)
      // 计算下一个内容
      let val = item + pre // 1 1
      // console.log(val)
      pre = item // 1 1
      queue.enqueue(val) // 1 1
    }
    queue.enqueue(1)
    console.log(line)
  }
  return queue.size()
}

console.log(yanghui(2))

// console.log(require.extensions)
// console.log(require)


function yanghui2() {
  let queue = new Queue()
  
}
