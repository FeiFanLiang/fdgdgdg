<template lang="html">
  <div id="pay-company-page">
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="clickAddBtn()">创建</el-button>
      </el-col>
    </el-row>
    <CustomTable :list="list">
      <el-table-column  width="150"  label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          <DeleteButton api="payCompanyApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
         </template>
      </el-table-column>
    </CustomTable>
      <!-- <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
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
            <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
            <DeleteButton api="payCompanyApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
           </template>
        </el-table-column>
      </el-table> -->
      <el-dialog :title="form.id?'编辑支付账户':'添加支付账户'" v-model="showDialog" size="tiny" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form"  >
          <el-form-item label="账户名称" prop="accountName">
            <el-input placeholder="请输入账户名称" v-model="form.accountName"></el-input>
          </el-form-item>
          <el-form-item label="银行帐户" prop="accountNum">
            <el-input placeholder="请输入银行账户" v-model="form.accountNum"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
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
import { payCompanyApi } from 'api';

export default {
  data() {
    return {
      list: [],
      loading: true,
      showDialog: false,
      form: {
        id: '',
        accountName: '',
        accountNum: '',
        remark: ''
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
    };
  },

  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async fetchData() {
      const _self = this;
      _self.loading = true;
      try {
        const res = await payCompanyApi.list();
        _self.list = res.data;
        _self.loading = false;
      } catch (e) {
        console.error(e);
        _self.loading = false;
      }
    },
    clickAddBtn() {
      const _self = this;
      _self.showDialog = true;
      _self.form = {};
    },
    async clickEditBtn($index, row) {
      const _self = this;
      try {
        const res = await payCompanyApi.detail(row.ID);
        _self.showDialog = true;
        _self.form.id = res.data.ID;
        _self.form.accountName = res.data.AccountName;
        _self.form.accountNum = res.data.AccountNum;
        _self.form.remark = res.data.Remark;
      } catch (e) {
        console.error(e);
      }
    },
    submitForm() {
      const _self = this;
      if (_self.form.id) {
        _self.editSave();
      } else {
        _self.addSave();
      }
    },
    async addSave() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            const form = {
              ..._self.form
            };
            delete form.id;
            await payCompanyApi.add(form);
            _self.fetchData();
            _self.$refs['form'].resetFields();
            _self.showDialog = false;
            _self.$message({
              message: '保存成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
            _self.$message.error('添加失败!!!');
          }
        } else {
          return false;
        }
      });
    },
    async editSave() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            await payCompanyApi.edit(_self.form);
            _self.fetchData();
            _self.$refs['form'].resetFields();
            _self.showDialog = false;
            _self.$message({
              message: '编辑成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
            _self.$message.error('编辑失败!!!');
          }
        } else {
          return false;
        }
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>
