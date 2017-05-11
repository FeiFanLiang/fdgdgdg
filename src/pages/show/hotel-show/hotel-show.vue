<template lang="html">
  <div >
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="filters.labelVal"  placeholder="请选择">
          <el-option
              v-for="(item,index) in selectedOptions"
              :label="item.label"
              :value="item.value"
              :key="index">
          </el-option>
        </el-select>
    </el-col>
      <el-col :span="3">
        <el-input placeholder="请输入账户名称" v-model="filters.accountName" v-show="filters.labelVal == '1'"></el-input>
        <el-input placeholder="请输入银行账户" v-model="filters.accountNum" v-show="filters.labelVal == '2'"></el-input>
    </el-col>
    <el-button type="primary" @click="handleSearch()">搜索</el-button>
    </el-row>
      <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中"
        v-loading="loading"
        border
        row-key="ID"
        >
        <el-table-column sortable prop="ID" label="ID" width="180" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="AccountName"  label="账户名称" show-overflow-tooltip></el-table-column>
        <el-table-column sortable prop="AccountNum"  label="银行帐户" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="del(scope.row)">删除</el-button>
           </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import {
    payCompanyApi
} from 'api';


export default {
    data() {
        return {
            list: [],
            loading: true,
            filters: {
                sortWay: '',
                accountName: '',
                labelVal: '1',
                accountNum: ''
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

        };
    },

    methods: {
        handleSearch() {
            this.fetchData();
        },
        async fetchData() {
            const _self = this;
            _self.loading = true;
            _self.list = [];
            try {
                const res = await payCompanyApi.list();
                _self.list=res.data
                _self.loading = false;
            } catch (e) {
                _self.loading = false;
            }
        },
        async edit(row) {
          this.$router.push({
            name: '编辑酒店展示',
            params: {
              hotelID: '10',
              hotelShowID:'1'
            },
            query: {
              hotelName: 'hahahh'
            }
          });
        },
        async del(row) {
            const _self = this;
            _self.$confirm(`是否删除${row.accountName}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                try {
                    await payCompanyApi.del(row.id);
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
        this.fetchData();
    }
};
</script>

<style lang="scss">
</style>
