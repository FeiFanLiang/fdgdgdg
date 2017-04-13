# Vue-Style-Guide

### 1 Vue属性书写顺序

```javascript
export default {
  mixins,
  data,
  props,
  store，
  computed，
  route,
  created，
  ready，    // => 生命周期顺序不赘述，vue2.0中已废弃ready，需要使用mount代替
  methods,
  event,
  watch,
  components
}
```



### 2 组件

#### 2.1 命名

组件以大驼峰式命名法命名(首字母也需要大写)

```html
<template>
  <my-components></my-components>
</template>
<script>
  import MyComponents from './MyComponents.vue'

  export default {
  components: {
  	  MyComponents
    }
  }
</script>

```
#### 2.2 Vue组件的书写顺序
建议：template script style 的顺序书写
```vue
<template></template>
<script></script>
<style></style>
```
#### 2.3 组件引用

```javascript
  import MyComponentsA from './MyComponentsA.vue'  
  import MyComponentsB from './MyComponentsB.vue'
  import MyComponentsC from './MyComponentsC.vue'
  import MyComponentsD from './MyComponentsD.vue'
  export default {
    components: {
  	  MyComponentsA,
      MyComponentsB,
      MyComponentsC,
      MyComponentsD,
    }
  }
```

### 3 事件
尽量采用简写
```html
<!-- bad -->
<a v-on:click="pass()">pass</a>

<!-- good -->
<a @click="pass">pass</a>
```
