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

    <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border >
      <el-table-column type="expand">
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户列表">
                <el-tag type="success" class="mytag" v-for="a in props.row.UserName" :closable="true" @close="delUserName(props.row.RoleName,a)">{{a}}</el-tag>
                <el-input class="input-new-tag myinput" v-if="inputVisible" v-model="userName" ref="saveTagInput" @keyup.enter.native="addUserName(props.row.RoleName,userName)" @blur="addUserName(props.row.RoleName,userName)"></el-input>
                <el-button v-else class="button-new-tag h-36" size="small" @click="showInput">添加用户</el-button>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column sortable prop="RealName" label="RealName" show-overflow-tooltip></el-table-column>
      <el-table-column  prop="RoleName" label="RoleName"   show-overflow-tooltip></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
    roleApi
} from 'api';

export default {
    data() {
        return {
            inputVisible: false,
            userName: '',
            list: [],
            loading: true,
            // showDialog: false,
            searchType: 'userName',
            filters: {
                modeName: '',
                remark: ''
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
        async delUserName(a, b) {
          console.log(a,b)
            const _self = this;
            try {
                await _self.$confirm(`是否删除${b}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await roleApi.deleteByUserName(a, b);
                _self.fetchData();
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
            // this.$nextTick(_ => {
            //     this.$refs.saveTagInput.$refs.input.focus();
            // });
        },
        async addUserName(a, b) {
            // let userName = this.userName;
            try {
                console.log(a, b)
                await roleApi.addUserNameByRolsName(a, b);
                this.inputVisible = false;
                this.userName = '';
                _self.$message({
                    message: '保存成功',
                    type: 'success'
                });
                _self.fetchData();
            } catch (e) {
                console.error(e);
            }
        },
        handleSearch() {
            this.fetchData();
        },
        async fetchData() {
            const _self = this;
            _self.loading = true;
            try {
                const res = await roleApi.list();
                console.log(res)
                if (res && res.data) {
                    _self.list = res.data
                }
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

<style lang="scss">
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
.h-36 {
    height: 36px;
}
.myinput {
    height: 36px !important;
    margin-top: 10px;
    width: 156px;
}
</style>
