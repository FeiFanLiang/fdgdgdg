<template lang="html">
  <div id="HotelPayMode">
    <db-breadcrumb></db-breadcrumb>

    <div class="filters">
      <div class="filter">
        <el-select v-model="filters.labelVal" clearable placeholder="请选择">
          <el-option
              v-for="item in selectedOptions"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-input placeholder="请输入账户名称" v-model="filters.modeName" v-show="filters.labelVal == '1'"></el-input>
        <el-input placeholder="请输入Remark" v-model="filters.remark" v-show="filters.labelVal == '2'"></el-input>
      </div>
      <el-button type="primary" @click="handleSearch()">搜索</el-button>
      <el-button type="primary" @click="clickAddBtn()">创建</el-button>
    </div>

    <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading"
      border
      @sort-change="handleSortChange">
      <el-table-column prop="id" label="ID" width="180" show-overflow-tooltip></el-table-column>
      <el-table-column prop="modeName" label="账户名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
      <el-table-column  width="150"  label="操作">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-wrapper" v-show="!loading&&list.length">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
    <el-dialog :title="dialogTitle" v-model="showDialog" size="tiny">
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
            total: 0,
            currentPage: 1,
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
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleSortChange(sortWay) {
            this.filters.sortWay = {
                prop: sortWay.prop,
                order: sortWay.order
            };
            this.fetchData();
        },
        handleSearch() {
            this.fetchData();
        },
        async fetchData(page) {
            const _self = this;

            // const sortWay = _self.filters.sortWay && _self.filters.sortWay.prop ? _self.filters.sortWay : '';
            // _self.page = page || _self.page;
            //
            // const options = {
            //     page: _self.page,
            //     modeName: _self.filters.labelVal === '1' ?
            //         _self.filters.modeName : null,
            //     sortWay: sortWay,
            //     remark: _self.filters.labelVal === '2' ? _self.filters.remark : null
            // };

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
                console.log(_self.list);
                _self.total = _self.list.length;
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
                await _self.$confirm('是否删除此条信息?', '提示', {
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
    .filters {

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
    .el-table .cell {
        white-space: nowrap;
        word-break: break-all;
        line-height: 24px;
    }
}
</style>
