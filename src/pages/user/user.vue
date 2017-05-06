<template lang="html">
  <div id="HotelPayMode">
    <db-breadcrumb></db-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="searchType"  placeholder="请选择">
          <el-option
              v-for="item in selectedOptions"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
    </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入用户名" v-model="filters.userName" v-show="searchType == 'userName'"></el-input>
        <el-input placeholder="请输入姓名" v-model="filters.realName" v-show="searchType == 'realName'"></el-input>
    </el-col>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
    <el-button type="primary" @click="showDialog = true">创建</el-button>
    </el-row>

    <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border >
      <el-table-column sortable prop="RealName" label="姓名"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="Department" label="部门" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="UserName" label="用户名"   show-overflow-tooltip></el-table-column>
      <el-table-column  prop="Password" label="密码"   show-overflow-tooltip></el-table-column>
      <el-table-column  width="150"  label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="form.id?'编辑用户':'添加用户'" v-model="showDialog"  @close="resetForm('form')">
      <el-form :rules="rules" ref="form" :model="form">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="realName">
              <el-input placeholder="请输入账户名称" v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门" prop="department">
              <el-input v-model="form.department"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="用户名" prop="userName">
              <el-input placeholder="请输入账户名称" v-model="form.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
  userApi
} from 'api';

export default {
  data() {
    return {
      list: [],
      loading: true,
      showDialog: false,
      searchType:'userName',
      filters: {
        modeName: '',
        remark: ''
      },
      form: {
        userName: '',
        password: '',
        realName: '',
        department:''
      },
      selectedOptions: [{
          value: 'userName',
          label: '用户名'
        },
        {
          value: 'realName',
          label: '姓名'
        }
      ],
      rules: {
        userName: [{
          required: true,
          message: '请输入用户名'
        }],
        password: [{
          required: true,
          message: '请输入密码'
        }],
        realName: [{
          required: true,
          message: '请输入姓名'
        }],
        department: [{
          required: true,
          message: '请输入所在部门'
        }]
      }
    };
  },

  methods: {
    handleSearch() {
      this.fetchData();
    },
    async fetchData() {
      const _self = this;
      _self.loading = true;
      _self.list = [];
      try {
        const res = await userApi.list();
        if(res&&res.data){
            _self.list=res.data
        }
        _self.loading = false;
      } catch (e) {
        console.error(e);
      }
    },
    async edit($index, row) {
      const _self = this;
      try {
        const res = await userApi.getDetail(row.id);
        _self.showDialog = true;
        _self.form.id = res.data.ID;
        _self.form.modeName = res.data.ModeName;
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
            await userApi.add(_self.form);
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
            await userApi.editInfo(_self.form);
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
    async del($index, row) {
      const _self = this;
      try {
        await _self.$confirm(`是否删除${row.modeName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await userApi.delInfo(row.id);
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
#HotelPayMode {
    .el-table .cell {
        white-space: nowrap;
        word-break: break-all;
        line-height: 24px;
    }
}
</style>
