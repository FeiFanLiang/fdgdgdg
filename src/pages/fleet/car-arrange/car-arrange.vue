<template lang="html">
    <div id="car-arrange-page">
        <el-row :gutter="24">
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
            <el-col :span="10" v-loading="dayloading">
                <p style="margin:0px;">
                    <el-button type="primary" @click="getDaypandect" size="mini">刷新</el-button>
                </p>
                <h3 style="display:inline;">当日订单概括:</h3>
                <span style="color:red;">{{DayPandect}}</span>
            </el-col>
        </el-row>
        <h3>待派车订单</h3>
        <el-table :data="unArrangeList" ref="table" style="width: 100%;" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID" max-height="500">
            <el-table-column type="expand" width="30">
                <template scope="props" v-if="props.row.CancelTime">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>取消时间：{{props.row.order.CancelTime}}</p>
                            <p>取消单人员：{{props.row.order.CancelUserID}}</p>
                            <p>取消说明：{{props.row.order.CancelRemark}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="order.Channel" label="订单渠道"></el-table-column>
            <el-table-column prop="order.ExternalOrderID" label="订单编号" width="120"></el-table-column>
            <el-table-column prop="order.CarriageNo" label="航班/车次" width="90"></el-table-column>
            <el-table-column prop="order.LinkName" label="联系人"></el-table-column>
            <el-table-column prop="order.LinkPhone" label="联系电话" width="125"></el-table-column>
            <el-table-column prop="order.UseTime" label="用车时间" width="110"></el-table-column>
            <el-table-column label="接/送" width="45">
                <template scope="scope">
                    <span v-if="scope.row.order.CarTransportType === 0">接机</span>
                    <span v-if="scope.row.order.CarTransportType === 1">送机</span>
                    <span v-if="scope.row.order.CarTransportType === 2">指定线路</span>
                    <span v-if="scope.row.order.CarTransportType === 3">接站</span>
                    <span v-if="scope.row.order.CarTransportType === 4">送站</span>
                </template>
            </el-table-column>
            <el-table-column label="车型">
                <template scope="scope">
                    <span v-if="scope.row.order.CarClassify === 0">经济型</span>
                    <span v-if="scope.row.order.CarClassify === 1">舒适型</span>
                    <span v-if="scope.row.order.CarClassify === 2">商务型</span>
                    <span v-if="scope.row.order.CarClassify === 3">豪华型</span>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="order.Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="order.Destination" label="目的地" show-overflow-tooltip></el-table-column>

            <el-table-column label="详细地址" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.order.OriginAddress !== null">{{scope.row.order.OriginAddress}}</span>
                    <span v-if="scope.row.order.DestinationAddress !== null">{{scope.row.order.DestinationAddress}}</span>
                </template>
            </el-table-column> -->

            <el-table-column label="地址详情" width="150">
                <template scope="scope">
                    <span style="color:blue;">{{scope.row.order.Origin}}</span>
                    <br>
                    <span style="color:red;">{{scope.row.order.Destination}}</span>
                    <p style="color:grey;font-size:10px;">
                        <span v-if="scope.row.order.OriginAddress !== null">{{scope.row.order.OriginAddress}}</span>
                        <span v-if="scope.row.order.DestinationAddress !== null">{{scope.row.order.DestinationAddress}}</span>
                    </p>
                </template>
            </el-table-column>

            <el-table-column prop="order.PreServiceMileage" label="里程" width="60"></el-table-column>
            <el-table-column prop="order.ExternalOrderStete" label="状态"></el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
            <template scope="scope">
                <el-button size="small" @click="dispatch(scope.$index, scope.row,0)" style="margin:5px">派车</el-button>
                <el-popover ref="popover2" placement="top" width="200">
                    <p>{{scope.row.order.Remark}}</p>
                </el-popover>
                <el-button size="small" v-popover:popover2 style="margin:5px">备注</el-button>
                <el-popover ref="popover" placement="top" width="200">
                    <h5>航班动态</h5>
                    <p>航班号：{{airInformationList.FlightNo}}</p>
                    <p>起飞时间：{{airInformationList.TakeOffTime}}</p>
                    <p>到达时间：{{airInformationList.ArrivalTime}}</p>
                    <p>状态：{{airInformationList.Stat}}</p>
                    <p>前序航班状态：{{airInformationList.PreStat}}</p>
                    <p>更新时间：{{airInformationList.UpdateTime}}</p>
                    <p>最后查询结果：{{airInformationList.LastQueryResult}}</p>
                </el-popover>
                <el-button size="small" v-popover:popover @click="showAirInformations(scope.row.order.CarriageNo,scope.row.order.UseTime)" style="margin:5px">查询航班</el-button>
            </template>
            </el-table-column>
        </el-table>
        <h3>已派车订单</h3>
        <el-table :data="arrangeList" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID" max-height="500">
            <el-table-column type="expand" width="30">
            <template scope="props" v-if="props.row.CancelTime">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item>
                        <p>取消时间：{{props.row.arrange.CancelTime}}</p>
                        <p>取消单人员：{{props.row.arrange.CancelUserID}}</p>
                        <p>取消说明：{{props.row.arrange.CancelRemark}}</p>
                    </el-form-item>
                </el-form>
            </template>
            </el-table-column>
            <el-table-column prop="order.Channel" label="订单渠道"></el-table-column>
            <el-table-column prop="order.ExternalOrderID" label="订单编号" width="120"></el-table-column>
            <el-table-column prop="order.CarriageNo" label="航班/车次" width="90"></el-table-column>
            <el-table-column prop="order.LinkName" label="联系人"></el-table-column>
            <el-table-column prop="order.LinkPhone" label="联系电话" width="125"></el-table-column>
            <el-table-column prop="order.UseTime" label="用车时间" width="110"></el-table-column>
            <el-table-column label="接/送">
                <template scope="scope">
                    <span v-if="scope.row.order.CarTransportType === 0">接机</span>
                    <span v-if="scope.row.order.CarTransportType === 1">送机</span>
                    <span v-if="scope.row.order.CarTransportType === 2">指定线路</span>
                    <span v-if="scope.row.order.CarTransportType === 3">接站</span>
                    <span v-if="scope.row.order.CarTransportType === 4">送站</span>
                </template>
            </el-table-column>
            <el-table-column prop="arrange.Driver.Name" label="司机姓名"></el-table-column>
            <el-table-column prop="arrange.Car.CarMode" label="车型"></el-table-column>
            <!-- <el-table-column prop="arrange.Car.CarNumber" label="车牌号" show-overflow-tooltip></el-table-column> -->
            <!-- <el-table-column prop="order.Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="order.Destination" label="目的地" show-overflow-tooltip></el-table-column>
             <el-table-column prop="arrange.ArrangeTime" label="派单时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="arrange.Remark" label="备注" show-overflow-tooltip></el-table-column> -->
            <el-table-column label="地址详情" width="170">
                <template scope="scope">
                    <span style="color:blue;">{{scope.row.order.Origin}}</span><br><span style="color:red;">{{scope.row.order.Destination}}</span>
                    <!-- <p style="color:grey;font-size:10px;">
                        <span v-if="scope.row.order.OriginAddress !== null">{{scope.row.order.OriginAddress}}</span>
                        <span v-if="scope.row.order.DestinationAddress !== null">{{scope.row.order.DestinationAddress}}</span>
                    </p> -->
                </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="100">
            <template scope="scope">
                <el-button size="small" @click="dispatch(scope.$index, scope.row,1)" style="margin:5px">改派</el-button>
                    <el-popover ref="popover4" placement="top" width="200">
                        <p>{{scope.row.order.Remark}}</p>
                    </el-popover>
                    <el-button size="small" v-popover:popover4 style="margin:5px">备注</el-button>
                    <el-popover ref="popover3" placement="top" width="200">
                        <h5>航班动态</h5>
                        <p>航班号：{{airInformationList.FlightNo}}</p>
                        <p>起飞时间：{{airInformationList.TakeOffTime}}</p>
                        <p>到达时间：{{airInformationList.ArrivalTime}}</p>
                        <p>状态：{{airInformationList.Stat}}</p>
                        <p>前序航班状态：{{airInformationList.PreStat}}</p>
                        <p>更新时间：{{airInformationList.UpdateTime}}</p>
                        <p>最后查询结果：{{airInformationList.LastQueryResult}}</p>
                    </el-popover>
                    <el-button size="small" v-popover:popover3 @click="showAirInformations(scope.row.order.CarriageNo,scope.row.order.UseTime)" style="margin:5px">查询航班</el-button>
            </template>
            </el-table-column>
        </el-table>
        <p id="chart"></p>
        <el-dialog :title="tag?'编辑派车信息':'添加派车信息'" v-model="showDialog" size="small" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="订单渠道">
                            <el-input v-model="form.channel" disabled></el-input>
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
                        <el-form-item label="派遣车辆" prop="carId">
                            <el-select v-model="form.carId" placeholder="请选择车辆">
                                <el-option v-for="(item,index) in carList" :key="index" :label="item.CarNumber" :value="item.ID">
                                    <span style="float: left">{{ item.CarNumber }}</span>
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
                        <el-form-item label="备注">
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
  carArrangeApi,
  carOrderManageApi,
  airInformationApi
} from 'api'
// import * as moment from "moment";
// import * as d3 from "d3";
export default {
  mounted() {
    this.filters.beginTime = new Date().Format('yyyy-MM-dd')
    const now = new Date()
    now.setDate(now.getDate() + 1)
    this.filters.endTime = now.Format('yyyy-MM-dd')
    this.fetchData()
    this.configList = carArrangeApi.getConfig()
  },
  data() {
    return {
      airInformationList: [],
      DayPandect: '',
      unArrangeList: [],
      arrangeList: [],
      carList: [],
      driverList: [],
      chartData: [],
      loading: false,
      loading2: false,
      dayloading: false,
      showDialog: false,
      pickerOptions: {},
      tag: '',
      form: {
        id: '',
        channel: '',
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
      carTransportTypeList: [
        {
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
        }
      ],
      carClassifyList: [
        {
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
        beginTime: '',
        endTime: ''
      },
      rules: {
        carId: [
          {
            required: true,
            message: '请选择车辆'
          }
        ],
        driverId: [
          {
            required: true,
            message: '请选择司机'
          }
        ]
      }
    }
  },
  methods: {
    async showAirInformations(CarriageNo, UseTime) {
      let option = {
        flightNo: CarriageNo,
        begin: UseTime
      }
      console.log(option)
      const res = await airInformationApi.listAll(option)
      this.airInformationList = res.data
    },
    async getDaypandect() {
      this.dayloading = true
      try {
        const res = await carOrderManageApi.getDaypandect()
        this.DayPandect = res.data.Data
        this.dayloading = false
      } catch (e) {
        console.error(e)
        this.dayloading = false
        this.$message.error('当日订单信息获取失败!!!')
      }
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
        _self.$message.error('车辆信息数据获取失败!!!')
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
        _self.$message.error('司机信息数据获取失败!!!')
      }
    },
    async fetchData() {
      const _self = this
      _self.fetchUnArrangeData()
      _self.getDaypandect()
    },
    async fetchUnArrangeData() {
      const _self = this
      try {
        _self.loading = true
        const options = {
          beginTime: _self.filters.beginTime
            ? new Date(_self.filters.beginTime).Format('yyyy-MM-dd')
            : '',
          endTime: _self.filters.endTime
            ? new Date(_self.filters.endTime).Format('yyyy-MM-dd')
            : ''
        }
        const res = await carArrangeApi.unArrangeOrderList(options)
        console.log(res.data)
        if (res.data && res.data.length) {
          _self.unArrangeList = res.data
          var a = res.data
          console.log(_self.unArrangeList)
          for (let i in a) {
            a[i].order.ExternalOrderStete = a[
              i
            ].order.ExternalOrderStete.replace(/\s/g, '')
            console.log(a[i].order.ExternalOrderStete)
          }
        }
        _self.loading = false
        _self.fetchArrangeData()
      } catch (e) {
        console.error(e)
        _self.loading = false
        _self.$message.error('未安排订单数据获取失败!!!')
      }
    },
    async fetchArrangeData() {
      const _self = this
      _self.loading = true
      const options = {
        beginTime: _self.filters.beginTime
          ? new Date(_self.filters.beginTime).Format('yyyy-MM-dd')
          : '',
        endTime: _self.filters.endTime
          ? new Date(_self.filters.endTime).Format('yyyy-MM-dd')
          : ''
      }
      try {
        const res = await carArrangeApi.arrangeOrderList(options)
        if (res.data) {
          _self.chartData = res.data
          _self.arrangeList = []
          let data = Object.values(res.data)
          for (let [index1, elem1] of data.entries()) {
            for (let [index2, elem2] of data[index1].entries()) {
              _self.arrangeList.push(data[index1][index2])
            }
          }
        }
        _self.loading = false
        _self.driverList.length === 0 ? _self.fetchDriverList() : ''
        _self.handleChartData()
      } catch (e) {
        console.error(e)
        _self.loading2 = false
        _self.$message.error('已安排订单数据获取失败!!!')
      }
    },
    dispatch($index, row, a) {
      const _self = this
      _self.tag = a
      _self.carList.length === 0 ? _self.fetchCarList() : ''
      _self.showDialog = true
      _self.form.id = row.order.ID
      _self.form.channel = row.order.Channel
      _self.form.carriageNo = row.order.CarriageNo
      _self.form.linkName = row.order.LinkName
      _self.form.linkPhone = row.order.LinkPhone
      _self.form.specReq = row.order.SpecReq
      _self.form.carTransportType = row.order.CarTransportType
      _self.form.carClassify = row.order.CarClassify
      _self.form.origin = row.order.Origin
      _self.form.destination = row.order.Destination
      _self.form.preServiceMileage = row.order.PreServiceMileage
      _self.form.preServiceTime = row.order.PreServiceTime
      if (_self.tag) {
        _self.form.carId = row.arrange.CarID
        _self.form.driverId = row.arrange.DriverID
        _self.form.remark = row.arrange.Remark
      } else {
        _self.form.carId = ''
        _self.form.driverId = ''
        _self.form.remark = ''
      }
    },
    submitForm() {
      const _self = this
      if (_self.tag) {
        _self.editSave()
      } else {
        _self.addSave()
      }
    },
    async addSave() {
      const _self = this
      const options = {
        orderId: _self.form.id,
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
              message: '派单成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
            _self.$message.error('派单失败!!!')
          }
        } else {
          return false
        }
      })
    },
    async editSave() {
      const _self = this
      const options = {
        orderId: _self.form.id,
        carId: _self.form.carId,
        driverId: _self.form.driverId,
        remark: _self.form.remark
      }
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            await carArrangeApi.editArrange(options)
            _self.fetchData()
            _self.$refs['form'].resetFields()
            _self.showDialog = false
            _self.$message({
              message: '改派成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
            _self.$message.error('改派失败!!!')
          }
        } else {
          return false
        }
      })
    },
    formatTime(t) {
      return new Date(+new Date(t * 1000) + 8 * 3600 * 1000)
        .toISOString()
        .replace(/T/g, ' ')
        .replace(/\.[\d]{3}Z/, '')
    },
    increaseTime(date, second) {
      var a = Math.round(new Date(date).getTime() / 1000)
      return this.formatTime(Number(a) + Number(second || 0))
    },
    decreaseTime(date, second) {
      var a = Math.round(new Date(date).getTime() / 1000)
      return this.formatTime(Number(a) - Number(second || 0))
    },
    handleChartData() {
      const _self = this
      let arr = []
      for (let [k, v] of Object.entries(_self.chartData)) {
        arr.push({
          measure: k,
          data: v
        })
      }
      for (let [index1, elem1] of arr.entries()) {
        let mm = []
        for (let [index2, elem2] of arr[index1].data.entries()) {
          // mm.push({
          //     'useTimg': elem2.arrange.UseTime,
          //     'predictTime': elem2.arrange.PredictTime,
          //     'endTime': _self.increaseTime(elem2.arrange.UseTime,elem2.arrange.PredictTime*60)
          // })
          mm.push([
            elem2.arrange.UseTime,
            1,
            _self.increaseTime(
              elem2.arrange.UseTime,
              elem2.arrange.PredictTime * 60
            )
          ])
          arr[index1].data = mm
        }
      }
      _self.chartData = arr
      //console.log(_self.chartData)
      _self.chartData.length ? _self.createChart() : ''
    },
    createChart() {
      let chart = visavailChart().width(800)
      console.log('this.chartData')
      console.log(this.chartData)
      d3.select('#chart').datum(this.chartData).call(chart)
    }
  }
}
</script>
<style lang="scss" scoped>
    #car-arrange-page {}
</style>
