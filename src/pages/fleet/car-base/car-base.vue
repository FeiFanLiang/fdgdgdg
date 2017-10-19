<template lang="html">
<div id="car-base">
  <!-- <el-row :gutter="20" class="align-center">
            <el-col :span="4">
                <el-select v-model="filters.carClassify" clearable placeholder="车辆分类" style="width:100%" @change="fetchData()">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入车型" v-model="filters.carMode"></el-input>
            </el-col>
            <el-col :span="4">
                <el-checkbox v-model="filters.isdelete">包含已删除车辆</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">创建</el-button>
            </el-col>
        </el-row> -->
  <CustomSearch :configList="configList.searchFields" @searchCallback="searchCallback">
    <el-button type="primary" @click="clickAddBtn" slot="button-add">创建</el-button>
  </CustomSearch>
  <CustomTable :list="list" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData">
    <el-table-column prop="CarClassify" label="车辆分类" slot="left-one">
      <template scope="scope">
                  <p v-if="scope.row.CarClassify === 0">经济型</p>
                  <p v-if="scope.row.CarClassify === 1">舒适型</p>
                  <p v-if="scope.row.CarClassify === 2">商务型</p>
                  <p v-if="scope.row.CarClassify === 3">豪华型</p>
</template>
          </el-table-column>
          <el-table-column label="操作" width="150" slot="right-one">
<template scope="scope">
<el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
  编辑</el-button>
<DeleteButton api="carBaseApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
          </el-table-column>
        </CustomTable>
         <!-- <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="CarClassify" label="车辆分类">
<template scope="scope">
<p v-if="scope.row.CarClassify === 0">
  经济型</p>
<p v-if="scope.row.CarClassify === 1">舒适型</p>
<p v-if="scope.row.CarClassify === 2">商务型</p>
<p v-if="scope.row.CarClassify === 3">豪华型</p>
</template>
            </el-table-column>
            <el-table-column prop="CarMode" label="车型"></el-table-column>
            <el-table-column prop="CarNumber" label="车牌号"></el-table-column>
            <el-table-column prop="OperationCity" label="运营城市"></el-table-column>
            <el-table-column prop="SeatNum" label="座位数"></el-table-column>
            <el-table-column prop="SeatingNum" label="最大载客数"></el-table-column>
            <el-table-column prop="LuggageNum" label="行李数"></el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="150">
<template scope="scope">
<el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
  编辑</el-button>
<DeleteButton api="carBaseApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
            </el-table-column>
        </el-table>  -->
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.id?'编辑车辆基本信息':'添加车辆基本信息'" v-model="showDialog" @close="resetForm('form')">
            <el-form :rules="rules" ref="form" :model="form" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车辆分类" prop="carClassify">
                            <el-select v-model="form.carClassify" clearable placeholder="请选择车辆类型" style="width:100%">
                                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="车型" prop="carMode">
                            <el-input placeholder="请输入车型" v-model="form.carMode"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车牌号" prop="carNumber">
                            <el-input placeholder="请输入车牌号" v-model="form.carNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="品牌" prop="carBrand">
                            <el-input placeholder="请输入品牌" v-model="form.carBrand"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车辆颜色" prop="carColor">
                            <el-input placeholder="请输入车辆颜色" v-model="form.carColor"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出厂日期" prop="releaseDate">
                            <el-date-picker v-model="form.releaseDate" type="date" placeholder="请选择出厂日期" :picker-options="pickerOptions"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="运营城市" prop="operationCity">
                            <el-input placeholder="请输入运营城市" v-model="form.operationCity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="座位数" prop="seatNum">
                            <el-input placeholder="请输入座位数" v-model="form.seatNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="最大载客人数" prop="seatingNum">
                            <el-input placeholder="请输入最大载客人数" v-model="form.seatingNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行李数" prop="luggageNum">
                            <el-input placeholder="请输入行李数" v-model="form.luggageNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
                            <el-input type="textarea" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </span>
        </el-dialog>
        <UploadImage></UploadImage>
    </div>
</template>
<script>
import {
  carBaseApi
} from 'api'
import UploadImage from 'components/upload-image'

export default {
  components: {
    UploadImage
  },
  created() {
    this.fetchData()
    this.configList = carBaseApi.getConfig()
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      isEditable: true,
      showDialog: false,
      pickerOptions: {},
      copyForm: {},
      form: {
        id: '',
        carClassify: '',
        carMode: '',
        carBrand: '',
        carColor: '',
        releaseDate: '',
        carNumber: '',
        operationCity: '',
        seatNum: '',
        seatingNum: '',
        luggageNum: '',
        remark: ''
      },
      rules: {
        carClassify: [{
          required: true,
          message: '请输入车辆分类'
        }],
        carMode: [{
          required: true,
          message: '请输入车型'
        }],
        carNumber: [{
          required: true,
          message: '请输入车牌号'
        }],
        operationCity: [{
          required: true,
          message: '请输入运营城市'
        }],
        seatNum: [{
          required: true,
          message: '请输入座位数'
        }],
        seatingNum: [{
          required: true,
          message: '请输入最大载客人数'
        }],
        luggageNum: [{
          required: true,
          message: '请输入行李数'
        }]
      },
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
        carMode: '',
        carClassify: '',
        isdelete: true
      }
    }
  },
  methods: {
    searchCallback(filters) {
      this.filters = filters
      this.fetchData()
    },
    /* search() {
      this.fetchData()
    }, */
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
          carClassify: _self.filters.carClassify,
          carMode: _self.filters.carMode,
          isdelete: !_self.filters.isdelete
        }
      }
      try {
        const res = await carBaseApi.listByQuery(options)
        _self.list = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    clickAddBtn() {
      const _self = this
      _self.showDialog = true
      _self.form = {
        carClassify: ''
      }
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        _self.showDialog = true
        const res = await carBaseApi.detail(row.ID)
        _self.form.id = res.data.Data.ID
        _self.form.carClassify = res.data.Data.CarClassify
        _self.form.carMode = res.data.Data.CarMode
        _self.form.carBrand = res.data.Data.CarBrand
        _self.form.carColor = res.data.Data.CarColor
        _self.form.releaseDate = res.data.Data.ReleaseDate
        _self.form.carNumber = res.data.Data.CarNumber
        _self.form.luggageNum = res.data.Data.LuggageNum
        _self.form.operationCity = res.data.Data.OperationCity
        _self.form.seatNum = res.data.Data.SeatNum
        _self.form.seatingNum = res.data.Data.SeatingNum
        _self.form.remark = res.data.Data.Remark
        _self.copyForm = Object.assign({}, _self.form)
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
            _self.isEditable = false
            await carBaseApi.add(_self.form)
            _self.fetchData()
            _self.$refs['form'].resetFields()
            _self.showDialog = false
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (e) {
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
          const form = {}
          for (let [k, v] of Object.entries(_self.form)) {
            if (_self.form[k] != _self.copyForm[k]) {
              form[k] = v
            }
          }
          try {
            _self.isEditable = false
            await carBaseApi.edit2(_self.form.id, form)
            _self.fetchData()
            _self.$refs['form'].resetFields()
            _self.showDialog = false
            _self.$message({
              message: '编辑成功',
              type: 'success'
            })
          } catch (e) {
            _self.$message.error('编辑失败!!!')
          } finally {
            _self.isEditable = true
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
#car-base {
  .align-center {
    display: flex;
    align-items: center;
  }
  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
}
</style>
