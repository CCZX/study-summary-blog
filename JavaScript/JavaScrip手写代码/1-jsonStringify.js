/**
 * JSON.stringify(value[, replacer [, space]])：
 * 1. Boolean | Number | String类型会自动转换为对应的原始值
 * 2. undefined、任意函数、symbol会被忽略
 * 3. 不可枚举属性会被忽略
 * 4. 循环引用也会被忽略
 */


function jsonStringify(obj) {
  let type = typeof obj;
  if (type !== "object" || type === null) {
      if (/string|undefined|function/.test(type)) {
          obj = '"' + obj + '"';
      }
      return String(obj);
  } else {
      let json = []
      arr = (obj && obj.constructor === Array);
      for (let k in obj) {
          let v = obj[k];
          let type = typeof v;
          if (/string|undefined|function/.test(type)) {
              v = '"' + v + '"';
          } else if (type === "object") {
              v = jsonStringify(v);
          }
          json.push((arr ? "" : '"' + k + '":') + String(v));
      }
      return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
  }
}
let func = function name(params) {
  
}
jsonStringify({x : 5}) // "{"x":5}"
jsonStringify([1, "false", false]) // "[1,"false",false]"
jsonStringify({b: undefined}) // "{"b":"undefined"}"
console.log(jsonStringify(null))
console.log(jsonStringify('123'))
console.log(jsonStringify(func))