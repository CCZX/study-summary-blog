## 1、跨域的常见方式

浏览器具有同源策略，只有当协议、域名、端口都相同的时候才能称之为同源，其中有个就是跨域。

同源策略的作用限制了一个源与另一个源的资源交互，这是一个用于隔离恶意文件的安全机制，其实在跨域交互的时候，服务器已经接收到了客户端发出的请求，只是浏览器把响应拦截了。

但是有的时候我们需要进行跨域通信，特别是在前后端分离需要请求接口的时候。

- cookie无法获取
- DOM无法获取
- 不能发送Ajax

### 1.1、JSONP

这是**利用`script`标签没有同源限制的方法**。JSONP通过插入script标签来实现跨域，但是参数只能通过url传入，并且**只支持get请求**。

**实现步骤：**

1. 创建callback函数
2. 创建script标签，传入要请求的url地址和callback
3. 服务器接收到前端传递的方法，然后调用该方法并传入数据
4. 前端执行服务端返回的方法调用

简单：

```javascript
// front
function jsonp(url) {
    let script = docment.createElement('script')
    script.setAttribute('src', url)
    document.body.appendChild(script)
}
function display(data) {
    console.log(data)
}
div.onclick = function() {
    jsonp('localhost:8080/getdata?callback=display')
}

// end
let express = require('express')
let app = express()
app.get('/getdata', (req, res) => {
    let {callback} = req.query
    res.send(`${callback}('hello')`)
})
```

复杂：

```javascript
//前端代码
function jsonp({url, params, cb}) {
    return new Promise((resolve, reject) => {
        //创建script标签
        let script = document.createElement('script');
        //将回调函数挂在 window 上
        window[cb] = function(data) {
            resolve(data);
            //代码执行后，删除插入的script标签
            document.body.removeChild(script);
        }
        //回调函数加在请求地址上
        params = {...params, cb} //wb=b&cb=show
        let arrs = [];
        for(let key in params) {
            arrs.push(`${key}=${params[key]}`);
        }
        script.src = `${url}?${arrs.join('&')}`;
        document.body.appendChild(script);
    });
}
//使用
function sayHi(data) {
    console.log(data);
}
jsonp({
    url: 'http://localhost:3000/say',
    params: {
        //code
    },
    cb: 'sayHi'
}).then(data => {
    console.log(data);
});


//express启动一个后台服务
let express = require('express');
let app = express();

app.get('/say', (req, res) => {
    let {cb} = req.query; //获取传来的callback函数名，cb是key
    res.send(`${cb}('Hello!')`);
});
app.listen(3000);

```

### 1.2、CORS

jsonp 只能支持 get 请求，cors 可以支持多种请求。cors 并不需要前端做什么工作。浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。

服务端设置了Access-Control-Allow-Origin就可以开启CORS，该属性表示那些域名可以进行资源访问，如果设置通配符则表示所有网站都可以。

虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求**和**复杂请求**。

#### 1、简单请求

只要同时满足以下两大条件，就属于简单请求：

1. 使用下列方法：GET、HEAD、POST
2. Content-Type 的值仅限于下列三者之一：text/plain、multipart/form-data、application/x-www-form-urlencoded

#### 2、复杂请求

不是简单请求那就是复杂请求，**不是简单请求在进行CORS通信之前，会发送OPTION预检测请求，通过该请求来知道浏览器是否允许跨域**。所以非简单请求会发送两次通信。

我们用`PUT`向后台请求时，属于复杂请求，后台需做如下配置

```javascript
// 允许哪个方法访问我
res.setHeader('Access-Control-Allow-Methods', 'PUT')
// 预检的存活时间
res.setHeader('Access-Control-Max-Age', 6)
// OPTIONS请求不做任何处理
if (req.method === 'OPTIONS') {
  res.end() 
}
// 定义后台返回的内容
app.put('/getData', function(req, res) {
  console.log(req.headers)
  res.end('我不爱你')
})

```

### 1.3、nginx

使用nginx反向代理实现跨域，当A网站向B网站请求数据时，nginx代理服务器来接受这个请求，然后代替A网站来向B网站发送请求，nginx拿到资源后再发送给A网站。

例如nginx的端口号为 8090，需要请求的服务器端口号为 3000。（localhost:8090 请求 localhost:3000/say）

```nginx
server {
    listen       8090;

    server_name  localhost;

    location / {
        root   /Users/liuyan35/Test/Study/CORS/1-jsonp;
        index  index.html index.htm;
    }
    location /say {
        rewrite  ^/say/(.*)$ /$1 break;
        proxy_pass   http://localhost:3000;
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Credentials' 'true';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    }
    # others
}

```



### 1.4、websocket

WebSocket是HTML的一个**持久化协议，实现了浏览器与服务器的全双工通信，同时也解决了跨域的问题**。

Websocket 不受同源策略影响，只要服务器端支持，无需任何配置就支持跨域。

```javascript
// 前端
let socket = new WebSocket('ws://localhost:3000'); //协议是ws
socket.onopen = function() {
    socket.send('Hi,你好');
}
socket.onmessage = function(e) {
    console.log(e.data)
}

// 后端
let WebSocket = require('ws');
let wss = new WebSocket.Server({port: 3000});
wss.on('connection', function(ws) {
    ws.on('message', function(data) {
        console.log(data); //接受到页面发来的消息'Hi,你好'
        ws.send('Hi'); //向页面发送消息
    });
});

```

### 1.5、postMessage

postMessage 通过用作前端页面之前的跨域，如父页面与iframe页面的跨域。window.postMessage方法，允许跨窗口通信，不论这两个窗口是否同源。

### 1.6、node中间件

node中间件的方式与nginx的方式大致相同，由于同源策略是作用在浏览器的，服务端并不受同源策略的影响。

1. 接收浏览器请求
2. 将请求转交给服务器
3. 拿到服务器响应的数据
4. 将数据转交给浏览器

## 2、JS异步加载的方式

1. defer：有defer属性的script标签会异步加载，不会等待该js脚本下载完成而是继续执行后面的代码·
2. async：有async属性的script标签一旦下载完成就会终止渲染，执行完该脚本之后再继续渲染

**defer是渲染完再执行，async是下载完就执行**；如果有多个defer脚本会按照它们在页面中出现的顺序，而多个async脚本不能保证加载的顺序

3. 动态添加js脚本

```javascript
function downloadJS() { 
    varelement = document.createElement("script"); 
    element.src = "XXX.js"; 
    document.body.appendChild(element); 
}
//何时的时候，调用上述方法 

```

## 3、下面代码a在什么情况中打印出1？

```javascript
//?
if(a == 1 && a == 2 && a == 3) {
    console.log(1);
}

```

1.在进行类型转换转化为原始值的时候，会依次调用`[Symbol.toPrimitive]`，`valueOf`，`toString`方法，直到有一个方法返回原始值，所以将该方法部署在`[Symbol.toPrimitive]，valueO`f接口之上也可以。

```javascript
let a = {
toString: (function () {
    let i = 1
    return function () {
      console.log(i)
      return i++
    }
  })()
}
// 或者
let a = {
[Symbol.toPrimitive]: (function () {
    let i = 1
    return function () {
      console.log(i)
      return i++
    }
  })()
}
```

2.利用`Object.defineProperty`在全局上定义a，获取a时调用get方法

```javascript
let val = 1
Object.defineProperty(window, 'a', {
  get() {
    return val++
  }
})
```

3.数组

```javascript
var a = [1,2,3];
a.join = a.shift;
```

这里需要注意的是数组的`toString()`方法实际调用的是`join()`方法。

数组的 `toString` 方法返回一个字符串，该字符串由数组中的每个元素的 toString() 返回值经调用 join() 方法连接（由逗号隔开）组成。

所以我们吧数组的join()，方法变为shift返回并删除第一个元素

## 4、经典面试

```javascript
function Foo() {
    getName = function() {console.log(1)};
    return this;
}
Foo.getName = function() {console.log(2)};
Foo.prototype.getName = function() {console.log(3)};
var getName = function() {console.log(4)};
function getName() {console.log(5)};

Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2 ，这里 new Foo.getName,new无参数列表优先级18，.的优先级为19
new Foo().getName(); // 3 ，这里new有参数列表优先级是19，故从左到右
new new Foo().getName(); // 3

```

## 5、实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?

1. `Object.defineProperty`劫持的是对象的**某个属性**，劫持属性的`getter`和`setter`方法，在对象属性发生变化时进行特定的操作，而`Proxy`劫持的是**整个对象**。
2. `Proxy`会**返回一个新的代理对象**，我们只需要操作新的对象即可，而`Object.definePropery`只能遍历对象的属性进行修改
3. `Object.definePropery`不支持数组的各种`API`，而`Proxy`支持数组的各种`API`
4. `Object.definePropery`的兼容性要好于`Proxy`

PS: **`Vue2.x` 使用 `Object.defineProperty` 实现数据双向绑定，`V3.0` 则使用了 `Proxy`。`Object.defineProperty` 定义出来的属性，默认是不可枚举，不可更改，不可配置【无法delete】**

```javascript
let obj = {}
let name = "cc"
Object.definePropery(obj, a, {
    get() {
        return name
    },
    set(val) {
        name = val
    }
})
```

`Proxy`会劫持整个对象，当读取对象的属性或者修改对象的属性就会被劫持。但是需要注意的是对于复杂类型的数据，监控的是引用地址而不是值，只要引用地址没有发生变化就不会触发`set`。

```javascript
let obj = {
  name: 'Yvette',
  hobbits: ['travel', 'reading'],
  info: {
    age: 20,
    job: 'engineer'
  }
};
let p = new Proxy(obj, {
  get(target, key) {
    console.log(`read is success`)
    return Reflect.get(target, key)
  },
  set(target, key, val) {
    if (key === 'length') { // 数组长度变化
      return true
    }
    console.log(`set is success`)
    return Reflect.set([target, key, val])
  }
})
p.name = 20; //设置成功
p.age = 20; //设置成功; 不需要事先定义此属性
p.hobbits.push('photography'); //读取成功;注意不会触发设置成功
p.info.age = 18; //读取成功;不会触发设置成功
// https://juejin.im/post/5cbd1e33e51d45789161d053

```

## 6、Object.is()和===

Object.is() 类似于 ===，但是有一些细微差别，如下：

1. NaN 和 NaN 相等
2. -0 和 +0 不相等

## 7、可遍历（for-of）数据结构的有什么特点？

**一个数据结构如果要具备可被for-of循环调用的iterator接口，就必须在其Symbol.iterator的属性上部署遍历器生成的方法。**

遍历器对象根本特征就是具有**next方法**。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

```javascript
//如为对象添加Iterator 接口;
let obj = {
    name: "Yvette",
    age: 18,
    job: 'engineer',
    [Symbol.iterator]() {
        const self = this;
        const keys = Object.keys(self);
        let index = 0;
        return {
            next() {
                if (index < keys.length) {
                    return {
                        value: self[keys[index++]],
                        done: false
                    };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
};

for(let item of obj) {
    console.log(item); //Yvette  18  engineer
}

```

### 原生具有Iterator接口的数据

- Array
- Map
- String
- Set
- arguments
- NodeList对象
- ES6 的数组、对象、Set、Map 都部署了以下三个方法: entries() / keys() / values()，调用后都返回遍历器对象。

## 8、requestAnimationFrame 和 setTimeout/setInterval 

在`requestAnimationFrame`之前主要使用`setInterval`来写动画。

现在大部分电脑的显示屏的刷新频率时`60HZ`即每秒钟重绘60次，所以如果超出了这个频率动画效果也不会得到改善。因此最佳事件间隔是`1000ms/60`，即大概**`16.7ms`**。

** `setTimeout/setInterval` 问题在于时间不精确**，因为 `setTimeout/setInterval`是异步任务，在时间到达时只会把回调函数添加到任务队列，只有当主线程的同步任务执行完之后才会执行。

**`requestAnimatonFrame`采用的是系统时间**，保持最佳绘制效率，不会因为间隔时间过短，造成过度绘制，增加开销；也不会因为间隔时间太长，使用动画卡顿不流畅，让各种网页动画效果能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果。

1. `requestAnimationFrame`**不需要设定时间，采用的是系统时间**
2. `requestAnimationFrame`会**把每一帧的DOM操作集中起来，在一次重绘或回流中完成**
3. 当 `requestAnimationFrame()` 运行在后台标签页或者隐藏的 `<iframe>` 里时，`requestAnimationFrame() `会被暂停调用以提升性能和电池寿命（大多数浏览器中）。



## 9、前端模块化

- 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件), 并进行组合在一起
- 块的内部数据与实现是私有的, 只是向外部暴露一些接口(方法)与外部其它模块通信

### 1、函数

- 将不同的功能封装成为不同的全局函数
- 污染全局命名空间，而却模块成员之间看不出联系

### 2、命名空间

- 减少了全局变量
- 数据不安全，外部可以修改内部的数据

### 3、立即执行函数

- 立即执行函数通过配合闭包，来实现数据的私有化
- 将数据和行为封装在一个函数内部，然后通过给window添加属性来向外暴露接口

```javascript
// index.html文件
<script type="text/javascript" src="module.js"></script>
<script type="text/javascript">
    myModule.foo()
    myModule.bar()
    console.log(myModule.data) //undefined 不能访问模块内部数据
    myModule.data = 'xxxx' //不是修改的模块内部的data
    myModule.foo() //没有改变
</script>

```

```javascript
// module.js文件
(function(window) {
  let data = 'www.baidu.com'
  //操作数据的函数
  function foo() {
    //用于暴露有函数
    console.log(`foo() ${data}`)
  }
  function bar() {
    //用于暴露有函数
    console.log(`bar() ${data}`)
    otherFun() //内部调用
  }
  function otherFun() {
    //内部私有的函数
    console.log('otherFun()')
  }
  //暴露行为
  window.myModule = { foo, bar } //ES6写法
})(window)

```

### 4、CommonJS

CommonJS 是一个旨在 Web 浏览器之外，为 JavaScript 建立模块生态系统的约定的项目。 

**在NodeJS中每个文件都会被看作一个单独的模块系统，在一个NodeJS模块中	本地的变量是私有的，而这个私有方式的实现也是将NodeJS模块封装在一个单独的函数之中**。

#### 1、require

require相当于把引用的模块的**拷贝**了一份到当前模块，所以如果被引用的模块的变量发生变化不会影响到当前模块。

```javascript
// 1.js
let a = 1
settimout(() => {
    a = 2
}, 1000)
exports.a

// 2.js
let {a} = require('./1.js')
console.log(a) // 1
settimout(() => {
    console.log(a) // 1
}, 1000)
```



#### 2、exports、module.exports

**模块变量的最后导出都是通过module.exports导出的**，exports只是module.exports的一个引用。所以我们在导出变量的时候不能给exports重新赋值。

```javascript
exports.a = 1
// 相当于
module.exports = {
    a: 1
}
```

如果我们重新给exports就切断了它与module.exports之间的联系

```javascript
exports = {
    a: 1
}
// 相当于
let obj = {a: 1}
exports = obj
```

所以这样module.exports并没有导出任何值



但是CommonJS依赖了Node JS的环境变量：module、exports、require、global，所以无法在浏览器使用。所以未来解决这个问题出现了Browserify，但是Browserify在浏览器使用也存在一些问题，因为require的实现是一个复制的过程，在还没有完成完成复制的时候（由于服务器端的资源都存在于本地的，并且有缓存所以不会出现这种问题）可能会造成阻塞。

### 5、RequireJS & AMD（Asynchronous Module Definition）

为了解决浏览器端加载阻塞的问题，所以引入了异步的模块管理方式

优点：

1. 以函数的形式返回模块的值
2. 代码动态加载

缺点：

1. 在声明一个模块之前就必须指定所有依赖的模块

### 6、Sea JS & CMD（Common Module Definition）

```javascript
// AMD 的一个例子，当然这是一种极端的情况
define(["header", "main", "footer"], function(header, main, footer) { 
    if (xxx) {
      header.setHeader('new-title')
    }
    if (xxx) {
      main.setMain('new-content')
    }
    if (xxx) {
      footer.setFooter('new-footer')
    }
});

 // 与之对应的 CMD 的写法
define(function(require, exports, module) {
    if (xxx) {
      var header = require('./header')
      header.setHeader('new-title')
    }
    if (xxx) {
      var main = require('./main')
      main.setMain('new-content')
    }
    if (xxx) {
      var footer = require('./footer')
      footer.setFooter('new-footer')
    }
});

```



### 7、ES6 Module

export命令用于向外界暴露接口，import命令导入其他模块

在使用import导入export导出的模块必须知道模块的名称，否则无法加载；所以可以使用export default默认导出模块，在导入使用export default导出的模块的时候可以使用任何名称接收。



## 9、ES6模块和CommonJS模块的差异？

1. CommonJS模块是对值的拷贝，而ES6是对值的引用
2. CommonJS可以实现按需加载，ES6不行,即ES6不能在判断条件中加载

```javascript
if(XXX) { // 不行
    import XXX from './module.js'
}
```





3. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
4. CommonJS 加载的是整个模块，即将所有的接口全部加载进来，ES6 可以单独加载其中的某个接口（方法），
5. CommonJS this 指向当前模块，ES6 this 指向undefined