
function LinkList() {
  let Node = function (data) {
    this.data = data
    this.next = null
  }
  let length = 0
  let head = null
  let tail = null

  // 在尾部添加节点
  this.append = (data) => {
    // 创建新节点
    let new_node = new Node(data)
    if (head == null) {
      head = new_node
      tail = new_node
    } else {
      tail.next = new_node
      tail = new_node
    }
    length +=1
    return true
  }
  // 打印节点
  this.print = () => {
    let curr_node = head
    while (curr_node) {
      console.log(curr_node.data)
      curr_node = curr_node.next
    }
  }
  // 指定位置添加节点
  this.insert = (index, data) => {
    if (index > length || index < 0) {
      return
    } else if (index == length) {
      return this.append(data)
    } else {
      let new_node = new Node(data)
      if (index == 0) {
        new_node.next = head
        head = new_node
      } else {
        let insert_index = 1
        let curr_node = head
        while (insert_index < index) {
          insert_index ++
          curr_node = curr_node.next
        }
        let next_node = curr_node.next
        curr_node.next = new_node
        new_node.next = next_node
      }
    }
    length ++
    return true
  }
  // 删除指定位置节点
  this.remove = (index) =>{
    if (index<0||index>=length) {
      return false
    } else {
      let del_node = null
      if (index == 0) {
        del_node = head
        head = head.next
        del_node.next = null
      } else {
        let del_index = 0
        let pre_node = null
        let curr_node = head
        while (del_index<index) {
          del_index++
          pre_node = curr_node
          curr_node = curr_node.next
        }
        del_node = curr_node
        pre_node.next = curr_node.next
        if (curr_node.next == null) {
          tail = pre_node
        }
        del_node.next = null
      }
    }
    length --
    // return del_node.data
  }
  // 返回指定位置节点
  this.get = (index) => {
    if (index>=length || index<0) {
      return false
    }
    let node_index = 0
    let curr_node = head
    while (node_index<index) {
      node_index++
      curr_node = curr_node.next
    }
    return curr_node
  }
  // 链表反转
  this.reveser = () => {
    let pre_node = null
    let curr_node = head
    while (curr_node) {
      let next_node = curr_node.next
      curr_node.next = pre_node
      pre_node = curr_node
      curr_node = next_node
    }
    head = pre_node
  }
}
let link = new LinkList()
link.append(2)
link.append(4)
link.append(8)
link.print()
link.insert(1,3)
link.print()
link.remove(1)
link.print()
  
// link.remove(2)
// link.print()
// link.append(9)
// link.print()
// console.log('---------------------')
// link.reveser()
// link.print()



module.exports = LinkList
