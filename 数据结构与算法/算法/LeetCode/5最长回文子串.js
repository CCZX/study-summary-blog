/**
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：

输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。
示例 2：

输入: "cbbd"
输出: "bb"
*/

var longestPalindrome = function (s = "aba") {
  if (s === "") {
    return ""
  }
  if (s.length === 1) {
    return s
  }
  let palindromeStr = ""
  let palindromeArr = []
  let palindromeNum = 0
  let max_arr = []
  for (let i = 0; i < s.length; i++) {
    let str1 = s[i]
    for (let j = i + 1; j < s.length; j++) {
      let str2 = s[j]
      if (str1 === str2) {
        palindromeStr = s.substr(i, j - i + 1)
        let arr = palindromeStr.split("")
        let reversestr = arr.reverse().join("")
        if (palindromeStr === reversestr) {
          palindromeNum = palindromeNum < palindromeStr.length ? palindromeStr.length : palindromeNum
          palindromeArr.push(palindromeStr)
        }
      }

    }
  }
  // console.log(palindromeArr, palindromeNum)
  for (let i = 0; i < palindromeArr.length; i++) {
    const element = String(palindromeArr[i])
    if (element.length === palindromeNum) {
      max_arr.push(element)
    }
  }
  // console.log(max_arr)
  return max_arr[0] ? max_arr[0] : s[0]
};

console.log(longestPalindrome("accaaaaaaabzbqb")) // 
console.log(longestPalindrome())
console.log(longestPalindrome(""))
console.log(longestPalindrome("ac"))
// console.log(longestPalindrome("civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth")) // 



var longestPalindrome1 = function (s) {
  let strArr = s.split('')
  if (s) {
    return findPalindrome(strArr, strArr.length)
  } else {
    return ""
  }

  function isPalindrome(strArr) {
    return strArr.every((item, idx, s) => {
      return s[idx] === s[Math.abs(s.length - idx) - 1]
    })
  }

  function findPalindrome(arr, length) {
    let longstr
    let step = arr.length - length + 1
    for (let i = 0; i < step; i++) {
      let sliceArr = arr.slice(i, length + i)
      if (isPalindrome(sliceArr)) {
        longstr = sliceArr.join('')
      }
    }
    if (longstr) {
      return longstr
    } else {
      length--
      return findPalindrome(arr, length)
    }
  }
};