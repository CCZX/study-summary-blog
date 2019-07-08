let Node = require('./Node')
let node1 = new Node(1)
let node2 = new Node(2)
let node3 = new Node(3)
let node4 = new Node(4)
node1.next = node2
node2.next = node3
node3.next = node4
function print(node) {
  var curr_node = node;
  while (curr_node) {
    console.log(curr_node.data);
    curr_node = curr_node.next;
  }
};

// 迭代反转
function reveser(head) {
  if (!head) {
    return false
  }
  let pre_node = null
  let curr_node = head
  while (curr_node) {
    let next_node = curr_node.next
    curr_node.next = pre_node
    pre_node = curr_node
    curr_node = next_node
  }
  return pre_node
}

// print(reveser(node1))

// 递归反转
function reveser_digui(head) {
  if (!head) {
    return false
  }
  if (head.next == null) {
    return head
  }
  let new_head = reveser_digui(head.next)
  head.next.next = head
  head.next = null
  // console.log(11)
  return new_head
}
print(reveser_digui(node1))


