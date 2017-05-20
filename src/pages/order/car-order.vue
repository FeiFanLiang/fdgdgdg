<template lang="html">
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="filters.labelVal" placeholder="请选择">
                    <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-input placeholder="请输入电话" v-model="filters.realName" v-show="filters.labelVal == '1'"></el-input>
                <el-input placeholder="请输入时间段" v-model="filters.userName" v-show="filters.labelVal == '2'"></el-input>
            </el-col>
            <el-col :span="4">
                <el-button type="primary" @click="handleSearch()">搜索</el-button>
            </el-col>
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID">
            <el-table-column sortable prop="ID" label="ID" width="180" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="AccountName" label="账户名称" show-overflow-tooltip></el-table-column>
            <el-table-column sortable prop="AccountNum" label="银行帐户" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>
<script>
import {
    carOrderApi
} from 'api';


export default {
    data() {
            return {
                loading:false,
                filters: {
                    realName: '',
                    userName: '',
                    labelVal: '1'
                },
                selectedOptions: [{
                    value: '1',
                    label: '手机号'
                }, {
                    value: '2',
                    label: '时间段'
                }],
                list: [],
            };
        },

        methods: {
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            async fetchData() {
                const _self = this;
                 _self.loading = true;
                try {
                    const res = await carOrderApi.listByPhone('123123123');
                    _self.list = res.data;
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            },
        },
        mounted() {
            this.fetchData();
        }
};
</script>
