# JavaScript事件循环机制
> JavaScript是一门单线程的语言，这就意味着JS无法进行多线程编程，所以JS中存在许多异步的操作。而异步操作的核心就是**事件**循环。

## 一、什么是事件循环
事件循环就是在执行上下文的过程中，执行栈中对事件进行入栈和出栈，如果在执行的过程中遇到了一些异步操作Ajax，settimeout，会先将它们交给浏览器的其他模块去处理，在执行完后再把它们的回调函数放到事件队列中，在执行栈执行完同步事件后再从事件队列中取出事件压入执行栈。

## 二、事件队列、执行栈
**事件队列**是一个存储着待执行任务的队列，其执行时间遵循先来先服务的顺序，异步任务在执行完之后它的回调函数会放到事件队列中。**执行栈**是一个函数调用栈的运行容器，当执行栈执行完当前任务后，JS引擎便会检查事件队列，如果事件队列不为空，事件队列的队头事件便会压入执行栈中继续执行。

## 三、Promise
总所周知，Promise的出现是为了解决回调地狱的问题，所以简单来说Promise是一个异步容器，里面存放着某个异步操作。Promise构造函数接受一个函数作为参数，该函数接受两个函数resolve和reject，这两个函数表示Promise变为完成或拒状态。Promise正是通过这两个状态来控制异步操作的结果，在声明的是Promise传入的函数参数会立即执行。

请看下面一段代码：

```
    
	let promise = new Promise(function(resolve, reject) {
	  console.log('Promise');
	  resolve();
	});
	
	promise.then(function() {
	  console.log('resolved');
	});
	
	console.log('script');
	// Promise
	// script
	// resolved
```

## 四、Macrotasks和Microtasks

- 一个事件循环有一个或者多个事件队列；
- 每个事件循环都有一个microtask队列
- macrotask队列就是我们常说的任务队列，microtask队列不是任务队列
- 一个任务可以被放入到macrotask队列，也可以放入microtask队列
当一个任务被放入microtask或者macrotask队列后，准备工作就已经结束，这时候可以开始执行任务了。

### macrotasks:
- setTimeout
- setInterval
- setImmediate
- requestAnimationFrame
- I/O
- UI rendering
### microtasks:
- process.nextTick
- Promises
- Object.observe
- MutationObserver

由此可见，setTimeout和Promises不是同一类的任务，处理方式应该会有区别，具体的处理方式有什么不同呢？我们来看下面这一段代码：

```javascript

	setTimeout(function() {
		console.log(1)
	}, 0)
	let promise = new Promise(function(resolve, reject) {
		console.log(2)
		for(let i = 0;i < 1000; i++){
			if (i === 999) {
				resolve()
			}
		}
		console.log(3)
	})
	promise.then( function() {
		console.log(4)
	})
	console.log(5)

	// 2 
	// 3 
	// 5
	// 4
	// 1

```

是不是感觉很奇怪？ 4 在 1 之后执行。即便是setTimeout的延迟为0。

原因在于Promise中的then执行的事件也就是`console.log(4)`会被推到microtasks中去，setTimeout会被推到macrotasks任务队列中去。
microtasks的作用是用来调用调度当前执行的脚本结束后需要立即执行的任务，以避免付出额外的task费用。

在每一次的事件循环中，macrotask只会提取一个任务，而microtask会一直提取直到microtask队列为空。在主线程执行完之后，会调用microtask中的任务直到最后一个任务被执行。

也就是说执行顺序是：

开始 -> 取事件队列第一个task执行 -> 取microtask全部任务依次执行 -> 取事件队列下一个任务执行 -> 再次取出microtask全部任务执行 -> ... 这样循环往复。

## 五、分析上面的代码
1、当遇到setTimeout时，会把它的回调函数`console.log(1)`放在macrotask事件队列中。

2、接下来遇到Peomise，首先会执行`console.log(2)`打印2，然后执行for循环，在for循环执行完成后Peomise的状态变为resolve，随后把它的回调函数`console.log(4)`推到microtask中去，然后立即执行`console.log(3)`。

3、然后执行`cnosole,log(5)`,这样就依次打印了 2，3，5。

4、此时所有的同步代码执行完成，检查microtask，完成器所有任务，则输出4。

5、再执行macro中的任务，输出1。`