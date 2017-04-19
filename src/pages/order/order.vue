<template lang="html">
  <div id="Order">

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
        <!-- <el-button type="primary" @click="clickCrate()">创建</el-button> -->
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table :data="list" border ref="table" style="width: 100%" element-loading-text="拼命加载中"
        stripe
        v-loading="loading"
        @sort-change="handleSortChange">
        <el-table-column type="selection" width="50"></el-table-column>
        <el-table-column prop="OrderNum" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="OrderFrom" label="订单来源" width="100"></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称" width="200"></el-table-column>
        <el-table-column prop="CheckInDate" label="入住日期" width="115"></el-table-column>
        <el-table-column prop="CheckOutDate" label="退房日期" width="115"></el-table-column>
        <el-table-column prop="BookDate" label="预定日期" width="115"></el-table-column>
        <el-table-column prop="CustomerName" label="客人姓名" width="95"></el-table-column>
        <el-table-column prop="IsScreenshot" label="截图" width="65"></el-table-column>
        <el-table-column prop="IsSubmit" label="提交" width="65"></el-table-column>
        <el-table-column prop="IsRemit" label="打款" width="65"></el-table-column>
        <el-table-column prop="IsAudit" label="审核" width="65"></el-table-column>
        <el-table-column prop="IsEdit" label="编辑" width="65"></el-table-column>
        <el-table-column prop="SubmitterName" label="提交人" width="95"></el-table-column>
        <el-table-column :context="_self" width="150" inline-template label="操作">
          <div>
            <!-- <el-button size="small" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button> -->
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

    </div>
  </div>
</template>

<script>
import {
    orderApi
} from 'api';

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
        async handleDelete($index, row) {
            try {
                await this.$confirm('是否删除此条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                });
                await orderApi.delInfo({
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
                const res = await orderApi.getList(options);
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
#Order {
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
