<template lang="html">
<div id="Wxyh">
<!--
    <el-row :gutter="20">
        <el-col :span="5">
            <el-input placeholder="" v-model="filters.Nickname"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn()">添加</el-button>
        </el-col>
    </el-row> -->
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="ProjectType" label="项目">
          <template scope="scope">
            <span  v-if="scope.row.ProjectType == 0">酒店订单</span>
            <span  v-if="scope.row.ProjectType == 1">酒店财务</span>
            <span  v-if="scope.row.ProjectType == 9">其他</span>            
          </template>
        </el-table-column>
        <el-table-column prop="Title" label="标题"></el-table-column>
        <el-table-column prop="Description" label="描述"></el-table-column>
        <el-table-column prop="OptState" label="处理状态"></el-table-column>
        <el-table-column prop="OptUserName" label="处理人"></el-table-column>
        <el-table-column prop="CreateTime" label="创建时间"></el-table-column>
        <el-table-column prop="CreateUserName" label="提单人"></el-table-column>        
        <el-table-column prop="ReState " label="结单状态">
        <template scope="scope">
            <span v-if="scope.row.ReState  == 0">未结</span>
            <span v-if="scope.row.ReState  == 1">结单</span>
          </template>
        </el-table-column> 
    </el-table>
    <el-dialog :title="dialogTitle" v-model="showDialog" @close="resetForm('form')">
      <el-form ref="form" :model="form"  label-width="60px">
      <!--
        <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="昵称" prop="Nickname">
                  <el-input v-model="form.Nickname" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="微信号" prop="UserName">
                  <el-input v-model="form.UserName" ></el-input>
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
import { lssue } from 'api'
export default {
  data() {
    return {
      dwzList: [],
      loading: false,
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      labelPosition: 'right',
      form: {
        Nickname: '',
        UserName: '',
        ID:'',
        Name: '',
        OptUser: '', 
        CaiUser: '',
        Remark: '',
        State:'',                          
        Tel: ''
      },
      copyForm: {},
      filters: {
        Nickname: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    carlineStationSearch(filters) {
      const options = {
        query: {
          Nickname: filters.Nickname
        }
      }
      this.fetchData(options)
    },
    async fetchData(option) {
      const _self = this
      _self.loading = true
      try {
        const res = await lssue.listByQuery(option)
        console.log(res)
        this.dwzList = res.data.Data
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async clickAddBtn() {
      const _self = this
      _self.dialogTitle = '添加微信用户'
      _self.showDialog = true
      _self.form = {}
      _self.State = 0      
    },
    async clickEditBtn($index, row) {
      const _self = this
      _self.dialogTitle = '编辑微信用户信息'
      _self.showDialog = true      
      try {
        _self.form.CaiUser = row.CaiUser
        _self.form.Name = row.Name
        _self.form.Nickname = row.Nickname
        _self.form.ID = row.ID
        _self.form.OptUser = row.OptUser
        _self.form.State = row.State        
        _self.form.Tel = row.Tel
        _self.form.UserName = row.UserName
        _self.form.Remark = row.Remark 
      } catch (e) {
        console.error(e)
      }
    },
    submitForm() {
      const _self = this
      if (_self.dialogTitle == '编辑微信用户信息') {
        _self.editSave()
      } else {
        _self.addSave()
      }
    },
    async addSave() {
      const _self = this
      try {
        _self.isEditable = false
        await lssue.add(_self.form)
        _self.fetchData()
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
    },
    async editSave() {
      const _self = this
      const form = {}
      for (let [k, v] of Object.entries(_self.form)) {
        if (_self.form[k] != _self.copyForm[k]) {
          form[k] = v
        }
      }
      try {
        _self.isEditable = false
        await lssue.edit(_self.form.ID, form)
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
    }
  }
}
</script>
<style lang="scss">
#Wxyh{
  .el-dialog--small{
    width:50%
  }
}
</style>
