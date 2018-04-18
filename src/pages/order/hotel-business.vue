<template lang="html">
<div id="PaymentCheck">
  <el-form label-width="80px">
      <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="酒店名称">
              <el-input v-model="filters.Hotel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客人姓名">
              <el-input  v-model="filters.Name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客人电话">
              <el-input  v-model="filters.Phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预定日期">
              <el-date-picker  v-model="filters.BookTime" type="daterange"></el-date-picker>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
        
      </el-row>
      <el-row :gutter="24">
        <el-col>
          <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="paymentCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading"
     row-key="ID" :expand-row-keys="expandRowKeys">
      
        <el-table-column label="标题" prop="Title"></el-table-column>
        <el-table-column label="酒店名称" prop="Hotel" >
        <template scope="scope">
              <span @click="look(scope.$index,scope.row)">{{scope.row.Hotel}}</span>
          </template>
        </el-table-column>         
        <el-table-column label="入住人" prop="Name" ></el-table-column>
        <el-table-column label="预定日期" prop="BookTime">
          <template scope="scope">
              <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
          </template>
      </el-table-column>                                                                                                                                                                                                                                                                                                                                         
        <el-table-column label="审核状态" width=100 fixed="right">
            <template scope="scope">
                <span v-if="scope.row.AuditStatus == 1">已审核</span>
                <span v-if="scope.row.AuditStatus == 0" @click="confirm(scope.$index,scope.row)">确认审核</span>           
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" size="small" >
        <el-form ref="form" :model="form"  label-width="80px">
            <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="标题" prop="Title">
                    <el-input v-model="form.Title" ></el-input>
                </el-form-item>
            </el-col>
            </el-row>
            <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="酒店名称" prop="Hotel">
                    <el-input v-model="form.Hotel" ></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="入住人" prop="Name">
                    <el-input v-model="form.Name" ></el-input>
                </el-form-item>
            </el-col>
            </el-row>
        </el-form> 
    </el-dialog>
    <el-dialog v-model="dialogVisible1" size="small" :title="dialogTitle" >
        <el-form ref="form" :model="form"  label-width="80px"> 
         <el-row :gutter="20">
            <el-col :span="12">
                <el-form-item label="价格" prop="Price">
                    <el-input v-model="form.Price" ></el-input>
                </el-form-item>
            </el-col>
         </el-row>
        </el-form> 
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
      </span>
        
    </el-dialog>
    
    
</div>
</template>
<script>
import {weimpApi} from 'api'

export default {
  data(){
      return{
          currentPage: 1,
          pageSize: 10,
          count: 0,
          loading: false,
          isEditable: true,
          dialogTitle:"",
          paymentCheck:[],
          ThreePlatID: [],
          ID: '',
          expandRowKeys: [],
          orderDetail:[],
          searchFields:[],
          imageList: [],
          PlatPolicyID:[],
          filters: {
            Hotel: "",
            Phone: "",
            Name: '',
            BookTime:''
          },
          form:{
              Price:"",
              Title:"",
              Hotel:"",
              Name:"",
              Phone:"",
              Adults:"",
              StartoffDate:"",
              BackoffDate:"",
              Totalprice:"",
              TimeOrderNum :"",
              AuditStatus:"",
              Auditor:"",
              AuditTime:"", 
              ID:""
          },
          dialogVisible:false,
          dialogVisible1:false
      }
  },
  created() {
    this.fetchData()
    
  },
  methods:{
      hotelsOrderSearch(filters) {
      const _self = this
      this.filters = filters
      _self.fetchData()
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      let time1 = "";
      let time2 = "";
      if (typeof _self.filters.BookTime != "undefined") {
        if (_self.filters.BookTime[0] != null) {
          time1 = new Date(_self.filters.BookTime[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.BookTime[1]).Format("yyyy-MM-dd");
        }
      }
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            order: 'ID',
            query:{
               Hotel: _self.filters.Hotel,
               Name: _self.filters.Name,
               Phone: _self.filters.Phone,
               "BookTime>": time1,
               "BookTime<": time2
            }
            
      }
      try {
        const res = await weimpApi.weihotellist(options)
        _self.paymentCheck = res.data.Data
        console.log( res.data.Data)
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    look($index, row){
    const _self = this
    _self.dialogTitle = '查看业务信息'
    _self.dialogVisible = true  
    _self.form.Price = row.Price
    _self.form.Title = row.Title
    
    
    
    },
    confirm($index, row){
    const _self = this
    _self.dialogTitle = '审核业务信息'
    _self.dialogVisible1 = true  
    _self.form.Price = row.Price
    _self.form.ID = row.ID
    },
   async submitForm(){
    const _self = this
       
        try{
        
        const res=  await weimpApi.revise(_self.form.ID, _self.form.Price)
        const ertext = res.data.Msg
          if(res.data.State !=true){
                this.$message.error(ertext)          
            }else{
                this.$message({
                    message: '设置成功',
                    type: 'success'
                })
                this.fetchData();
            } 
    
           
        }catch(e){
            this.$message.error('设置失败!!!')
        }
    },
    imgShow(img){
        this.imageList = img.split(',')
        this.dialogVisible = true
    }
  }
}
</script>
