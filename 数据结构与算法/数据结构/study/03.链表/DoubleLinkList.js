
let DoubleLink = (function () {
  class Node {
    constructor(data) {
      this.data = data
      this.next = null
      this.pre = null
    }
  }
  // this.head = null
  //     this.tail = null
  //     this.length = 0
  let head = null
  let tail = null
  let length = 0
  class DoubleLink {
    constructor() {
      this.head = head
      this.tail = null
      this.length = 0
    }
    append(data) {
      if (head === null) {
        head = new Node(data)
        tail = head
      } else {
        let new_node = new Node(data)
        tail.next = new_node
        new_node.pre = tail
        tail = new_node
      }
      length++
    }
    print() {
      let curr = head
      while (curr) {
        console.log(curr)
        curr = curr.next
      }
    }
  }
  return DoubleLink
})()

let DouLink = new DoubleLink()
DouLink.append(0)
DouLink.append(1)
DouLink.print()
console.log(DouLink.head)