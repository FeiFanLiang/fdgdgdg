<template lang="html">
  <div id="HotelPlatform">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <!-- filters start -->
      <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal" clearable placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入平台ID" v-model="filters.ID" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入平台名称" v-model="filters.PlatName" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <el-button type="primary" @click="platformSearch()">搜索</el-button>
        <el-button type="primary" @click="createDialog = true">创建</el-button>
      </div>
      <!-- filters end -->

    <!-- table start -->
    <el-table
    :data="platform"
    style="width: 100%">
      <el-table-column
        prop="ID"
        label="平台ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="PlatName"
        label="平台名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="Ramark"
        label="平台信息">
      </el-table-column>
      <el-table-column   label="操作">
        <template scope="scope">  <el-button size="small" @click="platformEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="platformDelete(scope.$index, scope.row)">删除</el-button>  </template>
      </el-table-column>
    </el-table>
    <!-- table end -->

    <!-- create dialog start -->
    <el-dialog title="添加新平台信息" v-model="createDialog" size="small">
      <el-form ref="createForm" :model="createForm" label-width="80px">
        <el-form-item label="平台ID">
          <el-input v-model="createForm.ID" class="el-col-24" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="平台名称">
          <el-input v-model="createForm.PlatName" class="el-col-24"></el-input>
        </el-form-item>
        <el-form-item label="平台信息">
          <el-input v-model="createForm.Ramark" class="el-col-24"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false">取 消</el-button>
        <el-button type="primary" @click="platformSave()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- create dialog end -->

    <!-- edit dialog start -->
    <el-dialog title="编辑平台信息" v-model="editDialog" size="small">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="平台ID">
          <el-input v-model="editForm.ID" class="el-col-24" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="平台名称">
          <el-input v-model="editForm.PlatName" class="el-col-24"></el-input>
        </el-form-item>
        <el-form-item label="平台信息">
          <el-input v-model="editForm.Ramark" class="el-col-24"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="platformEditSave()">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { HotelThreePlatInfoApi } from 'api';

export default {
  data() {
    return {
      platform: [],
      createDialog: false,
      editDialog: false,
      filters: {
        PlatName: '',
        ID: '',
        labelVal: '1'
      },
      createForm: {
        ID: 0,
        PlatName: '',
        Ramark: ''
      },
      editForm: {
        ID: 0,
        PlatName: '',
        Ramark: ''
      },
      selectedOptions: [
        {
          value: '1',
          label: '平台ID'
        },
        {
          value: '2',
          label: '平台名称'
        }
      ]
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async platformSave() {
      const _self = this;
      try {
        console.log(_self.createForm)
        const a = await HotelThreePlatInfoApi.add(_self.createForm);
        console.log(a)
        _self.fetchData();
        _self.createDialog = false;
        _self.$message({
          message: '保存成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async platformEditSave() {
      const _self = this;
      try {
        await HotelThreePlatInfoApi.edit(_self.editForm.ID,_self.editForm);
        _self.fetchData();
        _self.editDialog = false;
        _self.$message({
          message: '编辑成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    platformEdit($index, row) {
      const _self = this;
      _self.editForm.ID = row.ID;
      _self.editForm.PlatName = row.PlatName;
      _self.editForm.Ramark = row.Ramark;
      _self.editDialog = true;
    },
    async platformDelete($index, row) {
      const _self = this;
      try {
        await _self.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await HotelThreePlatInfoApi.remove({
          ID: row.ID
        });
        _self.fetchData();
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    platformSearch() {
      this.fetchData();
    },
    async fetchData() {
      const _self = this;
      const options = {
        PlatName: _self.filters.labelVal === '2'
          ? _self.filters.PlatName
          : null,
        ID: _self.filters.labelVal === '1'
          ? parseInt(_self.filters.ID, 10)
          : null
      };
      const res = await HotelThreePlatInfoApi.listAll(options);
      _self.platform = res.data;
    },
    mounted() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss">
#HotelPlatform {

  .el-table {
    margin: 20px 0 0 0;
  }

  .filters {
    margin: 20px 0 0 0;
    border: 1px #efefef solid;
    padding: 10px;
    background: #f9f9f9;

    .filter {
      display: inline-block;
      width: auto;
      padding: 10px;
      border-radius: 5px;
      .el-select {
        display: inline-block;
      }
    }

    .el-input {
      width: 150px;
      display: inline-block;
    }
  }

}
</style>
