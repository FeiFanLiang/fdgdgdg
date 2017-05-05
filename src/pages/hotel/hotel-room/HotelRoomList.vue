<template>
<div id="hotel-room-list" style="color:gray;">
  <HotelTopMenu path="room">
    <el-button type="primary" @click="hotelroomAdd">创建</el-button>
  </HotelTopMenu>
  <el-table :data="hotelroomlist" style="width: 100%;text-align:center;">
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
      <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td >{{ item.SonRoomCode }}</td>
          </tr>
        </template>
    </el-table-column>
    <el-table-column label="早餐类型" show-overflow-tooltip>
      <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
            <td >{{ item.BreakfastType }}</td>
          </tr>
        </template>
    </el-table-column>
    <el-table-column label="房间状态" show-overflow-tooltip>
      <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
              <td >
              <i class="el-icon-circle-check" style="color:#13CE66" v-if="item.IsStop"></i>
              <i class="el-icon-circle-close" v-else></i>
              </td>
          </tr>
        </template>
    </el-table-column>
    <el-table-column label="备注一" show-overflow-tooltip>
      <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
              <td >{{ item.Remark }}</td>
          </tr>
        </template>
    </el-table-column>
    <el-table-column label="备注二" show-overflow-tooltip>
      <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" class="child-table">
              <td >{{ item.Remark2 }}</td>
          </tr>
        </template>
    </el-table-column>
    <el-table-column label="子房型操作">
      <template scope="scope">
          <tr v-for="(item,index) in scope.row.SonRooms" class="child-table">
            <td>
              <el-button size="mini" @click="hotelSonRoomEdit(index,scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="hotelSonRoomDelete(scope.row)">删除</el-button>
            </td>
          </tr>
        </template>
    </el-table-column>

    <el-table-column width="240" label="房型操作">
      <template scope="scope">
          <tr class="child-table">
            <td>
                <el-button size="mini" @click="hotelroomEdit( scope.row)">编辑</el-button>
              <el-button size="mini" @click="hotelSonRoomAdd( scope.row)">添加子房型</el-button>
              <el-button size="mini" type="danger" @click="hotelroomDelete( scope.row)">删除</el-button>
            </td>
          </tr>
        </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="form.id?'编辑房间信息':'添加房间信息'" v-model="dialogVisible" size="small" @close="dialogClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="房间名称" prop="roomName">
            <el-input v-model="form.roomName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="房间编号" prop="roomCode">
            <el-input v-model="form.roomCode"></el-input>
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
  <el-dialog :title="sonForm.id?'编辑子房间信息':'添加子房间信息'" v-model="sonFormDialogVisible" size="small" @close="dialogClose">
    <el-form ref="sonForm" :model="sonForm" :rules="sonRules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="子房间名称" prop="roomName">
            <el-input v-model="sonForm.sonRoomName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="子房间编号" prop="roomCode">
            <el-input v-model="sonForm.sonRoomCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="数量">
            <el-input v-model="sonForm.roomCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="早餐类型">
            <el-select v-model="form.breakfastType" clearable placeholder="请选择预订方式">
              <el-option v-for="item in [{name:'有早',value:0},{name:'无早',value:1}]" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注一">
            <el-input v-model="sonForm.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="备注二">
            <el-input v-model="sonForm.remark2" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-form-item label="是否开启" prop="isStop">
              <el-switch on-text="是" off-text="否" v-model="sonForm.isStop"></el-switch>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="sonFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSonRoomSaveAndEdit()">确 定</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
import {
  hotelRoomApi,
  sonRoomApi
} from 'api';
import {
  HotelTopMenu
} from 'components'
export default {
  components: {
    HotelTopMenu,
  },
  data() {
    return {
      form: {
        id: '',
        hotelNum: '',
        hotelId: '',
        roomName: '',
        roomCode: '',
        roomCount: '',
        remark: ''
      },
      sonForm: {
        id: '',
        roomID: '',
        sonRoomName: '',
        sonRoomCode: '',
        remark: '',
        remark2: '',
        breakfastType: 0,
        isStop: false,
      },
      rules: {
        roomName: [{
          required: true,
          message: '请填写房间名称',
          trigger: 'blur'
        }],
        roomCode: [{
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
      sonRules: {
        sonRoomName: [{
          required: true,
          message: '请填写房间名称',
          trigger: 'blur'
        }],
        sonRoomCode: [{
          required: true,
          message: '请填写房间编号',
          trigger: 'blur'
        }]
      },
      dialogVisible: false,
      sonFormDialogVisible: false,
      bedsOptions: [],
      hotelroomlist: [],
      SonRooms: [],
    }
  },
  mounted() {
    this.form.hotelId = this.$route.params.ID
    this.fetchData();
    //this.show();
  },
  methods: {
    dialogClose() {
      for (let item in this.form) {
        this.form[item] = '';
      }
      for (let item in this.sonForm) {
        this.sonForm[item] = '';
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
    async handleSaveAndEdit() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            if (_self.form.id) {
              await hotelRoomApi.edit(_self.form.id, _self.form);
            } else {
              let form = { ..._self.form
              }
              delete form.id
              await hotelRoomApi.add(form);
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
    async handleSonRoomSaveAndEdit() {
      const _self = this;
      _self.$refs['sonForm'].validate(async valid => {
        if (valid) {
          try {
            if (_self.sonForm.id) {
              await sonRoomApi.edit(_self.sonForm.id, _self.sonForm);
            } else {
              let form = { ..._self.sonForm
              }
              delete form.id
              await sonRoomApi.add(form);
            }
            _self.$message({
              message: '保存成功',
              type: 'success'
            });
            _self.sonFormDialogVisible = false;
            _self.fetchData();
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
    hotelSonRoomAdd(row) {
      this.sonForm.roomID = row.ID;
      this.sonFormDialogVisible = true;
    },
    hotelroomEdit(row) {
      const _self = this;
      _self.form.id = row.ID;
      _self.form.hotelId = row.HotelID;
      _self.form.roomName = row.RoomName;
      _self.form.roomCount = row.RoomCount + ''; // 返回的是数字类型,表单验证会存在问题
      _self.form.roomCode = row.RoomCode;
      _self.form.remark = row.Remark;
      _self.dialogVisible = true;
    },
    async hotelSonRoomEdit(index, row) {
      if (!row || !row.SonRooms) retrun;
      const sonRooms = row.SonRooms[index]
      const _self = this;
      _self.sonFormDialogVisible = true;
      _self.sonForm.id = sonRooms.ID;
      _self.sonForm.roomID = sonRooms.roomID;
      _self.sonForm.sonRoomName = sonRooms.SonRoomName;
      _self.sonForm.sonRoomCode = sonRooms.SonRoomCode;
      _self.sonForm.remark = sonRooms.Remark;
      _self.sonForm.remark2 = sonRooms.Remark2;
      _self.sonForm.breakfastType = sonRooms.BreakfastType;
      _self.sonForm.isStop = sonRooms.IsStop;
    },
    async hotelroomDelete(row) {
      const _self = this;
      try {
        await _self.$confirm(`是否删除${row.RoomName}?`, '提示', {
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
    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #fff;
    }
    .child-table > td {
        border-bottom: 0;
    }

}
</style>
