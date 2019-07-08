/**
 * 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列。

比如输入字符串为 "LEETCODEISHIRING" 行数为 3 时，排列如下：

L   C   I   R
E T O E S I I G
E   D   H   N
之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："LCIRETOESIIGEDHN"。

请你实现这个将字符串进行指定行数变换的函数：

string convert(string s, int numRows);
示例 1:

输入: s = "LEETCODEISHIRING", numRows = 3
输出: "LCIRETOESIIGEDHN"
示例 2:

输入: s = "LEETCODEISHIRING", numRows = 4
输出: "LDREOEIIECIHNTSG"
解释:

0  L     D     R
1  E   O E   I I
2  E C   I H   N
3  T     S     G
*/

var convert = function(s, numRows) {
  let arr = new Array(numRows)
  let row = 0
  let col = 0
  let rowflag = "+"
  for (let i = 0; i < arr.length; i++) {
    arr[i] = []
  }
  for (let i = 0; i < s.length; i++) {
    arr[row][col] = s[i]
    // console.log(arr)
    // console.log(rowflag)
    // console.log(row)
    if (rowflag == "+") {
      row ++
      if (row > arr.length - 1) { // 1 2 3 4
        rowflag = "-"
        row = arr.length - 2
        col++
      }
    }
    if (rowflag == "-") {
      row --
      col ++
      if (row < 0) {
        rowflag = "+"
        row = 1
      }
    }
  }
  return arr
  let temparr = arr.filter((item) => {
    return item
  })
};
console.log(convert("LEETCODEISHIRING", 4))