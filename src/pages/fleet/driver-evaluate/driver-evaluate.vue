<template lang="html">
    <div id="role-page">
        <el-row :gutter="20"></el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" row-key="ID" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>{{props.row.Remark}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="Driver" label="Driver"></el-table-column>
            <el-table-column prop="Openid" label="Openid"></el-table-column>
            <el-table-column prop="Label" label="Label"></el-table-column>
            <el-table-column prop="Time" label="Time"></el-table-column>
            <el-table-column prop="field1" label="field1"></el-table-column>
            <el-table-column prop="field2" label="field2"></el-table-column>
            <el-table-column prop="field3" label="field3"></el-table-column>
            <el-table-column sortable label="Rate" width="185">
                <template scope="scope">
                    <el-rate  v-model="scope.row.Rate" disabled show-text text-color="#ff9900" text-template="{value}">
                    </el-rate>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {
    roleApi,
    userApi
} from 'api';

export default {
    data() {
            return {
                list: [{
                    ID: '1',
                    Driver: '王师傅',
                    Openid: 1,
                    Rate: 4.5,
                    Label: '1',
                    Time: '',
                    field1: '2',
                    field2: '3',
                    field3: '4',
                    Remark: '111111111111111111'
                }, {
                    ID: '21',
                    Driver: '刘师傅',
                    Openid: 1,
                    Rate: 3.9,
                    Label: '1',
                    Time: '',
                    field1: '2',
                    field2: '3',
                    field3: '4',
                    Remark: '2222222222222222'
                }],
                loading: false,
            };
        },

        methods: {
            async fetchData() {
                const _self = this;
                _self.loading = true;
                const options = {
                    query: {
                        realName: _self.filters.labelVal === '1' ? _self.filters.realName : '',
                        roleName: _self.filters.labelVal === '2' ? _self.filters.roleName : '',
                    },
                };
                try {
                    console.log(options)
                    const res = await roleApi.list();
                    _self.list = res.data;
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            }
        },
        mounted() {
            // this.fetchData();
        }
};
</script>
<style lang="scss" scoped>
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
