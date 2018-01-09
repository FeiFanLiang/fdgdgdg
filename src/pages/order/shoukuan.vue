<template lang="html">
<div id="Shoukuan">
    <h1>收款合计</h1>
    <el-table :data="fukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" ref="table" row-key="ID"
    @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" :reserve-selection="true"></el-table-column>
        <el-table-column label="订单编号" prop="HotelOrder.PlatOrderNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="酒店名称" prop="HotelOrder.HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
            <template scope="scope">
                <span v-if="typeof(scope.row.HotelOrder.StayDateStart) != 'undefined'">{{ scope.row.HotelOrder.StayDateStart.split(' ')[0] }}</span>/
                <span v-if="typeof(scope.row.HotelOrder.StayDateEnd) != 'undefined'">{{ scope.row.HotelOrder.StayDateEnd.split(' ')[0] }}</span>
            </template>
        </el-table-column>
        <el-table-column label="间/晚" prop="RoomNum">
            <template scope="scope">
            <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
            <span>{{ scope.row.HotelOrder.NightNum }}</span>
            </template>
        </el-table-column>
        <el-table-column label="入住人" prop="HotelOrder.Passenger"></el-table-column>
        <el-table-column label="预定时间" prop="HotelOrder.BookTime">
            <template scope="scope">
                <span v-if="typeof(scope.row.HotelOrder.BookTime) != 'undefined'">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="收款金额" prop="AmountUse">
            <!-- <template scope="scope">
                <input v-model="scope.row.AmountUse" style="width:90%" v-on:input="inputChange">
            </template> -->
        </el-table-column>
        <el-table-column label="备注" prop="Remark">
            <template scope="scope">
                <el-input v-model="scope.row.Remark" style="width:90%;margin:5px;" type="textarea"></el-input>
            </template>
        </el-table-column>
    </el-table>
    <el-card class="box-card">
        <el-form ref="payCheck" v-model="payCheck" label-width="110px">
            <el-form-item label="财务编号" prop="PaymentNo">
                <el-input placeholder="财务编号" v-model="payCheck.PaymentNo" class="input"></el-input>
            </el-form-item>
            <el-form-item label="合计" prop="Amount">
                <el-input placeholder="合计" v-model="payCheck.Amount" class="input"></el-input>
                <el-button @click="account">计算</el-button>
            </el-form-item>
            <el-form-item label="货币 类型" prop="Currency">
                <el-input placeholder="货币类型" v-model="payCheck.Currency" class="input"></el-input>
            </el-form-item>
            <el-form-item label="到账时间" prop="ExpectGetMoney">
                <el-date-picker v-model="payCheck.ExpectGetMoney" type="date" placeholder="支付时间" class="input"></el-date-picker>
            </el-form-item>
            <el-form-item label="结算日期" prop="ExpectSettlement">
                <el-date-picker v-model="payCheck.ExpectSettlement" type="date" placeholder="结算日期" class="input"></el-date-picker>
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
                    <el-option v-for="item in CompanyAcount" :key="item.ID" :label="item.AccountName" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" v-model="payCheck.Remark" class="input"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card class="box-card">
        <el-form label-width="110px">
            <el-form-item label="添加截图">
                <el-upload :action="imgUrl" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="imgSuccess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
    </el-card>
    <!--<el-button @click="commit">收款完成</el-button>-->
    <el-button @click="commit2">收款未到账</el-button>
    <el-button @click="commit3">收款已到账</el-button>
</div>
</template>
<script>
import { hotelPaymentInfoApi,payCompanyApi  } from 'api'
import path from 'api/api'

export default {
    data() {
        return {
            multipleSelection:[],
            fukuanList: [],
            loading:false,
            multipleSelection2: [],
            CompanyAcount:[],
            payCheck:{
                PaymentNo: '',
                Amount: '',
                Currency: '',
                ExpectGetMoney: '',
                ExpectGetMoney: '',
                CompanyAcount: '',
                PaymentModel: '', 
                Remark: '',
                PaymentType:'',
                Picture:''
            },
            State:'',
            imgUrl:'',
            dialogImageUrl: '',
            dialogVisible: false,
            picture:[]
        }
    },
    mounted(){
        this.fetchData()
        this.getPayCompany()
        this.imgUrl = path.uploadUrl
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
        async getPayCompany(){
            const res = await payCompanyApi.list()
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
        async fetchData(currentPage,pageSize) {
            const _self = this
            _self.loading = true
            _self.showButton = false
            try {
                _self.multipleSelection = _self.$route.query.multipleSelection
                let select = []
                for(let i in _self.multipleSelection){
                    select.push(_self.multipleSelection[i].ID)
                }
                const res = await hotelPaymentInfoApi.payhj(select)
                _self.fukuanList = res.data.Data
                console.log(_self.fukuanList)
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
                // for(let a in _self.multipleSelection){
                //     remark+='【'+'\n'
                //         +'酒店预定号'+':'+_self.multipleSelection[a].HotelOrder.HotelBookingNo+','+'\n'
                //         +'酒店确定号'+':'+_self.multipleSelection[a].HotelOrder.HotelBookingNoNeed+','+'\n'
                //         +'客人姓名'+':'+_self.multipleSelection[a].HotelOrder.Passenger+'\n'
                //         +'】'+'\n'
                // }
                _self.payCheck = {
                    PaymentNo: 'S'+ string,
                    Amount: amount,
                    PaymentType: 0,
                    ExpectGetMoney: _self.fukuanList[0].ExpectGetMoney,
                    Currency: _self.fukuanList[0].Currency,
                    ExpectSettlement: _self.fukuanList[0].ExpectSettlement,
                    CompanyAcount: _self.fukuanList[0].CompanyAcount,
                    Remark: remark,
                    Picture:_self.picture.toString()     
                }
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        commit2(){
            this.State = 2
            this.commit()
        },
        commit3(){
            this.State = 3
            this.commit()
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
                _self.payCheck.State = _self.State
                const params = {
                    list:list,
                    payment:_self.payCheck
                }
                console.log(params)
                await hotelPaymentInfoApi.collectionSave(params)
                _self.$message({
                    message: '收款成功',
                    type: 'success'
                })
                _self.$router.go(-1)
            }catch (e) {
                console.error(e)
                _self.$message.error('收款失败!!!')
            } 
        }

    }
}
</script>
<style lang="scss">
#Shoukuan{
    .input{
        width:40%
    }
}
</style>

