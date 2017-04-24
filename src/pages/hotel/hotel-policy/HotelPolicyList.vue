<template lang="html">
<div id="HotelPollicyList">
  <!-- table start -->
    <el-button type="primary"  @click="hotelpolicyAdd">添加</el-button>
  <el-table
    :data="hotelpolicy"
    border
    style="width: 100%">
    <el-table-column prop="ID" label="ID"></el-table-column>
    <el-table-column prop="PersonName" label="政策负责人"></el-table-column>
    <el-table-column prop="PurchasingName" label="政策采购人"></el-table-column>
    <el-table-column prop="LinkMan" label="酒店联系人"></el-table-column>
    <el-table-column prop="PhoneNum" label="酒店联系电话"></el-table-column>

    <el-table-column prop="BankName" label="酒店开户行"></el-table-column>
    <el-table-column prop="AccountName" label="酒店账户"></el-table-column>
    <el-table-column prop="AccountNum" label="酒店账号"></el-table-column>
    <el-table-column prop="FinanceLinkMan" label="酒店财务负责人"></el-table-column>
    <el-table-column prop="FinancePhoneNum" label="酒店财务电话"></el-table-column>
    <el-table-column prop="PayCompany.AccountName" label="支付账户"></el-table-column>

    <el-table-column prop="SecretType.SecretName" label="保密类型"></el-table-column>
    <el-table-column prop="ReserveMode.ModeName" label="酒店预订方式"></el-table-column>
    <el-table-column prop="IsDefault" label="默认政策"></el-table-column>

    <el-table-column prop="FinanceRemark" label="财务备注"></el-table-column>
    <el-table-column prop="Remark1" label="备注"></el-table-column>

    <el-table-column   label="操作" width="180">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="hotelpolicyEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="hotelpolicyDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- table end -->

  <!-- create dialog start -->
  <el-dialog title="添加酒店政策信息" v-model="createDialog" size="large">
    <el-form ref="createForm" :model="createForm" label-width="80px">

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="ID">
              <el-input v-model="createForm.ID" class="el-col-24" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="政策负责人">
              <el-input v-model="createForm.PersonName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="政策采购人">
              <el-input v-model="createForm.PurchasingName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店联系人">
              <el-input v-model="createForm.LinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店联系电话">
              <el-input v-model="createForm.PhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店开户行">
              <el-input v-model="createForm.BankName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店账户">
              <el-input v-model="createForm.AccountName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店账号">
             <el-input v-model="createForm.AccountNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店财务负责人">
              <el-input v-model="createForm.FinanceLinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店财务电话">
              <el-input v-model="createForm.FinancePhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="支付账户">
              <el-select v-model="createForm.PayCompany" clearable placeholder="请选择支付账户">
                <el-option v-for="item in PayCompanyOptions" :label="item.AccountName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="保密类型">
              <el-select v-model="createForm.SecretType" clearable placeholder="请选择保密类型">
                <el-option v-for="item in SecretTypeOptions" :label="item.SecretName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店预订方式">
              <el-select v-model="createForm.ReserveMode" clearable placeholder="请选择预订方式">
                <el-option v-for="item in ReserveModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="默认政策">
              <el-input v-model="createForm.IsDefault"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="财务备注">
              <el-input type="textarea" v-model="createForm.FinanceRemark"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="createForm.Remark1"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createDialog = false">取 消</el-button>
      <el-button type="primary" @click="hotelpolicySave()">确 定</el-button>
    </span>
  </el-dialog>
  <!-- create dialog end -->

  <!-- edit dialog start -->
  <el-dialog title="编辑酒店政策信息" v-model="editDialog" size="large">
    <el-form ref="editForm" :model="editForm" label-width="80px">

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="ID">
              <el-input v-model="editForm.ID" class="el-col-24" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="政策负责人">
              <el-input v-model="editForm.PersonName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="政策采购人">
              <el-input v-model="editForm.PurchasingName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店联系人">
              <el-input v-model="editForm.LinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店联系电话">
              <el-input v-model="editForm.PhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店开户行">
              <el-input v-model="editForm.BankName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店账户">
              <el-input v-model="editForm.AccountName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店账号">
             <el-input v-model="editForm.AccountNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店财务负责人">
              <el-input v-model="editForm.FinanceLinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>


      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店财务电话">
              <el-input v-model="editForm.FinancePhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="支付账户">
              <el-select v-model="editForm.PayCompany" clearable placeholder="请选择支付账户">
                <el-option v-for="item in PayCompanyOptions" :label="item.AccountName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="保密类型">
              <el-select v-model="editForm.SecretType" clearable placeholder="请选择保密类型">
                <el-option v-for="item in SecretTypeOptions" :label="item.SecretName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店预订方式">
              <el-select v-model="editForm.ReserveMode" clearable placeholder="请选择预订方式">
                <el-option v-for="item in ReserveModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="默认政策">
              <el-input v-model="editForm.IsDefault"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="财务备注">
              <el-input type="textarea" v-model="editForm.FinanceRemark"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="editForm.Remark1"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialog = false">取 消</el-button>
      <el-button type="primary" @click="hotelpolicyEditSave()">确 定</el-button>
    </span>
  </el-dialog>
  <!-- edit dialog end -->

</div>
</template>

<script>
import {
  hotelPolicyApi,
  secretTypeApi,
  rserveModeApi,
  payCompanyApi
} from 'api';

export default {
  data() {
    return {
      PayCompanyOptions: [],
      ReserveModeOptions: [],
      SecretTypeOptions: [],
      hotelpolicy: [],
      createDialog: false,
      editDialog: false,
      createForm: {
        ID: '',
        PersonName: '',
        LinkMan: '',
        PurchasingName: '',
        PhoneNum: '',
        BankName: '',
        AccountName: '',
        AccountNum: '',
        FinanceLinkMan: '',
        FinancePhoneNum: '',
        PayCompany: '',
        FinanceRemark: '',
        Remark1: '',
        PayMode: '',
        SecretType: '',
        ReserveMode: '',
        IsDefault: ''
      },
      editForm: {
        ID: '',
        PersonName: '',
        LinkMan: '',
        PurchasingName: '',
        PhoneNum: '',
        BankName: '',
        AccountName: '',
        AccountNum: '',
        FinanceLinkMan: '',
        FinancePhoneNum: '',
        PayCompany: '',
        FinanceRemark: '',
        Remark1: '',
        PayMode: '',
        SecretType: '',
        ReserveMode: '',
        IsDefault: ''
      }
    };
  },
  mounted() {
    const _self = this;
    _self.fetchData();
    _self.getSecretType();
    _self.getReserveMode();
    _self.getPayCompany();
  },

  methods: {
    async getPayCompany() {
      const res = await payCompanyApi.getList();
      this.PayCompanyOptions = res.data;
    },
    async getReserveMode() {
      const res = await rserveModeApi.list();
      this.ReserveModeOptions = res.data;
    },
    async getSecretType() {
      const res = await secretTypeApi.list();
      this.SecretTypeOptions = res.data;
    },
    async hotelpolicySave() {
      const _self = this;
      try {
        await hotelPolicyApi.add(_self.createForm);
        _self.fetchData();
        _self.createDialog = false;
        _self.$message({
          message: '保存成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async hotelpolicyEditSave() {
      const _self = this;
      try {
        await hotelPolicyApi.edit(_self.editForm.ID,_self.editForm);
        _self.fetchData();
        _self.editDialog = false;
        _self.$message({
          message: '编辑成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    hotelpolicyAdd() {
      this.createDialog = true;
    },
    hotelpolicyEdit($index, row) {
      const _self = this;
      _self.editForm.ID = row.ID;
      _self.editForm.PersonName = row.PersonName;
      _self.editForm.PurchasingName = row.PurchasingName;
      _self.editForm.PhoneNum = row.PhoneNum;
      _self.editForm.SecretType = row.SecretType;
      _self.editForm.ReserveMode = row.ReserveMode;
      _self.editForm.LinkMan = row.LinkMan;
      _self.editForm.PhoneNum = row.PhoneNum;
      _self.editForm.BankName = row.BankName;
      _self.editForm.AccountName = row.AccountName;
      _self.editForm.AccountNum = row.AccountNum;
      _self.editForm.FinanceLinkMan = row.FinanceLinkMan;
      _self.editForm.FinancePhoneNum = row.FinancePhoneNum;
      _self.editForm.PayCompany = row.PayCompany;
      _self.editForm.FinanceRemark = row.FinanceRemark;
      _self.editForm.PayMode = row.PayMode;
      _self.editForm.Remark1 = row.Remark1;
      _self.editForm.IsDefault = row.IsDefault;
      _self.editDialog = true;
    },
    async hotelpolicyDelete($index, row) {
      const _self = this;
      try {
        await _self.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await hotelPolicyApi.remove({
          ID: row.ID
        });
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
      const hotelID = this.$route.params.ID;
      const res = await hotelPolicyApi.listByHotelID(hotelID);
      this.hotelpolicy = res.data;
    }
  }
};
</script>
