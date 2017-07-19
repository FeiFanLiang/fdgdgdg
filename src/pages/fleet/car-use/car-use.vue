<template lang="html">
    <div id="car-use-page">
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
        <CustomTable :list="list" :configList="configList.listFields" element-loading-text="拼命加载中" v-loading="loading">
          <el-table-column type="expand">
              <template scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item>
                          <p>用车描述：{{props.row.Destination}}</p>
                      </el-form-item>
                  </el-form>
              </template>
          </el-table-column>
        </CustomTable>
        <!-- <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" row-key="ID" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>用车描述：{{props.row.Destination}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID" width="55"></el-table-column>
            <el-table-column prop="Car.CarMode" label="车型"></el-table-column>
            <el-table-column prop="Driver.Name" label="司机姓名"></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="StartMileage" label="起始里程数"></el-table-column>
            <el-table-column prop="EndMileage" label="结束里程数"></el-table-column>
            <el-table-column prop="StartTime" label="开始时间" width="150"></el-table-column>
            <el-table-column prop="EndTime" label="结束时间" width="150"></el-table-column>
            <el-table-column prop="Channel" label="渠道"></el-table-column>
        </el-table> -->
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { carUseApi } from 'api'

export default {
  created() {
    this.searchForm.startTime = new Date(
      new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01'
    ).Format('yyyy-MM-dd')
    this.searchForm.endTime = new Date().Format('yyyy-MM-dd')
    this.fetchData()
    this.configList = carUseApi.getConfig()
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      searchForm: {
        startTime: '',
        endTime: ''
      },
      pickerOptions: {}
      // runStatusList: [{
      //     value: 'Stopping',
      //     label: '不可用'
      // }, {
      //     value: 'Await',
      //     label: '待命'
      // }, {
      //     value: 'Serviceing',
      //     label: '运行中'
      // }, {
      //     value: 'Backing',
      //     label: '回程中'
      // }]
    }
  },

  methods: {
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'ID',
        query: {
          startTime: new Date(_self.searchForm.startTime).Format('yyyy-MM-dd'),
          endTime: new Date(_self.searchForm.endTime).Format('yyyy-MM-dd')
        }
      }
      try {
        const res = await carUseApi.listByQuery(options)
        _self.list = res.data.Data
        for (let [index, elem] of _self.list.entries()) {
          _self.list[index].StartTime = new Date(
            _self.list[index].StartTime
          ).Format('yyyy-MM-dd hh:mm')
          _self.list[index].EndTime = new Date(
            _self.list[index].EndTime
          ).Format('yyyy-MM-dd hh:mm')
        }
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    }
  }
}
</script>
<style lang="scss" scoped>
#car-use-page {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
}
</style>
