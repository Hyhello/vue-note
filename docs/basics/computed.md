# 计算属性及监听

#### 前言

计算属性，说到这个词我们可能最先想到的就是一个数学表达式计算，如：1 + 2 = 3。我们今天说的这个实际上跟这个类似，也有不同。那么有哪些异同点呢？

监听属性，监听我们可能最先想到的就是监听一个文件？一个属性？。唔~，很接近了，我们接着往下看~ :stuck_out_tongue_winking_eye:

#### 计算属性（computed）

模板内的表达式非常便利，但是设计它们的初衷是用于简单运算的。在模板中放入太多的逻辑会让模板过重且难以维护。例如：

``` vue
<div id="example">
    {{ message.split('').reverse().join('') }}
</div>
```

所以，对于任何复杂逻辑，你都应当使用计算属性。

计算属性只有这么一点用处吗？是不是感觉有点鸡肋？当然不是接着往下看~

##### 计算属性缓存

计算属性缓存无非就是通过计算后的属性会被缓存起来（类似AMD，CMD, commonjs那样）那样，属性加载之后会把结果缓存下来，下次使用不会再次计算，节约性能。

##### 计算属性监听

Vue 提供了一种更通用的方式来观察和响应 Vue 实例上的数据变动：侦听属性。当你有一些数据需要随着其它数据变动而变动时，你很容易滥用 watch——特别是如果你之前使用过 AngularJS。然而，通常更好的做法是使用计算属性而不是命令式的 watch 回调。

##### 计算属性setter与getter

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter，此属性在封装组件时候用处较大，如：

``` vue

父：
<custom-component v-model="modelValue"></custom-component>

子（部分代码）：
...
computed: {
    currentValue: {
        set (val) {
            this.$emit('input', val);
        },
        get () {
            return this.value;
        }
    }
}
...

```

看起来是不是高大上多了？

#### 监听属性（watchs）

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

##### $watch方法

可通过vm.$watch(name, function, [options]); 方式来注册侦听器

##### watchs钩子

可在当前实例里面添加watchs钩子，如（部分代码）：

- 监听一个属性

``` javascript
...
watchs: {
    name (val) {
        // 你的代码
    }
}
...
```

- 监听一个对象

``` javascript
...
watchs: {
    name: {
        deep: true,
        handler (val) {
            // 你的代码
        }
    }
}
...
```

- 首次触发

``` javascript
...
watchs: {
    name: {
        immediate: true,
        handler (val) {
            // 你的代码
        }
    }
}
...
```
