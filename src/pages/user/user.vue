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
              <el-form-item id="roleLabel" v-loading.body="loading2">
                <el-tag type="success" class="mytag" :key="tag" v-for="tag in roleTags" :closable="true" :close-transition="false" @close="handleClose(tag,props.row.UserName)">
                {{tag.RealName}}
                </el-tag>
                <div>
                  <el-autocomplete
                    class="myinput"
                    :icon="roles?'check':'close'"
                    popper-class="my-autocomplete"
                    custom-item="my-item-zh"
                    v-model="roles"
                    :fetch-suggestions="querySearch"
                    ref="saveTagInput"
                    v-if="inputVisible"
                    placeholder="请选择角色"
                    :on-icon-click="handleIconClick"
                  >
                  </el-autocomplete>
                  <el-button v-else class="button-new-tag mybtn" size="small" @click="showInput">添加角色</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column sortable prop="RealName" label="姓名"  show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="UserName" label="用户名"   show-overflow-tooltip></el-table-column>
      <el-table-column  label="用户状态">
        <template scope="scope">
<el-switch v-model="scope.row.IsLocked" on-text="使用" off-text="锁定" :on-value="false" :off-value="true" @change="lockStatusChange(scope.row,$event)" on-color="dodgerblue" off-color="lightgray">
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
    userApi,
    roleApi
} from 'api';
import Vue from 'vue';
Vue.component('my-item-zh', {
    functional: true,
    render: function(h, ctx) {
        var item = ctx.props.item;
        return h('li', ctx.data, [
            h('div', {
                attrs: {
                    class: 'name'
                }
            }, [item.RealName]),
            h('span', {
                attrs: {
                    class: 'addr'
                }
            }, [item.value])
        ]);
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    }
});
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
            searchType: 'userName',
            filters: {
                modeName: '',
                remark: ''
            },
            form: {
                userName: '',
                password: '',
                realName: '',
                department: '',
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
        async handleClose(tag, userName) {
            const _self = this;
            _self.$confirm(`是否移除${userName}下的${tag.RealName}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                try {
                    _self.loading2 = true;
                    await roleApi.deleteUserNameByRolesName(tag.RoleName, userName);
                    _self.getRoleList();
                    _self.inputVisible = false;
                    _self.loading2 = false;
                    _self.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } catch (e) {
                    console.error(e);
                    _self.loading2 = false;
                    _self.$message.error('删除失败!!!');
                }
            }).catch(() => {});
        },
        showInput() {
            this.inputVisible = true;
            this.roles = '';
        },
        querySearch(queryString, cb) {
            var roleList = this.roleList;
            var results = queryString ? roleList.filter(this.createFilter(queryString)) : roleList;
            cb(results);
        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.RealName.indexOf(queryString.toLowerCase()) === 0);
            };
        },
        async loadAll() {
            const _self = this;
            _self.roleList = [];
            try {
                const res = await roleApi.list();
                const data = res.data.map(item => {
                    return {
                        RealName: item.RealName,
                        value: item.RoleName
                    }
                })
                _self.roleList = data.filter(item => _self.roleTags.findIndex(tag => {
                    return tag.RealName === item.RealName
                }) === -1)
            } catch (e) {
                console.error(e);
            }
        },
        async handleIconClick(ev) {
            const _self = this;
            if (_self.roles !== "") {
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
                    _self.loading2 = false;
                    _self.$message.error('添加失败!!!');
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
            _self.list = [];
            try {
                const res = await userApi.list();
                if (res && res.data) {
                    _self.list = res.data;
                }
                _self.loading = false;
            } catch (e) {
                console.error(e);
                _self.loading = false;
            }
        },
        lockStatusChange(row, value) {
            if (value) {
                this.unLock(row)
            } else {
                this.lock(row)
            }
        },
        async lock(row) {
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
                        _self.$message.error('添加失败!!!');
                    }
                } else {
                    return false;
                }
            });
        },
        async getRoleList(row, expanded) {
            const _self = this;
            if (expanded) {
                _self.loading2 = true;
                _self.inputVisible = false;
                _self.expandRowKeys.length = 0;
                _self.expandRowKeys.push(row.UserName);
                _self.UserName = row.UserName;
            }
            try {
                const res = await roleApi.roleListByUserName(_self.UserName);
                _self.roleTags = res.data;
                _self.loading2 = false;
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

<style lang="scss" scoped>
.my-autocomplete {
    li {
        line-height: normal;
        padding: 7px;

        .name {
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .addr {
            font-size: 12px;
            color: #b4b4b4;
        }

        .highlighted .addr {
            color: #ddd;
        }
    }
}
#roleLabel {
    width: 100%;
}
#roleLabel .mytag {
    margin-top: 10px;
    margin-right: 10px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    flex: 0 0 25%;
}
#roleLabel .mybtn {
    height: 36px;
    margin-top: 15px;
}
#roleLabel .myinput {
    width: 180px;
    margin-top: 15px;
}
.el-form--inline .el-form-item {
    display: inline-block;
    vertical-align: top;
    padding: 0px 0px 10px 16px !important;
}
.el-autocomplete,
.el-dropdown {
    display: block !important;
}
</style>
