<template lang="html">
<div id="CheckShoukuan">
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
                <el-button size="large" style="margin:10px 0;" @click="collection">收款</el-button>
            </el-col>
        </el-row>
    </el-form>
  <el-table ref="multipleTable" :data="shoukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" @selection-change="handleSelectionChange"
  :default-sort = "{prop: 'BookTime', order: 'descending'}">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="订单编号" prop="HotelOrder.PlatOrderNo" show-overflow-tooltip></el-table-column>
    <el-table-column label="酒店名称" prop="HotelOrder.HotelName" show-overflow-tooltip></el-table-column>
    <el-table-column label="房型" prop="HotelOrder.Room" show-overflow-tooltip></el-table-column>
    <el-table-column label="入住/退房日期" width="200">
        <template scope="scope">
        <span v-if="scope.row.HotelOrder.StayDateStart != null">{{ scope.row.HotelOrder.StayDateStart.split(' ')[0] }}</span>/
        <span v-if="scope.row.HotelOrder.StayDateEnd != null">{{ scope.row.HotelOrder.StayDateEnd.split(' ')[0] }}</span>
        </template>
    </el-table-column>
    <el-table-column label="间/晚" width="80">
        <template scope="scope">
            <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
            <span>{{ scope.row.HotelOrder.NightNum }}</span>
        </template>
    </el-table-column>
    <el-table-column label="入住人" prop="HotelOrder.Passenger"></el-table-column>
    <el-table-column label="预定时间" prop="HotelOrder.BookTime" width="80" sortable>
        <template scope="scope">
            <span v-if="scope.row.HotelOrder.BookTime != null">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="预计到款时间" prop="ExpectGetMoney" width="80">
        <template scope="scope">
            <span v-if="scope.row.ExpectGetMoney != null">{{ scope.row.ExpectGetMoney.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="金额" prop="AmountUse" width="100"></el-table-column>
    <el-table-column label="状态" prop="StateCheck">
        <template scope="scope">
            <span v-if="scope.row.StateCheck == 0">未对账</span>
            <span v-if="scope.row.StateCheck == 1">未到款</span>
            <span v-if="scope.row.StateCheck == 2">结清</span>
        </template>
    </el-table-column>
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
            shoukuanList: [],
            loading:false,
            multipleSelection: [],
            filters:{
                HotelName:'',
                PlatOrderNo:'',
                StayDateStart:'',
                BookTime:'',
                StayDateEnd:'',
                ExpectSettlement:''
            }
        }
    },
    mounted(){
        this.filters.ExpectSettlement = new Date()
        this.fetchData()
    },
    methods:{
        hotelsOrderSearch() {
            const _self = this
            this.filters.ExpectSettlement = ''
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
                    'ExpectSettlement<=':_self.filters.ExpectSettlement ? _self.filters.ExpectSettlement.Format('yyyy-MM-dd') : '',
                }
            }
            try {
                const res = await hotelPaymentInfoApi.checkIn(options)
                _self.shoukuanList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async collection(){
            const _self = this;
            if(_self.multipleSelection.length!=0){
                this.$router.push({
                    path: 'Shoukuan',
                    query: {
                        multipleSelection: _self.multipleSelection
                    }
                })
            }else{
                this.$message({
                    message: '请选择收款订单',
                    type: 'warning'
                });
            }
        }
    }
}
</script>


