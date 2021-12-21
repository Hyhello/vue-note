# 事件处理

#### 前言

概念：就是可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

争对事件简单的介绍以下几种：

1. 别名

2. 自定义事件

3. 修饰符

#### 别名

v-on: 别名：“@”

#### 自定义事件

- 一个实例里面：

``` javascript

vm.$on('name', cb);

vm.$emit('name', [aruments]); // 触发name 事件

```

- 不同组件

``` vue

父：

    <my-component @change="handleChange"></my-component>

子：

    this.$emit('change', [arguments]);    // 触发父组件handleChange函数

```

#### 修饰符

##### 常用修饰符

- stop

``` vue

<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

```

- prevent

``` vue

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

```

> [!TIP]
> 修饰符较多，不做详细介绍，有兴趣戳一戳
> :point_right:
> [**此处**](https://cn.vuejs.org/v2/guide/events.html#%E4%BA%8B%E4%BB%B6%E4%BF%AE%E9%A5%B0%E7%AC%A6)

##### 自定义修饰符

``` javascript

Vue.config.keyCodes = {
    "play-pause": 179
}

<input type="text" @keyup.play-pause="method" />

```

#### 延申（事件句柄eventBus）

简单来说这就是js订阅者模式。

我们可以借助npm package里面eventBus。来实现自定义事件。但是在vue里面本身就有这个，我们可以按照如下来实现：

``` javascript

const Vue = require('vue');

const eventBus = new Vue();

Object.defineProperties(Vue.prototype, {
    $on: {
        get: eventBus.$on,
        enumerable: true
    },
    $off: {
        get: eventBus.$off,
        enumerable: true
    },
    $emit: {
        get: eventBus.$emit,
        enumerable: true
    },
    $once: {
        get: eventBus.$once,
        enumerable: true
    }
});

```
