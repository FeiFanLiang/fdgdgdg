<template lang="html">
  <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
  :row-class-name="className"
    v-loading="loading"
    border
    row-key="ID"
    >
    <slot name="left-one"></slot>
    <slot name="left-two"></slot>
    <slot name="left-three"></slot>
    <!-- <el-table-column sortable prop="ID" label="ID" width="180" show-overflow-tooltip></el-table-column>
    <el-table-column sortable prop="AccountName"  label="账户名称" show-overflow-tooltip></el-table-column>
    <el-table-column sortable prop="AccountNum"  label="银行帐户" show-overflow-tooltip></el-table-column>
    <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column> -->
    <el-table-column v-if="item.is" v-for="(item,index) in configList" :key="index" sortable :prop="item.name" :label="item.label"  show-overflow-tooltip>
      <template scope="scope">
        <Popover :rowData="scope.row" :propData="item" :index="index" :editMethod="editMethod" @successCallBack="successCallBack"></Popover>
      </template>
    </el-table-column>
    <slot name="right-one"></slot>
    <slot name="right-two"></slot>
    <slot name="right-three"></slot>
  </el-table>
</template>

<script>
import Popover from './popover'
export default {
  components: {
    Popover
  },
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
    loading: {
      type: Boolean,
      default: false
    },
    className: '',
    editMethod: ''
  },
  data() {
    return {}
  },
  methods: {
    successCallBack() {
      this.$emit('successCallBack')
    }
  }
}
</script>

<style lang="css">
</style>
