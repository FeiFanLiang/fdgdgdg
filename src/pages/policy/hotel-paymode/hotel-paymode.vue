<template lang="html">
  <div id="HotelPayMode">
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
        <el-input placeholder="请输入账户名称" v-model="filters.modeName" v-show="filters.labelVal == '1'"></el-input>
        <el-input placeholder="请输入Remark" v-model="filters.remark" v-show="filters.labelVal == '2'"></el-input>
    </el-col>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
    <el-button type="primary" @click="clickAddBtn()">创建</el-button>
    </el-row>
    <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border row-key="ID">
      <el-table-column sortable prop="id" label="ID"  width="180" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="modeName" label="账户名称"  show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column  width="150"  label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="dialogTitle" v-model="showDialog" size="tiny" @close="resetForm('form')">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item label="账户名称" prop="modeName">
          <el-input placeholder="请输入账户名称" v-model="form.modeName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  hotelPayModeApi
} from 'api';

export default {
  data() {
    return {
      list: [],
      loading: true,
      showDialog: false,
      dialogTitle: '',
      dialogTag: '',
      filters: {
        sortWay: '',
        modeName: '',
        labelVal: '1',
        remark: ''
      },
      form: {
        id: 0,
        modeName: '',
        remark: ''
      },
      selectedOptions: [{
          value: '1',
          label: '账户名称'
        },
        {
          value: '2',
          label: 'remark'
        }
      ],
      rules: {
        modeName: [{
          required: true,
          message: '请输入账户名称'
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
        const res = await hotelPayModeApi.getList();
        for (let [index, elem] of res.data.entries()) {
          _self.list.push({});
          _self.list[index].id = elem.ID;
          _self.list[index].modeName = elem.ModeName;
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
      _self.dialogTag = 1;
      _self.dialogTitle = "添加支付方式";
      _self.form = {
        id: 0,
        modeName: '',
        remark: ''
      }
    },
    async clickEditBtn($index, row) {
      const _self = this;
      try {
        const res = await hotelPayModeApi.getDetail(row.id);
        _self.showDialog = true;
        _self.dialogTag = 2;
        _self.dialogTitle = "编辑支付信息";
        _self.form.id = res.data.ID;
        _self.form.modeName = res.data.ModeName;
        _self.form.remark = res.data.Remark;
      } catch (e) {
        console.error(e);
      }
    },
    closeDialog(a) {
      const _self = this;
      _self.showDialog = false;
      _self.$refs[a].resetFields();
    },
    submitForm(a) {
      const _self = this;
      if (_self.dialogTag === 1) _self.addSave(a);
      if (_self.dialogTag === 2) _self.editSave(a);
    },
    async addSave(a) {
      const _self = this;
      _self.$refs[a].validate(async valid => {
        if (valid) {
          try {
            await hotelPayModeApi.addInfo(_self.form);
            _self.fetchData();
            _self.$refs[a].resetFields();
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
    async editSave(a) {
      const _self = this;
      _self.$refs[a].validate(async valid => {
        if (valid) {
          try {
            await hotelPayModeApi.editInfo(_self.form);
            _self.fetchData();
            _self.$refs[a].resetFields();
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
        await _self.$confirm(`是否删除${row.modeName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await hotelPayModeApi.delInfo(row.id);
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
