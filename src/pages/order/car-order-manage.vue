<template lang="html">
    <div id="car-order-manage-page">
        <el-row :gutter="20">
            <!-- <el-col :span="5">
                <el-select v-model="filters.jobStatus" placeholder="工作状态" @change="fetchData">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option v-for="(item,index) in jobStatusList" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col> -->
            <el-col :span="4">
                <el-select v-model="filters.labelVal" placeholder="请选择">
                    <el-option v-for="(item,index) in selectedOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-input placeholder="请输入姓名" v-model="filters.name" v-show="filters.labelVal == '1'"></el-input>
                <el-input placeholder="请输入电话" v-model="filters.phone" v-show="filters.labelVal == '2'"></el-input>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">添加线下订单</el-button>
            </el-col>
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column prop="OrderKey" label="订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="BookTime" label="预定时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkPhone" label="联系人电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="起点" show-overflow-tooltip></el-table-column>
            <!--<el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>-->
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
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <DeleteButton api="carOrderManageApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="form.id?'编辑线下订单':'添加线下订单'" size="small" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="订单渠道" prop="Channel">
                            <el-input placeholder="请输入订单渠道" v-model="form.Channel"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外部订单号" prop="ExternalOrderID">
                            <el-input placeholder="请输入外部订单号" v-model="form.ExternalOrderID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="外部订单状态" prop="ExternalOrderStete">
                            <el-input placeholder="请输入外部订单状态" v-model="form.ExternalOrderStete"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="航班号/车次号" prop="CarriageNo">
                            <el-input placeholder="请输入航班号/车次号" v-model="form.CarriageNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="用车类型" prop="CarTransportType">
                            <el-select v-model="form.CarTransportType" placeholder="请选择用车类型">
                                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预定车型" prop="CarClassify">
                            <el-select v-model="form.CarClassify" placeholder="请选择预定车型">
                                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="预约用车时间" prop="UseTime">
                            <el-input placeholder="请输入预约用车时间" v-model="form.UseTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否预约单" prop="IsAppointment">
                            <el-switch v-model="form.IsAppointment" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地" prop="Origin">
                            <el-input placeholder="请输入始发地" v-model="form.Origin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="始发地详细地址" prop="OriginAddress">
                            <el-input placeholder="请输入始发地详细地址" v-model="form.OriginAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地经纬度" prop="OriginCoordinates">
                            <el-input placeholder="请输入始发地经纬度" v-model="form.OriginCoordinates"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地" prop="Destination">
                            <el-input placeholder="请输入目的地" v-model="form.Destination"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="目的地详细地址" prop="DestinationAddress">
                            <el-input placeholder="请输入目的地详细地址" v-model="form.DestinationAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地经纬度" prop="DestinationCoordinates">
                            <el-input placeholder="请输入目的地经纬度" v-model="form.DestinationCoordinates"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="联系人姓名" prop="LinkName">
                            <el-input placeholder="请输入联系人姓名" v-model="form.LinkName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话" prop="LinkPhone">
                            <el-input placeholder="请输入联系人电话" v-model="form.LinkPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="客人要求" prop="SpecReq">
                            <el-input type="textarea" placeholder="请输入客人要求" v-model="form.SpecReq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="订单备注" prop="Remark">
                            <el-input type="textarea" placeholder="请输入订单备注" v-model="form.Remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="应收费用" prop="DealPrice">
                            <el-input placeholder="请输入应收费用" v-model="form.DealPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="实收费用" prop="RealPrice">
                            <el-input placeholder="请输入实收费用" v-model="form.RealPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="支付类型" prop="PayType">
                            <el-input placeholder="请输入支付类型" v-model="form.PayType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否支付" prop="PayStatus">
                            <el-switch v-model="form.PayStatus" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作人员姓名" prop="StaffUserName">
                            <el-input placeholder="请输入工作人员姓名" v-model="form.StaffUserName"></el-input>
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
} from 'api';


export default {
    data() {
            return {
                list: [],
                currentPage: 1,
                pageSize: 20,
                count: 0,
                loading: false,
                showDialog: false,
                form: {
                    DealPrice: '',
                    RealPrice: '',
                    PayStatus: '',
                    PayType: '',
                    LinkName: '',
                    LinkPhone: '',
                    SpecReq: '',
                    Remark: '',
                    Channel: '',
                    ExternalOrderID: '',
                    ExternalOrderStete: '',
                    CarTransportType: '',
                    CarClassify: '',
                    Origin: '',
                    OriginAddress: '',
                    OriginCoordinates: '',
                    Destination: '',
                    DestinationAddress: '',
                    DestinationCoordinates: '',
                    UseTime: '',
                    IsAppointment: true,
                    CarriageNo: '',
                    StaffUserName: ''
                },
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
                    name: '',
                    phone: '',
                    jobStatus: '',
                    labelVal: '1'
                },
                selectedOptions: [{
                    value: '1',
                    label: '姓名'
                }, {
                    value: '2',
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
            };
        },

        methods: {
            search() {
                this.fetchData();
            },
            async fetchData(currentPage, pageSize) {
                const _self = this;
                _self.loading = true;
                _self.currentPage = currentPage || _self.currentPage;
                _self.pageSize = pageSize || _self.pageSize;
                const options = {
                    pageIndex: _self.currentPage,
                    pageSize: _self.pageSize,
                    order: 'ID',
                    query: {
                        // name: _self.filters.labelVal === '1' ? _self.filters.name : '',
                        // phone: _self.filters.labelVal === '2' ? _self.filters.phone : '',
                        // jobStatus: _self.filters.jobStatus
                    },
                };
                try {
                    const res = await carOrderManageApi.listByQuery(options);
                    _self.list = res.data.Data;
                    _self.count = res.data.Count;
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.fetchData(this.pageSize);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.fetchData(this.currentPage);
            },
            clickAddBtn() {
                const _self = this;
                _self.showDialog = true;
                _self.form = {
                    id: 0,
                    name: '',
                    phone: '',
                    jobStatus: 1,
                    remark: ''
                }
            },
            async clickEditBtn($index, row) {
                const _self = this;
                try {
                    const res = await carOrderManageApi.detail(row.ID);
                    _self.showDialog = true;
                    _self.form.DealPrice = res.data.Data.DealPrice;
                    _self.form.RealPrice = res.data.Data.RealPrice;
                    _self.form.PayStatus = res.data.Data.PayStatus;
                    _self.form.PayType = res.data.Data.PayType;
                    _self.form.LinkName = res.data.Data.LinkName;
                    _self.form.LinkPhone = res.data.Data.LinkPhone;
                    _self.form.SpecReq = res.data.Data.SpecReq;
                    _self.form.Remark = res.data.Data.Remark;
                    _self.form.Channel = res.data.Data.Channel;
                    _self.form.ExternalOrderID = res.data.Data.ExternalOrderID;
                    _self.form.ExternalOrderStete = res.data.Data.ExternalOrderStete;
                    _self.form.CarTransportType = res.data.Data.CarTransportType;
                    _self.form.CarClassify = res.data.Data.CarClassify;
                    _self.form.Origin = res.data.Data.Origin;
                    _self.form.OriginAddress = res.data.Data.OriginAddress;
                    _self.form.OriginCoordinates = res.data.Data.OriginCoordinates;
                    _self.form.Destination = res.data.Data.Destination;
                    _self.form.DestinationAddress = res.data.Data.DestinationAddress;
                    _self.form.DestinationCoordinates = res.data.Data.DestinationCoordinates;
                    _self.form.UseTime = res.data.Data.UseTime;
                    _self.form.IsAppointment = res.data.Data.IsAppointment;
                    _self.form.CarriageNo = res.data.Data.CarriageNo;
                    _self.form.StaffUserName = res.data.Data.StaffUserName;
                } catch (e) {
                    console.error(e);
                }
            },
            submitForm() {
                const _self = this;
                if (_self.form.id) {
                    _self.editSave();
                } else {
                    _self.addSave();
                }
            },
            async addSave() {
                const _self = this;
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            await carOrderManageApi.add(_self.form);
                            _self.fetchData();
                            _self.$refs['form'].resetFields();
                            _self.showDialog = false;
                            _self.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        } catch (e) {
                            console.error(e);
                            _self.$message.error('添加失败!!!');
                        }
                    } else {
                        return false;
                    }
                });
            },
            async editSave() {
                const _self = this;
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            let form = {..._self.form
                            }
                            delete form.id
                            await carOrderManageApi.edit(_self.form.id, form);
                            _self.fetchData();
                            _self.$refs['form'].resetFields();
                            _self.showDialog = false;
                            _self.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                        } catch (e) {
                            console.error(e);
                            _self.$message.error('编辑失败!!!');
                        }
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            this.fetchData();
        }
};
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
}
</style>
