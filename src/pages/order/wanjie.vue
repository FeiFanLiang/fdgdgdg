<template lang="html">
<div id="Wanjie">
    <CustomSearchCopy :configList="configList.searchFields" @searchCallback="searchCallback"></CustomSearchCopy>
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading" border>
        <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
          <template scope="scope">
            <span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
            <span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="间/晚" prop="RoomNum" width=80>
          <template scope="scope">
            <span>{{ scope.row.RoomNum }}</span>/
            <span>{{ scope.row.NightNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人" prop="Passenger" width=100></el-table-column>
        <el-table-column label="预定时间" prop="BookTime">
            <template scope="scope">
                <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
            <template scope="scope">
                <el-button size="small" @click="finsh(scope.$index, scope.row)">完结</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
</div>
</template>

<script>
import { hotelsOrderApi,paymentCheckApi } from 'api'

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      hotelsOrder: [],
      filters:{
        HotelName:'',
        PlatOrderNo:'',
        StayDateStart:'',
        BookTime:'',
        StayDateEnd:''
      }
    }
  },
  created() {
    this.fetchData()
    this.configList = hotelsOrderApi.getConfig()
  },
  methods: {
    searchCallback(filters) {
      this.filters = filters
      this.fetchData()
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
        order: 'ID',
        query:{
          HotelName:_self.filters.HotelName,
          PlatOrderNo:_self.filters.PlatOrderNo,
          StayDateStart:_self.filters.StayDateStart ? new Date(_self.filters.StayDateStart).Format('yyyy-MM-dd') : '',
          StayDateEnd:_self.filters.StayDateEnd ? new Date(_self.filters.StayDateEnd ).Format('yyyy-MM-dd') : '',
          'BookTime>':_self.filters.BookTime[0] ? new Date(_self.filters.BookTime[0]).Format('yyyy-MM-dd') : '',
          'BookTime<':_self.filters.BookTime[1] ? new Date(_self.filters.BookTime[1]).Format('yyyy-MM-dd') : '',
        }
      }
      try {
        const res = await hotelsOrderApi.finsh(options)
        _self.hotelsOrder = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async finsh($index,row){
        const _self = this
        try {
            await hotelsOrderApi.finsh2(row.ID)
            _self.$message({
                message: '设置完结成功',
                type: 'success'
            })
        } catch (e) {
            console.error(e)
            _self.$message.error('设置完结失败!!!')
        } 
    },
  }
}
</script>
<style lang="scss">
#Wanjie{
    .pagination-wrapper{
        text-align: center;
        padding: 30px;
    }
}
</style>
