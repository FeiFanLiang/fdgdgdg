<template>
<div id="visa">
  <el-table :data="visaList" border style="width: 100%">
    <el-table-column prop="Country" label="签证国家"></el-table-column>
    <el-table-column prop="VisaType" label="签证类型"></el-table-column>
    <el-table-column prop="ContactsName" label="姓名" show-overflow-tooltip></el-table-column>
    <el-table-column prop="ContactsPhone" label="手机"></el-table-column>
    <el-table-column prop="ManNum" label="人数" width="80"></el-table-column>
    <el-table-column prop="UseDate" label="使用日期" width="100"></el-table-column>
  </el-table>
</div>
</template>

<script>
import { visaApi } from 'api'
export default {
  data() {
      return{
          loading: false,
          visaList:[]
      }
  },
  created() {
    this.fetchData()
  },
  methods:{
      async fetchData() {
        const _self = this
        _self.loading = true
        const res = await visaApi.getList()
        _self.visaList = res.data.Data
        _self.loading = false
      }
  }
}
</script>
<style>

</style>

