<template lang="html">
<div id="Wxyh">
    <el-row :gutter="20">
        <el-col :span="5">
            <el-input placeholder="请输入微信昵称" v-model="filters.Nickname"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn()">添加</el-button>
        </el-col>
    </el-row>
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading">
        <el-table-column prop="Nickname" label="昵称"></el-table-column>
        <el-table-column prop="UserName" label="微信号"></el-table-column>
        <el-table-column prop="Name" label="姓名"></el-table-column>
        <el-table-column prop="Tel" label="电话"></el-table-column>
        <el-table-column prop="OptUser" label="处理人"></el-table-column>
        <el-table-column prop="CaiUser" label="采购人"></el-table-column>
        <el-table-column prop="Remark" label="备注"></el-table-column>
        <el-table-column prop="State" label="状态">
        <template scope="scope">
            <span v-if="scope.row.State == 0">废除</span>
            <span v-if="scope.row.State == 1">正常</span>
          </template>
        </el-table-column>
        
       
        <el-table-column label="操作" width="170">
            <template scope="scope">
                <el-button type="primary" size="small" @click="clickEditBtn(scope.$index,scope.row)">编辑</el-button>
                <DeleteButton api="wxyhApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" v-model="showDialog" @close="resetForm('form')">
      <el-form ref="form" :model="form"  label-width="60px">
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
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="姓名" prop="Name">
                  <el-input v-model="form.Name" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="电话" prop="Tel">
                  <el-input v-model="form.Tel" ></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="处理人" prop="OptUser">
                  <el-input v-model="form.OptUser" ></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="10">
              <el-form-item label="采购人" prop="CaiUser">
                  <el-input v-model="form.CaiUser" ></el-input>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10">
              <el-form-item label="备注" prop="Remark">
                  <el-input  type="textarea" v-model="form.Remark" autosize :minlength="200"></el-input>
              </el-form-item>
          </el-col>
         <el-col :span="10">
              <el-form-item label="状态" prop="State">
                  <el-radio-group v-model="form.State">
                      <el-radio :label="1">正常</el-radio>
                      <el-radio :label="0">废除</el-radio>
                  </el-radio-group>   
              </el-form-item> 
          </el-col> 
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import { wxyhApi } from 'api'
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
        const res = await wxyhApi.listByQuery(option)
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
        await wxyhApi.add(_self.form)
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
        await wxyhApi.edit(_self.form.ID, form)
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
