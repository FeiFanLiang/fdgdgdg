<template lang="html">
<div id="HST">
    <el-form label-width="80px">
      <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="酒店名称">
              <el-input v-model="filters.HotelName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单号">
              <el-input v-model="filters.PlatOrderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="入住日期">
              <el-date-picker  v-model="filters.StayDateStart" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="退房日期">
              <el-date-picker  v-model="filters.StayDateEnd" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
            <el-form-item label="预定日期">
              <el-date-picker  v-model="filters.BookTime" type="daterange"></el-date-picker>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <CustomTableCopy :list="hotelsOrder" :loading="loading" :configList="configList.listFields" @successCallBack="fetchData">
      <el-table-column label="订单渠道" prop="ThreePlatID" width=80 slot="ThreePlatID">
        <template scope="scope">
            <div v-for="item in ThreePlatID">
              <span v-if="scope.row.ThreePlatID==item.ID">{{item.PlatName}}</span>
            </div>
        </template>
      </el-table-column>
      <el-table-column label="入住/退房日期" width="200" slot="StayDateStart">
        <template scope="scope">
          <span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
          <span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预定时间" prop="BookTime" sortable slot="BookTime">
          <template scope="scope">
              <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
          </template>
      </el-table-column>
      <el-table-column label="操作" width="100" slot="right-three">
          <template scope="scope">
              <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          </template>
      </el-table-column>
    </CustomTableCopy>
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
      filters:{
        HotelName:'',
        PlatOrderNo:'',
        StayDateStart:'',
        BookTime:'',
        StayDateEnd:''
      },
      type:''
    }
  },
  created() {
    const _self = this
    _self.type = _self.$route.name
    _self.ThreePlat()
    _self.fetchData()
    _self.configList = hotelsOrderApi.getConfig()
  },
  watch:{
    "$route":function(val){
        this.type = val.name
        this.fetchData() 
        this.filters = {
          HotelName:'',
          PlatOrderNo:'',
          StayDateStart:'',
          BookTime:'',
          StayDateEnd:''
        }
    }
  },
  methods: {
    hotelsOrderSearch(filters) {
      const _self = this
      this.filters = filters
      _self.fetchData()
    },
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
        order: 'BookTime',
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
        if(_self.type == '待回填列表'){
            const res = await hotelsOrderApi.back(options)
            _self.hotelsOrder = res.data.Data
            _self.count = res.data.Count
        }
        if(_self.type == '待审核列表'){
            const res = await hotelsOrderApi.check(options)
            _self.hotelsOrder = res.data.Data
            _self.count = res.data.Count
        }
        if(_self.type == '待退改单列表'){
            const res = await hotelsOrderApi.tuigai(options)
            _self.hotelsOrder = res.data.Data
            _self.count = res.data.Count
        }
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    clickEditBtn($index, row) {
      const _self = this
      let type = ''
      if(_self.type == '待回填列表'){
        type = '回填'
      }
      if(_self.type == '待审核列表'){
        type = '审核'
      }
      if(_self.type == '待退改单列表'){
        type = '退改'
      }
      _self.$router.push({
          name: '酒店订单信息编辑',
          params: {
              ID: row.ID,
              POrderID: row.ID,
              HotelName: row.HotelName,
              type:type
          }
      })
    }
  }
}
</script>
<style lang="scss">
#HST{
    .pagination-wrapper{
      text-align: center;
      margin: 10px;
    }
}
</style>
