<template lang="html">
  <div id="pay-company-page">
    <el-form v-model="filters" label-width="110px">
      <el-row :gutter="24">
        <el-col :span="6" style="margin-left:-40px;">
          <el-form-item label="账户名称">
            <el-input placeholder="请输入账户名称" v-model="filters.accountName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="状态">
            <el-select v-model="filters.state" placeholder="请选择">
              <el-option v-for="item in [{value:1,label:'废除'},{value:0,label:'正常'}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否我公司账号">
            <el-switch on-text="是" off-text="否" :on-value="1" :off-value="0" v-model="filters.Own"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="11">
          <el-button type="primary" @click="search(filters)">搜索</el-button>
          <el-button type="primary" @click="clickAddBtn()">创建</el-button>
        </el-col>
      </el-row>
    </el-form>
    <CustomTable :list="list" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData" >
      <el-table-column  width="150"  label="操作" fixed="right" slot="right-one">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          <DeleteButton api="payCompanyApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
         </template>

      </el-table-column>
      <el-table-column sortable prop="State" label="序号" width="80" show-overflow-tooltip slot="right-one">
           <template scope="scope">
             {{scope.row.SortNo}} 
              </template>
       </el-table-column>
      <el-table-column sortable prop="State" label="状态" width="80" show-overflow-tooltip slot="right-one">
           <template scope="scope">
             {{scope.row.State?'废除':'正常'}} 
              </template>
       </el-table-column>
    </CustomTable>
    <div style="text-align:center;margin:10px;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
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
      </el-table>-->
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
       v-for="item in [{value:1,label:'废除'},{value:0,label:'正常'}]"
       :key="item.value"
       :label="item.label"
       :value="item.value">
     </el-option>
   </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item label="是否为我公司账号" prop="Own">
                    <el-switch on-text="是" off-text="否" :on-value="1" :off-value="0" v-model="form.Own"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item label="银行" prop="Bank">
                    <el-input placeholder="请输入银行名称" v-model="form.Bank"></el-input>
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
    //this.fetchData()
    this.configList = payCompanyApi.getConfig()
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      count: 0,
      list: [],
      loading: false,
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
        state: '',
        Own:1,
        Bank:''
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
      },
      filters:{
        accountName:'',
        state: '',
        Own:1
      }
    }
  },
  methods: {
    search(filters) {
      this.filters = filters
      this.fetchData()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(1, this.pageSize)
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
      try {
        const options = {
          pageIndex: _self.currentPage,
          pageSize: _self.pageSize,
          order: 'ID',
          query: { 
            AccountName:_self.filters.accountName,
            State:_self.filters.state,
            Own:_self.filters.Own,
          }
        }
        const res = await payCompanyApi.list(options)
        _self.list = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    clickAddBtn() {
      const _self = this
      _self.showDialog = true
      _self.form = {
        Own:1
      }
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
        _self.form.Own = res.data.Data.Own,
        _self.form.Bank = res.data.Data.Bank,
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
