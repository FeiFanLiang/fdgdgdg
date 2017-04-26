<template lang="html">
<div id="hotelPollicyList">

  <Menu path="policy">
    <el-button type="primary" @click="hotelpolicyAdd">创建</el-button>
  </Menu>

  <!-- table start -->
  <el-table
    :data="hotelpolicy"
    border
    style="width: 100%">
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
    <el-table-column prop="PayCompany.AccountName" label="支付账户"></el-table-column>

    <el-table-column prop="SecretType.SecretName" label="保密类型"></el-table-column>
    <el-table-column prop="ReserveMode.ModeName" label="酒店预订方式"></el-table-column>
    <!--<el-table-column prop="IsDefault" label="默认政策"></el-table-column>-->

    <!--<el-table-column prop="FinanceRemark" label="财务备注"></el-table-column>
    <el-table-column prop="Remark1" label="备注"></el-table-column>-->

    <el-table-column   label="操作">
        <template scope="scope">
          <el-button type="primary" size="mini" @click="hotelpolicyEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="hotelpolicyDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <!-- table end -->

  <!-- create and edit dialog start -->
  <el-dialog :title="form.hotelID?'编辑房间信息':'添加房间信息'" v-model="dialogVisible" size="small" @close="dialogClose">
    <el-form ref="form" :model="form" label-width="80px">

      <el-row :gutter="24">
        <el-col :span="10">
          <div >
            <el-form-item label="ID">
              <el-input v-model="form.ID" class="el-col-24" :disabled="true"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div >
            <el-form-item label="政策负责人" prop="PersonName">
              <el-input v-model="form.PersonName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="24">
        <el-col :span="10">
          <div >
            <el-form-item label="酒店联系人">
              <el-input v-model="form.LinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div >
            <el-form-item label="酒店联系电话">
              <el-input v-model="form.PhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <!--<el-col :span="7">
          <div >
            <el-form-item label="酒店开户行">
              <el-input v-model="createForm.BankName"></el-input>
            </el-form-item>
          </div>
        </el-col>-->
      </el-row>

      <!--<el-row :gutter="20">
        <el-col :span="6">
          <div >
            <el-form-item label="酒店账户">
              <el-input v-model="createForm.AccountName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div >
            <el-form-item label="酒店账号">
             <el-input v-model="createForm.AccountNum"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div >
            <el-form-item label="酒店财务负责人">
              <el-input v-model="createForm.FinanceLinkMan"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>-->


      <el-row :gutter="24">
        <!--<el-col :span="6">
          <div >
            <el-form-item label="酒店财务电话">
              <el-input v-model="createForm.FinancePhoneNum"></el-input>
            </el-form-item>
          </div>
        </el-col>-->
        <el-col :span="10">
          <div >
            <el-form-item label="政策采购人">
              <el-input v-model="form.PurchasingName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div >
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
          <div >
            <el-form-item label="保密类型">
              <el-select v-model="form.SecretTypeID" clearable placeholder="请选择保密类型">
                <el-option v-for="item in secretTypeOptions" :label="item.SecretName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="10">
          <div >
            <el-form-item label="酒店预订方式">
              <el-select v-model="form.ReserveModeID" clearable placeholder="请选择预订方式">
                <el-option v-for="item in reserveModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <!--<el-col :span="7">
          <div >
            <el-form-item label="默认政策">
              <el-input v-model="createForm.IsDefault"></el-input>
            </el-form-item>
          </div>
        </el-col>-->
      </el-row>

      <!--<el-row :gutter="20">
        <el-col :span="20">
          <div >
            <el-form-item label="财务备注">
              <el-input type="textarea" v-model="createForm.FinanceRemark"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <div >
            <el-form-item label="备注">
              <el-input type="textarea" v-model="createForm.Remark1"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>-->

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSaveAndEdit()">确 定</el-button>
    </span>
  </el-dialog>
  <!-- create and edit dialog end -->

</div>
</template>

<script>
import {
  hotelPolicyApi,
  secretTypeApi,
  rserveModeApi,
  payCompanyApi
} from 'api';
import {Menu} from 'components'
export default {
  components: {
    Menu
  },
  data() {
    return {
      form: {
        hotelID: '',
        PayCompanyID: '',
        SecretTypeID: '',
        ReserveModeID: '',
      },
      payCompanyOptions: [],
      reserveModeOptions: [],
      secretTypeOptions: [],
      hotelpolicy: [],
      dialogVisible: false
    };
  },
  mounted() {
    const _self = this;
    _self.form.hotelID = _self.$route.params.ID
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
    dialogClose() {
      for (let item in this.form) {
        this.form[item] = '';
      }
    },


    async handleSaveAndEdit() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            if (_self.form.ID) {
              await hotelPolicyApi.edit(_self.form.ID, _self.form);
            } else {
              await hotelPolicyApi.add(_self.form);
            }
            _self.fetchData();
            _self.dialogVisible = false;
            _self.$message({
              message: '保存成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          return false;
        }
      });

    },
    hotelpolicyAdd() {
      this.dialogVisible = true;
    },
    async hotelpolicyEdit($index, row) {
      const _self = this;
      const res = await hotelPolicyApi.listByID(row.ID);
      _self.form = res.data;
      _self.dialogVisible = true;
    },
    async hotelpolicyDelete($index, row) {
      const _self = this;
      try {
        await _self.$confirm('是否删除此条信息?', '提示', {
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
    }
  }
};
</script>

<style lang="scss">
 #hotelPollicyList {
    .filters {
        margin: 0 0 20px;
        border: 1px #efefef solid;
        padding: 10px;
        background: #f9f9f9;

        .filter {
            display: inline-block;
            width: auto;
            padding: 10px;
            border-radius: 5px;
            .el-select {
                display: inline-block;
            }
        }

        .el-input {
            width: 150px;
            display: inline-block;
        }
    }
}
</style>