<template lang="html">
<div id="hotelPollicyList">
    <el-form ref="form" :model="form" :rules="rules" label-width="110" v-loading="loading">
        <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>基础信息</h1>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="政策负责人">
                    <el-input v-model="form.PersonName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="政策采购人" prop="PurchasingName">
                    <el-input v-model="form.PurchasingName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="酒店联系人" prop="LinkMan">
                    <el-input v-model="form.LinkMan"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店联系电话" prop="PhoneNum">
                    <el-input v-model="form.PhoneNum"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="保密类型">
                    <el-select v-model="form.SecretTypeID" clearable placeholder="请选择保密类型">
                        <el-option v-for="(item,index) in secretTypeOptions" :key="index" :label="item.SecretName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店预订方式">
                    <el-select v-model="form.ReserveModeID" clearable placeholder="请选择预订方式">
                        <el-option v-for="(item,index) in reserveModeOptions" :label="item.ModeName" :key="index" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="付款公司">
                    <el-select v-model="form.PayCompanyID" clearable placeholder="请选择付款公司">
                        <el-option v-for="(item,index) in payCompanyOptions" :key="index" :label="item.AccountName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="付款方式">
                    <el-select v-model="form.PayModeID" clearable placeholder="请选择付款方式">
                        <el-option v-for="(item,index) in payModeOptions" :key="index" :label="item.ModeName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="付款类型">
                    <el-select v-model="form.PayPeriod" clearable placeholder="请选择付款类型">
                        <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店财务负责人">
                    <el-input v-model="form.FinanceLinkMan"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="酒店财务电话">
                    <el-input v-model="form.FinancePhoneNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店开户行">
                    <el-input v-model="form.BankName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="酒店账户">
                    <el-input v-model="form.AccountName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店账号">
                    <el-input v-model="form.AccountNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top:40px;">
                <el-form-item label="默认政策" prop="IsDefault">
                    <el-switch on-text="是" off-text="否" v-model="form.IsDefault"></el-switch>
                </el-form-item>
            </el-col>
        </el-row>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
        <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>备注信息</h1>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="财务备注">
                    <el-input type="textarea" v-model="form.FinanceRemark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="退改规则备注">
                    <el-input type="textarea" v-model="form.Remark1"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="费用信息备注">
                    <el-input type="textarea" v-model="form.Remark2"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注3">
                    <el-input type="textarea" v-model="form.Remark3"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注4">
                    <el-input type="textarea" v-model="form.Remark4"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注5">
                    <el-input type="textarea" v-model="form.Remark5"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注6">
                    <el-input type="textarea" v-model="form.Remark6"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注7">
                    <el-input type="textarea" v-model="form.Remark7"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注8">
                    <el-input type="textarea" v-model="form.Remark8"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注9">
                    <el-input type="textarea" v-model="form.Remark9"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注10">
                    <el-input type="textarea" v-model="form.Remark10"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
        <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>截图信息</h1>
                <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12" :offset="12">
                <!-- <el-button @click="createDialog = false">取 消</el-button> -->
                <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </el-col>
        </el-row>

    </el-form>
</div>
</template>
<script>
import path from 'api/api'
import UploadImage from 'components/upload-image'

import {
    hotelPolicyApi,
    secretTypeApi,
    rserveModeApi,
    payCompanyApi,
    hotelPolicyImageApi,
    hotelPayModeApi
} from 'api'
import {
    HotelTopMenu
} from 'components'

export default {
    components: {
        HotelTopMenu,
        UploadImage
    },
    created() {
        const _self = this
        _self.form.HotelID = _self.$route.params.ID
        _self.getSecretType()
        _self.getReserveMode()
        _self.getPayCompany()
        _self.getPayMode()
        _self.fetchData()
        _self.configList = hotelPolicyApi.getConfig()
    },
    data() {
        return {
            loading: false,
            isEditable: true,
            fileList: [],
            payPeriodList: [{
                    value: 'Advance',
                    text: '预付款'
                },
                {
                    value: 'Every',
                    text: '单结'
                },
                {
                    value: 'Day',
                    text: '日结'
                },
                {
                    value: 'Week',
                    text: '周结'
                },
                {
                    value: 'HalfMonth',
                    text: '半月结'
                },
                {
                    value: 'Month',
                    text: '月结'
                },
                {
                    value: 'None',
                    text: '其他（每单备注）'
                }
            ],
            imageList: [],
            form: {
                ID: 0,
                HotelID: '',
                PersonName: '',
                PurchasingName: '',
                IsDefault: true,
                BankName: '',
                AccountName: '',
                AccountNum: '',
                FinanceLinkMan: '',
                FinancePhoneNum: '',
                PayCompanyID: '',
                FinanceRemark: '',
                LinkMan: '',
                PhoneNum: '',
                SecretTypeID: '',
                ReserveModeID: '',
                PayModeID: '',
                PayPeriod: '',
                Remark1: '',
                Remark2: '',
                Remark3: '',
                Remark4: '',
                Remark5: '',
                Remark6: '',
                Remark7: '',
                Remark8: '',
                Remark9: '',
                Remark10: ''
            },
            payModeOptions: [],
            payCompanyOptions: [],
            reserveModeOptions: [],
            secretTypeOptions: [],
            hotelpolicy: [],
            rules: {
                LinkMan: [{
                    required: true,
                    message: '请填写酒店联系人姓名',
                    trigger: 'blur'
                }],
                PhoneNum: [{
                    required: true,
                    message: '请填写酒店联系电话',
                    trigger: 'blur'
                }],
                PurchasingName: [{
                    required: true,
                    message: '请填写政策采购人姓名',
                    trigger: 'blur'
                }]
            },
            listzzz: []
        }
    },
    methods: {
        async getImageList(id) {
            const res = await hotelPolicyImageApi.listByPid(id)
            this.listzzz = res.data
            let arr = []
            if (this.listzzz && Array.isArray(this.listzzz)) {
                this.listzzz.forEach(function(item) {
                    arr.push(item.Path)
                })
                this.imageList = arr
            }
        },
        async getPayMode() {
            const res = await hotelPayModeApi.list()
            this.payModeOptions = res.data
        },
        async getPayCompany() {
            const res = await payCompanyApi.list()
            this.payCompanyOptions = res.data
        },
        async getReserveMode() {
            const res = await rserveModeApi.list()
            this.reserveModeOptions = res.data.Data
        },
        async getSecretType() {
            const res = await secretTypeApi.list()
            this.secretTypeOptions = res.data.Data
        },
        async submitForm() {
            const _self = this
            if (_self.form.ID) {
                _self.hotelpolicyEdit()
            } else {
                _self.hotelpolicyAdd()
            }
        },
        async hotelpolicyAdd() {
            const _self = this
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        _self.isEditable = false
                        await hotelPolicyApi.add(_self.form)
                        _self.fetchData()
                        _self.isEditable = true
                        _self.$refs['form'].resetFields()
                        _self.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    return false
                }
            })
        },
        async hotelpolicyEdit() {
            const _self = this
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        _self.isEditable = false
                        await hotelPolicyApi.edit(_self.form)
                        _self.fetchData()
                        _self.isEditable = true
                        _self.$refs['form'].resetFields()
                        _self.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                    } catch (e) {
                        console.error(e)
                    }
                } else {
                    return false
                }
            })
        },
        async fetchData() {
            if (!this.$route.params.ID) return
            const hotelID = this.$route.params.ID
            this.loading = true
            const res = await hotelPolicyApi.listByHotelID(hotelID)
            this.hotelpolicy = res.data
            this.hotelpolicy.length ? this.form = this.hotelpolicy[0] : ''
            this.getImageList(this.form.ID)
            this.loading = false
            console.log(this.hotelpolicy)
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            return isJPG
        },
        async handleRemove(file, fileList) {
            if (file) {
                let id
                this.listzzz.forEach(async function(item) {
                    if (file === item.Path) {
                        id = item.ID
                    }
                })
                try {
                    await hotelPolicyImageApi.del(id)
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    await this.getImageList(this.form.ID)
                } catch (e) {
                    this.$message.error('删除失败,请重试！')
                }
            }
        },
        async handleSuccess(response, file, fileList) {
            try {
                if (!response) {
                    this.$message.error('上传失败,请重新上传')
                    return false
                }
                const form = {
                    policyId: this.form.ID,
                    path: response
                }
                await hotelPolicyImageApi.add(form)
                this.getImageList(this.form.ID)
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
            } catch (e) {
                this.$message.error('上传失败,请重新上传')
            }
        },
        handleError(err, file, fileList) {
            this.$message.error('上传失败,请重新上传')
        }
    }
}
</script>
<style lang="scss" scoped>
#hotelPollicyList {
    .el-form-item {
        margin-bottom: 10px;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 0 10px 16px !important;
        font-size: 0;
        margin-right: 60px;
    }
    .el-select {
        width: 100% !important;
        display: inline-block !important;
        position: relative !important;
    }
    .absolute {
        border: 1px solid !important;
        position: absolute !important;
    }
}
</style>
