## 1.webpack打包的过程
- 读取配置文件，初始化配置对象，创建Complier对象
- 调用插件的apply方法，挂载插件监听，然后从入口文件执行编译
- 按照文件类型调用相应的loader，并在合适的时间触发对应的事件，调用plugin执行，查找模块依赖
- 将编译后的代码组装成一个个代码块（chunk），并安依赖和配置确定输出内容
- 根据output把文件输出到指定的文件目录之中

## 2.入口文件
在使用之前首先安装`npm i webpack --save-dev`和`npm i webpack-cli --save-dev`。
安装完成之后在`package.json`添加build脚本:
```json
"scripts": {
    "bulid": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
这样可以执行`npm run build`来进行打包。如果不设置该脚本命令可以通过`npx webpack`来进行打包

**在webpack4.0以前必须在`webpack.config.js`配置文件中通过entry指定入口文件；webpack4.0默认将`./src/index.js`做为入口文件。**


## 3.生产模式和开发模式
在webpack4.0之前需要配置两个配置文件，一个用于生产环境，一个用于开发环境。
- 用于开发的配置文件：配置热更新、跨域配置、端口设置等
- 用于生产的配置文件：配置 js 压缩、代码拆分等

**在webpack4.0可以通过脚本的方式配置生产环境和开发环境：**

```json
"dev": "webpack --mode development",
"build": "webpack --mode production"
```
如果没有配置将默认回退到生产环境。


## 4.覆盖默认的入口文件
webpack支持ES6、CommonJS、AMD，但是在实际开发的过程中最好只是用ES6和CommonJS。因为使用AMD会让打包后的`dist`目录中多出一个文件。

```js
const path = require('path')
module.exports = {
  entry: {
    app: './app.js' // 打包入口文件
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  }
}
```

## 5.module处理,使用loader
默认webpack只能`.js`文件，所以针对不是`.js`的文件需要使用`loader`进行处理。
**loader是一个文件加载器，能够加载资源文件并对资源文件进行处理。诸如编译、压缩等，最终一起打包到指定的文件中**
- 如果处理一个文件使用多个loader，先执行最后一个loader
- 第一个执行的loader以源码作为参数，下一个执行的loader以前一个处理后的结果作为参数，最后执行的loader会返回此模块的JavaScript源码。
```javascript
module: {
  rules: [
    {
      test: /.\css$/,
      use: ['style-loader', 'css-loader'] 
    }
  ]
}
```
> 常见loader的作用：

- `style-loader`: 将处理后的`CSS`文件包裹在`<style>`中，并插入到`HTML`文件中
- postcss-loader

> 其他的条件比如：
- { include: Condition }:匹配特定条件。一般是提供一个字符串或者字符串数组，但这不是强制的。
- { exclude: Condition }:排除特定条件。一般是提供一个字符串或字符串数组，但这不是强制的。
- { and: [Condition] }:必须匹配数组中的所有条件
- { or: [Condition] }:匹配数组中任何一个条件
- { not: [Condition] }:必须排除这个条件
```javascript
module.exports = {
  ...
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, "app/styles"),
          path.resolve(__dirname, "vendor/styles")
        ],
        use: ['style-loader', 'css-loader']
      }
    ]
  }
  ...
};

```
> 传递参数
```javascript
use: [
  'style-loader',
  {
    loader: 'css-loader'
  },
  {
    loader: 'less-loader',
    options: {
      noIeCompat: true // 通过这里传递参数
    }
  }
];
```
这里的`'style-loader'`相当于`'{loader: 'style-loader'}'`的简写

> sourceMap
sourceMap可以在调试的时候看到文件最初的位置，有利于我们的开发与调试
```javascript
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    }]
  }
};
```

> PostCSS

## 6.将样式抽离成一个单独的CSS文件

> 抽离后就不能使用`style-loader`注入到HTML中了

 **需要把`mode`设置为`production`**

webpack4 开始使用： mini-css-extract-plugin插件, 1-3 的版本可以用： extract-text-webpack-plugin

`npm install --save-dev mini-css-extract-plugin`

## 7.CSS、JS压缩

> CSS  webpack5 貌似会内置 css 的压缩，webpack4 可以自己设置一个插件即可。

压缩 css 插件：optimize-css-assets-webpack-plugin

安装

npm i -D optimize-css-assets-webpack-plugin

> JS
压缩需要一个插件： uglifyjs-webpack-plugin, 此插件需要一个前提就是：mode: 'production'.

安装

npm i -D uglifyjs-webpack-plugin



## 8.自动删除 dist 文件，再打包
**安装插件：`npm install clean-webpack-plugin --save-dev`:**

使用：

- 引入：`const = CleanWebpackPlugin = require('clean-webpack-plugin')`
- 添加：`  plugins: [new CleanWebpackPlugin()]`
修改`webpack.config.js`配置文件:
```javascript
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './app.js' // 需要打包的文件入口
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: 'bundle.js' // 打包后生产的 js 文件
  },
  plugins: [
    new CleanWebpackPlugin() // 默认情况下，此插件将删除 webpack output.path目录中的所有文件，以及每次成功重建后所有未使用的 webpack 资产。
  ]
}

```

## 9.使用Babel7转ES6
一些旧的浏览器无法识别ES6，这时就需要转译。
webpack不知道如何转译但是loader（加载器）知道如何转译

`npm i @babel/core babel-loader @babel/preset-env @babel/plugin-transform-runtime --save-dev`

`npm i @babel/polyfill @babel/runtime`

## 10.Code Splitting
在我们使用第三方的框架库的时候，会和我们的代码一同打包，但是这样存在一个问题：每次浏览器打开页面都会加载第三方的框架库，这样会发起过多的HTTP请求，降低性能。
浏览器是有缓存的，如果文件没变动的话，就不用再去发送 http 请求，而是直接从缓存中取，这样在刷新页面或者第二次进入的时候可以加快网页加载的速度。
在 webpack4 之前是使用 commonsChunkPlugin 来**拆分公共代码**，v4 之后被废弃，并**使用 splitChunksPlugins**在使用 splitChunksPlugins 之前，首先要知道 splitChunksPlugins 是 webpack 主模块中的一个细分模块，无需 npm 引入

```javascript
const path = require('path')

const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    publicPath: __dirname + '/dist/', // js 引用的路径或者 CDN 地址
    path: path.resolve(__dirname, 'dist'), // 打包文件的输出目录
    filename: '[name].bundle.js', // 代码打包后的文件名
    chunkFilename: '[name].js' // 代码拆分后的文件名
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [new CleanWebpackPlugin()]
}

```
上面高亮的代码段就是告诉 webpack，要做代码分割了，这里的 `chunks: 'all'` 是分割所有代码，包括同步代码和异步代码，webpack 默认是 `chunks: 'async'` 分割异步代码

## 11.loader
**webpack是基于Node的，所以webapck只能识别`.js`文件**，所以其他类型的文件需要合适的loader来进行转译。
loader是文件加载器，能够加载资源文件，并对这些文件进行一些特定的处理，然后打包到指定的文件中。 **简单来说loader所作的事就是对webpack传入的字符串进行特定的修改**。

- loader的执行顺序和代码书写的顺序是相反的，即：最后一个loader最先执行，第一个loader最后执行
- 第一个执行的loader会接收源文件做为参数，下一次执行的loader会接收前一个loader执行的返回值做为参数

>  loader的options属性

```javascript
// webpack.config.js
 module: {
    rules: [
      {
        test: /.js/,
        use: [
          {
            loader: path.resolve(__dirname, './loaders/replaceLoader.js'),
            options: {
              name: 'xh'
            }
          }
        ]
      }
    ]
  },
```
```javascript
// replaceLoader.js
module.exports = function(source) {
  console.log(this.query) // {name: 'xh'}
  return source.replace('world', this.query.name)
}
```
**可以通过options属性给loader传递参数**

## 12.plugin
**在webapck执行的期间会广播出许多事件，plugin可以监听这些事件，并在合适的时机通过webpack提供的API改变输出结果**。

> loader和plugin的区别

- **loader是一个转译器，将A文件按照配置转译为B文件，这里操作的是文件，比如将base.scss转译为base.css**，
- **plugin是一个扩展器，针对是在webpack打包结束之后，在webpack的打包过程中，它并不直接操作文件，而是基于事件机制工作的，会监听webpack打包过程中的某些节点，执行广泛的任务**。

> 写一个简单的plugin

```javascript
// plugin/myplugin.js
class MyPlugin {
  constructor(options) {
    consloe.log("options os：", options)
  }
  apply(compiler) {
    compiler.plugin('compilation', compilation => {
      console.log('mypluigin compilation')
    })
  }
}
// webpack.config.js
const MyPlugin = require('./plugins/MyPlugin')
module.exports = {
 entry: {
  index: './src/js/index.js'
 },
 plugins: [
  ...,
  new MyPlugin({param: 'xxx'})
 ],
 ...
};
```


上面的例子中通过new MyPlugin({param: 'xxx'})中的{param: 'xxx'}，给我们创建的plugin**传递参数**

这样就实现了一个简单的plugin
- 在启动webpack之后会执行配置文件，先执行new MyPlugin(options) 初始化一个 MyPlugin 获得其实例
- 在初始化compiler对象后，调用myPlugin.apply(compiler)将插件实例传递给compiler对象
- 在插件实例获取到compiler对象后，就可以通过compiler.plugin('事件名称',callback)来监听webpack广播出来的事件，
- 并且可以通过 compiler 对象去操作 webpack。

>  Compiler 和 Compilation 的区别

- **Compiler 对象包含了 Webpack 环境所有的的配置信息**，包含 options，loaders，plugins 这些信息，这个对象在 Webpack 启动时候被实例化，它是**全局唯一**的，可以简单地把它理解为 Webpack 实例；

- **Compilation 对象包含了当前的模块资源、编译生成资源、变化的文件等**。当 Webpack 以开发模式运行时，**每当检测到一个文件变化，一次新的 Compilation 将被创建**。Compilation 对象也提供了很多事件回调供插件做扩展。通过 Compilation 也能读取到 Compiler 对象。

- **Compiler 代表了整个 Webpack 从启动到关闭的生命周期，而 Compilation 只是代表了一次新的编译。**

>  注意

- 只要能拿到 Compiler 或 Compilation 对象，就能广播出新的事件，所以在新开发的插件中也能广播出事件，给其它插件监听使用。
- 传给每个插件的 Compiler 和 Compilation 对象都是同一个引用。也就是说在一个插件中修改了 Compiler 或 Compilation 对象上的属性，会影响到后面的插件。
- 有些事件是异步的，这些异步的事件会附带两个参数，第二个参数为回调函数，在插件处理完任务时需要调用回调函数通知 webpack，才会进入下一处理流程 。