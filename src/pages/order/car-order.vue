<template lang="html">
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="filters.labelVal" placeholder="请选择">
                    <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入电话" v-model="filters.Phone" v-show="filters.labelVal == '1'"></el-input>
                <el-input placeholder="请输入时间段" v-model="filters.Time" v-show="filters.labelVal == '2'"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="handleSearch(filters)">搜索</el-button>
            </el-col>
        </el-row>
        <el-table :data="carList" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column prop="OrderKey" label="订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="BookTime" label="预定时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="13668846822" label="联系人电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="起点" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="UseTime" label="用车日期" show-overflow-tooltip></el-table-column>
            <el-table-column label="付款状态" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.PayStatus"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="订单状态" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsCancel"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="退款状态" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsCancelPrice"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="派车状态" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsAppointment"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="详情">
                <template scope="scope">
                    <el-button type="primary" @click="showDetail(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="订单详情" v-model="dialogFormVisible" :data="list" @close="reset()" >
            <el-row :gutter="24">
                <el-col :span="12"><b>订单号:</b>{{list.OrderKey}}</el-col>
                <el-col :span="12"><b>预定时间:</b>{{list.BookTime}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>用户ID:</b>{{list.UserID}}</el-col>
                <el-col :span="12"><b>创建时间:</b>{{list.CreateTime}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>应收费用:</b>{{list.DealPrice}}</el-col>
                <el-col :span="12"><b>实收费用:</b>{{list.RealPrice}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>联系人姓名:</b>{{list.LinkName}}</el-col>
                <el-col :span="12"><b>联系人电话:</b>{{list.LinkPhone}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>付款时间:</b>{{list.PayTime}}</el-col>
                <el-col :span="12"><b>取消时间:</b>{{list.CancelTime}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>退款金额:</b>{{list.CancelPrice}}</el-col>
                <el-col :span="12"><b>汽车类型:</b>{{list.CarTransportType}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>起点:</b>{{list.Origin}}</el-col>
                <el-col :span="12"><b>起点坐标（位置）:</b>{{list.OriginCoordinates}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>目的地:</b>{{list.Destination}}</el-col>
                <el-col :span="12"><b>目的地坐标（位置）:</b>{{list.DestinationCoordinates}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>开始时间:</b>{{list.StartingTime}}</el-col>
                <el-col :span="12"><b>开始坐标:</b>{{list.StartingCoordinates}}</el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12"><b>到达时间:</b>{{list.ArrivalTime}}</el-col>
                <el-col :span="12"><b>到达坐标:</b>{{list.ArrivalCoordinates}}</el-col>
            </el-row>
            
            <el-row :gutter="24">
                <el-col :span="12"><b>用车日期:</b>{{list.UseTime}}</el-col>
                <el-col :span="12"><b>客人要求:</b>{{list.SpecReq}}</el-col>
            </el-row>
        </el-dialog>

    </div>
</template>
<script>
import {
    carOrderApi
} from 'api';


export default {
    data() {
            return {
                loading:false,
                filters: {
                    Time: '',
                    Phone: '',
                    labelVal: '1'
                },
                selectedOptions: [{
                    value: '1',
                    label: '手机号'
                }, {
                    value: '2',
                    label: '时间段'
                }],
                carList: [],
                list: {},
                dialogFormVisible: false
            };
        },

        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            async fetchData() {
                const _self = this;
                 _self.loading = true;
                try {
                    const res = await carOrderApi.listByPhone('1');
                    _self.carList = res.data;
                    console.log(res.data)
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            },
            async handleSearch() {
                const _self = this;
                let Phone = _self.filters.labelVal === '1' ? _self.filters.Phone : '';
                let Time = _self.filters.labelVal === '2' ? _self.filters.Time : '';
                _self.loading = true;
                try {
                    if(_self.filters.labelVal === '1'){
                       const res = await carOrderApi.listByPhone(Phone);
                       _self.carList = res.data;
                    }
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            },
            showDetail(row) {
                console.log(row.ID)
                this.dialogFormVisible = true;
                this.list = this.carList[0];
            },
            reset() {
                this.list = {};
            }
        },
        mounted() {
            this.fetchData();
        }
};
</script>
