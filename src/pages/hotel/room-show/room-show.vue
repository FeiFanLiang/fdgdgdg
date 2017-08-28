<template lang="html">
  <div>
    <el-row>
        <el-button type="primary" @click="roomShowAdd">创建</el-button>
        <el-button @click="back">返回</el-button>
    </el-row>
    <CustomTable :list="roomShowList" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" >
      <el-table-column  width="150"  label="操作" fixed="right">
        <template scope="scope">
          <el-button size="small" @click="clickEditBtn(scope.row)">编辑</el-button>

            <DeleteButton api="roomShowApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
         </template>
      </el-table-column>
    </CustomTable>
    <!-- <el-table :data="roomShowList" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border>
        <el-table-column label="酒店" prop="HotelID"></el-table-column>
        <el-table-column label="房间ID" prop="RoomID"></el-table-column>
        <el-table-column label="房间面积" prop="Acreage"></el-table-column>
        <el-table-column label="入住人数" prop="CheakInNum"></el-table-column>
        <el-table-column label="楼层" prop="Floor"></el-table-column>
        <el-table-column label="网络状况" prop="NetWork"></el-table-column>
        <el-table-column label="无烟状况" prop="Smoke"></el-table-column>
        <el-table-column label="特色标签" prop="Lable"></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
    </el-table> -->

    <el-dialog :title="form.ID?'编辑房间展示信息':'添加房间展示信息'" v-model="showDialog" size="small" @close="resetForm('form')">
        <el-form ref="form" :model="form">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="房间面积" prop="Acreage">
                        <el-input v-model="form.Acreage"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="入住人数" prop="CheakInNum">
                        <el-input v-model="form.CheakInNum" type="number"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="楼层" prop="Floor">
                        <el-input v-model="form.Floor"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="网络状况" prop="NetWork">
                        <el-input v-model="form.NetWork"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="无烟状况" prop="Smoke">
                        <el-input v-model="form.Smoke"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="特色标签" prop="Lable">
                        <el-input v-model="form.Lable"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
import { roomShowApi } from 'api'

export default {
  created() {
    this.RoomID = this.$route.params.RoomID
    this.hotelID = this.$route.params.hotelId
    this.fetchData()
    this.configList = roomShowApi.getConfig()
  },
  data() {
    return {
      roomShowList: [],
      loading: false,
      isEditable: true,
      showDialog: false,
      showBargainsRoom: false,
      form: {
        ID: '',
        HotelID: '',
        RoomID: '',
        Acreage: '',
        CheakInNum: '',
        Floor: '',
        NetWork: '',
        Smoke: '',
        Lable: ''
      }
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      _self.roomShowList = []
      try {
        const res = await roomShowApi.detailByRoomID(_self.RoomID)
        if (res && res.data) {
          _self.roomShowList = res.data
        }
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    roomShowAdd() {
      const _self = this
      _self.form = {
        RoomID: this.$route.params.RoomID,
        hotelID: this.$route.params.hotelId
      }
      _self.showDialog = true
    },
    async submitForm() {
      const _self = this
      try {
        _self.isEditable = false
        if (_self.form.ID) {
          await roomShowApi.edit(_self.form)
        } else {
          let form = {
            ..._self.form
          }
          delete form.ID
          await roomShowApi.add(form)
        }
        _self.fetchData()
        _self.$refs['form'].resetFields()
        _self.showDialog = false
        _self.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
        _self.$message.error('保存失败!!!')
      } finally {
        _self.isEditable = true
      }
    },
    async clickEditBtn(row) {
      const _self = this
      try {
        const res = await roomShowApi.detailByRoomshowID(row.ID)
        _self.form = res.data
        _self.showDialog = true
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
