<template lang="html">
  <div id="PayCompany">

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
          <el-input placeholder="请输入账户名称" v-model="filters.AccountName" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入银行账户" v-model="filters.AccountNum" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <!-- <div class="filter">
          起止时间：
          <el-date-picker type="datetimerange" placeholder="选择时间范围" style="width:350px" v-model="filters.startEndTime"></el-date-picker>
        </div> -->
        <el-button type="primary" @click="handleSearch()">搜索</el-button>
        <el-button type="primary" @click="clickCrate()">创建</el-button>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        stripe
        v-loading="loading"
        @sort-change="handleSortChange">
        <el-table-column prop="ID" label="ID" width="180" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="AccountName" label="账户名称" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="AccountNum" sortable="custom" label="银行帐户" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="Remark" label="Remark" :show-overflow-tooltip="true"></el-table-column>
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
      <el-dialog title="编辑银行信息" v-model="editDialog" size="tiny">
        <el-form :rules="rules" ref="editForm" :model="editForm" >
          <el-form-item label="账户名称" prop="AccountName">
            <el-input placeholder="请输入账户名称" v-model="editForm.AccountName"></el-input>
          </el-form-item>
          <el-form-item label="银行帐户" prop="AccountNum">
            <el-input placeholder="请输入银行账户" v-model="editForm.AccountNum"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="editForm.Remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleEditSave('editForm')">确 定</el-button>
        </span>
      </el-dialog>

      <!-- edit dialog end -->

      <!-- create dialog start -->
      <el-dialog title="添加银行信息" v-model="createDialog" size="tiny">
        <el-form :rules="rules" ref="createForm" :model="createForm">
          <el-form-item label="账户名称" prop="AccountName">
            <el-input placeholder="请输入账户名称" v-model="createForm.AccountName"></el-input>
          </el-form-item>
          <el-form-item label="银行帐户" prop="AccountNum">
            <el-input placeholder="请输入银行账户" v-model="createForm.AccountNum"></el-input>
          </el-form-item>
          <el-form-item label="Remark">
            <el-input v-model="createForm.Remark"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleSave('createForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- create dialog end -->
    </div>
  </div>
</template>

<script>
import { payCompanyApi } from 'api';

// import moment from 'moment';
// import Vue from 'vue';

export default {
    data() {
        return {
            list: [],
            total: 0,
            page: 0,
            loading: true,
            editDialog: false,
            createDialog: false,
            filters: {
                sortWay: '',
                AccountName: '',
                labelVal: '1',
                AccountNum: ''
            },
            editForm: {
                ID: '',
                AccountName: '',
                AccountNum: '',
                Remark: ''
            },
            createForm: {
                ID: 0,
                AccountName: '',
                AccountNum: '',
                Remark: ''
            },
            selectedOptions: [{
                    value: '1',
                    label: '账户名称'
                },
                {
                    value: '2',
                    label: '银行账户'
                }

            ],
            rules: {
                AccountName: [{
                    required: true,
                    message: '请输入账户名称',
                    trigger: 'blur'
                }],
                AccountNum: [{
                    required: true,
                    message: '请输入银行账户',
                    trigger: 'blur'
                }]
            }
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
                AccountName: '',
                AccountNum: '',
                Remark: ''
            }
        },
        async handleEditSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
                        payCompanyApi.editInfo(this.editForm);
                        this.fetchData();
                        this.editDialog = false;
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    return false;
                }
            })
        },
        async handleSave(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    try {
                        payCompanyApi.addInfo(this.createForm);
                        this.fetchData();
                        this.createDialog = false;
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    return false;
                }
            })
        },
        async handleEdit($index, row) {
            this.editDialog = true;
            try {
                const res = await payCompanyApi.getDetail(row.ID);
                this.editForm = { ...res.data};
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
                await payCompanyApi.delInfo(row.ID);
                this.fetchData();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
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
                AccountName: this.filters.labelVal === '1' ? this.filters.AccountName : null,
                sortWay: sortWay,
                AccountNum: this.filters.labelVal === '2' ? this.filters.AccountNum : null
            };
            //      console.log('[dashboard]:your post params');
            //      console.log(options);

            this.loading = true;
            try {
                const res = await payCompanyApi.getList(options);
                console.log(res.data);
                // clear selection
                this.$refs.table.clearSelection();
                // lazy render data
                this.list = res.data;
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
#PayCompany {
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
