1. 技术面试

2. 负责人面试

3. HR面试



## 如何看待面试

面试是组织者**精心设计**的，**面对面**考察面试者**知识、能力、经验**，要在短时间内，将你的知识表达出来，让面试官更加的了解你。面试成功 != 知识。知识、能力、经验都要具备！！！

## 1、面试准备

面试不止会问技术问题；我们要进行职位描述分析，业务分析，分析所有面试公司的技术栈，准备自我介绍。

####  1、面试流程

面试的时候，我们需要引导面试官来问你问题，面试官一般会根据你的简历来问你问题。

1. 一面：基础知识，HTML、CSS、JavaScript基础。
2. 二面/三面：（一般是资深攻城狮来问你）在基础之上的衍生，根据你的简历然后深入问你简历上所擅长的知识。
3. 三面/四面：（一般是技术或者业务负责人来问你）特色的业务，在业务的所做的事情，
4. HR终面：HR具有一票否决权，主要看重的是你的沟通、性格、潜力。

#### 2、职位分析

分析公司的**业务描述**与及**职位要求**，从中找出其中的重点和**技术栈**，然后对比自己所学到的知识看这样的工作是否适合自己，自己是否喜欢，然后再准备自己的技术栈。

#### 3、业务分析实战模拟

对于前端，我们可以到自己所要面试公司的官网查看它们所用到的技术，分析并自己动手实现网站的某些功能

#### 4、自我陈述

面试是一个双发的过程，我们在面试的过程中要和面试官交流，如果面试官给你一个例子的实现方案一定要把你知道的方案都写出来，遇到简单的问题不应该表现出不屑，因为面试时由浅到深的，遇到困难的问题自己也不要着急，我们应该尽自己的能力给出问题的解决方案，然后可以适当的向面试官虚心请教。

## 2、一面/二面

主要考察基础知识

- 准备要充分
- 知识要系统
- 沟通要简洁
- 内心要诚实
- 态度要谦虚
- 回到要灵活

### 2.1、重点问题

### 2.1.1、页面布局

#### 1、三栏布局

exp：假设高度已知，请写出**三栏布局**，其中左右两栏宽度为`300px`，中间自适应

1. 浮动

```css
.left {
    float:left;
    width:300;
}
.cneter {
    
}
.right {
    float: right
    width:300px;
}
```

2. 绝对定位

```css
.left {
    position: absoulate;
    left:0;
    width:300px;
}
.center {
    position: absolute;
    left: 300px;
    right: 300px;
}
.left {
    position：absolute;
    right:0;
    width:300px;
}
```

3. flex布局

4. 表格布局

5. 网格布局

**衍生：**

- 每个方案的优缺点？比较？
- 如果高度未知，当中间的元素被撑篙之后，那种布局效果的两栏也能跟着被撑高？
- 兼容性？
- 两栏布局？
- 上下固定中间自适应？

最后需要注意的是，在书写的时候要注意HTML语义化，即不要全篇写`div`

### 2.1.2、CSS盒模型

exp：谈谈你对CSS盒模型的认识。

**标准盒模型，IE盒模型**，默认标准盒模型

 ##### 1、区别：IE 标准

- 标准：width = content

- IE：width = content+border+padding

##### 2、如何设置这两种盒模型：

- 标准：box-sizing: content-box
- IE：box-sizing: border-box

##### 3、JavaScript如何设置获取盒模型对应的宽高：

- `dom.style.width/height`，只能取内联样式的宽高
- `dom.currentStyle.width/heigth`，渲染的宽高，**只有IE支持**
- `window.getComputedStyle(dom).width/height`：与而相同，只支持**谷歌火狐**
- `dom.getBoundingClientRect().w/h`

##### 4、根据盒模型解决边距重叠问题：

这里就会引出BFC

##### 5、BFC(块级格式化上下文)：

- 使用场景

  1. 清浮动

     浮动元素产生了浮动流，所有产生了浮动流的元素，块级元素都看不见它们但是产生了BFC的元素和文本属性元素(inline)和文本都能看见它们

  1. 解决margin塌陷、合并

  什么是margin塌陷、合并？当子元素margin-top值小于父元素的margin-top值的时候，子元素的margin-top失效；兄弟元素相邻的margin值不会累加取最大值。

- 原理：

  1. BFC区域不会与浮动元素重合
  2. 在页面上是一个独立的容器
  3. 计算BFC高度时浮动元素也会参与计算

- 如何创建BFC？

  1、`overflow:hidden`

  2、float值不为none

  3、position值不为static和relative

  4、display为inline-block,table等


### 2.1.3、DOM事件

##### 1、DOM事件级别

- `DOM0：dom.onclick = function() {}`

- `DOM2：dom.addEventListenner('click', function() {}, false)`

- `DOM3：dom.addEventListenner('keyup', function() {}, false)`，DOM3增加了事件类型

##### 2、DOM事件模型（事件冒泡和捕获）

**如果`addEventListenner`第三个参数默认为false表示在冒泡阶段触发，true表示在捕获阶段触发**

捕获：父元素到子元素

冒泡：子元素到父元素

##### 3、DOM事件流

通过冒泡或者捕获怎么到达**目标对象的阶段**，

事件首先通过捕获到达目标元素，再通过目标元素上传到window对象

##### 4、DOM事件捕获的具体流程

捕获：window->document->html->body->然后按照元素的HTML结构->目标元素

##### 5、Event对象常见应用

- 阻止默认行为：e.preventDefault() 

- 阻止冒泡：e.stopPropagation()
- 阻止其他绑定的事件的执行（事件响应优先级）：e.stopImmediatePropagation()
- e.currentTarget()
- e.target()

##### 6、自定义事件

https://www.jianshu.com/p/71bb3cf19095

```javascript
// 第一种 Event
// 定义
let eve = new Event('coustome')
// 绑定
ev.addEventListenner('custome', function() {
    console.log(1111)
})
// 触发
ev.dispatchEvent(eve)

// 第二种 CustomeEvent，可以添加事件数据
let eve = new CustomeEvent('coustome'， {数据}) 
```

### 2.1.4 HTTP协议

 #### 1、HTTP协议的主要特点

简单快速、灵活、无连接、无状态

####  2、HTTP报文组成部分

HTTP报文分为**请求报文**和**响应报文**，请求报文由**请求行、请求头、空行、请求体**四个部分组成；响应报文由**状态行、响应头、空行、响应体**四个部分组成。

#### 3、HTTP方法

POST , GET ,  HEAD , PUT , DELETE , OPTION

#### 4、POST和GET区别

1. get在浏览器回退使无害的，而post会再次提交i请求
2. GET会被浏览器主动缓存，而POST不会，除非手动设置
3. GET请求参数会被完整的保存在浏览器记录中，而POST请求参数不会被保存
4. GET请求在URL中传送给的参数长度是有限制的，而POST没有限制
5. GET通过URL传参，而POST通过Request的body传参

####  5、HTTP状态码

- 1XX：提示信息，表示请求已经接收，继续处理
- 2XX：成功，表示消息已被接收

- 3XX：重定向

- 4XX：客户端错误，请求语法错误、或者请求无法实现

- 5XX：服务端错误

#### 6、什么是持久化连接

HTTP/1.1版本才开始支持

HTTP采用**请求应答模式**，当使用普通模式，即非Keep-Alive模式时，**每个请求-应答客户端和服务端都要建立一个新的连接，完成之后就断开连接（HTTP协议为无连接的协议）**。

当使用**Keep-Alive模式**（又称持久连接、连接重用）时，Keep-Alive功能使**客户端到服务端的连接持续有效**，当出现对服务器的后续请求时，Keep-Alive功能避免了重新建立连接的功能。

#### 7、什么是管线化

HTTP/1.1才开始支持管线化，管线化是建立在持久化链接的的基础之上

使用持久化连接：

请求1->响应1->请求2->响应2 

使用管线化：

请求1->请求2->响应1->响应2

### 2.1.5、原型、原型链

#### 1、创建对象的四种方法：

- let p1 = {a:1}
- let p2 = new Object({a:1})
- let p3 = new F() // F 是一个构造函数
- let p4 = Object.create({})

原型链是描述**实例对象**，**构造函数**，**原型**（prototype）之间的关系的一种链式结构，当在一个对象中查找一个属性或者方法的时候，如果在对象本身没有找到还属性或者方法，就会**顺着原型链一直向上查找**，直到null如果还有找到就会抛出错误。这一个典型的**职责链模式**。

当使用**对象字面量**的方法和**`new Object()`**创建一个对象的时候，该对象的`__proto__`属性指向`Object.prototype`，但是在大多数情况下不推荐使用`new Object()`来创建对象。

当使用**构造函数**的形式来创建一个实例对象的时候，实例对象的`__proto__`属性指向构造函数的`prototype`。

当使用**`Object.create({a:1})`**来创建一个对象的时候，对象的`__proto__`属性指向`{a:1}`。

```javascript
function F(name) {
    this.name = name
}
let o = new F('hello')

o.__proto__ === F.prototype
F.prototype.__proto__ === Object.prototype
Object.prototype.__proto__ === null

F.__proto__ === Function.prototype
Function.prototype.__proto__ === Object.prototype

```

####  2、new操作符：

1. 首先创建一个空对象
2. 使空对象的`__proto__`等于该函数的`prototype`
3. 将this指向创建的空对象
4. 如果函数没有显示的返回对象，则返回开始创建的对象，否则返回函数的返回值

```javascript
function New(func) {
    let res = {}
    if(func.prototype !== null) {
        res = Object.create(func)
    }
    let ret = fun.apply(res, [].slice.call(arguments, 1))
    if(typeof ret === "object" || typeof ret === "function" && typeof ret !== null) {
        return ret
    }
    return res
}

```





#### 3、instanceof

`A instanceof B`，查看A的原型链上有没有B的原型

```javascript
function instanceOf(left, right) {
    let proto = left.__porto__
    let prototype = right.protype
    while(1) {
        if(proto === null) return false 
        if(proto === prototype) return true
        proto = proto.__proto__
    }
}
```



### 2.1.6、面向对象

#### 1、类的声明

在这里需要注意的是，在JavaScript中并**没有类**的概念，我们的写法只是为了去模仿类，在JavaScript中类的实现是基于**原型链、原型委托**实现面向对象的。

- ES5
- ES6

#### 2、类与实例

#### 3、类与继承、实现继承

1. 构造函数使用call、apply

不能继承原型链上的方法和属性

```javascript
function P1() {
    this.name = "p1"
}
P1.prototype.say = function() {
    console.log('say')
}
function C1() {
    P1.call(this) // 关键
    this.age = 1
}

```

这是最简单的一种方式，但是这种方式存在一种明显的缺陷，即只能继承构造函数内的属性，不能继承原型链上的属性和方法。

2. 原型链

```javascript
function P2() {
  this.name = 'p2'
  this.arr = [1,2,3]
}
P2.prototype.say = function() {
    console.log('say')
}
function C2() {
    this.age = 2
}
C2.prototype = new P2()
let s1 = new C2()
let s2 = new C2()
```



这是通过原型链的方式实现继承，我们通过将子类(`C2`)的`prototype`属性挂载到父类(`P2`)的实例对象(`new P2()`)上，当访问访问子类实例没有的方法的时候，会访问子类的`prototype`属性，如果子类的prototype上也没有该方法，则会访问prototype的`__proto__`属性。形成的继承关系：

`s1.prototype === new P2()`

`new P2().__proto__ === P2.prototype`

这种方式的实现较第一种有明显的改进，但是也存在一些问题：由于所有实例共用`prototype`属性，当我们通过某个实例修改了原型链上的某个属性值的时候，其他的实例也会受到影响。这是违背面向对象的。

3. 组合方式

组合方式是将第一种方式和第二种方式结合起来，

```javascript
function P3() {
    this.name = "p3"
    this.arr = [1,2,3]
}
P3.prototype.say = function() {
    console.log('say')
}
function C3() {
    P3.call(this)
    this.age = 3
}
C3.prototype = P3.prototype
```

我们把父类的中的属性通过call写到子类中，然后通过子类实例化的每个实例对象中都会有这个属性值，当改变其中一个实例中的属性的时候，其他的实例对象不会受到影响；然后将子类的prototype属性挂载到父类的prototype属性上，就可以访问父类原型上的方法。但是这种方法也存在一些问题，当我们访问`C3.prototype`的constructor属性的时候会发现是`P3`，这可能会引起一些误解。这是因为我们直接使`C3.prototype = P3.prototype`，当我们访问`C3.prototype`的时候其实是访问的是，`P3.prototype`。这里我们很容易想到重写`C3.prototype`的`constructor`属性。但是我们必须引入一个中间的变量来表示`C3.prototype`然后将中间变量的`__proto__`指向父类。如果不引入中间变量当我们修改的`C3.prototype`的`constructor`，因为`C3.prototype、P3.prototype`指向同一个引用，`P3.prototype`的`constructor`属性也会被修改。

4. 组合方式优化

```javascript
function P4() {
    this.name = "p4"
    this.arr = [1,2,3]
}
P4.prototype.say = function() {
    console.log('say')
}
function C4() {
    P4.call(this)
    this.age = 4
}
C4.prototype = Obiect.create(P4.prototype)
C4.prototype.constructor = C4
```

这是组合方式的优化方式，通过`C4.prototype = Obiect.create(P4.prototype)`这段代码，将`C4.prototype`的`__proto__`属性指向`P4.prototype`，当我们修改了`C4.prototype`上的`constructor`属性·的时候，`P4.prototype`的`constructor`属性并不会受到影响。

#### 4、圣杯模式

圣杯模式，yahoo 贡献的高端写法：YUI3库有个inherit，现在不用了，了解一下：

```javascript
let inherit = (function() {
    let F = function(){}
    return function(Target, Oringin) {
        F.prototype = Oringin.prototype
        Target.prototype = new F()
        Target.prototype.constructor = Target
        Target.prototype.uber = Oringin.prototype
    }
})()
```

这个方法只能继承父类的原型上的方法，不能继承构造函数内部的方法。



###  2.1.7、通信类

#### 1、同源策略

协议、域名、端口

同源策略限制从**一个源加载的文档或脚本**如何与来自**另一个源的资源**进行交互。这是一个用于隔离建在恶意文件的关键的安全机制。

- Cookie、Local Storage和Index DB无法获取
- DOM无法获得
- Ajax不能发送

#### 2、前后端如何通信？

- Ajax
- WebSocket
- CORS

####  3、如何创建Ajax？

- XMLHttpRequest对象的工作流程
- 兼容性处理
- 事件触发条件
- 事件触发的顺序

```javascript
 
```

#### 4、 跨域通信的几种方式

[参考文章](https://juejin.im/post/5c23993de51d457b8c1f4ee1)

- JSONP
- Hash(利用iframe)
- postMessage（HTML5新特性）
- WebSocket（不受同源策略）
- CORS（fetch）
- Nginx反向代理



### 2.1.8、安全类

#### 1、CSRF（跨站请求伪造、Cross-site request forgery）

- 基本概念

- 攻击原理

用户登录A网站，A网站向浏览器发放cookie，然后当用户访问B网站的时候，B网站会引诱用户点击链接，该链接会访问A网站的接口，当用户点击该链接的时候会携带A网站的cookie，从而造成CSRF攻击.

- 防御措施

1. token验证
2. Referer验证
3. 隐藏令牌

#### 2、XSS（跨域脚本攻击、cross-site scripting）

- 基本概念
- 攻击原理

通过评论入口等，**插入script标签**在script标签中写入攻击代码

http://www.imooc.com/learn/812

- 防御措施

http://www.imooc.com/learn/812



### 2.1.9、算法类

#### 1、排序

- 冒泡排序：

- 快速排序：https://segmentfault.com/a/1190000009426421
- 选择排序：https://segmentfault.com/a/1190000009366805
- 希尔排序：https://segmentfault.com/a/1190000009461832

#### 2、堆栈、队列、链表

- 堆栈：https://jejin.im/entry/58759e79128fe1006b48cdfd
- 队列：https://jejin.im/entry/58759e79128fe1006b48cdfd
- 链表：https://jejin.im/entry/58759e79128fe1006b48cdfd

#### 3、递归

https://segmentfault.com/a/1190000009857470

#### 4、波兰式和逆波兰式

- 理论：http://www.cnblogs.com/chenying99/p/3675876.html
- 源码：https://github.comTairraos/rpnsblobmasterrn

### 总结

首先要有基本功，认真审题，如有不会可以虚心i请教面试官；能写多少写多少，可以写伪代码；如果你真的不会你要把你的知识面展示出来。



## 3、二面\三面

面试技巧

- 知识面要广
- 理解要深刻
- 内心要诚实
- 态度要谦虚
- 回答要灵活
- 要学会赞美

## 3.1、重点问题

### 3.1.1、浏览器渲染机制

##### 1、什么是DOCTYPE及其作用

DTD（document type definition，文档类型定义）是一系列的语法规则，用来定义XML或(X)HTML的文件类型。浏览器会使用它们来判断文档类，决定使用何种协议来解析，以及切换浏览器模式。

DOCTYPE是用来声明文档类型和DTD规范的，一个主要的用途便是文件的合法性验证，如果代码不合法，那么浏览器解析时便会出现一些差错。

##### 2、浏览器渲染过程

- 浏览器采用**流式布局模型**
- 浏览器会把**HTML解析成DOM**，把**CSS解析成CSSOM**，DOM和CSSOM合并成为了**渲染树（RenderTree）**
- 有了渲染树就知道了所有节点的样式，然后通过**布局（Layout）**计算他们在页面上的**位置**和**大小**，最后把节点绘制到页面上。
- 由于浏览器采用的是流式布局，对于渲染树通常只需遍历一次就可以完成，但是**Table**和它内部的元素会花费更多的时间，这就是减少使用Table的原因

##### 3、重绘（Repaint）、回流（重排、Reflow）

- 重绘

由于**几何属性**发生改变或者由于**样式发生**改变而**不会影响布局**的，称为**重绘**，例如：outline、visibility、color、background-color等，重绘的代价是高昂的，因为浏览器必须**验证DOM树上其他节点元素的可见性**。

- 回流

回流是**布局**或者**几何属性需要改变**就称为**回流**，回流是影响浏览器性能的关键，因为其变化涉及部分页面（或整个页面）的布局更新。一个元素的回流可能会**导致其所有子元素**以及DOM中**紧随其后的节点、祖先元素**的随后的回流。

**回流一定重绘，重绘不一定回流**

##### 4、布局（Layout）

在生成Render Tree后计算各个元素的宽高、位置

##### 5、优化浏览器性能

现代浏览器大多数都通过队列机制来批量更新布局，浏览器会把修改操作放在队列之中，至少一个浏览器刷新（16.6ms）才会清空队列，但是当你获取布局信息的时候，队列中可能会有影响到这些属性或方法返回值的操作，即使没有，浏览器也会强制情空队列，触发回流和重绘来确保返回正确的值。

避免重绘与回流

1. CSS

- 使用transform代替top
- 使用visibility代替display:none，前者只会引起重绘后者会引发回流。
- 避免使用table布局
- 尽量在DOM树末端改变class
- 避免多层内联样式
- 将动画效果应用在position属性为absolute或fixed元素上
- 避免使用CSS表达式
- 将频繁重绘或回流的节点设置为图层，图层能够阻止该节点的渲染行为影响别的节点，如`will-change`、`video`、`iframe`
- CSS3硬件加速

2. JavaScript

- 避免频繁操作样式，最好更改class属性
- 避免频繁操作DOM
- 避免频繁读取会引发重绘/回流的属性
- 对具有复杂动画的元素使用绝对定位

### 3.1.2、JS运行机制

https://juejin.im/post/5c3d8956e51d4511dc72c200

https://juejin.im/post/5a6547d0f265da3e283a1df7

setTimeout()的最小时间为4ms

同步任务 异步任务 挂起



##### 1、JS单线程

JavaScript作为一门脚本语言决定了它只能是单线程的，在同一时刻JavaScript只能做一件事，因为如果在同一时刻内，按钮被点击了多次，

##### 2、任务队列

任务队列中保存了异步任务的回调函数，当浏览器遇到异步任务的时候会把该任务在事件表中注册，然后当满足条件之后把该异步任务的回调函数加入到任务队列

##### 3、事件循环

JavaScript分为宏任务和微任务

在事件循环的时候首先会执行所有的微任务队列，再执行宏任务队列

### 3.1.3、页面性能

#### 1、提升页面性能的方法

##### 1、资源压缩合并，减少HTTP请求

##### 2、非核心代码异步加载

- 异步加载方式

1. 动态脚本加载（创建节点）
2. defer

3. async

- 异步加载区别

defer是在HTML解析完成之后才会执行，如果是多个，按照加载的顺序依次执行

async是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关。

##### 3、浏览器缓存

https://juejin.im/post/5c32ac69f265da6150649ec2#heading-0

###### 1、缓存位置

- Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来是实现缓存

- Memory Cache

内存中的缓存，一旦关闭页面内存中的缓存也就消失了，但是内存的空间往往比较小，我们不能把太多的缓存加入内存中

- Disk Cache

存储在磁盘中的缓存，根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求，绝大部分的缓存都来自 Disk Cache。

- Push Cache

推送缓存，HTTP/2中的内容，当以上三种缓存都没有命中时，它才会被使用。**它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂**，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。

###### 2、缓存分类：强缓存、协商缓存

- 强缓存

强缓存不会向服务器发送请求直接从缓存中获取数据，强制缓存通过两种HTTP Header实现：Expires，Cache-Control。Cache-Control的优先级高于Expires。

- 协商缓存

协商缓存就是再强制缓存失效之后，浏览器携带缓存标识向服务器发送请求，由服务器根据缓存标识决定是否使用缓存的过程。协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag 。

Last-Modified  If-Modified-Since

Etag    If-None-Match



##### 4、使用CDN

##### 5、预解析DNS

```html
<meta http-equiv="x-dns-prefetch-control" content="on"> // 强制打开a标签的预解析
<link rel="dns-prefetch" href="//host_name_to_prefetch.com">
```

大多数浏览器的a标签都开起了DNS预解析，但是当使用HTTPS会默认关闭

### 3.1.4、错误监控

####  1、错误捕获的方式

- 即时运行错误的捕获方式

try...catch  、window.onerror

- 资源加载错误

object.onerror(object代表类型如图片)、performance.getEntries()、Error事件捕获

#### 2、跨域JavaScript运行错误捕获

- 再script标签添加crossoringn属性
- 设置JavaScript资源响应头Access-Control-Allow-Origin

#### 3、错误提交

- Ajax
- 通过设置图片src属性

## 4、三面\四面

**主要讲项目**

- 准备要充分
- 描述要演练
- 引导找时机
- 有事要发挥
- 回答要灵活

#### 1、业务能力

#### 2、团队协作能力

#### 3、事物推动能力

#### 4、带人能力

#### 5、其他能力

## 5、终面

在和HR面试的过程中要**主动**

- 乐观积极
- 主动沟通
- 逻辑顺畅
- 上进有责任心
- 有主张、做事果断

#### 1、职业竞争力

为什么要录取你？

1. 业务能力
2. 思考能力
3. 学习能力
4. 无上限的付出

#### 2、职业规划

未来计划、目标？

1. 目标是什么？

业务上成为专家、技术上成为大牛

2. 近阶段的目标？

不断学习各方面的经验

3. 长期目标？

做几件很有价值的事，比如开源作品

4. 方式方法？

先完成业务上的事情，做到极致

#### 3、学会赞美





