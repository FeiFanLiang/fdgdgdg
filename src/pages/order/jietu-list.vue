<template lang="html">
<div id="Jietulist">
    <el-table :data="jietuList" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column label="操作" width=100>
            <template scope="scope">
                <el-button type="primary" size="small" @click="addImg(scope.row.ID)">添加截图</el-button>
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
        <el-table-column label="对方开户行" prop="PartnerAcountModel"></el-table-column>
        <el-table-column label="合计金额" prop="Amount"></el-table-column>
        <el-table-column label="收付时间" prop="PaymentDate" width=110></el-table-column>
        <el-table-column label="收付方式" prop="PaymentModel" width=70></el-table-column>
        <el-table-column label="货币类型" prop="Currency"></el-table-column>
        <el-table-column label="创建时间" prop="CreateDate" width=110></el-table-column>
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
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog title="添加截图" v-model="dialogShow">
        <el-form v-model="form" label-width="110px">
            <el-form-item label="截图状态" prop="StateScreenshot">
                <el-radio-group v-model="form.StateScreenshot">
                    <el-radio :label="0">待截图</el-radio>
                    <el-radio :label="1">截图完成</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="添加截图">
                <ul style="list-style:none">
                    <li v-for="(img,index) in images">
                        <img width="50%" :src="img" alt="" v-if="form.Picture != ''">
                    </li>
                </ul>
                <el-upload :action="imgUrl" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="imgSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button @click="dialogShow = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>
<script>
import { hotelPaymentInfoApi } from 'api'
import path from 'api/api'
export default {
  data(){
      return{
          currentPage: 1,
          pageSize: 10,
          count: 0,
          loading: false,
          jietuList:[],
          dialogShow:false,
          form:{
              ID:'',
              StateScreenshot:'',
              Picture:''
          },
          imgUrl:'',
          dialogImageUrl: '',
          dialogVisible: false,
          picture:[],
          ID:'',
          url:''
      }
  },
  created() {
    this.fetchData()
    this.imgUrl = path.uploadUrl
    this.url = path.imageUrl
  },
  computed: {
    images() {
      return this.picture.map(item => path.imageUrl + item)
    }
  },
  methods:{
    imgSuccess(response, file, fileList){
        this.picture.push(response)
    },
    handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
    },
    handleRemove(index,file, fileList) {
        this.picture.splice(index, 1)
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
            order: 'ID'
      }
      try {
        const res = await hotelPaymentInfoApi.getImgList(options)
        _self.jietuList = res.data.Data
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async addImg(id){
        this.picture = []
        const res = await hotelPaymentInfoApi.getImgById(id)
        this.form = res.data.Data
        let formList = this.form.Picture.split(",")
        for(let i in formList){
            this.picture.push(formList[i])
        }
        //ss = s.split(",")
        console.log(this.picture)
        this.dialogShow = true
    },
    async submit(){
        let f = {
            ID:this.form.ID,
            StateScreenshot:this.form.StateScreenshot,
            Picture:this.picture.toString()
        }
        try{
            console.log(f)
            await hotelPaymentInfoApi.saveImg(f)
            this.$message({
                message: '添加截图成功',
                type: 'success'
            })
            this.dialogShow = false
            this.fetchData()
            this.form = {
                StateScreenshot:''
            }
            this.dialogImageUrl = ''
        }catch(e){
            console.log(e)
            this.$message.error('添加截图失败!!!')
        }

    }
  }
}
</script>
<style lang="scss">
#Jietulist{
.el-dialog__footer{
    text-align:center;
}
}
</style>

