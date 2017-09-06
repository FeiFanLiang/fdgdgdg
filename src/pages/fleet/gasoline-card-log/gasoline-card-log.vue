<template lang="html">
    <div id="gasoline-card-log">
        <el-row :gutter="20">
            <el-col :span="4">
                <el-select v-model="filters.gasolineCardID" placeholder="请选择">
                   <el-option
                      v-for="(item,index) in cardList"
                      :key="index"
                      :label="item.CardNum"
                      :value="item.ID">
                   </el-option>
                </el-select>
            </el-col>
            <el-col :span="10">
                <el-button type="primary" @click="gasolineSearch(filters)">搜索</el-button>
                <el-button type="primary" @click="clear()">清空</el-button>
            </el-col >
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column type="expand">
                <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                             <img v-if="props.row.ImagePath" :src="imageUrl+ props.row.ImagePath" style="width: 200px;">
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="cardNum" label="加油卡卡号"></el-table-column>
            <el-table-column label="类型" show-overflow-tooltip>
                <template scope="scope">
                    <span v-if="scope.row.UseType === 0">充值</span>
                    <span v-if="scope.row.UseType === 1">加油</span>
                </template>
            </el-table-column>
            <el-table-column prop="DateTime" label="加油时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Total" label="总额"></el-table-column>
            <el-table-column prop="Balance" label="余额"></el-table-column>
            <!-- <el-table-column label="操作" width="150">
<template scope="scope">
    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
        编辑</el-button>
    <DeleteButton api="gasolineCardLogApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
            </el-table-column> -->
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import path from '../../../api/api.js'
import { gasolineCardLogApi, gasolineLogApi } from 'api'
export default {
  created() {
    this.imageUrl = path.imageUrl
    this.fetchData()
    this.getList()
  },
  data() {
    return {
      filters: {
        gasolineCardID: ''
      },
      imageUrl: '',
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      disabled: false,
      pickerOptions: {},
      cardList:[]
    }
  },
  methods: {
    querySearch(queryString, cb) {
        var restaurants = this.oilList;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
    },
    createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
        };
    },
    handleSelect(item) {
        console.log(item);
    },
    gasolineSearch() {
      this.fetchData()
    },
    clear(){
        this.filters.gasolineCardID = ''
        this.fetchData()
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'ID',
        query: {
          gasolineCardID: _self.filters.gasolineCardID
        }
      }
      try {
        const res = await gasolineCardLogApi.list(options)
        _self.list = res.data.Data
        _self.list.forEach(function(item1){
            _self.cardList.forEach(function(item2){
                if(item1.GasolineCardID === item2.ID) item1.cardNum = item2.CardNum
            })
        })
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    async getList() {
      const res3 = await gasolineLogApi.cardList()
      this.cardList = res3.data.Data
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    channelChange() {
      if (this.form.Channel == 0) {
        this.disabled = false
      }
      if (this.form.Channel == 1) {
        this.disabled = true
        this.form.SerialNumber = ''
      }
    }
  }
}
</script>
<style lang="scss">
#gasoline-card-log {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 0 10px 16px !important;
    }
}
</style>
