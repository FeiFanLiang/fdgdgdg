<template lang="html">
  <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
  :row-class-name="className"
    v-loading="loading"
    border
    row-key="ID"
    >
    <slot name="left-one"></slot>
    <slot name="left-two"></slot>
    <el-table-column v-if="item.is && item.type != 'slot'" v-for="(item,index) in configList" :key="index" :prop="item.name" :label="item.label"  show-overflow-tooltip :width="item.width"></el-table-column>
    <slot v-for="(item,index) in configList" :name="item.name"></slot>
    <slot name="right-one"></slot>
    <slot name="right-two"></slot>
    <slot name="right-three"></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    configList: {
      type: Array,
      default: () => {
        return []
      }
    },
    className: ''
  },
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style lang="css">
</style>
