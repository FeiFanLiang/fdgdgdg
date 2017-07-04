<template lang="html">
    <div id="car-arrange-page">
        <el-row :gutter="20">
            <el-col :span="5">
                <el-date-picker v-model="filters.beginTime" type="date" placeholder="选择起始日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-date-picker v-model="filters.endTime" type="date" placeholder="选择终止日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="fetchData">搜索</el-button>
            </el-col>
        </el-row>
        <!-- <CustomTable :list="unArrangeList" :configList="configList.listFields" :className="tableRowClassName">
            <el-table-column type="expand" slot="left-one">
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
            <el-table-column width="150" label="操作" fixed="right" slot="right-one">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <DeleteButton size="small" api="carArrangeApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                </template>
            </el-table-column>
            </CustomTable> -->
        <h3>待派车订单</h3>
        <el-table :data="unArrangeList" ref="table" :row-class-name="tableRowClassName" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID" max-height="250">
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
            <el-table-column prop="CarriageNo" label="航班/车次" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人"></el-table-column>
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
            <el-table-column prop="LinkPhone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceMileage" label="预计服务里程" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceTime" label="预计服务用时" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="dispatchOrder(scope.$index, scope.row)">派车</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h3>已派车订单</h3>
        <el-table :data="arrangeList" ref="table" :row-class-name="tableRowClassName" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID" max-height="250">
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
            <el-table-column prop="CarriageNo" label="航班/车次" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人"></el-table-column>
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
            <el-table-column prop="LinkPhone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceMileage" label="预计服务里程" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceTime" label="预计服务用时" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="dispatchOrder(scope.$index, scope.row)">改派</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="form.id?'编辑派车信息':'添加派车信息'" v-model="showDialog" size="small" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="ID">
                            <el-input v-model="form.id" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="航班号/车次号">
                            <el-input v-model="form.carriageNo" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="联系人">
                            <el-input v-model="form.linkName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话">
                            <el-input v-model="form.linkPhone" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="产品类型">
                            <el-select v-model="form.carTransportType" disabled>
                                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车型类别">
                            <el-select v-model="form.carClassify" disabled>
                                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地">
                            <el-input v-model="form.origin" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地">
                            <el-input v-model="form.destination" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="预计服务里程">
                            <el-input v-model="form.preServiceMileage" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预计服务用时">
                            <el-input v-model="form.preServiceTime" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="客人要求">
                            <el-input type="textarea" v-model="form.specReq" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车辆类型" prop="carId">
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
                    <el-col :span="12">
                        <el-form-item label="派遣司机" prop="driverId">
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
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input placeholder="请输入备注" type="textarea" v-model="form.remark"></el-input>
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
} from 'api'

export default {
    created() {
            this.filters.beginTime = new Date(
                new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01'
            ).Format('yyyy-MM-dd')
            this.filters.endTime = new Date().Format('yyyy-MM-dd')
            this.fetchData()
            this.configList = carArrangeApi.getConfig()
        },
        data() {
            return {
                unArrangeList: [],
                arrangeList: [],
                carList: [],
                driverList: [],
                loading: false,
                loading2: false,
                showDialog: false,
                pickerOptions: {},
                form: {
                    id: '',
                    orderId: '',
                    carId: '',
                    driverId: '',
                    carriageNo: '',
                    linkName: '',
                    linkPhone: '',
                    carTransportType: '',
                    carClassify: '',
                    origin: '',
                    destination: '',
                    preServiceMileage: '',
                    preServiceTime: '',
                    specReq: ''
                },
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
                    beginTime: '',
                    endTime: ''
                },
                rules: {
                    carId: [{
                        required: true,
                        message: '请选择车型'
                    }],
                    driverId: [{
                        required: true,
                        message: '请选择司机'
                    }],
                    remark: [{
                        required: true,
                        message: '请输入备注'
                    }]
                }
            }
        },
        methods: {
            tableRowClassName(row, index) {
                if (row.ArrangeStatus === 0) {
                    return 'ready'
                } else if (row.ArrangeStatus === 1) {
                    return 'serviceing'
                } else if (row.ArrangeStatus === 3) {
                    return 'cancel'
                }
                return ''
            },
            async fetchCarList() {
                try {
                    const options = {
                        pageIndex: '',
                        pageSize: '',
                        order: 'ID',
                        query: {}
                    }
                    const res = await carBaseApi.listByQuery(options)
                    this.carList = res.data.Data
                } catch (e) {
                    console.error(e)
                }
            },
            async fetchDriverList() {
                try {
                    const options = {
                        pageIndex: '',
                        pageSize: '',
                        order: 'ID',
                        query: {}
                    }
                    const res = await driverBaseApi.listByQuery(options)
                    this.driverList = res.data.Data
                } catch (e) {
                    console.error(e)
                }
            },
            async fetchData() {
                const _self = this
                _self.fetchUnArrangeData()
                _self.fetchArrangeData()
            },
            async fetchUnArrangeData() {
                const _self = this
                _self.loading = true
                const options = {
                    beginTime: _self.filters.beginTime ? new Date(_self.filters.beginTime).Format('yyyy-MM-dd') : '',
                    endTime: _self.filters.endTime ? new Date(_self.filters.endTime).Format('yyyy-MM-dd') : '',
                }
                try {
                    const res = await carArrangeApi.unArrangeOrderList(options)
                    if (res.data && res.data.length) {
                        for (let [index, elem] of res.data.entries()) {
                            _self.unArrangeList.push(res.data[index].order)
                        }
                    }
                    _self.loading = false
                    _self.carList.length === 0 ? _self.fetchCarList() : ''
                } catch (e) {
                    console.error(e)
                    _self.loading = false
                }
            },
            async fetchArrangeData() {
                const _self = this
                _self.loading2 = true
                const options = {
                    beginTime: _self.filters.beginTime ? new Date(_self.filters.beginTime).Format('yyyy-MM-dd') : '',
                    endTime: _self.filters.endTime ? new Date(_self.filters.endTime).Format('yyyy-MM-dd') : '',
                }
                try {
                    const res = await carArrangeApi.arrangeOrderList(options)
                    _self.arrangeList = res.data.Data
                    console.log(res)
                        // if (_self.arrangeList && _self.arrangeList.length) {
                        //     for (let [index, elem] of _self.arrangeList.entries()) {
                        //         _self.arrangeList[index].ArrangeTime = new Date(
                        //             _self.arrangeList[index].ArrangeTime
                        //         ).Format('yyyy-MM-dd hh:mm:ss')
                        //         _self.arrangeList[index].CancelTime = new Date(
                        //             _self.arrangeList[index].CancelTime
                        //         ).Format('yyyy-MM-dd hh:mm:ss')
                        //     }
                        // }
                    _self.count = res.data.Count
                    _self.loading2 = false
                    _self.driverList.length === 0 ? _self.fetchDriverList() : ''
                } catch (e) {
                    console.error(e)
                    _self.loading2 = false
                }
            },
            async dispatchOrder($index, row) {
                const _self = this
                _self.showDialog = true
                _self.form.id = row.ID
                _self.form.carriageNo = row.CarriageNo
                _self.form.linkName = row.LinkName
                _self.form.linkPhone = row.LinkPhone
                _self.form.specReq = row.SpecReq
                _self.form.carTransportType = row.CarTransportType
                _self.form.carClassify = row.CarClassify
                _self.form.origin = row.Origin
                _self.form.destination = row.Destination
                _self.form.preServiceMileage = row.PreServiceMileage
                _self.form.preServiceTime = row.PreServiceTime
            },
            async submitForm() {
                const _self = this
                const options = {
                    orderId: 0,
                    carId: _self.form.carId,
                    driverId: _self.form.driverId,
                    remark: _self.form.remark
                }
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            await carArrangeApi.arrange(options)
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
            }
        } << << << < HEAD === === =
        const res = await carBaseApi.listByQuery(options)
    this.carList = res.data.Data
} catch (e) {
    console.error(e)
}
},
async fetchDriverList() {
        try {
            const options = {
                pageIndex: '',
                pageSize: '',
                order: 'ID',
                query: {}
            }
            const res = await driverBaseApi.listByQuery(options)
            this.driverList = res.data.Data
        } catch (e) {
            console.error(e)
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
            order: 'ID',
            query: {
                // name: _self.filters.labelVal === '1' ? _self.filters.name : '',
                // phone: _self.filters.labelVal === '2' ? _self.filters.phone : '',
                arrangeStatus: _self.filters.arrangeStatus
            }
        }
        try {
            const res = await carArrangeApi.listByQuery(options)
            _self.list = res.data.Data
            console.log(_self.list)
            if (_self.list && _self.list.length) {
                for (let [index, elem] of _self.list.entries()) {
                    _self.list[index].ArrangeTime = new Date(
                        _self.list[index].ArrangeTime
                    ).Format('yyyy-MM-dd hh:mm:ss')
                    _self.list[index].CancelTime = new Date(
                        _self.list[index].CancelTime
                    ).Format('yyyy-MM-dd hh:mm:ss')
                }
            }
            _self.count = res.data.Count
            _self.loading = false
            _self.carList.length === 0 ? _self.fetchCarList() : ''
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
        _self.driverList.length === 0 ? _self.fetchDriverList() : ''
        _self.showDialog = true
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
        }
    },
    async clickEditBtn($index, row) {
        const _self = this
        _self.driverList.length === 0 ? _self.fetchDriverList() : ''
        try {
            const res = await carArrangeApi.detail(row.ID)
            _self.showDialog = true
            _self.form.id = res.data.Data.ID
            _self.form.orderId = res.data.Data.OrderID
            _self.form.webOrderId = res.data.Data.WebOrderID
            _self.form.carId = res.data.Data.CarID
            _self.form.driverId = res.data.Data.DriverID
            _self.form.arrangeStatus = res.data.Data.ArrangeStatus
            _self.form.origin = res.data.Data.Origin
            _self.form.destination = res.data.Data.Destination
            _self.form.predictMileage = res.data.Data.PredictMileage
            _self.form.predictTime = res.data.Data.PredictTime
            _self.form.arrangeTime = res.data.Data.ArrangeTime
            _self.form.arrangeUserId = res.data.Data.ArrangeUserId
            _self.form.remark = res.data.Data.Remark
            _self.form.cancelTime = res.data.Data.CancelTime
            _self.form.cancelUserId = res.data.Data.CancelUserId
            _self.form.cancelRemark = res.data.Data.CancelRemark
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
                    await carArrangeApi.add(_self.form)
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
                    await carArrangeApi.edit(_self.form.id, _self.form)
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
} >>> >>> > e127e95df9e535401e7bbe043dadc03eecf1abcf
}
</script>
<style lang="scss" scoped>
#car-arrange-page {}
</style>
