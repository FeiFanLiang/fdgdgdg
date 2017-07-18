<template lang="html">
  <div class="">
    <el-dialog title="平台酒店信息编辑" size="large"  v-model="hotelRoomPlatVisible" :modal-append-to-body="false"  @close="Cancel" @open="dialogOpen">
      <el-row>
        <el-button  @click="add">添加</el-button>
        <el-button @click="back">返回</el-button>
      </el-row>
    <el-table :data="list" ref="table"  style="width: 100%;height:100%"  border row-key="ID">
      <el-table-column  prop="PlatformID" label="平台ID"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="Platform.PlatName" label="平台名称"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatHotelID" label="平台酒店ID"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatRoomName" label="平台酒店名称"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatRoomCode" label="平台酒店编码"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatRoomName_En" label="平台酒店英文名称"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatRealRoomID" label="平台真实房型ID"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatSaleRoomID" label="平台政策房型ID"  show-overflow-tooltip></el-table-column>
      <el-table-column  prop="PlatURL" label="访问政策房型URL"  show-overflow-tooltip></el-table-column>
      <el-table-column label="启用状态" width="70" align="center">
        <template scope="scope">
            <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsValid"></i>
            <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
          </template>
      </el-table-column>
      <el-table-column  width="150"  label="操作" fixed="right">
        <template scope="scope">
<el-button size="small" @click="edit(scope.$index, scope.row)">
    编辑</el-button>
<el-button size="small" type="danger" @click="del(scope.$index, scope.row)">删除</el-button>
</template>
      </el-table-column>
    </el-table>
    </el-dialog>

    <el-dialog :title="form.id?'编辑酒店平台信息':'添加酒店平台信息'" v-model="platVisible" :modal-append-to-body="false" size="small"  @open="dialogOpen" @close="resetForm('form')">
      <el-form :model="form" ref="form"  :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台酒店ID" prop="platHotelId">
              <el-input v-model="form.platHotelId" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请选择平台" prop="platformId">
              <el-select  v-model="form.platformId" placeholder="请选择平台" :disabled="isEdit">
                <el-option v-for="(item,index) in platInfoList"
                  :label="item.Platform.PlatName"
                  :value="item.Platform.ID"
                  :key="index">
                </el-option>
              </el-select>
              </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="房型ID" prop="roomId">
              <el-input v-model="form.roomId" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="子房型ID" prop="sonRoomId">
              <el-input v-model="form.sonRoomId" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台酒店名称" prop="platRoomName">
              <el-input v-model="form.platRoomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台酒店英文名称">
              <el-input v-model="form.platRoomName_En"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台政策房型ID" >
              <el-input v-model="form.platSaleRoomId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="访问政策房型URL">
              <el-input v-model="form.platUrl"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台真实房型ID">
              <el-input v-model="form.platRealRoomId" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台酒店编号" >
              <el-input v-model="form.platRoomCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" >
            <el-form-item label="备注一">
              <el-input v-model="form.remark" type="textarea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="启用状态">
              <el-switch on-text="开启" off-text="关闭"  v-model="form.isValid"></el-switch>
            </el-form-item>
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
            rules: {
                platHotelId: [{
                    required: true,
                    message: '请输入平台酒店ID'
                }],
                platformId: [{
                    required: true,
                    message: '请选择平台',
                    type: 'number'
                }],
               roomId: [{
                    required: true,
                    message: '请输入房型ID'
                }],
                sonRoomId: [{
                    required: true,
                    message: '请输入子房型ID'
                }],
                platRoomName: [{
                    required: true,
                    message: '请输入平台酒店名称'
                }],

            },
            isEdit :false,
            platVisible: false,
            form: {
                id: '',
                roomId: '',
                sonRoomId: '',
                platformId: '',
                platHotelId: '',
                platRoomName: '',
                platRoomCode: '',
                platRoomName_En: '',
                remark: '',
                isValid: true,
                platRealRoomId: '',
                platSaleRoomId: '',
                platUrl: ''
            }
        }
    },
    computed: {
        platHotelId() {
            const _self = this;
            let platformId = '';
            if (_self.form.platformId && _self.platInfoList && Array.isArray(_self.platInfoList)) {
                _self.platInfoList.forEach(item => {
                    if (item && item.Platform && item.Platform.ID === _self.form.platformId) {
                        platformId = item.PlatHotelID
                    }
                })
            }
            return platformId
        }
    },
    methods: {
        back(){
            this.$router.go(0)
        },
        Cancel() {
            this.$emit('hide')
        },
        dialogOpen() {
            this.getList();
            this.getPlatformList();
        },
        add() {
            this.form = {
                roomId : this.roomId ? this.roomId : '',
                sonRoomId : this.sonRoomId ? this.sonRoomId : '',
                platformId : this.PlatformID ? this.PlatformID : '',
                id: '',
                platHotelId: '',
                platRoomName: '',
                platRoomCode: '',
                platRoomName_En: '',
                remark: '',
                isValid: true,
                platRealRoomId: '',
                platSaleRoomId: '',
                platUrl: ''
            }
            this.platVisible = true;
            this.isEdit = false;
        },
        edit(index, row) {
            const _self = this;
            _self.form.id = row.ID;
            _self.form.roomId = row.RoomID;
            _self.form.sonRoomId = row.SonRoomID;
            _self.form.platformId = row.PlatformID;
            _self.form.platHotelId = row.PlatHotelID;
            _self.form.platRoomName = row.PlatRoomName;
            _self.form.platRoomCode = row.PlatRoomCode;
            _self.form.platRoomName_En = row.PlatRoomName_En;
            _self.form.remark = row.Remark;
            _self.form.isValid = row.IsValid;
            _self.form.platRealRoomId = row.PlatRealRoomID;
            _self.form.platSaleRoomId = row.PlatSaleRoomID;
            _self.form.platUrl = row.PlatURL;
            _self.platVisible = true;
            _self.isEdit = true;
        },
        async del(index, row) {
            const _self = this;
            _self.$confirm(`是否删除${row.PlatRoomName}?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                try {
                    await sonRoomPlatformApi.del(row.ID);
                    _self.getList();
                    _self.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } catch (e) {
                    console.error(e);
                }
            }).catch(() => {});
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
            _self.$refs['form'].validate(async valid => {
              if (valid) {
                try {
                    if (_self.form.id) {
                        await sonRoomPlatformApi.edit(_self.form.id, _self.form);
                    } else {
                        const form = { ..._self.form
                        };
                        delete form.id
                        await sonRoomPlatformApi.add(form);
                    }

                    this.platVisible = false;
                    this.isEdit = false;
                    _self.getList()
                    _self.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        });
    },
  }
}
</script>

<style lang="css">
</style>
