# 插槽

#### 前言

Vue插槽，是学习vue中必不可少的一节，当初刚接触vue的时候，对这些掌握的一知半解，特别是作用域插槽一直没明白。

后面越来越发现插槽的好用。

分享一下插槽的一些知识吧。分享以下几点：

1. 插槽是什么？

2. 插槽内可以放置什么内容？

3. 默认插槽

4. 具名插槽

5. 作用域插槽

> [!TIP]
> slot 相当于angular1.x directive里面的 transclude属性

#### 正文

- **插槽是什么？**

    简单来说就是一个占位符

- **插槽内可以放置什么内容？**

    插槽内可以放置任何类容

- **默认插槽**

    不多说，直接上代码：

``` vue

    ...
    <slot>/**内容**/</slot>
    ...

```

- **具名插槽**

    不多说，直接上代码：

``` vue

    子：
        ...
        <slot name="header">/**内容**/</slot>
        <slot name="footer">/**内容**/</slot>
        ...
    父：
        ...
        <div slot="header">header</div>
        <div slot="footer">footer</div>
        ...
```

- **作用域插槽**

    不多说，直接上代码：

``` vue
    子：
        ...
        <slot :row="{name: '张三'}">/**内容**/</slot>
        ...
    父：
        ...
        <custom-component>
            <template scope-slot="scope">
                {{ scope.row.name }}
            </template>
        </custom-component>
        ...
```

#### 延申

目前 *slot*、*scope-slot* 已经在vue 2.6以后版本中废弃，3.0版本彻底废弃。可使用最新语法v-slot或别名#。

- 默认：v-slot:default | #

- 具名：v-slot:header | #header

- 作用域：

  - 默认：v-slot="row" | #default="row"

  - 具名：v-slot:header | #header="row"
