<template lang="html">
<div id="HotelBasePage">
  <el-row :gutter="20">
    <el-col :span="3">
      <el-select v-model="filters.labelVal" placeholder="请选择">
        <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="3">
      <el-input placeholder="请输入酒店ID" v-model="filters.ID" v-show="filters.labelVal == '1'"></el-input>
      <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '2'"></el-input>
      <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '3'"></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="hotelbaseSearch(filters)">搜索</el-button>
    </el-col>
    <el-col :span="7">
      <el-radio-group v-model="isForeign" @change="areaTypeChange">
        <el-radio-button :label="false">国内</el-radio-button>
        <el-radio-button :label="true">国外</el-radio-button>
      </el-radio-group>
    </el-col>
  </el-row>
  <div class="eltable">
    <CustomTable :list="hotelbase" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="getHotelbaseList">
      <el-table-column label="操作" width="180" fixed="right" slot="right-one">
        <template scope="scope">
            <!--<el-button size="small" @click="addHotelShow( scope.row)">添加展示信息</el-button>-->
            <el-button size="small" @click="hotelbaseEdit(scope.$index, scope.row)">编辑政策信息</el-button>
            <!-- <DeleteButton api="hotelBaseApi" @successCallBack="getHotelbaseList" :id="scope.row.ID"></DeleteButton> -->
</template>
        </el-table-column>
      </CustomTable>
    </div>
      <div class="pagination-wrapper" >
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30]"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :total="count">
        </el-pagination>
      </div>
  </div>
</template>

<script>
import {
  hotelBaseApi
} from 'api'
export default {
  created() {
    this.getHotelbaseList()
    this.configList = hotelBaseApi.getConfig()
  },
  data() {
    return {
      isForeign: false,
      hotelbase: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      filters: {
        ID: '',
        HotelName: '',
        HotelName_En: '',
        labelVal: '1'
      },
      selectedOptions: [{
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
    }
  },

  methods: {
    areaTypeChange(isForeign) {
      this.getHotelbaseList()
    },
    hotelbaseSearch() {
      this.getHotelbaseList()
    },
    async getHotelbaseList(currentPage, pageSize) {
      const _self = this
      this.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'ID',
        query: {
          ID: _self.filters.labelVal === '1' ? _self.filters.ID : '',
          HotelName: _self.filters.labelVal === '2' ? _self.filters.HotelName : '',
          HotelName_En: _self.filters.labelVal === '3' ? _self.filters.HotelName_En : '',
          IsForeign: _self.isForeign
        },
      }
      const res = await hotelBaseApi.listAll(options)
      if (res && res.data && res.data.Data) {
        let data = res.data.Data
        for (let item of data) {
          if (
            item.Policys &&
            Array.isArray(item.Policys) &&
            item.Policys.length > 0
          ) {
            for (let n of item.Policys) {
              if (n.IsDefault) {
                item.Policys = n
              }
            }
          }
        }
        _self.hotelbase = data
        _self.count = res.data.Count
        this.loading = false
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getHotelbaseList(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getHotelbaseList(this.currentPage)
    },
    hotelbaseEdit($index, row) {
      this.$router.push({
        name: '酒店政策信息编辑',
        params: {
          ID: row.ID
        },
        query: {
          hotelName: row.HotelName
        }
      })
    }
  }
}
</script>

<style lang="scss">
#HotelBasePage {
  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
}
</style>
