<template lang="html">
<div id="hotelPollicyList">
    <el-form ref="baseForm" :model="baseForm" label-position="top" style="margin-top:25px" v-loading="baseLoading">
        <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>酒店基础信息</h1>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="酒店ID">
                    <el-input v-model="baseForm.id" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="酒店编号">
                    <el-input v-model="baseForm.hotelNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="酒店名称">
                    <el-input v-model="baseForm.hotelName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="酒店英文名称">
                    <el-input v-model="baseForm.hotelName_En"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="前台电话">
                    <el-input v-model="baseForm.frontPhone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="传真号">
                    <el-input v-model="baseForm.faxNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="区域">
                    <el-select v-model="baseForm.areaId" clearable filterable remote placeholder="请输入酒店所在区域" :remote-method="remoteMethod" :loading="areaLloading">
                        <el-option v-for="(item,index) in areaOptions" :key="index" :label="item&&item.AreaName" :value="item&&item.ID">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="地址">
                    <el-input v-model="baseForm.address"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="星级">
                    <el-select v-model="baseForm.starNum" clearable placeholder="请选择酒店星级">
                        <el-option v-for="(item,index) in starOptions" :key="index" :label="item.StarName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-form-item label="国内国外">
                        <el-switch on-text="国外" off-text="国内" :on-value="true" :off-value="false" v-model="baseForm.isForeign"></el-switch>
                    </el-form-item>
                </div>
            </el-col>
            <el-col :span="6">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="baseForm.remark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="18">
                <el-form-item>
                    <el-button @click="back">返回</el-button>
                    <el-button type="primary" @click="baseSubmitForm()" :loading="!baseIsEditable">{{baseIsEditable?'保存酒店基础信息':'提交中'}}</el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <hr style="height:3px;border:none;border-top:3px double #8cb8ce;" />
    <el-form ref="form" :model="form" :rules="rules" label-width="110" v-loading="loading">
        <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>酒店政策信息</h1>
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
                <el-form-item label="酒店酒店预订方式">
                    <el-select v-model="form.ReserveModeID" clearable placeholder="请选择酒店预订方式">
                        <el-option v-for="(item,index) in reserveModeOptions" :label="item.ModeName" :key="index" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="收款周期" prop="PeriodShou">
                    <el-select v-model="form.PeriodShou" clearable placeholder="请选择收款周期">
                        <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-top:40px;">
                <el-form-item label="默认政策" prop="IsDefault">
                    <el-switch on-text="是" off-text="否" v-model="form.IsDefault"></el-switch>
                </el-form-item>
            </el-col>
        </el-row>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
        <!-- <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>财务信息</h1>
            </el-col>
        </el-row> -->
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="酒店开户行">
                    <el-input v-model="form.BankName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店账户">
                    <el-input v-model="form.AccountName"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="酒店账号">
                    <el-input v-model="form.AccountNum"></el-input>
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
                <el-form-item label="财务联系人电话">
                    <el-input v-model="form.FinancePhoneNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="打款公司">
                    <el-select v-model="form.PayCompanyID" clearable placeholder="请选择打款公司">
                        <el-option v-for="(item,index) in payCompanyOptions" :key="index" :label="item.AccountName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="付款周期">
                    <el-select v-model="form.PayPeriod" clearable placeholder="请选择付款周期">
                        <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="酒店财务信息备注">
                    <el-input type="textarea" v-model="form.FinanceRemark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12" style="color:orange;">
                <h1>政策图片</h1>
                <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="退改规则备注">
                    <el-input type="textarea" v-model="form.Remark1"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="费用信息备注">
                    <el-input type="textarea" v-model="form.Remark2"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注3">
                    <el-input type="textarea" v-model="form.Remark3"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注4">
                    <el-input type="textarea" v-model="form.Remark4"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注5">
                    <el-input type="textarea" v-model="form.Remark5"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注6">
                    <el-input type="textarea" v-model="form.Remark6"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注7">
                    <el-input type="textarea" v-model="form.Remark7"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注8">
                    <el-input type="textarea" v-model="form.Remark8"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注9">
                    <el-input type="textarea" v-model="form.Remark9"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注10">
                    <el-input type="textarea" v-model="form.Remark10"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注11">
                    <el-input type="textarea" v-model="form.Remark11"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注12">
                    <el-input type="textarea" v-model="form.Remark12"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="12">
                <el-form-item label="备注13">
                    <el-input type="textarea" v-model="form.Remark13"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="备注14">
                    <el-input type="textarea" v-model="form.Remark14"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="6" :offset="18">
                <el-button @click="back">返回</el-button>
                <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'保存酒店政策信息':'提交中'}}</el-button>
            </el-col>
        </el-row>

    </el-form>
</div>
</template>
<script>
import path from 'api/api'
import UploadImage from 'components/upload-image'

import {
    hotelBaseApi,
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
        _self.getHotelbaseList()
        _self.fetchData()
        _self.configList = hotelPolicyApi.getConfig()
    },
    data() {
        return {
            loading: false,
            baseLoading: false,
            isEditable: true,
            fileList: [],
            payPeriodList: [{
                    value: 0,
                    text: '其他（每单备注）'
                }, {
                    value: 1,
                    text: '预付款'
                },
                {
                    value: 2,
                    text: '单结'
                },
                {
                    value: 3,
                    text: '日结'
                },

                {
                    value: 4,
                    text: '月结'
                },
                {
                    value: 5,
                    text: '半月结'
                },
                {
                    value: 6,
                    text: '周结'
                }

            ],
            imageList: [],
            baseIsEditable: true,
            baseForm: {
                id: '',
                hotelNum: '',
                hotelName: '',
                hotelName_En: '',
                frontPhone: '',
                faxNum: '',
                areaId: '',
                address: '',
                starNum: '',
                isForeign: '',
                remark: ''
            },
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
                PayCompanyID: null,
                FinanceRemark: '',
                LinkMan: '',
                PhoneNum: '',
                SecretTypeID: null,
                ReserveModeID: null,
                PeriodShou: '',
                PayPeriod: 0,
                Remark1: '',
                Remark2: '',
                Remark3: '',
                Remark4: '',
                Remark5: '',
                Remark6: '',
                Remark7: '',
                Remark8: '',
                Remark9: '',
                Remark10: '',
                Remark11: '',
                Remark12: '',
                Remark13: '',
                Remark14: '',
                PolicyImage: ''
            },
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
                }],
                PeriodShou: [{
                    required: true,
                    type: 'number',
                    message: '请填写收款周期类型',
                    trigger: 'blur'
                }]
            },
            listzzz: [],
            areaLloading: false,
            areaOptions: [],
            starOptions: [{
                ID: 1,
                StarName: "一星级"
            }, {
                ID: 2,
                StarName: "二星级"
            }, {
                ID: 3,
                StarName: "三星级"
            }, {
                ID: 3.5,
                StarName: "准四星/3.5"
            }, {
                ID: 4,
                StarName: "四星级"
            }, {
                ID: 4.5,
                StarName: "准五星/4.5"
            }, {
                ID: 5,
                StarName: "五星级"
            }, {
                ID: 5.5,
                StarName: "超5星[国内]"
            }, {
                ID: 7,
                StarName: "七星级"
            }]
        }
    },
    watch: {
        imageList(newList) {
            this.form.PolicyImage = newList.join(',')
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        },
        async remoteMethod(query) {
            const _self = this
            if (query !== '') {
                _self.areaLloading = true
                const res = await hotelAreaApi.listByQue(query)
                _self.list = res.data
                setTimeout(() => {
                    _self.areaLloading = false
                    _self.areaOptions = _self.list.splice(0, 20)
                }, 200)
            } else {
                _self.areaOptions = []
            }
        },
        async getImageList(list) {
            if (list) {
                const images = list.split(',')
                if (Array.isArray(images)) {
                    this.imageList = images
                }
            }
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
                        _self.isEditable = true
                        this.$message.error('添加失败！')
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
                        _self.isEditable = true
                        this.$message.error('编辑失败！')
                        console.error(e)
                    }
                } else {
                    return false
                }
            })
        },
        async baseSubmitForm() {
            const _self = this
            try {
                _self.baseIsEditable = false
                await hotelBaseApi.edit(_self.baseForm)
                _self.$message({
                    message: '保存成功',
                    type: 'success'
                })
                _self.getHotelbaseList()
            } catch (e) {} finally {
                _self.baseIsEditable = true
            }
        },
        async getHotelbaseList() {
            const _self = this
            if (!_self.$route.params.ID) return
            const hotelID = _self.$route.params.ID
            _self.baseLoading = true
            const res = await hotelBaseApi.detailsById(hotelID)
            if (res && res.data) {
                const data = res.data
                _self.baseForm.id = data.ID
                _self.baseForm.hotelNum = data.HotelNum
                _self.baseForm.hotelName = data.HotelName
                _self.baseForm.hotelName_En = data.HotelName_En
                _self.baseForm.frontPhone = data.FrontPhone
                _self.baseForm.faxNum = data.FaxNum
                _self.baseForm.areaId = data.AreaID
                _self.baseForm.address = data.Address
                _self.baseForm.starNum = data.StarID
                _self.baseForm.isForeign = data.IsForeign
                _self.baseForm.remark = data.Remark
            }
            _self.baseLoading = false
        },
        async fetchData() {
            const _self = this
            if (!_self.$route.params.ID) return
            const hotelID = _self.$route.params.ID
            _self.loading = true
            const res = await hotelPolicyApi.listByHotelID(hotelID)
            _self.hotelpolicy = res.data
            if (_self.hotelpolicy.length) {
                let a = _self.hotelpolicy[0]
                _self.form.ID = a.ID
                _self.form.HotelID = a.HotelID
                _self.form.PersonName = a.PersonName
                _self.form.PurchasingName = a.PurchasingName
                _self.form.IsDefault = a.IsDefault
                _self.form.BankName = a.BankName
                _self.form.AccountName = a.AccountName
                _self.form.AccountNum = a.AccountNum
                _self.form.FinanceLinkMan = a.FinanceLinkMan
                _self.form.FinancePhoneNum = a.FinancePhoneNum
                _self.form.PayCompanyID = a.PayCompanyID || null
                _self.form.FinanceRemark = a.FinanceRemark
                _self.form.LinkMan = a.LinkMan
                _self.form.PhoneNum = a.PhoneNum
                _self.form.SecretTypeID = a.SecretTypeID || null
                _self.form.ReserveModeID = a.ReserveModeID || null
                _self.form.PeriodShou = a.PeriodShou
                _self.form.PayPeriod = a.PayPeriod || 0
                _self.form.Remark1 = a.Remark1
                _self.form.Remark2 = a.Remark2
                _self.form.Remark3 = a.Remark3
                _self.form.Remark4 = a.Remark4
                _self.form.Remark5 = a.Remark5
                _self.form.Remark6 = a.Remark6
                _self.form.Remark7 = a.Remark7
                _self.form.Remark8 = a.Remark8
                _self.form.Remark9 = a.Remark9
                _self.form.Remark10 = a.Remark10
                _self.form.Remark11 = a.Remark11
                _self.form.Remark12 = a.Remark12
                _self.form.Remark13 = a.Remark13
                _self.form.Remark14 = a.Remark14
                _self.form.PolicyImage = a.PolicyImage
                _self.getImageList(a.PolicyImage)
            }
            _self.loading = false
            console.log(this.hotelpolicy)
        },
        async handleRemove(index, fileList) {
            this.imageList.splice(index, 1)
        },
        async handleSuccess(response, file, fileList) {
            if (!response) {
                this.$message.error('上传失败,请重新上传')
                return false
            }
            this.imageList.push(response)
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
