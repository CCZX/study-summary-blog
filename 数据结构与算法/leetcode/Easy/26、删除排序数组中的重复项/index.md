# 1、描述
```
[26] 删除排序数组中的重复项
https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/description/
algorithms
Easy (46.15%)
Total Accepted:    246.6K
Total Submissions: 508K
Testcase Example:  '[1,1,2]'
```
给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例 1:

给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。

示例 2:

给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。


说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:
```java
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
print(nums[i]);
}
```

# 2、解题过程

对于数组的操作我们可以很快想到使用`javascript`中的原生方法。对于一个数组中如果出现了重复项那么该项的**正向索引和逆向索引一定是不相同的**。所以我们在**循环遍历**数组的时，可以使用`javascript`中数组的两个原生方法来**判断正向索引和逆向索引是否相同：`indexOf`、`lastIndexOf`。如果两个索引不相同就删除该项：`splice(index, 1)`**。但是**需要注意的是**：由于我们使用的`splice`方法会改变原数组，所以原数组长度会减小，如果本次循环中使用了`splice`，那么数组的长度就会减一，所以在本次的下一次循环时访问的是原数组的第三项，就跳过了第二项，所以如果使用了splice我们应该让本次循环的索引减一。

`var arr = [1,1,1,1]`
1. index = 1, indexOf = 0,lastIndexOf = 3,删除第一项：`arr = [1,1,1]`
2. index = 2, 这样就跳过了原本的第二项

> code

```javascript
var removeDuplicates = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i]
    if (nums.indexOf(item) !== nums.lastIndexOf(item)) {
      nums.splice(i, 1) // 重点
      i-- // 重点
    }
  }
  return nums.length
};
```


