<template>
<div id="hotel-room-list" style="color:gray;">
  <HotelTopMenu path="room">
    <el-button type="primary" @click="hotelroomAdd">创建</el-button>
  </HotelTopMenu>
 <el-table
    :data="hotelroomlist2"
    style="width: 100%;text-align:center;">
    <el-table-column prop="RoomName" label="产品名称">
      <template scope="scope">
        <el-popover trigger="hover" placement="top" >
          <p>产品名称: {{ scope.row.RoomName }}</p>
          <p>房间编号: {{ scope.row.RoomCode }}</p>
          <p>数量: {{ scope.row.RoomCount }}</p>
          <p>备注: {{ scope.row.Remark }}</p>
          <div slot="reference" class="name-wrapper">
            <el-button type="text">{{ scope.row.RoomName }}</el-button>
          </div>
        </el-popover>
      </template>
    </el-table-column>

      <el-table-column label="子房型名称" show-overflow-tooltip>
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td >{{ item.SonRoomName }}</td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="房间编号" class="child-table" show-overflow-tooltip>
        <template scope="scope" >
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td></td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="早餐类型" show-overflow-tooltip>
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td></td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="房间状态" show-overflow-tooltip>
        <template scope="scope" >
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td></td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip>
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td></td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="子房型操作">
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td>
              <el-button size="mini" @click="hotelSonRoomEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="hotelSonRoomDelete(scope.$index, scope.row)">删除</el-button>
            </td>
          </tr>
        </template>
      </el-table-column>

    <el-table-column width="240" label="房型操作">
      <template scope="scope">
          <tr class="child-table">
            <td>
                <el-button size="mini" @click="hotelroomEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" @click="hotelSonRoomEdit(scope.$index, scope.row)">添加子房型</el-button>
              <el-button size="mini" type="danger" @click="hotelroomDelete(scope.$index, scope.row)">删除</el-button>
            </td>
          </tr>
        </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="form.hotelId?'编辑房间信息':'添加房间信息'" v-model="dialogVisible" size="small" @close="dialogClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
          <el-form-item label="备注">
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
  hotelRoomApi, sonRoomApi
} from 'api';
import {HotelTopMenu} from 'components'
export default {
  components: {
    HotelTopMenu,
  },
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
        roomName: [{
          required: true,
          message: '请填写房间名称',
          trigger: 'blur'
        }],
        RoomCode: [{
          required: true,
          message: '请填写房间编号',
          trigger: 'blur'
        }],
        roomCount: [{
          required: true,
          message: '请填写房间数量',
          trigger: 'blur'
        }]
      },
      dialogVisible: false,
      bedsOptions: [],
      hotelroomlist: [],
      hotelroomlist2: [
        {
          RoomName: 'aaa',
          SonRooms: [{
            SonRoomName: '123',
          },{
            SonRoomName: '222',
          },]
        },
        {
          RoomName: 'bbb',
          SonRooms: {
            SonRoomName: '456'
          }
        }
      ],
      SonRooms: [],
    }
  },
  mounted() {
    this.fetchData();
    //this.show();
  },
  methods: {
    tableRowClassName(row, index) {
      return 'info-row';
     },
    addSonRoom($index, row){
      this.sonform.RoomID = row.ID;
      this.dialogVisible2 = true;
      this.editAdd = false;
    },
    async hotelSonRoomEdit(index,row){
      this.dialogVisible2 = true;
      this.editAdd = true;
      const res = await sonRoomApi.detailById(row.ID);
      this.sonform = res.data;
    },
    dialogClose() {
      for (let item in this.form) {
        this.form[item] = '';
      }
      for (let item in this.sonform) {
        this.sonform[item] = '';
      }
    },
    async hotelSonRoomDelete(ID) {
      const _self = this;
      try {
        await _self.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await sonRoomApi.remove(ID);
        _self.fetchData();
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async handleSaveAndEdit2() {
      const _self = this;
      _self.$refs['sonform'].validate(async valid => {
        if (valid) {
          try {
            if (_self.sonform.ID) {
              await sonRoomApi.edit(_self.sonform.ID, _self.sonform);
            } else {
              await sonRoomApi.add(_self.sonform);
            }
            _self.fetchData();
            _self.dialogVisible2 = false;
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
      if (!this.$route.params.ID) return;
      const res = await hotelRoomApi.list(this.$route.params.ID);
      this.hotelroomlist = res.data;
    },
    /*async show(ID) {
      console.log(ID)
      const res = await sonRoomApi.detailRoomById(ID);
      this.SonRooms = res.data;
    },*/
  }

};
</script>
<style lang="scss">
#hotel-room-list {
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

    // tr{
    //   background-color:white;opacity:0.8;
    // }
    .el-table .info-row {
    background: #c9e5f5;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff;
  }
  .child-table >td{border-bottom:0}

}

</style>
