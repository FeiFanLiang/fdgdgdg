<template lang="html">
<div id="Fukuan">
    <h1>收款合计</h1>
    <p style="text-align:right;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="roomAll">房费</el-checkbox>
    </p>
    <el-table :data="hejiPay" border style="width:100%" >
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="Passenger" label="入住人"></el-table-column>
        <el-table-column prop="AmountYingFu" label="应收金额"></el-table-column>
        <el-table-column label="房费">
            <template scope="scope">
                <el-checkbox-group v-model="roompayList" @change="roompay">
                    <div v-for="item in scope.row.PaymentInfo">
                        <p v-if="item.PaymentType === 0">
                            <span v-if="item.TypeID === 0">
                                <el-checkbox :label='item.ID' :key="item.ID" :checked="checked" v-if="item.State === 0">{{item.AmountUse}}</el-checkbox>
                                <span v-if="item.State === 1">{{item.AmountUse}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;√</span>
                            </span>
                        </p>
                    </div>
                </el-checkbox-group>
            </template>
        </el-table-column>
    </el-table>
    <el-card class="box-card">
        <el-form ref="payCheck" :model="payCheck" label-width="110px">
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
            <el-form-item label="支付时间" prop="PaymentDate">
                <el-date-picker v-model="payCheck.PaymentDate" type="date" placeholder="支付时间" class="input"></el-date-picker>
            </el-form-item>
            <el-form-item label="到账时间" prop="ExpectGetMoney">
                <el-date-picker v-model="payCheck.ExpectGetMoney" type="date" placeholder="到账时间" class="input"></el-date-picker>
            </el-form-item>
            <el-form-item label="支付方式" prop="PaymentModel">
                <el-select v-model="payCheck.PaymentModel" class="input">
                    <el-option v-for="item in PaymentModel" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付账户" prop="CompanyAcount">
                <el-select v-model="payCheck.CompanyAcount" class="input">
                    <el-option v-for="item in CompanyAcount" :key="item" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" v-model="payCheck.Remark" class="input"></el-input>
            </el-form-item>
        </el-form>
    </el-card>
    <el-button @click="commit">收款完成</el-button>
    <el-dialog title="添加款项截图" v-model="showImg" @close="resetForm('form')" size="full">
        <el-card class="box-card">
            <el-form ref="form" :model="form" label-width="110px">
                <el-form-item label="图片">
                    <el-upload :action="imgUrl" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
        </el-card>
    </el-dialog>
</div>
</template>
<script>
import { hotelsOrderApi,paymentCheckApi  } from 'api'
export default {
    data(){
        return{
            ID:'',
            imgUrl:'',
            dialogImageUrl: '',
            dialogVisible: false,
            checkAll: true,
            isIndeterminate: false,
            hejiPay:[],
            checked:true,
            roompayList:[],
            checkList:[],
            PaymentModel:[
                {label:'工商银行',value:0},
                {label:'青岛银行',value:1},
                {label:'中国银行',value:2},
                {label:'微信',value:3},
                {label:'支付宝',value:4}
            ],
            CompanyAcount:['惠和','奥讯','鸿源迅达'],
            payCheck:{
                PaymentNo: "",
                CompanyAcount: "",
                Amount: '',
                PaymentType: '',
                PaymentDate: "",
                PaymentModel: '',
                UserID: "",
                Currency: "",
                CreateDate: "",
                StateScreenshot: 0,
                StateSend: 0,
                Remark: "",
                State: 0,
                ExpectGetMoney: "",
                PaymentDate:''
            },
            showImg:false,
            form:{

            },
            fileList:[],
            fangfei:[],
            multipleSelection:[]
        }
    },
    created(){
        const _self = this
        _self.payClick()
    },
    methods:{
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        list(){
            for(let i in this.hejiPay){
                let a = this.hejiPay[i].PaymentInfo
                for(let j in a){
                    if(a[j].PaymentType == 0 && a[j].State == 0){
                        if(a[j].TypeID == 0){
                            this.fangfei.push(a[j].ID)
                        }
                    }
                }
            }
        },
        roompay(val){
            this.roompayList = val;
            this.account();
            let checkedCount = val.length;
            this.checkAll = checkedCount === this.fangfei.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.fangfei.length;
        },
        roomAll(event){
            this.roompayList = event.target.checked ? this.fangfei : [];
            this.isIndeterminate = false;
        },
        sum(m){
            let sum = 0
            for(let i in this.hejiPay){
                let a = this.hejiPay[i].PaymentInfo
                for(let j in a){
                    if(a[j].PaymentType == 0 && a[j].TypeID == 0 && a[j].State == 0){
                        for(let n in m){
                            if(a[j].ID == m[n]){
                                sum+=a[j].AmountUse
                            }
                        }
                    }
                }
            }
            return sum;
        },
        account(){
            const _self = this
            _self.payCheck.Amount = _self.sum(_self.roompayList)
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
        async payClick(){
            const _self = this;
            _self.multipleSelection = _self.$route.query.multipleSelection
            let select = []
            for(let i in _self.multipleSelection){
                select.push(_self.multipleSelection[i].ID)
            }
            const res = await hotelsOrderApi.payhj(select)
            _self.hejiPay = res.data.Data
            _self.list()
            let s = _self.randomString()
            let amount = 0
            for(let i in _self.hejiPay){
                let a = _self.hejiPay[i].PaymentInfo
                for(let j in a){
                    if(a[j].PaymentType == 0 && a[j].TypeID == 0 && a[j].State == 0){
                        amount+=a[j].AmountUse
                    }
                }
            }
            let date = new Date().Format('yyyy-MM-dd')
            _self.payCheck = {
                PaymentNo: 'S'+ s,
                CompanyAcount: "工行8758",
                Amount: amount,
                PaymentType: 0,
                PaymentModel: 1,
                PaymentDate: date,
                //UserID:'',_self.filters.labelVal === 2 ? _self.filters.linkPhone : '',
                Currency: _self.multipleSelection[0] ? _self.multipleSelection[0].CurrencyFuKuan : '',
                CreateDate: _self.hejiPay[0].PaymentInfo[0] ?  _self.hejiPay[0].PaymentInfo[0].CreateDate : '',
                StateScreenshot: _self.multipleSelection[0] ? _self.multipleSelection[0].StateScreenshot : '',
                //StateSend: 0,
                State: _self.hejiPay[0].PaymentInfo[0] ? _self.hejiPay[0].PaymentInfo[0].State : '',
                //ExpectSettlement: "2017-10-13 17:47:40",
                ExpectGetMoney: date,
                Remark: '',     
            }
        },
        async commit(){
            const _self = this
            try {
                let payment = _self.payCheck
                _self.checkList = _self.roompayList
                const params = {
                    payment:payment,
                    list:_self.checkList
                }
                const res = await hotelsOrderApi.paySave(params)
                _self.ID = res.data.Data.ID
                _self.imgUrl = 'http://192.168.10.95:8500/Hotel/Image'
                _self.$message({
                    message: '收款成功',
                    type: 'success'
                })
                _self.showImg = true
            }catch (e) {
                console.error(e)
                _self.$message.error('收款失败!!!')
            } 
        }
    }
}
</script>
<style lang="scss">
#Fukuan{
    .input{
        width:30%
    }
}
</style>