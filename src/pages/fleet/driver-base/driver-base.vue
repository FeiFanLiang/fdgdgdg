<template lang="html">
    <div id="driver-base">
        <el-row :gutter="20">
            <el-col :span="5">
                <el-select v-model="filters.jobStatus" placeholder="工作状态" @change="fetchData()">
                    <el-option label="全部" value="">全部</el-option>
                    <el-option v-for="(item,index) in jobStatusList" :key="index" :label="item.label" :value="item.value">
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
                <el-input placeholder="请输入姓名" v-model="filters.name" v-show="filters.labelVal == '1'"></el-input>
                <el-input placeholder="请输入电话" v-model="filters.phone" v-show="filters.labelVal == '2'"></el-input>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="search">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">创建</el-button>
            </el-col>
        </el-row>
        <!-- <CustomSearch :configList="configList.searchFields" @searchCallback="searchCallback">
            <el-button type="primary" @click="clickAddBtn" slot="button-add">创建</el-button>
        </CustomSearch> -->
        <CustomTable :list="list" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData">
          <el-table-column prop="JobStatus" label="工作状态" width="100" slot="right-one">
              <template scope="scope">
                  <p v-if="scope.row.JobStatus === 1">正常在职</p>
                  <p v-if="scope.row.JobStatus === 2">已离职</p>
                  <p v-if="scope.row.JobStatus === 3">停职</p>
                  <p v-if="scope.row.JobStatus === 4">休假</p>
              </template>
          </el-table-column>
          <el-table-column label="操作" width="150" slot="right-two">
              <template scope="scope">
                  <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                  <DeleteButton api="driverBaseApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
              </template>
          </el-table-column>
        </CustomTable>
        <!-- <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="JobNnumber" label="工号"></el-table-column>
            <el-table-column prop="Name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Phone" label="电话" show-overflow-tooltip></el-table-column>
              <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="JobStatus" label="工作状态" width="100">
                <template scope="scope">
                    <p v-if="scope.row.JobStatus === 1">正常在职</p>
                    <p v-if="scope.row.JobStatus === 2">已离职</p>
                    <p v-if="scope.row.JobStatus === 3">停职</p>
                    <p v-if="scope.row.JobStatus === 4">休假</p>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <DeleteButton api="driverBaseApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                </template>
            </el-table-column>
        </el-table> -->
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.id?'编辑司机基本信息':'添加司机基本信息'" size="tiny" v-model="showDialog" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules">
                <el-form-item label="工号" prop="jobNnumber">
                    <el-input placeholder="请输入工号" v-model="form.jobNnumber"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="phone">
                    <el-input placeholder="请输入司机电话" v-model="form.phone"></el-input>
                </el-form-item>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="工作状态" prop="jobStatus">
                            <el-select v-model="form.jobStatus" placeholder="请选择工作状态" style="width:100%">
                                <el-option v-for="(item,index) in jobStatusList" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { driverBaseApi } from 'api'

export default {
  created() {
    this.fetchData()
    this.configList = driverBaseApi.getConfig()
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      showDialog: false,
      form: {
        id: 0,
        jobNnumber: '',
        name: '',
        phone: '',
        jobStatus: '',
        remark: ''
      },
      filters: {
        name: '',
        phone: '',
        jobStatus: '',
        labelVal: '1'
      },
      selectedOptions: [
        {
          value: '1',
          label: '姓名'
        },
        {
          value: '2',
          label: '电话'
        }
      ],
      jobStatusList: [
        {
          value: 1,
          label: '正常在职'
        },
        {
          value: 2,
          label: '已离职'
        },
        {
          value: 3,
          label: '停职'
        },
        {
          value: 4,
          label: '休假'
        }
      ],
      rules: {
        jobNnumber: [
          {
            required: true,
            message: '请输入司机工号'
          }
        ],
        name: [
          {
            required: true,
            message: '请输入司机姓名'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入司机手机号'
          }
        ],
        jobStatus: [
          {
            required: true,
            message: '请选择工作状态'
          }
        ]
      }
    }
  },
  methods: {
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
        order: 'ID',
        query: {
          name: _self.filters.labelVal === '1' ? _self.filters.name : '',
          phone: _self.filters.labelVal === '2' ? _self.filters.phone : '',
          jobStatus: _self.filters.jobStatus
        }
      }
      try {
        const res = await driverBaseApi.listByQuery(options)
        _self.list = res.data.Data
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
        name: '',
        phone: '',
        jobStatus: 1,
        remark: ''
      }
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        const res = await driverBaseApi.detail(row.ID)
        _self.showDialog = true
        _self.form.id = res.data.Data.ID
        _self.form.jobNnumber = res.data.Data.JobNnumber
        _self.form.name = res.data.Data.Name
        _self.form.phone = res.data.Data.Phone
        _self.form.jobStatus = res.data.Data.JobStatus
        _self.form.remark = res.data.Data.Remark
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
            await driverBaseApi.add(_self.form)
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
            await driverBaseApi.edit(_self.form)
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
<style lang="scss">
#driver-base {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
}
</style>
