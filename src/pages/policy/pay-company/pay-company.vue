<template lang="html">
  <div id="pay-company-page">
    <el-row>
      <el-col :span="11">
        <el-button type="primary" @click="clickAddBtn()">创建</el-button>
      </el-col>
    </el-row>
    <CustomTable :list="list" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData" >
      <el-table-column  width="150"  label="操作" fixed="right" slot="right-one">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          <DeleteButton api="payCompanyApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
         </template>

      </el-table-column>
       <el-table-column sortable prop="State" label="状态" width="180" show-overflow-tooltip slot="right-one">
           <template scope="scope">
             {{scope.row.State?'正常':'废除'}}
              </template>
       </el-table-column>
    </CustomTable>
       <!-- <el-table :data="list" ref="table" style="width: 100%"
        v-loading="loading"
        border
        row-key="ID"
        >
        <el-table-column sortable prop="ID" label="ID" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="AccountName"  label="账户名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="AccountNum"  label="银行帐户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
<template scope="scope">
  <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
    编辑</el-button>
  <DeleteButton api="payCompanyApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
        </el-table-column>
      </el-table>  -->
      <el-dialog :title="form.id?'编辑支付账户':'添加支付账户'" v-model="showDialog" size="tiny" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form"  >
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="账户名称" prop="accountName">
                    <el-input placeholder="请输入账户名称" v-model="form.accountName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="银行帐户" prop="accountNum">
                    <el-input placeholder="请输入银行账户" v-model="form.accountNum"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="简称" prop="shortName">
                    <el-input placeholder="请输入简称" v-model="form.shortName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="序号" prop="sortNo">
                    <el-input placeholder="请输入序号" v-model="form.sortNo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="公司名称" prop="company">
                    <el-input placeholder="请输入公司名称" v-model="form.company"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="状态" prop="state">
                    <el-select v-model="form.state" placeholder="请选择">
     <el-option
       v-for="item in [{value:0,label:'废除'},{value:1,label:'正常'}]"
       :key="item.value"
       :label="item.label"
       :value="item.value">
     </el-option>
   </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
          <el-form-item label="Remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
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
import { payCompanyApi } from 'api'
export default {
  created() {
    this.fetchData()
    this.configList = payCompanyApi.getConfig()
  },
  data() {
    return {
      list: [],
      loading: true,
      isEditable: true,
      showDialog: false,
      copyForm: {},
      form: {
        id: '',
        accountName: '',
        accountNum: '',
        remark: '',
        shortName: '',
        sortNo: '',
        company: '',
        state: ''
      },
      rules: {
        accountName: [
          {
            required: true,
            message: '请输入账户名称'
          }
        ],
        accountNum: [
          {
            required: true,
            message: '请输入银行账户'
          }
        ]
      }
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      try {
        const res = await payCompanyApi.list()
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
        const res = await payCompanyApi.detail(row.ID)
        _self.showDialog = true
        _self.form.id = res.data.Data.ID
        _self.form.accountName = res.data.Data.AccountName
        _self.form.accountNum = res.data.Data.AccountNum
        _self.form.remark = res.data.Data.Remark
        _self.form.shortName = res.data.Data.ShortName
        _self.form.sortNo = res.data.Data.SortNo
        _self.form.company = res.data.Data.Company
        _self.form.state = res.data.Data.State
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
            const form = {
              ..._self.form
            }
            delete form.id
            _self.isEditable = false
            await payCompanyApi.add(form)
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
            await payCompanyApi.edit(_self.form)
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
