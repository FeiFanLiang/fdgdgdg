<template lang="html">
  <div id="PayCompany">

    <db-breadcrumb></db-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="filters.labelVal"  placeholder="请选择">
          <el-option
              v-for="item in selectedOptions"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
    </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入账户名称" v-model="filters.accountName" v-show="filters.labelVal == '1'"></el-input>
        <el-input placeholder="请输入银行账户" v-model="filters.accountNum" v-show="filters.labelVal == '2'"></el-input>
    </el-col>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
    <el-button type="primary" @click="clickAddBtn()">创建</el-button>
    </el-row>
      <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        v-loading="loading"
        border
        row-key="ID"
        >
        <el-table-column sortable prop="id" label="ID" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="accountName"  label="账户名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="accountNum"  label="银行帐户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="form.id?'编辑支付账户':'添加支付账户'" v-model="showDialog" size="tiny" @close="resetForm('form')">
        <el-form :rules="rules" ref="form" :model="form"  >
          <el-form-item label="账户名称" prop="accountName">
            <el-input placeholder="请输入账户名称" v-model="form.accountName"></el-input>
          </el-form-item>
          <el-form-item label="银行帐户" prop="accountNum">
            <el-input placeholder="请输入银行账户" v-model="form.accountNum"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="form.remark"></el-input>
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
  payCompanyApi
} from 'api';


export default {
  data() {
    return {
      list: [],
      loading: true,
      showDialog: false,
      filters: {
        sortWay: '',
        accountName: '',
        labelVal: '1',
        accountNum: ''
      },
      form: {
        id: '',
        accountName: '',
        accountNum: '',
        remark: ''
      },
      selectedOptions: [{
          value: '1',
          label: '账户名称'
        },
        {
          value: '2',
          label: '银行账户'
        }
      ],
      rules: {
        accountName: [{
          required: true,
          message: '请输入账户名称'
        }],
        accountNum: [{
          required: true,
          message: '请输入银行账户'
        }]
      }
    };
  },

  methods: {
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleSearch() {
      this.fetchData();
    },
    async fetchData() {
      const _self = this;
      _self.loading = true;
      _self.list = [];
      try {
        const res = await payCompanyApi.getList();
        for (let [index, elem] of res.data.entries()) {
          _self.list.push({});
          _self.list[index].id = elem.ID;
          _self.list[index].accountName = elem.AccountName;
          _self.list[index].accountNum = elem.AccountNum;
          _self.list[index].remark = elem.Remark;
        }
        _self.loading = false;
      } catch (e) {
        console.error(e);
      }
    },
    clickAddBtn() {
      const _self = this;
      _self.showDialog = true;
    },
    async clickEditBtn($index, row) {
      const _self = this;
      try {
        const res = await payCompanyApi.getDetail(row.id);
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
      if(_self.form.id){
        _self.editSave();
      }else{
        _self.addSave();
      }
    },
    async addSave() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            const form={..._self.form}
            delete form.id
            await payCompanyApi.addInfo(form);
            _self.fetchData();
            _self.$refs['form'].resetFields();
            _self.showDialog = false;
            _self.$message({
              message: '保存成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
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
            await payCompanyApi.editInfo(_self.form);
            _self.fetchData();
            _self.$refs['form'].resetFields();
            _self.showDialog = false;
            _self.$message({
              message: '编辑成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          return false;
        }
      });
    },
    async clickDelBtn($index, row) {
      const _self = this;
      try {
        await _self.$confirm(`是否删除${row.accountName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await payCompanyApi.delInfo(row.id);
        _self.fetchData();
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
#PayCompany {}
</style>
