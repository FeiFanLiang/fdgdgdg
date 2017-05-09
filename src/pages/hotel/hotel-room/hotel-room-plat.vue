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
    <el-dialog title="添加酒店平台信息"  v-model="platVisible" :modal-append-to-body="false"   @open="dialogOpen">
      <el-form ref="form"  :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="11">
            <el-form-item label="平台酒店名称" prop="roomName">
              <el-input v-model="form.platRoomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="平台酒店编号" prop="roomCode">
              <el-input v-model="form.platRoomCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11">
            <el-form-item label="平台酒店英文名称">
              <el-input v-model="form.platRoomName_En"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-form-item label="请选择平台">
              <el-select  v-model="chosenPlatInfo" placeholder="请选择平台">
                <el-option v-for="(item,index) in platInfoList"
                  :label="item.PlatHotelName"
                  :value="item"
                  :key="index">
                </el-option>
              </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="11" >
              <el-form-item label="备注一">
                <el-input v-model="form.remark" type="textarea"></el-input>
              </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <div class="grid-content bg-purple">
              <el-form-item label="启用状态">
                <el-switch on-text="开启" off-text="关闭" :on-value="false" :off-value="true" v-model="form.isValid"></el-switch>
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="platVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSaveAndEdit()">保 存</el-button>
        </span>
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
      platVisible: false,
      form: {
        roomId: '',
        sonRoomId: '',
        platformId: '',
        platHotelId: '',
        platRoomName: '',
        platRoomCode: '',
        platRoomName_En: '',
        remark: '',
        isValid: true
      }
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
    add() {
      this.platVisible = true;
    },
    edit(index, row) {
      this.platVisible = true;
    },
    async del(index, row) {
      console.log(JSON.stringify(row))
      const _self = this;
      try {
        await _self.$confirm(`是否删除${row.PlatRoomName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await sonRoomPlatformApi.remove(row.ID);
        _self.fetchData();
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
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
      const _self = this;
      if (!_self.roomId || !_self.sonRoomId || !_self.chosenPlatInfo.PlatformID || !_self.chosenPlatInfo.PlatHotelID) {
        return
      }
      _self.form.roomId = _self.roomId;
      _self.form.sonRoomId = _self.sonRoomId;
      _self.form.platformId = _self.chosenPlatInfo.PlatformID;
      _self.form.platHotelId = _self.chosenPlatInfo.PlatHotelID;
      try {
        await sonRoomPlatformApi.add(_self.form);
        _self.getList()
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
