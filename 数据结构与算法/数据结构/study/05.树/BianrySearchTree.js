// 二叉搜索树(BST)是二叉树的一种，但是它只允许在左侧节点存储比父节点小的值，在右侧节点存储比父节点大的或相等值。

/**
 * 1.insert(key)：向树中插入一个人新的节点
 * 2.search(key): 在树中查找一个键
 * 3.inOrderTraverse: 通过中序遍历的方式遍历所有的节点,中序遍历是一种以上行顺序访问BST所有节点的遍历方式，也就是从
 *                    最小到最大的顺序来访问，中序遍历的一种应用就是对树进行排序。
 * 4.preOrderTraverse: 通过先序遍历的方式遍历所有的节点,先序遍历是以优先于后代节点的顺序访问每个节点。先序遍历的一种
 *                     用途是打印一个结构化的文档
 * 5.postOrderTraverse: 通过后序遍历的方式便利所有的节点
 * 6.min：返回树中最小键
 * 7.max： 返回树中最大键
 * remove(key): 从树中移除某个键
 */
function BitnarySearchTree() {
  let Node = function (key) {
    this.key = key
    this.left = null
    this.right = null
  }
  let root = null // 根节点
  let insertNode = (node, newNode) => { // 插入方法
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        insertNode(node.right, newNode)
      }
    }
  }
  // 插入一个新的键
  this.insert = (key) => {
    let newNode = new Node(key)
    if (root === null) {
      root = newNode
    } else {
      insertNode(root, newNode)
    }
  }
  // 中序遍历
  // inOrderTraverse接受一个回调函数作为参数。回调函数用来定义我们对遍历到的每个节点进行的操作(这也叫做访问者模式)，
  this.inOrderTraverse = (cb) => {
    inOrderTraverseNode(root, cb)
  }
  // 私有函数
  let inOrderTraverseNode = (node, cb) => {
    if (node !== null) { // 检查传入的节点是否为null，这也是递归终止的条件
      inOrderTraverseNode(node.left, cb)
      cb(node.key)
      inOrderTraverseNode(node.right, cb)
    }
  }
  // 先序遍历
  this.preOrderTraverse = (cb) => {
    preOrderTraverseNode(root, cb)
  }
  // 私有函数
  let preOrderTraverseNode = (node, cb) => {
    if (node !== null) {
      cb(node.key)
      preOrderTraverseNode(node.left, cb)
      preOrderTraverseNode(node.right, cb)
    }
  }
  // 后序遍历
  this.postOrderTraverse = (cb) => {
    postOrderTraverseNode(root, cb)
  }
  // 私有函数
  let postOrderTraverseNode = (node, cb) => {
    if (node !== null) {
      postOrderTraverseNode(node.left, cb)
      postOrderTraverseNode(node.right, cb)
      cb(node.key)
    }
  }
  // 最小值
  this.min = () => {
    return minNode(root)
  }
  let minNode = (node) => {
    if (node) {
      while (node && node.left  !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }
  // 最大值
  this.max = () => {
    return maxNode(root)
  }
  let maxNode = (node) => {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }
  // 搜索特定的值
  this.search = (key) => {
    return searchNode(root, key)
  }
  let searchNode = (node, key) => {
    if (node === null) {
      return false
    }
    if (key < node.key) {
      return searchNode(node.left, key)
    } else if (key > node.key) {
      return searchNode(node.right, key)
    } else {
      return true
    }
  }
  // 移除一个值S
  this.remove = (key) => {
    root = removeNode(root, key)
  }
  let removeNode = (node, key) => {
    if (node === null) {
      return null
    }
    if (key < node.key) {
      node.left = removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = removeNode(node.right, key)
    } else { // 键等于node.key
      // 1.叶子节点
      if (node.left === null && node.right === null) { 
        node = null
        return node
      }
      // 2.只有一个子节点
      if (node.left === null) {
        node = node.right
        return node
      }
      if (node.right === null) {
        node = node.left
        return node
      }
      // 3.两个子节点
      let aux = findMinNode(node.right)
      node.key = aux.key
      node.right = removeNode(node.right, aux.key)
      return node
    }
  }
  let findMinNode = (node) => {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }
}



let tree = new BitnarySearchTree()
tree.insert(11)
tree.insert(7)
tree.insert(15)
tree.insert(5)
tree.insert(3)
tree.insert(9)
tree.insert(8)
tree.insert(10)
tree.insert(13)
tree.insert(12)
tree.insert(14)
tree.insert(20)
tree.insert(18)
tree.insert(25)
tree.insert(6)
function printNode(k) {
  console.log(k)
}
tree.inOrderTraverse(printNode)