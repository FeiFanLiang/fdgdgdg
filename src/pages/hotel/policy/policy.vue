<template>
<div id="Policy">
    <el-button type="primary" @click="addPolicy">创建</el-button>
    <el-dialog title="酒店政策创建" v-model="dialogShow" @close="resetForm('form')">
        <el-form ref="form" :model="form" label-width="110px">
            <h3>酒店名称：{{hotelName}}</h3>
                <el-form-item label="名称" prop="Name">
                    <el-input placeholder="请输入名称" v-model="form.Name"></el-input>
                </el-form-item>
                <el-form-item label="政策负责人" prop="PersonName">
                    <el-input placeholder="请输入政策负责人" v-model="form.PersonName"></el-input>
                </el-form-item>
                <el-form-item label="政策采购人" prop="PurchasingName">
                    <el-input placeholder="请输入政策采购人" v-model="form.PurchasingName"></el-input>
                </el-form-item>
                <el-form-item label="是否默认" prop="IsDefault">
                    <el-switch on-text="是" off-text="否" :on-value="true" :off-value="false" v-model="form.IsDefault"></el-switch>
                </el-form-item>
            <el-row :gutter="24"><el-col :offset="1" style="color:orange;"><h3>财务信息</h3></el-col></el-row>
                <el-form-item label="名称" prop="Name2">
                    <el-input placeholder="请输入名称" v-model="form.Name2"></el-input>
                </el-form-item>
                <el-form-item label="平台用户名" prop="UserName">
                    <el-input placeholder="请输入平台用户名" v-model="form.UserName"></el-input>
                </el-form-item>
                <el-form-item label="平台密码" prop="Password">
                    <el-input placeholder="请输入平台密码" v-model="form.Password"></el-input>
                </el-form-item>
                <el-form-item label="我方签约公司" prop="Company">
                    <el-input placeholder="请输入我方签约公司" v-model="form.Company"></el-input>
                </el-form-item>
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                <el-form-item label="我方财务信息" prop="PayCompanyID">
                    <el-select v-model="form.PayCompanyID" clearable placeholder="请选择" @change="PayCompany">
                        <el-option v-for="item in PayCompanyID" :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简称" prop="ShortName">
                    <el-input placeholder="请输入简称" v-model="form2.ShortName"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="AccountName">
                    <el-input placeholder="请输入账户名" v-model="form2.AccountName"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="AccountNum">
                    <el-input placeholder="请输入账号" v-model="form2.AccountNum"></el-input>
                </el-form-item>
                <el-form-item label="银行" prop="Bank">
                    <el-input placeholder="请输入银行" v-model="form2.Bank"></el-input>
                </el-form-item>
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                <el-form-item label="对方财务信息">
                    <!--<el-input placeholder="输入名称查询" v-model="form.ShortName"></el-input>-->
                </el-form-item>
                <el-form-item label="简称" prop="ShortName">
                    <el-input placeholder="请输入简称" v-model="form.ShortName"></el-input>
                </el-form-item>
                <el-form-item label="账户名" prop="AccountName">
                    <el-input placeholder="请输入账户名" v-model="form.AccountName"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="AccountNum">
                    <el-input placeholder="请输入账号" v-model="form.AccountNum"></el-input>
                </el-form-item>
                <el-form-item label="银行" prop="Bank">
                    <el-input placeholder="请输入银行" v-model="form.Bank"></el-input>
                </el-form-item>
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                <el-form-item label="财务联系人" prop="FinanceLinkMan">
                    <el-input placeholder="请输入财务联系人" v-model="form.FinanceLinkMan"></el-input>
                </el-form-item>
                <el-form-item label="财务联系电话" prop="FinancePhoneNum">
                    <el-input placeholder="请输入财务联系电话" v-model="form.FinancePhoneNum"></el-input>
                </el-form-item>
                <el-form-item label="付款周期" prop="PayPeriod">
                    <el-input placeholder="请输入付款周期" v-model="form.PayPeriod"></el-input>
                </el-form-item>
                <el-form-item label="结算单位" prop="ReceiptCompany">
                    <el-input placeholder="请输入结算单位" v-model="form.ReceiptCompany"></el-input>
                </el-form-item>
                <!--
                <el-form-item label="图片" prop="PolicyImage">
                    <el-upload :action="imgUrl" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="imgSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                -->
                <el-form-item label="备注" prop="Remark">
                    <el-input type="textarea" v-model="form.Remark"></el-input>
                </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin:10px;">
            <el-button @click="dialogShow = false" size="large">取 消</el-button>
            <el-button type="primary" @click="submit" :loading="!isEditable" size="large">{{isEditable?'保存':'提交中'}}</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import {policyApi} from 'api'
  export default {
    data() {
      return {
        imgUrl:'',
        dialogImageUrl: '',
        dialogVisible: false,
        fileList:[],
        picture:'',
        HotelID:'',
        hotelName:'',
        form:{
            PayCompanyID:'',
            IsDefault:true
        },
        dialogShow: false,
        isEditable:true,
        PayCompanyID:[],
        form2:{
            AccountName: '',
            AccountNum: '',
            Bank: '',
            ShortName: '',
        }
      };
    },
    created() {
        this.HotelID = this.$route.params.ID
        this.hotelName = this.$route.query.hotelName
        console.log(this.hotelName + this.HotelID)
        //this.imgUrl = 'http://liukai.iok.la/Hotel/HotelOrderPicture/UploadFile'
    },
    watch:{
        form: {
            handler(curVal){
                this.form2.ShortName = curVal.ShortName
                this.form2.AccountName = curVal.AccountName
                this.form2.AccountNum = curVal.AccountNum
                this.form2.Bank = curVal.Remark
　　　　　　　},
　　　　　　　deep:true
        }
    },
    methods:{
        imgSuccess(response, file, fileList){
            this.picture = file.name
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        async PayCompany(value){
            const _self = this
            const res = await policyApi.getPayCompanyID(value)
            _self.form2.ShortName = res.data.Data.ShortName
            _self.form2.AccountName = res.data.Data.AccountName
            _self.form2.AccountNum = res.data.Data.AccountNum
            _self.form2.Bank = res.data.Data.Remark
        },
        async addPolicy(){
            const _self = this
            _self.dialogShow = true
            const res = await policyApi.getPayCompany()
            _self.PayCompanyID = res.data.Data
        },
        async submit(){
            const _self = this
            try{
                _self.isEditable = false
                const f = {
                    HotelID:_self.HotelID,
                    Name: _self.form.Name,
                    PersonName: _self.form.PersonName,
                    PurchasingName: _self.form.PurchasingName,
                    IsDefault:  _self.form.IsDefault,
                    Remark:_self.form.Remark,
                    FinancialInfo:{
                        Name:_self.form.Name2,
                        UserName:_self.form.UserName,
                        Password:_self.form.Password,
                        Company:_self.form.Company,
                        PayCompanyID:_self.form.PayCompanyID,
                        FinanceLinkMan:_self.form.FinanceLinkMan,
                        FinancePhoneNum:_self.form.FinancePhoneNum,
                        //SettlementUnit:_self.form.SettlementUnit,
                        PayPeriod:_self.form.PayPeriod,
                        PolicyImage:_self.picture,
                        ReceiptCompany: {
                            AccountName: _self.form.AccountName,
                            AccountNum: _self.form.AccountNum,
                            Bank: _self.form.Bank,
                            ShortName: _self.form.ShortName,
                        },
                    }
                }
                console.log(f)
                await policyApi.addHotelPolicy(f)
                _self.$message({
                    message: '添加成功',
                    type: 'success'
                })
                _self.dialogShow = false
            }catch(e){
                _self.$message.error('添加失败!!!')
            }finally {
                _self.isEditable = true
            }
        }
    }
  }
</script>
<style lang="scss">
#Policy{
.el-input{
    width:70%;
}
}
</style>