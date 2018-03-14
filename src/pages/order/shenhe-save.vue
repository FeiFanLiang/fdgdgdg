<template>
<div id="ShenheSave">
    <el-button @click="returns()">返回</el-button>
    <p>*注意：对冲款为正数则留作对冲（预存），为负数则使用对冲（预存款）</p>
    <el-form ref="form" :model="form" label-width="110px" element-loading-text="拼命加载中" v-loading="loading" :inline="true">
    <div><span>上单金额:</span><span>1020</span><span>-手续费</span><el-input v-model="form.Fee" style="width:50px" placeholder="手续费"></el-input><span>=利润</span><span></span></div>
    <el-row :gutter="20">
    <span>支付酒店</span><span>980。 </span>
   
                <el-form-item label="退还金额" prop="Amount">
                    <el-input  v-model="form.Amount" style="width:70px;"></el-input>
                </el-form-item>
                <el-form-item label="对冲金额" prop="DuiChong">
                    <el-input  v-model="form.DuiChong" style="width:70px;"></el-input>
                </el-form-item>
                </el-row>
                <el-form-item label="退款方式" prop="BackTypeID">
                    <el-select v-model="form.BackTypeID" clearable style="width:500px;">
                        <el-option v-for="item in [{label:'线上',value:0},{label:'线下',value:1}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>       
                <el-form-item label="渠道/银行" prop="PartnerAccountModel">
                    <el-input  v-model="form.PartnerAccountModel" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="对方账户/姓名" prop="Partner">
                    <el-input  v-model="form.Partner" style="width:500px;"></el-input>
                </el-form-item>
                <el-form-item label="对方帐号" prop="PartnerAccount">
                    <el-input  v-model="form.PartnerAccount" style="width:500px;"></el-input>
                </el-form-item>
           
 
    
    <div style="margin-top:20px;">
        <el-button @click="saveShenhe()">确认审核</el-button>
    </div>
    </el-form>
</div>
</template>
<script>
import {
  hotelPaymentInfoApi
} from 'api'
export default {
    data(){
        return{
            POrderID:'',
            HotelPolicyID:'',
            sheheSaveList:[],
            loading:false,
            AccountList:[],
            copyForm:{},
            CompanyAcount:'',
            Partner:'',
            PartnerAccount:'',
            PartnerAccountModel:'',
            form:{
                BackTypeID:1
            }
        }
    },
    created(){
        const _self = this
        _self.POrderID = _self.$route.params.POrderID
        _self.HotelPolicyID = _self.$route.params.HotelPolicyID
        _self.fetchData()
        _self.getAccountData()
    },
    methods:{
        returns(){
            this.$router.go(-1)
        },
        async getAccountData(){
            const _self = this
            if(_self.HotelPolicyID!=0){
                const res = await hotelPaymentInfoApi.getAccount(_self.HotelPolicyID)
                let wofang = res.data.Data.Payment.PayCompanyID
                const res2 = await hotelPaymentInfoApi.getAccountDetail(wofang)
                _self.CompanyAcount = res2.data.Data.ShortName
                let duifang = res.data.Data.Receipt.ReceiptCompanyID
                const res3 = await hotelPaymentInfoApi.getAccountDetail(duifang)
                _self.Partner = res3.data.Data.ShortName
                _self.PartnerAccount = res3.data.Data.AccountNum
                _self.PartnerAccountModel = res3.data.Data.Remark
            }
        },
        remove($index){
            this.sheheSaveList.splice($index, 1);
        },
        async saveShenhe(){
            const _self = this
            try {
                const form = {}
                for (let [k, v] of Object.entries(_self.form)) {
                    if (_self.form[k] != _self.copyForm[k]) {
                    form[k] = v
                    }
                }
                console.log(form)
              
                await hotelPaymentInfoApi.savePaymentInfo(_self.sheheSaveList)
                _self.$message({
                    message: '审核成功',
                    type: 'success'
                })
                _self.fetchData()
            }catch(e){
                _self.$message.error('审核失败!!!')
            }
        }
    }
}    
</script>