<template>
<div id="hotel-platform-info">

  <div class="filters">
    <div class="filter">
      <el-select clearable placeholder="请选择">
        <el-option></el-option>
      </el-select>
      <el-input></el-input>
    </div>
    <el-button type="primary">搜索</el-button>
    <el-button type="primary" @click="hotelroomAdd">创建</el-button>
  </div>

  <el-table :data="hotelroomlist" border style="width: 100%">
    <el-table-column prop="RoomName" label="房间名称"></el-table-column>
    <el-table-column prop="RoomCode" label="房间编号"></el-table-column>
    <el-table-column prop="RoomCount" label="数量"></el-table-column>
    <el-table-column prop="Remark" label="备注"></el-table-column>
    <el-table-column label="操作" width="180">
      <template scope="scope">
          <el-button size="mini" @click="hotelroomEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="hotelroomDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="form.hotelId?'编辑房间信息':'添加房间信息'" v-model="dialogVisible" size="small" @close="dialogClose">
    <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="房间名称" prop="roomName">
            <el-input v-model="form.roomName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="房间编号" prop="RoomCode">
            <el-input v-model="form.RoomCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="数量" prop="roomCount">
            <el-input v-model="form.roomCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="备注" >
            <el-input v-model="form.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveAndEdit()">确 定</el-button>
      </span>
  </el-dialog>

</div>
</template>

<script>
import {
  hotelRoomApi,
} from 'api';

export default {
  data() {
    return {
      form: {
        hotelId: '',
        roomName: '',
        RoomCode: '',
        roomCount: '',
        remark: ''
      },
      rules: {
          roomName: [
            { required: true, message: '请填写房间名称', trigger: 'blur' }
          ],
          RoomCode: [
            { required: true, message: '请填写房间编号', trigger: 'blur' }
          ],
          roomCount: [
            { required: true, message: '请填写房间数量', trigger: 'blur' }
          ]
        },
      dialogVisible: false,
      bedsOptions: [],
      hotelroomlist: [],
    };
  },
  mounted() {
    this.form.hotelId = this.$route.params.ID
    this.fetchData();
  },
  methods: {
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
                await hotelRoomApi.edit(_self.form.ID, _self.form);
              } else {
                await hotelRoomApi.add(_self.form);
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
    hotelroomAdd() {
      this.dialogVisible = true;
    },
    hotelroomEdit($index, row) {
      const _self = this;
      _self.form.ID = row.ID;
      _self.form.hotelId = row.HotelID;
      _self.form.roomName = row.RoomName;
      _self.form.roomCount = row.RoomCount;
      _self.form.remark = row.Remark;
      _self.dialogVisible = true;
    },
    async hotelroomDelete($index, row) {
      const _self = this;
      try {
        await _self.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await hotelRoomApi.remove(row.ID);
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
      if(!this.$route.params.ID) return;
      const res = await hotelRoomApi.list(this.$route.params.ID);
      this.hotelroomlist = res.data;
    }
  }
};
</script>
<style lang="scss">
#hotel-platform-info {
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
