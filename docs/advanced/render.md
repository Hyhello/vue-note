# render函数

#### 引言

我们先看一个官网栗子：

``` vue

<!-- 模板 -->
<script type="text/x-template" id="anchored-heading-template">
    <h1 v-if="level === 1">
        <slot></slot>
    </h1>
    <h2 v-else-if="level === 2">
        <slot></slot>
    </h2>
    <h3 v-else-if="level === 3">
        <slot></slot>
    </h3>
    <h4 v-else-if="level === 4">
        <slot></slot>
    </h4>
    <h5 v-else-if="level === 5">
        <slot></slot>
    </h5>
    <h6 v-else-if="level === 6">
        <slot></slot>
    </h6>
</script>

<!-- 组件 -->
Vue.component('anchored-heading', {
    template: '#anchored-heading-template',
    props: {
        level: {
            type: Number,
            required: true
        }
    }
});

```

从上面栗子我们不难看出：代码冗长，为了在不同级别的标题中插入锚点元素，我们需要重复地使用 &lt;slot&gt;&lt;/slot&gt;。

虽然模板在大多数组件中都非常好用，但是在这里它就不是很简洁的了。那么，我们来尝试使用 render 函数重写上面的栗子：

``` javascript
// 组件
Vue.component('anchored-heading', {
    props: {
        level: {
            type: Number,
            required: true
        }
    }，
    render (h) {
        return h('h' + this.level,
            this.$slots.default
        ));
    }
});
```

简单清晰很多！简单来说，这样代码精简很多，但是需要非常熟悉 Vue 的实例属性。

根据上面的栗子，我们了解到render函数的便捷，简单。但是我们也看到了render传入了一个形参h, h是个什么呢？

接下来我们就来详细介绍h（createElement）

#### h（createElement）

接下来你需要熟悉的是如何在 createElement 函数中生成模板。这里是 createElement 接受的参数：

``` javascript
createElement(
    // {String | Object | Function}
    // 一个 HTML 标签字符串，组件选项对象，或者
    // 解析上述任何一种的一个 async 异步函数，必要参数。
    'div',
    // {Object}
    // 一个包含模板相关属性的数据对象
    // 这样，您可以在 template 中使用这些属性。可选参数。
    options, // (详情见下一节)
    // {String | Array}
    // 子节点 (VNodes)，由 `createElement()` 构建而成，
    // 或使用字符串来生成“文本节点”。可选参数。
    [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
        props: {
            someProp: 'foobar'
        }
    })
    ]
)
```

##### options

先简单的了解下这个options，它可以包含以下属性：

- class

  - 预期：*any* 一般两项 Array | Object,

  - 说明：绑定className

  - 方法：

``` javascript
{
    'class': ['a']
}
```

> [!WARNING]由于是关键字使用时请使用‘''’括起来

- style

  - 预期：Object,

  - 说明：绑定style行类样式

  - 方法：

``` javascript
{
    'style': {
        width: '10px'
    }
}
```

> [!WARNING]属性请使用小驼峰

- attrs

  - 预期：Object,

  - 说明：绑定DOM属性

  - 方法：

``` javascript
{
    'attrs': {
        id: 'id'
    }
}
```

> [!WARNING]属性请使用小驼峰

- props

  - 预期：Object,

  - 说明：父 -> 子通信

  - 方法：

``` javascript
{
    'props': {
        id: String
    }
}
```

  > [!WARNING]属性请使用小驼峰

- domProps

  - 预期：Object,

  - 说明：DOM 属性

  - 方法：

``` javascript
{
    'domProps': {
        id: String
    }
}
```

> [!WARNING]属性请使用小驼峰

- on

  - 预期：Object,

  - 说明：事件监听

  - 方法：

``` javascript
{
    'on': {
        'click': function () {
            // 你的代码
        }
    }
}
```

> [!WARNING]不支持修饰符

- nativeOn

  - 预期：Object,

  - 说明：针对组件 跟修饰符.native 一样具有穿透作用

  - 方法：

``` javascript
{
    'nativeOn': {
        'click': function () {
            // 你的代码
        }
    }
}
```

> [!WARNING]不支持修饰符

- directives

  - 预期：Object,

  - 说明：详见自定义指令

  - 方法：

``` javascript
{
    'directives': {
        // 你的代码
    }
}
```

- scopedSlots

  - 预期：Object,

  - 说明：详见作用域插槽

  - 方法：

``` javascript
scopedSlots: {
    default: props => createElement('span', props.text)
}
```

- slot

  - 预期：String,

  - 说明：详见具名插槽

  - 方法：

``` javascript
{
    'slot': 'header'
}
```

- key

  - 预期：String,

  - 说明：其他特殊顶层属性，可参考列表渲染中的key

  - 方法：

``` javascript
{
    'key': 'myKey'
}
```

- ref

  - 预期：String,

  - 说明：映射dom到该属性

  - 方法：

``` javascript
{
    'ref': 'myRef'
}
```

如有不懂，可点击[**此处**](https://github.com/Hyhello/vue-note/blob/master/example/render.js)查看一个简单的栗子，了解下。
