<template lang="html">
  <div id="HotelBasePage">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <!-- search start -->
    <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal"  placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入酒店ID" v-model="filters.ID" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '2'"></el-input>
          <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '3'"></el-input>
      </div>
        <el-button type="primary" @click="hotelbaseSearch(filters)">搜索</el-button>
        <el-button type="primary">
          <router-link :to="{path: 'HotelBaseAdd'}">创建</router-link>
        </el-button>
    </div>
    <!-- search end -->

    <!-- table start -->
    <div class="eltable">
      <el-table
      :data="hotelbase"
      border stripe
      :default-sort = "{prop: 'ID', order: 'descending'}"
      style="width: 100%">
        <el-table-column prop="ID" label="酒店ID" sortable></el-table-column>
        <el-table-column prop="HotelNum" label="酒店编号"></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="HotelName_En" label="英文名称"></el-table-column>
        <el-table-column prop="FaxNum" label="传真号"></el-table-column>
        <el-table-column prop="FrontPhone" label="前台电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Area.AreaName" label="区域"></el-table-column>
        <el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Star.StarName" label="星级"></el-table-column>
        <el-table-column prop="Policys.PersonName" label="采购人"></el-table-column>
        <el-table-column prop="Policys.PurchasingName" label="政策负责人"></el-table-column>
        <el-table-column prop="PayMode" label="结款"></el-table-column>
        <el-table-column   label="操作" width="150">
          <template scope="scope">
            <el-button size="small" @click="hotelbaseEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="hotelbaseDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- table end -->

    <!-- pagination start  -->
      <div class="pagination-wrapper" style="align=center">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10">
        </el-pagination>
      </div>
    <!-- pagination end  -->

  </div>
</template>

<script>
import { HotelBaseApi } from 'api';

export default {
  data() {
    return {
      hotelbase: [],
      page: 1,
      filters: {
        ID: '',
        HotelName: '',
        HotelName_En: '',
        labelVal: '1'
      },
      selectedOptions: [
        {
          value: '1',
          label: '酒店ID'
        },
        {
          value: '2',
          label: '酒店名称'
        },
        {
          value: '3',
          label: '酒店英文名称'
        }
      ]
    };
  },
  created() {
    this.getHotelbaseList();
  },
  methods: {
    hotelbaseSearch() {
      this.getHotelbaseList();
    },
    async getHotelbaseList(page) {
      this.page = page || this.page;
      const options = {
        pageIndex: this.page,
        pageSize: 10,
        order: 'ID',
        query: [
          {
            ID: this.filters.labelVal === '1'
              ? parseInt(this.filters.ID, 10)
              : null
          },
          {
            HotelName: this.filters.labelVal === '2'
              ? this.filters.HotelName
              : null
          },
          {
            HotelName_En: this.filters.labelVal === '3'
              ? this.filters.HotelName_En
              : null
          }
        ]
      };
      const res = await HotelBaseApi.listAll(options);
      this.hotelbase = res.data.Data;
    },
    handleCurrentChange(val) {
      this.getHotelbaseList(val);
    },
    hotelbaseEdit($index, row) {
      this.$router.push({
        name: 'HotelBaseEdit',
        params: {
          ID: row.ID
        }
      });
    },
    async hotelbaseDelete($index, row) {
      try {
        await this.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await HotelBaseApi.remove(row.ID);
        this.getHotelbaseList();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss">
#HotelBasePage {

    .filters {
        margin: 20px 0 0;
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
