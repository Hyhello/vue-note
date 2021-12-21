# 过渡与动画

#### 前言

人们是很喜欢动画的，我们眼中的日常生活，就是以一副永不止歇的动画来呈现的。所以说，动画是一种很自然、很直观的传播媒介，因此本节简单介绍下论 Vue.js 的过渡效果与动画效果。
> [!TIP]
> 本章不做详细赘述，具体可戳一戳
> :point_right:
> [**此处**](https://cn.vuejs.org/v2/guide/transitions.html)

#### 过渡 & 动画

- Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

- Vue 提供了内置的过渡封装组件，该组件用于包裹要实现过渡效果的组件。

- 用法

``` vuejs
<transition name="fade">
  <p v-show="show" v-bind:style="styleobj">动画实例</p>
</transition>
```

- 效果
   实例中通过点击 "点我" 按钮将变量 show 的值从 true 变为 false。如果为 true 显示子元素 p 标签的内容。

#### 过渡分析

过渡其实就是一个淡入淡出的效果。Vue在元素显示与隐藏的过渡中，提供了6个class来切换：

- v-enter：定义进入过渡的开始状态。在元素被插入之前生效，在元素被插入之后的下一帧移除。

- v-enter-active：定义进入过渡生效时的状态。在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

- v-enter-to: 2.1.8版及以上 定义进入过渡的结束状态。在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

- v-leave: 定义离开过渡的开始状态。在离开过渡被触发时立刻生效，下一帧被移除。

- v-leave-active：定义离开过渡生效时的状态。在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

- v-leave-to: 2.1.8版及以上 定义离开过渡的结束状态。在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。

![文件目录](../../assets/images/transition.png)

> [!WARNING]对于这些在过渡中切换的类名来说，如果你使用一个没有名字的 &lt;transition&gt;，则 v- 是这些类名的默认前缀。如果你使用了 &lt;transitionname="my-transition"&gt;，那么 v-enter 会替换为 my-transition-enter。v-enter-active 和 v-leave-active 可以控制进入/离开过渡的不同的缓和曲线

#### 显性的过渡持续时间

在很多情况下，Vue 可以自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 transitionend 或 animationend 事件。然而也可以不这样设定——比如，我们可以拥有一个精心编排的一系列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素有延迟的或更长的过渡效果。在这种情况下你可以用 &lt;transition&gt; 组件上的 duration 属性定制一个显性的过渡持续时间 (以毫秒计)：

- 一般用法

``` vuejs
<transition :duration="1000">
  <p v-show = "show" v-bind:style = "styleobj">动画实例</p>
</transition>
```

- 定制进入和移出的持续时间

``` vuejs
<transition :duration="{ enter: 500, leave: 800 }">
  <p v-show = "show" v-bind:style = "styleobj">动画实例</p>
</transition>
```

#### 动画 JavaScript 钩子

属性中声明 JavaScript 钩子,这些钩子函数可以结合 CSS transitions/animations 使用，也可以单独使用。当只用 JavaScript 过渡的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。推荐对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响

``` javascript
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```javascript
// ...
methods: {
  // --------
  // 进入中
  // --------

  beforeEnter: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  enter: function (el, done) {
    // ...
    done()
  },
  afterEnter: function (el) {
    // ...
  },
  enterCancelled: function (el) {
    // ...
  },

  // --------
  // 离开时
  // --------

  beforeLeave: function (el) {
    // ...
  },
  // 此回调函数是可选项的设置
  // 与 CSS 结合时使用
  leave: function (el, done) {
    // ...
    done()
  },
  afterLeave: function (el) {
    // ...
  },
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {
    // ...
  }
}
```

#### 多个元素的过渡

我们可以设置多个元素的过渡，一般列表与描述：
> [!WARNING]当有相同标签名的元素切换时，需要通过 key 特性设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。

- 使用多个 v-if 的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡

``` javascript
<transition>
    <button v-if="docState === 'saved'" key="saved">
    Edit
    </button>
    <button v-if="docState === 'edited'" key="edited">
    Save
    </button>
    <button v-if="docState === 'editing'" key="editing">
    Cancel
    </button>
</transition>
```

 以上可以重写为

``` js
<!-- html -->
<transition>
  <button v-bind:key="docState">
    {{ buttonMessage }}
  </button>
</transition>
<!-- js -->
computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}
```
