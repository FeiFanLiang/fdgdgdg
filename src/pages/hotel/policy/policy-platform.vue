<template>
<div id="PolicyPlatForm">
    <el-button type="primary" @click="addPolicy()">添加</el-button>
    <el-table :data="policyPlatformList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column prop="Platform.PlatName" label="平台名称"></el-table-column>
        <el-table-column prop="Account" label="用户名"></el-table-column>
        <el-table-column prop="Password" label="密码"></el-table-column>
        <el-table-column prop="ChannelType" label="渠道限定"></el-table-column>
        <el-table-column label="操作" width=100>
            <template scope="scope">
                <el-button size="small" @click="editPolicy(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="text-align:center;margin:10px;">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title=title v-model="dialogShow" size="full">
        <el-form ref="form" :model="form" label-width="110px">
            <el-row :gutter="24" style="margin:10px;">
                <el-col :span="6">
                    <el-form-item label="平台名称" prop="PlatformID">
                        <el-select v-model="form.PlatformID" clearable placeholder="请选择">
                            <el-option v-for="item in PlatformID" :key="item.ID" :label="item.PlatName" :value="item.ID"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="用户名" prop="Account">
                        <el-input placeholder="请输入用户名" v-model="form.Account"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="密码" prop="Password">
                        <el-input placeholder="请输入密码" v-model="form.Password"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="渠道限定" prop="ChannelType">
                        <el-input placeholder="请输入渠道限定" v-model="form.ChannelType"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-collapse  style="margin:10px;">      <!-- accordion -->
                <!-- 、、、、、、、、、、、、、收款政策、、、、、、、、、、、、、、、、 -->
                <el-collapse-item title="收款政策">
                    <el-form ref="ReceiptForm" :model="ReceiptForm" label-width="110px" :rules="rules">
                        <el-form-item label="拆分按天记账" prop="SplitDay">
                            <el-switch on-text="是" off-text="否" :on-value="1" :off-value="0" v-model="ReceiptForm.SplitDay"></el-switch>
                        </el-form-item>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="名称" prop="Name">
                                    <el-input placeholder="请输入名称" v-model="ReceiptForm.Name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="用户名" prop="UserName">
                                    <el-input placeholder="请输入用户名" v-model="ReceiptForm.UserName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="密码" prop="Password">
                                    <el-input placeholder="请输入密码" v-model="ReceiptForm.Password"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="我方签约公司" prop="Company">
                                    <el-select v-model="ReceiptForm.Company" clearable placeholder="请选择">
                                        <el-option v-for="item in Company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="收款周期" prop="PayPeriod">
                                    <el-select v-model="ReceiptForm.PayPeriod" clearable placeholder="请选择">
                                        <el-option v-for="item in PayPeriod" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="收款周期T+N" prop="PayPeriodTplusN">
                                    <el-input v-model="ReceiptForm.PayPeriodTplusN" type="number"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="基于结算日" prop="SettlementUnit">
                                    <el-select v-model="ReceiptForm.SettlementUnit" clearable placeholder="请选择">
                                        <el-option v-for="item in SettlementUnit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="基于结算日T+N" prop="SettlementUnitTplusN">
                                    <el-input v-model="ReceiptForm.SettlementUnitTplusN" type="number"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                        <!-- 我方对方财务信息 -->
                        <el-form-item label="我方财务信息" prop="PayCompanyID">
                            <el-select v-model="ReceiptForm.PayCompanyID" clearable placeholder="请选择" @change="PayCompany">
                                <el-option v-for="item in PayCompanyID" :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="账户名" prop="AccountName">
                                    <el-input placeholder="请输入账户名" v-model="form2.AccountName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="账号" prop="AccountNum">
                                    <el-input placeholder="请输入账号" v-model="form2.AccountNum"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="银行" prop="Bank">
                                    <el-input placeholder="请输入银行" v-model="form2.Bank"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="简称" prop="ShortName2">
                                    <el-input placeholder="请输入简称" v-model="form2.ShortName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                        <!-- 对方对方财务信息 -->
                        <el-form ref="ReceiptCompany" :model="ReceiptCompany" label-width="110px" :rules="rules2">
                            <el-form-item label="对方财务信息"></el-form-item>
                            <el-row :gutter="24">
                                <el-col :span="6">
                                    <el-form-item label="账户名" prop="AccountName">
                                        <el-input placeholder="请输入账户名" v-model="ReceiptCompany.AccountName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="账号" prop="AccountNum">
                                        <el-input placeholder="请输入账号" v-model="ReceiptCompany.AccountNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="银行" prop="Bank">
                                        <el-input placeholder="请输入银行" v-model="ReceiptCompany.Bank"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="简称" prop="ShortName">
                                        <el-input placeholder="请输入简称" v-model="ReceiptCompany.ShortName"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="财务联系人" prop="FinanceLinkMan">
                                    <el-input placeholder="请输入财务联系人" v-model="ReceiptForm.FinanceLinkMan"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="财务联系电话" prop="FinancePhoneNum">
                                    <el-input placeholder="请输入财务联系电话" v-model="ReceiptForm.FinancePhoneNum"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                        <!-- 截图。。。备注 -->
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="备注1" prop="Remark1">
                                    <el-input type="textarea" v-model="ReceiptForm.Remark1" autosize></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="备注2" prop="Remark2">
                                    <el-input type="textarea" v-model="ReceiptForm.Remark2" autosize></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="截图信息" prop="PolicyImage">
                            <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <!-- 、、、、、、、、、、、、、付款政策、、、、、、、、、、、、、、、、 -->
                <el-collapse-item title="付款政策">
                    <el-form ref="PaymentForm" :model="PaymentForm" label-width="110px" :rules="rules">
                        <el-form-item label="拆分按天记账" prop="SplitDay">
                            <el-switch on-text="是" off-text="否" :on-value="1" :off-value="0" v-model="PaymentForm.SplitDay"></el-switch>
                        </el-form-item>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="名称" prop="Name">
                                    <el-input placeholder="请输入名称" v-model="PaymentForm.Name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="用户名" prop="UserName">
                                    <el-input placeholder="请输入用户名" v-model="PaymentForm.UserName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="密码" prop="Password">
                                    <el-input placeholder="请输入密码" v-model="PaymentForm.Password"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="我方签约公司" prop="Company">
                                    <el-select v-model="PaymentForm.Company" clearable placeholder="请选择">
                                        <el-option v-for="item in Company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="付款周期" prop="PayPeriod">
                                    <el-select v-model="PaymentForm.PayPeriod" clearable placeholder="请选择">
                                        <el-option v-for="item in PayPeriod" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="付款周期T+N" prop="PayPeriodTplusN">
                                    <el-input v-model="PaymentForm.PayPeriodTplusN" type="number"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="基于结算日" prop="SettlementUnit">
                                    <el-select v-model="PaymentForm.SettlementUnit" clearable placeholder="请选择">
                                        <el-option v-for="item in SettlementUnit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="基于结算日T+N" prop="SettlementUnitTplusN">
                                    <el-input v-model="PaymentForm.SettlementUnitTplusN" type="number"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                        <!-- 我方对方财务信息 -->
                        <el-form-item label="我方财务信息" prop="PayCompanyID">
                            <el-select v-model="PaymentForm.PayCompanyID" clearable placeholder="请选择" @change="PayCompany2">
                                <el-option v-for="item in PayCompanyID" :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="账户名" prop="AccountName">
                                    <el-input placeholder="请输入账户名" v-model="form3.AccountName"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="账号" prop="AccountNum">
                                    <el-input placeholder="请输入账号" v-model="form3.AccountNum"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="银行" prop="Bank">
                                    <el-input placeholder="请输入银行" v-model="form3.Bank"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="简称" prop="ShortName3">
                                    <el-input placeholder="请输入简称" v-model="form3.ShortName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                        <!-- 对方对方财务信息 -->
                        <el-form ref="ReceiptCompany2" :model="ReceiptCompany2" label-width="110px" :rules="rules2">
                            <el-form-item label="对方财务信息"></el-form-item>
                            <el-row :gutter="24">
                                <el-col :span="6">
                                    <el-form-item label="账户名" prop="AccountName">
                                        <el-input placeholder="请输入账户名" v-model="ReceiptCompany2.AccountName"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="账号" prop="AccountNum">
                                        <el-input placeholder="请输入账号" v-model="ReceiptCompany2.AccountNum"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="银行" prop="Bank">
                                        <el-input placeholder="请输入银行" v-model="ReceiptCompany2.Bank"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="简称" prop="ShortName">
                                        <el-input placeholder="请输入简称" v-model="ReceiptCompany2.ShortName"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="财务联系人" prop="FinanceLinkMan">
                                    <el-input placeholder="请输入财务联系人" v-model="PaymentForm.FinanceLinkMan"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-form-item label="财务联系电话" prop="FinancePhoneNum">
                                    <el-input placeholder="请输入财务联系电话" v-model="PaymentForm.FinancePhoneNum"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                        <!-- 截图。。。备注 -->
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="备注1" prop="Remark1">
                                    <el-input type="textarea" v-model="PaymentForm.Remark1" autosize></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="备注2" prop="Remark2">
                                    <el-input type="textarea" v-model="PaymentForm.Remark2" autosize></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="截图信息" prop="PolicyImage">
                            <UploadImage :images="imageList2" @onRemove="handleRemove2" @onSuccess="handleSuccess2"></UploadImage>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
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
import UploadImage from 'components/upload-image'
export default {
  components: {
    UploadImage
  },
  data(){
      return{
        imageList: [],
        imageList2: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        policyPlatformList:[],
        loading:false,
        dialogShow:false,
        isEditable:true,
        title:'',
        PlatformID:[],
        form:{
            Payment:{},
            Receipt:{}
        },
        ReceiptForm:{
            PolicyImage:''
        },
        PaymentForm:{    
        },
        form2:{
            AccountName: '',
            AccountNum: '',
            Bank: '',
            ShortName: '',
        },
        form3:{
            AccountName: '',
            AccountNum: '',
            Bank: '',
            ShortName: '',
        },
        ReceiptCompany:{
        },
        ReceiptCompany2:{
        },
        PayCompanyID:[],
        Company:[
            {
                label:'澳迅',
                value:'澳迅'
            },
            {
                label:'鸿源',
                value:'鸿源'
            },
            {
                label:'惠和',
                value:'惠和'
            },
            {
                label:'济南美票',
                value:'济南美票'
            },
            {
                label:'青岛美票',
                value:'青岛美票'
            }
        ],
        PayPeriod:[
            {
                label:'预付款',
                value:1
            },
            {
                label:'单结',
                value:2
            },
            {
                label:'日结',
                value:3
            },
            {
                label:'月结',
                value:4
            },
            {
                label:'半月结',
                value:5
            },
            {
                label:'周结',
                value:6
            },
            {
                label:'其他',
                value:0
            },
        ],
        SettlementUnit:[
            {
                label:'订单日期',
                value:0
            },
            {
                label:'入住日期',
                value:1
            },
            {
                label:'离店日期',
                value:2
            },
            {
                label:'单笔入住日期',
                value:3
            },
            {
                label:'单笔结算日期',
                value:4
            },
        ],
        rules:{
            PayCompanyID: [
                { type: 'number', required: true, message: '请选择我方财务信息', trigger: 'change' }
            ],
            PayPeriod: [
                { type: 'number', required: true, message: '请选择付款周期', trigger: 'change' }
            ],
            SettlementUnit: [
                { type: 'number', required: true, message: '请选择基于结算日', trigger: 'change' }
            ],
        },
        rules2:{
            AccountName: [
                { required: true, message: '请输入对方财务信息--账户名', trigger: 'blur' }
            ],
            AccountNum: [
                { required: true, message: '请输入对方财务信息--账号', trigger: 'blur' }
            ],
            Bank: [
                { required: true, message: '请输入对方财务信息--银行', trigger: 'blur' }
            ]
        },

      }
  },
  created(){
    this.fetchData()
    this.getPlatform()
    this.getPayCompany()
  },
  watch:{
    ReceiptForm(val){
        if(typeof(val.PayCompanyID)!='undefined'){
            this.PayCompany(val.PayCompanyID)
        }
    },
    PaymentForm(val){
        if(typeof(val.PayCompanyID)!='undefined'){
            this.PayCompany2(val.PayCompanyID)
        }
    }
  },
  methods:{
    async getImageList(list,list2) {
        if (list) {
            const images = list.split(',')
            if (Array.isArray(images)) {
                this.imageList = images
            }
        }
        if(list2){
            const images2 = list2.split(',')
            if (Array.isArray(images2)) {
                this.imageList2 = images2
            }
        }
    },
    async handleSuccess(response, file, fileList) {
        if (!response) {
            this.$message.error('上传失败,请重新上传')
            return false
        }
        this.imageList.push(response)
        let f = this.imageList
        this.ReceiptForm.PolicyImage = f.toString()
    },
    handleRemove(index,file, fileList) {
        this.imageList.splice(index, 1)
        let f = this.imageList
        this.ReceiptForm.PolicyImage = f.toString()
    },
    async handleSuccess2(response, file, fileList) {
        if (!response) {
            this.$message.error('上传失败,请重新上传')
            return false
        }
        this.imageList2.push(response)
        let f = this.imageList2
        this.PaymentForm.PolicyImage = f.toString()
    },
    handleRemove2(index,file, fileList) {
        this.imageList2.splice(index, 1)
        let f = this.imageList2
        this.PaymentForm.PolicyImage = f.toString()
    },
    async getPlatform(){
        const res = await policyApi.getPlatform()
        this.PlatformID = res.data
    },
    async getPayCompany(){
       const res = await policyApi.getPayCompany()
       this.PayCompanyID = res.data.Data
    },
    async PayCompany(value){
        const _self = this
        if(typeof(value) == 'number'){
            const res = await policyApi.getPayCompanyID(value)
            _self.form2.ShortName = res.data.Data.ShortName
            _self.form2.AccountName = res.data.Data.AccountName
            _self.form2.AccountNum = res.data.Data.AccountNum
            _self.form2.Bank = res.data.Data.Remark
        }else{
            this.form2.ShortName = ''
            this.form2.AccountName = ''
            this.form2.AccountNum = ''
            this.form2.Bank = ''
        }
    },
    async PayCompany2(value){
        const _self = this
        if(typeof(value) == 'number'){
            const res = await policyApi.getPayCompanyID(value)
            _self.form3.ShortName = res.data.Data.ShortName
            _self.form3.AccountName = res.data.Data.AccountName
            _self.form3.AccountNum = res.data.Data.AccountNum
            _self.form3.Bank = res.data.Data.Remark
        }else{
            this.form3.ShortName = ''
            this.form3.AccountName = ''
            this.form3.AccountNum = ''
            this.form3.Bank = ''
        }
    },
    handleSizeChange(val) {
        this.pageSize = val
        this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
        this.currentPage = val
        this.fetchData(this.currentPage)
    },
    async fetchData(pageSize,currentPage){
        const _self = this
        _self.loading = true
        _self.currentPage = currentPage || _self.currentPage
        _self.pageSize = pageSize || _self.pageSize
        const options = {
            pageIndex: _self.currentPage,
            pageSize: _self.pageSize,
            order: 'ID'
        }
        try{
            const res = await policyApi.getPolicyPlatform(options)
            _self.policyPlatformList = res.data.Data
            _self.count = res.data.Count
            _self.loading = false
        }catch(e){
            console.log(e)
            _self.loading = false
        }
    },
    resetForm(){
        const _self = this
        _self.form = {
        }
        _self.ReceiptForm = {
        }
        _self.ReceiptCompany = {
        }
        _self.form2 = {
            AccountName: '',
            AccountNum: '',
            Bank: '',
            ShortName: '',
        }
        _self.PaymentForm = {
        }
        _self.ReceiptCompany2 = {
        }
        _self.form3 = {
            AccountName: '',
            AccountNum: '',
            Bank: '',
            ShortName: '',
        }
        _self.imageList = []
        _self.imageList2 = []
        try{
            _self.$refs['ReceiptForm'].resetFields()
            _self.$refs['ReceiptCompany'].resetFields()
            _self.$refs['PaymentForm'].resetFields()
            _self.$refs['ReceiptCompany2'].resetFields()
        }catch(e){
            console.log(e)
        }
    },
    addPolicy(){
        const _self = this
        _self.title = '平台政策添加'
        _self.resetForm()
        _self.dialogShow  =true
    },
    async editPolicy(row){
        const _self = this
        _self.title = '平台政策编辑'
        _self.resetForm()
        const res = await policyApi.getPolicyPlatformID(row.ID)
        if(typeof(res.data.Data.Receipt) != 'undefined'){
            _self.ReceiptForm = res.data.Data.Receipt
            _self.ReceiptCompany = res.data.Data.Receipt.ReceiptCompany
            _self.getImageList(res.data.Data.Receipt.PolicyImage,'')
        }
        if(typeof(res.data.Data.Payment) != 'undefined'){
            _self.PaymentForm = res.data.Data.Payment
            _self.ReceiptCompany2 = res.data.Data.Payment.ReceiptCompany
            _self.getImageList('',res.data.Data.Payment.PolicyImage)
        }
        _self.form = res.data.Data
        _self.dialogShow  =true
    },
    async submit(){
        const _self = this
        this.$refs['ReceiptForm'].validate(async valid => {  
        this.$refs['ReceiptCompany'].validate(async valid => {
        this.$refs['PaymentForm'].validate(async valid => {  
        this.$refs['ReceiptCompany2'].validate(async valid => {
        if (valid) {
            try{               
                if(_self.imageList2.length != 0){
                    _self.form.Payment.PolicyImage = _self.imageList2.toString()
                }
                if(_self.imageList.length != 0){
                    _self.form.Receipt.PolicyImage = _self.imageList.toString()
                }
                _self.form.Receipt = _self.ReceiptForm
                _self.form.Receipt.ReceiptCompany = _self.ReceiptCompany
                _self.form.Payment = _self.PaymentForm
                _self.form.Payment.ReceiptCompany = _self.ReceiptCompany2
                _self.isEditable = false
                
                if (_self.form.ID) {
                    console.log(_self.form)
                    await policyApi.editPlatformPolicy(_self.form.ID,_self.form)
                } else {
                    console.log(_self.form)
                    await policyApi.addPlatformPolicy(_self.form)
                }
                _self.$message({
                    message: '保存成功',
                    type: 'success'
                })
                _self.fetchData()
                _self.dialogShow = false
                _self.$refs['ReceiptForm'].resetFields()
                _self.$refs['ReceiptCompany'].resetFields()
                _self.$refs['PaymentForm'].resetFields()
                _self.$refs['ReceiptCompany2'].resetFields()
            }catch(e){
                _self.$message.error('保存失败!!!')
            }finally {
                _self.isEditable = true
            }

        } 
        })
        }) 
        })
        })
    }

  }
}
</script>
