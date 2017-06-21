<template lang="html">
  <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
    v-loading="loading"
    border
    row-key="ID"
    >
    <!-- <el-table-column sortable prop="ID" label="ID" width="180" show-overflow-tooltip></el-table-column>
    <el-table-column sortable prop="AccountName"  label="账户名称" show-overflow-tooltip></el-table-column>
    <el-table-column sortable prop="AccountNum"  label="银行帐户" show-overflow-tooltip></el-table-column>
    <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column> -->
      <el-table-column v-for="(item,index) in params" :key="index" sortable :prop="item.prop" :label="item.label"  show-overflow-tooltip></el-table-column>
<slot></slot>
  </el-table>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      loading: false,
      params: [
        {
          prop: 'ID',
          label: 'ID'
        },
        {
          prop: 'AccountName',
          label: '账户名称'
        },
        {
          prop: 'AccountNum',
          label: '银行帐户'
        },
        {
          prop: 'Remark',
          label: '备注'
        }
      ]
    };
  }
};
</script>

<style lang="css">
</style>
