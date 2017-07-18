<template lang="html">
  <div id="hotel-paymode-page">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="clickAddBtn()">创建</el-button>
      </el-col>
    </el-row>
    <!-- <CustomTable :list="list" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData">
                <el-table-column  width="150"  label="操作" fixed="right" slot="right-one">
                  <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <DeleteButton api="hotelPayModeApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
        </el-table-column>
      </CustomTable> -->
     <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border row-key="ID">
      <el-table-column sortable prop="ID" label="ID"  width="180" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="ModeName" label="账户名称"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column  width="150"  label="操作" fixed="right">
<template scope="scope">
  <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
    编辑</el-button>
  <DeleteButton api="hotelPayModeApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
      </el-table-column>
    </el-table> 
    <el-dialog :title="form.id?'编辑支付方式':'添加支付方式'" v-model="showDialog" size="tiny" @close="resetForm('form')">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item label="账户名称" prop="modeName">
          <el-input placeholder="请输入账户名称" v-model="form.modeName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    hotelPayModeApi
  } from 'api'
  export default {
    created() {
      this.fetchData()
      this.configList = hotelPayModeApi.getConfig()
    },
    data() {
      return {
        list: [],
        loading: true,
        showDialog: false,
        copyForm: {},
        form: {
          id: '',
          modeName: '',
          remark: ''
        },
        rules: {
          modeName: [{
            required: true,
            message: '请输入账户名称'
          }]
        }
      }
    },
    methods: {
      async fetchData() {
        const _self = this
        _self.loading = true
        try {
          const res = await hotelPayModeApi.list()
          _self.list = res.data
          _self.loading = false
        } catch (e) {
          console.error(e)
          _self.loading = false
        }
      },
      clickAddBtn() {
        const _self = this
        _self.showDialog = true
        _self.form = {}
      },
      async clickEditBtn($index, row) {
        const _self = this
        try {
          const res = await hotelPayModeApi.detail(row.ID)
          _self.showDialog = true
          _self.form.id = res.data.Data.ID
          _self.form.modeName = res.data.Data.ModeName
          _self.form.remark = res.data.Data.Remark
          _self.copyForm = Object.assign({}, _self.form);
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
              const form = {
                ..._self.form
              }
              delete form.id
              await hotelPayModeApi.add(form)
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
            const form = {}
            for (let [k, v] of Object.entries(_self.form)) {
              if (_self.form[k] != _self.copyForm[k]) {
                form[k] = v
              }
            }
            try {
              await hotelPayModeApi.edit( _self.form.id,form)
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
  #hotel-paymode-page {
    .el-table .cell {
      white-space: nowrap;
      word-break: break-all;
      line-height: 24px;
    }
  }
</style>
