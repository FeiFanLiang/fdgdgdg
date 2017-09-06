<template lang="html">
    <div id="gasoline-log">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="filters.labelVal"  placeholder="请选择">
                    <el-option
                        v-for="(item,index) in selectedOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="filters.CarID" filterable clearable placeholder="请选择车牌号" v-show="filters.labelVal == '1'">
                    <el-option v-for="(item,index) in carList" :key="index" :label="item.CarNumber" :value="item.ID"></el-option>
                </el-select>
                <el-select v-model="filters.DriverID" filterable clearable placeholder="请选择司机姓名" v-show="filters.labelVal == '2'">
                    <el-option v-for="(item,index) in driverList" :key="index" :label="item.Name" :value="item.ID"></el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="gasolineSearch(filters)">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">添加加油记录</el-button>
                <el-button type="primary" @click="recharge">加油卡充值</el-button>
            </el-col >
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID" :expand-row-keys="expandRowKeys" @expand="getInfo">
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="110px">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="加油时间">
                                <span>{{ props.row.GasolineCardLog.DateTime }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="加油卡ID">
                                    <span>{{ props.row.GasolineCardLog.GasolineCardID }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="总额">
                                <span>{{ props.row.GasolineCardLog.Total }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="余额">
                                    <span>{{ props.row.GasolineCardLog.Balance }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="Car.CarNumber" label="车牌号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Driver.Name" label="司机"></el-table-column>
            <el-table-column prop="Channel" label="渠道">
                <template scope="scope">
                            <p v-if="scope.row.Channel === 0">加油卡</p>
                            <p v-if="scope.row.Channel === 1">其他</p>
                </template>
            </el-table-column>
            <el-table-column prop="DateTime" label="加油时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="SerialNumber" label="流水号"></el-table-column>
            <el-table-column prop="GasolineType" label="油品标号"></el-table-column>
            <el-table-column prop="UnitPrice" label="单价"></el-table-column>
            <el-table-column prop="Count" label="数量"></el-table-column>
            <el-table-column prop="Total" label="总额"></el-table-column>
            <!-- <el-table-column prop="DateTime" label="时间" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="GasolineStation" label="加油站" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column label="操作" width="150">
<template scope="scope">
    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
        编辑</el-button>
    <DeleteButton api="gasolineLogApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
            </el-table-column> -->
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.ID?'编辑车辆加油信息':'添加车辆加油信息'" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车牌号" prop="CarID">
                            <el-select v-model="form.CarID" clearable placeholder="请选择车牌号" style="width:100%">
                                <el-option v-for="(item,index) in carList" :key="index" :label="item.CarNumber" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="司机姓名" prop="DriverID">
                            <el-select v-model="form.DriverID" clearable placeholder="请选择司机姓名" style="width:100%">
                                <el-option v-for="(item,index) in driverList" :key="index" :label="item.Name" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="渠道" prop="Channel">
                            <el-select v-model="form.Channel" clearable placeholder="请选择加油渠道" style="width:100%" @change="channelChange">
                                <el-option v-for="(item,index) in channelList" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="加油时间" prop="DateTime">
                            <el-date-picker v-model="form.DateTime" type="datetime" placeholder="选择加油时间" :picker-options="pickerOptions" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="加油站" prop="GasolineStation">
                            <!-- <el-input placeholder="请输入加油站名称" v-model="form.GasolineStation"></el-input> -->
                            <el-autocomplete
                                class="inline-input"
                                v-model="form.GasolineStation"
                                :fetch-suggestions="querySearch1"
                                placeholder="请输入加油站名称"
                                @select="handleSelect1"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="油卡编号" prop="GasolineCardNo">
                            <!-- <el-input placeholder="请输入油卡编号" v-model="form.GasolineCardNo"></el-input> -->
                            <el-select v-model="form.GasolineCardNo" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in cardList"
                                :key="index"
                                :label="item.CardNum"
                                :value="item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="流水号" prop="SerialNumber">
                            <el-input placeholder="请输入流水号" v-model="form.SerialNumber" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="油品标号" prop="GasolineType">
                            <!-- <el-input placeholder="请输入油品标号" v-model="form.GasolineType"></el-input> -->
                            <el-autocomplete
                                class="inline-input"
                                v-model="form.GasolineType"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入油品标号"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="单价" prop="UnitPrice">
                            <el-input placeholder="请输入单价" v-model="form.UnitPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="数量" prop="Count">
                            <el-input placeholder="请输入数量" v-model="form.Count"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="总额" prop="Total">
                            <el-input placeholder="请输入总额" v-model="form.Total"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车辆当前公里数" prop="CarKilometer">
                            <el-input placeholder="请输入车辆当前公里数" v-model="form.CarKilometer"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                     <!-- <el-col :span="12">
                        <el-form-item label="时间" prop="DateTime">
                            <el-date-picker v-model="form.DateTime" type="datetime" placeholder="选择时间"></el-date-picker>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="余额" prop="Balance">
                            <el-input placeholder="请输入余额" v-model="form.Balance" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </span>
        </el-dialog>
        <el-dialog title="添加加油卡充值记录" v-model="showRecharge" @close="resetForm('rechargeForm')">
            <el-form ref="rechargeForm" :model="rechargeForm" :rules="rules2" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="加油时间" prop="DateTime">
                            <el-date-picker v-model="rechargeForm.DateTime" type="datetime" placeholder="选择加油时间" :picker-options="pickerOptions" style="width:100%"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="油卡编号" prop="GasolineCardID">
                            <el-select v-model="rechargeForm.GasolineCardID" placeholder="请选择">
                                <el-option
                                v-for="(item,index) in cardList"
                                :key="index"
                                :label="item.CardNum"
                                :value="item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="总额" prop="Total">
                            <el-input placeholder="请输入总额" v-model="rechargeForm.Total"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="油卡余额" prop="Balance">
                            <el-input placeholder="油卡余额" v-model="rechargeForm.Balance" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showRecharge = false">取 消</el-button>
            <el-button type="primary" @click="confirmRecharge()" :loading="!isRechargeEditable">{{isRechargeEditable?'确 定':'提交中'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import path from '../../../api/api.js'
import { gasolineLogApi, carBaseApi, driverBaseApi } from 'api'
export default {
  created() {
    this.fetchData()
    this.getList()
  },
  data() {
    return {
      rules: {
        Channel: [{ required: true, message: '请选择渠道信息' }],
        CarID: [{ required: true, message: '请选择车辆信息' }],
        DriverID: [{ required: true, message: '请选择司机信息' }],
        DateTime: [{ required: true, message: '请选择加油时间' }]
      },
      rules2: {
        GasolineCardID: [{ required: true, message: '请选择油卡编号' }],
        DateTime: [{ required: true, message: '请选择充值时间' }],
        Total: [{ required: true, message: '请输入总额' }]
      },
      filters: {
        CarID: '',
        DriverID: '',
        labelVal: '1'
      },
      selectedOptions: [
        {
          value: '1',
          label: '车牌号'
        },
        {
          value: '2',
          label: '司机姓名'
        }
      ],
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      showDialog: false,
      showRecharge:false,
      disabled: false,
      form: {
        CarID: '',
        DriverID: '',
        Channel: 0,
        DateTime: '',
        GasolineStation:'',
        GasolineCardNo:'',
        SerialNumber:'',
        GasolineType:'',
        UnitPrice:'',
        Count:'',
        Total:'',
        CarKilometer:'',
        Balance:''
      },
      rechargeForm : {
        GasolineCardID:'',
        DateTime: '',
        Total:'',
        Balance:''
      },
      Channel: '',
      channelList: [
        {
          label: '加油卡',
          value: 0
        },
        {
          label: '其他',
          value: 1
        }
      ],
      carList: [],
      driverList: [],
      pickerOptions: {},
      isEditable:true,
      isRechargeEditable:true,
      oilList:[
          { "value": "90#"},
          { "value": "92#"},
          { "value": "95#"},
          { "value": "柴油"}
      ],
      stationList:[
          { "value": "杭州支路加油站"},
          { "value": "山东路加油站"},
          { "value": "萍乡路加油站"}
      ],
      cardList:[],
      cardBalance:'',
      expandRowKeys: []

    }
  },
  watch:{
      'form.GasolineCardNo':async function () {
          console.log(this.form.GasolineCardNo)
          const res = await gasolineLogApi.getLastLog(this.form.GasolineCardNo)
          this.cardBalance = (res.data.Data&&res.data.Data.Balance)?res.data.Data.Balance:0
          this.form.Balance =  this.cardBalance - this.form.Total||0
          console.log(this.cardBalance,this.form.Balance)
      },
      'form.UnitPrice': function () {
          this.form.Total =  this.form.UnitPrice * this.form.Count
      },
      'form.Count': function () {
          this.form.Total =  this.form.UnitPrice * this.form.Count
      },
      'form.Total': function () {
          if(this.cardBalance){
              this.form.Balance =  this.cardBalance - this.form.Total||0
               console.log(this.cardBalance,this.form.Balance)
          }
      },
      'rechargeForm.GasolineCardID': async function(){
          const res = await gasolineLogApi.getLastLog(this.rechargeForm.GasolineCardID)
          this.rechargeForm.Balance = (res.data.Data&&res.data.Data.Balance)?res.data.Data.Balance:0
      }
  },
  methods: {
    querySearch(queryString, cb) {
        var restaurants = this.oilList;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
    },
    handleSelect(item) {
        console.log(item);
    },
    querySearch1(queryString, cb) {
        var restaurants = this.stationList;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
    },
    handleSelect1(item) {
        console.log(item);
    },
    gasolineSearch() {
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
        order: 'ID',
        query: {
          CarID: _self.filters.labelVal === '1' ? _self.filters.CarID : '',
          DriverID: _self.filters.labelVal === '2' ? _self.filters.DriverID : ''
        }
      }
      try {
        const res = await gasolineLogApi.list(options)
        _self.list = res.data.Data

        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    async getList() {
      const res = await carBaseApi.listByQuery()
      this.carList = res.data.Data
      const res2 = await driverBaseApi.listByQuery()
      this.driverList = res2.data.Data
      const res3 = await gasolineLogApi.cardList()
      this.cardList = res3.data.Data
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
      this.form = {
        CarID: '',
        DriverID: '',
        Channel: 0,
        DateTime: '',
        GasolineStation:'',
        GasolineCardNo:'',
        SerialNumber:'',
        GasolineType:'',
        UnitPrice:'',
        Count:'',
        Total:'',
        CarKilometer:'',
        Balance:''
      }
      _self.showDialog = true
    },
    recharge(){
      const _self = this
      this.rechargeForm = {
        GasolineCardID:'',
        DateTime: '',
        Total:'',
        Balance:''
      }
      _self.showRecharge = true
    },
    // async clickEditBtn($index, row) {
    //   const _self = this
    //   try {
    //     const res = await gasolineLogApi.detail(row.ID)
    //     _self.form = res.data.Data
    //     _self.showDialog = true
    //   } catch (e) {
    //     console.error(e)
    //   }
    // },
    submitForm() {
      const _self = this
    //   if (_self.form.ID) {
    //     _self.editSave()
    //   } else {
        _self.addSave()
    //   }
    },
    async addSave() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            _self.form.DateTime = new Date(_self.form.DateTime).Format('yyyy-MM-dd hh:mm:ss')
            await gasolineLogApi.add(_self.form)
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
          } finally {
            _self.isEditable = true
          }
        } else {
          return false
        }
      })
    },
    async confirmRecharge() {
      const _self = this
      _self.$refs['rechargeForm'].validate(async valid => {
        if (valid) {
          try {
            _self.isRechargeEditable = false
            _self.rechargeForm.DateTime = new Date(_self.rechargeForm.DateTime).Format('yyyy-MM-dd hh:mm:ss')
            await gasolineLogApi.recharge(_self.rechargeForm)
            _self.fetchData()
            _self.$refs['rechargeForm'].resetFields()
            _self.showRecharge = false
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
            _self.$message.error('添加失败!!!')
          } finally {
            _self.isRechargeEditable = true
          }
        } else {
          return false
        }
      })
    },
    getInfo(row, expanded) {
        const _self = this
        if (expanded) {
          _self.expandRowKeys.length = 0
          _self.expandRowKeys.push(row.ID)
        }
      },
    // async editSave() {
    //   const _self = this
    //   _self.$refs['form'].validate(async valid => {
    //     if (valid) {
    //       try {
    //         _self.isEditable = false
    //         await gasolineLogApi.edit(_self.form.ID, _self.form)
    //         _self.fetchData()
    //         _self.$refs['form'].resetFields()
    //         _self.showDialog = false
    //         _self.$message({
    //           message: '编辑成功',
    //           type: 'success'
    //         })
    //       } catch (e) {
    //         console.error(e)
    //         _self.$message.error('编辑失败!!!')
    //       } finally {
    //         _self.isEditable = true
    //       }
    //     } else {
    //       return false
    //     }
    //   })
    // },
    channelChange() {
      if (this.form.Channel == 0) {
        this.disabled = false
      }
      if (this.form.Channel == 1) {
        this.disabled = true
        this.form.SerialNumber = ''
      }
    }
  }
}
</script>
<style lang="scss">
#gasoline-log {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 0 10px 16px !important;
    }
    .demo-table-expand .el-form-item span {
        color: orange;
    }
}
</style>
