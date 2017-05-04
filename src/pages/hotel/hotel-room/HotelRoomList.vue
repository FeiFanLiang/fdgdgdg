<template>
<div id="hotel-room-list" style="color:gray;">
  <HotelTopMenu path="room">
    <el-button type="primary" >创建</el-button>
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

    tr{
      background-color:white;opacity:0.8;
    }

}

</style>
