<template lang="html">
<div id="Fukuan">
    <h1>付款合计</h1>
    <div style="text-align:right;">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="roomAll">房费</el-checkbox>
        <el-checkbox :indeterminate="isIndeterminate1" v-model="checkAll1" @change="ticketAll">门票</el-checkbox>
        <el-checkbox :indeterminate="isIndeterminate2" v-model="checkAll2" @change="mealAll">餐费</el-checkbox>
    </div>
    <el-table :data="hejiPay" border style="width:100%" row-key="ID">
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="Passenger" label="入住人"></el-table-column>
        <el-table-column prop="AmountYingFu" label="应付金额"></el-table-column>
        <el-table-column label="房费">
            <template scope="scope">
                <el-checkbox-group v-model="roompayList" @change="roompay">
                    <div v-for="item in scope.row.PaymentInfo">
                        <p v-if="item.PaymentType === 1 && item.TypeID === 0">
                            <span v-if="item.TypeID === 0">
                                <el-checkbox :label='item.ID'  :key="item.ID" :checked="checked" v-if="item.State === 0">{{item.AmountUse}}</el-checkbox>
                                <span v-if="item.State === 1">{{item.AmountUse}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;√</span>
                            </span>
                        </p>
                    </div>
                </el-checkbox-group>
            </template>
        </el-table-column>
        <el-table-column label="门票">
            <template scope="scope">
                <el-checkbox-group v-model="ticketList" @change="ticket">
                    <div v-for="item in scope.row.PaymentInfo">
                        <p v-if="item.PaymentType === 1">
                            <span v-if="item.TypeID === 2">
                                <el-checkbox :label='item.ID' v-if="item.State === 0" :key="item.ID" :checked="checked">{{item.AmountUse}}</el-checkbox>
                                <span v-if="item.State === 1">{{item.AmountUse}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;√</span>
                            </span>
                        </p>
                    </div>
                </el-checkbox-group>
            </template>
        </el-table-column>
        <el-table-column label="餐费">
            <template scope="scope">
                <el-checkbox-group v-model="mealpayList" @change="mealpay">
                    <div v-for="item in scope.row.PaymentInfo">
                        <p v-if="item.PaymentType === 1">
                            <span v-if="item.TypeID === 1">
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
                    <el-option v-for="item in PaymentModel" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="支付账户" prop="CompanyAcount">
                <el-select v-model="payCheck.CompanyAcount" class="input">
                    <el-option v-for="item in CompanyAcount" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" v-model="payCheck.Remark" class="input"></el-input>
            </el-form-item>
            <!-- <el-form-item label="款项类别" prop="PaymentTag">
                <el-radio-group v-model="payCheck.PaymentTag">
                    <el-radio :label="0">正常</el-radio>
                    <el-radio :label="1">延期</el-radio>
                    <el-radio :label="2">改期</el-radio>
                    <el-radio :label="3">退票</el-radio>
                </el-radio-group>
            </el-form-item> -->
        </el-form>
    </el-card>
    <el-button @click="commit">付款完成</el-button>
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
            checkAll1: true,
            isIndeterminate1: false,
            checkAll2: true,
            isIndeterminate2: false,
            checkAll3: true,
            isIndeterminate3: false,
            hejiPay:[],
            checked:true,
            roompayList:[],
            ticketList:[],
            mealpayList:[],
            checkList:[],
            PaymentModel:[
                {label:'工商银行',value:0},
                {label:'青岛银行',value:1},
                {label:'中国银行',value:2},
                {label:'微信',value:3},
                {label:'支付宝',value:4}
            ],
            CompanyAcount:[
                {label:'惠和',value:0},
                {label:'奥讯',value:1},
                {label:'鸿源迅达',value:2}
            ],
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
            multipleSelection:[],
            showImg:false,
            form:{

            },
            fileList:[],
            fangfei:[],
            menpiao:[],
            canfei:[],
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
                    if(a[j].PaymentType == 1 && a[j].State == 0){
                        if(a[j].TypeID == 0){
                            this.fangfei.push(a[j].ID)
                        }
                        if(a[j].TypeID == 2){
                            this.menpiao.push(a[j].ID)
                        }
                        if(a[j].TypeID == 1){
                            this.canfei.push(a[j].ID)
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
        ticket(val){
            this.ticketList = val;
            this.account();
            let checkedCount = val.length;
            this.checkAll1 = checkedCount === this.menpiao.length;
            this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.menpiao.length;
        },
        mealpay(val){
            this.mealpayList = val;
            this.account();
            let checkedCount = val.length;
            this.checkAll2 = checkedCount === this.canfei.length;
            this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.canfei.length;
        },
        roomAll(event){
            this.roompayList = event.target.checked ? this.fangfei : [];
            this.isIndeterminate = false;
        },
        ticketAll(event){
            this.ticketList = event.target.checked ? this.menpiao : [];
            this.isIndeterminate1 = false;
        },
        mealAll(event){
            this.mealpayList = event.target.checked ? this.canfei : [];
            this.isIndeterminate2 = false;
        },
        sum(m){
            let sum = 0
            for(let i in this.hejiPay){
                let a = this.hejiPay[i].PaymentInfo
                for(let j in a){
                    if(a[j].PaymentType == 1 && a[j].State == 0){
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
            let arr = []
            _self.checkList = arr.concat(_self.roompayList, _self.ticketList,_self.mealpayList)
            _self.payCheck.Amount = _self.sum(_self.checkList)
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
            console.log(_self.hejiPay)
            _self.list()
            let s = _self.randomString()
            let amount = 0
            for(let i in _self.hejiPay){
                let a = _self.hejiPay[i].PaymentInfo
                for(let j in a){
                    if(a[j].PaymentType == 1 && a[j].State == 0){
                        amount+=a[j].AmountUse
                    }
                }
            }
            let remark = ''
            for(let a in _self.multipleSelection){
                remark+='【'+'\n'
                    +'酒店预定号'+':'+_self.multipleSelection[a].HotelBookingNo+','+'\n'
                    +'酒店确定号'+':'+_self.multipleSelection[a].HotelBookingNoNeed+','+'\n'
                    +'客人姓名'+':'+_self.multipleSelection[a].Passenger+'\n'
                    +'】'+'\n'
            }
            let date = new Date().Format('yyyy-MM-dd')
            _self.payCheck = {
                PaymentNo: 'F'+ s,
                CompanyAcount: "工行8758",
                Amount: amount,
                PaymentType: 1,
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
                Remark: remark,     
            }
        },
        async commit(){
            const _self = this
            try {
                let payment = _self.payCheck
                let arr = []
                _self.checkList = arr.concat(_self.roompayList, _self.ticketList,_self.mealpayList)
                const params = {
                    payment:payment,
                    list:_self.checkList
                }
                const res = await hotelsOrderApi.paySave(params)
                _self.ID = res.data.Data.ID
                // _self.imgUrl = 'http://liukai.iok.la/Hotel/HotelOrderPicture/UploadPic/'
                // _self.upLoadData = {
                //     TypeID: 1,
                //     ID: this.ID
                // }
                _self.imgUrl = 'http://192.168.10.95:8500/Hotel/Image'
                _self.$message({
                    message: '付款成功',
                    type: 'success'
                })
                _self.showImg = true
            }catch (e) {
                console.error(e)
                _self.$message.error('付款失败!!!')
            } 
        },
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