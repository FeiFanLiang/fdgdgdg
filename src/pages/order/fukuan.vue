<template lang="html">
<div id="Fukuan">
    <h1>付款合计</h1>
    <el-table :data="fukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" ref="table" row-key="ID"
    @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="订单编号" prop="HotelOrder.PlatOrderNo"></el-table-column>
        <el-table-column label="酒店名称" prop="HotelOrder.HotelName"></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
            <template scope="scope">
                <span v-if="typeof(scope.row.HotelOrder.StayDateStart) != 'undefined'">{{ scope.row.HotelOrder.StayDateStart.split(' ')[0] }}</span>/
                <span v-if="typeof(scope.row.HotelOrder.StayDateEnd) != 'undefined'">{{ scope.row.HotelOrder.StayDateEnd.split(' ')[0] }}</span>
            </template>
        </el-table-column>
        <el-table-column label="间/晚" prop="RoomNum" width=70>
            <template scope="scope">
            <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
            <span>{{ scope.row.HotelOrder.NightNum }}</span>
            </template>
        </el-table-column>
        <el-table-column label="入住人" prop="HotelOrder.Passenger"></el-table-column>
        <el-table-column label="实付" prop="AmountUse" width=90>
            <!-- <template scope="scope">
                <input v-model="scope.row.AmountUse" style="width:90%" v-on:input="inputChange">
            </template> -->
        </el-table-column>
        <el-table-column label="应付" prop="YingShouFu" width=90></el-table-column>
        <el-table-column label="对冲" prop="DuiChong" width=90></el-table-column>
         <el-table-column label="预定时间" prop="HotelOrder.BookTime">
            <template scope="scope">
                <span v-if="typeof(scope.row.HotelOrder.BookTime) != 'undefined'">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="备注" prop="Remark">
            <template scope="scope">
                <el-input v-model="scope.row.Remark" type="textarea" :rows="1"></el-input>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="24" style="margin-top:10px">
    <el-col :span="14">
        <el-form ref="payCheck" v-model="payCheck" label-width="110px" >
            <el-form-item label="财务编号" prop="PaymentNo">
                <el-input placeholder="财务编号" v-model="payCheck.PaymentNo" class="input"></el-input>
            </el-form-item>
            <el-form-item label="合计" prop="Amount">
                <el-input placeholder="合计" v-model="payCheck.Amount" class="input"></el-input>
                <el-button @click="account">计算</el-button>
            </el-form-item>
            <el-form-item label="货币类型" prop="Currency">
                <el-input placeholder="货币类型" v-model="payCheck.Currency" class="input"></el-input>
            </el-form-item>
            <el-form-item label="付款时间" prop="ExpectSettlement">
                <el-date-picker v-model="payCheck.ExpectSettlement" type="date" placeholder="支付时间" class="input"></el-date-picker>
            </el-form-item>
            <el-form-item label="到账时间" prop="ExpectGetMoney">
                <el-date-picker v-model="payCheck.ExpectGetMoney" type="date" placeholder="到账时间" class="input"></el-date-picker>
            </el-form-item>
            <!--
            <el-form-item label="支付方式" prop="PaymentModel">
                <el-select v-model="payCheck.PaymentModel" class="input">
                    <el-option v-for="item in PaymentModel" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
            </el-form-item>
            -->
            <el-form-item label="支付账户" prop="CompanyAcount">
                <el-select v-model="payCheck.CompanyAcount" class="input">
                    <el-option v-for="item in CompanyAcount" :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="对方账户名" prop="Partner">
                <el-input placeholder="对方账户名" v-model="payCheck.Partner" class="input"></el-input>
            </el-form-item>
            <el-form-item label="对方账户" prop="PartnerAccount">
                <el-input placeholder="对方账户" v-model="payCheck.PartnerAccount" class="input"></el-input>
            </el-form-item>
            <el-form-item label="对方开户行" prop="PartnerAccountModel">
                <el-input placeholder="对方开户行" v-model="payCheck.PartnerAccountModel" class="input"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" v-model="payCheck.Remark" class="input" autosize></el-input>
            </el-form-item>
            <el-form-item label="截图状态" prop="StateScreenshot">
                <el-radio-group v-model="payCheck.StateScreenshot">
                    <el-radio :label="0">待截图</el-radio>
                    <el-radio :label="1">截图完成</el-radio>
                </el-radio-group> 
            </el-form-item>
        </el-form>
    </el-col>        
    <el-col :span="10">        
        <el-table :data="fukuanList1" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" ref="table" row-key="ID">
        <el-table-column label="订单编号" prop="HotelOrder.PlatOrderNo"></el-table-column>          
        <el-table-column label="收付类型" prop="PaymentType">
        <template scope="scope">
                <span v-if="scope.row.PaymentType==0">收款</span>
                <span v-if="scope.row.PaymentType==1">付款</span>                
        </template>
        </el-table-column>
        <el-table-column label="金额" prop="AmountUse"></el-table-column>        
        </el-table>
    </el-col>                
    </el-row>
    <el-card class="box-card">
        <el-form label-width="110px">
            <el-form-item label="添加截图">
             <el-col>
                <UploadImageMove :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImageMove>
                 </el-col>
            </el-form-item>
        </el-form>
    </el-card>

    
    <el-button @click="commit">付款完成</el-button>
</div>
</template>
<script>
import { hotelPaymentInfoApi,payCompanyApi  } from 'api'
import path from 'api/api'
import UploadImageMove from 'components/upload-image-move'

export default {
    components: {
        UploadImageMove
    },
    data() {
        return {
            multipleSelection:[],
            fukuanList: [],
            fukuanList1: [],            
            loading:false,
            multipleSelection2: [],
            CompanyAcount:[],
            Ids:[],
            payCheck:{
                PaymentNo: '',
                Amount: '',
                Currency: '',
                ExpectSettlement: '',
                ExpectGetMoney: '',
                CompanyAcount: '',
                PaymentModel: '', 
                Remark: '',
                PaymentType:'',
                Partner:'',
                PartnerAccount:'',  
                PartnerAccountModel:'',
                Picture:'',  
                StateScreenshot:0              
            },
            imageList: [],
            picture:[]
        }
    },
    mounted(){
        this.fetchData()
        this.toInfo()
        this.getPayCompany()
        this.imgUrl = path.uploadUrl
    },
    methods:{
        async handleSuccess(response, file, fileList) {
            if (!response) {
                this.$message.error('上传失败,请重新上传')
                return false
            }
            this.imageList.push(response)
            this.picture = this.imageList
        },
        handleRemove(index,file, fileList) {
            this.imageList.splice(index, 1)
            this.picture = this.imageList
        },
        async getPayCompany(){
            const res = await payCompanyApi.getMyCompany()
            this.CompanyAcount = res.data.Data
        },
        randomString() {
            var oDate = new Date();
            var y = oDate.getFullYear() - 2000;
            var m = oDate.getMonth() + 1;
            var d = oDate.getDate();
            var h = oDate.getHours();
            var mm = oDate.getMinutes();
            var r = Math.round(Math.random() * 89 + 10);
            var code = ""+ y+ (m.length === 1 ? '0' + m : m) + (d.length === 1 ? '0' + d : d) + (h.length === 1 ? '0' + h : h) + (mm.length === 1 ? '0' + mm : mm) +r;
            return code;
        },
        account(){
            let sum = 0
            for(let i in this.multipleSelection2){
                let a = parseInt(this.multipleSelection2[i].AmountUse); 
                sum += a
            }
            this.payCheck.Amount = sum
        },
        inputChange(){
            this.account()
        },
        handleSelectionChange(val) {
            this.multipleSelection2 = val;
            this.account()
        },
        async toInfo(){
            const _self = this
            _self.loading = true
            _self.showButton = false 
            try { 
                _self.multipleSelection = _self.$route.query.multipleSelection
                let select = []
                for(let i in _self.multipleSelection){
                    select.push(_self.multipleSelection[i].ID)
                }
                const res1 = await hotelPaymentInfoApi.getInfoli(select)               
               _self.fukuanList1 = res1.data.Data   
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async fetchData(currentPage,pageSize) {
            const _self = this
            _self.loading = true
            _self.showButton = false
            try {
                _self.multipleSelection = _self.$route.query.multipleSelection
                let select = []
                for(let i in _self.multipleSelection){
                    select.push(_self.multipleSelection[i].PaymentInfoID)
                }
                const res = await hotelPaymentInfoApi.payhj(select)                
                _self.fukuanList = res.data.Data
             //   console.log(_self.fukuanList)
                this.fukuanList.forEach(item => {
                    this.multipleSelection2.push(item);
                    this.$refs.table.toggleRowSelection(item,true);
                });
                let string = _self.randomString()
                let amount = 0
                for(let i in _self.fukuanList){
                    amount+=_self.fukuanList[i].AmountUse
                }
                let remark = ''
                let passenger = ''
                for(let a in _self.multipleSelection){
                    remark+=_self.multipleSelection[a].Passenger.replace('/',' ')+' '
                            +_self.multipleSelection[a].StayDateStart.substring(0,10)+' '
                            +_self.multipleSelection[a].HotelBookingNo+' '
                            +string.substring(string.length-6,string.length)+' '
                    passenger = _self.multipleSelection[a].Passenger+'  '
                    passenger = passenger.trim()
                }
                _self.payCheck = {
                    PaymentNo: 'F'+ string,
                    Amount: amount,
                    PaymentType: 1,
                    ExpectSettlement: _self.fukuanList[0].ExpectSettlement,
                    Currency: _self.fukuanList[0].Currency,
                    ExpectGetMoney: _self.fukuanList[0].ExpectGetMoney,
                    CompanyAcount: _self.fukuanList[0].CompanyAcount,
                    Remark: remark,
                    Passenger : passenger,
                    Picture:_self.picture.toString(),
                    Partner:_self.fukuanList[0].Partner,
                    PartnerAccount:_self.fukuanList[0].PartnerAccount,  
                    PartnerAccountModel:_self.fukuanList[0].PartnerAccountModel,
                    StateScreenshot:0
                }
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async commit(){
            const _self = this
            try {
                let list = []
                _self.multipleSelection2.forEach(item=>{
                    list.push({
                        ID:item.ID,
                        AmountUse:item.AmountUse,
                        Remark:item.Remark
                    })
                })
                _self.payCheck.Picture = _self.picture.toString()
                const params = {
                    list:list,
                    payment:_self.payCheck
                }
                console.log(params)
                await hotelPaymentInfoApi.paySave(params)
                _self.$message({
                    message: '付款成功',
                    type: 'success'
                })
                _self.$router.go(-1)
            }catch (e) {
                console.error(e)
                _self.$message.error('付款失败!!!')
            } 
        }

    }
}
</script>
<style lang="scss">
#Fukuan{
    .input{
        width:70%
    }
}
</style>

