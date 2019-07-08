let {
  Dictionary
} = require('./../集合、字典、散列表/Dictionary')
let Queue = require('./../02.队列/code/queue')
let Stack = require('./../01.栈/code/stack')

function Graph() {
  let vertices = [] // 存储所有顶点的名字
  let adjList = new Dictionary() // 存储邻接表，顶点作为键，邻接顶点列表作为值
  // 添加顶点
  this.addVertex = function (v) {
    vertices.push(v)
    adjList.set(v, [])
  }
  // 添加边
  this.addEdge = function (v, w) { // 接受的两个参数都是顶点
    adjList.get(v).push(w)
    adjList.get(w).push(v)
  }
  // 输入邻接矩阵
  this.toString = function () {
    let s = ''
    for (let i = 0; i < vertices.length; i++) {
      s += vertices[i] + '->'
      let neighbors = adjList.get(vertices[i])
      for (let j = 0; j < neighbors.length; j++) {
        s += neighbors[j] + ' '
      }
      s += '\n'
    }
    return s
  }
  // 广度优先
  let initializeColor = function () {
    let color = []
    for (let i = 0; i < vertices.length; i++) {
      color[vertices[i]] = 'white'
    }
    return color
  }
  this.bfs = function (v, cb) {
    let color = initializeColor()
    let queue = new Queue()
    queue.enqueue(v)
    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = adjList.get(u)
      color[u] = 'grey'
      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if (color[w] === 'white') {
          color[w] = 'grey'
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
      if (cb) {
        cb(u)
      }
    }
  }
  // 使用bfs寻找最短路径
  this.BFS = function (v) {
    let color = initializeColor()
    let queue = new Queue()
    let d = [] // 距离
    let pred = [] // 前驱结点
    queue.enqueue(v)
    for (let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      pred[vertices[i]] = null
    }
    while (!queue.isEmpty()) {
      let u = queue.dequeue()
      let neighbors = adjList.get(u)
      color[u] = 'grey'
      for (let i = 0; i < neighbors.length; i++) {
        let w = neighbors[i]
        if (color[w] === 'white') {
          color[w] === 'grey'
          d[w] = d[u] + 1
          pred[w] = u
          queue.enqueue(w)
        }
      }
      color[u] = 'black'
    }
    return {
      distaces: d,
      predecessors: pred
    }
  }
  // 深度优先
  this.dfs = function (cb) {
    let color = initializeColor()
    for (let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        dfsVisit(vertices[i], color, cb)
      }
    }
  }
  let dfsVisit = function (u, color, cb) {
    color[u] = 'grey'
    if (cb) {
      cb(u)
    }
    let neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      if (color[w] === 'white') {
        dfsVisit(w, color, cb)
      }
    }
    color[u] = 'black'
  }
  let time = 0
  this.DFS = function () {
    let color = initializeColor()
    let d = [] // 节点发现时间
    let f = [] // 节点完成时间
    let p = [] // 前驱结点
    let time = 0
    for(let i = 0; i < vertices.length; i++) {
      d[vertices[i]] = 0
      f[vertices[i]] = 0
      p[vertices[i]] = null
    }
    for(let i = 0; i < vertices.length; i++) {
      if (color[vertices[i]] === 'white') {
        DFSVisit(vertices[i], color, d, f, p)
      }
    }
    return {
      discovery: d,
      finished: f,
      predecessors: p
    }
  }
  let DFSVisit = function (u, color, d, f, p) {
    console.log(`discovered${u}`)
    color[u] = 'grey'
    d[u] = ++time
    let neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
      let w = neighbors[i]
      if (color[w] === 'white') {
        p[w] = u
        DFSVisit(w, color, d, f, p)
      }
    }
    color[u] = 'black'
    f[u] = ++time
    console.log(`explored${u}`)
  }
}


let graph = new Graph()
let myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (let index = 0; index < myVertices.length; index++) {
  graph.addVertex(myVertices[index])
} {
  graph.addEdge('A', 'B')
  graph.addEdge('A', 'C')
  graph.addEdge('A', 'D')
  graph.addEdge('C', 'D')
  graph.addEdge('C', 'G')
  graph.addEdge('D', 'G')
  graph.addEdge('D', 'H')
  graph.addEdge('B', 'E')
  graph.addEdge('B', 'F')
  graph.addEdge('E', 'I')
}
// 输出邻接表
console.log(graph.toString())
// 广度优先
function printNode(value) {
  console.log('Visited vertex: ' + value)
}
graph.bfs('A', printNode)
// 广度优先最短路径
let shortestPathA = graph.BFS('A')
console.log(shortestPathA)
console.log(shortestPathA.predecessors['B'])

let fromVertex = myVertices[0]
for (let i = 1; i < myVertices.length; i++) {
  let toVertex = myVertices[i]
  let path = new Stack()
  for (let v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) {
    path.push(v)
  }
  path.push(fromVertex)
  let s = path.pop()
  let dis = 0
  while (!path.isEmpty()) {

    s += ' - ' + path.pop()
    dis++
  }
  s += dis
  console.log(s)
}
// 深度优先
graph.dfs(printNode)
console.log(graph.DFS())
exports.graph
exports.Graph