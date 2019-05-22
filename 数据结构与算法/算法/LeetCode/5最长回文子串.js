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

// 这是暴力破解的方式，用两层for循环来判断
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

/* 
动态规划 


*/
var longestPalindrome1 = function(s) {
  let len = s.length;
  let result;
  let i,j,L;
  let dp=Array(len).fill(0).map(x=>Array(len).fill(0));
  console.log(dp);
  if(len<=1){
      return s
  }
  // 只有一个字符的情况是回文
  for(i = 0;i<len;i++){
      dp[i][i] = 1
      result = s[i]
  }

  // L是i和j之间的间隔数（因为间隔数从小到大渐增，所以大的间隔数总能包含小的间隔数）
  // i     j
  // abcdcba.length = L   所以 L = j-i+1; => j = i+L-1;
  for ( L = 2; L <= len; L++) {
      // 从0开始
      for ( i = 0; i <= len - L; i++) {
              j = i + L - 1;
          if(L == 2 && s[i] == s[j]) {
              dp[i][j] = 1;
              result = s.slice(i, i + L);
          }else if(s[i] == s[j] && dp[i + 1][j - 1] == 1) {
              dp[i][j] = 1
              result = s.slice(i, i + L);
          }

      }
  }
  //console.log(result);
  return result;
}

longestPalindrome1('123')
