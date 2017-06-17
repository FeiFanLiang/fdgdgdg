<template lang="html">
    <div id="car-arrange-page">
        <el-row>
            <el-col :span="4">
                <el-select v-model="filters.labelVal" placeholder="请选择">
                    <el-option v-for="(item,index) in selectedOptions" :key="index" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-input placeholder="请输入姓名" v-model="filters.name" v-show="filters.labelVal == '1'"></el-input>
                <el-input placeholder="请输入电话" v-model="filters.phone" v-show="filters.labelVal == '2'"></el-input>
            </el-col>
            <el-col :span="4" :offset="1">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">创建</el-button>
            </el-col>
            <el-col :span="10">
                <el-tag class="mytag ready">准备出车</el-tag>
                <el-tag class="mytag serviceing">运行中</el-tag>
                <el-tag class="mytag completed">已完成</el-tag>
                <el-tag class="mytag cancel">已取消</el-tag>
            </el-col>
        </el-row>
        <el-table :data="list" ref="table" :row-class-name="tableRowClassName" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID">
            <el-table-column type="expand">
                <template scope="props" v-if="props.row.CancelTime">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>取消时间：{{props.row.CancelTime}}</p>
                            <p>取消单人员：{{props.row.CancelUserID}}</p>
                            <p>取消说明：{{props.row.CancelRemark}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="OrderID" label="OrderID"></el-table-column>
            <el-table-column prop="WebOrderID" label="WebOrderID"></el-table-column>
            <el-table-column prop="CarID" label="CarID"></el-table-column>
            <el-table-column prop="DriverID" label="DriverID"></el-table-column>
            <el-table-column prop="Origin" label="始发地"></el-table-column>
            <el-table-column prop="Destination" label="目的地"></el-table-column>
            <el-table-column prop="PredictTime" label="预计行车时间"></el-table-column>
            <el-table-column prop="PredictMileage" label="预计里程"></el-table-column>
            <el-table-column prop="ArrangeUserID" label="派单人员"></el-table-column>
            <el-table-column prop="Remark" label="备注"></el-table-column>
            <el-table-column width="150" label="操作" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.id?'编辑派车信息':'添加派车信息'" v-model="showDialog" size="small" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="ID">
                            <el-input placeholder="请输入ID" v-model="form.id"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="OrderID">
                            <el-input placeholder="请输入OrderID" v-model="form.orderId"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="WebOrderID">
                            <el-input placeholder="请输入WebOrderID" v-model="form.webOrderId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车辆类型">
                            <el-select v-model="form.carId" placeholder="请选择车型">
                                <el-option v-for="(item,index) in carList" :key="index" :label="item.CarMode" :value="item.ID">
                                    <span style="float: left">{{ item.CarMode }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.CarClassify === 0">经济型</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.CarClassify === 1">舒适型</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.CarClassify === 2">商务型</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.CarClassify === 3">豪华型</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="派遣司机">
                            <el-select v-model="form.driverId" placeholder="请选择司机">
                                <el-option v-for="(item,index) in driverList" :key="index" :label="item.Name" :value="item.ID">
                                    <span style="float: left">{{ item.Name }}</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.JobStatus === 1">正产在职</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.JobStatus === 2">已离职</span>
                                    <span style="float: right; color: #8492a6; font-size: 13px" v-if="item.JobStatus === 3">停职</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="派车状态">
                            <el-input placeholder="请输入派车状态" v-model="form.arrangeStatus"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地">
                            <el-input placeholder="请输入始发地" v-model="form.origin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地">
                            <el-input placeholder="请输入目的地" v-model="form.destination"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="预计里程">
                            <el-input placeholder="请输入预计里程" v-model="form.predictMileage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预计行车时间">
                            <el-input placeholder="请输入预计行车时间" v-model="form.predictTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="派单时间">
                            <el-date-picker v-model="form.arrangeTime" type="datetime" placeholder="选择派单时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="派单人员">
                            <el-input placeholder="请输入派单人员" v-model="form.arrangeUserId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input placeholder="请输入备注" type="textarea" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="取消时间">
                            <el-input placeholder="请输入取消时间" v-model="form.cancelTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="取消单人员">
                            <el-input placeholder="请输入取消单人员" v-model="form.cancelUserId"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="取消说明">
                            <el-input placeholder="请输入取消说明" type="textarea" v-model="form.cancelRemark"></el-input>
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
    carBaseApi,
    driverBaseApi,
    carArrangeApi
} from 'api';


export default {
    data() {
            return {
                list: [],
                carList: [],
                driverList: [],
                currentPage: 1,
                pageSize: 10,
                count: 0,
                loading: false,
                showDialog: false,
                form: {
                    id: 0,
                    orderId: '',
                    webOrderId: '',
                    carId: '',
                    driverId: '',
                    arrangeStatus: '',
                    origin: '',
                    destination: '',
                    predictMileage: '',
                    predictTime: '',
                    arrangeTime: '',
                    arrangeUserId: '',
                    remark: '',
                    cancelTime: '',
                    cancelUserId: '',
                    cancelRemark: ''
                },
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
                    accountName: [{
                        required: true,
                        message: '请输入账户名称'
                    }],
                    accountNum: [{
                        required: true,
                        message: '请输入银行账户'
                    }]
                }
            };
        },

        methods: {
            tableRowClassName(row, index) {
                if (index === 0) {
                    return 'ready';
                } else if (index === 1) {
                    return 'serviceing';
                } else if (index === 3) {
                    return 'cancel';
                }
                return '';
            },
            search() {
                this.fetchData();
            },
            async fetchCarList() {
                try {
                    const options = {
                        pageIndex: '',
                        pageSize: '',
                        order: 'ID',
                        query: {},
                    };
                    const res = await carBaseApi.listByQuery(options);
                    this.carList = res.data.Data;
                } catch (e) {
                    console.error(e);
                }
            },
            async fetchDriverList() {
                try {
                    const options = {
                        pageIndex: '',
                        pageSize: '',
                        order: 'ID',
                        query: {},
                    };
                    const res = await driverBaseApi.listByQuery(options);
                    this.driverList = res.data.Data;
                } catch (e) {
                    console.error(e);
                }
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
                    const res = await carArrangeApi.listByQuery(options);
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
                    orderId: '',
                    webOrderId: '',
                    carId: '',
                    driverId: '',
                    arrangeStatus: '',
                    origin: '',
                    destination: '',
                    predictMileage: '',
                    predictTime: '',
                    arrangeTime: '',
                    arrangeUserId: '',
                    remark: '',
                    cancelTime: '',
                    cancelUserId: '',
                    cancelRemark: ''
                };
            },
            async clickEditBtn($index, row) {
                const _self = this;
                try {
                    const res = await carArrangeApi.detail(row.ID);
                    _self.showDialog = true;
                    _self.form.id = res.data.Data.ID;
                    _self.form.orderId = res.data.Data.OrderID;
                    _self.form.webOrderId = res.data.Data.WebOrderID;
                    _self.form.carId = res.data.Data.CarID;
                    _self.form.driverId = res.data.Data.DriverID;
                    console.log(_self.form.carId, _self.form.driverId)
                    _self.form.arrangeStatus = res.data.Data.ArrangeStatus;
                    _self.form.origin = res.data.Data.Origin;
                    _self.form.destination = res.data.Data.Destination;
                    _self.form.predictMileage = res.data.Data.PredictMileage;
                    _self.form.predictTime = res.data.Data.PredictTime;
                    _self.form.arrangeTime = res.data.Data.ArrangeTime;
                    _self.form.arrangeUserId = res.data.Data.ArrangeUserId;
                    _self.form.remark = res.data.Data.Remark;
                    _self.form.cancelTime = res.data.Data.CancelTime;
                    _self.form.cancelUserId = res.data.Data.CancelUserId;
                    _self.form.cancelRemark = res.data.Data.CancelRemark;
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
                            await carArrangeApi.add(_self.form);
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
                            await carArrangeApi.edit(_self.form.id, _self.form);
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
            },
            async clickDelBtn($index, row) {
                const _self = this;
                _self.$confirm(`是否删除${row.accountName}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    try {
                        await carArrangeApi.del(row.ID);
                        _self.fetchData();
                        _self.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }).catch(() => {});
            }
        },
        mounted() {
            this.fetchData();
            this.fetchCarList();
            this.fetchDriverList();

        }
};
</script>
<style lang="scss">
#car-arrange-page {
    .mytag {
        width: 60px;
        text-align: center;
        border: 1px solid silver;
        margin: 0px 15px;
        height: 36px;
        line-height: 36px;
        color: #000;
    }
    .ready {
        background: #e2f0e4;
    }
    .serviceing {
        background: #c9e5f5;
    }
    .completed {
        background: #fff;
    }
    .cancel {
        background: #f1d4d9;
    }
    .el-dialog .el-row {
        margin-bottom: 5px !important;
    }
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
}
</style>
