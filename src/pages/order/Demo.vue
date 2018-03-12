<template lang="html">
  <!-- 付款对账 -->
<div id="PaymentCheck">
  <CustomSearchCopy :configList="searchFields" @searchCallback="searchCallback">
      <!--   <el-form-item label="销售平台" slot="PlatPolicyID">
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
      <el-button style="margin:10px 0;" @click="payment" slot="button-add">下载</el-button>
  </CustomSearchCopy>


  <el-table :data="paymentCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading"
    @expand="expand" row-key="ID" :expand-row-keys="expandRowKeys" @selection-change="handleSelectionChange" ref="table">
      <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
      <el-table-column label="财务编号" prop="PaymentNo" ></el-table-column>
      <el-table-column prop="Passenger" label="入住人"></el-table-column>
      <el-table-column prop="1" label="预定日期"></el-table-column>
      <el-table-column prop="2" label="酒店名称"></el-table-column>

      <el-table-column prop="3" label="收款账户"></el-table-column>
          <el-table-column prop="dak" label="打款账户"></el-table-column>
      <el-table-column prop="4" label="打款日期"></el-table-column>
      <el-table-column prop="5" label="金额"></el-table-column>
      <el-table-column label="截图" prop="Picture" width=70>
          <template scope="scope">
              <el-button type="text" @click="imgShow(scope.row.Picture)">查看</el-button>
          </template>
      </el-table-column>

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
['打款账户', 'CompanyAcount', 'select', ''],
['打款日期', '', 'daterange', ''],
['酒店名称', 'Passenger', 'input', ''],
['客人姓名', 'Passenger', 'input', ''],

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
      this.paymentCheck= [
        {
        "PaymentNo":"F1803101416329571",
        "Passenger":"李展添",
        "Picture":"",
        "ExpectSettlement":"2018-03-10",
        "ExpectGetMoney":"2018-03-10",
        "1":"2018-03-10",
        "2":"济南鲁能希尔顿酒店及公寓",
        "3":"济南鲁能希尔顿酒店及公寓",
        "4":"2018-03-10",
        "5":"923.46",
        "dak":"澳迅2357",
        },
        {
        "PaymentNo":"F1803101416854627",
        "Passenger":"外采用户",
        "Picture":"",
        "ExpectSettlement":"2018-03-10",
        "ExpectGetMoney":"2018-03-10",
        "1":"2018-03-10",
        "2":"上海紫金通欣酒店",
        "3":"在线支付",
        "4":"2018-04-05",
        "5":"1023",
        "dak":"9581",
        },
        {
        "PaymentNo":"F18310142419",
        "Passenger":"刘露一",
        "Picture":"",
        "ExpectSettlement":"2018-03-10",
        "ExpectGetMoney":"2018-03-10",
        "1":"2018-03-10",
        "2":"济南鲁能希尔顿酒店及公寓",
        "3":"武汉远东帝豪酒店管理有限公司",
        "4":"2018-03-10",
        "5":"923.46",
        "dak":"惠和8743",
        },
        {
        "PaymentNo":"F18310142419",
        "Passenger":"刘露二",
        "Picture":"",
        "ExpectSettlement":"2018-03-10",
        "ExpectGetMoney":"2018-03-10",
        "1":"2018-03-12",
        "2":"济南鲁能希尔顿酒店及公寓",
        "3":"武汉远东帝豪酒店管理有限公司",
        "4":"2018-03-10",
        "5":"500",
        "dak":"惠和8743",
        }


        ]

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
