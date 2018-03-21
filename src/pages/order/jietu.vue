<template lang="html">
<div id="PaymentCheck">
    <el-table :data="paymentCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading"
     row-key="ID" :expand-row-keys="expandRowKeys">
        <el-table-column label="类别" prop="PaymentType" width=70>
            <template scope="scope">
                <span v-if="scope.row.PaymentType === 0">收款</span>
                <span v-if="scope.row.PaymentType === 1">付款</span>
            </template>
        </el-table-column>
        <el-table-column label="财务编号" prop="PaymentNo" width=110></el-table-column>
        <el-table-column label="打款账户" prop="CompanyAcount"></el-table-column>
        <el-table-column label="账户名称" prop="AccountName" width=80></el-table-column>
        <el-table-column label="合计金额" prop="Amount"></el-table-column>
        <el-table-column label="收付时间" prop="PaymentDate" width=110></el-table-column>
        <!-- <el-table-column label="收付方式" prop="PaymentModel" width=70></el-table-column> -->
        <el-table-column label="货币类型" prop="Currency"></el-table-column>
        <el-table-column label="创建时间" prop="CreateDate" width=110></el-table-column>
        <el-table-column label="截图" prop="PaymentPicture" width=70>
            <template scope="scope">
                <el-button type="text" @click="imgShow(scope.row.PaymentPicture)">查看</el-button>
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
        <el-table-column label="操作" width=120>
            <template scope="scope">
                <el-button type="text" size="small" @click="img(scope.row)">已发截图</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog v-model="dialogVisible" size="small" >
        <ImageList :images="imageList"></ImageList>
    </el-dialog>
</div>
</template>
<script>
import { hotelPaymentInfoApi } from 'api'
import ImageList from 'components/imglist'
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
          imageList: [],
          dialogVisible:false
      }
  },
  created() {
    this.fetchData()
  },
  methods:{
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
      const options = {
            pageIndex: currentPage || _self.currentPage,
            pageSize: pageSize || _self.pageSize,
            order: 'ID',
            query:{
                StateScreenshot:1,
                PaymentType:1,
                StateSend:0
            }
            
      }
      try {
        const res = await hotelPaymentInfoApi.imgList(options)
        _self.paymentCheck = res.data.Data
        console.log( _self.paymentCheck)
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
   async img(row){
        try{
        const aa=  await hotelPaymentInfoApi.imgState(row.PaymentID)
        console.log(aa)
            this.$message({
                message: '设置成功',
                type: 'success'
            })
            this.fetchData();
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
