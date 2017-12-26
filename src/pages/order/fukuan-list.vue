<template lang="html">
<div id="FukuanList">
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
            <el-button style="margin:10px 0;" @click="payment">付款</el-button>
        </el-col>
        </el-row>
    </el-form>
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
    <el-table-column label="间/晚" prop="RoomNum" width="80">
        <template scope="scope">
        <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
        <span>{{ scope.row.HotelOrder.NightNum }}</span>
        </template>
    </el-table-column>
    <el-table-column label="入住人" prop="HotelOrder.Passenger" width="100"></el-table-column>
    <el-table-column label="预定时间" prop="HotelOrder.BookTime" width="150" sortable>
        <template scope="scope">
            <span v-if="typeof(scope.row.HotelOrder.BookTime) != 'undefined'">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="金额" prop="AmountUse" width="100"></el-table-column>
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
            filters:{
                HotelName:'',
                PlatOrderNo:'',
                StayDateStart:'',
                BookTime:'',
                StayDateEnd:''
            }
        }
    },
    mounted(){
        this.fetchData()
    },
    methods:{
        hotelsOrderSearch() {
            const _self = this
            _self.fetchData()
        },
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
            if(_self.multipleSelection.length!=0){
                this.$router.push({
                    path: 'FuKuan',
                    query: {
                        multipleSelection: _self.multipleSelection
                    }
                })
            }else{
                this.$message({
                    message: '请选择付款订单',
                    type: 'warning'
                });
            }
        },
    }
}
</script>


