<template lang="html">
  <div id="HotelPlatform">
    
    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

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
          <el-input placeholder="请输入平台ID" v-model="filters.id" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入平台名称" v-model="filters.PlatName" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <el-button type="primary" @click="platformSearch()">搜索</el-button>
        <el-button type="primary" @click="createPlatform = true">创建</el-button>
      </div>
      <!-- filters end -->

    <!-- table start -->
    <el-table
    :data="platform"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    @sort-change="handleSortChange">
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="PlatName"
      label="平台名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Ramark"
      label="平台信息">
    </el-table-column>
  </el-table>
  <!-- table end -->
  
  </div>
</template>

<script>
import {
  hotelApi,
} from 'api';

  export default {
    data() {
      return {
        platform: [],
        multipleSelection: [],
        filters: {
          PlatName: '',
          id: '',
          labelVal: '1'
        },
        selectedOptions: [{
          value: '1',
          label: '平台ID'
          }, {
          value: '2',
          label: '平台名称'
        }]
      }
    },
    created() {
      // this.getPlatformList();
      this.fetchData();
      console.log('111111111111')
    },
    methods: {
//      getPlatformList() {
//        console.log('22222222222')
//        hotelApi.fetchPlatformList().then(data => {
//          let { code, platform_list } = data;
//          if (code === 200) {
//            this.platform = platform_list;
//          }
//        });
//        console.log('3333333333333')
//      },
      handleSortChange() {
        this.fetchData();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      platformSearch() {
        console.log('44444444444');
        this.fetchData();
      },
      fetchData() {
        let options = {
          PlatName: this.filters.labelVal === '2' ? this.filters.PlatName : null,
          id: this.filters.labelVal === '1' ? this.filters.id : null
        };
        console.log(options);
        hotelApi.fetchPlatformList(options).then(res => {
          // this.$refs.table.clearSelection();
          // let { code, platform_list } = data;
          // if (code === 200) {
            // this.platform = platform_list;
          // }
          this.platform = res.platform_list;
        });
        console.log('3333333333333')
      },
      mounted() {
        this.fetchData();
      }
    }
  }
</script>

<style lang="scss">
#HotelPlatform {

  .el-table {
    margin: 20px 0 0 0;
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