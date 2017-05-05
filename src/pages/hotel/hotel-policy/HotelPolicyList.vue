<template lang="html">
<div id="hotelPollicyList">
  <HotelTopMenu path="policy">
    <el-button type="primary" @click="hotelpolicyAdd">创建</el-button>
  </HotelTopMenu>
  <el-table
    :data="hotelpolicy"
    @expand="handleExpand"
    @row-click="show"
    row-key="ID"
    :expand-row-keys="expandRowKeys"
    border
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props" >
        <el-form label-position="left" inline class="demo-table-expand" ref="forms" :model="forms" :rules="rules">
          <el-row :gutter="24">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="ID">
                  <el-input v-model="props.row.ID" :disabled="true"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="政策负责人">
                  <el-input v-model="forms.PersonName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店开户行">
                  <el-input v-model="forms.BankName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店联系人" prop="LinkMan">
                  <el-input v-model="forms.LinkMan"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店联系电话" prop="PhoneNum">
                  <el-input v-model="forms.PhoneNum"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店账户">
                  <el-input v-model="forms.AccountName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店账号">
                  <el-input v-model="forms.AccountNum"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店财务负责人">
                  <el-input v-model="forms.FinanceLinkMan"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="政策采购人" prop="PurchasingName">
                  <el-input v-model="forms.PurchasingName"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店预订方式">
                  <el-select v-model="forms.ReserveModeID" clearable placeholder="请选择预订方式">
                    <el-option v-for="item in reserveModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="支付账户">
                  <el-select v-model="forms.PayCompanyID" clearable placeholder="请选择支付账户">
                    <el-option v-for="item in payCompanyOptions" :label="item.AccountName" :value="item.ID"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="保密类型">
                  <el-select v-model="forms.SecretTypeID" clearable placeholder="请选择保密类型">
                    <el-option v-for="item in secretTypeOptions" :label="item.SecretName" :value="item.ID"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="酒店财务电话">
                  <el-input v-model="forms.FinancePhoneNum"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-form-item label="财务备注">
                  <el-input type="textarea" v-model="forms.FinanceRemark"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="备注">
                  <el-input type="textarea" v-model="forms.Remark1"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="3" :offset="1">
                <div class="grid-content bg-purple">
                  <!--<el-form-item label="默认政策" prop="IsDefault">
                    <el-input v-model="forms.IsDefault"></el-input>
                  </el-form-item>-->
                  <el-form-item label="默认政策" prop="IsDefault">
                    <el-switch on-text="是" off-text="否" v-model="forms.IsDefault"></el-switch>
                  </el-form-item>
                </div>
            </el-col>
          </el-row>
          <el-row>
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-upload="beforeAvatarUpload"
              list-type="picture-card"
              :file-list=" [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :on-error="handleError">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible" >
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="hotelpolicyEdit()">编辑保存</el-button>
              </div>
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
    <!--<el-table-column prop="BankName" label="酒店开户行"></el-table-column>
    <el-table-column prop="AccountName" label="酒店账户"></el-table-column>
    <el-table-column prop="AccountNum" label="酒店账号"></el-table-column>
    <el-table-column prop="FinanceLinkMan" label="酒店财务负责人"></el-table-column>
    <el-table-column prop="FinancePhoneNum" label="酒店财务电话"></el-table-column>-->
    <!--<el-table-column prop="PayCompany.AccountName" label="支付账户"></el-table-column>-->
    <el-table-column prop="SecretType.SecretName" label="保密类型"></el-table-column>
    <el-table-column prop="ReserveMode.ModeName" label="酒店预订方式"></el-table-column>
    <el-table-column label="默认政策" align="center">
      <template scope="scope">
          <i v-if="scope.row.IsDefault">是</i>
          <i v-else>否</i>
        </template>
    </el-table-column>
    <!--<el-table-column prop="FinanceRemark" label="财务备注"></el-table-column>
    <el-table-column prop="Remark1" label="备注"></el-table-column>-->

    <el-table-column   label="操作" fixed="right">
        <template scope="scope">
          <el-button size="mini" type="danger" @click="hotelpolicyDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- table end -->
  <el-dialog title="添加政策信息" v-model="createDialog" size="small">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row :gutter="24">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="政策负责人">
              <el-input v-model="form.PersonName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店开户行">
              <el-input v-model="form.BankName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店联系人" prop="LinkMan">
              <el-input v-model="form.LinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店联系电话" prop="PhoneNum">
              <el-input v-model="form.PhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店账户">
              <el-input v-model="form.AccountName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店账号">
             <el-input v-model="form.AccountNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店财务负责人">
              <el-input v-model="form.FinanceLinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店财务电话">
              <el-input v-model="form.FinancePhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="政策采购人" prop="PurchasingName">
              <el-input v-model="form.PurchasingName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="支付账户">
              <el-select v-model="form.PayCompanyID" clearable placeholder="请选择支付账户">
                <el-option v-for="item in payCompanyOptions" :label="item.AccountName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="保密类型">
              <el-select v-model="form.SecretTypeID" clearable placeholder="请选择保密类型">
                <el-option v-for="item in secretTypeOptions" :label="item.SecretName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店预订方式">
              <el-select v-model="form.ReserveModeID" clearable placeholder="请选择预订方式">
                <el-option v-for="item in reserveModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="grid-content bg-purple">
            <!--<el-form-item label="默认政策" prop="IsDefault">
              <el-input v-model="form.IsDefault"></el-input>
            </el-form-item>-->
            <el-form-item label="默认政策" prop="IsDefault">
              <el-switch on-text="是" off-text="否" v-model="form.IsDefault"></el-switch>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="财务备注">
              <el-input type="textarea" v-model="form.FinanceRemark"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.Remark1"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createDialog = false">取 消</el-button>
      <el-button type="primary" @click="handleSave()">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import {
  hotelPolicyApi,
  secretTypeApi,
  rserveModeApi,
  payCompanyApi,
  hotelPolicyImageApi
} from 'api';
import {
  HotelTopMenu
} from 'components'

export default {
  components: {
    HotelTopMenu
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      expandRowKeys: [],
      forms: {
        IsDefault: true,
        ID: ''
      },
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
        /*IsDefault: [{
          required: true,
          message: '请填写默认政策',
          trigger: 'blur'
        }]*/
      }
    };
  },
  mounted() {

    const _self = this;
    _self.form.hotelId = _self.$route.params.ID
    _self.fetchData();
    _self.getSecretType();
    _self.getReserveMode();
    _self.getPayCompany();
  },

  methods: {
    async getPayCompany() {
      const res = await payCompanyApi.getList();
      this.payCompanyOptions = res.data;
    },
    async getReserveMode() {
      const res = await rserveModeApi.list();
      this.reserveModeOptions = res.data;
    },
    async getSecretType() {
      const res = await secretTypeApi.list();
      this.secretTypeOptions = res.data;
    },


    async handleSave() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            await hotelPolicyApi.add(_self.form);
            _self.fetchData();
            _self.createDialog = false;
            _self.$message({
              message: '添加成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          alert('请填写必填信息')
          return false;
        }
      });
    },

    hotelpolicyAdd() {
      this.createDialog = true;
    },
    async show(row) {
      const res = await hotelPolicyApi.listByID(row.ID);
      this.forms = res.data;
    },
    async hotelpolicyEdit() {
      const _self = this;
      _self.$refs['forms'].validate(async valid => {
        if (valid) {
          try {
            await hotelPolicyApi.edit(_self.forms);
            _self.fetchData();
            _self.$message({
              message: '编辑成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          alert('请填写必填信息')
          return false;
        }
      });
      /*const res = await hotelPolicyApi.edit( _self.forms);
      console.log(res)
      _self.fetchData();
      _self.$message({
        message: '保存成功',
        type: 'success'
      });*/
    },

    async hotelpolicyDelete($index, row) {
      const _self = this;
      try {
        await _self.$confirm(`是否删除ID${row.ID}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await hotelPolicyApi.remove(row.ID);
        _self.fetchData();
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async fetchData() {
      if (!this.$route.params.ID) return;
      const hotelID = this.$route.params.ID;
      const res = await hotelPolicyApi.listByHotelID(hotelID);
      this.hotelpolicy = res.data;
      this.expandRowKeys.push(this.hotelpolicy[0].ID)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      return isJPG;
    },
    handleExpand(row, expanded) {
      if (expanded) {
        this.expandRowKeys.length = 0;
        this.expandRowKeys.push(row.ID)
      }
    },
    handleRemove(file, fileList) {
      console.log(file)
      console.log(fileList)
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      this.$message({
        message: '上传成功',
        type: 'success'
      });
      console.log(response)

    },
    handleError(err, file, fileList) {
      this.$message.error(err);
    }
  }
};
</script>

<style lang="scss">
#hotelPollicyList {}
</style>
