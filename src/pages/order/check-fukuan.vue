<template lang="html">
  <!-- 付款对账 -->
<div id="PaymentCheck">
  <CustomSearchCopy :configList="searchFields" @searchCallback="searchCallback">
      <!--  <el-form-item label="销售平台" slot="PlatPolicyID">
          <el-select v-model="filters.PlatPolicyID">
              <el-option v-for="(item,index) in PlatPolicyID " :key="index" :label="item.Account" :value="item.ID"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="付款日期" slot="ExpectSettlement">
          <el-date-picker
              v-model="filters.ExpectSettlement"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日">
          </el-date-picker>
      </el-form-item>-->
      <el-form-item label="打款账户" slot="CompanyAcount">
          <el-select v-model="filters.CompanyAcount" clearable>
              <el-option v-for="(item,index) in PayCompanyID " :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
          </el-select>
      </el-form-item>
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
        <el-table-column type="expand" width=25>
            <template scope="props">
                备注：{{props.row.Remark}}
                <el-table :data="orderDetail" border style="width: 100%">
                    <el-table-column prop="HotelOrder.HotelName" label="酒店名称"></el-table-column>
                    <el-table-column prop="HotelOrder.Passenger" label="入住人"></el-table-column>
                    <el-table-column prop="AmountUse" label="金额"></el-table-column>
                    <el-table-column prop="HotelOrder.StateFuKuan" label="付款状态">
                        <template scope="scope">
                            <span v-if="scope.row.HotelOrder.StateFuKuan == 0">未付</span>
                            <span v-if="scope.row.HotelOrder.StateFuKuan == 1">已付款</span>
                        </template></el-table-column>
                </el-table>
            </template>
        </el-table-column>
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="类别" prop="PaymentType" width=70>
            <template scope="scope">
                <span v-if="scope.row.PaymentType === 0">收款</span>
                <span v-if="scope.row.PaymentType === 1">付款</span>
            </template>
        </el-table-column>
        <el-table-column label="财务编号" prop="PaymentNo" width=110></el-table-column>
        <el-table-column label="打款账户" prop="CompanyAcount"></el-table-column>
        <el-table-column label="对方账户名" prop="Partner" show-overflow-tooltip></el-table-column>
        <el-table-column label="对方账号" prop="PartnerAccount" width=125>
            <template scope="scope">
                <el-popover trigger="hover" placement="top">
                    <p>{{ scope.row.PartnerAccount }}</p>
                    <div slot="reference" class="name-wrapper" v-if="typeof(scope.row.PartnerAccount) != 'undefined'">
                        {{ scope.row.PartnerAccount.substring(0,4) + '****' + scope.row.PartnerAccount.substring(scope.row.PartnerAccount.length-4,scope.row.PartnerAccount.length+1) }}
                    </div>
                </el-popover>
            </template>
        </el-table-column>
        <el-table-column label="入住人" prop="Passenger"></el-table-column>
        <el-table-column label="合计金额" prop="Amount"></el-table-column>
        <el-table-column label="收付时间" prop="PaymentDate" width=110></el-table-column>
        <!-- <el-table-column label="收付方式" prop="PaymentModel" width=70></el-table-column> -->
        <el-table-column label="货币类型" prop="Currency"></el-table-column>
        <el-table-column label="创建时间" prop="CreateDate" width=110></el-table-column>
        <el-table-column label="截图" prop="Picture" width=70>
            <template scope="scope">
                <el-button type="text" @click="imgShow(scope.row.Picture)">查看</el-button>
            </template>
        </el-table-column>
        <el-table-column label="状态" prop="State">
            <template scope="scope">
                <span v-if="scope.row.State === 0">待处理</span>
                <span v-if="scope.row.State === 1">已处理，待对账</span>
                <span v-if="scope.row.State === 2">已对账，待结算</span>
                <span v-if="scope.row.State === 3">结算完成</span>
            </template>
        </el-table-column>
        <el-table-column label="预计结算/到款日期" width=110>
            <template scope="scope">
                <span style="color:red" v-if="scope.row.ExpectSettlement != null">{{scope.row.ExpectSettlement.substring(0,10)}}</span>
                <hr style="border:none;border-top:1px dotted lightgray;margin:0;" />
                <span style="color:blue" v-if="scope.row.ExpectGetMoney != null">{{scope.row.ExpectGetMoney.substring(0,10)}}</span>
            </template>
        </el-table-column>
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

    ['金额', 'Amount', 'input', ''],
    ['打款日期', '', 'daterange', ''],
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
            ExpectSettlement: "",
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
    //  ['打款日期', '', 'daterange', ''],
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
      Object.assign(filters, filters, this.filters);
      this.filters = filters;
      this.filters.ExpectSettlement = "";
      this.fetchData();
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            order: 'ID',
            query:{
                CompanyAcount:_self.filters.CompanyAcount
            }
      }
      try {
        //_self.multipleSelection = _self.$route.query.multipleSelection
        const res = await hotelPaymentInfoApi.checkOut(options)
        _self.paymentCheck = res.data.Data
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
                ids.push(_self.multipleSelection[i].ID)
            }
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
            _self.expandRowKeys.length = 0
            _self.expandRowKeys.push(row.ID)
            _self.ID = row.ID
        }
    },
    imgShow(img){
        try{
            this.imageList = img.split(',')
            this.dialogVisible = true
        }catch(e){
            this.$message.error('截图获取失败!!!')
        }
    },
    countMoney(){
        let m = 0
        for(let i in this.multipleSelection){
            m += parseInt(this.multipleSelection[i].Amount)
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
