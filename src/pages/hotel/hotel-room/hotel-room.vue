<template>
<div id="hotel-room-list" style="color:gray;">
    <!-- <HotelTopMenu path="room">
        <el-button type="primary" @click="hotelroomAdd">创建</el-button>
    </HotelTopMenu> -->
    <el-row>
      <el-button type="primary" @click="hotelroomAdd">创建</el-button>
    </el-row>
    <el-table :data="hotelroomlist" style="width: 100%;text-align:center;" border element-loading-text="拼命加载中"
      v-loading="loading">
        <el-table-column prop="RoomName" width="95" label="产品名称">
            <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>房间ID: {{ scope.row.ID }}</p>
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
    <el-table-column label="子房型名称" width="150">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
     <td>
        <el-tooltip class="item" effect="dark" :content="item.SonRoomName" placement="top-start" :visible-arrow="false">
            <p class="mytoollip">{{ item.SonRoomName }}</p>
        </el-tooltip>
      </td>
</tr>
</template>
    </el-table-column>
    <el-table-column label="房间编号" class="child-table" width="95">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
        <td>
            <el-tooltip class="item" effect="dark" :content="item.SonRoomCode" placement="top-start" :visible-arrow="false">
                <p class="mytoollip">{{ item.SonRoomCode }}</p>
            </el-tooltip>
        </td>
</tr>
</template>
    </el-table-column>
    <el-table-column label="早餐类型" width="95">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
        <td>
             <el-tooltip class="item" effect="dark" :content="transBreakfastTypes(item.BreakfastType)" placement="top-start" :visible-arrow="false">
                 <p class="mytoollip">{{transBreakfastTypes(item.BreakfastType)}}</p>
            </el-tooltip>
        </td>
</tr>
</template>
    </el-table-column>
    <el-table-column label="状态" width="65">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
    <td>
        <i class="el-icon-circle-check" style="color:#13CE66" v-if="!item.IsStop"></i>
        <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
    </td>
</tr>
</template>
    </el-table-column>
    <el-table-column label="备注一">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
   <td>
       <el-tooltip class="item" effect="dark" :content="item.Remark" placement="top-start" :visible-arrow="false">
            <p class="mytoollip">{{ item.Remark }}</p>
        </el-tooltip>
   </td>

</tr>
</template>
    </el-table-column>
    <el-table-column label="备注二">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
    <td>
        <el-tooltip class="item" effect="dark" :content="item.Remark2" placement="top-start" :visible-arrow="false">
            <p class="mytoollip">{{ item.Remark2 }}</p>
        </el-tooltip>
    </td>
</tr>
</template>
    </el-table-column>
    <el-table-column label="子房型操作" width="170" fixed="right">
      <template scope="scope">
<tr v-for="(item,index) in scope.row.SonRooms" :key="index" class="child-table">
    <td>
        <el-button size="mini" @click="hotelSonRoomPlatEdit(index,scope.row)">平台</el-button>
        <el-button size="mini" @click="hotelSonRoomEdit(index,scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="hotelSonRoomDelete(index,scope.row)">删除</el-button>
    </td>
</tr>
</template>
    </el-table-column>

    <el-table-column width="195" label="房型操作" fixed="right">
      <template scope="scope">
        <tr class="child-table">
            <td>
                <el-button size="mini" @click="hotelSonRoomAdd( scope.row)">添加子房型</el-button>
            </td>
        </tr>
        <tr class="child-table">
            <td>
                <el-button size="mini" @click="hotelroomEdit( scope.row)">编辑</el-button>
                <el-button size="mini" @click="hotelroomDetail( scope.row)">展示信息</el-button>
                <el-button size="mini" type="danger" @click="hotelroomDelete( scope.row)">删除</el-button>
            </td>
        </tr>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog :title="form.id?'编辑房间信息':'添加房间信息'" v-model="dialogVisible" size="small" @close="resetForm('form')">
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
            <el-input type="number" v-model="form.roomCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="床型">
            <el-select v-model="bed" placeholder="请选择床型" multiple>
              <el-option v-for="(item,index) in bedsOptions " :label="item.BedName" :value="item.ID" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
         <el-col :span="24">
            <el-form-item label="备注">
                <el-input v-model="form.remark" type="textarea"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveAndEdit()" :loading="!isEditRoom">{{isEditRoom?'确 定':'提交中'}}</el-button>
      </span>
  </el-dialog>
  <el-dialog :title="sonForm.id?'编辑子房间信息':'添加子房间信息'" v-model="sonFormDialogVisible" size="small" @close="dialogClose">
    <el-form ref="sonForm" :model="sonForm" :rules="sonRules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="早餐类型">
            <el-select v-model="sonForm.breakfastType" placeholder="请选择早餐类型" @change="changeBreakfastType">
              <el-option v-for="(item,index) in breakfastTypes " :label="item.name" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="子房间名称" prop="roomName">
            <el-input v-model="sonForm.sonRoomName" disabled="disabled"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="子房间编号" prop="roomCode">
            <el-input v-model="sonForm.sonRoomCode"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="备注一">
            <el-input v-model="sonForm.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="备注二">
            <el-input v-model="sonForm.remark2" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <div class="grid-content bg-purple">
            <el-form-item label="启用状态">
              <el-switch on-text="开启" off-text="关闭" :on-value="false" :off-value="true" v-model="sonForm.isStop"></el-switch>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="sonFormDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSonRoomSaveAndEdit()" :loading="!isEditSonRoom">{{isEditSonRoom?'确 定':'提交中'}}</el-button>
    </span>
  </el-dialog>
  <HotelRoomPlat :hotel-id="form.hotelId" :room-id="roomId" :son-room-id="sonRoomId" :hotel-room-plat-visible="hotelRoomPlatVisible" @hide="hotelRoomPlatVisible=false"></HotelRoomPlat>
</div>
</template>

<script>
import { hotelRoomApi, sonRoomApi, hotelRoomBedApi } from 'api'
import { HotelTopMenu } from 'components'
import HotelRoomPlat from './hotel-room-plat'
export default {
  components: {
    HotelTopMenu,
    HotelRoomPlat,
    hotelRoomBedApi
  },
  data() {
    return {
      isEditRoom: true,
      isEditSonRoom: true,
      loading: false,
      roomId: '',
      sonRoomId: '',
      breakfastTypes: [
        {
          name: '未定',
          value: '未定'
        },
        {
          name: '无早',
          value: '无早'
        },
        {
          name: '一餐',
          value: '一餐'
        },
        {
          name: '两餐',
          value: '两餐'
        },
        {
          name: '三餐',
          value: '三餐'
        },
        {
          name: '四餐',
          value: '四餐'
        },
        {
          name: '更多',
          value: '更多'
        }
      ],
      bed: [],
      form: {
        id: '',
        hotelNum: '',
        hotelId: '',
        roomName: '',
        roomCode: '',
        roomCount: '',
        remark: '',
        Beds: []
      },
      sonForm: {
        id: '',
        roomID: '',
        sonRoomName: '',
        sonRoomCode: '',
        roomCount: '',
        remark: '',
        remark2: '',
        breakfastType: '',
        isStop: false
      },
      rules: {
        roomName: [
          {
            required: true,
            message: '请填写房间名称',
            trigger: 'blur'
          }
        ]
      },
      sonRules: {
        sonRoomName: [
          {
            required: true,
            message: '请填写房间名称',
            trigger: 'blur'
          }
        ],
        sonRoomCode: [
          {
            required: true,
            message: '请填写房间编号',
            trigger: 'blur'
          }
        ]
      },
      dialogVisible: false,
      sonFormDialogVisible: false,
      bedsOptions: [],
      hotelroomlist: [],
      hotelRoomPlatVisible: false,
      breakfastTypesName: '',
      roomName: ''
    }
  },
  mounted() {
    this.form.hotelId = this.$route.params.ID
    this.fetchData()
    this.bedsList()
    //this.show();
  },
  watch: {
    breakfastTypesName: function(row) {
      this.sonForm.sonRoomName =
        this.roomName + '[' + this.breakfastTypesName + ']'
    }
  },
  methods: {
    async bedsList() {
      const res = await hotelRoomBedApi.list()
      this.bedsOptions = res.data
    },
    transBreakfastTypes(value) {
      const type = this.breakfastTypes.find(item => item.value === value)
      if (type) return type.name
      return ''
    },
    dialogClose() {
      for (let item in this.form) {
        this.form[item] = ''
      }
      for (let item in this.sonForm) {
        if (item === 'isStop') {
          this.sonForm[item] = true
        } else {
          this.sonForm[item] = ''
        }
      }
    },
    async handleSaveAndEdit() {
      const _self = this
      for (let item in _self.bed) {
        _self.form.Beds.push({ ID: _self.bed[item] })
      }
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditRoom = false
            if (_self.form.id) {
              await hotelRoomApi.edit(_self.form.id, _self.form)
            } else {
              let form = {
                ..._self.form
              }
              delete form.id
              await hotelRoomApi.add(form)
            }
            _self.fetchData()
            _self.dialogVisible = false
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
          } catch (e) {
            console.error(e)
          } finally {
            _self.isEditRoom = true
          }
        } else {
          return false
        }
      })
    },
    async handleSonRoomSaveAndEdit() {
      const _self = this
      _self.$refs['sonForm'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditSonRoom = false
            if (_self.sonForm.id) {
              await sonRoomApi.edit(_self.sonForm.id, _self.sonForm)
            } else {
              let form = {
                ..._self.sonForm
              }
              delete form.id
              await sonRoomApi.add(form)
            }
            _self.$message({
              message: '保存成功',
              type: 'success'
            })
            _self.sonFormDialogVisible = false
            _self.fetchData()
          } catch (e) {
            console.error(e)
          } finally {
            _self.isEditSonRoom = true
          }
        } else {
          return false
        }
      })
    },
    hotelroomAdd() {
      this.dialogVisible = true
      this.form = {
        roomCount: '',
        hotelId: this.$route.params.ID,
        Beds: []
      }
      this.bed = []
    },
    changeBreakfastType(value) {
      this.breakfastTypesName = value
    },
    hotelSonRoomAdd(row) {
      this.roomName = row.RoomName
      this.sonForm = {
        roomID: row.ID,
        breakfastType: this.breakfastTypes.name,
        isStop: false,
        sonRoomName: this.roomName + '[' + this.breakfastTypesName + ']'
      }
      this.sonFormDialogVisible = true
    },
    hotelroomEdit(row) {
      const _self = this
      _self.form.id = row.ID
      _self.form.hotelId = row.HotelID
      _self.form.roomName = row.RoomName
      _self.form.roomCount = row.RoomCount + '' // 返回的是数字类型,表单验证会存在问题
      _self.form.roomCode = row.RoomCode
      _self.form.Beds = row.Beds
      _self.form.remark = row.Remark
      _self.dialogVisible = true
    },
    async hotelSonRoomEdit(index, row) {
      if (!row || !row.SonRooms) retrun
      const sonRooms = row.SonRooms[index]
      const _self = this
      const res = await hotelRoomBedApi.details(sonRooms.BreakfastType)
      let bedName = res.data.BedName
      _self.roomName = row.RoomName
      _self.breakfastTypesName = bedName
      _self.sonFormDialogVisible = true
      _self.sonForm.id = sonRooms.ID
      _self.sonForm.roomID = sonRooms.RoomID
      // _self.sonForm.sonRoomName = sonRooms.SonRoomName;
      _self.sonForm.sonRoomName =
        this.roomName + '[' + _self.breakfastTypesName + ']'
      _self.sonForm.sonRoomCode = sonRooms.SonRoomCode
      _self.sonForm.remark = sonRooms.Remark
      _self.sonForm.remark2 = sonRooms.Remark2
      _self.sonForm.breakfastType = bedName
      _self.sonForm.isStop = sonRooms.IsStop
    },
    hotelSonRoomPlatEdit(index, row) {
      if (!row || !row.SonRooms) retrun
      const sonRooms = row.SonRooms[index]
      this.roomId = sonRooms.RoomID
      this.sonRoomId = sonRooms.ID
      this.hotelRoomPlatVisible = true
    },
    async hotelroomDelete(row) {
      const _self = this
      _self
        .$confirm(`是否删除${row.RoomName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          try {
            await hotelRoomApi.del(row.ID)
            _self.fetchData()
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
    async hotelSonRoomDelete(index, row) {
      if (!row || !row.SonRooms || !row.SonRooms[index]) retrun
      const _self = this
      _self
        .$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(async () => {
          try {
            await sonRoomApi.del(row.SonRooms[index].ID)
            _self.fetchData()
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
    async fetchData() {
      this.loading = true
      if (!this.$route.params.ID) return
      const res = await hotelRoomApi.list(this.$route.params.ID)
      this.hotelroomlist = res.data
      const res2 = await hotelRoomBedApi.list()
      this.loading = false
    },
    hotelroomDetail(row) {
      this.$router.push({
        name: '房型展示信息',
        params: {
          RoomID: row.ID,
          hotelId: this.$route.params.ID
        }
      })
    }
  }
}
</script>
<style lang="scss">
#hotel-room-list {
    .el-table .info-row {
        background: #c9e5f5;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: #fff;
    }
    .child-table > td {
        border-bottom: 0;
        border-right: 0;
    }
    .mytoollip{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
