# 混合类

#### 前言

当初刚接触vue时，听到混入（混合类）这个名词，我也是很懵的，混合类是什么？它的用途是什么？带着这样的疑问，我找了一些资料。原来它类似于类中的基类（父类）。
我们知道基类一般都是用来写公共部分，子类通过extend继承并基于它去扩展的。那么vue中混合类如何使用呢？

#### 使用方法

``` javascript

    const mixins = {
        data () {
            return {

            };
        }
    };

    export default {
        mixins: [ mixins ]      // 此处引入上面的混合类 相当于extend了
    };
```

> [!WARNING]
> 合并规则：1. methods, components 和 directives这几个将合并到同一个对象内。如果键冲突则组件的选项优先（即会被子类重写）。
