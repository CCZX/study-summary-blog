/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1:

输入: "abcabcbb"
输出: 3 
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
示例 2:

输入: "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
示例 3:

输入: "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
*/
// let lengthOfLongestSubstring = function (str) {
//   let arr = []
//   for (let i = 0; i < str.length; i++) {
//     let temp = str.split(str[i])
//     for (let j = 0; j < temp.length; j++) {
//       let max = temp[0]
//       if (temp[j].length > max.length) {
//         max = str[i] + temp[j]
//         arr.push(max)
//       }
//     }
    
//   }
//   return arr.map((item) => {
//     return item.length
//   }).reduce((pre, cur) => {
//     return Math.max(pre, cur)
//   })
// }

// var lengthOfLongestSubstring1 = function(s) {
//   let targetArr = s.split('')
//   let length = targetArr.length
//   let maxString = s.charAt(0)
//   if(!s.length)
//       return 0
//   for(let i = 0; i < length; i++) {
//       let startChar = targetArr[i]
//       let str = []
//       str.push(startChar)
//       for(let j = i + 1; j < length; j++) {
//           let repeat = true
//           let regChar = `${s.charAt(j)}`
//           for(let z = 0; z < str.length; z++) {
//               repeat = str[z] == regChar ? true : false
//               if(repeat) {
//                   break
//               }
//           }
//           if(repeat)
//               break
//           str.push(regChar)
//           if(str.join('').length > maxString.length) {
//               maxString = str.join('')
//           }
//       }
//   }
//   return maxString.length
// };

var lengthOfLongestSubstring2 = function(s) {
  var res = 0; // 用于存放当前最长无重复子串的长度
  var str = ""; // 用于存放无重复子串
  var arr = []
  var len = s.length;
  for(var i = 0; i < len; i++) {
    var char = s.charAt(i);
    var index = str.indexOf(char);
    if(index === -1) {
      str += char;
      res = res < str.length ? str.length : res;
    } else {
      str = str.substr(index + 1) + char;
    }
    arr.push(str)
    console.log(str, res, arr)
    
  }
  let resArr = []
  for (let i = 0; i < arr.length; i++) {
    const element = String(arr[i])
    if (element.length === res) {
      resArr.push(element)
    }
  }
  return [res, resArr]; 
};

console.log(lengthOfLongestSubstring2("pwwkew"))
