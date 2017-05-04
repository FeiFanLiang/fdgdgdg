<template>
<div id="hotel-room-list" style="color:gray;">
  <HotelTopMenu path="room">
    <el-button type="primary" >创建</el-button>
  </HotelTopMenu>
<<<<<<< HEAD
=======
  <!-- table start -->
  <el-table :data="hotelroomlist" border style="width: 100%" @row-click='show' :row-class-name="tableRowClassName" :default-expand-all="true">
    <el-table-column prop="RoomName" label="房型名称" type="expand">
>>>>>>> b9ba5b791c4d350b7dc57dec4378fbbcaca552f8

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
    <el-table-column label="子房型信息" >

      <el-table-column label="子房型名称">
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms" style="background-color:white;opacity:0.5;">
            <td>子房型名称: {{ item.SonRoomName }}</td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="房间编号">
        <template scope="scope" >
          <tr v-for="item in scope.row.SonRooms">
            <td>房间编号: </td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="早餐类型">
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms">
            <td>早餐类型: </td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="房间状态">
        <template scope="scope" >
          <tr v-for="item in scope.row.SonRooms">
            <td>房间状态: </td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="备注">
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms">
            <td>备注: </td>
          </tr>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <tr v-for="item in scope.row.SonRooms">
            <td>
              <el-button size="mini" @click="hotelSonRoomEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="hotelSonRoomDelete(scope.$index, scope.row)">删除</el-button>
            </td>
          </tr>
        </template>
      </el-table-column>
      
    </el-table-column>
    <el-table-column width="150">
      <template scope="scope">
          <tr>
            <td>
              <el-button size="mini" @click="hotelSonRoomEdit(scope.$index, scope.row)">添加子房型</el-button>
            </td>
          </tr>
        </template>
    </el-table-column>
  </el-table>

  

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
      aaa: [
        {a:1,b:2},
        {a:1,c:3,d:4},
        {a:1}
      ],
    }
  },
  mounted() {
    this.fetchData();
    //this.show();
  },
  methods: {
<<<<<<< HEAD
=======
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
>>>>>>> b9ba5b791c4d350b7dc57dec4378fbbcaca552f8
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
<<<<<<< HEAD

    tr{
      background-color:white;opacity:0.8;
    }
=======
    .el-table .info-row {
    background: #c9e5f5;
  }
>>>>>>> b9ba5b791c4d350b7dc57dec4378fbbcaca552f8

}

</style>
