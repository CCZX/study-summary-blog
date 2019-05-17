## 1、MVVM

MVVM分为View、Model、View-Model三层

- View：代表UI层，负责数据的展示

- Model：代表数据模型，数据以及业务逻辑都在这里定义

- View-Model：是连接View和Model的桥梁，负责监听View视图层和Model数据模型的变化，并控制View和Model的更新。

  View和Model并没有直接的联系，是通过View-Model来进行通信的，当数据发生变化时，View-Model能监听到数据变化，并通知对应的视图层更新；当用户操作视图层时View-Model也能监听到视图层的变化，并通知数据模型更新，这种实现是通过一个[观察者模式](https://blog.csdn.net/weixin_43534005/article/details/89496690)来实现的。这样的数据流动就实现的双向数据绑定。

## 2、动手实现MVVM、Vue响应式原理

参考：https://github.com/DMQ/mvvm，这篇文章讲的十分详细。

**Vue响应式原理：**

当创建组件的时候，遍历data上的每个属性，然后使用Object.definePropery的getter、setter劫持每个属性，监听数据的变化，在属性被访问和修改的时候通知变化。每个组件都有一个watcher实例，它在组件渲染的过程中记录依赖，当有依赖项的setter被调用的时候，会通知watcher重新计算，从而使相关的组件重新更新。

## 3、SSR（服务端渲染）

SSR，即**服务端渲染**，就是在服务端将vue文件生成HTML文件，然后再传递给浏览器

SSR优点：

- SSR不同于SPA（单页应用），只有一个无实际意义HTML和app.js，SSR生成的HTML是有内容的，这样**更有利于搜索引擎的SEO**；
- **更快的到达时间**，传统的SPA是从服务端获取bundle.js，然后在客户端解析挂载到DOM，而SSR直接将HTML传递给浏览器减少了解析时间，**缩短了首屏加载时间**。

## 4、Vue常见指令

v-for、v-if、v-show、v-html、v-bind、v-model等；

### 1、v-if和v-show的区别

**v-show**是控制元素的显示方式，即：**将元素的display属性在none和block来回切换**；**v-if**是控制元素是否渲染，即：**控制这个DOM节点是否存在**。所以如果我们需要频繁的切换一个元素是否显示显然v-show更加合适，能节省性能上的开销；如果大都数情况下只是切换一次用v-if更合适。

### 2、v-bind和v-model区别

- v-bind：将数据同步到页面上
- v-model：双向数据绑定

## 5、自定义指令

官方文档：https://cn.vuejs.org/v2/guide/custom-directive.html

### 语法：

全局：

```vue
Vue.directive('name', {function})
```

局部：

```vue
directives: {
 name: {
  function
 }
}
```

### 钩子函数

- `bind`：只调用一次，在第一次绑定到元素时调用，在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入到父元素时调用，只触发一次
- `update`：当`VNode`更新的时候，会执行 `updated`， 可能会触发多次

### 钩子函数参数

- `el`：指令所绑定的元素，可以用来直接操作`DOM`
- `binding`：一个对象包含以下属性：
  - `name`：指令名。不包括v-前缀
  - `value`：指令绑定的值，例如：`v-test="1+1"`，`value`为2
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"`中，表达式为 `"1 + 1"`。
  - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
  - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。
- `vnode`：`Vue` 编译生成的虚拟节点。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

## 6、Vue生命周期

- `beforeCreate`：实例已经被创建完成，还没初始化好`data`和`methods`属性
- `created`：实例已经被创建完成，`data`和`methods`已经初始化完成，但是还没有编译模板
- `beforeMount`：此时模板已经编译完成但是还没有挂载到页面之中
- `mounted`：此时，已经将编译好的模板挂载到了指定的容器中
- `beforeUpdate`：状态更新之前的函数，此时`data`中的数据已经是最新的，但是视图容器没有更新，因为此时还没重新渲染DOM节点
- `updated`：`data`和视图容器的值都是最新的，DOM已经重新渲染完毕
- `beforeDestroy`：实例销毁之前调用，但是在此刻实例还是可用的，所以我们可以在这一步来做清除定时器的操作
- `destroyed`：实例被销毁后调用，实例已经被完全销毁，实例指定的东西也会被解绑，事件监听被移除，子实例也被销毁。

## 7、active-class

设置`<router-link>`激活时使用的 CSS 类名。

默认值是：`router-link-active`。

默认值可以通过路由的构造选项 `linkActiveClass` 来全局配置。

```vue
export default new Router({
	linkActiveClass: 'active'
})
```



## 8、路由嵌套

在 VueRouter 的参数中使用 children 配置来实现路由嵌套。

```javascript
let router = new VueRouter({
  routes: [
    {
      path: '/account',
      component: account,
      // 使用 children 属性，实现子路由，同时，子路由的 path 前面，不要带 / ，否则永远以根路径开始请求，这样不方便我们用户去理解URL地址
      children: [
        { path: 'login', component: login },
        { path: 'register', component: register }
      ]
    }
  ]
})
```

在使用children定义了嵌套路由之后，还要在子路由的父级路由（account），设置`<router-view></router-view>`，来显示子路由。

## 9、Proxy和Object.defineProperty

- Object.defineProperty监听的是属性，Proxy监听的是整个对象
- Object.defineProperty不支持数组的API，proxy支持数组API
- Object.defineProperty只能遍历对象属性进行修改，而proxy返回一个新的对象，我们只需要操作该新对象即可
- Object.defineProperty兼容性更好

## 10、动态路由

定义动态路由：在path属性加上`:/id`，例如：`/user/:id`

获取传递的参数：`this.$route.params.id`。	

**在使用动态路由后，原来的组件会被复用，所以组件的生命周期函数不会被调用**，但是我们可以是使用`watch`来监听路由的变化：

```vue
watch: {
  '$route' (to, from) {
    // do...
  }
}
```

## 11、vue-router 中的导航钩子

### 1、全局导航钩子

```javascript
const router = new VueRouter({...})
                              
router.beforeEach((to, from, next) => {
    // do...
})
```

- **to: Route**: 即将要进入的目标 [路由对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
- **from: Route**: 当前导航正要离开的路由
- **next: Function**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

这通常用来全局的路由拦截。比如在用户访问某个页面的时候要先判断是都登录，如果登录了就使用next()，没有登录就next('/login')。

### 2、路由独享守卫

这是在路由配置上直接定义`beforeEach`：

```vue
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

参数与全局的一样。

### 3、组件内守卫

- beforeRouterEnter
- beforeRouterUpdate
- beforeRouterLeave

```vue
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`boforeRouterEnter`不能访问`this`，因为新的组件还有被创建。但是可以通过`next()`来访问组件实例。

```vue
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

### 4、完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 (2.2+)。
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。



## 12、组件通信

### 1、props：父 ——> 子

```html
<body>
  <div id="app">
    <h1>父组件</h1>
    <child :parentmsg="msg"></child>
  </div>
  <script>
    const child = {
      template: `
          <div>
            <h1>子组件</h1>
            <h1 @click="handler">这是子组件----------{{parentmsg}}</h1>
          </div>
      `,
      props: ['parentmsg'],
    }
    const vue = new Vue({
      el: "#app",
      data: {
        msg: '父组件中的数据'
      },
      components: {
        child
      }
    })
  </script>
</body>
```

首先在**子组件注册将要从父组件接收的数据**：`props:['parentmsg']`，然后在父组件注册该子组件。在**父组件中使用子组件的时候自定义一个属性**，但是这个属性要和子组件定义接收的相同。

但是需要注意的是：

- 由于HTML对于大小写并不敏感，所以自定义的属性不能使用大写，可以使用`-`。
- 不能直接在子组件中修改props中的值

### 2、`this.$emit()`，子 ——> 父

`this.$emit()`，可以在子组件中执行父组件传递来的方法，然后子组件通过该方法将数据传递给父组件。

```html
<body>
  <div id="app">
    <child @p-handler="pHandler"></child>
  </div>
  <script>
    const child = {
      template: `
          <div>
            <h1>子组件</h1>  
            <button @click="cHandler">子组件按钮</button>
          </div>
      `,
      data() {
        return {
          msg: '我是儿子的信息'
        }
      },
      methods: {
        cHandler() {
          this.$emit('p-handler', this.msg)
        }
      }
    }
    const vue = new Vue({
      el: "#app",
      data: {
        msg: '我是爸爸'
      },
      components: {
        child
      },
      methods: {
        pHandler(data) {
          console.log('这是父组件的事件处理函数')
          console.log(data)
        }
      },
    })
  </script>
</body>
```



在父组件中使用子组件的时候使用`@`或者`v-on:`给子组件绑定一个父组件中的方法（`<child @p-handler="pHandler"></child>`）。然后在子组件触发自身的方法的时候，使用`this.emit()`，调用绑定的方法（`this.$emit('p-handler', this.msg)`），其中第二个参数就可以传递值给父组件，父组件拿到值之后再进行操作，这样就解决了子组件不能修改`props`中值的问题。

### 3、slot  父——>子

现在的需求是我们需要向子组件传递多条数据，可能这些数据在页面显示的时候还要有一定的样式。那么prop的通信方式就不太适用了。这个时候插槽的功能就显得尤为重要了。

```html
<body>
  <div id="app">
    <child>
      <p slot="3">3</p>
      <p slot="2">2</p>
      <p slot="1">1</p>
    </child>
  </div>

  <script>
    const child = {
      template: `
          <div>
            <h1>子组件</h1>
            <slot name="1"></slot>
            <slot name="2"></slot>
            <slot name="3"></slot>
          </div>
      `
    }
    const vue = new Vue({
      el:'#app',
      components: {
        child
      }
    })
  </script
```

### 4、this.$parent 、 this.$children

在子组件中，使用`this.$parent`，方法可以获取父组件。

```html
<body>
  <div id="app">
    <child>

    </child>
  </div>

  <script>
    const child = {
      template: `
          <div>
            <h1>子组件</h1>
            <button @click="fun">click</button>
          </div>
      `,
        methods: {
          fun() {
            console.log(this.$parent.msg)
          }
        },
    }
    const vue = new Vue({
      el:'#app',
      data: {
        msg: '1231'
      },
      components: {
        child
      }
    })
  </script>
</body>
```

在父组件中可以通过`this.$children`获取所有子组件，获取到的值是一个数组。

### 5、$ref(父——>子)

```html
<body>
  <div id="app">
    <button @click="han">父组件click</button>
    <child ref="child"></child>
  </div>
  <script>
    const child = {
      template: `
          <div>
            <h1>子组件</h1>  
          </div>
      `,
      data() {
        return {
          msg: '我是儿子的信息'
        }
    }
  }
    const vue = new Vue({
      el: "#app",
      data: {
        msg: '我是爸爸'
      },
      components: {
        child
      },
      methods: {
        han() {
          console.log(this.$refs.child)
        }
      },
    })
  </script>
</body>
```

### 6、EventBus

兄弟组件，父子组件都适用。

```html
<body>
  <div id="app">
    <child></child>
  </div>
  <script>
    let EventBus = new Vue()
    const child = {
      template: `
          <h1>子组件</h1>
      `,
      created() {
        console.log(EventBus.message)
        EventBus.$emit('received', 'from chils com')
      },
    }
    const vue = new Vue({
      el: '#app',
      components: {
        child
      },
      created() {
        EventBus.message = "hello"
        EventBus.$on('received', (val) => {
          console.log(`parent com receive message: ${val}`)
        })
      }
    })
  </script>
</body>
```

### 7、VueX

## 13、虚拟DOM、DIFF

https://juejin.im/post/5c8e5e4951882545c109ae9c

### 1、虚拟DOM

虚拟DOM就是将真正的DOM节点用JavaScript对象的方式来表示。

比如：

```html
<ul id="box">
    <li id="item">1</li>
    <li id="item">2</li>
</ul>
```

对应的虚拟DOM：

```javascript
let VDOM = {
    tagName: 'ul',
    attrs: {
        id: "box"
    },
    children: [
        {
            tagName: 'li',
            attrs: {
                id: 'item'
            },
            children: ['1']
        },
        {
            tagName: 'li',
            attrs: {
                id: 'item'
            },
            children: ['2']
        },
    ]
}
```

虚拟DOM真的比DOM快吗？在我个人理解来看，在第一次渲染DOM的时候虚拟DOM比真实的DOM要慢一些，因为虚拟DOM需要进行js计算之后再进行渲染。但是之后如果需要改动DOM虚拟DOM要更胜一筹，因为虚拟DOM结合DIFF算法，只修改需要变化的部分，而真实的DOM则需要重新渲染。

网上说的：

1. 虚拟DOM不会进行排版与重绘操作
2. 虚拟DOM进行频繁修改，然后一次性比较并修改真实DOM中需要改的部分（注意！），最后并在真实DOM中进行排版与重绘，减少过多DOM节点排版与重绘损耗
3. 真实DOM频繁排版与重绘的效率是相当低的
4. 虚拟DOM有效降低大面积（真实DOM节点）的重绘与排版，因为最终与真实DOM比较差异，可以只渲染局部（同2）

参考尤大神的回答：https://www.zhihu.com/question/31809713/answer/53544875

### 2、DIFF算法

我们先根据真实DOM生成一颗`virtual DOM`，当`virtual DOM`某个节点的数据改变后会生成一个新的`Vnode`，然后`Vnode`和`oldVnode`作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使`oldVnode`的值为`Vnode`。

diff的过程就是调用名为`patch`的函数，比较新旧节点，一边比较一边给**真实的DOM**打补丁。



## 14、为什么组件的data必须是一个函数

- 每个组件都是Vue的实例
- 组件共享data属性，当data是同一个引用类型的值时，其中一个改变就会影响其他。

