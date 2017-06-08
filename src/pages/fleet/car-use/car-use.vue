<template lang="html">
    <div id="role-page">
        <el-row :gutter="20"></el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" row-key="ID" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <p>用车描述：{{props.row.Destination}}</p>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="CarID" label="CarID"></el-table-column>
            <el-table-column prop="DriverID" label="DriverID"></el-table-column>
            <el-table-column prop="Origin" label="始发地"></el-table-column>
            <el-table-column prop="Destination" label="目的地"></el-table-column>
            <el-table-column prop="StartTime" label="开始时间"></el-table-column>
            <el-table-column prop="EndTime" label="结束时间"></el-table-column>
            <el-table-column prop="StartMileage" label="起始里程数"></el-table-column>
            <el-table-column prop="EndMileage" label="结束里程数"></el-table-column>
            <el-table-column prop="Channel" label="渠道" e-table-column></el-table-column>
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
                    ID: 1,
                    CarID: 1,
                    DriverID: 1,
                    StartTime: '',
                    EndTime: '',
                    StartMileage: '',
                    EndMileage: '',
                    Origin: '',
                    Destination: '',
                    Description: '',
                    Channel: ''
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
