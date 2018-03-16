<template>
<div id="ShenheSave">
    <el-button @click="returns()">返回</el-button>
    <p>*注意：对冲款为正数则留作对冲（预存），为负数则使用对冲（预存款）</p>
    <el-form ref="form" :model="form" :rules="rules" label-width="110px" element-loading-text="拼命加载中" v-loading="loading" :inline="true" style="width:650px;">
    <el-row :gutter="20">
                <div>
                <el-form-item label="上单金额" prop="AmountYingShou"><span style="display:inline-block">{{AmountYingShou}}</span></el-form-item>
                <el-form-item label="手续费" prop="Fee">
                <el-input v-model="form.Fee" style="width:80px" placeholder="手续费"></el-input>
                </el-form-item>
                <el-form-item label="利润">
                <span>{{lirun}}</span>
                </el-form-item>
                </div>
                
                 <el-form-item label="支付酒店" prop="HotelFee">
                    <span style="width:30px;display:inline-block">{{HotelFee}}</span>
                </el-form-item>
   
                <el-form-item label="退还金额" prop="Amount">
                    <el-input  v-model="form.Amount" style="width:90px;" ></el-input>
                </el-form-item>
                <el-form-item label="对冲金额" prop="DuiChong">
                    <el-input  v-model="form.DuiChong" style="width:90px;"></el-input>
                </el-form-item>
                </el-row>
                <div>
                <el-form-item label="退款方式" prop="BackTypeID">
                    <el-select v-model="form.BackTypeID"  style="width:500px;">
                        <el-option v-for="item in [{label:'线上',value:0},{label:'线下',value:1}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                </div>       
                <div v-show="isShow">
                <el-form-item label="渠道/银行" prop="PartnerAccountModel">
                    <el-input  v-model="form.PartnerAccountModel" style="width:500px;"></el-input>
                </el-form-item>
                <div>
                <el-form-item label="对方账户/姓名" prop="Partner">
                    <el-input  v-model="form.Partner" style="width:500px;"></el-input>
                </el-form-item>
                </div>
                <el-form-item label="对方帐号" prop="PartnerAccount">
                    <el-input  v-model="form.PartnerAccount" style="width:500px;"></el-input>
                </el-form-item>
                </div>
                
 
    
    <div style="margin-top:20px;text-align:center;">
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
            isShow:true,
            HotelPolicyID:'',
            AmountYingShou:'',
            sheheSaveList:[],
            loading:false,
            AccountList:[],
            copyForm:{},
            CompanyAcount:'',
            HotelFee:'',
            Partner:'',
            Fee:'',
            PartnerAccount:'',
            PartnerAccountModel:'',
            form:{
                BackTypeID:1,
                Fee:'',
                Amount:'',
                DuiChong:'',
                PartnerAccountModel:'',
                Partner:'',
                PartnerAccount:''
            },
            rules: {
                Fee: [{
                    required: true,
                    message: '请输入手续费'
                    
                }],
                Amount: [{
                    required: true,
                    message: '请输入退款金额'
                    
                }],
                DuiChong: [{
                    required: true,
                    message: '请输入对冲金额'
                    
                }],
                PartnerAccountModel: [{
                    required: true,
                    message: '请输入退款渠道'
                    
                }],
                Partner: [{
                    required: true,
                    message: '请输入对方姓名'
                    
                }],
                PartnerAccount: [{
                    required: true,
                    message: '请输入对方帐号'
                    
                }]
                
                
            }
        }
    },
    created(){
        const _self = this
        _self.POrderID = _self.$route.params.POrderID
        _self.HotelPolicyID = _self.$route.params.HotelPolicyID
        _self.AmountYingShou = _self.$route.params.AmountYingShou
        _self.HotelFee = _self.$route.params.HotelFee                    
    },
    methods:{
        returns(){
            this.$router.go(-1)
        },
        remove($index){
            this.sheheSaveList.splice($index, 1);
        },
        async saveShenhe(){
            const _self = this
             _self.$refs['form'].validate(async valid => {
                 if(valid){
                        try {
                            const form = {
                                HotelOrderId :Number( _self.$route.params.POrderID)    
                            }
                            for (let [k, v] of Object.entries(_self.form)) {
                                if (_self.form[k] != _self.copyForm[k]) {
                                form[k] = v
                                }
                            }
                            if(form.Fee){
                                form.Fee = Number(_self.form.Fee)
                            }
                            if(form.Amount){
                                form.Amount = Number(_self.form.Amount)
                            }
                            if(form.DuiChong){
                                form.DuiChong = Number(_self.form.DuiChong)
                            }
                            console.log(form)
                        
                            await hotelPaymentInfoApi.savePaymentInfo(form)
                            _self.$message({
                                message: '审核成功',
                                type: 'success'
                            })
                        }catch(e){
                            _self.$message.error('审核失败!!!')
                        }
                 }else{
                     return false
                 }
             })
            
        }
    },
     computed:{
        lirun:function(){
            if(!this.form.Fee){
                return ''
            }else{
                return this.AmountYingShou - this.form.Fee
            }
        }
       
           
        
    }
}    
</script>