<template lang="html">
    <div id="gasoline-log">
        <el-row :gutter="20">
            <el-col :span="3">
                <el-select v-model="filters.labelVal"  placeholder="请选择">
                    <el-option
                        v-for="(item,index) in selectedOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <el-select v-model="filters.CarID" filterable clearable placeholder="请选择车牌号" v-show="filters.labelVal == '1'">
                    <el-option v-for="(item,index) in carList" :key="index" :label="item.CarNumber" :value="item.ID"></el-option>
                </el-select>
                <el-select v-model="filters.DriverID" filterable clearable placeholder="请选择司机姓名" v-show="filters.labelVal == '2'">
                    <el-option v-for="(item,index) in driverList" :key="index" :label="item.Name" :value="item.ID"></el-option>
                </el-select>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" @click="gasolineSearch(filters)">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">
                    创建
                </el-button>
            </el-col >
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                             <img v-if="props.row.ImagePath" :src="imageUrl+ props.row.ImagePath" style="width: 200px;">
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="CarID" label="汽车ID"></el-table-column>
            <el-table-column prop="DriverID" label="司机ID"></el-table-column>
            <el-table-column prop="Channel" label="渠道">
                <template scope="scope">
                            <p v-if="scope.row.Channel === 0">加油卡</p>
                            <p v-if="scope.row.Channel === 1">其他</p>
                </template>
            </el-table-column>
            <el-table-column prop="DateTimeString" label="加油时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="SerialNumber" label="流水号"></el-table-column>
            <el-table-column prop="GasolineType" label="油品标号"></el-table-column>
            <el-table-column prop="UnitPrice" label="单价"></el-table-column>
            <el-table-column prop="Count" label="数量"></el-table-column>
            <el-table-column prop="Total" label="总额"></el-table-column>
            <!-- <el-table-column prop="DateTime" label="时间" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="GasolineStation" label="加油站" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="150">
<template scope="scope">
    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
        编辑</el-button>
    <DeleteButton api="gasolineLogApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
            </el-table-column>
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
                        <el-form-item label="加油时间" prop="DateTimeString">
                            <el-date-picker v-model="form.DateTimeString" type="datetime" placeholder="选择加油时间" :picker-options="pickerOptions" style="width:100%"></el-date-picker>
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
                            <el-input placeholder="请输入油品标号" v-model="form.GasolineType"></el-input>
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
                        <el-form-item label="加油站" prop="GasolineStation">
                            <el-input placeholder="请输入加油站名称" v-model="form.GasolineStation"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="24">
                     <el-col :span="12">
                        <el-form-item label="时间" prop="DateTime">
                            <el-date-picker v-model="form.DateTime" type="datetime" placeholder="选择时间"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import path from '../../../api/api.js'
import { gasolineLogApi, carBaseApi, driverBaseApi } from 'api'
export default {
  created() {
    this.imageUrl = path.imageUrl
    this.fetchData()
    this.getList()
  },
  data() {
    return {
      rules: {
        Channel: [{ required: true, message: '请选择渠道信息' }],
        CarID: [{ required: true, message: '请选择车辆信息' }],
        DriverID: [{ required: true, message: '请选择司机信息' }]
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
      imageUrl: '',
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      showDialog: false,
      disabled: false,
      form: {
        CarID: '',
        DriverID: '',
        Channel: 0,
        DateTimeString: ''
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
      pickerOptions: {}
    }
  },
  methods: {
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
        DateTimeString: ''
      }
      _self.showDialog = true
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        const res = await gasolineLogApi.detail(row.ID)
        _self.form = res.data.Data
        _self.showDialog = true
      } catch (e) {
        console.error(e)
      }
    },
    submitForm() {
      const _self = this
      if (_self.form.ID) {
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
            _self.isEditable = false
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
    async editSave() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            await gasolineLogApi.edit(_self.form.ID, _self.form)
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
          } finally {
            _self.isEditable = true
          }
        } else {
          return false
        }
      })
    },
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
}
</style>
