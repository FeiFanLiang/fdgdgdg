<template>
<div id="TripOrder">
    <CustomSearchCopy :configList="configList.searchFields" @searchCallback="searchCallback">
      <el-form-item label="付款状态" prop="StateFu" slot="StateFu">
        <el-select v-model="filters.StateFu" clearable>
          <el-option v-for="item in [{label:'未付',value:0},{label:'已付',value:1},{label:'付款对账',value:2}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="收款状态" prop="StateShou" slot="StateShou">
        <el-select v-model="filters.StateShou" clearable>
          <el-option v-for="item in [{label:'未收',value:0},{label:'已收',value:1},{label:'收款对账',value:2}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否忽略" prop="StateIgnore" slot="StateIgnore">
        <el-select v-model="filters.StateIgnore" clearable>
          <el-option v-for="item in [{label:'正常',value:0},{label:'刷单',value:1}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-button style="margin:10px 0;" @click="clickAddBtn" slot="button-add">添加</el-button>
      <el-button type="" @click="downloadList()" slot="button-add">下载<i class="el-icon-document el-icon--right" ></i></el-button>
    </CustomSearchCopy>
    <el-table :data="tripOrder" :loading="loading" border style="width:100%">
      <el-table-column label="订单名称" prop="Title" width="200"></el-table-column>
      <el-table-column label="订单号" prop="PlatOrderNo" width="180"></el-table-column>
      <el-table-column label="收款状态" prop="StateShou">
           <template scope="scope">
            <span  v-if="scope.row.StateShou == 0">未收</span>
            <span  v-if="scope.row.StateShou == 1">已收</span>
            <span  v-if="scope.row.StateShou == 2">收款对账</span>
          </template>
     </el-table-column>
      <el-table-column label="付款状态" prop="StateFu" >
           <template scope="scope">
            <span  v-if="scope.row.StateFu == 0">未付</span>
            <span  v-if="scope.row.StateFu == 1">已付</span>
            <span  v-if="scope.row.StateFu == 2">付款对账</span>
          </template>
     </el-table-column>
      <el-table-column label="订单来源" width="110">
        <template scope="scope">
          <p v-for="item in SourcePlatID">
            <span v-if="scope.row.SourcePlatID == item.ID">{{item.Account}}</span>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="预定时间" prop="Booktime" width="110">
        <template scope="scope">
          <span v-if="typeof(scope.row.Booktime) != 'undefined'">{{scope.row.Booktime.substring(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客人姓名" prop="Passenger" width="110"></el-table-column>
      <el-table-column label="联系电话" prop="Tel" width="130"></el-table-column>
      <el-table-column label="订单状态" prop="OrderState" >
           <template scope="scope">
            <span  v-if="scope.row.OrderState == 0">正常</span>
            <span  v-if="scope.row.OrderState == 1">退票</span>
          </template>
     </el-table-column>
      <el-table-column width="150" label="操作">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
          <DeleteButton api="tripOrderApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin:10px;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')" size="full">
      <el-form ref="form" :model="form" label-width="110px" style="padding:20px;">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="订单名称" prop="Title">
                <el-input placeholder="请输入订单名称" v-model="form.Title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单号" prop="PlatOrderNo">
                <el-input placeholder="请输入订单号" v-model="form.PlatOrderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购单号" prop="PurchaseNo">
                <el-input placeholder="请输入采购单号" v-model="form.PurchaseNo"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
        <el-col :span="8">
            <el-form-item label="总收款金额" prop="AmountShou">
                <el-input placeholder="请输入总收款金额" v-model="form.AmountShou"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="总付款金额" prop="AmountFu">
                <el-input placeholder="请输入总付款金额" v-model="form.AmountFu"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="利润" prop="Profit">
                <el-input placeholder="请输入利润" v-model="form.Profit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="订单来源" prop="SourcePlatID">
              <el-select v-model="form.SourcePlatID" clearable style="width:100%;">
                <el-option v-for="(item,index) in SourcePlatID " :key="index" :label="item.Account" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="采购平台" prop="PurchasePlatID">
              <el-select v-model="form.PurchasePlatID" clearable style="width:100%;">
                <el-option v-for="item in [{label:'远洋',value:1},{label:'悠游',value:2},{label:'飞猪',value:3},{label:'美团',value:4}]" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预定时间" prop="Booktime">
              <el-date-picker v-model="form.Booktime" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="使用时间" prop="UseDate">
              <el-date-picker v-model="form.UseDate" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联的订单ID" prop="HotelOrderID">
                <el-input placeholder="请输入关联的订单ID" v-model="form.HotelOrderID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单类型" prop="TypeID">
              <el-select v-model="form.TypeID" clearable style="width:100%;">
                <el-option v-for="item in [{label:'门票',value:1},{label:'餐费',value:2},{label:'车票',value:3}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="订单状态" prop="OrderState">
              <el-select v-model="form.OrderState" clearable style="width:100%;">
                <el-option v-for="item in [{label:'正常',value:1},{label:'退票',value:2}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="付款状态" prop="StateFu">
              <el-select v-model="form.StateFu" clearable style="width:100%;">
                <el-option v-for="item in [{label:'未付',value:0},{label:'已付',value:1},{label:'付款对账',value:2}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收款状态" prop="StateShou">
              <el-select v-model="form.StateShou" clearable style="width:100%;">
                <el-option v-for="item in [{label:'未收',value:0},{label:'已收',value:1},{label:'收款对账',value:2}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="收款到账时间" prop="ShouDate">
              <el-date-picker v-model="form.ShouDate" type="date" placeholder="选择日期" style="width:100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否忽略" prop="StateIgnore">
              <el-select v-model="form.StateIgnore" clearable style="width:100%;">
                <el-option v-for="item in [{label:'正常',value:0},{label:'刷单',value:1}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客人姓名" prop="Passenger">
              <el-input placeholder="请输入客人姓名" v-model="form.Passenger"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item label="联系电话" prop="Tel">
              <el-input placeholder="请输入联系电话" v-model="form.Tel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" v-model="form.Remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;">
        <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { tripOrderApi,policyApi } from 'api'
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        count: 0,
        tripOrder: [],
        filters:{
          StateShou:'',
          Booktime:'',
          StateIgnore:''
        },
        form:{
          Booktime:'',
          UseDate:'',
          ShouDate:''
        },
        copyForm:{},
        showDialog:false,
        title:'',
        isEditable:true,
        SourcePlatID:[]
      }
    },
    created() {
      this.platformAccount()
      this.fetchData()
      this.configList = tripOrderApi.getConfig()
    },
    methods:{
      async platformAccount(){
        const options = {
            pageSize: 1000,
            order: 'Sort'
        }
        const res = await policyApi.getPolicyPlatform(options)
        this.SourcePlatID = res.data.Data
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
      },
      searchCallback(filters) {
          let now = Object.assign(this.filters, filters );
          Object.assign(filters, filters, this.filters)
          this.filters = filters
          this.filters.Booktime = now.Booktime
          this.fetchData()
      },
      async downloadList(){
           const _self = this
          const options = {
            order: 'ID',
            query: { 
              Title:_self.filters.Title,
              PlatOrderNo:_self.filters.PlatOrderNo,
              Passenger:_self.filters.Passenger,
              StateFu:_self.filters.StateFu,
              StateShou:_self.filters.StateShou,
              'Booktime>':_self.filters.Booktime[0] ? new Date(_self.filters.Booktime[0]).Format('yyyy-MM-dd') : '',
              'Booktime<':_self.filters.Booktime[1] ? new Date(_self.filters.Booktime[1]).Format('yyyy-MM-dd') : '',
              StateIgnore:_self.filters.StateIgnore,
            }
          }
         try {  
          const res = await tripOrderApi.downloadList(options);
            if (res.request.responseURL) {
          window.location.href = res.request.responseURL;
        }
              
      } catch (e) {
        _self.$message.error("数据下载失败!!!");
      }
       
      },
      async fetchData(currentPage, pageSize) {
        const _self = this
        _self.loading = true
        _self.currentPage = currentPage || _self.currentPage
        _self.pageSize = pageSize || _self.pageSize
        try {
          const options = {
            pageIndex: _self.currentPage,
            pageSize: _self.pageSize,
            order: 'ID',
            query: { 
              Title:_self.filters.Title,
              PlatOrderNo:_self.filters.PlatOrderNo,
              Passenger:_self.filters.Passenger,
              StateFu:_self.filters.StateFu,
              StateShou:_self.filters.StateShou,
              'Booktime>':_self.filters.Booktime[0] ? new Date(_self.filters.Booktime[0]).Format('yyyy-MM-dd') : '',
              'Booktime<':_self.filters.Booktime[1] ? new Date(_self.filters.Booktime[1]).Format('yyyy-MM-dd') : '',
              StateIgnore:_self.filters.StateIgnore,
            }
          }
          const res = await tripOrderApi.list(options)
          console.log(res)
          _self.tripOrder = res.data.Data
          _self.count = res.data.Count
          _self.loading = false
        } catch (e) {
          console.error(e)
          _self.loading = false
        }
      },
      async clickAddBtn() {
        const _self = this
        _self.title = '添加票单信息'
        _self.showDialog = true
        _self.form = {
          TypeID:1,
          OrderState:1,
          StateFu:1,
          StateShou:1,
          StateIgnore:0
        }
      },
      async clickEditBtn($index, row) {
        const _self = this
        _self.title = '编辑票单信息'
        try {
          const res = await tripOrderApi.listById(row.ID)
          _self.form = res.data.Data
          _self.showDialog = true
        } catch (e) {
          console.error(e)
        }
      },
      submitForm() {
        const _self = this
        if (_self.form.ID) {
          _self.editSave()
        } else {
          _self.addSave()
        }
      },
      async addSave() {
        const _self = this
        try {
          _self.isEditable = false
          console.log(_self.form)
        const res = await tripOrderApi.add(_self.form)
        const ertext = res.data.Msg
          if(res.data.State !=true){
                _self.$message.error(ertext)          
            }else{
                _self.fetchData()
                _self.showDialog = false
                _self.$message({
                  message: '添加成功',
                  type: 'success'
                })
            }    
          
        } catch (e) {
          console.error(e)
          _self.$message.error('添加失败!!!')
        } finally {
          _self.isEditable = true
        }
      },
      async editSave() {
        const _self = this
        try {
          _self.isEditable = false
          const form = {}
          for (let [k, v] of Object.entries(_self.form)) {
            if (_self.form[k] != _self.copyForm[k]) {
              form[k] = v
            }
          }
          console.log(form)
        const res = await tripOrderApi.edit(_self.form.ID, form)
          const ertext = res.data.Msg
          if(res.data.State !=true){
                _self.$message.error(ertext)          
            }else{
                _self.showDialog = false
                _self.fetchData()
                _self.$message({
                  message: '编辑成功',
                  type: 'success'
                })
            }  

          
        } catch (e) {
          console.error(e)
          _self.$message.error('编辑失败!!!')
        } finally {
          _self.isEditable = true
        }
      }
    }
  }
</script>