function Dictionary() {
  let items = {}
  this.has = (key) => {
    return items.hasOwnProperty(key)
  }
  this.set = (key, value) => {
    items[key] = value
  }
  this.delete = (key) => {
    if (this.has(key)) {
      delete items[key]
      return true
    }
    return false
  }
  this.get = (key) => {
    return this.has(key) ? items[key] : undefined
  }
  this.values = () => {
    let values = []
    for(let k in items) {
      if (this.has(k)) {
        values.push(items[k])
      }
    }
    return values
  }
  this.clearr = () => {
    items = {}
  }
  this.size = () => {
    return Object.keys(items).length
  }
  this.keys = () => {
    return Object.keys(items)
  }
}

// exports.Dictionary = Dictionary
module.exports = {
  Dictionary
}
