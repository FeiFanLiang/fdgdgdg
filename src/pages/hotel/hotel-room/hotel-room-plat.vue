<template lang="html">
  <el-dialog title="平台信息" v-model="hotelRoomPlatVisible"  @close="Cancel" @open="dialogOpen">
  <el-table :data="list" ref="table" style="width: 100%;height:100%"  border row-key="ID">
    <el-table-column sortable prop="id" label="ID"  width="180" show-overflow-tooltip></el-table-column>
    <el-table-column sortable prop="modeName" label="账户名称"  show-overflow-tooltip></el-table-column>
    <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
    <el-table-column  width="150"  label="操作" fixed="right">
      <template scope="scope">
        <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
        <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="line">

  </div>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-row>
      <el-col :span="11">
        <el-form-item label="房间名称" prop="roomName">
          <el-input v-model="form.roomName"></el-input>
        </el-form-item>
      </el-col>
      <el-form-item label="平台名称" prop="platformId">
        <el-select class="w193" v-model="form.platformId" placeholder="请选择">
          <el-option v-for="(item,index) in platInfoList"
            :label="item.PlatHotelName"
            :value="item.ID"
            :key="index">
          </el-option>
        </el-select>
      </el-form-item>
    </el-row>
    <el-row>
      <el-col :span="11" :offset="11">
        <el-button type="primary" @click="handleSaveAndEdit()">保存</el-button>
      </el-col>
    </el-row>

  </el-form>

  </el-dialog>
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
      platInfoList:[],
      form: {
        platformId: '',
        sonRoomId: 2092,
        roomId: 831,
        platHotelId: 0,
      },
      rules: {},
    }
  },
  methods: {
    Cancel() {
      this.$emit('hide')
    },
    dialogOpen(){
      this.getList();
      this.getPlatformList();
    },
    async getList() {
      const res = await sonRoomPlatformApi.listBySonRoom(this.sonRoomId);
      if (res && res.data && Array.isArray(res.data)) {
        this.list = res.data;
      }
      console.log(res.data)
    },
    async getPlatformList() {
      const res = await hotelPlatformApi.listByHotel(this.hotelId);
      if (res && res.data && Array.isArray(res.data)) {
        this.platInfoList=res.data;
        console.log(JSON.stringify(this.platInfoList))
      }

    },
    async handleSaveAndEdit(){
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
