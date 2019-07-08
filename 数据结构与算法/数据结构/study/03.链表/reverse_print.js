const Node = require('./Node')
var node1 = new Node(1);
var node2 = new Node(2);
var node3 = new Node(3);
var node4 = new Node(4);
var node5 = new Node(5);
node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;

function reverse_print(head) {
  //	递归终⽌条件
  // console.log(1)
  if (head == null) {
    return
  } 
  else {
    reverse_print(head.next); //	甩锅
    // console.log(1)
    console.log(head.data); //	后⾯的都打印了，该打印⾃⼰了
  }
  // console.log(2)
  // let cur = head.next
  // reverse_print(head.next)
  // // console.log(head.data)
  // return cur
};
console.log(reverse_print(node1))