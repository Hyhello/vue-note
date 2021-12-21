# 属性绑定v-bind指令

#### 基本使用

- v-bind用于绑定数据和元素属性

例如:绑定a标签的href属性

```javascript
    var app = new Vue({
        template: "<a v-bind:href="link"/>",
        data: {
            link: "http://www.baidu.com"
        }
    });
```

以上代码中，使用v-bind绑定了a标签的href属性，当a标签被点击时，会根据对应vue中的对应的link数据进行跳转到http://www.baidu.com

- v-bind简写

由于使用频繁，通常将v-bind:属性名=" "的格式简写成:属性名=" "，如：

```javascript
    var app = new Vue({
        template: "<a :href="link"/>",
        data: {
            link: "http://www.baidu.com"
        }
    });
```
