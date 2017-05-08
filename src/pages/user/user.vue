<template lang="html">
  <div id="user-page">

    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="searchType"  placeholder="请选择">
          <el-option
              v-for="(item,index) in selectedOptions"
              :label="item.label"
              :value="item.value"
              :key="index"
              >
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
      <!--<el-table-column prop="Department" label="部门" show-overflow-tooltip></el-table-column>-->
      <el-table-column sortable prop="UserName" label="用户名"   show-overflow-tooltip></el-table-column>
      <!--<el-table-column  prop="Password" label="密码"   show-overflow-tooltip></el-table-column>-->
      <el-table-column  label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="addRole(scope.$index, scope.row)">添加角色</el-button>
          <el-button size="small" :class="{'lock':lock,'unLock':!lock}" @click="toggle(scope.$index, scope.row)">
            <template>
              <i v-if="lock">解锁</i>
              <i v-else style="color:red">锁定</i>
            </template>
          </el-button>
          <!--<el-button size="small" type="danger" @click="unLock(scope.$index, scope.row)">解锁</el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="form.id?'编辑用户':'添加用户'" v-model="showDialog"  @close="resetForm('form')">
      <el-form :rules="rules" ref="form" :model="form">
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
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="realName">
              <el-input placeholder="请输入账户名称" v-model="form.realName"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="10">
            <el-form-item label="部门" prop="department">
              <el-input v-model="form.department"></el-input>
              <el-select v-model="form.department" clearable placeholder="请选择部门">
                <el-option v-for="(item,index) in depOptions" :key="index" :label="item.RealName" :value="item.RoleName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="添加角色" v-model="showRoleDialog"  @close="resetForm('roleform')">
      <el-form ref="roleform" :model="roleform">
            <el-form-item>
              <el-select v-model="roleform.depOptions" clearable placeholder="请选择部门">
                <el-option v-for="(item,index) in depOptions" :key="index" :label="item.RealName" :value="item.RoleName"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRoleDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitRoleForm()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import {
  userApi, roleApi
} from 'api';

export default {
  data() {
    return {
      lock: false,
      list: [],
      depOptions: [],
      loading: true,
      showDialog: false,
      showRoleDialog: false,
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
      roleform: {
        UserName:'',
        depOptions:''
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
            console.log(_self.list)
        }
        _self.loading = false;
      } catch (e) {
        console.error(e);
      }
    },
    toggle($index, row) {
      if(this.lock){
        this.unLock(row);
        this.lock = !this.lock;
      }else{
        this.Lock(row);
        this.lock = !this.lock;
      }
    },
    async Lock(row) {
      const _self = this;
      await userApi.lockUser(row.UserName);
      _self.$message({
        message: '锁定成功',
        type: 'success'
      });
    },
    async unLock(row) {
      const _self = this;
      await userApi.unLockUser(row.UserName);
      _self.$message({
        message: '解锁成功',
        type: 'success'
      });
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
            console.log(_self.form.password)
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
    async depList() {
      const dep = await roleApi.list();
      this.depOptions = dep.data;
    },
    async submitRoleForm() {
      const _self = this;
      await roleApi.add(_self.roleform.depOptions,_self.roleform.UserName);
       _self.$message({
        message: '保存成功',
        type: 'success'
      });
       _self.showRoleDialog = false;
    },
    async addRole($index, row) {
      const _self = this;
      _self.roleform.UserName = row.UserName;
      _self.showRoleDialog = true;
    }
  },
  mounted() {
    this.fetchData();
    this.depList();
  }
};
</script>

<style lang="scss">

</style>
