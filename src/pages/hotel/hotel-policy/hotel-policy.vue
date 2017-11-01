<template lang="html">
<div id="hotelPollicyList">
    <el-row>
        <el-button type="primary" @click="hotelpolicyAdd">创建</el-button>
    </el-row>
    <CustomTable :list="hotelpolicy" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData">
        <el-table-column type="expand" slot="left-one">
            <template scope="props">
                   <el-form label-position="left" class="demo-table-expand" ref="forms" :model="forms" :rules="rules">
                        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="政策负责人">
                            <el-input v-model="forms.PersonName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="政策采购人" prop="PurchasingName">
                            <el-input v-model="forms.PurchasingName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店联系人" prop="LinkMan">
                            <el-input v-model="forms.LinkMan"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店联系电话" prop="PhoneNum">
                            <el-input v-model="forms.PhoneNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="保密类型">
                            <el-select v-model="forms.SecretTypeID" clearable placeholder="请选择保密类型">
                                <el-option v-for="(item,index) in secretTypeOptions" :key="index" :label="item.SecretName" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店预订方式">
                            <el-select v-model="forms.ReserveModeID" clearable placeholder="请选择预订方式">
                                <el-option v-for="(item,index) in reserveModeOptions" :label="item.ModeName" :key="index" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6">
                        <el-form-item label="付款公司">
                            <el-select v-model="forms.PayCompanyID" clearable placeholder="请选择付款公司">
                                <el-option v-for="(item,index) in payCompanyOptions" :key="index" :label="item.AccountName" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="付款方式">
                            <el-select v-model="forms.PayModeID" clearable placeholder="请选择付款方式">
                                <el-option v-for="(item,index) in payModeOptions" :key="index" :label="item.ModeName" :value="item.ID"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                     <el-col :span="6">
                        <el-form-item label="付款类型">
                            <el-select v-model="forms.PayPeriod" clearable placeholder="请选择付款类型">
                                <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店财务负责人">
                            <el-input v-model="forms.FinanceLinkMan"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店财务电话">
                            <el-input v-model="forms.FinancePhoneNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店开户行">
                            <el-input v-model="forms.BankName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="酒店账户">
                            <el-input v-model="forms.AccountName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="酒店账号">
                            <el-input v-model="forms.AccountNum"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="6" style="margin-top:40px;">
                        <el-form-item label="默认政策" prop="IsDefault">
                            <el-switch on-text="是" off-text="否" v-model="forms.IsDefault"></el-switch>
                        </el-form-item>
                    </el-col>

                </el-row>
                <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="财务备注">
                            <el-input type="textarea" v-model="forms.FinanceRemark"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="退改规则备注">
                            <el-input type="textarea" v-model="forms.Remark1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="费用信息备注">
                            <el-input type="textarea" v-model="forms.Remark2"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注3">
                            <el-input type="textarea" v-model="forms.Remark3"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="备注4">
                            <el-input type="textarea" v-model="forms.Remark4"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注5">
                            <el-input type="textarea" v-model="forms.Remark5"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注6">
                            <el-input type="textarea" v-model="forms.Remark6"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注7">
                            <el-input type="textarea" v-model="forms.Remark7"></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
                <el-row :gutter="24">
                    <el-col :span="6">
                        <el-form-item label="备注8">
                            <el-input type="textarea" v-model="forms.Remark8"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注9">
                            <el-input type="textarea" v-model="forms.Remark9"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="备注10">
                            <el-input type="textarea" v-model="forms.Remark10"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                            <el-row :gutter="24"><el-col :span="12" style="color:orange;"><h1>截图信息</h1></el-col></el-row>
                <el-row>
                    <div>111</div>
                        <UploadImage  :images="imageList"  @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
                      </el-row>
                      <el-row :gutter="24">
                          <el-col :span="5">
                              <el-button type="primary" @click="hotelpolicyEdit()">编辑保存</el-button>
                          </el-col>
                      </el-row>
            </el-form>
</template>
          </el-table-column>
          <el-table-column label="默认政策" align="center" slot="right-one">
<template scope="scope">
<i v-if="scope.row.IsDefault">是</i>
<i v-else>否</i>
</template>
          </el-table-column>
          <el-table-column width="100" label="操作" fixed="right" slot="right-two">
<template scope="scope">
<DeleteButton api="hotelPolicyApi" @successCallBack="fetchData" :id="scope.row.ID">
</DeleteButton>
</template>
          </el-table-column>
        </CustomTable>
        <!-- <el-table :data="hotelpolicy" @expand="handleExpand" row-key="ID" :expand-row-keys="expandRowKeys" border @row-click="show" style="width: 100%">
            <el-table-column type="expand">
<template scope="props">
<el-form label-position="left" class="demo-table-expand" ref="forms" :model="forms" :rules="rules">
    <el-row :gutter="24">
        <el-col :span="6">
            <el-form-item label="政策负责人">
                <el-input v-model="forms.PersonName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="政策采购人" prop="PurchasingName">
                <el-input v-model="forms.PurchasingName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="酒店联系人" prop="LinkMan">
                <el-input v-model="forms.LinkMan"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="酒店联系电话" prop="PhoneNum">
                <el-input v-model="forms.PhoneNum"></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-col :span="6">
            <el-form-item label="酒店预订方式">
                <el-select v-model="forms.ReserveModeID" clearable placeholder="请选择预订方式">
                    <el-option v-for="(item,index) in reserveModeOptions" :key="index" :label="item.ModeName" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="保密类型">
                <el-select v-model="forms.SecretTypeID" clearable placeholder="请选择保密类型">
                    <el-option v-for="(item,index) in secretTypeOptions" :key="index" :label="item.SecretName" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="支付账户">
                <el-select v-model="forms.PayCompanyID" clearable placeholder="请选择支付账户">
                    <el-option v-for="(item,index) in payCompanyOptions" :key="index" :label="item.AccountName" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="酒店财务负责人">
                <el-input v-model="forms.FinanceLinkMan"></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-col :span="6">
            <el-form-item label="酒店财务电话">
                <el-input v-model="forms.FinancePhoneNum"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="酒店开户行">
                <el-input v-model="forms.BankName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="酒店账户">
                <el-input v-model="forms.AccountName"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="酒店账号">
                <el-input v-model="forms.AccountNum"></el-input>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-col :span="6">
            <el-form-item label="财务备注">
                <el-input type="textarea" v-model="forms.FinanceRemark"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item label="备注">
                <el-input type="textarea" v-model="forms.Remark1"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="3">
            <el-form-item label="默认政策" prop="IsDefault">
                <el-switch on-text="是" off-text="否" v-model="forms.IsDefault"></el-switch>
            </el-form-item>
        </el-col>
    </el-row>
    <el-row>
        <el-upload :action="uploadUrl" :before-upload="beforeAvatarUpload" list-type="picture-card" :file-list="imageList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :with-credentials="true">
            <i class="el-icon-plus"></i>
        </el-upload>
    </el-row>
    <el-row :gutter="24">
        <el-col :span="5">
            <el-button type="primary" @click="hotelpolicyEdit()">编辑保存</el-button>
        </el-col>
    </el-row>
</el-form>
</template>
            </el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="PersonName" label="政策负责人"></el-table-column>
            <el-table-column prop="PurchasingName" label="政策采购人"></el-table-column>
            <el-table-column prop="LinkMan" label="酒店联系人"></el-table-column>
            <el-table-column prop="PhoneNum" label="酒店联系电话"></el-table-column>
            <el-table-column prop="SecretType.SecretName" label="保密类型"></el-table-column>
            <el-table-column prop="ReserveMode.ModeName" label="酒店预订方式"></el-table-column>
            <el-table-column label="默认政策" align="center">
<template scope="scope">
<i v-if="scope.row.IsDefault">是</i>
<i v-else>否</i>
</template>
            </el-table-column>
            <el-table-column width="100" label="操作" fixed="right">
<template scope="scope">
<el-button size="mini" type="danger" @click="hotelpolicyDelete(scope.$index, scope.row)">
    删除</el-button>
</template>
            </el-table-column>
        </el-table> -->
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
        <el-dialog title="添加政策信息" v-model="createDialog" size="small" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110">
                            <el-row :gutter="24"><el-col :span="12" style="color:orange;"><h1>基础信息</h1></el-col></el-row>
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
                            <el-row :gutter="24"><el-col :span="12" style="color:orange;"><h1>备注信息</h1></el-col></el-row>
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
                            <el-row :gutter="24"><el-col :span="12" style="color:orange;"><h1>截图信息</h1></el-col></el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
      <el-button @click="createDialog = false">取 消</el-button>
      <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
    </span>
        </el-dialog>
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
            //   uploadUrl: path.uploadUrl,
            dialogImageUrl: '',
            dialogVisible: false,
            fileList: [],
            expandRowKeys: [],
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
            forms: {
                ID: '',
                HotelID: '',
                PersonName: '',
                PurchasingName: '',
                IsDefault: '',
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
            createDialog: false,
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
    watch: {
        async expandRowKeys() {
            const res = await hotelPolicyApi.listByID(this.expandRowKeys[0])
            this.forms = res.data
            this.getImageList(this.expandRowKeys[0])
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
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        _self.isEditable = false
                        await hotelPolicyApi.add(_self.form)
                        _self.fetchData()
                        _self.$refs['form'].resetFields()
                        _self.createDialog = false
                        _self.form = {}
                        _self.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                    } catch (e) {
                        console.error(e)
                    } finally {
                        _self.isEditable = true
                    }
                } else {
                    return false
                }
            })
        },
        hotelpolicyAdd() {
            this.createDialog = true
        },
        async show(row) {
            const res = await hotelPolicyApi.listByID(row.ID)
            this.forms = res.data
        },
        async hotelpolicyEdit() {
            const _self = this
            _self.$refs['forms'].validate(async valid => {
                if (valid) {
                    try {
                        await hotelPolicyApi.edit(_self.forms)
                        _self.fetchData()
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
            this.loading = false
            this.expandRowKeys.length = 0
            if (this.hotelpolicy && this.hotelpolicy[0] && this.hotelpolicy[0].ID) {
                this.expandRowKeys.push(this.hotelpolicy[0].ID)
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            return isJPG
        },
        handleExpand(row, expanded) {
            if (expanded) {
                this.expandRowKeys.length = 0
                this.expandRowKeys.push(row.ID)
            }
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
                    await this.getImageList(this.expandRowKeys[0])
                } catch (e) {
                    this.$message.error('删除失败,请重试！')
                }
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        async handleSuccess(response, file, fileList) {
            try {
                if (!response) {
                    this.$message.error('上传失败,请重新上传')
                    return false
                }
                const form = {
                    policyId: this.expandRowKeys[0],
                    path: response
                }
                await hotelPolicyImageApi.add(form)
                this.getImageList(this.expandRowKeys[0])
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
