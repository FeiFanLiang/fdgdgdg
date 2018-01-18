<template>
<div id="ShenheSave">
    <el-button @click="returns()">返回</el-button>
    <p>*注意：对冲款为正数则留作对冲（预存），为负数则使用对冲（预存款）</p>
    <el-table :data="sheheSaveList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column label="操作">
            <template scope="scope">
                <i class="el-icon-delete" v-if="scope.row.ID==0" @click="remove(scope.$index)"></i>
            </template>
        </el-table-column>
        <el-table-column prop="PaymentNo" label="编号"></el-table-column>
        <el-table-column prop="AmountUse" label="实收/付" width="120">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.AmountUse}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.AmountUse"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="YingShouFu" label="应收/付" width="120">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.YingShouFu}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.YingShouFu"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="DuiChong" label="对冲" width="120">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.DuiChong}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.DuiChong"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="PaymentType" label="类型" width="115">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    <!-- <span v-if="scope.row.PaymentType == 0">收款</span>
                    <span v-if="scope.row.PaymentType == 1">付款</span> -->
                    {{scope.row.PaymentType}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-select v-model="scope.row.PaymentType" clearable placeholder="请选择">
                        <el-option v-for="item in PaymentType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="State" label="状态">
            <template scope="scope">
                <span v-if="scope.row.State == 0">未处理</span>
                <span v-if="scope.row.State == 1">已处理</span>
            </template>
        </el-table-column>
        <el-table-column prop="TypeID" label="项目" width="115">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    <!-- <span v-if="scope.row.TypeID == 0">酒店</span>
                    <span v-if="scope.row.TypeID == 1">门票</span>
                    <span v-if="scope.row.TypeID == 2">餐费</span>
                    <span v-if="scope.row.TypeID == 3">车票</span> -->
                    {{scope.row.TypeID}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-select v-model="scope.row.TypeID" clearable placeholder="请选择">
                        <el-option v-for="item in TypeID" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="StateCheck" label="对账状态">
            <template scope="scope">
                <span v-if="scope.row.State == 0">未对账</span>
                <span v-if="scope.row.State == 1">已对账</span>
            </template>
        </el-table-column>
        <el-table-column prop="CompanyAcount" label="公司账号" show-overflow-tooltip width="130">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.CompanyAcount}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.CompanyAcount"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="PaymentDate" label="收付时间" show-overflow-tooltip width="190">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.PaymentDate}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-date-picker v-model="scope.row.PaymentDate" type="datetime" placeholder="请选择" style="width:80%"></el-date-picker>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="PaymentModel" label="收付方式"></el-table-column>
        <el-table-column prop="Currency" label="货币类型" width="90">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.Currency}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.Currency"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="PartnerAccount" label="对方账号" show-overflow-tooltip width="120">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.PartnerAccount}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.PartnerAccount"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="Partner" label="对方账户名" show-overflow-tooltip width="120">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.Partner}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.Partner"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="PartnerAccountModel" label="对方开户行" width="120">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.PartnerAccountModel}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.PartnerAccountModel"></el-input>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="DuiChong" label="是否对冲">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    <span v-if="scope.row.DuiChong == 0">否</span>
                    <span v-if="scope.row.DuiChong == 1">是</span>
                </p>
                <p v-if="scope.row.ID == 0">
                    
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="ExpectSettlement" label="预计结算日" show-overflow-tooltip width="190">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.ExpectSettlement}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-date-picker v-model="scope.row.ExpectSettlement" type="datetime" placeholder="请选择" style="width:80%"></el-date-picker>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="ExpectGetMoney" label="预计到款日" show-overflow-tooltip width="190">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.ExpectGetMoney}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-date-picker v-model="scope.row.ExpectGetMoney" type="datetime" placeholder="请选择" style="width:80%"></el-date-picker>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="CreateDate" label="创建日期" show-overflow-tooltip width="190">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.CreateDate}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-date-picker v-model="scope.row.CreateDate" type="datetime" placeholder="请选择" style="width:80%"></el-date-picker>
                </p>
            </template>
        </el-table-column>
        <el-table-column prop="Remark" label="备注" width="200">
            <template scope="scope">
                <p v-if="scope.row.ID != 0">
                    {{scope.row.Remark}}
                </p>
                <p v-if="scope.row.ID == 0">
                    <el-input v-model="scope.row.Remark" type="textarea"></el-input>
                </p>
            </template>
        </el-table-column>
    </el-table>
    <div style="margin-top:20px;">
        <el-button @click="addShenhe()">添加</el-button>
        <el-button @click="saveShenhe()">保存</el-button>
    </div>
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
            PaymentType:[
                {
                    label:'收款',
                    value:'0'
                },
                {
                    label:'付款',
                    value:'1'
                },
            ],
            TypeID:[
                {
                    label:'酒店',
                    value:'0'
                },
                {
                    label:'门票',
                    value:'1'
                },
                {
                    label:'餐费',
                    value:'2'
                },
                {
                    label:'车费',
                    value:'3'
                }
            ],
            DuiChong:[
                {
                    label:true,
                    value:1
                },
                {
                    label:false,
                    value:0
                }
            ],
            AccountList:[],
            CompanyAcount:'',
            Partner:'',
            PartnerAccount:'',
            PartnerAccountModel:''
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
        async fetchData(){
            const _self = this
            _self.loading = true
            try{
                const res = await hotelPaymentInfoApi.getPaymentInfo(_self.POrderID)
                _self.sheheSaveList = res.data.Data
                _self.sheheSaveList.forEach(item => {
                    if(item.PaymentType == 0){
                        item.PaymentType = '收款'
                    }
                    if(item.PaymentType == 1){
                        item.PaymentType = '付款'
                    }
                    switch(item.TypeID)
                    {
                        case 0: item.TypeID = '酒店' 
                        break;
                        case 1: item.TypeID = '门票' 
                        break;
                        case 2: item.TypeID = '餐费' 
                        break;
                        case 3: item.TypeID = '车费' 
                        break;
                        default: item.TypeID = ''
                    }
                });
                _self.loading = false
            }catch(e){
                _self.loading = false
                console.log(e)
            }
            
        },
        addShenhe(){
            const _self = this
           let form = {
                'State': 0,
                'StateCheck': 0,
                'PaymentNo': '',
                'AmountUse': 0,
                'PaymentType': '',
                'TypeID': '',
                'CreateDate': '',
                'PaymentDate': '',
                'PaymentModel': '',
                'Currency': 'CNY',
                'ExpectSettlement': '',
                'ExpectGetMoney': '',
                'DuiChong': 0,
                'ID': 0,
                "HotelOrderId": _self.POrderID,
                'Partner':_self.Partner,
                'PartnerAccount':_self.PartnerAccount,
                'PartnerAccountModel':_self.PartnerAccountModel,
                'CompanyAcount':_self.CompanyAcount,
            }
            _self.sheheSaveList.push(form)
        },
        remove($index){
            this.sheheSaveList.splice($index, 1);
        },
        async saveShenhe(){
            const _self = this
            try {
                _self.sheheSaveList.forEach(item => {
                    if(item.PaymentType == '收款'){
                        item.PaymentType = 0
                    }
                    if(item.PaymentType == '付款'){
                        item.PaymentType = 1
                    }
                    if(item.TypeID == '酒店'){
                        item.TypeID = 0
                    }
                    if(item.TypeID == '门票'){
                        item.TypeID = 1
                    }
                    if(item.TypeID == '餐费'){
                        item.TypeID = 2
                    }
                    if(item.TypeID == '车费'){
                        item.TypeID = 3
                    }
                });
                console.log(_self.sheheSaveList)
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