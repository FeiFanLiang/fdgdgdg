<template lang="html">
    <div id="car-order-manage-page">
        <el-row :gutter="24" style="display:flex;align-items:center;">
            <el-col :span="4">
                <el-select v-model="filters.channel" placeholder="订单渠道" @change="fetchData()">
                    <el-option label="全部渠道" value="">全部渠道</el-option>
                    <el-option v-for="(item,index) in channelList" :key="index" :label="item.label" :value="item.label">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="filters.carTransportType" placeholder="产品类型" @change="fetchData()">
                    <el-option label="全部类型" value="">全部类型</el-option>
                    <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="filters.carClassify" placeholder="车型类别" @change="fetchData()">
                    <el-option label="全部车型" value="">全部车型</el-option>
                    <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-date-picker v-model="filters.useTimeS" type="date" placeholder="选择起始用车日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-date-picker v-model="filters.useTimeE" type="date" placeholder="选择终止用车日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-switch :width="73" v-model="filters.payStatus" on-text="已支付" off-text="未支付" :on-value="true" :off-value="false" @change="fetchData()" on-color="dodgerblue" off-color="lightgray">
                </el-switch>
                <el-switch :width="73" v-model="filters.isCancel" on-text="已取消" off-text="未取消" :on-value="true" :off-value="false" @change="fetchData()" on-color="dodgerblue" off-color="lightgray">
                </el-switch>
            </el-col>
        </el-row>
        <el-row :gutter="24" style="margin-top:10px">
            <el-col :span="4">
                <el-select v-model="filters.labelVal" placeholder="请选择">
                    <el-option v-for="(item,index) in selectedOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入姓名" v-model="filters.linkName" v-show="filters.labelVal == 1"></el-input>
                <el-input placeholder="请输入电话" v-model="filters.linkPhone" v-show="filters.labelVal == 2"></el-input>
                <el-input placeholder="请输入外部订单号" v-model="filters.externalOrderID" v-show="filters.labelVal == 3"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clear">清除</el-button>
            </el-col>
            <el-col :span="12">
                <el-button type="primary" @click="clickAddBtn">添加线下订单</el-button>
                <el-button type="primary" @click="syncList(0)">同步携程订单</el-button>
                <el-button type="primary" @click="syncList(1)">同步订单里程信息</el-button>
            </el-col>
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="110px">
                        <el-form-item label="订单渠道">
                            <span>{{ props.row.Channel }}</span>
                        </el-form-item>
                        <el-form-item label="外部订单状态">
                            <span>{{ props.row.ExternalOrderStete }}</span>
                        </el-form-item>
                        <el-form-item label="始发地详细地址">
                            <span>{{props.row.OriginAddress}}</span>
                        </el-form-item>
                        <el-form-item label="目的地详细地址">
                            <span>{{props.row.DestinationAddress}}</span>
                        </el-form-item>
                        <el-form-item label="工作人员">
                            <span>{{ props.row.StaffUserName }}</span>
                        </el-form-item>
                        <el-row class="mbtm-10">
                            <el-col :span="24">
                                <el-form-item label="客人要求">
                                    <span>{{ props.row.SpecReq }}</span>
                                </el-form-item>
                                </el-col/>
                        </el-row>
                        <el-form-item label="支付类型">
                            <span v-if="props.row.PayType === 0">支付宝</span>
                            <span v-if="props.row.PayType === 1">微信支付</span>
                            <span v-if="props.row.PayType === 2">银联支付</span>
                            <span v-if="props.row.PayType === 3">平台</span>
                            <span v-if="props.row.PayType === 4">线下支付</span>
                            <span v-if="props.row.PayType === 5">其他</span>
                        </el-form-item>
                        <el-form-item label="支付平台订单号">
                            <span>{{ props.row.PayOrder }}</span>
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
                        <el-form-item label="申请退款金额">
                            <span>{{ props.row.ApplyCancelPrice }}</span>
                        </el-form-item>
                        <el-form-item label="退款金额" class="mbtm-10">
                            <span>{{ props.row.CancelPrice }}</span>
                        </el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="申请退款原因">
                                    <span>{{ props.row.Reason }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="mbtm-10">
                            <el-col :span="24">
                                <el-form-item label="退款审核意见">
                                    <span>{{ props.row.ApproveCancelRemark }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="出发时间">
                            <span>{{ props.row.StartingTime }}</span>
                        </el-form-item>
                        <el-form-item label="到达时间">
                            <span>{{ props.row.ArrivalTime }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ExternalOrderID" label="外部订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkPhone" label="联系人电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CarriageNo" label="航班/车次" show-overflow-tooltip></el-table-column>
            <el-table-column label="产品类型" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.CarTransportType === 0">接机</span>
                    <span v-if="scope.row.CarTransportType === 1">送机</span>
                    <span v-if="scope.row.CarTransportType === 2">指定线路</span>
                    <span v-if="scope.row.CarTransportType === 3">接站</span>
                    <span v-if="scope.row.CarTransportType === 4">送站</span>
                </template>
            </el-table-column>
            <el-table-column label="车型类别" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.CarClassify === 0">经济型</span>
                    <span v-if="scope.row.CarClassify === 1">舒适型</span>
                    <span v-if="scope.row.CarClassify === 2">商务型</span>
                    <span v-if="scope.row.CarClassify === 3">豪华型</span>
                </template>
            </el-table-column>
            <el-table-column prop="UseTime" label="用车时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceMileage" label="预计服务里程" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceTime" label="预计服务用时" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Remark" label="订单备注" show-overflow-tooltip></el-table-column>
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
            <el-table-column label="操作" width="90" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <!-- <DeleteButton api="carOrderManageApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton> -->
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 30, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.id?'编辑线下订单':'添加线下订单'" size="small" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="工作人员姓名" prop="staffUserName">
                            <el-input placeholder="请输入工作人员姓名" v-model="form.staffUserName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item>
                            <el-button type="primary" @click="syncOrderOperData()" :loading="loading2">查询订单里程信息</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="外部订单号" prop="externalOrderID">
                            <el-input placeholder="请输入外部订单号" v-model="form.externalOrderID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="订单渠道" prop="channel">
                            <el-select v-model="form.channel" placeholder="请选择订单渠道">
                                <el-option v-for="(item,index) in channelList" :key="index" :label="item.label" :value="item.label">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
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
                        <el-form-item label="产品类型" prop="carTransportType">
                            <el-select v-model="form.carTransportType" placeholder="请选择产品类型">
                                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车型类别" prop="carClassify">
                            <el-select v-model="form.carClassify" placeholder="请选择车型类别">
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
                            <el-date-picker v-model="form.useTime" type="datetime" placeholder="请选择预约用车时间">
                            </el-date-picker>
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
                        <el-form-item label="预计服务里程" prop="preServiceMileage">
                            <el-input placeholder="请输入预计服务里程" v-model="form.preServiceMileage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预计服务用时" prop="preServiceTime">
                            <el-input placeholder="请输入预计服务用时" v-model="form.preServiceTime"></el-input>
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
                            <el-select v-model="form.payType" placeholder="请选择支付类型">
                                <el-option v-for="(item,index) in payChannelList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否支付" prop="payStatus">
                            <el-switch v-model="form.payStatus" on-text="" off-text=""></el-switch>
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
    created() {
            this.filters.useTimeS = new Date(
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01'
            ).Format('yyyy-MM-dd')
            this.filters.useTimeE = new Date().Format('yyyy-MM-dd')
            this.fetchData()
        },
        data() {
            return {
                list: [],
                currentPage: 1,
                pageSize: 10,
                count: 0,
                loading: false,
                loading2: false,
                showDialog: false,
                pickerOptions: {},
                form: {
                    id: 0,
                    dealPrice: '',
                    realPrice: '',
                    payStatus: false,
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
                    preServiceMileage: '',
                    preServiceTime: '00:00:00',
                    useTime: '',
                    isAppointment: true,
                    carriageNo: '',
                    staffUserName: ''
                },
                channelList: [{
                    value: 1,
                    label: '机场接送机'
                }, {
                    value: 2,
                    label: '线下订单'
                }, {
                    value: 3,
                    label: '携程接送机'
                }, {
                    value: 4,
                    label: '微信订单'
                }],
                payChannelList: [{
                    value: 0,
                    label: '支付宝'
                }, {
                    value: 1,
                    label: '微信支付'
                }, {
                    value: 2,
                    label: '银联支付'
                }, {
                    value: 3,
                    label: '平台'
                }, {
                    value: 4,
                    label: '线下支付'
                }, {
                    value: 5,
                    label: '其他'
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
                    payStatus: false,
                    isCancel: false,
                    useTimeS: '',
                    useTimeE: '',
                    labelVal: 1,
                    linkName: '',
                    linkPhone: '',
                    externalOrderID: '',
                    carTransportType: '',
                    carClassify: ''
                },
                selectedOptions: [{
                    value: 1,
                    label: '姓名'
                }, {
                    value: 2,
                    label: '电话'
                }, {
                    value: 3,
                    label: '外部订单号'
                }],
                rules: {
                    channel: [{
                        required: true,
                        message: '请选择订单渠道'
                    }],
                    // externalOrderID: [{
                    //     required: true,
                    //     message: '请输入外部订单号'
                    // }],
                    // externalOrderStete: [{
                    //     required: true,
                    //     message: '请输入外部订单状态'
                    // }],
                    carTransportType: [{
                        required: true,
                        message: '请选择产品类型'
                    }],
                    carClassify: [{
                        required: true,
                        message: '请选择车型类别'
                    }],
                    useTime: [{
                        required: true,
                        message: '请选择预约用车时间'
                    }],
                    origin: [{
                        required: true,
                        message: '请输入始发地'
                    }],
                    destination: [{
                        required: true,
                        message: '请输入目的地'
                    }],
                    linkName: [{
                        required: true,
                        message: '请输入联系人姓名'
                    }],
                    linkPhone: [{
                        required: true,
                        message: '请输入联系人电话'
                    }],
                    dealPrice: [{
                        required: true,
                        message: '请输入应收费用'
                    }],
                    realPrice: [{
                        required: true,
                        message: '请输入实收费用'
                    }],
                    payType: [{
                        required: true,
                        message: '请选择支付类型'
                    }]
                }
            }
        },

        methods: {
            clear() {
                this.filters = {
                    channel: '',
                    payStatus: false,
                    isCancel: false,
                    useTimeS: '',
                    useTimeE: '',
                    labelVal: 1,
                    linkName: '',
                    linkPhone: '',
                    externalOrderID: '',
                    carTransportType: '',
                    carClassify: ''
                }
            },
            search() {
                this.fetchData()
            },
            async syncList(a) {
                const _self = this
                _self.list = []
                _self.count = 0
                _self.loading = true
                if (a === 0) {
                    const res = await carOrderManageApi.syncList()
                } else if (a === 1) {
                    const res = await carOrderManageApi.syncOrderOperDataList()
                }
                _self.fetchData()
            },
            async syncOrderOperData() {
                const _self = this
                _self.loading2 = true
                try {
                    await carOrderManageApi.syncOrderOperData(_self.form.id)
                    _self.loading2 = false
                } catch (e) {
                    _self.loading2 = false
                    console.error(e)
                        // _self.$message.error('添加失败!!!')
                }
            },
            async fetchData(currentPage, pageSize) {
                const _self = this
                _self.loading = true
                _self.currentPage = currentPage || _self.currentPage
                _self.pageSize = pageSize || _self.pageSize
                const options = {
                    pageIndex: _self.currentPage,
                    pageSize: _self.pageSize,
                    order: 'channel' + '\\carTransportType' + '\\carClassify' + '\\useTime',
                    query: {
                        channel: _self.filters.channel,
                        payStatus: _self.filters.payStatus,
                        isCancel: _self.filters.isCancel,
                        'useTime>': _self.filters.useTimeS ? new Date(_self.filters.useTimeS).Format('yyyy-MM-dd') : '',
                        'useTime<': _self.filters.useTimeE ? new Date(_self.filters.useTimeE).Format('yyyy-MM-dd') : '',
                        linkName: _self.filters.labelVal === 1 ? _self.filters.linkName : '',
                        linkPhone: _self.filters.labelVal === 2 ? _self.filters.linkPhone : '',
                        externalOrderID: _self.filters.labelVal === 3 ? _self.filters.externalOrderID : '',
                        carTransportType: _self.filters.carTransportType,
                        carClassify: _self.filters.carClassify
                    }
                }
                try {
                    const res = await carOrderManageApi.listByQuery(options)
                    _self.list = res.data.Data
                    if (_self.list && _self.list.length) {
                        for (let [index, elem] of _self.list.entries()) {
                            _self.list[index].UseTime = new Date(
                                _self.list[index].UseTime
                            ).Format('yyyy-MM-dd hh:mm:ss')
                            _self.list[index].PayTime = new Date(
                                _self.list[index].PayTime
                            ).Format('yyyy-MM-dd hh:mm:ss')
                            _self.list[index].CancelTime = new Date(
                                _self.list[index].CancelTime
                            ).Format('yyyy-MM-dd hh:mm:ss')
                            _self.list[index].StartingTime = new Date(
                                _self.list[index].StartingTime
                            ).Format('yyyy-MM-dd hh:mm:ss')
                            _self.list[index].ArrivalTime = new Date(
                                _self.list[index].ArrivalTime
                            ).Format('yyyy-MM-dd hh:mm:ss')
                        }
                    }
                    _self.count = res.data.Count
                    _self.loading = false
                } catch (e) {
                    console.error(e)
                    _self.loading = false
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
                    dealPrice: '',
                    realPrice: '',
                    payStatus: false,
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
                    preServiceMileage: '',
                    preServiceTime: '00:00:00',
                    useTime: '',
                    isAppointment: true,
                    carriageNo: '',
                    staffUserName: ''
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
                    _self.form.preServiceMileage = res.data.Data.PreServiceMileage
                    _self.form.preServiceTime = res.data.Data.PreServiceTime
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
