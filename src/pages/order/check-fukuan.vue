<template lang="html">
<div id="PaymentCheck">
    <el-table :data="paymentCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column label="类别" prop="PaymentType" width=70>
            <template scope="scope">
                <span v-if="scope.row.PaymentType === 0">收款</span>
                <span v-if="scope.row.PaymentType === 1">付款</span>
            </template>
        </el-table-column>
        <el-table-column label="财务编号" prop="PaymentNo" width=110></el-table-column>
        <el-table-column label="打款账户" prop="CompanyAcount"></el-table-column>
        <el-table-column label="合计金额" prop="Amount"></el-table-column>
        <el-table-column label="收付时间" prop="PaymentDate" width=110></el-table-column>
        <el-table-column label="收付方式" prop="PaymentModel" width=70></el-table-column>
        <el-table-column label="货币类型" prop="Currency"></el-table-column>
        <el-table-column label="创建时间" prop="CreateDate" width=110></el-table-column>
        <el-table-column label="截图状态" prop="StateScreenshot">
            <template scope="scope">
                <span v-if="scope.row.StateScreenshot === 0">未截图</span>
                <span v-if="scope.row.StateScreenshot === 1">截图完成</span>
                <span v-if="scope.row.StateScreenshot === 2">不截图</span>
            </template>
        </el-table-column>
        <el-table-column label="发送截图" prop="StateSend">
            <template scope="scope">
                <span v-if="scope.row.StateSend === 0">未发送</span>
                <span v-if="scope.row.StateSend === 1">已发截图</span>
                <span v-if="scope.row.StateSend === 2">已处理</span>
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
        <el-table-column label="备注" prop="Remark" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="操作">
            <template scope="scope">
                <el-button type="text" size="small" @click="clickEditBtn(scope.$index, scope.row)">对账完成</el-button>
            </template>
        </el-table-column> -->
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
</div>
</template>
<script>
import { hotelsOrderApi } from 'api'
export default {
  data(){
      return{
          currentPage: 1,
          pageSize: 10,
          count: 0,
          loading: false,
          paymentCheck:[]
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
            order: 'ID'
      }
      try {
        const res = await hotelsOrderApi.checkOut(options)
        _self.paymentCheck = res.data.Data
        console.log(_self.paymentCheck)
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    }
  }
}
</script>
