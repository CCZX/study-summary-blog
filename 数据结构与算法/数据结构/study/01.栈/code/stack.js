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
    return items.length === 0
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

module.exports = Stack
