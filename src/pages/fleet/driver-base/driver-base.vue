<template lang="html">
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-button type="primary" @click="clickAddBtn">创建</el-button>
            </el-col>
        </el-row>
        <el-table :data="driverBaseList" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column prop="ID" label="ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Name" label="姓名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Phone" label="电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="JobStatus" label="工作状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="120px">
                <template scope="scope">
                    <el-button type="primary" size="mini" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="form.id?'编辑司机基本信息':'添加司机基本信息'"  size="tiny" v-model="showDialog"  @close="resetForm('form')">
            <el-form ref="form" :model="form"  >
                <el-form-item label="姓名" prop="Name">
                    <el-input placeholder="请输入姓名" v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="Phone">
                    <el-input placeholder="请输入司机电话" v-model="form.Phone"></el-input>
                </el-form-item>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="工作状态">
                            <el-select v-model="value" clearable placeholder="请选择工作状态" style="width:100%">
                                <el-option v-for="item in JobStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="备注" prop="Remark">
                    <el-input type="textarea" v-model="form.Remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>

export default {
    data() {
            return {
                loading:false,
                showDialog:false,
                form:{

                },
                driverBaseList: [{
                    ID:'1',
                    Name:'aaa',
                    Phone:'1111111',
                    Remark:'aaaaaaaaaaaaaaaa',
                    JobStatus:'正产在职'
                }],
                JobStatusList:[{
                    value: 'Jobing',
                    label: '正产在职'
                },{
                    value: 'Leaved',
                    label: '已离职'
                },{
                    value: 'Suspension',
                    label: '停职'
                }],
                value:'',
            };
        },
        methods: {
            clickAddBtn() {
                const _self = this;
                _self.showDialog = true;
                _self.form = {};
           },
           clickEditBtn($index, row) {
                this.showDialog = true;
                this.form.id = 1;
           },
            submitForm(){

            }
        }
};
</script>
