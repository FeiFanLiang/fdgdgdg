<template>
<div>
  <!-- table start -->
  <el-table
    :data="hotelroomlist"
    border
    style="width: 100%">

    <el-table-column prop="id" label="ID" width="60"></el-table-column>
    <el-table-column prop="HotelID" label="酒店ID"></el-table-column>
    <el-table-column prop="RoomName" label="房间名称"></el-table-column>
    <el-table-column prop="RoomCode" label="房间编号"></el-table-column>
    <el-table-column prop="Beds" label="床型"></el-table-column>
    <el-table-column prop="RoomCount" label="数量"></el-table-column>
    <el-table-column prop="Remark" label="备注"></el-table-column>
    <el-table-column :context="_self" inline-template label="操作" width="180">
      <div>
        <el-button size="mini" @click="hotelroomAdd">添加</el-button>
        <el-button size="mini" @click="hotelroomEdit($index, row)">编辑</el-button>         
        <el-button size="mini" type="danger" @click="hotelroomDelete($index, row)">删除</el-button>
      </div>
    </el-table-column>

  </el-table>
  <!-- table end -->

  <!-- create dialog start -->
    <el-dialog title="添加房间信息" v-model="createDialog" size="small">
      <el-form ref="createForm" :model="createForm" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="createForm.id" class="el-col-24" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="HotelID">
          <el-input v-model="createForm.HotelID" class="el-col-24" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房间名称">
          <el-input v-model="createForm.RoomName"></el-input>
        </el-form-item>
        <el-form-item label="房间编号">
          <el-input v-model="createForm.RoomCode"></el-input>
        </el-form-item>
        <el-form-item label="床型">
          <el-select v-model="createForm.Beds" clearable placeholder="请选择房间床型">
            <el-option v-for="item in bedsOptions" :label="item.BedName" :value="item.ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="createForm.RoomCount"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="createForm.Remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createDialog = false">取 消</el-button>
        <el-button type="primary" @click="hotelroomSave()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- create dialog end -->

    <!-- edit dialog start -->
    <el-dialog title="编辑房间信息" v-model="editDialog" size="small" :modal-append-to-body="false">
      <el-form ref="editForm" :model="editForm" label-width="80px">
        <el-form-item label="ID">
          <el-input v-model="editForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="HotelID">
          <el-input v-model="editForm.HotelID" class="el-col-24" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="房间名称">
          <el-input v-model="editForm.RoomName"></el-input>
        </el-form-item>
        <el-form-item label="房间编号">
          <el-input v-model="editForm.RoomCode"></el-input>
        </el-form-item>
        <el-form-item label="床型">
          <el-select v-model="editForm.Beds" clearable placeholder="请选择房间床型">
            <el-option v-for="item in bedsOptions" :label="item.BedName" :value="item.ID"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="editForm.RoomCount"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.Remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialog = false">取 消</el-button>
        <el-button type="primary" @click="hotelroomEditSave()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- edit dialog end -->
   

</div>
</template>

<script>
import { HotelRoomApi, hotelRoomBedApi } from 'api';

  export default {
    data() {
      return {
        bedsOptions: [],
        hotelroomlist: [{id:1}],
        createDialog: false,
        editDialog: false,
        createForm: {
          id: '',
          RoomName: '',
          Beds: '',
          RoomCount: '',
          Remark: '',
          IsDelete: ''
        },
        editForm: {
          id: '',
          RoomName: '',
          Beds: '',
          RoomCount: '',
          Remark: '',
          IsDelete: ''
        }
     }
    },
    mounted() {      
      this.fetchData();
      this.getBeds();
    },
    methods: {
      async getBeds() {
        const res = await hotelRoomBedApi.list();
        this.bedsOptions = res.data;
      },
      async hotelroomSave() {
      try {
        await HotelRoomApi.add(this.createForm);
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
    async hotelroomEditSave() {
      try {
        await HotelRoomApi.edit(this.editForm);
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
    hotelroomAdd() {
      this.createDialog = true;
    },
    hotelroomEdit($index, row) {
      this.editForm.id = row.id;
      this.editForm.RoomName = row.RoomName;
      this.editForm.Beds = row.Beds;
      this.editForm.RoomCount = row.RoomCount;
      this.editForm.Remark = row.Remark;
      this.editForm.IsDelete = row.IsDelete;
      this.editDialog = true;
    },
    async hotelroomDelete($index, row) {
      try {
        await this.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await HotelRoomApi.remove({
          id: row.id
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
            id: this.id
        };
        const res = await HotelRoomApi.list(options);
        this.hotelroomlist = res.data;
    }
  }
}
</script>