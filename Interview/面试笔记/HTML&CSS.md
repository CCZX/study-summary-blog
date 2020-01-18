## 1、布局

exp：假设高度已知，请写出**三栏布局**，其中左右两栏宽度为`300px`，中间自适应

1. 浮动

```css
.left {
    float:left;
    width:300px;
}
.cneter {
    
}
.right {
    float: right
    width:300px;
}
```

1. 绝对定位

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

1. flex布局
2. 表格布局
3. 网格布局

### 衍生：

- 每个方案的优缺点？比较？
- 如果高度未知，当中间的元素被撑篙之后，那种布局效果的两栏也能跟着被撑高？
- 兼容性？
- 两栏布局？
- 上下固定中间自适应？

最后需要注意的是，在书写的时候要注意HTML语义化，即不要全篇写`div`

## 2、CSS盒模型

exp：谈谈你对CSS盒模型的认识。

**标准盒模型，IE盒模型**，默认标准盒模型

### 1、区别：IE 标准

- 标准：width = content
- IE：width = content+border+padding

### 2、如何设置这两种盒模型：

- 标准：box-sizing: content-box
- IE：box-sizing: border-box

### 3、JavaScript如何设置获取盒模型对应的宽高：

- `dom.style.width/height`，只能取内联样式的宽高
- `dom.currentStyle.width/heigth`，渲染的宽高，**只有IE支持**
- `window.getComputedStyle(dom).width/height`：与而相同，只支持**谷歌、火狐**
- `dom.getBoundingClientRect().w/h`
- `offsetWidth: content+padding+border`
- `clientWidth: content + padding`

### 4、根据盒模型解决边距重叠问题：

这里就会引出**BFC**（block format context）

### 5、BFC(块级格式化上下文)：

- 使用场景

  1. **清浮动**

     浮动元素产生了**浮动流**，所有产生了浮动流的元素，**块级元素都看不见浮动元素但是BFC元素和文本属性元素(`inline`)和文本都能看见浮动元素。**

  2. **解决margin塌陷、合并**

  什么是margin塌陷、合并？当**子元素margin-top值小于父元素的margin-top值的时候**，子元素的margin-top失效；**兄弟元素相邻的margin值**不会累加取最大值。

- 原理：

  1. BFC区域不会与浮动元素重合
  2. 在页面上是一个独立的容器
  3. 计算BFC高度时浮动元素也会参与计算
  4. BFC 内部的子元素，在垂直方向，边距会发生重叠

- 如何创建BFC？

  1、overflow不为visible。

  2、float值不为none

  3、position值不为static和relative

  4、display为inline-block、table、flex等

## 3、em、rem、px

px是固定的像素宽度，em、rem是相对长度单位，长度不是定死的，更**适用于响应式布局**，**em是相对于父元素的，rem是相对于根元素的**。

### 1、em

**1em = font-size的值**，需要注意的是谷歌浏览器设置的**最小字体大小为12px**。chrome默认的字体大小是12px，也就是1em默认为12px，如果最外层的父元素直接把font-size设为1.5em，那么该元素的字体大小为18px（12*1.5）。

- 子元素字体大小的em是相对于父元素的字体大小
- 元素的width/height/padding/margin用em的话是相对于该元素的font-size的

### 2、rem

rem是全部的长度都相对于根元素(HTML标签)，

```css
html {
    font-size: 10px; // 1rem = 10px
}
div {
    font-size: 4rem; // 40px
}
```



## 4、居中
### 1、水平居中

- 如果是行内元素，给父元素设置`text-align:center`；
- 如果是块级元素，将元素设置为`margin: 0 auto`;
- flex:
- position+margin
- position+transform

### 2、垂直居中

- 单行文本, line-height
- 行内块级元素, 使用 display: inline-block, vertical-align: middle; 加上伪元素辅助实现
- vertical-align
- flex
- 盒模型
- transform
- 两种不同的绝对定位方法

## 5、选择器

|                            选择器                            |      例子      |                        描述                         |
| :----------------------------------------------------------: | :------------: | :-------------------------------------------------: |
|                             #id                              |      #box      |                      id选择器                       |
|                            .class                            |      .box      |                    cclass选择器                     |
|                           element                            |       p        |                     b标签选择器                     |
|                              *                               |       *        |                       通配符                        |
|                       element,element                        |     p,div      |                        组合                         |
|                       element element                        |     div p      |                     子代选择器                      |
|                       element>element                        |     div>p      |                     直接子元素                      |
|                       element+element                        |     div+p      | 后继兄弟,选择紧接在 <div> 元素之后的所有 <p> 元素。 |
| [attribute]，[attribute=_value]，[attribute~=_value]，[attribute\|=value] |    [target]    |                     属性选择器                      |
|               :link，:hover，:active，:visited               |                |                     伪类选择器                      |
|                      ::after，::before                       |                |                       伪元素                        |
|                  :first-child，:last-child                   | p:first-child  |    选择属于父元素的第一个子元素的每个 <p> 元素。    |
|                        :nth-child(n)                         | p:nth-child(2) |   选择属于其父元素的第二个子元素的每个 <p> 元素。   |

- 选择器权重：`!important`(infinity)>内联（1000）>`#id`(0100)>`.class`(0010)>`tag`(0001)>`*`>继承>默认
- 选择器**从右到左**匹配

1. 第一等：代表**内联样式**，如: style=””，权值为1000。
2. 第二等：代表**ID**选择器，如：#content，权值为0100。
3. 第三等：代表**类、伪类、属性**选择器，如.content，权值为0010。
4. 第四等：代表**类型、伪元素、标签**选择器，如div p，权值为0001。
5. **通配符、子选择器、相邻选择器等的。如\*、>、+,权值为0000。**
6. **继承的样式没有权值。**



## 6、@import、link

- link是HTML提供的，功能较多；而@import是CSS语法，只能加载CSS
- link引入的CSS是**同时加载的**，@import在**页面加载完成之后再加载**
- `@import`IE5以上才支持，link不存在兼容性问题
- link可以通过DOM操作，所以link可以使用JS动态引入

## 7、DOCTYPE

`DOCTYPE`标签是一种标准通用标记语言的**文档类型声明**，它的目的是要**告诉标准通用标记语言解析器，它应该使用什么样的文档类型定义（`DTD`）来解析文档**。

doctype用于声明文档类型和DTD（document type definiton）规范，用于检验文件的合法性

- 严格模式：指浏览器按照**W3C标准**解析代码
- 混杂模式：指浏览器用**自己的标准**解析代码

## 8、HTML和XHTML区别

- `XHTML` 元素必须被**正确地嵌套**。
- `XHTML` 元素**必须被关闭**。
- `XHTML`标签名**必须用小写字母**。
- `XHTML` 文档**必须拥有根元素**。

## 9、行内元素
行内元素不能设置宽高，（但是<img>例外，因为它是**置换元素**），在设置`position:absolute`和`float:left`变为块级元素**`display:block`**。

**行内元素不能设置上下margin可以设置左右，可以设置所有padding**


## 10、HTML5到底有什么？

- 语义化标签：header、article、main、nav、footer
- 增加表单类型（email\url\number\range\search\color\date），表单元素(datalist\output)，表单属性(max\min\step\multiple)
- 音频视频
- Canvas
- SVG
- 地理位置：window.navigator.geolocation
- 拖放API：
- 、drag、drop
- Web Worker，多线程
- Web Storage，本地存储：local Storage、session Storage
- Web Socket

## 11、CSS3

- border-[image | radius |  shadow]
- background-[clip | origin | size]
- CSS渐变:[linear | radial]-gradient]
- CSS3字体
- transform和transition
- CSS3动画：animation
- flex布局
- 媒体查询

## 12、伪元素和伪类
- 伪类本质上是为了弥补常规CSS选择器的不足，以便获取到更多信息；
- 伪元素本质上是创建了一个有内容的虚拟容器；
- CSS3中伪类和伪元素的语法不同；
- 可以同时使用多个伪类，而只能同时使用一个伪元素；

CSS3规范中要求使用**双冒号(::)表示伪元素，使用单冒号(:)表示伪类**。w3c标准中说到，虽然CSS3标准要求伪元素使用双冒号的写法，但也依然支持单冒号的写法。**为了向后兼容，我们建议你在目前还是使用单冒号的写法**。

## 13、内联元素、块级元素



> 内联

`a,span,img`

> 块级

`div,p`

- 内联元素不能设置上下margin
- 使用position、float后内联元素变为块级元素

> 替换元素

虽然img是内联元素，但是它任然可以设置宽高，知识因为它是替换元素，其他替换元素还有select，input，textarea，iframe，canvas等。

## 14、flex

在设置`flex`之后position，float属性都将失效。flex是一维的布局思想

### flex容器属性

```css
/* 以下第一个属性都表示默认的属性值 */

flex-direction: row | row-reverse | cloumn | cloumn-reverse;
flex-wrap: nowrap | wrap | wrap-reverse;
flex-flow: <flex-direction> || <flex-wrap> /* flex-direction、flex-wrap的简写 */

/* 主轴对齐方式 */
justify-content: flex-start | flex-end | center | space-between | space-around;
/* 交叉轴对齐方式:拉伸对齐（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 第一行文字的基线对齐 */
align-items: stretch | flex-start | flex-end | center | baseline
/* 多根轴线对齐方式： */
align-content: stretch | flex-start | flex-end | center | space-between | space-ariund
```

### flex项目属性

```css
/* 顺序：数值越小越靠前，默认为0 */
order: <number>;
/* 放大比例，默认为0 */
flex-grow: <number>;
/* 缩小比例，默认为1,空间不足会缩小，为0不会缩小 */
flex-shrink: <number>;
/* 项目自身大小：默认auto，为原来的大小，可设置固定值 50px/50% */
flex-basis: <length> | auto;

/* flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
两个快捷值：auto (1 1 auto) 和 none (0 0 auto) */
flex:none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
/* 项目自身对齐：继承父元素（默认） | 起点对齐 | 终点对齐 | 居中对齐 | 基线对齐 | 拉伸对齐 */
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```



## 15、transform、transition

transform用于设置元素的选择、移动、缩放、或者倾斜

- translate()
- rotate()
- scale()
- skew()

transition用于设置元素的过度动画，它是以下属性的简写

- transition-property  设置动画的属性
- transition-duration  动画完成时间
- transition-timimg-function  动画速度曲线函数
- transition-delay  动画延迟时间

需要注意的是transition不能设置动画反复执行，但是可以通过JavaScript来修改相关的class来实现。

## 16、@keyframes、animation

@keyframes需要配合animation使用；@keyframes来规定动画，animation来实现动画效果。

```css
@keyframes go {
    from {
        transform: translate(200px)
    }
    to {
        transform: translate(400px)
    }
}
// 还可以使用百分比来表示过程
.main {
    animation: go 2s ease 0s 2;
}
```

animation是以下属性的简写：

- animation-name 动画名称
- animation-duration  动画完成时间
- animation-timing-function  动画速度曲线函数
- animation-delay  动画延迟时间
- animation-iteration-count  动画播放次数
- animation-direction  是否轮流反向播放动画

## 17、媒体查询

媒体查询可以用来设置响应式页面

> css语法

```css
@media mediaType and | only | not (media feature) {
    // css code...
}
```

> 例子

```css
@media only screen and  (max-width: 300px) {
    body {
        color: red
    }
}
```

> 媒体类型

- all
- print  用于打印机和打印预览
- screen  用于电脑屏幕，平板电脑，智能手机等。
- speech  应用于屏幕阅读器等发声设备