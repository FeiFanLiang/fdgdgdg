<template lang="html">
<div id="CheckShoukuan">
  <el-button size="large" style="margin:10px 0;" @click="collection">收款</el-button>
  <el-table ref="multipleTable" :data="shoukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip></el-table-column>
    <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
    <el-table-column label="城市" prop="City"></el-table-column>
    <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
    <el-table-column label="入住/退房日期" width="200">
        <template scope="scope">
        <span>{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
        <span>{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
        </template>
    </el-table-column>
    <el-table-column label="间/晚" prop="RoomNum">
        <template scope="scope">
        <span>{{ scope.row.RoomNum }}</span>/
        <span>{{ scope.row.NightNum }}</span>
        </template>
    </el-table-column>
    <el-table-column label="入住人" prop="Passenger"></el-table-column>
    <el-table-column label="到店时间" prop="ArrivalTime"></el-table-column>
    <el-table-column label="预定时间" prop="BookTime" width="80">
        <template scope="scope">
            <span>{{ scope.row.BookTime.substring(5,16) }}</span>
        </template>
    </el-table-column>
  </el-table>
  <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
  </div>

</div>
</template>
<script>
import { hotelsOrderApi,paymentCheckApi  } from 'api'

export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            count: 0,
            shoukuanList: [],
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
                const res = await hotelsOrderApi.checkIn(options)
                _self.shoukuanList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async collection(){
            const _self = this;
            this.$router.push({
                path: 'Shoukuan',
                query: {
                    multipleSelection: _self.multipleSelection
                }
            })
        }
    }
}
</script>


