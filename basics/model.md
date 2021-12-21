# v-model指令

#### 基本使用

- input中的v-model

```javascript

    <input v-model="currentValue"/>

```

- 自定义组件中的v-model

```javascript

    父：
        <custom-component v-model="modelValue"></custom-component>

    子（部分代码）：
        ...
        this.$emit('input', [value]);
        ...
```
