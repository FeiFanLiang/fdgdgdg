<template lang="html">
  <div class="">
    <el-dialog title="平台信息"  v-model="hotelRoomPlatVisible" :modal-append-to-body="false"  @close="Cancel" @open="dialogOpen">
      <el-row>
        <el-button  @click="add">添加</el-button>
      </el-row>
    <el-table :data="list" ref="table" style="width: 100%;height:100%"  border row-key="ID">
      <el-table-column sortable prop="PlatRoomName" label="平台名称"  width="180" show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="PlatRoomCode" label="平台编码"  show-overflow-tooltip></el-table-column>
      <el-table-column sortable prop="PlatRoomName_En" label="平台英文名称"  show-overflow-tooltip></el-table-column>
      <el-table-column  width="150"  label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-dialog>
    <el-dialog title="添加平台信息"  v-model="platVisible" :modal-append-to-body="false"   @open="dialogOpen">
      <el-form ref="form"  :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="11" :offset="2">
            <el-select  v-model="chosenPlatInfo" placeholder="请选择">
              <el-option v-for="(item,index) in platInfoList"
                :label="item.PlatHotelName"
                :value="item"
                :key="index">
              </el-option>
            </el-select>
          </el-col>
            <el-col :span="11">
                <el-button type="primary" @click="handleSaveAndEdit()">保存</el-button>
            </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  sonRoomPlatformApi,
  hotelPlatformApi
} from 'api';
export default {
  props: {
    hotelId: {
      type: [String, Number],
      required: true,
      default: ''
    },
    roomId: {
      type: [String, Number],
      required: true,
      default: ''
    },
    sonRoomId: {
      type: [String, Number],
      required: true,
      default: ''
    },
    hotelRoomPlatVisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      list: [],
      platInfoList: [],
      chosenPlatInfo: {},
      rules: {},
      platVisible:false
    }
  },
  methods: {
    Cancel() {
      this.$emit('hide')
    },
    dialogOpen() {
      this.getList();
      this.getPlatformList();
    },
    add(){
      this.platVisible=true;
    },
    edit(index,row){
      this.platVisible=true;
    },
    del(index,row){

    },
    async getList() {
      const res = await sonRoomPlatformApi.listBySonRoom(this.sonRoomId);
      if (res && res.data && Array.isArray(res.data)) {
        this.list = res.data;
      }
    },
    async getPlatformList() {
      const res = await hotelPlatformApi.listByHotel(this.hotelId);
      if (res && res.data && Array.isArray(res.data)) {
        this.platInfoList = res.data;
      }
    },
    async handleSaveAndEdit() {
      const _self=this;
      if (!_self.roomId || !_self.sonRoomId || !_self.chosenPlatInfo.PlatformID||!_self.chosenPlatInfo.PlatHotelID) {
        return
      }
      const form = {
        roomId: _self.roomId,
        sonRoomId: _self.sonRoomId,
        platformId: _self.chosenPlatInfo.PlatformID,
        platHotelId: _self.chosenPlatInfo.PlatHotelID
      }
      try {
        await sonRoomPlatformApi.add(form);
        _self.$message({
          message: '保存成功',
          type: 'success'
        });
      } catch (e) {

      }
    }
  },
}
</script>

<style lang="css">
</style>
