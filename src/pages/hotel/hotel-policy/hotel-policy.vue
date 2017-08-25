<template lang="html">
    <div id="hotelPollicyList">
        <el-row>
            <el-button type="primary" @click="hotelpolicyAdd">创建</el-button>
        </el-row>
        <CustomTable :list="hotelpolicy" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData" >
          <el-table-column type="expand" slot="left-one">
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
          <el-table-column label="默认政策" align="center" slot="right-one">
              <template scope="scope">
                  <i v-if="scope.row.IsDefault">是</i>
                  <i v-else>否</i>
              </template>
          </el-table-column>
          <el-table-column width="100" label="操作" fixed="right" slot="right-two">
              <template scope="scope">
                  <DeleteButton api="hotelPolicyApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
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
                        <el-form-item label="支付账户">
                            <el-select v-model="form.PayCompanyID" clearable placeholder="请选择支付账户">
                                <el-option v-for="(item,index) in payCompanyOptions" :key="index" :label="item.AccountName" :value="item.ID"></el-option>
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
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="财务备注">
                            <el-input type="textarea" v-model="form.FinanceRemark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="form.Remark1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="默认政策" prop="IsDefault">
                            <el-switch on-text="是" off-text="否" v-model="form.IsDefault"></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
      <el-button @click="createDialog = false">取 消</el-button>
      <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
    </span>
        </el-dialog>
    </div>
</template>
<script>
import path from '../../../api/api.js'

import {
  hotelPolicyApi,
  secretTypeApi,
  rserveModeApi,
  payCompanyApi,
  hotelPolicyImageApi
} from 'api'
import { HotelTopMenu } from 'components'

export default {
  components: {
    HotelTopMenu
  },
  created() {
    const _self = this
    _self.form.hotelId = _self.$route.params.ID
    _self.fetchData()
    _self.getSecretType()
    _self.getReserveMode()
    _self.getPayCompany()
    _self.configList = hotelPolicyApi.getConfig()
  },
  data() {
    return {
      loading: false,
      isEditable: true,
      uploadUrl: path.uploadUrl,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      expandRowKeys: [],
      forms: {
        IsDefault: true,
        ID: ''
      },
      imageList: [],
      form: {
        hotelId: '',
        PayCompanyID: '',
        SecretTypeID: '',
        ReserveModeID: '',
        IsDefault: true
      },
      payCompanyOptions: [],
      reserveModeOptions: [],
      secretTypeOptions: [],
      hotelpolicy: [],
      createDialog: false,
      rules: {
        LinkMan: [
          {
            required: true,
            message: '请填写酒店联系人姓名',
            trigger: 'blur'
          }
        ],
        PhoneNum: [
          {
            required: true,
            message: '请填写酒店联系电话',
            trigger: 'blur'
          }
        ],
        PurchasingName: [
          {
            required: true,
            message: '请填写政策采购人姓名',
            trigger: 'blur'
          }
        ]
      }
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
      if (res.data && Array.isArray(res.data)) {
        this.imageList = res.data.map(item => ({
          id: item.ID,
          name: item.Path,
          url: path.imageUrl + item.Path
        }))
      }
    },
    async getPayCompany() {
      const res = await payCompanyApi.list()
      this.payCompanyOptions = res.data
    },
    async getReserveMode() {
      const res = await rserveModeApi.list()
      this.reserveModeOptions = res.data
    },
    async getSecretType() {
      const res = await secretTypeApi.list()
      this.secretTypeOptions = res.data
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
      if(this.hotelpolicy && this.hotelpolicy[0] && this.hotelpolicy[0].ID){
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
      if (file && file.id) {
        await hotelPolicyImageApi.del(file.id)
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
