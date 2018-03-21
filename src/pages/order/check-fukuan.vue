<template lang="html">
  <!-- 付款对账 -->
<div id="PaymentCheck">
  <CustomSearchCopy :configList="searchFields" @searchCallback="searchCallback">
      <!--  <el-form-item label="销售平台" slot="PlatPolicyID">
          <el-select v-model="filters.PlatPolicyID">
              <el-option v-for="(item,index) in PlatPolicyID " :key="index" :label="item.Account" :value="item.ID"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="付款日期" slot="PaymentDate">
          <el-date-picker
              v-model="filters.PaymentDate"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日">
          </el-date-picker>
      </el-form-item>-->
      <el-form-item label="打款账户" slot="CompanyAcount">
          <el-select v-model="filters.CompanyAcount" clearable>
              <el-option v-for="(item,index) in PayCompanyID " :key="item.ID" :label="item.ShortName" :value="item.ShortName"></el-option>
          </el-select>
      </el-form-item>
       <el-form-item label="打款日期" slot="PaymentDate">
          <el-date-picker v-model="filters.PaymentDate" type="daterange" clearable>
          </el-date-picker>
      </el-form-item>
      <el-button type="primary" @click="downloadList()" slot="button-add">下载<i class="el-icon-document el-icon--right" ></i></el-button>
  </CustomSearchCopy>

<!--
预计显示字段:
酒店名称(查询)
订单号(查询)
入住人(查询)
付款状态(查询)

财务编号
打款账户
对方账户
对方账号
合计金额

 -->

    <el-table :data="paymentCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading"
    @expand="expand" row-key="ID" :expand-row-keys="expandRowKeys" @selection-change="handleSelectionChange" ref="table">
        
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="订单号" prop="PlatOrderNo" width=170></el-table-column>        
        <el-table-column label="财务编号" prop="PaymentNo" width=170></el-table-column>
        <el-table-column label="入住人" prop="Passenger" width=150></el-table-column>
        <el-table-column label="预定日期"  width=150>
            <template scope="scope">
                <span  v-if="scope.row.BookTime != null">{{scope.row.BookTime.substring(0,10)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="收款账户" prop="Partner" width=125 show-overflow-tooltip></el-table-column>
        <el-table-column label="打款账户" prop="CompanyAcount" show-overflow-tooltip></el-table-column>
        <el-table-column label="打款日期" prop="PaymentDate" width=150>
            <template scope="scope">
                <span  v-if="scope.row.PaymentDate != null">{{scope.row.PaymentDate.substring(0,10)}}</span>
            </template></el-table-column>
        <el-table-column label="金额" prop="AmountUse"></el-table-column>
        <el-table-column label="截图" prop="PaymentPicture" width=70>
            <template scope="scope">
                <el-button type="text" @click="imgShow(scope.row.PaymentPicture)">查看</el-button>
            </template>
        </el-table-column>
        <!--<el-table-column label="预计结算/到款日期" width=110>
            <template scope="scope">
                <span style="color:red" v-if="scope.row.PaymentDate != null">{{scope.row.PaymentDate.substring(0,10)}}</span>
                <hr style="border:none;border-top:1px dotted lightgray;margin:0;" />
                <span style="color:blue" v-if="scope.row.ExpectGetMoney != null">{{scope.row.ExpectGetMoney.substring(0,10)}}</span>
            </template>
        </el-table-column>-->
        <!--<el-table-column label="备注" prop="Remark" show-overflow-tooltip></el-table-column>-->
        <!-- <el-table-column label="操作" width=120>
            <template scope="scope">
                <el-button type="text" size="small" @click="check(scope.row)">对账付款审核</el-button>
            </template>
        </el-table-column> -->
    </el-table>





    <el-card class="box-card">
        <el-row :gutter="24">
            <el-col :span="5">
                <el-button @click="countMoney" size="small">合计</el-button> <span style="margin-left:20px;">{{money}}</span>
            </el-col>
            <el-col :span="5">
                <el-button size="small" @click="check()">对账付款审核</el-button>
            </el-col>
        </el-row>
    </el-card>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30,50,100,200]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" size="small">
        <ImageList :images="imageList"></ImageList>
    </el-dialog>
</div>
</template>
<script>
import { hotelPaymentInfoApi, hotelsOrderApi, policyApi } from 'api'
import ImageList from 'components/imglist'

const searchData = [
    //订单
    ['酒店名称', 'HotelName', 'input', ''],
    ['订单号', 'PlatOrderNo', 'input', ''],
    ['客人姓名', 'Passenger', 'input', ''],
    ['入住日期', 'StayDateStart', 'date', ''],

    //财务
    ['财务编号', 'PaymentNo', 'input', ''],

    ['打款账户', 'CompanyAcount', 'select', ''],
    ['收款账户', 'Partner', 'input', ''],


    ['收款账号', 'PartnerAccount', 'input', ''],
    ['收款开户行', 'PartnerAccountModel', 'input', ''],

    ['金额', 'AmountUse', 'input', ''],
    ['打款日期', 'PaymentDate', 'daterange', ''],
    ['货币', 'Currency', 'select', ''],

    ['打款状态', 'State', 'select', '']

]
const searchFields = transSearch(searchData)

function transSearch (listData) {
  return listData.map(item => {
    return {
      label: item[0],
      name: item[1],
      type: item[2],
      data: item[3]
    }
  })
}

export default {
  components: {
      ImageList
  },
  data(){
      return{
          currentPage: 1,
          pageSize: 10,
          count: 0,
          loading: false,
          paymentCheck:[],
          ID: '',
          expandRowKeys: [],
          orderDetail:[],
          message:'',
          dialogVisible:false,
          imageList: [],
          multipleSelection:[],
          PaymentForm:{
          },
          searchFields:[],
          money:0,
          filters: {
            StateCheck: "",
            PlatPolicyID: "",
            PaymentDate: '',
            CompanyAcount:''
          },
          PlatPolicyID: [],
          PayCompanyID:[]
      }
  },
  created() {
    this.configList = hotelsOrderApi.getConfig()

    this.searchFields = searchFields

  //  this.searchFields =  [
  //    ['客人姓名', 'Passenger', 'input', ''],

    //  ['财务编号', 'PaymentNo', 'input', ''],

    //  ['打款账户', 'CompanyAcount', 'select', ''],
    //  ['收款账户', 'Partner', 'input', ''],
    //  ['收款账号', 'PartnerAccount', 'input', ''],
  //    ['收款开户行', 'PartnerAccountModel', 'input', ''],

    //  ['金额', 'Amount', 'input', ''],
    //  ['打款日期', 'PaymentDate', 'daterange', ''],
    //  ['货币', 'Currency', 'select', ''],

    //  ['打款状态', 'State', 'select', '']
  //  ]
  },
  mounted() {
    this.fetchData()
    this.getPayCompany()
    this.platformAccount()
  },
  methods:{
      async downloadList() {
        const _self = this 
        let time1 = "";
        let time2 = "";
        if (typeof _self.filters.PaymentDate != "undefined") {
            if (_self.filters.PaymentDate[0] != null) {
            time1 = new Date(_self.filters.PaymentDate[0]).Format("yyyy-MM-dd");
            time2 = new Date(_self.filters.PaymentDate[1]).Format("yyyy-MM-dd");
            }
        }   
        const Headerinfo = "PlatOrderNo,PaymentNo,Passenger,BookTime,HotelName,Partner,CompanyAcount,PaymentDate,AmountUse"
        const options = {   
            columns:Headerinfo,
             order: 'ID',
            query:{
                CompanyAcount:_self.filters.CompanyAcount,
                HotelName: _self.trim(_self.filters.HotelName),
                PlatOrderNo: _self.filters.PlatOrderNo,
                Passenger:_self.trim(_self.filters.Passenger),                
                AmountUse:_self.filters.AmountUse,
                Partner:_self.filters.Partner,
                PartnerAccount:_self.filters.PartnerAccount,
                PartnerAccountModel:_self.filters.PartnerAccountModel,
                PaymentNo:_self.filters.PaymentNo,
                StayDateStart: _self.filters.StayDateStart
                 ? new Date(_self.filters.StayDateStart).Format("yyyy-MM-dd")
                 : "",
                "PaymentDate>": time1,
                "PaymentDate<": time2,
                PaymentState:0,
                PaymentType:1,
                "StateScreenshot>":0
                             
            } 
        }
        try {
            const res = await hotelsOrderApi.downloadList(options);
            if (res.request.responseURL) {
            window.location.href = res.request.responseURL;
            }
        } catch (e) {
            _self.$message.error("数据下载失败!!!");
        }
    },
    async getPayCompany(){
       const res = await policyApi.getPayCompany()
       this.PayCompanyID = res.data.Data
    },
    async platformAccount() {
      const options = {
        pageSize: 1000,
        order: "ID"
      };
      const res = await policyApi.getPolicyPlatform(options);
      this.PlatPolicyID = res.data.Data;
      this.PlatPolicyID.splice(0, 0, {
        Account: "全部",
        ID: ""
      });
    },
    hotelsOrderSearch(){
        this.fetchData()
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
    let now =  Object.assign(this.filters, filters );   
    Object.assign(filters, filters, this.filters);          
       
      this.filters = filters;
    this.filters.PaymentDate = now.PaymentDate          

      this.fetchData();
    },
    trim(s){
            if(s){
                return s.replace(/(^\s*)|(\s*$)/g, '');
            }
        },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      let time1 = "";
      let time2 = "";
      if (typeof _self.filters.PaymentDate != "undefined") {
        if (_self.filters.PaymentDate[0] != null) {
          time1 = new Date(_self.filters.PaymentDate[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.PaymentDate[1]).Format("yyyy-MM-dd");
        }
      }     
      console.log(time1) 
      
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            order: 'ID',
            query:{
                CompanyAcount:_self.filters.CompanyAcount,
                HotelName: _self.trim(_self.filters.HotelName),
                PlatOrderNo: _self.filters.PlatOrderNo,
                Passenger:_self.trim(_self.filters.Passenger),
                AmountUse:_self.filters.AmountUse,
                Partner:_self.filters.Partner,
                PartnerAccount:_self.filters.PartnerAccount,
                PartnerAccountModel:_self.filters.PartnerAccountModel,
                PaymentNo:_self.filters.PaymentNo,
                StayDateStart: _self.filters.StayDateStart
                 ? new Date(_self.filters.StayDateStart).Format("yyyy-MM-dd")
                 : "",
                "PaymentDate>": time1,
                "PaymentDate<": time2,
                PaymentState:0,
                PaymentType:1,
                "StateScreenshot>":0
                             
            }
      } 
      try {
        //_self.multipleSelection = _self.$route.query.multipleSelection
        const res = await hotelPaymentInfoApi.checkOut(options)
        _self.paymentCheck = res.data.Data
        console.log(_self.paymentCheck)
        _self.count = res.data.Count
        // _self.paymentCheck.forEach(item => {
        //     _self.$refs.table.toggleRowSelection(item,true);
        // });
        _self.countMoney()
        _self.loading = false
      } catch (e) {
          console.log(e)
        _self.loading = false
      }
    },
    async check(){
        const _self = this
        try{
            let ids = []          
            for(let i in _self.multipleSelection){
                ids.push(_self.multipleSelection[i].PaymentID)
            }
            console.log(_self.multipleSelection)         
            ids=Array.from(new Set(ids))
            if(ids.length == 0){
                _self.$message({
                    message: '请选择要审核订单',
                    type: 'warning'
                })
            }
            if(ids.length != 0){
                const res = await hotelPaymentInfoApi.checks(ids)          
                if(res.data.State){
                    _self.$message({
                    message: '审核成功',
                        type: 'success'
                    })
                    _self.multipleSelection = []
                    _self.fetchData()
                }else{                   
                    _self.$message.error('审核失败!!!')
                }
            }
        }catch(e){
            _self.$message.error('审核失败!!!')
        }
    },
    async expand(row, expanded){
        const _self = this
        if (expanded) {
            const res = await hotelPaymentInfoApi.getDetails(row.ID)
            _self.orderDetail = res.data.Data  
            console.log(row.ID)               
            _self.expandRowKeys.length = 0
            _self.expandRowKeys.push(row.ID)
            _self.ID = row.ID
        }
    },
    imgShow(img){
        console.log(img)
        try{
            this.imageList = img.split(',')
            this.dialogVisible = true
        }catch(e){
            debugger;
            this.$message.error('截图获取失败!!!')
        }
    },
    countMoney(){
        let m = 0
        for(let i in this.multipleSelection){
            m += parseInt(this.multipleSelection[i].AmountUse)
        }
        this.money = m
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
        this.countMoney()
    },
  }
}
</script>
<style lang="scss">
#PaymentCheck{
.el-card {
    box-shadow: none;
}
}
</style>
