<template lang="html">
<div id="Wxyh">
    <el-form label-width="70px">

    <el-row :gutter="20">
        <el-col :span="6">
            <el-form-item label="开始时间">
                <el-date-picker  v-model="filters.StartDate" type="date"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="结束时间">
                <el-date-picker  v-model="filters.EndDate" type="date"></el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="carlineStationSearch(filters)">搜索</el-button>  
            <el-button @click="exportExcel()">下载<i class="el-icon-document el-icon--right" ></i></el-button>                    
        </el-col>
    </el-row>
    </el-form>
    <el-table :data="dwzList" border style="width: 100%" v-loading="loading" id="out-table">
        <el-table-column prop="OrderSource" label="渠道来源"></el-table-column>
        <el-table-column prop="Num" label="订单数"></el-table-column> 
        <el-table-column prop="RoomNight" label="间夜"></el-table-column> 
        <el-table-column prop="YingShou" label="应收"></el-table-column> 
        <el-table-column prop="Fee" label="手续费"></el-table-column> 
        <el-table-column prop="YingFu" label="应付"></el-table-column> 
        <el-table-column prop="DuiChong" label="对冲"></el-table-column> 
        <el-table-column prop="Commission" label="返佣"></el-table-column> 
        <el-table-column prop="Profit" label="利润"></el-table-column> 
         
     <!--   <el-table-column label="开始时间" width=110>
            <template scope="scope">
                <span v-if="scope.row.StartDate != null">{{scope.row.StartDate.substring(0,10)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="结束时间" width=110>
            <template scope="scope">
                <span v-if="scope.row.EndDate != null">{{scope.row.EndDate.substring(0,10)}}</span>
            </template>
        </el-table-column>  -->
        
        
    </el-table>
  <!--  <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div> -->
</div>
</template> 
<script>
import { hotrlreportApi } from 'api'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  data() {
    return {
      currentPage: 1,
      dwzList:[],
      pageSize: 10,
      count: 0,
      loading: false,
      nowexcel:"",
      isEditable: true,
      showDialog: false,
      dialogTitle: '',
      form: {
       
      },
      copyForm: {},
      filters: {
        StartDate: '',
        EndDate:''
      }
    }
  },
  created() {
    const myDate = new Date()
    const now = myDate.Format('yyyy-MM-dd')
    let mon = myDate.getMonth() + 1
    const year = myDate.getFullYear()
    if (mon < 10) {
          mon = '0' + mon
        }
    const satr = year + '-' + mon + '-' + '01' 
    this.filters.EndDate = new Date(now)
    this.filters.StartDate = new Date(satr)    
   // this.fetchData()
  },
  methods: {
    carlineStationSearch() {
      this.fetchData()
    },
    exportExcel () {   
         const _self = this      
         const wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
         const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' }) 
         try {
             FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), _self.nowexcel)
         } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
         return wbout
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
    },
    async downloadList(currentPage,pageSize) {
       
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      
      const options = {     
               StartDate:_self.filters.StartDate ? new Date(_self.filters.StartDate).Format('yyyy-MM-dd') : '',
               EndDate:_self.filters.EndDate ? new Date(_self.filters.EndDate ).Format('yyyy-MM-dd') : ''     
      }
      try {
        const res = await hotrlreportApi.getDetail(options)
        const now = '销售列表' + '('+options.StartDate+'-'+options.EndDate+')'+'.xlsx'
        _self.nowexcel = now
         console.log(now)
         console.log(res)
        _self.dwzList = res.data.Data
        _self.count = res.data.Count        
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    }
  }
}
</script>
<style lang="scss">
#Wxyh{
  .el-dialog--small{
    width:50%
  }
}
</style>
