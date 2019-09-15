## 1、bind、call、apply

这三个函数都会改变this的指向，call和apply更适用于在函数运行时改变this；而bind会返回一个新的函数，新函数的this由bind传入的参数决定，所以bind更适用于返回一个新函数，这个函数在将来才会执行，比如DOM添加事件。

```javascript
// call
Function.prototype.myCall = function (ctx = window, ...arg) {
  if (typeof this !== "function") return
  ctx.fn = this
  let res = ctx.fn(...arg)
  delete ctx.fn
  return res
}
// apply 
Function.prototype.myApply = function (ctx = window, arg) {
  if (typeof this !== "function") return
  ctx.fn = this
  if(!Array.isArray(arg)) {
    throw new Error('需要数组')
  }
  let res = ctx.fn(...arg)
  delete ctx.fn
  return res
}
// bind
Function.prototype.newbBind = function(target){
    target = target || window
    var self = this;
    // 这里的arguments是在调用时传入的参数
    var args = [].slice.call(arguments, 1);
    var temp = function () {}

    function f(){
        // 这里的arguments是bind返回的新函数传入的参
        var _args = [].slice.call(arguments,0)//将一个类数组转化为数组

        return self.apply(this instanceof temp? this : target, args.concat(_args))
    }
    temp.prototype = self.prototype
    f.prototype = new temp()
    return f
}
```

## 2、函数柯里化

在Lambda演算（一套数理逻辑的形式系统，具体我也没深入研究过）中有个小技巧：假如一个函数只能收一个参数，那么这个函数怎么实现加法呢，因为高阶函数是可以当参数传递和返回值的，所以问题就简化为：写一个只有一个参数的函数，而这个函数返回一个带参数的函数，这样就实现了能写两个参数的函数了——这就是所谓的柯里化（Currying，以逻辑学家Hsakell Curry命名），也可以理解为一种在处理函数过程中的逻辑思维方式。

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数且返回结果的新函数的技术。

```javascript
function curry(fn, args) {
    var length = fn.length;
    var args = args || [];
    return function(){
        newArgs = args.concat(Array.prototype.slice.call(arguments));
        if (newArgs.length < length) {
            return curry.call(this,fn,newArgs);
        }else{
            return fn.apply(this,newArgs);
        }
    }
}

function multiFn(a, b, c) {
    return a * b * c;
}

var multi = curry(multiFn);

multi(2)(3)(4);
multi(2,3,4);
multi(2)(3,4);
multi(2,3)(4);

// 参考：https://juejin.im/post/5c9c3989e51d454e3a3902b6

```



## 3、原型、原型链

### 1、原型

原型是function的一个属性，该属性本质上是一个对象，它定义了构造函数构造出来的实例的共有祖先，构造函数产生的实例对象可以继承该属性的方法和属性，当实例访问某个属性找不到就会顺着原型链访问该属性。

### 2、原型链

有了原型，原型还是一个对象，那么这个名为原型的对象自然还有自己的原型，这样的原型上还有原型的结构就构成了原型链。

原型链是是描述实例对象与构造函数的原型之间的关系，如果实例对象找不到某个属性或者方法就会到构造函数的prototype上查找，如果还是找不到就会访问构造函数prototype属性的`__proto__`属性，直到null。

## 4、继承

在JavaScript中没有类的概念，传统语言中类通过拷贝实现继承，JavaScript通过原型链、原型委托的方式实现继承。

组合继承：

```javascript
function Father() {
    this.name = "father"
}
Father.prototype.say = function() {
    console.log('say')
}
function Child() {
    Father.call(this)
    this.age = 12
}
Child.prototype = Object.create(Father.prototype)
Child.prototype.constructor = Child
```

### 圣杯模式

```javascript
let inhert = (function() {
    function F(){}
    return function(father, child){
        F.prototype = father.prototype
        child.prototype = new F()
        child.prototype.constructor = child
    }
})
```

## 5、this

参考：https://juejin.im/post/5c96d0c751882511c832ff7b

### 1、什么是this？

this是JavaScript中的一个关键字，被自动定义在所有函数的作用域中。**this是在运行的时候进行绑定，并不是在编写的时候进行绑定，它的上下文取决于函数调用时的各种条件。**this的绑定和函数的声明位置无关，只取决于函数的调用方式。

当一个函数被调用的时候，会创建一个活动记录（也成为执行上下文）。这个记录会包含函数在哪里调用（调用栈）、函数调用的方法、传入的参数等信息。this就是记录中的一个属性，会在函数执行的过程中用到。

### 2、调用位置

调用位置指的是函数被调调用的位置而不是声明的位置。

### 3、绑定规则

#### 1、默认绑定

**默认绑定的时候this指向window**，默认绑定是指函数**不带任何修饰**的函数引用进行调用。比如：

```javascript
function foo() {
    console.log(this)
}
foo() // window
```

**但是需要注意的是在严格模式下，默认绑定并不会指向window**。

#### 2、隐式绑定

隐式绑定通常以对象作为执行上下文调用。但是我们需要明白一个道理：不管是在对象中声明一个函数，还是先定义再添加函数的引用，严格来叔这个函数都不属于该对象。

隐式绑定规则会把函数调用中的this绑定到这个上下文对象，因为调用foo的时候this被绑定到该对象，因此this.a等同于obj.a。

**对象属性引用链中只有最后一层会影响调用的位置。**

```javascript
let obj2 = {
  a:2,
  foo1:foo1
}
let obj1 = {
  a:1,
  obj2:obj2
}
function foo1() {
  console.log(this.a)
}
obj1.obj2.foo1() // 2
```

##### 1、隐式绑定丢失

```javascript
var a = 'window'
let obj = {
  a: 'obj',
  foo() {
    console.log(this.a)
  }
}
let bar = obj.foo
bar()
```

因为bar是obj.foo的一个引用，但是实际上引用的是foo函数的本身，因此bar()是一个不带任何修饰符的调用所以是默认绑定，this指向window。



```javascript
var a = 'window'
let obj = {
  a: 'obj',
  foo() {
    console.log(this.a)
  }
}
function doFoo(fn) {
  fn()
}
doFoo(obj.foo)
```

这里调用doFoo的时候参入了obj.foo作为实参，并将obj.foo赋值给fn，所以fn是foo函数的引用，在调用fn的时候也是不带任何修饰的调用，所以是默认调用this指向window。



以下这种情况this也是指向window。原因和上面一样。

```javascript
var a = 'window'
let obj = {
  a: 'obj',
  foo() {
    console.log(this.a)
  }
}
setTimeout(obj.foo, 1000)
```

所以上面我们可以看出回调函数丢失this是非常常见的。

#### 3、显示绑定

- call
- apply
- bind：bind会返回一个硬编码的新函数，它会把参数设置为this的上下文并调用原始函数。

如果把null或者undefined作为this绑定的对象传入其中，这些值会被忽略，实际上是默认绑定。

#### 4、new绑定

#### 5、绑定优先级

new > call、apply、bind > 隐式绑定 > 默认绑定

## 6、防抖节流

节流和防抖都是为了防止用户的频繁操作，它们的不同之处在于节流是在用户频繁操作的情况下在一个周期内只执行一次，防抖是在用户频繁操作的情况下只有当用户停止操作的时间间隔大于设定的时间才会执行，如果小于就会重新计算时间。

节流（throttle）是防止用户频繁操作，造成浏览器性能消耗过大

防抖（debounce），就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

```javascript
// 节流函数（throttle）
function throttle (fn, wait=500) {
    let pre_time = 0
    return function(...arg) {
        let curr_time = Date.now()
        if(curr_time - pre_time > wait) {
            fn.apply(this, arg)
            pre_time = curr_time
        }
    }
}
// 防抖函数（debounce）
function debounce(fn, wait = 500, immediately = true) {
    let timer
    return function(...arg) {
        if(immediately) {
            fn.apply(this, arg)
            immediately = false
        }
        clearTimout(timer)
        timer = setTimout(()=> {
            fn.apply(this, arg)
        }, wait)
    }
}
```

## 7、Promise

### 面试常见问题：

1、了解 Promise 吗？

2、Promise 解决的痛点是什么？

3、Promise 解决的痛点还有其他方法可以解决吗？如果有，请列举。

4、Promise 如何使用？

5、Promise 常用的方法有哪些？它们的作用是什么？如何使用？

6、Promise 在事件循环中的执行过程是怎样的？

7、Promise 的业界实现都有哪些？

8、能不能手写一个 Promise ？

```javascript
function myPromise(constructor){
    let self=this;
    self.status="pending" //定义状态改变前的初始状态
    self.value=undefined;//定义状态为resolved的时候的状态
    self.reason=undefined;//定义状态为rejected的时候的状态
    function resolve(value){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.value=value;
          self.status="resolved";
       }
    }
    function reject(reason){
        //两个==="pending"，保证了状态的改变是不可逆的
       if(self.status==="pending"){
          self.reason=reason;
          self.status="rejected";
       }
    }
    //捕获构造异常
    try{
       constructor(resolve,reject);
    }catch(e){
       reject(e);
    }
}
myPromise.prototype.then=function(onFullfilled,onRejected){
   let self=this;
   switch(self.status){
      case "resolved":
        onFullfilled(self.value);
        break;
      case "rejected":
        onRejected(self.reason);
        break;
      default:       
   }
}

// 来源：https://github.com/forthealllight/blog/issues/4
```



### 1、promise含义

promise是**异步编程的一种解决方案，解决了回调地狱的问题**。Promise**是一个容器保存着某个未来才会结束的事件的结果**，也可以说**是一个对象从它可以获取异步操作的消息**。

特点：

1. **对象状态不受外界影响**，只有`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）三种状态。
2. **一旦状态改变就不会再改变**。只能从`pending`（进行中）到`fulfilled`（已成功）或`pending`（进行中）到`reject`（以失败）。

### 2、基本语法

```javascript
const promise = new Promise(function(resolve, reject) {
    if(/*success*/) {
        resolve(val)
    } else {
        reject(val)
    }
})
```

**Promise接受一个函数作为参数，该函数接受两个参数，它们是两个函数**，由 JavaScript 引擎提供，不用自己部署。

**resolve**的作用是在**异步操作成功**的时候调用，并将异步操作的结果作为参数传递出去；**reject**是在**异步操作失败**的时候调用。

**Promise实例**生成之后可以用**then**方法分别**指定成功和失败的回调函数**。

```javascript
promise.then(function() {
    /*success*/
}, function() {
    /*failure*/
})
```

第一个参数是成功时调用，第二个是失败时调用，这两个函数都接受Promise对象传出的值作为参数，**第一个成功时的回调函数时必须的**失败时的回调函数不是必须的。

`resolve`函数的参数除了正常的值以外，还可能是另一个 Promise 实例，比如像下面这样。

```javascript
const p1 = new Promise(function (resolve, reject) {
  // ...
});

const p2 = new Promise(function (resolve, reject) {
  // ...
  resolve(p1);
})


const p1 = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error('fail')), 3000)
})

const p2 = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(p1), 1000)
})

p2
  .then(result => console.log(result))
  .catch(error => console.log(error))
// Error: fail
// 这里p2的状态决定p1的状态，p2后的then都是针对p1的
```

**这里p2的状态决定p1的状态，p2后的then都是针对p1的**

**Promise的具体例子：**

```javascript
function timeout(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, ms, 'done');
  })
}
let p = timeout(100).then((val) => {
  console.log(val)
})
```

**Promise创建之后会立即执行**

```javascript
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');
// promise
// Hi!
// resolved.
```

**实现Ajax**

```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```

### 3、promise.prototype.then

then方法是定义在原型对象`Promise.prototype`上的，它的作用是**为 Promise 实例添加状态改变时的回调函数**。前面说过，`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数。

**then方法也可以返回一个新的Promise实例，因此可以采用链式调用：**

```javascript
getJSON("/post/1.json").then(function(post) {
  return getJSON(post.commentURL);
}).then(function funcA(comments) {
  console.log("resolved: ", comments);
}, function funcB(err){
  console.log("rejected: ", err);
});
```

### 4、promise.prototype.catch

用于错误的捕获

```javascript
// bad
promise
  .then(function(data) {
    // success
  }, function(err) {
    // error
  });

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
```

上面代码中，第二种写法要好于第一种写法，理由是**第二种（catch）写法可以捕获前面`then`方法执行中的错误，**也更接近同步的写法（`try/catch`）。因此，建议总是使用`catch`方法，而不使用`then`方法的第二个参数。

### 5、promise.prototype.finally

**finally方法用于执行不管最后状态如何，都会执行的操作。**

```javascript
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

```javascript
Promise.prototype.finally = function(cb) {
    let p = this.constructor
    return this.then{
        value => p.resolve(cb()).then(()=>value)
        reason => p.resolve(cb()).then(()=>{throw reason})
    }
}
```





### 6、promise.all()

**该方法用于将多个Promise实例包装成一个新的Promise实例。**

```javascript
const p = Promise.all([p1, p2, p3])
```

Promise.all()接受一个数组，**数组的值都是Promise对象，如果不是则会调用Promise.resolve()方法**。（`Promise.all`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。）

`p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

（1）只有`p1`、`p2`、`p3`的状态**都变成`fulfilled`**，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

（2）只要`p1`、`p2`、`p3`之中有**一个被`rejected`**，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

**注意，如果作为参数的 Promise 实例，自己定义了`catch`方法，那么它一旦被`rejected`，并不会触发`Promise.all()`的`catch`方法。**

### 7、promise.race()

`Promise.race`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

```javascript
const p = Promise.race([p1, p2, p3])
```

上面代码中，**只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变**。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。和Promise一样，数组的值必须是promise对象，如果不是则会调用Promise.resolve()方法。

### 8、Promise.resolve()

**Promise.resolve()方法可以将现有的对象转换为Promise对象。**

```javascript
Promise.resolve('foo')
// 等同于
new Promise(function(resolve) {
    resolve('foo')
})
```

### 9、Promise.reject()

`Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

```javascript
let p = Promise.reject('foo')
// 等同于
new Promise((resolve, reject) => reject('foo'))
```



## 8、深拷贝

浅拷贝是复制对象的指针，拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存

因为**数组和对象都是引用值**，所以当我们直接使用=赋值，会是两个对象的指针指向同一个空间，当我们改变其中一个值的时候，另一个对象也会受到影响。当我们使用深拷贝重新开辟了一个内存空间，将该对象的指针指向新开辟的空间。

针对数组我们可以使用[...arr]

针对对象我们可以使用Object.assign({}, obj)、{...obj}

以上两种都是浅拷贝

也可以使用`JSON.parse(JOSN.stringify(obj))`

```javascript
function deepClone(obj) {
    let res
    if(typeof obj === "object") {
        res = obj.constructor === Array?[]:{}
        for(let i in obj) {
            res[i] = typeof obj[i] === "object"?deepClone(obj[i]):obj[i]
        }
    } else {
        res = obj
    }
    return res
}
```



## 9、JavaScript事件循环

https://juejin.im/post/5bac87b6f265da0a906f78d8

JavaScript将任务分为**同步任务和异步任务**，在**第一次执行的时候会将整个script代码看作宏任务**，**同步任务进入主线程，异步任务进入Event Table注册，当满足条件异步任务的回调函数加入到Event Queue队列中，当主线程空闲的时候，会从Event Queue取出对应的函数**。宏任务（script、setTimeout）和微任务（Promise、process.nextTick）分别进入不同的Event Table，它们的执行顺序不一样，**当主线程空闲的时候首先会清空微任务队列，然后再拿出一个宏任务队列的函数**，然后再检查微任务队列，如此循环。

## 10、作用域、作用域链、执行上下文、预编译

### 1、作用域

**作用域是在运行时代码中的特定变量的有效范围**。作用域决定了代码区块中变量和其他资源的可见性。作用域内层可以看见作用域外层，作用域外层不能看见作用域外层，所以作用域在不同作用域中声明的变量不会造成污染和命名冲突。

**JavaScript使用的是静态作用域，就是代码写在哪里作用域就在那里确定，而不是在运行的时候再确定作用域**

- 全局作用域

定义在最外层的函数和变量，未经声明就赋值的变量，window的属性。这里需要注意的是var声明的全局变量以及未经声明就赋值的变量会挂载到window属性上，但是var声明的变量不能删除，未经声明的变量可以删除。

- 函数作用域

当函数执行的时候就会在内部创建一个函数作用域，当函数执行完成就会销毁该作用域。

- 块级作用域

在ES6之前是没有块级作用域的，ES6引入了let、const关键字就可以创建块级作用域。

### 2、作用域链

当在一个函数内部搜索一个变量的时候，如果该函数没有声明该变量，那么就会顺着代码执行环境创建的作用域逐层向外搜索，一直搜索到全局作用域。

### 3、执行上下文

解释阶段：

- 词法分析
- 语法分析
- 作用域规则确定（）

执行阶段

- 创建执行上下文
- 执行函数代码
- 垃圾回收

**JavaScript在解释阶段便会确定作用域规则，但是执行上下文是在函数执行的前一刻。执行上下文最明显的就是this指向是在执行的时候确定的。**

区别：**执行上下文在运行时确定，随时可以改变；作用域在定义时就确定，并且不会改变。同一作用域下，不同的调用会产生不同的执行上下文，从而产生不同的结果。**

### 4、预编译

1. 创建AO对象
2. 寻找形参和变量声明
3. 形参实参相统一
4. 找函数声明，函数名作为属性名，函数体作为属性值

### 5、闭包

当函数可以记住并访问所在的词法作用域时，就产生了闭包，即使函数是在当前词法作用域外执行。**简单讲，闭包就是指有权访问另一个函数作用域中的变量的函数。**

#### 创建闭包：

1. 在函数内部引用外部函数

```javascript
let a = 1
function foo() {
  console.log(a)
}
function bar() {
  let a = 2
  foo()
}
bar() // 1
```

2. 在函数内部返回函数

```javascript
let a = 'window'
function foo() {
    let a = 'foo'
    return function() {
        console.log(a)
    }
}
let bar = foo()
bar() // foo
```

#### 闭包的应用和缺陷

1. 设计私有的方法和变量。
2. 模仿块级作用域
3. 实现模块化
4. 容易造成内存泄露。



## 11、DOM事件

### 1、DOM事件级别

1. DOM0：`dom.onclick = function(){}`
2. DOM2：`dom.addEventListenner('click',function(){})`
3. DOM3：`dom.addEventListenner('keyup',fuction(){})`，增加了事件类型

### 2、DOM事件模型

`dom.addEventListenner('keyup',fuction(){}, false|true)`，第三个参数为false表示在冒泡阶段触发，第三个参数为true表示在捕获阶段触发。先捕获后冒泡。

1. 捕获：父元素到子元素，`dom.addEventListenner('keyup',fuction(){}, true)`
2. 冒泡：子元素到父元素，`dom.addEventListenner('keyup',fuction(){}, false)`

事件委托就是基于事件冒泡的，当子元素触发点击事件会冒泡到父元素，然后通过e.target来判断子元素。

```javascript
document.addEventListener('click', function (e) {
    console.log(e.target);
    /**
    * 捕获阶段调用调用事件处理程序，eventPhase是 1; 
    * 处于目标，eventPhase是2 
    * 冒泡阶段调用事件处理程序，eventPhase是 1；
    */ 
    console.log(e.eventPhase);
    
});

```



### 3、DOM事件流

通过冒泡或者捕获怎么到达**目标对象的阶段**？

事件首先通过捕获到达目标元素，再通过目标元素冒泡到window对象，即**先捕获后冒泡**。

### 4、Event常见对象

- 阻止默认行为：e.preventDefault()
- 阻止冒泡：e.stopPropagation()
- 阻止其他绑定的事件的执行（事件响应优先级）：e.stopImmediatePropagation()
- e.target
- e.currentTarget

### 5、自定义事件

参考：https://www.jianshu.com/p/71bb3cf19095

```javascript
// 1.第一种
// 定义
let eve = new Event('coustome')
// 绑定
dom.addEventListenner('coustome', function(){})
// 触发
dom.dispatch(eve)

// 2.第二种，可以添加数据
let eve1 = new CustomoeEvent('coustome', {data})
```

## 12、new

1. 创建一个新对象
2. 将该对象的`__proto__`属性指向函数的`prototype`属性
3. 将this指向该对象
4. 如果该函数没有显示的返回对象则返回创建的对象

```javascript
function New(fn, ...arg) {
    let res = {}
    if(fn.prototype !== null) {
        res = Object.create(fn.prototype)
    }
    let ret = fn.apply(res, arg)
    if(ret === "object" || ret === "function" && ret !== null) {
        return ret
    }
    retrun res
}
```

## 13、JavaScript数据类型

- object：包括Function、Date、Array等
- number：数值，NaN和自身不相等，但是可以通过Object.is()来判断
- string：字符串
- boolean：布尔
- null：原型链的终点
- undefined：表示变量声明还没有被赋值
- symbol：ES6新增，表示独一无二的值

### 1、隐式类型转换

逻辑运算符(&&、 ||、 !)、运算符(+、-、*、/)、关系操作符(>、 <、 <= 、>=)、相等运算符(==)或者 if/while 的条件，可能会进行隐式类型转换。

### 2、强制类型转换

通过 Number()、parseInt()、parseFloat()、toString()、String()、Boolean(),进行强制类型转换。

> Number()

- 如果是数值则返回本身
- 如果是false、true转换为0、1
- undefined、null转换为NaN、0
- 如果是字符串：
  1. 空字符串：0
  2. 只包含数字(或者是 `0X` / `0x` 开头的十六进制数字字符串，允许包含正负号)，则将其转换为十进制
  3. 如果字符串中包含有效的浮点格式，将其转换为浮点数值
  4. 其他形式则返回NaN
- 如果Symbol则返回错误
- 如果是对象一次调用valueof()、toString()方法

> parseInt(params, radix)

1. 忽略字符串前面的空格，直至找到第一个非空字符，如果是空字符串，返回NaN
2. 如果第一个字符不是数字符号或者正负号，返回NaN
3. 如果第一个字符是数字/正负号，则继续解析直至字符串解析完毕或者遇到一个非数字符号为止
4. **如果第一个参数是Number，数字如果是0开头，则将其当作八进制来解析(如果是一个八进制数)；如果以0x开头，则将其当作十六进制来解析**
5. 如果第一个参数是 null 或者是 undefined，或者是一个对象类型：返回 NaN
6. 如果是数组则先将数组转化为基本类型的值，再按照上面的规则解析
7. 如果第一个参数是Symbol类型： 抛出错误
8. radix，表示以指定的基数进行解析，默认为10进制

> Boolean

**只有undefined、null、false、NaN、""、+0、-0会被转换为false，其他均为true**



> ==

1. 如果类型相同则无需进行转换
2. 如果一个操作值是undefined或者null，只有另一个为undefined或null时才返回true其他情况都返回false
3. 如果其中一个是Symbol类型则返回false
4. 两个操作值都为String或者Number则将字符串转换为Number
5. 如果一个操作值是 boolean，那么转换成 number
6. 如果一个操作值为 object 且另一方为 string、number 或者 symbol，是的话就会把 object 转为原始类型再进行判断(调用object的valueOf/toString方法进行转换)

> **对象如何转换成原始数据类型**

如果部署了 [Symbol.toPrimitive] 接口，那么调用此接口，若返回的不是基础数据类型，抛出错误。

如果没有部署 [Symbol.toPrimitive] 接口，那么先返回 valueOf() 的值，若返回的不是基础类型的值，再返回 toString() 的值，若返回的不是基础类型的值， 则抛出异常。

```javascript
//先调用 valueOf, 后调用 toString
let obj = {
    [Symbol.toPrimitive]() {
        return 200;
    },
    valueOf() {
        return 300;
    },
    toString() {
        return 'Hello';
    }
}
//如果 valueOf 返回的不是基本数据类型，则会调用 toString， 
//如果 toString 返回的也不是基本数据类型，会抛出错误
console.log(obj + 200); //400

```

### 3、包装类

语法：`let str = new String('hello world')`



当我们声明一个字符串变量的时候`let str1 = 'hello'`，这是**字面量**的形式，并且**是一个不可变的值**。我们**访问`str1.length`属性、或其他属性的时候**，就会把该变量**转换成为一个String对象（这里通常叫做包装类）**，因为声明的字符串没有该属性，只有转换为包装类才有。**在JavaScript中会把字符串字面量转化成String对象**。 

### 4、null、undefined比较

null在数值转换时被转换为0，undefined会被转换为NaN

- nudefined

undefined只有一个值，即undefined。以下情况会出现undefined：

1. 定义变量，但是没有初始化；
2. 调用某个函数时，实参个数小于形参个数时，未实参化的形参在函数调用过程中的值是undefined；
3. 访问对象没有的属性
4. 函数默认的返回值
5. 为初始化的变量执行typeof
6. 未声明的变量执行typeof

- null

null也只有一个值，但是当我们执行`typeof null`的时候，会返回object。我们可以理解为null是一个空指针对象，还没有保存对象。以下几种情况会使用出现null：

1. 手动设置为null，比如在释放变量的时候
2. 未获取到DOM节点
3. 原型链顶端
4. 在正则捕获的时候，如果没有捕获到结果，默认也是null

### 5、判断数据类型

- typeof

不能区别null、对象、数组、正则表达式等

- instanceof

是基于原型链操作的：A instanceof B，判断A的原型链上有没有B的原型

```javascript
function instanceOf(left, right) {
    let _proto = left.__proto__
    let _prototype = right.prototype
    while(1) {
        if(_proto === _prototype) {
            return true
        }
        if(_proto === null) {
            return false
        }
        _proto = _proto.__proto__
    }
}
```



- Object.prototype.toString.call()

比较好的方法，但是IE6/7/8中 Object.prototype.toString.apply(null)返回“[object Object]”。

- constructor

## 14、对象

### 1、语法

对象声明可以使用字面量形式和构造函数形式

```javascript
let obj = {}
let obj1 = new Object()
```

这两种方法生成的对象是一样的，区别在于字面量形式可以添加多个键值对、构造函数形式只能逐个添加。

### 2、内置对象

JavaScript还有一些对象子类型，通常被称为内置对象。

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error

###  3、内容

对象中的值通常不会存储在对象内部，**通常情况下，存储在对象容器内部的是这些属性的名称，它们就像指针一样，指向这些值的真正存储位置**。

#### 1、访问对象值的方法

```javascript
let obj = {
    a:1
}
obj.a
obj['a']
```

obj.a，的语法被称为**属性访问**，obj['a']的方法被称为**键访问**，它们在大都数情况下是可以互换的，区别在于.a要符合命名的规范性，['a']可以接受任意的UTF-8/Unicode字符作为属性名。比如"super-Fun!"，这时候就不可以使用属性访问了。

注意：**在对象中属性名永远都是字符串，如果不是者会被转换为字符串。**

#### 2、可计算的属性名

```javascript
let a = "foo"
let obj = {
  [a + '1']: 'hello',
  [a + '2']: 'hello2'
}
```

#### 

### 4、对象常见的方法

#### 1、属性描述符

1、查看属性描述符：Object.getOwnPropertyDescriptor(obj, props)

语法：

```javascript
let myObj = {
  a: 1
}
console.log(Object.getOwnPropertyDescriptor(myObj, 'a'))
```

- value，属性值
- writable，是否可修改
- configurable，是否可配置，如果为true则可以通过Object.defineProperty(obj, props)方法，来修改这些属性，**所以需要注意的是把configurable修改为false是一个单向操作无法撤销。除了无法修改，configurable还会禁止删除该属性。**
- enumerable，是否可枚举

2、设置属性描述符：Object.defineProperty(obj, props)

语法：

```javascript
Object.defineProperty(myObj, 'b', {
  value:2,
  writable: false,
  configurable: true,
  enumerable: true
})
```



**所以我们通过设置writable,configurable为false来设置一个对象常量。**



#### 2、不变性

1、通过设置writable,configurable为false来设置一个对象常量。

2、禁止拓展：Object.preventzectensions(obj)

语法：

```javascript
let myObj1 = {
  a: 1
}
Object.preventExtensions(myObj1)
myObj1.b = 2
myObj1.b // undefined
```

3、密封：Object.seal(obj)

实际上这个方法会调用Object.preventzectensions(obj)方法，并将现有属性的configurable设为false，所以密封之后**既不能添加新的属性，也不能删除和配置现有属性**。

4、冻结：Object.freeze(obj)

这个方法会调用Object.seal()方法，并将现有属性的writable设为false，故**既不能添加新的属性，也不能删除、配置、修改现有属性**。

#### 3、get、set

get、set会劫持你对对象数据的操作。

```javascript
let data = {}
Object.defineProperty(data, 'key', {
  // value: 1,
  enumerable: true,
  configurable: false, // 不能再定义
  get: function () {
    // Dep.target &&  dep.addDep(Dep.target)
    return this.value
  },
  set: function (newVal) {
    if (newVal === this.value) {
      return
    }
    console.log(`发生了变化${this.value}=>${newVal}`)
    this.value = newVal
    // dep.notify() // 通知所有订阅者
  }
})
```



####  4、存在性

1、in：检查对象及原型链

2、hasOwnProperty()

#### 5、其他常见方法

- Object.keys()，返回所有可枚举属性
- Object.values()，返回所有可枚举属性的值
- Object.entries()，返回所有可枚举属性的键和值
- Object.getOwnPropertyNames，返回所有属性，不管是否可枚举



## 15、数组

### 1、类数组

具有length属性，可以通过数字下标访问元素，如arguments、获取的DOM节点。Array.from(arguments)可以将一个类数组转化为数组

`...`运算符可以把具有`iterator`接口的对象转换为数组，`Array.from()`可以把具有`iterator`接口的对象和类数组转换为数组。

### 2、数组常见方法

- push\pop：在数组尾部添加删除元素
- unshift\shift：在数组头部添加删除元素
- concat：合并数组
- join：
- slice：切片数组，返回一个新的数组
- splice：删除、修改、增加数组元素
- sort：排序，sort((a,b)=>{return a - b})

### 3、去重

```javascript
// es6最简单的方式
[...new Set(arr)]

function unique(arr) {
    let list = [...arr]
    let res = []
    list.forEach(item => {
        if(!res.include(item)) {
            res.push(item)
        }
    })
    return res
}
```

## 16、for in & for of 区别

**`for in`主要用于遍历对象**，`for(key in object)`，其中key表示对象每个键值对的键，**for-in循环不仅可以取得对象自身的属性也可以取得原型上的属性**。

一个数据结构只要具有`Symbol.iterator`属性，则视为有iterator接口，就可以通过for-of遍历它们的成员，也就是说，**for…of循环内部调用的是数据结构的Symbol.iterator方法。 **

for…of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象（比如arguments对象、DOM NodeList 对象）、Generator 对象，以及字符串

```javascript
var arr = ['a', 'b', 'c', 'd'];

for (let a in arr) {
  console.log(a); // 0 1 2 3
}

for (let a of arr) {
  console.log(a); // a b c d
}

```

**for…in循环有几个缺点 **
　　①数组的键名是数字，但是for…in循环是以字符串作为键名“0”、“1”、“2”等等。 
　　②for…in循环不仅遍历数字键名，还会遍历手动添加的其他键，甚至包括原型链上的键。 
　　③某些情况下，for…in循环会以任意顺序遍历键名。 
　　for…in循环主要是为遍历对象而设计的，不适用于遍历数组。

**for…of循环 **
　　有着同for…in一样的简洁语法，但是没有for…in那些缺点。 
　　不同于forEach方法，它可以与break、continue和return配合使用。 
　　提供了遍历所有数据结构的统一操作接口