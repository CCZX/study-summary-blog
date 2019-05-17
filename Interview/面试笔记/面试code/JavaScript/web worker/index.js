let worker = new Worker('./worker.js')
worker.postMessage('hello')
worker.onmessage = function (e) {
  console.log(e.data)
  postMessage('hi')
}