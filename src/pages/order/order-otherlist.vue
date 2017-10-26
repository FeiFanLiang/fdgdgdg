<template lang="html">
<div id="OtherList">
    <div class="block">
        <span class="wrapper">
            <el-button type="info" @click="fetchData">全部订单</el-button>
            <el-button type="warning" @click="all">全部完成订单</el-button>
            <el-button type="success" @click="check">待审核列表</el-button>
            <el-button type="warning" @click="finsh">待完结列表</el-button>
            <el-button type="danger" @click="pay">待付款列表</el-button>
            <el-button type="info" @click="checkOut">待对账付款列表</el-button>
            <el-button type="success" @click="checkIn">待对账收款列表</el-button>
        </span>
    </div>
    <el-button size="large" style="margin:10px 0;" v-if="flag=='allShow'" @click="collection">收款</el-button>
    <el-button size="large" style="margin:10px 0;" v-if="flag=='allShow'" @click="payment">付款</el-button>
  <el-table ref="multipleTable" :data="orderList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column prop="OrderTitle" label="订单标题"></el-table-column>
    <el-table-column prop="Passenger" label="入住人"></el-table-column>
    <el-table-column prop="AmountYingFu" label="金额"></el-table-column>
    <el-table-column label="入离日期">
        <template scope="scope">
            {{scope.row.StayDateStart.substring(0,10)}}
            至
            {{scope.row.StayDateStart.substring(5,10)}}
        </template>
    </el-table-column>
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
import { hotelsOrderApi,paymentCheckApi  } from 'api'

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
            flag:'allShow',
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
            if(this.flag=='allShow' ){
                this.fetchData(1, this.pageSize)
            }
            if(this.flag=='a' ){
                this.all(1, this.pageSize)
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
        },
        handleCurrentChange(val) {
            this.currentPage = val
            if(this.flag=='allShow'){
                this.fetchData(this.currentPage)
            }
            if(this.flag=='a'){
                this.all(this.currentPage)
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
        },
        async fetchData(currentPage,pageSize) {
            const _self = this
            _self.loading = true
            _self.showButton = false
            this.flag='allShow'
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'ID'
            }
            try {
                const res = await hotelsOrderApi.fetch(options)
                _self.orderList = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async all(currentPage,pageSize){
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


