<template lang="html">
<div id="FukuanList">
  <el-button size="large" style="margin:10px 0;" @click="payment">付款</el-button>
  <el-table ref="multipleTable" :data="fukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" @selection-change="handleSelectionChange" 
  :default-sort = "{prop: 'BookTime', order: 'descending'}">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="订单编号" prop="HotelOrder.PlatOrderNo" show-overflow-tooltip></el-table-column>
    <el-table-column label="酒店名称" prop="HotelOrder.HotelName" show-overflow-tooltip></el-table-column>
    <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
    <el-table-column label="入住/退房日期" width="200">
        <template scope="scope">
            <span v-if="typeof(scope.row.HotelOrder.StayDateStart) != 'undefined'">{{ scope.row.HotelOrder.StayDateStart.split(' ')[0] }}</span>/
            <span v-if="typeof(scope.row.HotelOrder.StayDateEnd) != 'undefined'">{{ scope.row.HotelOrder.StayDateEnd.split(' ')[0] }}</span>
        </template>
    </el-table-column>
    <el-table-column label="间/晚" prop="RoomNum">
        <template scope="scope">
        <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
        <span>{{ scope.row.HotelOrder.NightNum }}</span>
        </template>
    </el-table-column>
    <el-table-column label="入住人" prop="HotelOrder.Passenger"></el-table-column>
    <el-table-column label="预定时间" prop="HotelOrder.BookTime" width="80" sortable>
        <template scope="scope">
            <span v-if="typeof(scope.row.HotelOrder.BookTime) != 'undefined'">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="金额" prop="AmountUse"></el-table-column>
  </el-table>
  <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
  </div>

</div>
</template>
<script>
import { hotelPaymentInfoApi  } from 'api'

export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            count: 0,
            fukuanList: [],
            loading:false,
            multipleSelection: [],
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        async fetchData(currentPage,pageSize) {
            const _self = this
            _self.loading = true
            _self.showButton = false
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelPaymentInfoApi.pay(options)
                _self.fukuanList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async payment(){
            const _self = this;
            this.$router.push({
                path: 'FuKuan',
                query: {
                    multipleSelection: _self.multipleSelection
                }
            })
        },
    }
}
</script>


