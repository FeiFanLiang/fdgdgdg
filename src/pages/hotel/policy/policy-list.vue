<template>
<div>
    <el-row :gutter="24" style="margin-bottom:10px;" v-if="typeof(HotelID) == 'undefined'">
        <el-col :span="6">
            <el-input placeholder="请输入酒店名称" v-model="filters.hotelname"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="policySearch(filters)">搜索</el-button>
        </el-col>
    </el-row>
    <el-button type="primary" @click="addPolicy" v-if="typeof(HotelID) != 'undefined'">创建</el-button>
    <el-table :data="policyList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
        <el-table-column prop="Hotel.HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="FinancialInfo.PayCompany.ShortName" label="我方账号"></el-table-column>
        <el-table-column prop="FinancialInfo.ReceiptCompany.AccountName" label="对方账号"></el-table-column>
        <el-table-column  label="付款周期">
            <template scope="scope">
            <div v-if="typeof(scope.row.FinancialInfo) != 'undefined'">
                <span v-if="scope.row.FinancialInfo.PayPeriod == 0">其他</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 1">预付款</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 2">单结</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 3">日结</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 401">月结</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 402">月结2</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 501">半月结</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 601">周结</span>
                <span v-if="scope.row.FinancialInfo.PayPeriod == 602">周结2</span>
            </div>
            </template>
        </el-table-column>
        <el-table-column label="基于结算日">
            <template scope="scope">
            <div v-if="typeof(scope.row.FinancialInfo) != 'undefined'">
                <span v-if="scope.row.FinancialInfo.SettlementUnit == 0">订单日期</span>
                <span v-if="scope.row.FinancialInfo.SettlementUnit == 1">入住日期</span>
                <span v-if="scope.row.FinancialInfo.SettlementUnit == 2">离店日期</span>
                <span v-if="scope.row.FinancialInfo.SettlementUnit == 3">单笔入住日期</span>
                <span v-if="scope.row.FinancialInfo.SettlementUnit == 4">单笔结算日期</span>
            </div>
            </template>
        </el-table-column>
        <el-table-column prop="Remark1" label="备注" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width=100>
            <template scope="scope">
                <el-button size="small" @click="editPolicy(scope.row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper" v-if="typeof(HotelID) == 'undefined'">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title=title v-model="dialogShow" size="full">
        <el-form ref="form" :model="form" label-width="110px">
            <h3 v-if="typeof(hotelName) != 'undefined'">酒店名称：{{hotelName}}</h3>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="名称" prop="Name">
                        <el-input placeholder="请输入名称" v-model="form.Name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="政策负责人" prop="PersonName">
                        <el-input placeholder="请输入政策负责人" v-model="form.PersonName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="政策采购人" prop="PurchasingName">
                        <el-input placeholder="请输入政策采购人" v-model="form.PurchasingName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否默认" prop="IsDefault">
                        <el-switch on-text="是" off-text="否" :on-value="true" :off-value="false" v-model="form.IsDefault"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>  
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="酒店联系人" prop="LinkMan">
                        <el-input placeholder="请输入酒店联系人" v-model="form.LinkMan"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="酒店联系电话" prop="PhoneNum">
                        <el-input placeholder="请输入酒店联系电话" v-model="form.PhoneNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="保密类型" prop="SecretTypeID">
                        <el-select v-model="form.SecretTypeID" clearable placeholder="请选择">
                            <el-option v-for="item in SecretTypeID" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="预定方式" prop="ReserveModeID">
                        <el-select v-model="form.ReserveModeID" clearable placeholder="请选择">
                            <el-option v-for="item in ReserveModeID" :key="item.ID" :label="item.ModeName" :value="item.ID"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <!-- 财务信息 -->
            <el-collapse accordion style="margin:20px 0;">
                <el-collapse-item>
                    <template slot="title">
                        <span style="color:orange;font-size:18px;">财务信息</span>
                    </template>
                    <div>
                        <el-form ref="FinancialInfo" :model="FinancialInfo" label-width="110px" :rules="rules">
                            <el-row :gutter="24">
                                <el-col :span="6">
                                    <el-form-item label="付款周期" prop="PayPeriod">
                                        <el-select v-model="FinancialInfo.PayPeriod" clearable placeholder="请选择">
                                            <el-option v-for="item in PayPeriod" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="付款周期T+N" prop="PayPeriodTplusN">
                                        <el-input v-model="FinancialInfo.PayPeriodTplusN" type="number"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="基于结算日" prop="SettlementUnit">
                                        <el-select v-model="FinancialInfo.SettlementUnit" clearable placeholder="请选择">
                                            <el-option v-for="item in SettlementUnit" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="基于结算日T+N" prop="SettlementUnitTplusN">
                                        <el-input v-model="FinancialInfo.SettlementUnitTplusN" type="number"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="24">
                                <el-col :span="6">
                                    <el-form-item label="我方签约公司" prop="Company">
                                        <el-select v-model="FinancialInfo.Company" clearable placeholder="请选择">
                                            <el-option v-for="item in Company" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                            <el-form-item label="我方财务信息" prop="PayCompanyID">
                                <el-select v-model="FinancialInfo.PayCompanyID" clearable placeholder="请选择" @change="PayCompany">
                                    <el-option v-for="item in PayCompanyID" :key="item.ID" :label="item.ShortName" :value="item.ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <el-row :gutter="24">
                            <el-col :span="6">
                                <el-form-item label="简称" prop="ShortName">
                                    <el-input placeholder="请输入简称" v-model="form2.ShortName"></el-input>
                                </el-form-item>
                            </el-col>
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
                        </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
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
                            <el-form label-width="110px">
                                <el-row :gutter="24">
                                    <el-col :span="6">
                                        <el-form-item label="财务联系人" prop="FinanceLinkMan">
                                            <el-input placeholder="请输入财务联系人" v-model="FinancialInfo.FinanceLinkMan"></el-input>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="财务联系电话" prop="FinancePhoneNum">
                                            <el-input placeholder="请输入财务联系电话" v-model="FinancialInfo.FinancePhoneNum"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
                                <el-row :gutter="24">
                                    <el-col :span="6">
                                        <el-form-item label="紧急打款" prop="UrgentPay">
                                            <el-switch on-text="是" off-text="否" :on-value="1" :off-value="0" v-model="FinancialInfo.UrgentPay"></el-switch>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="6">
                                        <el-form-item label="不可合并支付" prop="UnMergePay">
                                            <el-switch on-text="不可" off-text="可" :on-value="1" :off-value="0" v-model="FinancialInfo.UnMergePay"></el-switch>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <el-form-item label="截图信息" prop="PolicyImage">
                <UploadImageCopy :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImageCopy>
            </el-form-item>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin:20px 0;" />
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="打款注意事项" prop="PayNote">
                        <el-input type="textarea" v-model="form.PayNote" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="发票" prop="InvoiceNote">
                        <el-input type="textarea" v-model="form.InvoiceNote" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="控房/团队" prop="GroupNote">
                        <el-input type="textarea" v-model="form.GroupNote" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="投放渠道" prop="Remark10">
                        <el-input type="textarea" v-model="form.Remark10" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="商圈" prop="Remark4">
                        <el-input type="textarea" v-model="form.Remark4" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注3" prop="Remark3">
                        <el-input type="textarea" v-model="form.Remark3" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="备注9" prop="Remark9">
                        <el-input type="textarea" v-model="form.Remark9" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注1" prop="Remark1">
                        <el-input type="textarea" v-model="form.Remark1" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="备注2" prop="Remark2">
                        <el-input type="textarea" v-model="form.Remark2" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注5" prop="Remark5">
                        <el-input type="textarea" v-model="form.Remark5" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="备注6" prop="Remark6">
                        <el-input type="textarea" v-model="form.Remark6" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注7" prop="Remark7">
                        <el-input type="textarea" v-model="form.Remark7" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="备注8" prop="Remark8">
                        <el-input type="textarea" v-model="form.Remark8" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注11" prop="Remark11">
                        <el-input type="textarea" v-model="form.Remark11" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="10">
                    <el-form-item label="备注12" prop="Remark12">
                        <el-input type="textarea" v-model="form.Remark12" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注13" prop="Remark13">
                        <el-input type="textarea" v-model="form.Remark13" autosize></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="备注14" prop="Remark14">
                        <el-input type="textarea" v-model="form.Remark14" autosize></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
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
import UploadImageCopy from 'components/upload-image-copy'
  export default {
      components: {
        UploadImageCopy
      },
      data(){
        return{
            currentPage: 1,
            pageSize: 10,
            count: 0,
            policyList:[],
            loading:false,
            filters:{
                hotelname: '',
            },
            title:'',
            //////////////////
            imageList: [],
            dialogImageUrl: '',
            dialogVisible: false,
            HotelID:'',
            hotelName:'',
            form:{
                HotelID:'',
                Name: '',
                PersonName: '',
                PurchasingName: '',
                IsDefault: false,
                Remark:'',
                PolicyImage:'',
                SecretTypeID:'',
                ReserveModeID:''
            },
            FinancialInfo:{
                Company:'',
                PayCompanyID:'',
                FinanceLinkMan:'',
                FinancePhoneNum:'',
                SettlementUnit:'',
                PayPeriod:'',
                UrgentPay:'',
                UnMergePay:''
            },
            ReceiptCompany:{
                AccountName:'',
                AccountNum:'',
                Bank:'',
                ShortName:'',
            },
            dialogShow: false,
            isEditable:true,
            PayCompanyID:[],
            form2:{
                AccountName: '',
                AccountNum: '',
                Bank: '',
                ShortName: '',
            },
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
            SecretTypeID:[
                {
                    label:'不保密',
                    value:1
                },
                {
                    label:'一次保密',
                    value:2
                },
                {
                    label:'二次保密',
                    value:3
                }
            ],
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
            ReserveModeID:[],
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
                // ShortName: [
                //     { required: true, message: '请输入对方财务信息--简称', trigger: 'blur' }
                // ],
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
        this.HotelID = this.$route.params.ID
        this.hotelName = this.$route.query.hotelName
        console.log(this.hotelName + this.HotelID)
        this.fetchData()
        this.getRserveMode()
      },
      methods:{
        async getRserveMode(){
            const res = await policyApi.getRserveMode()
            this.ReserveModeID = res.data.Data
        },
        async getImageList(list) {
            if (list) {
                const images = list.split(',')
                if (Array.isArray(images)) {
                    this.imageList = images
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
            this.form.PolicyImage = f.toString()
        },
        handleRemove(index,file, fileList) {
            this.imageList.splice(index, 1)
            let f = this.imageList
            this.form.PolicyImage = f.toString()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        policySearch(){
            this.fetchData()
        },
        async fetchData(currentPage, pageSize){
            const _self = this
            _self.loading = true
            const res = await policyApi.getPayCompany()
            _self.PayCompanyID = res.data.Data
            _self.currentPage = currentPage || _self.currentPage
            _self.pageSize = pageSize || _self.pageSize
            const options = {
                pageIndex: _self.currentPage,
                pageSize: _self.pageSize,
                order: 'ID',
                query:{
                    hotelname:_self.filters.hotelname,
                }
            }
            try{
                if(typeof(_self.HotelID) === 'undefined'){
                    _self.policyList = []
                    const res = await policyApi.getPolicyList(options)
                    _self.policyList = res.data.Data
                    _self.count = res.data.Count
                }else{
                    _self.policyList = []
                    const res2 = await policyApi.getPolicyListByID(_self.HotelID)
                    _self.policyList = res2.data
                }
                _self.loading = false
            }catch(e){
                console.log(e)
                _self.loading = false
            }
        },
        //////////////////////////////////////////////////////////////////////////
        async PayCompany(value){
            const _self = this
            if(value != ''){
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
        resetForm(){
            const _self = this
            _self.form = {
                HotelID:_self.HotelID,
                IsDefault:false,
                PolicyImage:'',
                SecretTypeID:'',
                ReserveModeID:''
            }
            _self.imageList = []
            _self.FinancialInfo = {
                PayCompanyID:'',
                SettlementUnit:'',
                PayPeriod:'',
                Company:'',
                UrgentPay:'',
                UnMergePay:''
            }
            _self.ReceiptCompany = {
                AccountName:'',
                AccountNum:'',
                Bank:'',
                ShortName:'',
            }
            try{
                _self.$refs['FinancialInfo'].resetFields()
                _self.$refs['ReceiptCompany'].resetFields()
            }catch(e){
                console.log(e)
            }
        },
        async addPolicy(){
            const _self = this
            try{
                _self.title = '酒店协议创建'
                _self.resetForm()
                _self.dialogShow = true
            }catch(e){
                console.log(e)
            }
        },
        async editPolicy(row){
            const _self = this
            _self.title = '酒店协议编辑'
            try {
                _self.resetForm()
                const res = await policyApi.getPolicyListID(row.ID)
                if(typeof(res.data.Data.FinancialInfo) != 'undefined'){
                    _self.FinancialInfo = res.data.Data.FinancialInfo
                    _self.ReceiptCompany = res.data.Data.FinancialInfo.ReceiptCompany
                 }
                _self.form = res.data.Data
                console.log(_self.form)
                _self.getImageList(_self.form.PolicyImage)
                _self.dialogShow = true
            } catch (e) {
                console.error(e)
            }
        },
        async submit(){
            const _self = this
            this.$refs['FinancialInfo'].validate(async valid => {  
            this.$refs['ReceiptCompany'].validate(async valid => {
                if (valid) {
                    try{
                        _self.form.FinancialInfo = _self.FinancialInfo
                        _self.form.FinancialInfo.ReceiptCompany = _self.ReceiptCompany
                        _self.isEditable = false
                        if (_self.form.ID) {
                            console.log(_self.form)
                            await policyApi.editHotelPolicy(_self.form.ID,_self.form)
                        } else {
                            console.log(_self.form)
                            await policyApi.addHotelPolicy(_self.form)
                        }
                        _self.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        _self.fetchData()
                        _self.dialogShow = false
                        _self.$refs['FinancialInfo'].resetFields()
                        _self.$refs['ReceiptCompany'].resetFields()
                    }catch(e){
                        _self.$message.error('保存失败!!!')
                    }finally {
                        _self.isEditable = true
                    }

            } })
            }) 
        }
        
      }
  }    
</script>
<style lang="scss">
  .pagination-wrapper {
    text-align: center;
    margin: 10px;
  }
  .el-tooltip__popper{
      max-width:500px;
  }
</style>