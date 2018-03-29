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
      <el-input placeholder="请输入酒店组名称" v-model="filters.GroupName" v-show="filters.labelVal == '1'"></el-input>
      <el-input placeholder="请输入酒店组ID" v-model="filters.ID" v-show="filters.labelVal == '2'"></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="hotelbaseSearch(filters)">搜索</el-button>
      <el-button type="primary" @click="dialogTableVisible=true">
        添加酒店组
      </el-button>
    </el-col>
  </el-row>
  <div class="eltable">
       <el-table
      :data="hotelbase"
      border
      :default-sort = "{prop: 'ID', order: 'descending'}"
      style="width: 100%">
        <el-table-column prop="GroupName" label="酒店组名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ID" label="酒店组ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Remark" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column   label="操作" width="180" fixed="right">
<template scope="scope">
<el-button size="small" @click="hotelbaseEdit(scope.$index, scope.row)">编辑</el-button>
<el-button size="small" @click="hotelbaseEdit(scope.$index, scope.row)">删除</el-button>
</template>
        </el-table-column>
      </el-table> 
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
      <el-dialog title="添加酒店组" v-model="dialogTableVisible">
           <el-form  ref="form" :model="form"  label-width="100px">
      <el-row> 
      <el-col :span="12">
       <el-form-item label="酒店组名称" prop="GroupName" >
            <el-input v-model="form.GroupName" ></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row> 
      <el-col :span="12">
       <el-form-item label="酒店组描述" prop="Remark" >
            <el-input v-model="form.Remark" ></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">保存</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script>
import { hotelGroupApi } from 'api'
import HotelBaseAdd from './hotel-base-add.vue'
export default {
  components: {
    HotelBaseAdd
  },
  created() {
    this.getHotelbaseList()
   
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
        GroupName: '',
      },
      form:{
        Remark: '',
        GroupName: '',
      },
      selectedOptions: [
        {
          value: '1',
          label: '酒店组名'
        },
        {
          value: '2',
          label: '组id'
        }
      ],
      countryOptions: []
    }
  },

  methods: {
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
          GroupName: row.GroupName
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
          ID: _self.filters.labelVal === '2' ? _self.filters.ID : '',
          GroupName:
            _self.filters.labelVal === '1' ? _self.filters.GroupName : '',
          IsDelete: false
        }
      }
      const res = await hotelGroupApi.listAll(options)
        let data = res.data.Data
      
        _self.hotelbase = data
        _self.count = res.data.Count
        this.loading = false
      
    },
    async submitForm(){
      
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
          GroupName: row.GroupName
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
