# 函数式组件

#### 前沿

在日常开发中，我们经常会开发一些纯展示性的业务组件，比如一些详情页面，列表界面等，它们有一个共同的特点是：

- 只要你传入数据，我就进行展现。

- 不需要有内部状态，不需要在生命周期钩子函数里面做处理。

#### 为什么要用它

- 函数式组件不需要实例化，无状态，没有生命周期，所以渲染性能要好于普通组件

- 函数式组件结构更简单，代码结构更清晰

#### 函数式组件与普通组件的区别

- 函数式组件需要在声明组件是指定functional。

- 函数式组件不需要实例化，所以没有this，this通过render函数的第二个参数来代替。

- 函数式组件没有生命周期钩子函数，不能使用计算属性，watch等等。

- 函数式组件不能通过$emit对外暴露事件，调用事件只能通过context.listeners.click的方式调用外部传入的事件。

- 因为函数式组件是没有实例化的，所以在外部通过ref去引用组件时，实际引用的是HTMLElement。

- 函数式组件的props可以只声明一部分或者全都不声明，所有没有在props里面声明的属性都会被自动隐式解析为prop，而普通组件所有未声明的属性都被解析到$attrs里面，并自动挂载到组件根元素上面(可以通过inheritAttrs属性禁止)。

#### 使用场景

上面已经反复强调，凡是不需要实例化，无状态，没有生命周期的组件，除了props之外没有别的配置项，都可以改写成函数式组件。

上面render组件，就可以改写为：

``` vue
<!-- 组件 -->
Vue.component('anchored-heading', {
    functional: true,
    props: {
        level: {
            type: Number,
            required: true
        }
    }，
    render (h, context) {
        const $slots = context.slots();
        const { level } = context.props;
        return h('h' + level,
            // 如果只有default, 可直接用context.children， 其他的需要使用context.slots();
            $slots.default || context.children
        ));
    }
});
```
