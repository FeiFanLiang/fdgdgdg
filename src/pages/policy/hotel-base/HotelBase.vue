<template lang="html">
  <div id="HotelBasePage">
    
    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->
    
    <!-- search start -->
    <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal" clearable placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入酒店ID" v-model="filters.id" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '2'"></el-input>
          <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '3'"></el-input>
      </div>
        <el-button type="primary" @click="hotelbaseSearch()">搜索</el-button>
        <el-button type="primary">
          <router-link :to="{path: '/HotelBaseAdd'}">创建</router-link>
        </el-button>
    </div>
    <!-- search end -->

    <!-- table start -->
    <div class="eltable">
      <el-table
      :data="hotelbase"
      border stripe
      :default-sort = "{prop: 'id', order: 'descending'}"
      style="width: 100%">
        <el-table-column prop="id" label="酒店ID" sortable></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="HotelName_En" label="英文名称"></el-table-column>
        <el-table-column prop="FrontPhone" label="前台电话"></el-table-column>
        <el-table-column prop="Address" label="地址"></el-table-column>
        <el-table-column prop="Star" label="星级"></el-table-column>
        <el-table-column prop="PersonName" label="采购人"></el-table-column>
        <el-table-column prop="PurchasingName" label="政策负责人"></el-table-column>
        <el-table-column prop="PayMode" label="结款"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作">
          <div>
          </div>
        </el-table-column>        
      </el-table>
    </div>
    <!-- table end -->

    <!-- pagination start  -->
      <div class="pagination-wrapper">
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
import {
  hotelApi,
} from 'api';

  export default {
    data() {
      return {
        hotelbase: [],
        page: 0,
        filters: {
          id: '',
          HotelName: '',
          HotelName_En: '',
          labelVal: '1'
        },
        selectedOptions: [{
          value: '1',
          label: '酒店ID'
          }, {
          value: '2',
          label: '酒店名称'
        }, {
          value: '3',
          label: '酒店英文名称'
        }]
      }
    },
    created() {
      this.getHotelbaseList();
      console.log('getHotelbaseListcreated')
    },
    methods: {
      hotelbaseSearch() {
        this.getHotelbaseList();
        console.log('hotelbaseSearch')
      },
      async getHotelbaseList(page) {
        this.page = page || this.page;
          let options = {
                page: this.page,
                id: this.filters.labelVal === '1' ? parseInt(this.filters.id, 10) : null,
                HotelName: this.filters.labelVal === '2' ? this.filters.HotelName : null,
                HotelName_En: this.filters.labelVal === '3' ? this.filters.HotelName_En : null

        };
        await hotelApi.fetchHotelbaseList(options).then(data => {
          let { code, hotelbase_list } = data;
          if (code === 200) {
            this.hotelbase = hotelbase_list;
          }
        });
        console.log('getHotelbaseList')
      },
      handleCurrentChange(val) {
        this.getHotelbaseList(val);
      },
      // mounted() {
        // this.getHotelbaseList();
      // }
    }
  }
</script>

<style lang="scss">
#HotelBasePage {

  .eltable {
    margin: 20px 0 0 0 
  }

  .filters {
    margin: 20px 0 0 0;
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
}
</style>