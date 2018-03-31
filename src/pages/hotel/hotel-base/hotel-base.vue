<template lang="html">
<div id="HotelBasePage">
  <el-row :gutter="20">
    <el-col :span="3">
      <el-select v-model="filters.labelVal" placeholder="请选择">
        <el-option v-for="(item,index) in selectedOptions" :label="item.label" :value="item.value" :key="index">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="5">
      <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '1'"></el-input>
      <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '2'"></el-input>
      <el-input placeholder="请输入酒店ID" v-model="filters.ID" v-show="filters.labelVal == '3'"></el-input>
      <el-input placeholder="请输入酒店前台电话" v-model="filters.FrontPhone" v-show="filters.labelVal == '4'"></el-input>
    </el-col>
    <el-col :span="4">
      <el-select v-model="filters.country" placeholder="请选择国家">
    <el-option
      v-for="item in countryOptions"
      :key="item.AreaName"
      :label="item.AreaName"
      :value="item.AreaName">
    </el-option>
  </el-select>
  </el-col>
  <el-col :span="4">
      <el-input placeholder="请输入城市" v-model="filters.city"></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="hotelbaseSearch(filters)">搜索</el-button>
      <el-button type="primary" @click="dialogTableVisible=true">
        创建
      </el-button>
    </el-col>
  </el-row>
  <div class="eltable">
    <CustomTable :list="hotelbase" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="getHotelbaseList">
      <el-table-column label="操作" width="180" fixed="right" slot="right-one">
        <template scope="scope">
            <!--<el-button size="small" @click="addHotelShow( scope.row)">添加展示信息</el-button>-->
            <el-button size="small" @click="hotelbaseEdit(scope.$index, scope.row)">编辑</el-button>
            <DeleteButton api="hotelBaseApi" @successCallBack="getHotelbaseList" :id="scope.row.ID"></DeleteButton>
</template>
        </el-table-column>
      </CustomTable>
      <!-- <el-table
      :data="hotelbase"
      border
      :default-sort = "{prop: 'ID', order: 'descending'}"
      style="width: 100%">
        <el-table-column prop="HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="HotelName_En" label="英文名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="FrontPhone" label="前台电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Star.StarName" label="星级"></el-table-column>
        <el-table-column prop="Policys.PersonName" label="采购人"></el-table-column>
        <el-table-column prop="Policys.PurchasingName" label="政策负责人"></el-table-column>
        <el-table-column prop="Policys.PayMode.ModeName" label="结款"></el-table-column>
        <el-table-column   label="操作" width="180" fixed="right">
<template scope="scope">
<el-button size="small" @click="addHotelShow( scope.row)">
  添加展示信息</el-button>
<el-button size="small" @click="hotelbaseEdit(scope.$index, scope.row)">编辑</el-button>
<DeleteButton api="hotelBaseApi" @successCallBack="getHotelbaseList" :id="scope.row.ID"></DeleteButton>
</template>
        </el-table-column>
      </el-table> -->
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
      <el-dialog title="创建酒店" v-model="dialogTableVisible">
        <HotelBaseAdd @hide="hotelAddHide"></HotelBaseAdd>
      </el-dialog>
  </div>
</template>

<script>
import { hotelBaseApi, hotelAreaApi2 } from 'api'
import HotelBaseAdd from './hotel-base-add.vue'
export default {
  components: {
    HotelBaseAdd
  },
  created() {
    this.getHotelbaseList()
    this.getCountryOptions()
    this.configList = hotelBaseApi.getConfig()
  },
  data() {
    return {
      dialogTableVisible: false,
      countryOptions: [],
      hotelbase: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      filters: {
        ID: '',
        HotelName: '',
        HotelName_En: '',
        FrontPhone: '',
        labelVal: '1',
        country: '',
        city: ''
      },
      selectedOptions: [
        {
          value: '1',
          label: '酒店名称'
        },
        {
          value: '2',
          label: '酒店英文名称'
        },
        {
          value: '3',
          label: '酒店ID'
        },
        {
          value: '4',
          label: '酒店前台电话'
        }
      ],
      countryOptions: []
    }
  },

  methods: {
    async getCountryOptions() {
      const _self = this
      const res = await hotelAreaApi2.listByLevel('1')
      _self.countryOptions = res.data
    },
    hotelAddHide() {
      this.dialogTableVisible = false
      this.getHotelbaseList()
    },
    /*addHotelShow(row) {
      this.$router.push({
        name: '添加酒店展示',
        params: {
          hotelID: row.ID
        },
        query: {
          hotelName: row.HotelName
        }
      });
    },*/
    /*addHotelBase(){
       this.dialogTableVisible=true;
       this.getHotelbaseList();
    },*/
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
          ID: _self.filters.labelVal === '3' ? _self.filters.ID : '',
          HotelName:
            _self.filters.labelVal === '1' ? _self.filters.HotelName : '',
          HotelName_En:
            _self.filters.labelVal === '2' ? _self.filters.HotelName_En : '',
          FrontPhone:
            _self.filters.labelVal === '4' ? _self.filters.FrontPhone : '',
          City: _self.filters.city,
          Country: _self.filters.country,
          IsDelete: false
        }
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
        console.log(res)
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
        name: '酒店信息编辑',
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
