class Node{
  constructor(data) {
    this.data = data
    this.next = null
  }
}

let node1 = new Node(1)
let node2 = new Node(3)
let node3 = new Node(5)
let node4 = new Node(2)
let node5 = new Node(4)

node1.next = node2
node2.next = node3

node4.next = node5

function merge_node(head1, head2) {
  if (head1 === null) {
    return head2
  } else if (head2 === null) {
    return head1
  }

  let merge_head = null
  let merge_tail = null
  let curr_1 = head1
  let curr_2 = head2

  while (curr_1 && curr_2) {
    let min_node = null
    if (curr_1.data < curr_2.data) {
      min_node = curr_1.data
      curr_1 = curr_1.next
    }else {
      min_node = curr_2.data
      curr_2 = curr_2.next
    }
    if (merge_head === null) {
      merge_head = new Node(min_node)
      merge_tail = merge_head
    } else {
      let new_node = new Node(min_node)
      merge_tail.next = new_node
      merge_tail = new_node
    }
  }
  let res_link = null
  if (curr_1) {
    res_link = curr_1
  } else if (curr_2) {
    res_link = curr_2
  }
  while (res_link) {
    let new_node = new Node(res_link.data)
    merge_tail.next = new_node
    merge_tail = new_node
    res_link = res_link.next
  }
  return merge_head
}

function print_link(head) {
  if (head === null) {
    return
  }
  while (head) {
    console.log(head.data)
    head = head.next
  }
}
// print_link(node1)
print_link(merge_node(node1,node4))