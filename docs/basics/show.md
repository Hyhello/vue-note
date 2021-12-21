# 条件渲染

#### 前言

模版条件渲染非常常见，遇到的时候往往会随机选择一种方式使用，那么怎么写会有较好的维护性呢？在使用过程中有哪些注意事项呢？

在学习本章内容前，需了解以下知识（**此处为选学内容，不影响基本使用**）：

- 浏览器回流

- 浏览器重绘

> [!TIP]
> 本章不做详细赘述，有兴趣可戳一戳
> :point_right:
> [**此处**](https://www.imooc.com/article/23767?block_id=tuijian_wz)

#### 条件渲染有哪些？

##### v-if

- 预期：*any*

- 用法：根据表达式的值的真假条件渲染元素。在切换时元素及它的数据绑定 / 组件被销毁并重建。如果元素是 &lt;template&gt; ，将提出它的内容作为条件块。

> [!WARNING]该指令会导致浏览器回流（事件监听器和子组件适当地被销毁和重建），对性能有影响，特别是Mobile端

##### v-else

- 预期：不需要表达式

- 限制：前一兄弟元素必须有 v-if 或 v-else-if。

- 用法:

``` vue
<div v-if="Math.random()> 0.5">
    hello 0.5 ~ 1
<div>
<div v-else> hello 0 ~ 0.5 </div>
```

> [!WARNING]该指令会导致浏览器回流（事件监听器和子组件适当地被销毁和重建），对性能有影响，特别是Mobile端

##### v-else-if

- 预期：*any*

- 限制：前一兄弟元素必须有 v-if 或 v-else-if。

- 用法:

``` vue
<div v-if="Math.random()> 0.5">
    hello 0.5 ~ 1
<div>
<div v-else-if="Math.random() < 0.3"> hello 0 ~ 0.3 </div>
<div v-else> hello 0.3 ~ 0.5 </div>
```

> [!WARNING]该指令会导致浏览器回流（事件监听器和子组件适当地被销毁和重建），对性能有影响，特别是Mobile端

##### v-show

- 预期：*any*

- 用法:

``` vue
<div v-show="Math.random() < 1">
    hello~
<div>
```

> [!WARNING]v-show 不支持 &lt;template&gt; 元素，最好不要与 v-if | v-else | v-else-if 共用在一个元素上面

##### v-hide

- 预期：*any*

- 用法:

``` vue
<div v-hide="Math.random() < 1">
    88~
<div>
```

> [!WARNING]v-hide 不支持 &lt;template&gt; 元素，最好不要与 v-if | v-else | v-else-if 共用在一个元素上面

#### 总结

一般来说，v-if 会导致浏览器回流，切换性能开销较大，而 v-show 会导致浏览器重绘，相对来说，切换性能开销小。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。
