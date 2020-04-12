/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 *
 * https://leetcode-cn.com/problems/palindrome-number/description/
 *
 * algorithms
 * Easy (56.54%)
 * Total Accepted:    249.8K
 * Total Submissions: 437.7K
 * Testcase Example:  '121'
 *
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 
 * 示例 1:
 * 
 * 输入: 121
 * 输出: true
 * 
 * 
 * 示例 2:
 * 
 * 输入: -121
 * 输出: false
 * 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
 * 
 * 
 * 示例 3:
 * 
 * 输入: 10
 * 输出: false
 * 解释: 从右向左读, 为 01 。因此它不是一个回文数。
 * 
 * 
 * 进阶:
 * 
 * 你能不将整数转为字符串来解决这个问题吗？
 * 
 */

// 方法1：将数字转换后对比
/**
 * @param {number} x
 * @return {boolean}
 */
var reverse = function(x) {
  let num = x
  const max = Math.pow(2, 32) - 1
  num = (Math.abs(num)).toString()
  let res = Number(num.split('').reverse().join(''))
  console.log(res, max)
  return res > max ? 0 : x > 0 ? res : -res
};
var isPalindrome1 = function(x) {
    if (x < 0) {
      return false
    } else {
      const reverseNum = reverse(x)
      return x === reverseNum
    }
};

// 方法二：二分法

/**
 * 
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome2 = (x) => {
  if (x < 0) {
    return false
  }
  if (x >= 0 && x < 10) {
    return true
  }
  const str = x.toString()
  const len = str.length
  let flag = true
  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - 1 - i]) {
      flag = false
      break
    }
  }
  return flag
}

// 方法三：双指针
const isPalindrome = (x) => {
  if (x < 0) {
    return false
  }
  if (x >= 0 && x < 10) {
    return true
  }
  const str = x.toString()
  let i = 0
  let j = str.length
  let flag = true
  while (i < j) {
    if (str[i] !== str[j]) {
      flag = false
      break
    }
    i++
    j--
  }
}

