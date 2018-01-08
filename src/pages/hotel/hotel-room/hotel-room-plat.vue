<template lang="html">
<div class="">
  <el-dialog title="平台房型信息" size="large" v-model="hotelRoomPlatVisible" :modal-append-to-body="false" :before-close="Cancel" @open="dialogOpen">
    <el-row>
      <el-button @click="add">添加</el-button>
    </el-row>
    <el-table :data="list" ref="table" style="width: 100%;height:100%" border row-key="ID" element-loading-text="拼命加载中" v-loading="loading">
      <el-table-column prop="PlatformID" label="平台ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="Platform.PlatName" label="平台名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatHotelID" label="平台酒店ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatRoomName" label="平台房型名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatRoomCode" label="平台房型编号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatRoomName_En" label="平台房型英文名称" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatRealRoomID" label="平台真实房型ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatSaleRoomID" label="平台政策房型ID" show-overflow-tooltip></el-table-column>
      <el-table-column prop="PlatURL" label="访问政策房型URL" show-overflow-tooltip></el-table-column>
      <el-table-column label="起始有效期" show-overflow-tooltip>
        <template scope="scope">
<span>{{ scope.row.BeginDate.slice(0,10) }}</span>
</template>
      </el-table-column>
      <el-table-column label="截止有效期" show-overflow-tooltip>
<template scope="scope">
  <span>{{ scope.row.EndDate.slice(0,10) }}</span>
</template>
      </el-table-column>
      <el-table-column label="是否有效" width="70" align="center">
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
    <el-dialog :title="form.id?'编辑平台房型信息':'添加平台房型信息'" v-model="platVisible" :modal-append-to-body="false" size="small"  @open="dialogOpen" @close="resetForm('form')">
      <el-form :model="form" ref="form"  :rules="rules" label-width="130px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台酒店ID" prop="platHotelId">
              <el-input v-model="form.platHotelId" disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="请选择平台" prop="platformId">
              <el-select  v-model="form.platformId" placeholder="请选择平台" @change="platformChange">
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
                  <el-form-item label="起始有效期" prop="beginDate">
                    <el-date-picker
                    v-model="form.beginDate"
                    align="right"
                    type="date"
                    placeholder="选择起始有效期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="截止有效期" prop="endDate">
                    <el-date-picker
                    v-model="form.endDate"
                    align="right"
                    type="date"
                    placeholder="选择截止有效期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  </el-form-item>
              </el-col>
              </el-row>
        <el-row>
          <el-col :span="12">
            <!-- <el-form-item label="房型ID" prop="roomId">
              <el-input v-model="form.roomId" :disabled="isEdit"></el-input>
            </el-form-item> -->
            <el-form-item label="房型名称" prop="roomName">
              <el-input v-model="form.roomName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!-- <el-form-item label="子房型ID" prop="sonRoomId">
              <el-input v-model="form.sonRoomId" :disabled="isEdit"></el-input>
            </el-form-item> -->
            <el-form-item label="子房型名称" prop="sonRoomName">
              <el-input v-model="form.sonRoomName" :disabled="isEdit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台房型名称" prop="platRoomName">
              <el-input v-model="form.platRoomName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台房型英文名称">
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
            <el-form-item label="平台房型编号" >
              <el-input v-model="form.platRoomCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="平台床型">
              <el-input v-model="form.badType" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台早餐类型" >
              <el-input v-model="form.breakfastType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="最大入住人数">
              <el-input v-model="form.maxPerson" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="平台取消政策" >
              <el-input v-model="form.cancelPolicy"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="12">
            <el-form-item label="平台政策房型名称(售卖房型/子房型)">
              <el-input v-model="form.platSaleRoomName" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="连住天数" >
              <el-input v-model="form.gebunden"></el-input>
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
            <el-form-item label="是否有效">
              <el-switch on-text="是" off-text="否"  v-model="form.isValid"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="platVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  sonRoomPlatformApi,
  hotelPlatformApi,
  sonRoomApi,
  hotelRoomApi
} from 'api'
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
      pickerOptions1: {},
      loading: false,
      isEditable: true,
      list: [],
      platInfoList: [],
      rules: {
        /*  platHotelId: [
           {
             required: true,
             message: '请输入平台酒店ID'
           }
         ], */
        platformId: [
          {
            required: true,
            message: '请选择平台',
            type: 'number'
          }
        ],
        roomId: [
          {
            required: true,
            message: '请输入房型ID'
          }
        ],
        sonRoomId: [
          {
            required: true,
            message: '请输入子房型ID'
          }
        ]
      },
      isEdit: false,
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
        platUrl: '',
        beginDate: '',
        endDate: '',
        sonRoomName: '',
        roomName: '',
        badType: '',
        breakfastType: '',
        maxPerson: '',
        cancelPolicy: '',
        platSaleRoomName: '',
        gebunden: ''
      }
      // platHotelId:''
    }
  },
  // computed: {
  //   platHotelId: {
  //     // getter
  //     get: function() {
  //       const _self = this
  //       let platformId = ''
  //       if (
  //         _self.form.platformId &&
  //         _self.platInfoList &&
  //         Array.isArray(_self.platInfoList)
  //       ) {
  //         _self.platInfoList.forEach(item => {
  //           if (
  //             item &&
  //             item.Platform &&
  //             item.Platform.ID === _self.form.platformId
  //           ) {
  //             platformId = item.PlatHotelID
  //           }
  //         })
  //       }
  //       return platformId
  //     },
  //     // setter
  //     set: function(newValue) {
  //       this.platformId = newValue
  //     }
  //   }
  // },
  // watch: {
  //   platHotelId: function() {
  //     this.form.platHotelId = this.platHotelId
  //   }
  // },
  methods: {
    async platformChange(value) {
      // const res = await hotelPlatformApi.detail(value);
      // this.platHotelId = res.data.PlatHotelID;
      // console.log(res.data)
    },
    Cancel() {
      this.$emit('hide')
    },
    dialogOpen() {
      this.getList()
      this.getPlatformList()
    },
    async add() {
      const res = await sonRoomApi.detailById(this.sonRoomId)
      let a = res.data.SonRoomName
      const res2 = await hotelRoomApi.details(this.roomId)
      let b = res2.data.RoomName
      this.form = {
        roomId: this.roomId ? this.roomId : '',
        sonRoomId: this.sonRoomId ? this.sonRoomId : '',
        platformId: this.PlatformID ? this.PlatformID : '',
        id: '',
        platHotelId: '',
        platRoomName: '',
        platRoomCode: '',
        platRoomName_En: '',
        remark: '',
        isValid: true,
        platRealRoomId: '',
        platSaleRoomId: '',
        platUrl: '',
        beginDate: '',
        endDate: '',
        sonRoomName: a,
        roomName: b,
        badType: '',
        breakfastType: '',
        maxPerson: '',
        cancelPolicy: '',
        platSaleRoomName: '',
        gebunden: ''
      }
      this.platVisible = true
      this.isEdit = true
    },
    async edit(index, row) {
      console.log(row)
      const _self = this
      // _self.form.platHotelId = ''
      const res = await sonRoomApi.detailById(this.sonRoomId)
      let a = res.data.SonRoomName
      const res2 = await hotelRoomApi.details(this.roomId)
      let b = res2.data.RoomName
      ;(_self.form.roomId = _self.roomId ? _self.roomId : ''),
        (_self.form.sonRoomId = _self.sonRoomId ? _self.sonRoomId : ''),
        (_self.form.id = row.ID)
      //_self.form.roomId = row.RoomID
      //_self.form.sonRoomId = row.SonRoomID
      _self.form.platformId = row.PlatformID
      _self.form.platHotelId = row.PlatHotelID
      _self.form.platRoomName = row.PlatRoomName
      _self.form.platRoomCode = row.PlatRoomCode
      _self.form.platRoomName_En = row.PlatRoomName_En
      _self.form.remark = row.Remark
      _self.form.isValid = row.IsValid
      _self.form.platRealRoomId = row.PlatRealRoomID
      _self.form.platSaleRoomId = row.PlatSaleRoomID
      _self.form.platUrl = row.PlatURL
      _self.form.beginDate = row.BeginDate
      _self.form.endDate = row.EndDate
      _self.form.badType = row.BadType
      _self.form.breakfastType = row.BreakfastType
      _self.form.maxPerson = row.maxPerson
      _self.form.cancelPolicy = row.CancelPolicy
      _self.form.platSaleRoomName = row.PlatSaleRoomName
      _self.form.gebunden = row.Gebunden
      _self.platVisible = true
      _self.isEdit = true
      _self.form.sonRoomName = a
      _self.form.roomName = b
    },
    async del(index, row) {
      const _self = this
      _self
        .$confirm(`是否删除${row.PlatRoomName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          try {
            await sonRoomPlatformApi.del(row.ID)
            _self.getList()
            _self.$message({
              message: '删除成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
          }
        })
        .catch(() => {})
    },
    async getList() {
      const res = await sonRoomPlatformApi.listBySonRoom(this.sonRoomId)
      if (res && res.data && Array.isArray(res.data)) {
        this.list = res.data
      }
    },
    async getPlatformList() {
      this.loading = true
      const res = await hotelPlatformApi.listByHotel(this.hotelId)
      if (res && res.data && Array.isArray(res.data)) {
        this.platInfoList = res.data
      }
      this.loading = false
    },
    async submitForm() {
      const _self = this

      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            if (_self.form.id) {
              await sonRoomPlatformApi.edit(_self.form.id, _self.form)
            } else {
              const form = {
                ..._self.form
              }
              delete form.id
              await sonRoomPlatformApi.add(form)
            }

            this.platVisible = false
            this.isEdit = false
            _self.getList()
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
          } finally {
            _self.isEditable = true
          }
        }
      })
    }
  }
}
</script>

<style lang="css">

</style>
