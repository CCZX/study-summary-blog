## 1、布局

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
- `window.getComputedStyle(dom).width/height`：与而相同，只支持**谷歌火狐**
- `dom.getBoundingClientRect().w/h`
- offsetWidth: content+padding+border
- clientWidth: content + padding

### 4、根据盒模型解决边距重叠问题：

这里就会引出BFC

### 5、BFC(块级格式化上下文)：

- 使用场景

  1. 清浮动

     浮动元素产生了浮动流，所有产生了浮动流的元素，块级元素都看不见它们但是产生了BFC的元素和文本属性元素(inline)和文本都能看见它们

  2. 解决margin塌陷、合并

  什么是margin塌陷、合并？当子元素margin-top值小于父元素的margin-top值的时候，子元素的margin-top失效；兄弟元素相邻的margin值不会累加取最大值。

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

1. **第一等：代表内联样式，如: style=””，权值为1000。**
2. **第二等：代表ID选择器，如：#content，权值为0100。**
3. **第三等：代表类，伪类和属性选择器，如.content，权值为0010。**
4. **第四等：代表类型选择器和伪元素选择器，如div p，权值为0001。**
5. **通配符、子选择器、相邻选择器等的。如\*、>、+,权值为0000。**
6. **继承的样式没有权值。**



## 6、@import、link

- link功能较多，而@import只能加载CSS
- link同步加载CSS，@import在页面加载完成之后再加载
- `@import`IE5以上才支持
- link可以使用JS动态引入

## 7、DOCTYPE

doctype用于声明文档类型和DTD（document type definiton）规范，用于检验文件的合法性

- 严格模式：指浏览器按照W3C标准解析代码
- 混杂模式：指浏览器用自己的方式解析代码

## 8、HTML和XHTML区别

- XHTML 元素必须被正确地嵌套。
- XHTML 元素必须被关闭。
- 标签名必须用小写字母。
- XHTML 文档必须拥有根元素。