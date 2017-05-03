<template>
<div id="hotel-platform-info">
  <HotelTopMenu path="room">
    <el-button type="primary" @click="hotelroomAdd">创建</el-button>

  </HotelTopMenu>
  <!-- table start -->
  <el-table :data="hotelroomlist" border style="width: 100%" @row-click='show' :row-class-name="tableRowClassName" :default-expand-all="true">
    <el-table-column prop="RoomName" label="房型名称" type="expand">

      <template scope="scope">
        <el-table :data="SonRooms" border style="width: 100%" >
          <el-table-column prop="SonRoomName" label="子房型名称"></el-table-column>
          <el-table-column prop="SonRoomCode" label="房间编号"></el-table-column>
          <el-table-column prop="BreakfastType" label="早餐类型"></el-table-column>
          <el-table-column label="房间状态">
            <!--<template scope="scope">
              <i v-if="scope.row.IsStop">开房</i>
              <i v-else>关房</i>
            </template>-->
          </el-table-column>
          <el-table-column prop="Remark" label="备注"></el-table-column>
          <el-table-column label="操作" width="180">
            <template scope="scope">
                <el-button size="mini" @click="hotelSonRoomEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="hotelSonRoomDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

      </template>
    </el-table-column>
    <el-table-column prop="RoomName" label="产品名称"></el-table-column>
    <el-table-column prop="RoomCode" label="房间编号"></el-table-column>
    <el-table-column prop="RoomCount" label="数量"></el-table-column>
    <el-table-column prop="Remark" label="备注"></el-table-column>
    <el-table-column label="操作" width="280">
      <template scope="scope">
        <el-button size="mini" @click="addSonRoom(scope.$index, scope.row)">添加子房型</el-button>
          <el-button size="mini" @click="hotelroomEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="hotelroomDelete(scope.$index, scope.row)">删除</el-button>
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

  <!-- addANDedit hotelSonRoom dialog start -->
  <el-dialog  :title="editAdd?'编辑子房间信息':'添加子房间信息'" v-model="dialogVisible2" size="small" @close="dialogClose">
    <el-form ref="sonform" :model="sonform" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="子房间名称" prop="SonRoomName">
            <el-input v-model="sonform.SonRoomName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="子房间编号" prop="SonRoomCode">
            <el-input v-model="sonform.SonRoomCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="早餐类型" prop="BreakfastType">
            <el-input v-model="sonform.BreakfastType"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="备注">
            <el-input v-model="sonform.Remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="房间信息" prop="IsStop">
              <el-switch on-text="开房" off-text="关房" v-model="sonform.IsStop"></el-switch>
            </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="备注2">
            <el-input v-model="sonform.Remark2" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveAndEdit2()">确 定</el-button>
      </span>
  </el-dialog>
  <!-- addANDedit hotelSonRoom dialog end -->

</div>
</template>

<script>
import {
  hotelRoomApi, sonRoomApi
} from 'api';
import {HotelTopMenu,Uitable} from 'components'
export default {
  components: {
    HotelTopMenu,
    Uitable
  },
  data() {
    return {
      form: {
        hotelId: '',
        roomName: '',
        RoomCode: '',
        roomCount: '',
        remark: '',
        SonRooms: []
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
      sonform: {
        IsStop: true
      },
      editAdd: '',
      dialogVisible: false,
      dialogVisible2: false,
      bedsOptions: [],
      hotelroomlist: [],
      //SonRooms: []
    };
  },
  mounted() {
    console.dir(this.$parent)
    this.form.hotelId = this.$route.params.ID
    this.fetchData();
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
      console.log(this.hotelroomlist)
    },
    /*async show(row) {
      this.sonRoomList = "";
      const res = await sonRoomApi.detailRoomById(row.ID);
      this.sonRoomList = res.data;
    },*/
    /*async handleExpand(row, expanded) {
      if (expanded) {
        const res = await sonRoomApi.detailRoomById(row.ID);
        this.sonRoomList = res.data;
      }
    },*/

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
    .el-table .info-row {
    background: #c9e5f5;
  }

}

</style>
