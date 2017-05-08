<template lang="html">
  <div id="role-page">
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="searchType"  placeholder="请选择">
          <el-option
              v-for="(item,index) in selectedOptions"
              :label="item.label"
              :value="item.value"
              :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入用户名" v-model="filters.userName" v-show="searchType == 'userName'"></el-input>
        <el-input placeholder="请输入姓名" v-model="filters.realName" v-show="searchType == 'realName'"></el-input>
      </el-col>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
    <!-- <el-button type="primary" @click="showDialog = true">创建</el-button> -->
    </el-row>

    <el-table
      :data="list"
      ref="table"
      style="width: 100%"
      element-loading-text="拼命加载中"
      v-loading="loading"
      @expand="getUserNameByRole"
      row-key="RoleName"
      :expand-row-keys="expandRowKeys"
      >
      <el-table-column type="expand" >
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户列表">
                <el-tag type="success" class="mytag" v-for="(a,index) in userNameList" :key="index" :closable="true" @close="delUserName(props.row.RoleName,a)">{{a}}</el-tag>
                <!-- <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="userName"
                    ref="saveTagInput"
                    size="mini"
                    @keyup.enter.native="addUserName(props.row.RoleName,userName)"
                    @blur="addUserName(props.row.RoleName,userName)">
                  </el-input> -->
                  <!-- :on-icon-click="addUserName(props.row.RoleName,userName)" -->
                    <el-autocomplete
                      ref="saveTagInput"
                      v-if="inputVisible"
                      placeholder="请输入用户名称"
                      v-model="userName"
                      :fetch-suggestions="querySearch"
                      @keyup.enter.native="addUserName(props.row.RoleName,userName)"
                      @blur="addUserName(props.row.RoleName,userName)"
                      ></el-autocomplete>
                  <el-button v-else class="button-new-tag" size="small" @click="showInput">添加用户</el-button>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column sortable prop="RealName" label="RealName" show-overflow-tooltip></el-table-column>
      <el-table-column  prop="RoleName" label="RoleName" show-overflow-tooltip></el-table-column>
      <!-- <el-table-column  label="操作" width="100" fixed="right">
        <template scope="scope">
<el-button size="mini" @click="openDialog(scope.row)">
    添加用户</el-button>
</template>
      </el-table-column> -->
    </el-table>

    <!-- <el-dialog title="添加用户" v-model="showDialog" size="tiny" @close="resetForm('form')">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item label="realName">
          <el-input v-model="form.realName" disabled></el-input>
        </el-form-item>
        <el-form-item label="rolsName">
          <el-input v-model="form.rolsName" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名称" prop="userName">

        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="addUserName()">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import {
    roleApi,
    userApi
} from 'api';

export default {
    data() {
        return {
            userList: [],
            list: [],
            expandRowKeys: [],
            userNameList: [],
            loading: true,
            // showDialog: false,
            inputVisible: false,
            userName: '',
            rolsName: '',
            searchType: 'userName',
            filters: {
                modeName: '',
                remark: ''
            },
            // form: {
            //     realName: '',
            //     rolsName: '',
            //     userName: ''
            // },
            rules: {
                userName: [{
                    required: true,
                    message: '请输入用户名称'
                }]
            },
            selectedOptions: [{
                    value: 'userName',
                    label: '用户名'
                },
                {
                    value: 'realName',
                    label: '姓名'
                }
            ]
        };
    },

    methods: {
        test() {
            alert("1")
        },
        querySearch(queryString, cb) {
            var userList = this.userList;
            var results = queryString ? userList.filter(this.createFilter(queryString)) : userList;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        // openDialog(row) {
        //     const _self = this;
        //     _self.getUserList();
        //     _self.showDialog = true;
        //     _self.form.realName = row.RealName;
        //     _self.form.rolsName = row.RoleName;
        // },
        showInput() {
            this.inputVisible = true;
            // this.$nextTick(_ => {
            //     this.$refs.saveTagInput.$refs.input.focus();
            // });
        },
        async delUserName(a, b) {
            const _self = this;
            try {
                await _self.$confirm(`是否删除${b}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await roleApi.deleteByUserName(a, b);
                _self.getUserNameByRole();
                _self.$message({
                    message: '删除成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
        },
        async addUserName(a, b) {
            console.log(a, b)
            const _self = this;
            if (b !== "") {
                try {
                    await roleApi.addUserNameByRolsName(a, b);
                    _self.getUserNameByRole();
                    _self.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    _self.inputVisible = false;
                } catch (e) {
                    console.error(e);
                }
            } else {
                _self.inputVisible = false;
            }
        },
        handleSearch() {
            this.fetchData();
        },
        async fetchData() {
            const _self = this;
            _self.loading = true;
            try {
                const res = await roleApi.getRoleList();
                _self.list = res.data;
                _self.loading = false;
            } catch (e) {
                console.error(e);
            }
        },
        async getUserList() {
            const _self = this;
            _self.userList = [];
            try {
                const res = await userApi.list();
                for (let [index, elem] of res.data.entries()) {
                    _self.userList.push({});
                    _self.userList[index].value = elem.UserName;
                }
            } catch (e) {
                console.error(e);
            }
        },
        async getUserNameByRole(row, expanded) {
            const _self = this;
            _self.getUserList();
            if (expanded) {
                _self.loading = true;
                _self.expandRowKeys.length = 0;
                _self.expandRowKeys.push(row.RoleName);
                _self.rolsName = row.RoleName;
            }
            try {
                const res = await roleApi.getUserNameByRole(_self.rolsName);
                _self.userNameList = res.data.UserName;
                _self.loading = false;
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

<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.mytag {
    margin: 0 10px;
    height: 36px;
    line-height: 36px;
}
.el-table__expanded-cell {
    padding: 20px 100px 20px 65px !important;
}
.el-autocomplete,
.el-dropdown {
    display: block !important;
}
</style>
