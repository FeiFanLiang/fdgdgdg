<template lang="html">
<div id="Station">
     <CustomSearch :configList="configList.searchFields" @searchCallback="searchCallback">
        <el-button type="primary" @click="clickAddBtn" slot="button-add">创建</el-button>
    </CustomSearch>
    <CustomTable :list="list" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column label="操作" width="150" slot="right-two">
            <template scope="scope">
                <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <DeleteButton api="stationApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
            </template>
        </el-table-column>
    </CustomTable>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="currentPage" :page-size="pageSize" :total="count">
        </el-pagination>
    </div>
    <el-dialog :title="form.ID?'编辑车辆停靠点':'添加车辆停靠点'" v-model="showDialog" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form" label-width="110px">
            <el-form-item label="名称" prop="Name">
                <el-input v-model="form.Name"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="Address">
                <el-input v-model="form.Address"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="Description">
                <el-input type="textarea" v-model="form.Description"></el-input>
            </el-form-item>
            <el-form-item label="经度" prop="StartLongitude">
                <el-input v-model="form.StartLongitude"></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="StartLatitude">
                <el-input v-model="form.StartLatitude"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import { stationApi } from 'api'
export default {
  created() {
    this.fetchData()
    this.configList = stationApi.getConfig()
  },
  data() {
    return {
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      isEditable: true,
      filters: {
        Name: ''
      },
      showDialog: false,
      form: {
        ID: '',
        Name: '',
        Address: '',
        Description: '',
        StartLatitude: '',
        StartLongitude: ''
      },
      copyForm: {},
      rules: {
        Name: [
          {
            required: true,
            message: '请输入路线名称'
          }
        ]
      }
    }
  },
  methods: {
    searchCallback(filters) {
      this.filters = filters
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
          Name: _self.filters.Name
        }
      }
      try {
        const res = await stationApi.listByQuery(options)
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
      _self.form = {}
      _self.showDialog = true
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        _self.showDialog = true
        _self.form.ID = row.ID
        _self.form.Name = row.Name
        _self.form.Description = row.Description
        _self.form.Address = row.Address
        _self.form.StartLongitude = row.StartLongitude
        _self.form.StartLatitude = row.StartLatitude
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
            await stationApi.add(_self.form)
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
        const form = {}
        for (let [k, v] of Object.entries(_self.form)) {
          if (_self.form[k] != _self.copyForm[k]) {
            form[k] = v
          }
        }
        if (valid) {
          try {
            _self.isEditable = false
            await stationApi.edit2(_self.form.ID, form)
            _self.$refs['form'].resetFields()
            _self.showDialog = false
            _self.fetchData()
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
    }
  }
}
</script>
<style lang="scss">

</style>
