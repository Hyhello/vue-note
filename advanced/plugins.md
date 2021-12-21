# 插件

#### 此处可能没啥好讲的，直接上代码：

- index.js

``` javascript
    import { $indicator } from './indicator.js';

    const install = (Vue) => {
        Vue.prototype.$indicator = $indicator;
    };

    export default install;
```

- indicator.js

``` javascript
    import Vue from 'vue';
    import Indicator from './indicator.vue';
    const Transfr = Vue.extend(Indicator); // extend创建的是一个组件构造器

    export const $indicator = (() => {
        const instance = new Transfr().$mount();    // 实例化，并挂载一个空元素上面
        // 添加到body上面
        document.body.appendChild(instance.$el);
        // 返回这个实例
        return instance;
    })();
```

- indicator.vue

    戳一戳
    :point_right:
    [**查看**](https://github.com/Hyhello/vue-note/blob/master/assets/example/indicator.vue)
