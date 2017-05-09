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
      v-loading="loading" border @expand="getRoleList" row-key="UserName" :expand-row-keys="expandRowKeys">
      <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline>
              <el-form-item v-loading.body="loading2">
                <el-tag :key="tag" v-for="tag in roleTags" :closable="true" :close-transition="false" @close="handleClose(tag,props.row.UserName)" style="margin:5px">
                {{tag}}
                </el-tag>
                <div style="margin:10px 0"></div>
                {{roles}}
                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="roles"
                  :fetch-suggestions="querySearch"
                  ref="saveTagInput"
                  v-if="inputVisible"
                  placeholder="请选择角色"
                  icon="check "
                  :on-icon-click="handleIconClick"
                >
                </el-autocomplete>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">添加角色</el-button>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column sortable prop="RealName" label="姓名"  show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="UserName" label="用户名"   show-overflow-tooltip></el-table-column>
      <el-table-column  label="锁定状态">
        <template scope="scope">
          <el-switch
            v-model="scope.row.IsLocked"
            on-text=""
            off-text=""
            on-color="lightgray"
            off-color="dodgerblue">
          </el-switch>
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
  userApi, roleApi
} from 'api';

export default {
  data() {
    return {
      roleList: [],
      roles: '',
      roleTags: [],
      inputVisible: false,
      expandRowKeys: [],
      UserName: [],
      list: [],
      loading: true,
      loading2: false,
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
        department:'',
        IsLocked: ''
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
    async handleClose(tag,userName) {
      this.roleTags.splice(this.roleTags.indexOf(tag), 1);
      const _self = this;
        try {
          await _self.$confirm(`是否删除${tag}?`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          });
          _self.loading2 = true;
          await roleApi.deleteUserNameByRolesName(tag, userName);
          _self.getRoleList();
          _self.loading2 = false;
          _self.$message({
            message: '删除成功',
            type: 'success'
          });
        } catch (e) {
          console.error(e);
        }
    },
    showInput() {
      this.inputVisible = true;
      this.roles = '';
    },
    querySearch(queryString, cb) {
      var roleList = this.roleList;
      var results = queryString ? roleList.filter(this.createFilter(queryString)) : roleList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    async loadAll() {
      const _self = this;
      _self.roleList = [];
      let _index = 0;
      try {
        const res = await roleApi.list();
        for (let [index, item] of res.data.entries()) {
          if (!_self.roleTags.includes(item.RoleName)) {
            _self.roleList.push({});
            _self.roleList[_index].value = item.RoleName;
            _index++;
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    async handleIconClick(ev) {
      console.log('添加角色');
      const _self = this;
        if (_self.UserName !== "") {
            _self.loading2 = true;
            try {
              await roleApi.addUserNameByRolsName(_self.roles, _self.UserName);
              _self.getRoleList();
              _self.$message({
                  message: '添加成功',
                  type: 'success'
              });
              _self.inputVisible = false;
            } catch (e) {
              console.error(e);
            }
        }else {
            _self.inputVisible = false;
            _self.loading2 = false;
        }
    },
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
            _self.list=res.data;
        }
        _self.loading = false;
      } catch (e) {
        console.error(e);
      }
    },
    async lock($index, row) {
      const _self = this;
      await userApi.lockUser(row.UserName);
      _self.$message({
        message: '锁定成功',
        type: 'success'
      });
    },
    async unLock($index, row) {
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
    async getRoleList(row,expanded) {
      const _self = this;
      _self.roleTags = [];
      let _index = 0;
      if (expanded) {
        _self.loading2 = true;
        _self.inputVisible = false;
        _self.expandRowKeys.length = 0;
        _self.expandRowKeys.push(row.UserName);
        _self.UserName = row.UserName;
      }
      try {
        const res = await roleApi.roleListByUserName(_self.UserName);
        for (let [index, item] of res.data.entries()) {
          _self.roleTags.push({});
          _self.roleTags[_index] = item.RoleName;
          _index++;
          _self.loading2 = false;
        }

      } catch (e) {
          console.error(e);
      }
      _self.loadAll();
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss">

</style>
