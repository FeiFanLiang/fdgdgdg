<template lang="html">
  <div id="HotelPayMode">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <div class="db-content-inner">

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
          <el-input placeholder="请输入账户名称" v-model="filters.ModeName" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入Remark" v-model="filters.Remark" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="clickCrate()">创建</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        stripe
        v-loading="loading"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange">
        <el-table-column type="selection" width="55" :reserve-selection="reserveSelection"></el-table-column>
        <el-table-column prop="ID" label="ID" width="180"></el-table-column>
        <el-table-column prop="ModeName" label="账户名称"></el-table-column>
        <el-table-column prop="Remark" label="Remark"></el-table-column>
        <el-table-column :context="_self" width="150" inline-template label="操作">
          <div>
            <el-button size="small" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- table end  -->

      <!-- pagination start  -->
      <div class="pagination-wrapper" v-show="!loading">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20">
        </el-pagination>
      </div>
      <!-- pagination end  -->

      <!-- edit dialog start -->
      <el-dialog title="编辑账户信息" v-model="editDialog" size="tiny">
        <el-form ref="editForm" :model="editForm" label-width="80px">
          <el-form-item label="账户名称">
            <el-input v-model="editForm.ModeName" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="editForm.Remark" class="el-col-24"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSave()">确 定</el-button>
        </span>
      </el-dialog>

      <!-- edit dialog end -->

      <!-- create dialog start -->
      <el-dialog title="添加账户信息" v-model="createDialog" size="tiny">
        <el-form ref="createFrom" :model="createForm" label-width="80px">
          <el-form-item label="账户名称">
            <el-input v-model="createForm.ModeName" class="el-col-24"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="createForm.Remark" class="el-col-24"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSave()">确 定</el-button>
        </span>
      </el-dialog>
      <!-- create dialog end -->
    </div>
  </div>
</template>

<script>
import {
    oldApi,
    HotelPayModeApi
} from 'api';

// import moment from 'moment';
// import Vue from 'vue';

export default {
    data() {
        return {
            list: [],
            total: 0,
            page: 0,
            loading: true,
            multipleSelection: [],
            reserveSelection: false,
            editDialog: false,
            createDialog: false,
            filters: {
                sortWay: '',
                ModeName: '',
                labelVal: '1',
                Remark: ''
            },
            editForm: {
                ID: '',
                ModeName: '',
                Remark: ''
            },
            createForm: {
                ID: 0,
                ModeName: '',
                Remark: ''
            },
            selectedOptions: [{
                    value: '1',
                    label: '账户名称'
                },
                {
                    value: '2',
                    label: 'remark'
                }

            ]
        };
    },

    methods: {
        handleSortChange(sortWay) {
            this.filters.sortWay = {
                prop: sortWay.prop,
                order: sortWay.order
            };
            this.fetchData();
        },
        clickCrate() {
            this.createDialog = true
            this.createForm = {
                ID: 0,
                ModeName: '',
                Remark: ''
            }
        },
        async handleEditSave() {
            try {
                await HotelPayModeApi.editInfo(this.editForm);
                this.fetchData();
                this.editDialog = false;
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
        },
        async handleSave() {
            try {
                console.log(this.createForm)
                await HotelPayModeApi.addInfo(this.createForm);
                this.fetchData();
                this.createDialog = false;
                this.$message({
                    message: '保存成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
        },
        async handleEdit($index, row) {
            this.editDialog = true;
            try {
                const res = await HotelPayModeApi.getDetail({
                    id: row.ID
                });
                console.log(res.data);
                this.editForm = res.data;
            } catch (e) {
                console.error(e);
            }
        },
        async handleDelete($index, row) {
            try {
                await this.$confirm('是否删除此条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await HotelPayModeApi.delInfo({
                    id: row.ID
                });
                this.fetchData();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleSearch() {
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.fetchData(val);
        },
        async fetchData(page) {
            // param: sort way
            let sortWay = this.filters.sortWay && this.filters.sortWay.prop ?
                this.filters.sortWay :
                '';

            // param: page
            this.page = page || this.page;

            let options = {
                page: this.page,
                ModeName: this.filters.labelVal === '1' ? this.filters.ModeName : null,
                sortWay: sortWay,
                Remark: this.filters.labelVal === '2' ? this.filters.Remark : null,
            };
            //      console.log('[dashboard]:your post params');
            //      console.log(options);

            this.loading = true;
            try {
                console.log(options)
                const res = await HotelPayModeApi.getList(options);
                console.log(res.data);
                // clear selection
                this.$refs.table.clearSelection();
                // lazy render data
                this.list = res.data.list;
                this.total = res.data.total;
                this.loading = false;
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
    .filters {
        margin: 0 0 20px;
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

    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
}
</style>
