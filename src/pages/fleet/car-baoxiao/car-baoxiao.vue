<template lang="html">
<div id="car-order-manage-page">
    <el-row :gutter="24">
        <el-col :span="3">
            <el-select v-model="filters.sortValue" placeholder="排序方式">
                <el-option v-for="(item,index) in sortList" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.channel" placeholder="订单渠道">
                <el-option label="全部渠道" value="">全部渠道</el-option>
                <el-option v-for="(item,index) in channelList" :key="index" :label="item.ChannelName" :value="item.ChannelName">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.externalOrderStete" placeholder="订单状态">
                <el-option label="全部状态" value="">全部状态</el-option>
                <el-option v-for="(item,index) in orderSteteList" :key="index" :label="item.label" :value="item.label">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.carTransportType" placeholder="产品类型">
                <el-option label="全部类型" value="">全部类型</el-option>
                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.carClassify" placeholder="车型类别">
                <el-option label="全部车型" value="">全部车型</el-option>
                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-select v-model="filters.labelVal" placeholder="请选择">
                <el-option v-for="(item,index) in selectedOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-input placeholder="请输入姓名" v-model="filters.linkName" v-show="filters.labelVal == 1"></el-input>
            <el-input placeholder="请输入电话" v-model="filters.linkPhone" v-show="filters.labelVal == 2"></el-input>
            <el-input placeholder="请输入OrderKey" v-model="filters.orderKey" v-show="filters.labelVal == 3"></el-input>
            <el-input placeholder="请输入外部订单号" v-model="filters.externalOrderID" v-show="filters.labelVal == 4"></el-input>
        </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px;display:flex;align-items:center;">
        <el-col :span="4">
            <el-date-picker v-model="filters.useTimeS" type="date" placeholder="选择起始用车日期" :picker-options="pickerOptions">
            </el-date-picker>
        </el-col>
        <el-col :span="4">
            <el-date-picker v-model="filters.useTimeE" type="date" placeholder="选择终止用车日期" :picker-options="pickerOptions">
            </el-date-picker>
        </el-col>
        <el-col :span="4">
            <!-- <el-date-picker v-model="filters.bookTime" type="date" placeholder="选择提单日期" :picker-options="pickerOptions"></el-date-picker> -->
            <el-date-picker v-model="filters.bookTime" type="daterange" align="right" placeholder="选择提单日期" :picker-options="pickerOptions2"></el-date-picker>
        </el-col>
        <el-col :span="6" :offset="1">
            <el-radio-group v-model="filters.isPurchaseReturned" @change="isPurchaseReturnedChange($event)">
                <el-radio label="">全部</el-radio>
                <el-radio :label="true">已报销</el-radio>
                <el-radio :label="false">未报销</el-radio>
            </el-radio-group>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="fetchData()">搜索</el-button>
            <el-button type="primary" @click="clear">清除</el-button>
        </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px;display:flex;align-items:center;">
        <el-col :span="12">
            <el-button type="primary" @click="mutipSubmit(true)" :loading="!isMutipEditableA" :disabled="userName !== 'luhuijie'">{{isMutipEditableA?'批量修改为已报销':'提交中'}}</el-button>
            <el-button type="primary" @click="mutipSubmit(false)" :loading="!isMutipEditableB" :disabled="userName !== 'luhuijie'">{{isMutipEditableB?'批量修改为未报销':'提交中'}}</el-button>
        </el-col>
    </el-row>
    <!-- <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border> -->
    <el-table ref="multipleTable" :data="list" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="Channel" label="渠道" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ExternalOrderID" label="外部订单号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="LinkName" label="联系人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="LinkPhone" label="联系电话" show-overflow-tooltip></el-table-column>
        <el-table-column label="产品类型" show-overflow-tooltip>
            <template scope="scope">
<span v-if="scope.row.CarTransportType === 0">
        接机</span>
<span v-if="scope.row.CarTransportType === 1">送机</span>
<span v-if="scope.row.CarTransportType === 2">指定线路</span>
<span v-if="scope.row.CarTransportType === 3">接站</span>
<span v-if="scope.row.CarTransportType === 4">送站</span>
<span v-if="scope.row.CarTransportType === 5">包车</span>
</template>
            </el-table-column>
            <el-table-column prop="UseTime" label="用车时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="RealPrice" label="实收金额" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PurchasePrice" label="外采金额" show-overflow-tooltip></el-table-column>
            <el-table-column label="差价" show-overflow-tooltip>
<template scope="scope">
<span>{{scope.row.RealPrice - scope.row.PurchasePrice}}</span>
</template>
            </el-table-column>
            <el-table-column label="是否外采单" width="65" >
<template scope="scope">
<el-popover ref="popover1" placement="top-start" width="200" trigger="hover">
    <p>外采渠道:{{scope.row.PurchaseChannel}}</p>
    <p>外采订单号:{{scope.row.PurchaseOrderNo}}</p>
    <p>外采处理人:{{scope.row.PurchasProcessor}}</p>
    <p>外采备注:{{scope.row.PurchaseRemark}}</p>
</el-popover>
<div v-popover:popover1>
    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsPurchase"></i>
    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
</div>
</template>
            </el-table-column>
            <el-table-column label="是否报销">
<template scope="scope">
<el-switch v-model="scope.row.IsPurchaseReturned" on-text="是" off-text="否" :on-value="true" :off-value="false" @change="baoxiaoChange(scope.row,$event)" on-color="dodgerblue" off-color="lightgray" :disabled="userName !== 'luhuijie'">
</el-switch>
</template>
            </el-table-column>
            <el-table-column prop="PurchaseReturnedTime" label="报销时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PurchaseReturnedProcessor" label="报销处理人" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 30, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import path from '../../../api/api.js'

import {
    carOrderManageApi,
    orderChannelApi,
    airInformationApi,
    hotelImageApi
} from 'api'
import UploadImage from 'components/upload-image'

export default {
    components: {
        UploadImage
    },
    created() {
        let user = JSON.parse(localStorage.getItem('user'))
        this.userName = user.username
        this.filters.useTimeS = new Date().Format('yyyy-MM-dd')
        const now = new Date()
        now.setDate(now.getDate() + 1)
        this.filters.useTimeE = now.Format('yyyy-MM-dd')
        this.loginData = JSON.parse(localStorage.getItem('user'))
        this.fetchData()
    },
    data() {
        return {
            userName: '',
            imageList: [],
            airInformationList: [],
            list: [],
            currentPage: 1,
            pageSize: 100,
            count: 0,
            loading: false,
            loading2: false,
            isEditable: true,
            showDialog: false,
            pickerOptions: {},
            pickerOptions2: {
                shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            },
            loginData: '',
            sortList: [{
                    value: 'id',
                    label: '默认排序'
                },
                {
                    value: 'channel',
                    label: '按渠道'
                },
                {
                    value: 'carTransportType',
                    label: '产品类型'
                },
                {
                    value: 'carClassify',
                    label: '车型类别'
                },
                {
                    value: 'useTime',
                    label: '用车时间'
                }
            ],
            channelList: [],
            orderSteteList: [{
                    value: 0,
                    label: '待确认'
                },
                {
                    value: 1,
                    label: '已取消'
                },
                {
                    value: 2,
                    label: '已派车'
                },
                {
                    value: 3,
                    label: '已完成'
                }
            ],
            payChannelList: [{
                    value: 0,
                    label: '支付宝'
                },
                {
                    value: 1,
                    label: '微信支付'
                },
                {
                    value: 2,
                    label: '银联支付'
                },
                {
                    value: 3,
                    label: '平台'
                },
                {
                    value: 4,
                    label: '线下支付'
                },
                {
                    value: 5,
                    label: '其他'
                }
            ],
            carTransportTypeList: [{
                    value: 0,
                    label: '接机'
                },
                {
                    value: 1,
                    label: '送机'
                },
                {
                    value: 2,
                    label: '指定线路'
                },
                {
                    value: 3,
                    label: '接站'
                },
                {
                    value: 4,
                    label: '送站'
                },
                {
                    value: 5,
                    label: '包车'
                }
            ],
            carClassifyList: [{
                    value: 0,
                    label: '经济型'
                },
                {
                    value: 1,
                    label: '舒适型'
                },
                {
                    value: 2,
                    label: '商务型'
                },
                {
                    value: 3,
                    label: '豪华型'
                }
            ],
            filters: {
                sortValue: 'id',
                channel: '',
                externalOrderStete: '',
                payStatus: true,
                isCancel: false,
                useTimeS: '',
                useTimeE: '',
                bookTime: '',
                labelVal: 1,
                linkName: '',
                linkPhone: '',
                orderKey: '',
                externalOrderID: '',
                carTransportType: '',
                carClassify: '',
                isPurchaseReturned: true
            },
            selectedOptions: [{
                    value: 1,
                    label: '姓名'
                },
                {
                    value: 2,
                    label: '电话'
                },
                {
                    value: 3,
                    label: 'orderKey'
                },
                {
                    value: 4,
                    label: '外部订单号'
                }
            ],
            purchaseList: [{
                    value: '携程'
                },
                {
                    value: '滴滴'
                }
            ],
            multipleSelection: [],
            isMutipEditableA: true,
            isMutipEditableB: true
        }
    },
    methods: {
        handleSelectionChange(val) {
            console.log(val)
            this.multipleSelection = []
            for (let i = 0; i < val.length; i++) {
                this.multipleSelection.push(val[i].ID)
            }
            console.log(this.multipleSelection)
        },
        async mutipSubmit(a) {
            const _self = this
            if (_self.multipleSelection.length) {
                a ? _self.isMutipEditableA = false : _self.isMutipEditableB = false
                let form = {
                    isPurchaseReturned: a
                }
                for (let i = 0; i < _self.multipleSelection.length; i++) {
                    await carOrderManageApi.edit(_self.multipleSelection[i], form)
                }
                _self.fetchData()
                a ? _self.isMutipEditableA = true : _self.isMutipEditableB = true
                _self.$message({
                    message: '修改成功',
                    type: 'success'
                })
            } else {
                this.$message.error('请先选择订单！')
            }
        },
        async baoxiaoChange(row, value) {
            const _self = this
            const form = {
                id: row.ID,
                isPurchaseReturned: value
            }
            await carOrderManageApi.edit(form.id, form)
            _self.fetchData()
            _self.$message({
                message: '修改成功',
                type: 'success'
            })
        },
        clear() {
            this.filters = {
                sortValue: 'id',
                channel: '',
                externalOrderStete: '',
                payStatus: '',
                isCancel: '',
                useTimeS: '',
                useTimeE: '',
                bookTime: '',
                labelVal: 1,
                linkName: '',
                linkPhone: '',
                orderKey: '',
                externalOrderID: '',
                carTransportType: '',
                carClassify: '',
                isPurchaseReturned: true
            }
        },
        payStatusChange(a) {
            this.filters.payStatus = a
        },
        isCancelChange(a) {
            this.filters.isCancel = a
        },
        isPurchaseReturnedChange(a) {
            this.filters.isPurchaseReturned = a
        },
        async fetchChannelList() {
            const _self = this
            const res = await orderChannelApi.channelByQuery('用车')
            _self.channelList = res.data
            let value = {}
            for (var i = 0; i < _self.channelList.length; i++) {
                if (_self.channelList[i].ID === 2003) {
                    value = _self.channelList[i]
                    _self.channelList.splice(i, 1);
                    break;
                }
            }
            _self.channelList.unshift(value)
        },
        async fetchData(currentPage, pageSize) {
            const _self = this
            _self.loading = true
            _self.currentPage = currentPage || _self.currentPage
            _self.pageSize = pageSize || _self.pageSize
            const options = {
                pageIndex: _self.currentPage,
                pageSize: _self.pageSize,
                order: _self.filters.sortValue,
                query: {
                    channel: _self.filters.channel,
                    payStatus: _self.filters.payStatus,
                    isCancel: _self.filters.isCancel,
                    'useTime>': _self.filters.useTimeS ?
                        new Date(_self.filters.useTimeS).Format('yyyy-MM-dd') : '',
                    'useTime<': _self.filters.useTimeE ?
                        new Date(_self.filters.useTimeE).Format('yyyy-MM-dd') : '',
                    'bookTime>': _self.filters.bookTime[0] ?
                        new Date(_self.filters.bookTime[0]).Format('yyyy-MM-dd') : '',
                    'bookTime<': _self.filters.bookTime[1] ?
                        new Date(_self.filters.bookTime[1]).Format('yyyy-MM-dd') : '',
                    linkName: _self.filters.labelVal === 1 ? _self.filters.linkName : '',
                    linkPhone: _self.filters.labelVal === 2 ? _self.filters.linkPhone : '',
                    orderKey: _self.filters.labelVal === 3 ? _self.filters.orderKey : '',
                    externalOrderID: _self.filters.labelVal === 4 ? _self.filters.externalOrderID : '',
                    externalOrderStete: _self.filters.externalOrderStete,
                    carTransportType: _self.filters.carTransportType,
                    carClassify: _self.filters.carClassify,
                    isPurchaseReturned: _self.filters.isPurchaseReturned,
                    isPurchase: true
                }
            }
            try {
                const res = await carOrderManageApi.listByQuery(options)
                _self.list = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
                _self.channelList.length === 0 ? _self.fetchChannelList() : ''
            } catch (e) {
                console.error(e)
                _self.loading = false
                _self.$message.error('数据获取失败!!!')
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        }
    }
}
</script>
<style lang="scss" scoped>
#car-order-manage-page {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .mbtm-10 {
        margin-bottom: 10px;
    }
    .demo-table-expand .el-form-item span {
        color: orange;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 100px 10px 16px !important;
    }
    .el-autocomplete,
    .el-dropdown {
        display: block !important;
    }
}
</style>
