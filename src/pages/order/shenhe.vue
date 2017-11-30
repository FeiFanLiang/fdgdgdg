<template lang="html">
<div id="HotelsOrder">
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading" border :default-sort = "{prop: 'BookTime', order: 'descending'}">
        <el-table-column label="订单号" prop="PlatOrderNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="订单渠道" prop="ThreePlatID">
          <template scope="scope">
              <div v-for="item in ThreePlatID">
                <span v-if="scope.row.ThreePlatID==item.ID">{{item.PlatName}}</span>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
          <template scope="scope">
            <span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
            <span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人" prop="Passenger"></el-table-column>
        <el-table-column label="预定时间" prop="BookTime" sortable>
            <template scope="scope">
                <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template scope="scope">
                <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">审核</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
</div>
</template>

<script>
import { hotelsOrderApi,hotelThreePlatInfoApi } from 'api'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      hotelsOrder: [],
      ThreePlatID: [],
    }
  },
  created() {
    this.ThreePlat()
    this.fetchData()
  },
  methods: {
    async ThreePlat() {
      const res = await hotelThreePlatInfoApi.getList()
      this.ThreePlatID = res.data
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'BookTime'
      }
      try {
        const res = await hotelsOrderApi.check(options)
        _self.hotelsOrder = res.data.Data
        _self.active = 0
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    clickEditBtn($index, row) {
      const _self = this
      _self.$router.push({
        name: '酒店订单信息编辑',
        params: {
          ID: row.ID,
          POrderID: row.ID,
          HotelName: row.HotelName,
          type:1 // 审核
        }
      })
    }

  }
}
</script>
<style lang="scss">
#HotelsOrder{
    .pagination-wrapper{
      text-align: center;
      margin: 10px;
    }
}
</style>
