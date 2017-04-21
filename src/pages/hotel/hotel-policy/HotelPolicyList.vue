<template lang="html">
<div id="HotelPollicyList">
  <!-- table start -->
  <el-table
    :data="hotelpolicy"
    border
    style="width: 100%">
    <el-table-column prop="ID" label="ID"></el-table-column>
    <el-table-column prop="PersonName" label="政策负责人"></el-table-column>
    <el-table-column prop="PurchasingName" label="政策采购人"></el-table-column>
    <el-table-column prop="PersonName" label="酒店联系人"></el-table-column>
    <el-table-column prop="PhoneNum" label="酒店联系电话"></el-table-column>
    <el-table-column prop="SecretType" label="保密类型"></el-table-column>
    <el-table-column prop="ReserveMode" label="酒店预订方式"></el-table-column>
    <el-table-column prop="IsDefault" label="默认政策"></el-table-column>
    <el-table-column :context="_self" inline-template label="操作" width="180">
      <div>
        <el-button type="primary" size="mini" @click="hotelpolicyAdd">添加</el-button>
        <el-button type="primary" size="mini" @click="hotelpolicyEdit($index, row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="hotelpolicyDelete($index, row)">删除</el-button>
      </div>
    </el-table-column>
  </el-table>
  <!-- table end -->

  <!-- create dialog start -->
  <el-dialog title="添加酒店政策信息" v-model="createDialog" size="small">
    <el-form ref="createForm" :model="createForm" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="createForm.ID" class="el-col-24" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="政策负责人">
        <el-input v-model="createForm.PersonName"></el-input>
      </el-form-item>
      <el-form-item label="政策采购人">
        <el-input v-model="createForm.PurchasingName"></el-input>
      </el-form-item>
      <el-form-item label="酒店联系人">
        <el-input v-model="createForm.PersonName"></el-input>
      </el-form-item>
      <el-form-item label="酒店联系电话">
        <el-input v-model="createForm.PhoneNum"></el-input>
      </el-form-item>
      <el-form-item label="保密类型">
        <el-input v-model="createForm.SecretType"></el-input>
      </el-form-item>
        <el-form-item label="酒店预订方式">
        <el-input v-model="createForm.ReserveMode"></el-input>
      </el-form-item>
      <el-form-item label="默认政策">
        <el-input v-model="createForm.IsDefault"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="createDialog = false">取 消</el-button>
      <el-button type="primary" @click="hotelpolicySave()">确 定</el-button>
    </span>
  </el-dialog>
  <!-- create dialog end -->

  <!-- edit dialog start -->
  <el-dialog title="编辑酒店政策信息" v-model="editDialog" size="small" :modal-append-to-body="false">
    <el-form ref="editForm" :model="editForm" label-width="80px">
      <el-form-item label="ID">
        <el-input v-model="editForm.ID" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="政策负责人">
        <el-input v-model="editForm.PersonName"></el-input>
      </el-form-item>
      <el-form-item label="政策采购人">
        <el-input v-model="editForm.PurchasingName"></el-input>
      </el-form-item>
      <el-form-item label="酒店联系人">
        <el-input v-model="editForm.PersonName"></el-input>
      </el-form-item>
      <el-form-item label="酒店联系电话">
        <el-input v-model="editForm.PhoneNum"></el-input>
      </el-form-item>
      <el-form-item label="保密类型">
        <el-input v-model="editForm.SecretType"></el-input>
      </el-form-item>
        <el-form-item label="酒店预订方式">
        <el-input v-model="editForm.ReserveMode"></el-input>
      </el-form-item>
      <el-form-item label="默认政策">
        <el-input v-model="editForm.IsDefault"></el-input>
      </el-form-item>
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
import { HotelPolicyApi } from 'api';

export default {
  data() {
    return {
      hotelpolicy: [],
      createDialog: false,
      editDialog: false,
      createForm: {
        ID: '',
        PersonName: '',
        PurchasingName: '',
        PhoneNum: '',
        SecretType: '',
        ReserveMode: '',
        IsDefault: ''
      },
      editForm: {
        ID: '',
        PersonName: '',
        PurchasingName: '',
        PhoneNum: '',
        SecretType: '',
        ReserveMode: '',
        IsDefault: ''
      }
    }
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    async hotelpolicySave() {
      try {
        await HotelPolicyApi.add(this.createForm);
        this.fetchData();
        this.createDialog = false;
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async hotelpolicyEditSave() {
      try {
        await HotelPolicyApi.edit(this.editForm);
        this.fetchData();
        this.editDialog = false;
        this.$message({
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
      this.editForm.ID = row.ID;
      this.editForm.PersonName = row.PersonName;
      this.editForm.PurchasingName = row.PurchasingName;
      this.editForm.PhoneNum = row.PhoneNum;
      this.editForm.SecretType = row.SecretType;
      this.editForm.ReserveMode = row.ReserveMode;
      this.editForm.IsDefault = row.IsDefault;
      this.editDialog = true;
    },
    async hotelpolicyDelete($index, row) {
      try {
        await this.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await HotelPolicyApi.remove({
          ID: row.ID
        });
        this.fetchData();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async fetchData() {
      let options = {
        ID: this.ID
      };
      const res = await HotelPolicyApi.listAll(options);
      this.hotelpolicy = res.data;
    }
  },

}
</script>