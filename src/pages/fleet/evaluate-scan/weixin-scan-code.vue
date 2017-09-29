<template lang="html">
<div id="Dwz">
    <el-table :data="weixinList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="Title" label="名称"></el-table-column>
        <el-table-column prop="Code" label="代码"></el-table-column>
        <el-table-column prop="QrCodeUrl" label="二维码URL"></el-table-column>
        <el-table-column prop="Remark" label="备注"></el-table-column>
        <el-table-column label="操作">
            <template scope="scope">
                <el-button type="primary" size="small" @click="clickEditBtn(scope.$index,scope.row)">编辑</el-button>
                <DeleteButton api="weixinScanCodeApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                <el-button size="small" @click="createUrl(scope.row)">二维码</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
        </el-pagination>
    </div>
    <el-dialog title="编辑短链接信息" v-model="showDialog" size="tiny" @close="resetForm('form')">
      <el-form ref="form" :model="form">
        <el-form-item label="名称" prop="Title">
            <el-input placeholder="请输入名称" v-model="form.Title"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="Code">
            <el-input placeholder="请输入代码" v-model="form.Code"></el-input>
        </el-form-item>
        <el-form-item label="二维码URL" prop="QrCodeUrl">
            <el-input placeholder="请输入二维码URL" v-model="form.QrCodeUrl"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form.Remark"></el-input>
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
import { weixinScanCodeApi } from 'api'
export default {
  data() {
    return {
      weixinList: [],
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      form: {
        Title: '',
        Code: '',
        QrCodeUrl: '',
        Remark: ''
      },
      copyForm: {},
      currentPage: 1,
      pageSize: 10,
      count: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
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
        query: {}
      }
      try {
        const res = await weixinScanCodeApi.listByQuery(options)
        this.weixinList = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    clickEditBtn($index, row) {
      const _self = this
      _self.dialogTitle = '编辑短链接信息'
      try {
        _self.form.ID = row.ID
        _self.form.Title = row.Title
        _self.form.Code = row.Code
        _self.form.Remark = row.Remark
        _self.form.QrCodeUrl = row.QrCodeUrl
        _self.showDialog = true
      } catch (e) {
        console.error(e)
      }
    },
    async submitForm() {
      const _self = this
      const form = {}
      for (let [k, v] of Object.entries(_self.form)) {
        if (_self.form[k] != _self.copyForm[k]) {
          form[k] = v
        }
      }
      try {
        _self.isEditable = false
        await weixinScanCodeApi.edit(_self.form.ID, form)
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
    },
    async createUrl(row) {
      const _self = this
      const res = await weixinScanCodeApi.url(row.Code)
      row.QrCodeUrl = res.data
      await weixinScanCodeApi.edit(row.ID, row)
      _self.fetchData()
    }
  }
}
</script>
