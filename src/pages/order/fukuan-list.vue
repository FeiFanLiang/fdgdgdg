<template lang="html">
  <!-- / 财务 / 待付款列表 -->
<div id="FukuanList">
    <CustomSearchCopy :configList="searchFields" @searchCallback="searchCallback">
      <el-form-item label="外采平台" slot="WaiCaiPlatID">
          <el-select v-model="filters.WaiCaiPlatID">
              <el-option v-for="(item,index) in PlatPolicyID " :key="index" :label="item.Account" :value="item.ID"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="打款账户" slot="CompanyAcount">
          <el-select v-model="filters.CompanyAcount" clearable>
              <el-option v-for="(item,index) in PayCompanyID " :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="付款周期" slot="SettlementCycleFu" >
          <el-select v-model="filters.SettlementCycleFu" clearable placeholder="请选择付款周期">
              <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
          </el-select>
      </el-form-item>
        <el-button style="margin:10px 0;" @click="payment" slot="button-add">付款</el-button>
    </CustomSearchCopy>
  <el-table ref="multipleTable" :data="fukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" @selection-change="handleSelectionChange"
  :default-sort = "{prop: 'UrgentPay', order: 'descending'}">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="订单号" prop="HotelOrder.PlatOrderNo" show-overflow-tooltip>
        <template scope="scope">
            <span v-if="scope.row.UrgentPay == 1" style="color:red;">{{ scope.row.HotelOrder.PlatOrderNo }}</span>
            <span v-else>{{ scope.row.HotelOrder.PlatOrderNo }}</span>
        </template>
    </el-table-column>
    <el-table-column label="酒店名称" prop="HotelOrder.HotelName" show-overflow-tooltip >
        <template slot-scope="scope" >
        <p @dblclick="paymento(scope.$index, scope.row)" class="hotelname" onselectstart="return false;" >{{scope.row.HotelOrder.HotelName}}</p>
        </template>     
    </el-table-column>
    <el-table-column label="入住/退房日期" width="200">
        <template scope="scope">
            <span v-if="typeof(scope.row.HotelOrder.StayDateStart) != 'undefined'">{{ scope.row.HotelOrder.StayDateStart.split(' ')[0] }}</span>/
            <span v-if="typeof(scope.row.HotelOrder.StayDateEnd) != 'undefined'">{{ scope.row.HotelOrder.StayDateEnd.split(' ')[0] }}</span>
        </template>
    </el-table-column>
    <el-table-column label="间/晚" prop="RoomNum" width="80">
        <template scope="scope">
            <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
            <span>{{ scope.row.HotelOrder.NightNum }}</span>
        </template>
    </el-table-column>
    <el-table-column label="入住人" prop="HotelOrder.Passenger" width="100"></el-table-column>
      <el-table-column label="金额" prop="AmountUse" width="100"></el-table-column>
        <el-table-column label="对冲金额" prop="DuiChong" width="100"></el-table-column>
        <el-table-column label="支付账户" prop="CompanyAcount" width="100"></el-table-column>        
    <el-table-column label="预定时间" prop="HotelOrder.BookTime" width="150" sortable>
        <template scope="scope">
            <span v-if="typeof(scope.row.HotelOrder.BookTime) != 'undefined'">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="不可合并支付" prop="HotelOrder.UnMergePay">
        <template scope="scope">
            <span v-if="scope.row.UnMergePay == 1">不可合并</span>
            <span v-if="scope.row.UnMergePay == 0">可合并</span>
        </template>
    </el-table-column>

  </el-table>
  <div class="pagination-wrapper" style="text-align:center;margin:10px;">
    <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
  </div>

</div>
</template>
<script>
import { hotelPaymentInfoApi,hotelsOrderApi ,policyApi } from 'api'

const searchData = [
  ['酒店名称', 'HotelName', 'input', ''],
  ['订单号', 'PlatOrderNo', 'input', ''],
  ['客人姓名', 'Passenger', 'input', ''],

  ['入住日期', 'StayDateStart', 'date', ''],
  ['退房日期', 'StayDateEnd', 'date', ''],
  ['预定日期', 'BookTime', 'daterange', ''],


  ['外采平台', 'WaiCaiPlatID', 'select', ''],

  ['打款账户', 'CompanyAcount', 'select', ''],
  ['付款周期', 'SettlementCycleFu', 'select', ''],
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
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            count: 0,
            fukuanList: [],
            loading:false,
            multipleSelection: [],
            multipleSelectioni: '',            
            filters:{
                HotelName:'',
                PlatOrderNo:'',
                Passenger:'',
                StayDateStart:'',
                BookTime:'',
                StayDateEnd:'',
                ExpectSettlement:'',
                WaiCaiPlatID: '',
                CompanyAcount:'',
                SettlementCycleFu:'',

            },
            PlatPolicyID: [],
            CompanyAcount:[],
            PayCompanyID:[],
            ThreePlatID: [
              {
                PlatName: "全部",
                value: ""
              }
            ],
            payPeriodList: [{
                    value: 0,
                    text: '其他（每单备注）'
                }, {
                    value: 1,
                    text: '预付款'
                },
                {
                    value: 2,
                    text: '单结'
                },
                {
                    value: 3,
                    text: '日结'
                },

                {
                    value: 4,
                    text: '月结'
                },
                {
                    value: 5,
                    text: '半月结'
                },
                {
                    value: 6,
                    text: '周结'
                }

            ],
        }
    },
    created(){
        this.filters.ExpectSettlement = new Date()
        this.fetchData()
        this.searchFields = searchFields
        this.platformAccount()
        this.getPayCompany()
    },
    methods:{
        async getPayCompany(){
           const res = await policyApi.getPayCompany()
           this.PayCompanyID = res.data.Data
        },
        async platformAccount() {
          const options = {
            pageSize: 1000,
            order: "ID",
            query:'{"CanPurchase":"true"}'
          };
          const res = await policyApi.getPolicyPlatform(options);
          this.PlatPolicyID = res.data.Data;
          this.PlatPolicyID.splice(0, 0, {
            Account: "全部",
            ID: ""
          });
        },
        hotelsOrderSearch() {
            const _self = this
            this.filters.ExpectSettlement = ''
            _self.fetchData()
        },
        searchCallback(filters) {
            this.filters = filters
            this.filters.ExpectSettlement = ''
            this.fetchData()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        async fetchData(currentPage,pageSize) {
            const _self = this
            _self.loading = true
            _self.showButton = false
            const options = {
                pageIndex: currentPage || _self.currentPage,
                pageSize: pageSize || _self.pageSize,
                order: 'UrgentPay',
                query:{
                    HotelName:_self.filters.HotelName,
                    PlatOrderNo:_self.filters.PlatOrderNo,
                    Passenger:_self.filters.Passenger,
                    WaiCaiPlatID:_self.filters.WaiCaiPlatID,
                    CompanyAcount:_self.filters.CompanyAcount,
                    SettlementCycleFu:_self.filters.SettlementCycleFu,
                    StayDateStart:_self.filters.StayDateStart ? new Date(_self.filters.StayDateStart).Format('yyyy-MM-dd') : '',
                    StayDateEnd:_self.filters.StayDateEnd ? new Date(_self.filters.StayDateEnd ).Format('yyyy-MM-dd') : '',
                    'BookTime>':_self.filters.BookTime[0] ? new Date(_self.filters.BookTime[0]).Format('yyyy-MM-dd') : '',
                    'BookTime<':_self.filters.BookTime[1] ? new Date(_self.filters.BookTime[1]).Format('yyyy-MM-dd') : '',
                    'ExpectSettlement<=':_self.filters.ExpectSettlement ? _self.filters.ExpectSettlement.Format('yyyy-MM-dd') : '',
                }
            }
            try {
                const res = await hotelPaymentInfoApi.pay(options)
                _self.fukuanList = res.data.Data
                console.log(_self.fukuanList)
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async payment(){
            const _self = this;
            if(_self.multipleSelection.length!=0){
                this.$router.push({
                    path: 'FuKuan',
                    query: {
                        multipleSelection: _self.multipleSelection
                    }
                })
                console.log(_self.multipleSelection)
            }else{
                this.$message({
                    message: '请选择付款订单',
                    type: 'warning'
                });
            }
        },
        async paymento($index, row){
           this.multipleSelection.push(row)
            const _self = this;
                this.$router.push({
                    path: 'FuKuan',
                    query: {
                        multipleSelection: _self.multipleSelection
                    }
                })
            
        }
    }
}
</script>
