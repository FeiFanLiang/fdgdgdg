<template lang="html">
  <div id="role-page">
    <el-row :gutter="20">
      <!--<el-col :span="4">
        <el-select v-model="filters.labelVal"  placeholder="请选择">
          <el-option
              v-for="(item,index) in selectedOptions"
              :label="item.label"
              :value="item.value"
              :key="index">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-input placeholder="请输入角色名称" v-model="filters.realName" v-show="filters.labelVal == '1'"></el-input>
        <el-input placeholder="请输入RoleName" v-model="filters.roleName" v-show="filters.labelVal == '2'"></el-input>
      </el-col>-->
      <el-col :span="4">
        <!--<el-button type="primary" @click="handleSearch()">搜索</el-button>-->
        <el-button type="primary" @click="clickAddBtn()">创建</el-button>
       </el-col>
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
      border
      >
      <el-table-column type="expand" >
          <template scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item id="userlabel" v-loading.body="loading2">
                <el-tag type="success" class="mytag" v-for="(a,index) in userNameList" :key="index" :closable="true" @close="delUserName(props.row.RoleName,a,props.row.RealName)">{{a}}</el-tag>
                <div>
                  <el-autocomplete
                    class="myinput"
                    :icon="userForm.userName?'check':'close'"
                    ref="saveTagInput"
                    v-if="inputVisible"
                    placeholder="请输入用户名称"
                    v-model="userForm.userName"
                    :fetch-suggestions="querySearch"
                    :on-icon-click="addUserName"
                    ></el-autocomplete>
                <el-button v-else class="button-new-tag mybtn" size="small" @click="showInput">添加用户</el-button>
                </div>
              </el-form-item>
            </el-form>
          </template>
      </el-table-column>
      <el-table-column sortable prop="RealName" label="角色名称" show-overflow-tooltip></el-table-column>
      <el-table-column  prop="RoleName" label="RoleName" show-overflow-tooltip></el-table-column>
      <el-table-column  width="100"  label="操作" fixed="right">
        <template scope="scope">
<el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
    编辑</el-button>
</template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" v-model="showDialog" size="tiny" @close="resetForm('roleForm')">
      <el-form :rules="rules" ref="roleForm" :model="roleForm">
        <el-form-item label="角色名称" prop="realName">
          <el-input placeholder="请输入角色名称" v-model="roleForm.realName"></el-input>
        </el-form-item>
        <el-form-item label="RoleName" prop="roleName">
          <el-input placeholder="请输入RoleName" v-model="roleForm.roleName" :disabled="dialogTitle==='编辑角色信息'"></el-input>
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
import { roleApi, userApi } from 'api'

export default {
  data() {
    return {
      userList: [],
      list: [],
      expandRowKeys: [],
      userNameList: [],
      loading: true,
      loading2: false,
      isEditable: true,
      inputVisible: false,
      showDialog: false,
      dialogTitle: '添加角色信息',
      userForm: {
        userName: '',
        rolsName: ''
      },
      roleForm: {
        realName: '',
        roleName: ''
      },
      filters: {
        realName: '',
        roleName: '',
        labelVal: '1'
      },
      selectedOptions: [
        {
          value: '1',
          label: '角色名称'
        },
        {
          value: '2',
          label: 'RoleName'
        }
      ],
      rules: {
        realName: [
          {
            required: true,
            message: '请输入角色名称'
          }
        ],
        roleName: [
          {
            required: true,
            message: '请输入RoleName'
          }
        ]
      }
    }
  },

  methods: {
    querySearch(queryString, cb) {
      var userList = this.userList
      var results = queryString
        ? userList.filter(this.createFilter(queryString))
        : userList
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.indexOf(queryString.toLowerCase()) === 0
      }
    },
    showInput() {
      this.inputVisible = true
      this.userForm.userName = ''
      // this.$nextTick(_ => {
      //     this.$refs.saveTagInput.$refs.input.focus();
      // });
    },
    handleSearch() {
      this.fetchData()
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      const options = {
        query: {
          realName:
            _self.filters.labelVal === '1' ? _self.filters.realName : '',
          roleName: _self.filters.labelVal === '2' ? _self.filters.roleName : ''
        }
      }
      try {
        const res = await roleApi.list()
        _self.list = res.data
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async getUserList() {
      const _self = this
      _self.userList = []
      let _index = 0
      try {
        const res = await userApi.list()
        for (let [index, elem] of res.data.entries()) {
          if (!_self.userNameList.includes(elem.UserName)) {
            _self.userList.push({})
            _self.userList[_index].value = elem.UserName
            _index++
          }
        }
      } catch (e) {
        console.error(e)
      }
    },
    async getUserNameByRole(row, expanded) {
      const _self = this
      if (expanded) {
        _self.loading2 = true
        _self.inputVisible = false
        _self.expandRowKeys.length = 0
        _self.expandRowKeys.push(row.RoleName)
        _self.userForm.rolsName = row.RoleName
      }
      try {
        const res = await roleApi.userNameListByRolesName(
          _self.userForm.rolsName
        )
        _self.userNameList = res.data.UserName
        _self.loading2 = false
      } catch (e) {
        console.error(e)
      }
      _self.getUserList()
    },
    clickAddBtn() {
      const _self = this
      _self.dialogTitle = '添加角色信息'
      _self.showDialog = true
      _self.roleForm = {}
    },
    clickEditBtn($index, row) {
      const _self = this
      _self.dialogTitle = '编辑角色信息'
      _self.showDialog = true
      _self.roleForm.realName = row.RealName
      _self.roleForm.roleName = row.RoleName
    },
    submitForm() {
      const _self = this
      if (_self.dialogTitle === '编辑角色信息') {
        _self.editSave()
      } else if (_self.dialogTitle === '添加角色信息') {
        _self.addSave()
      }
    },
    async addSave() {
      const _self = this
      _self.$refs['roleForm'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            await roleApi.add(_self.roleForm)
            _self.fetchData()
            _self.$refs['roleForm'].resetFields()
            _self.showDialog = false
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
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
      _self.$refs['roleForm'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            await roleApi.edit(_self.roleForm)
            _self.fetchData()
            _self.$refs['roleForm'].resetFields()
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
    },
    async addUserName() {
      const _self = this
      if (_self.userForm.userName !== '') {
        _self.loading2 = true
        try {
          await roleApi.addUserNameByRolsName(
            _self.userForm.rolsName,
            _self.userForm.userName
          )
          _self.getUserNameByRole()
          _self.$message({
            message: '添加成功',
            type: 'success'
          })
          _self.inputVisible = false
          _self.loading2 = false
        } catch (e) {
          _self.loading2 = false
          _self.$message.error('添加失败!!!')
        }
      } else {
        _self.inputVisible = false
      }
    },
    async delUserName(a, b, c) {
      const _self = this
      _self
        .$confirm(`是否将${b}从${c}移除?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          try {
            _self.loading2 = true
            await roleApi.deleteUserNameByRolesName(a, b)
            _self.getUserNameByRole()
            _self.inputVisible = false
            _self.loading2 = false
            _self.$message({
              message: '删除成功',
              type: 'success'
            })
          } catch (e) {
            _self.loading2 = false
            _self.$message.error('删除失败!!!')
          }
        })
        .catch(() => {})
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>

<style lang="scss" scoped>
#userlabel {
    width: 100%;
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
    margin-top: 15px;
}
#userlabel .myinput {
    width: 180px;
    margin-top: 15px;
}

.el-table__expanded-cell {
    padding: 20px 15px 20px 66px !important;
}
.demo-table-expand {
    padding: 0 0 10px 16px !important;
    margin-right: 50px !important;
}
.el-autocomplete,
.el-dropdown {
    display: block !important;
}
</style>
