<template lang="html">
<div id="OtherList">
    <div class="block">
        <span class="wrapper">
            <el-button type="info" @click="fetchData">全部完成订单</el-button>
            <el-button type="success" @click="check">待审核列表</el-button>
            <el-button type="warning" @click="finsh">待完结列表</el-button>
            <el-button type="danger" @click="pay">待付款列表</el-button>
            <el-button type="info" @click="checkOut">待对账付款列表</el-button>
            <el-button type="success" @click="checkIn">待对账收款列表</el-button>
        </span>
    </div>
  <el-table :data="orderList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
    <el-table-column prop="OrderNo" label="订单编号" show-overflow-tooltip></el-table-column>
    <el-table-column prop="OrderTitle" label="订单标题"></el-table-column>
    <el-table-column prop="PlatOrderNo" label="其他订单号" width="130"></el-table-column>
    <el-table-column prop="PlatOrderState" label="其他订单状态"></el-table-column>
    <el-table-column prop="PlatOrderType" label="其他订单类型" width="90"></el-table-column>
    <el-table-column prop="FromID" label="来源订单ID"></el-table-column>
    <el-table-column prop="HotelPolicyID" label="政策ID"></el-table-column>
    <el-table-column prop="OrderState" label="订单状态" width="100"></el-table-column>
    <el-table-column prop="OrderType" label="订单类型" width="100"></el-table-column>
    <el-table-column prop="HotelBookingNo" label="酒店预定号"></el-table-column>
    <el-table-column label="操作" v-if="showButton" width="100">
        <template scope="scope">
            <el-button type="text" @click="clickButton(scope.row)">{{buttonText}}</el-button>
        </template>
    </el-table-column>
  </el-table>
  <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
  </div>
</div>
</template>
<script>
import { hotelsOrderApi } from 'api'

export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            count: 0,
            orderList: [],
            buttonText:'',
            showButton:true,
            loading:false,
            flag:'a'
        }
    },
    created() {
        this.fetchData()
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val
            if(this.flag=='a' ){
                this.fetchData(1, this.pageSize)
            }
            if(this.flag=='s'){
                this.check(1, this.pageSize)
            }
            if(this.flag=='w'){
                this.check(1, this.pageSize)
            }
            if(this.flag=='f'){
                this.pay(1, this.pageSize)
            }
            if(this.flag=='df'){
                this.checkOut(1, this.pageSize)
            }
            if(this.flag=='ds'){
                this.checkIn(1, this.pageSize)
            }
            //this.shezhi(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            if(this.flag=='a'){
                this.fetchData(this.currentPage)
            }
            if(this.flag=='s'){
                this.check(this.currentPage)
            }
            if(this.flag=='w'){
                this.check(this.currentPage)
            }
            if(this.flag=='f'){
                this.pay(this.currentPage)
            }
            if(this.flag=='df'){
                this.checkOut(this.currentPage)
            }
            if(this.flag=='ds'){
                this.checkIn(this.currentPage)
            }
            //this.shezhi(this.currentPage)
        },
        // shezhi(currentPage,pageSize){
        //     const _self = this
        //     const options = {
        //         pageIndex: currentPage || _self.currentPage,
        //         pageSize: pageSize || _self.pageSize,
        //         order: 'ID'
        //     }
        // },
        async fetchData(currentPage,pageSize) {
            const _self = this
            _self.loading = true
            _self.showButton = false
            this.flag='a'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.all(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async check(currentPage,pageSize){
            const _self = this
            _self.buttonText = '审核'
            _self.showButton = true
            _self.loading = true
            _self.flag = 's'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.check(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async finsh(currentPage,pageSize){
            const _self = this
            _self.buttonText = '完结'
            _self.showButton = true
            _self.loading = true
            _self.flag = 'w'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.finsh(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async pay(currentPage,pageSize){
            const _self = this
            _self.showButton = false
            _self.loading = true
            _self.flag = 'f'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.pay(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async checkOut(currentPage,pageSize){
            const _self = this
            _self.showButton = false
            _self.loading = true
            _self.flag = 'df'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.checkOut(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async checkIn(currentPage,pageSize){
            const _self = this
            _self.showButton = false
            _self.loading = true
            _self.flag = 'ds'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.checkIn(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async clickButton(row){
            const _self = this
            try {
               if(_self.buttonText == '审核'){
                    console.log('审核')
                    await hotelsOrderApi.check2(row.ID)
                    _self.check();
                }
                if(_self.buttonText == '完结'){
                    console.log('完结')
                    await hotelsOrderApi.finsh2(row.ID)
                    _self.finsh()
                }
                _self.$message({
                    message: _self.buttonText+'成功',
                    type: 'success'
                })
            } catch (e) {
                _self.$message.error(_self.buttonText+'失败!!!')
            }
        }
    }
}
</script>
<style lang="scss">
#OtherList{
    .pagination-wrapper{
        text-align: center;
        margin: 10px;
    }
}
</style>

