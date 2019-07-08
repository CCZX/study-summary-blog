let initializeColor = function () {
  let color = []
  for(let i = 0; i < vertices.length; i++) {
    color[vertices[i]] = 'white'
  }
  return color
}
