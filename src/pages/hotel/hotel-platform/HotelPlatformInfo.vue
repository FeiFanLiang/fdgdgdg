<template lang="html">
  <div id="HotelPlatformInfo">
    <!-- table start -->
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="ID" label="ID" width="55"></el-table-column>
      <el-table-column prop="Hotel" label="Hotel"></el-table-column>
      <el-table-column prop="HotelID" label="酒店ID" width="80"></el-table-column>
      <el-table-column prop="PlatHotelID" label="平台酒店ID"></el-table-column>
      <el-table-column prop="PlatformID" label="平台ID" width="80"></el-table-column>
      <el-table-column prop="IsValid" label="IsValid" width="85"></el-table-column>
      <el-table-column prop="PlatHotelName" label="平台酒店名称"></el-table-column>
      <el-table-column prop="PlatHotelName_En" label="平台酒店英文名"></el-table-column>
      <el-table-column prop="PlatURL" label="平台访问路径"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
      <el-table-column  label="操作" width="180">
          <template scope="scope">
            <el-button type="primary" size="mini" @click="addPlatforminfo">添加</el-button>
            <el-button type="primary" size="mini" @click="platforminfoEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="platforminfoDelete(scope.$index, scope.row)">删除</el-button>
            </template>
      </el-table-column>

    </el-table>
    <!-- table end -->

    <!-- create dialog start -->
    <el-dialog title="添加新平台映射信息" v-model="createDialog" size="small">
      <el-form class="around" ref="createForm" :model="createForm">
        <div>
          <el-form-item label="ID">
            <el-input v-model="createForm.ID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台ID">
            <el-input v-model="createForm.PlatformID"></el-input>
          </el-form-item>
            <el-form-item label="酒店ID">
              <el-input v-model="createForm.HotelID"></el-input>
            </el-form-item>
          <el-form-item label="平台酒店名称">
            <el-input v-model="createForm.PlatHotelName"></el-input>
          </el-form-item>
          <el-form-item label="平台访问路径">
            <el-input v-model="createForm.PlatURL"></el-input>
          </el-form-item>
          <el-form-item label="IsValid">
           <el-input v-model="createForm.IsValid"></el-input>
         </el-form-item>
        </div>
        <div>
          <el-form-item label="平台酒店ID">
            <el-input v-model="createForm.PlatHotelID"></el-input>
          </el-form-item>
          <el-form-item label="平台名称">
            <el-input v-model="createForm.Platform"></el-input>
          </el-form-item>
          <el-form-item label="酒店名称">
            <el-input v-model="createForm.Hotel"></el-input>
          </el-form-item>
           <el-form-item label="平台酒店英文名称">
            <el-input v-model="createForm.PlatHotelName_En"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <textarea name="name" rows="6" cols="24" v-model="createForm.Remark"></textarea>
          </el-form-item>
        </div>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false">取 消</el-button>
        <el-button type="primary" @click="platforminfoSave()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- create dialog end -->

    <!-- edit dialog start -->
    <el-dialog title="编辑平台映射信息" v-model="editDialog" size="small" :modal-append-to-body="false">
      <el-form class="around" ref="editForm" :model="editForm">
        <div>
          <el-form-item label="ID">
            <el-input v-model="editForm.ID" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="平台ID">
            <el-input v-model="editForm.PlatformID"></el-input>
          </el-form-item>
            <el-form-item label="酒店ID">
              <el-input v-model="editForm.HotelID"></el-input>
            </el-form-item>
          <el-form-item label="平台酒店名称">
            <el-input v-model="editForm.PlatHotelName"></el-input>
          </el-form-item>
          <el-form-item label="平台访问路径">
            <el-input v-model="editForm.PlatURL"></el-input>
          </el-form-item>
          <el-form-item label="IsValid">
           <el-input v-model="editForm.IsValid"></el-input>
         </el-form-item>
        </div>
        <div>
          <el-form-item label="平台酒店ID">
            <el-input v-model="editForm.PlatHotelID"></el-input>
          </el-form-item>
          <el-form-item label="平台名称">
            <el-input v-model="editForm.Platform"></el-input>
          </el-form-item>
          <el-form-item label="酒店名称">
            <el-input v-model="editForm.Hotel"></el-input>
          </el-form-item>
           <el-form-item label="平台酒店英文名称">
            <el-input v-model="editForm.PlatHotelName_En"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <textarea name="name" rows="6" cols="24"></textarea>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="platforminfoEditSave()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- edit dialog end -->
  </div>
</template>

<script>
import { HotelPlatformApi } from 'api';
export default {
  props: {
    hotelID: Number
  },
  data() {
    return {
      list: [],
      createDialog: false,
      editDialog: false,
      createForm: {
        ID: 0,
        PlatformID: 0,
        HotelID: 0,
        PlatHotelName: '',
        PlatURL: '',
        IsValid: '',
        PlatHotelID: 0,
        Platform: '',
        Hotel: '',
        PlatHotelName_En: '',
        Remark: ''
      },
      editForm: {
        ID: '',
        PlatformID: '',
        HotelID: '',
        PlatHotelID: '',
        PlatURL: '',
        PlatHotelName: '',
        PlatHotelName_En: '',
        Remark: ''
      }
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async platforminfoSave() {
      try {
        console.log(this.createForm);
        await HotelPlatformApi.addInfo(this.createForm);
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
    async platforminfoEditSave() {
      try {
        await HotelPlatformApi.edit(this.editForm);
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
    addPlatforminfo() {
      this.createDialog = true;
    },
    platforminfoEdit($index, row) {
      this.editForm.ID = row.ID;
      this.editForm.PlatformID = row.PlatformID;
      this.editForm.HotelID = row.HotelID;
      this.editForm.PlatHotelID = row.PlatHotelID;
      this.editForm.PlatURL = row.PlatURL;
      this.editForm.PlatHotelName = row.PlatHotelName;
      this.editForm.PlatHotelName_En = row.PlatHotelName_En;
      this.editForm.Remark = row.Remark;
      this.editDialog = true;
    },
    async platforminfoDelete($index, row) {
      try {
        await this.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await HotelPlatformApi.remove({
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
      let hotelID = this.hotelID;
      const res = await HotelPlatformApi.getList(hotelID);
      //console.log(res)
      this.list = res.data;
    }
  }
};
</script>
<style lang="scss">
#HotelPlatformInfo {
    .around {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .el-form-item {
        margin-bottom: 22px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    textarea {
        border: 1px solid #bfcbd9;
        border-radius: 4px;
    }
}
</style>
