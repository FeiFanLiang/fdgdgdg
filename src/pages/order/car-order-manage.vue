<template lang="html">
    <div id="car-order-manage-page">
        <el-row :gutter="20">
            <el-col :span="3">
                <el-select v-model="filters.channel" placeholder="订单渠道" @change="fetchData">
                    <el-option label="全部" value="">全部渠道</el-option>
                    <el-option v-for="(item,index) in channelList" :key="index" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="filters.orderVal" placeholder="订单状态" @change="fetchData">
                    <el-option label="全部" value="">全部状态</el-option>
                    <el-option v-for="(item,index) in orderStatusList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="filters.labelVal" placeholder="请选择">
                    <el-option v-for="(item,index) in selectedOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-input placeholder="请输入姓名" v-model="filters.linkName" v-show="filters.labelVal == 5"></el-input>
                <el-input placeholder="请输入电话" v-model="filters.linkPhone" v-show="filters.labelVal == 6"></el-input>
            </el-col>
            <el-col :span="3">
                <el-date-picker v-model="filters.useTime" type="date" placeholder="选择用车日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="8" :offset="1">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">添加线下订单</el-button>
                <el-button type="primary" @click="syncList">同步携程订单</el-button>
            </el-col>
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="110px">
                        <el-form-item label="订单渠道">
                            <span>{{ props.row.Channel }}</span>
                        </el-form-item>
                        <el-form-item label="工作人员">
                            <span>{{ props.row.StaffUserName }}</span>
                        </el-form-item>
                        <el-form-item label="外部订单号">
                            <span>{{ props.row.ExternalOrderID }}</span>
                        </el-form-item>
                        <el-form-item label="外部订单状态">
                            <span>{{ props.row.ExternalOrderStete }}</span>
                        </el-form-item>
                        <el-form-item label="用车类型">
                            <span>{{ props.row.CarTransportType }}</span>
                        </el-form-item>
                        <el-form-item label="预定车型">
                            <span>{{ props.row.CarClassify }}</span>
                        </el-form-item>
                        <el-form-item label="始发地详细地址">
                            <span>{{ props.row.Origin }}{{props.row.OriginAddress}}</span>
                        </el-form-item>
                        <el-form-item label="目的地详细地址">
                            <span>{{ props.row.Destination }}{{props.row.DestinationAddress}}</span>
                        </el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="客人要求">
                                    <span>{{ props.row.SpecReq }}</span>
                                </el-form-item>
                                </el-col/>
                        </el-row>
                        <el-row class="mbtm-10">
                            <el-col :span="24">
                                <el-form-item label="订单备注">
                                    <span>{{ props.row.Remark }}</span>
                                </el-form-item>
                                </el-col/>
                        </el-row>
                        <el-form-item label="支付平台订单号">
                            <span>{{ props.row.PayOrder }}</span>
                        </el-form-item>
                        <el-form-item label="支付类型">
                            <span>{{ props.row.PayType }}</span>
                        </el-form-item>
                        <el-form-item label="应收费用">
                            <span>{{ props.row.DealPrice }}</span>
                        </el-form-item>
                        <el-form-item label="实收费用">
                            <span>{{ props.row.RealPrice }}</span>
                        </el-form-item>
                        <el-form-item label="是否支付">
                            <span>{{ props.row.PayStatus?"是":"否" }}</span>
                        </el-form-item>
                        <el-form-item label="支付时间">
                            <span>{{ props.row.PayTime }}</span>
                        </el-form-item>
                        <el-row class="mbtm-10">
                            <el-col :span="12">
                                <el-form-item label="是否取消">
                                    <span>{{ props.row.IsCancel?"是":"否" }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="取消时间">
                                    <span>{{ props.row.CancelTime }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="退款联系人">
                            <span>{{ props.row.CancelContactName }}</span>
                        </el-form-item>
                        <el-form-item label="退款联系方式">
                            <span>{{ props.row.CancelContact }}</span>
                        </el-form-item>
                        <el-form-item label="申请退款原因">
                            <span>{{ props.row.Reason }}</span>
                        </el-form-item>
                        <el-form-item label="申请退款金额">
                            <span>{{ props.row.ApplyCancelPrice }}</span>
                        </el-form-item>
                        <el-form-item label="退款审核意见">
                            <span>{{ props.row.ApproveCancelRemark }}</span>
                        </el-form-item>
                        <el-form-item label="退款金额" class="mbtm-10">
                            <span>{{ props.row.CancelPrice }}</span>
                        </el-form-item>
                        <el-form-item label="出发时间">
                            <span>{{ props.row.StartingTime }}</span>
                        </el-form-item>
                        <el-form-item label="到达时间">
                            <span>{{ props.row.ArrivalTime }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="OrderKey" label="订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkPhone" label="联系人电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CarriageNo" label="航班/车次" show-overflow-tooltip></el-table-column>
            <el-table-column prop="BookTime" label="预定时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="SpecReq" label="客人要求" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="是否支付" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.PayStatus"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="是否取消" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsCancel"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="是否退款" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsCancelPrice"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="是否预约" width="65">
                <template scope="scope">
                    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsAppointment"></i>
                    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <DeleteButton api="carOrderManageApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.id?'编辑线下订单':'添加线下订单'" size="small" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="订单渠道" prop="channel">
                            <el-input placeholder="请输入订单渠道" v-model="form.channel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外部订单号" prop="externalOrderID">
                            <el-input placeholder="请输入外部订单号" v-model="form.externalOrderID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="外部订单状态" prop="externalOrderStete">
                            <el-input placeholder="请输入外部订单状态" v-model="form.externalOrderStete"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="航班号/车次号" prop="carriageNo">
                            <el-input placeholder="请输入航班号/车次号" v-model="form.carriageNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="用车类型" prop="carTransportType">
                            <el-select v-model="form.carTransportType" placeholder="请选择用车类型">
                                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预定车型" prop="carClassify">
                            <el-select v-model="form.carClassify" placeholder="请选择预定车型">
                                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="预约用车时间" prop="useTime">
                            <el-input placeholder="请输入预约用车时间" v-model="form.useTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否预约单" prop="isAppointment">
                            <el-switch v-model="form.isAppointment" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地" prop="origin">
                            <el-input placeholder="请输入始发地" v-model="form.origin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="始发地详细地址" prop="originAddress">
                            <el-input placeholder="请输入始发地详细地址" v-model="form.originAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地经纬度" prop="originCoordinates">
                            <el-input placeholder="请输入始发地经纬度" v-model="form.originCoordinates"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地" prop="destination">
                            <el-input placeholder="请输入目的地" v-model="form.destination"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="目的地详细地址" prop="destinationAddress">
                            <el-input placeholder="请输入目的地详细地址" v-model="form.destinationAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地经纬度" prop="destinationCoordinates">
                            <el-input placeholder="请输入目的地经纬度" v-model="form.destinationCoordinates"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="联系人姓名" prop="linkName">
                            <el-input placeholder="请输入联系人姓名" v-model="form.linkName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话" prop="linkPhone">
                            <el-input placeholder="请输入联系人电话" v-model="form.linkPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="客人要求" prop="specReq">
                            <el-input type="textarea" placeholder="请输入客人要求" v-model="form.specReq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="订单备注" prop="remark">
                            <el-input type="textarea" placeholder="请输入订单备注" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="应收费用" prop="dealPrice">
                            <el-input placeholder="请输入应收费用" v-model="form.dealPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实收费用" prop="realPrice">
                            <el-input placeholder="请输入实收费用" v-model="form.realPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="支付类型" prop="payType">
                            <el-input placeholder="请输入支付类型" v-model="form.payType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否支付" prop="payStatus">
                            <el-switch v-model="form.payStatus" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作人员姓名" prop="staffUserName">
                            <el-input placeholder="请输入工作人员姓名" v-model="form.staffUserName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    carOrderManageApi
} from 'api'

export default {
    data() {
            return {
                list: [],
                currentPage: 1,
                pageSize: 10,
                count: 0,
                loading: false,
                showDialog: false,
                pickerOptions: {},
                form: {
                    id: 0,
                    dealPrice: '',
                    realPrice: '',
                    payStatus: '',
                    payType: '',
                    linkName: '',
                    linkPhone: '',
                    specReq: '',
                    remark: '',
                    channel: '',
                    externalOrderID: '',
                    externalOrderStete: '',
                    carTransportType: '',
                    carClassify: '',
                    origin: '',
                    originAddress: '',
                    originCoordinates: '',
                    destination: '',
                    destinationAddress: '',
                    destinationCoordinates: '',
                    useTime: '',
                    isAppointment: true,
                    carriageNo: '',
                    staffUserName: ''
                },
                channelList: [{
                    value: 1,
                    label: "机场用车"
                }, {
                    value: 2,
                    label: "线下订单"
                }, {
                    value: 3,
                    label: "携程接送机"
                }, {
                    value: 4,
                    label: "微信订单"
                }],
                orderStatusList: [{
                    value: 1,
                    label: "已支付"
                }, {
                    value: 2,
                    label: "已取消"
                }, {
                    value: 3,
                    label: "已退款"
                }, {
                    value: 4,
                    label: "预约单"
                }],
                payChannelList: [{
                    value: 'ALIPAY',
                    label: '支付宝'
                }, {
                    value: 'WEIXINPAY',
                    label: '微信支付'
                }, {
                    value: 'UNIONPAY',
                    label: '银联支付'
                }, {
                    value: 'PLATFORM',
                    label: '平台'
                }],
                carTransportTypeList: [{
                    value: 0,
                    label: '接机'
                }, {
                    value: 1,
                    label: '送机'
                }, {
                    value: 2,
                    label: '指定线路'
                }, {
                    value: 3,
                    label: '接站'
                }, {
                    value: 4,
                    label: '送站'
                }],
                carClassifyList: [{
                    value: 0,
                    label: '经济型'
                }, {
                    value: 1,
                    label: '舒适型'
                }, {
                    value: 2,
                    label: '商务型'
                }, {
                    value: 3,
                    label: '豪华型'
                }],
                filters: {
                    channel: '',
                    orderVal: '',
                    useTime: '',
                    labelVal: 5,
                    linkName: '',
                    linkPhone: ''
                },
                selectedOptions: [{
                    value: 5,
                    label: '姓名'
                }, {
                    value: 6,
                    label: '电话'
                }],
                rules: {
                    jobNnumber: [{
                        required: true,
                        message: '请输入司机工号'
                    }],
                    name: [{
                        required: true,
                        message: '请输入司机姓名'
                    }],
                    phone: [{
                        required: true,
                        message: '请输入司机手机号'
                    }],
                    jobStatus: [{
                        required: true,
                        message: '请选择工作状态'
                    }]
                }
            }
        },

        methods: {
            async syncList() {
                const res = await carOrderManageApi.syncList();
                console.log(res)
            },
            search() {
                this.fetchData()
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
                    query: {
                        channel: _self.filters.channel,
                        payStatus: _self.filters.orderVal === 1 ? true : '',
                        isCancel: _self.filters.orderVal === 2 ? true : '',
                        isCancelPrice: _self.filters.orderVal === 3 ? true : '',
                        isAppointment: _self.filters.orderVal === 4 ? true : '',
                        "useTime>": new Date(_self.filters.useTime).Format('yyyy-MM-dd'),
                        linkName: _self.filters.labelVal === 5 ? _self.filters.linkName : '',
                        linkPhone: _self.filters.labelVal === 6 ? _self.filters.linkPhone : '',
                    }
                }
                try {
                    const res = await carOrderManageApi.listByQuery(options)
                    _self.list = res.data.Data;
                    if (_self.list && _self.list.length) {
                        for (let [index, elem] of _self.list.entries()) {
                            _self.list[index].BookTime = new Date(
                                _self.list[index].BookTime
                            ).Format('yyyy-MM-dd hh:mm:ss');
                            _self.list[index].PayTime = new Date(
                                _self.list[index].PayTime
                            ).Format('yyyy-MM-dd hh:mm:ss');
                            _self.list[index].CancelTime = new Date(
                                _self.list[index].CancelTime
                            ).Format('yyyy-MM-dd hh:mm:ss');
                        }
                    }
                    _self.count = res.data.Count;
                    _self.loading = false;
                } catch (e) {
                    console.error(e)
                    _self.loading = false;
                }
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.fetchData(this.pageSize)
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.fetchData(this.currentPage)
            },
            clickAddBtn() {
                const _self = this
                _self.showDialog = true
                _self.form = {
                    id: 0,
                    name: '',
                    phone: '',
                    jobStatus: 1,
                    remark: ''
                }
            },
            async clickEditBtn($index, row) {
                const _self = this
                try {
                    const res = await carOrderManageApi.detail(row.ID)
                    _self.showDialog = true
                    _self.form.id = res.data.Data.ID
                    _self.form.dealPrice = res.data.Data.DealPrice
                    _self.form.realPrice = res.data.Data.RealPrice
                    _self.form.payStatus = res.data.Data.PayStatus
                    _self.form.payType = res.data.Data.PayType
                    _self.form.linkName = res.data.Data.LinkName
                    _self.form.linkPhone = res.data.Data.LinkPhone
                    _self.form.specReq = res.data.Data.SpecReq
                    _self.form.remark = res.data.Data.Remark
                    _self.form.channel = res.data.Data.Channel
                    _self.form.externalOrderID = res.data.Data.ExternalOrderID
                    _self.form.externalOrderStete = res.data.Data.ExternalOrderStete
                    _self.form.carTransportType = res.data.Data.CarTransportType
                    _self.form.carClassify = res.data.Data.CarClassify
                    _self.form.origin = res.data.Data.Origin
                    _self.form.originAddress = res.data.Data.OriginAddress
                    _self.form.originCoordinates = res.data.Data.OriginCoordinates
                    _self.form.destination = res.data.Data.Destination
                    _self.form.destinationAddress = res.data.Data.DestinationAddress
                    _self.form.destinationCoordinates = res.data.Data.DestinationCoordinates
                    _self.form.useTime = res.data.Data.UseTime
                    _self.form.isAppointment = res.data.Data.IsAppointment
                    _self.form.carriageNo = res.data.Data.CarriageNo
                    _self.form.staffUserName = res.data.Data.StaffUserName
                } catch (e) {
                    console.error(e)
                }
            },
            submitForm() {
                const _self = this
                if (_self.form.id) {
                    _self.editSave()
                } else {
                    _self.addSave()
                }
            },
            async addSave() {
                const _self = this
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            await carOrderManageApi.add(_self.form)
                            _self.fetchData()
                            _self.$refs['form'].resetFields()
                            _self.showDialog = false
                            _self.$message({
                                message: '保存成功',
                                type: 'success'
                            })
                        } catch (e) {
                            console.error(e)
                            _self.$message.error('添加失败!!!')
                        }
                    } else {
                        return false
                    }
                })
            },
            async editSave() {
                const _self = this
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            let form = {
                                ..._self.form
                            }
                            delete form.id
                            await carOrderManageApi.edit(_self.form.id, form)
                            _self.fetchData()
                            _self.$refs['form'].resetFields()
                            _self.showDialog = false
                            _self.$message({
                                message: '编辑成功',
                                type: 'success'
                            })
                        } catch (e) {
                            console.error(e)
                            _self.$message.error('编辑失败!!!')
                        }
                    } else {
                        return false
                    }
                })
            }
        },
        mounted() {
            Date.prototype.Format = function(fmt) {
                let o = {
                    'M+': this.getMonth() + 1, //月份
                    'd+': this.getDate(), //日
                    'h+': this.getHours(), //小时
                    'm+': this.getMinutes(), //分
                    's+': this.getSeconds(), //秒
                    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                    S: this.getMilliseconds() //毫秒
                }
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
                    )
                for (let k in o)
                    if (new RegExp('(' + k + ')').test(fmt))
                        fmt = fmt.replace(
                            RegExp.$1,
                            RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
                        )
                return fmt
            }
            this.filters.useTime = new Date().Format('yyyy-MM-dd');
            this.fetchData()
        }
}
</script>
<style lang="scss" scoped>
#car-order-manage-page {
    .el-dialog .el-row {
        margin-bottom: 0px !important;
    }
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
