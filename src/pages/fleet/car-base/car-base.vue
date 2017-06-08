<template lang="html">
    <div>
        <el-row :gutter="20">
            <el-col>
                <el-button type="primary" @click="clickAddBtn">创建</el-button>
            </el-col>
        </el-row>
        <el-table :data="carBaseList" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column prop="CarMode" label="车型" show-overflow-tooltip></el-table-column>            
            <el-table-column prop="CarClassify" label="车辆分类" show-overflow-tooltip></el-table-column>
            <el-table-column prop="OperationCity" label="运营城市" show-overflow-tooltip></el-table-column>
            <el-table-column prop="SeatNum" label="座位数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="SeatingNum" label="最大载客数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LuggageNum" label="行李数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="RunStatus" label="运行状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LastStatusLongitude" label="最后经度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LastStatusLatitude" label="最后纬度" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="120px">
                <template scope="scope">
                    <el-button type="primary" size="mini" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="form.id?'编辑车辆基本信息':'添加车辆基本信息'" v-model="showDialog"  @close="resetForm('form')">
            <el-form :rules="rules" ref="form" :model="form"  >
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车型" prop="CarMode">
                            <el-input placeholder="请输入车型" v-model="form.CarMode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="座位数" prop="SeatNum">
                            <el-input placeholder="请输入座位数" v-model="form.SeatNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="最大载客人数" prop="SeatingNum">
                            <el-input placeholder="请输入最大载客人数" v-model="form.SeatingNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="行李数" prop="LuggageNum">
                            <el-input placeholder="请输入行李数" v-model="form.LuggageNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="最后纬度" prop="LastStatusLatitude">
                            <el-input placeholder="请输入最后纬度" v-model="form.LastStatusLatitude"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="最后经度" prop="LastStatusLongitude">
                            <el-input placeholder="请输入最后经度" v-model="form.LastStatusLongitude"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="运营城市" prop="OperationCity">
                            <el-input placeholder="请输入运营城市" v-model="form.OperationCity"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注" prop="Remark">
                            <el-input type="textarea" v-model="form.Remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="24">
                    <el-col :span="10">
                        <el-form-item label="运行状态">
                            <el-select v-model="value2" clearable placeholder="请选择运行状态">
                                <el-option v-for="item in RunStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" :offset="2">
                        <el-form-item label="车辆分类">
                            <el-select v-model="value" clearable placeholder="请选择车辆类型">
                                <el-option v-for="item in CarClassifyList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
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

export default {
    data() {
            return {
                loading:false,
                showDialog:false,
                form:{

                },
                carBaseList: [{
                    CarMode:'aaa',
                    CarClassify:'aaa',
                    OperationCity:'aaa',
                    SeatNum:'aaa',
                    SeatingNum:'aaa',
                    LuggageNum:'aaa',
                    RunStatus:'aaa',
                    LastStatusLongitude:'aaa',
                    LastStatusLatitude:'aaa',
                    Remark:'aaa',
                }],
                rules: {
                    CarMode: [{
                        required: true,
                        message: '请输入车型',
                        trigger: 'blur'
                    }],
                },
                CarClassifyList:[{
                    value: 'Economy',
                    label: '经济型'
                },{
                    value: 'Comfortable',
                    label: '舒适型'
                },{
                    value: 'Business',
                    label: '商务型'
                },{
                    value: 'Luxurious',
                    label: '豪华型'
                }],
                value:'',
                RunStatusList:[{
                    value: 'Stopping',
                    label: '不可用'
                },{
                    value: 'Await',
                    label: '待命'
                },{
                    value: 'Serviceing',
                    label: '运行中'
                },{
                    value: 'Backing',
                    label: '回程中'
                }],
                value2:'',

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
