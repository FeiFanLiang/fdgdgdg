<template lang="html">
    <div id="driver-evaluate-page">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="开始日期">
                <el-date-picker v-model="searchForm.startTime" type="date" placeholder="选择开始日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期">
                <el-date-picker v-model="searchForm.endTime" type="date" placeholder="选择结束日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData()">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" row-key="ID" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>总留言：{{props.row.Remark}}</p>
                            <p>总评论：{{props.row.Label}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="Driver" label="工号"></el-table-column>
            <el-table-column prop="Openid" label="司机姓名"></el-table-column>
            <el-table-column sortable prop="field3" label="关注人次"></el-table-column>
            <el-table-column sortable prop="field1" label="评论次数"></el-table-column>
            <el-table-column sortable prop="Rate" label="总分" width="185"></el-table-column>
            <el-table-column sortable prop="field2" label="平均分" width="195">
                <template scope="scope">
                    <el-rate v-model="scope.row.field2" disabled show-text text-color="#ff9900" text-template="{value}">
                    </el-rate>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { driverEvaluateApi } from 'api'

export default {
  created() {
    this.searchForm.startTime = new Date(
      new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01'
    ).Format('yyyy-MM-dd')
    this.searchForm.endTime = new Date().Format('yyyy-MM-dd')
    this.fetchData()
  },
  data() {
    return {
      list: [],
      searchForm: {
        startTime: '',
        endTime: ''
      },
      pickerOptions: {},
      loading: false
    }
  },
  methods: {
    async fetchData() {
      const _self = this
      _self.loading = true
      ;(_self.searchForm.startTime = new Date(
        _self.searchForm.startTime
      ).Format('yyyy-MM-dd')), (_self.searchForm.endTime = new Date(
        _self.searchForm.endTime
      ).Format('yyyy-MM-dd'))
      try {
        const res = await driverEvaluateApi.listByQuery(_self.searchForm)
        _self.list = res.data.Data
        for (let [index, elem] of _self.list.entries()) {
          _self.list[index].field2 = Number(_self.list[index].field2)
        }
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#driver-evaluate-page {
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 0 10px 16px !important;
    }
    .el-autocomplete,
    .el-dropdown {
        display: block !important;
    }
}
</style>
