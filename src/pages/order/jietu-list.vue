<template lang="html">
<div id="Jietulist">
    <el-form label-width="80px">
      <el-row :gutter="24">
        <el-col :span="6">
            <el-form-item label="打款账户">
                <el-input v-model="filters.CompanyAcount"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="入住人">
                <el-input v-model="filters.Passenger"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="订单编号">
                <el-input v-model="filters.PlatOrderNo"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="paymentCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading"
    @expand="expand" row-key="ID" ref="table">
        <el-table-column type="expand" width=25>
            <template scope="props">
                备注：{{props.row.Remark}}
                <el-table :data="orderDetail" border style="width: 100%">
                    <el-table-column prop="HotelOrder.PlatOrderNo" label="订单号"></el-table-column>
                    <el-table-column prop="HotelOrder.HotelName" label="酒店名称"></el-table-column>
                    <el-table-column prop="HotelOrder.Passenger" label="入住人"></el-table-column>
                    <el-table-column prop="AmountUse" label="金额"></el-table-column>
                </el-table>
                <el-row :gutter="24">
                    <p style="margin:10px;">
                    <span style="color:orange;">截图状态</span>
                        <el-radio-group v-model="props.row.StateScreenshot">
                            <el-radio :label="0">未截图</el-radio>
                            <el-radio :label="1">截图完成</el-radio>
                        </el-radio-group>
                    </p>
                </el-row>
                <el-row :gutter="24" style="margin-top:10px;margin-bottom:10px;">
                    <el-col>
                        <UploadImageMove :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImageMove>
                    </el-col>
                </el-row>
                <el-button type="primary" @click="submitImg(props.row.ID,props.row.StateScreenshot)" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </template>
        </el-table-column>
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
        <el-table-column label="货币类型" prop="Currency"></el-table-column>
        <el-table-column label="创建时间" prop="CreateDate" width=110></el-table-column>
        <el-table-column label="预计结算/到款日期" width=110>
            <template scope="scope">
                <span style="color:red" v-if="scope.row.ExpectSettlement != null">{{scope.row.ExpectSettlement.substring(0,10)}}</span>
                <hr style="border:none;border-top:1px dotted lightgray;margin:0;" />
                <span style="color:blue" v-if="scope.row.ExpectGetMoney != null">{{scope.row.ExpectGetMoney.substring(0,10)}}</span>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
</div>
</template>
<script>
import { hotelPaymentInfoApi,paymentCheckApi } from 'api'
import UploadImageMove from 'components/upload-image-move'
export default {
  components: {
      UploadImageMove
  },
  data(){
      return{
          currentPage: 1,
          pageSize: 10,
          count: 0,
          loading: false,
          paymentCheck:[],
          ID: '',
          orderDetail:[],
          filters:{
              CompanyAcount:'',
              PlatOrderNo:'',
              Passenger:''
          },
          imageList: [],
          Picture:'',
          isEditable:true
      }
  },
  created() {
    this.fetchData()
  },
  methods:{
    async getImageList(list) {
        if (list) {
            const images = list.split(',')
            if (Array.isArray(images)) {
                this.imageList = images
            }
        }
    },
    async handleSuccess(response, file, fileList) {
        if (!response) {
            this.$message.error('上传失败,请重新上传')
            return false
        }
        this.imageList.push(response)
        this.Picture = this.imageList.toString()
    },
    handleRemove(index,file, fileList) {
        this.imageList.splice(index, 1)
        this.Picture = this.imageList.toString()
    },
    async submitImg(id,state){
        const _self = this
        let params = {
            ID:id,
            StateScreenshot:state,
            Picture:this.Picture   
        }
        try{
            _self.isEditable = false
            await paymentCheckApi.putImg(params)
            _self.$message({
                message: '提交成功',
                type: 'success'
            })
            this.fetchData()
        }catch (e) {
            console.log(e)
            _self.$message.error('提交失败!!!')
        } finally {
            _self.isEditable = true
        }
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
                CompanyAcount:_self.filters.CompanyAcount,
                PlatOrderNo:_self.filters.PlatOrderNo,
                Passenger:_self.filters.Passenger
            }
      }
      try {
        const res = await hotelPaymentInfoApi.getImgList(options)
        _self.paymentCheck = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async expand(row, expanded){
        const _self = this
        if (expanded) {
            const res = await hotelPaymentInfoApi.getDetails(row.ID)
            _self.orderDetail = res.data.Data
            _self.ID = row.ID
            _self.getImageList(row.Picture)
        }
    },
  }
}
</script>
<style lang="scss">
#Jietulist{
.el-card {
    box-shadow: none;
}
}
</style>

