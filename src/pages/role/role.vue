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
              <el-form-item id="userlabel" v-loading.body="loading2">
                <el-tag type="success" class="mytag" v-for="(a,index) in userNameList" :key="index" :closable="true" @close="delUserName(props.row.RoleName,a)">{{a}}</el-tag>
                <div class="">
                  <el-autocomplete
                    class="myinput"
                    :icon="userName?'check':'close'"
                    ref="saveTagInput"
                    v-if="inputVisible"
                    placeholder="请输入用户名称"
                    v-model="userName"
                    :fetch-suggestions="querySearch"
                    :on-icon-click="addUserName"
                    ></el-autocomplete>
                <el-button v-else class="button-new-tag mybtn" size="small" @click="showInput">添加用户</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column sortable prop="RealName" label="RealName" show-overflow-tooltip></el-table-column>
      <el-table-column  prop="RoleName" label="RoleName" show-overflow-tooltip></el-table-column>
    </el-table>
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
            loading2: false,
            inputVisible: false,
            userName: '',
            rolsName: '',
            searchType: 'userName',
            filters: {
                modeName: '',
                remark: ''
            },
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
        showInput() {
            this.inputVisible = true;
            this.userName = '';
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
                _self.loading2 = true;
                await roleApi.deleteByUserName(a, b);
                _self.getUserNameByRole();
                _self.loading2 = false;
                _self.$message({
                    message: '删除成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
        },
        async addUserName() {
            const _self = this;
            if (_self.userName !== "") {
                _self.loading2 = true;
                try {
                    await roleApi.addUserNameByRolsName(_self.rolsName, _self.userName);
                    _self.getUserNameByRole();
                    _self.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    _self.inputVisible = false;
                    _self.loading2 = false;
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
            let _index = 0;
            try {
                const res = await userApi.list();
                for (let [index, elem] of res.data.entries()) {
                    if (!_self.userNameList.includes(elem.UserName)) {
                        _self.userList.push({});
                        _self.userList[_index].value = elem.UserName;
                        _index++;
                    }
                }
            } catch (e) {
                console.error(e);
            }
        },
        async getUserNameByRole(row, expanded) {
            const _self = this;
            if (expanded) {
                _self.loading2 = true;
                _self.inputVisible = false;
                _self.expandRowKeys.length = 0;
                _self.expandRowKeys.push(row.RoleName);
                _self.rolsName = row.RoleName;
            }
            try {
                const res = await roleApi.getUserNameByRole(_self.rolsName);
                _self.userNameList = res.data.UserName;
                _self.loading2 = false;
            } catch (e) {
                console.error(e);
            }
            _self.getUserList();
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
#userlabel {
    width: 100%;
}
#userlabel .el-form--inline .el-form-item__content {
    border: 1px solid;
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
}
#userlabel .el-input__icon {
    position: absolute;
    width: 35px;
    height: 36px;
    margin-top: 15px;
    left: 143px;
    top: 0;
    text-align: center;
    color: #bfcbd9;
    transition: all 0.3s;
}
#userlabel .mytag {
    margin-top: 10px;
    margin-right: 10px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    flex: 0 0 25%;
}
#userlabel .mybtn {
    height: 36px;
    margin-top: 10px;
}
.myinput {
    width: 180px;
    margin-top: 15px;
}

.el-table__expanded-cell {
    padding: 20px 15px 20px 66px !important;
}
.demo-table-expand {
    padding: 0 0 10px 16px !important;
    font-size: 0;
}
.el-autocomplete,
.el-dropdown {
    display: block !important;
}
</style>
