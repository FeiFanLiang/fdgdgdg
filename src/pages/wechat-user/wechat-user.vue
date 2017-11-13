<template>
<div id="WechatUser">
  <el-table :data="userList" border style="width: 100%">
    <el-table-column prop="Id" label="ID" width="70"></el-table-column>
    <el-table-column prop="OpenId" label="OpenId"></el-table-column>
    <el-table-column prop="Nickname" label="昵称"></el-table-column>
    <el-table-column prop="Sex" label="性别" width="70">
        <template scope="scope">
            <span v-if="scope.row.Sex == '1'">男</span>
            <span v-if="scope.row.Sex == '2'">女</span>
        </template>
    </el-table-column>
    <el-table-column prop="Headimgurl" label="头像" show-overflow-tooltip></el-table-column>
    <el-table-column prop="City" label="城市" width="80"></el-table-column>
    <el-table-column prop="Province" label="省" width="80"></el-table-column>
    <el-table-column prop="Remark" label="推广人" width="100"></el-table-column>
    <el-table-column prop="Subscribe_time" label="关注时间"></el-table-column>
  </el-table>
</div>
</template>

<script>
import { wechatUserApi } from 'api'
export default {
  data() {
      return{
          loading: false,
          userList:[]
      }
  },
  created() {
    this.fetchData()
  },
  methods:{
      async fetchData() {
        const _self = this
        _self.loading = true
        const res = await wechatUserApi.list()
        _self.userList = res.data.Data
        _self.loading = false
      }
  }
}
</script>
<style>

</style>

