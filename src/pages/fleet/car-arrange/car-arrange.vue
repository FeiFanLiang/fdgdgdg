<template lang="html">
    <div id="car-arrange-page">
        <el-row>
            <el-col :span="3">
                <el-button type="primary" @click="clickAddBtn()">创建</el-button>
            </el-col>
            <el-col :span="9" :offset="12">
                <el-tag class="mytag ready">准备出车</el-tag>
                <el-tag class="mytag serviceing">运行中</el-tag>
                <el-tag class="mytag completed">已完成</el-tag>
                <el-tag class="mytag cancel">已取消</el-tag>
            </el-col>
        </el-row>
        <el-table :data="list" ref="table" :row-class-name="tableRowClassName" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID">
            <el-table-column type="expand">
                <template scope="props" v-if="props.row.CancelTime">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>取消时间：{{props.row.CancelTime}}</p>
                            <p>取消单人员：{{props.row.CancelUserID}}</p>
                            <p>取消说明：{{props.row.CancelRemark}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="OrderID" label="OrderID"></el-table-column>
            <el-table-column prop="WebOrderID" label="WebOrderID"></el-table-column>
            <el-table-column prop="CarID" label="CarID"></el-table-column>
            <el-table-column prop="DriverID" label="DriverID"></el-table-column>
            <el-table-column prop="Origin" label="始发地"></el-table-column>
            <el-table-column prop="Destination" label="目的地"></el-table-column>
            <el-table-column prop="PredictTime" label="预计行车时间"></el-table-column>
            <el-table-column prop="PredictMileage" label="预计里程"></el-table-column>
            <el-table-column prop="ArrangeUserID" label="派单人员"></el-table-column>
            <el-table-column prop="Remark" label="备注"></el-table-column>
            <el-table-column width="150" label="操作" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="form.id?'编辑派车信息':'添加派车信息'" v-model="showDialog" size="small" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="ID">
                            <el-input placeholder="请输入ID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="OrderID">
                            <el-input placeholder="请输入OrderID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="CarID">
                            <el-input placeholder="请输入CarID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="DriverID">
                            <el-input placeholder="请输入DriverID"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地">
                            <el-input placeholder="请输入始发地"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地">
                            <el-input placeholder="请输入目的地"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="预计行车时间">
                            <el-input placeholder="请输入预计行车时间"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预计里程">
                            <el-input placeholder="请输入预计里程"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="派单人员">
                            <el-input placeholder="请输入派单人员"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input placeholder="请输入备注" type="textarea"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="取消时间">
                            <el-input placeholder="请输入取消时间"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="取消单人员">
                            <el-input placeholder="请输入取消单人员"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="取消说明">
                            <el-input placeholder="请输入取消说明" type="textarea"></el-input>
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
    payCompanyApi
} from 'api';


export default {
    data() {
            return {
                list: [{
                    CancelTime: '11'
                }, {
                    CancelTime: ''
                }, {
                    CancelTime: ''
                }, {
                    CancelTime: '11'
                }],
                loading: false,
                showDialog: false,
                form: {
                    id: '',
                    accountName: '',
                    accountNum: '',
                    remark: ''
                },
                rules: {
                    accountName: [{
                        required: true,
                        message: '请输入账户名称'
                    }],
                    accountNum: [{
                        required: true,
                        message: '请输入银行账户'
                    }]
                }
            };
        },

        methods: {
            tableRowClassName(row, index) {
                if (index === 0) {
                    return 'ready';
                } else if (index === 1) {
                    return 'serviceing';
                } else if (index === 3) {
                    return 'cancel';
                }
                return '';
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            async fetchData() {
                const _self = this;
                _self.loading = true;
                try {
                    const res = await payCompanyApi.list();
                    _self.list = res.data;
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            },
            clickAddBtn() {
                const _self = this;
                _self.showDialog = true;
                _self.form = {};
            },
            async clickEditBtn($index, row) {
                const _self = this;
                try {
                    // const res = await payCompanyApi.detail(row.ID);
                    _self.showDialog = true;
                    // _self.form.id = res.data.ID;
                    // _self.form.accountName = res.data.AccountName;
                    // _self.form.accountNum = res.data.AccountNum;
                    // _self.form.remark = res.data.Remark;
                } catch (e) {
                    console.error(e);
                }
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
                            const form = {..._self.form
                            }
                            delete form.id
                            await payCompanyApi.add(form);
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
            async editSave() {
                const _self = this;
                _self.$refs['form'].validate(async valid => {
                    if (valid) {
                        try {
                            await payCompanyApi.edit(_self.form);
                            _self.fetchData();
                            _self.$refs['form'].resetFields();
                            _self.showDialog = false;
                            _self.$message({
                                message: '编辑成功',
                                type: 'success'
                            });
                        } catch (e) {
                            console.error(e);
                            _self.$message.error('编辑失败!!!');
                        }
                    } else {
                        return false;
                    }
                });
            },
            async clickDelBtn($index, row) {
                const _self = this;
                _self.$confirm(`是否删除${row.accountName}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    try {
                        await payCompanyApi.del(row.ID);
                        _self.fetchData();
                        _self.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    } catch (e) {
                        console.error(e);
                    }
                }).catch(() => {});
            }
        },
        mounted() {
            // this.fetchData();
        }
};
</script>
<style lang="scss">
#car-arrange-page {
    .mytag {
        width: 60px;
        text-align: center;
        border: 1px solid silver;
        margin: 0px 15px;
        height: 36px;
        line-height: 36px;
        color: #000;
    }
    .ready {
        background: #e2f0e4;
    }
    .serviceing {
        background: #c9e5f5;
    }
    .completed {
        background: #fff;
    }
    .cancel {
        background: #f1d4d9;
    }
    .el-dialog .el-row {
        margin-bottom: 5px !important;
    }
}
</style>
