<template lang="html">
    <div id="hotel-show">
        <el-row>
            <el-button type="primary" @click="hotelShowAdd">创建</el-button>
        </el-row>
        <CustomTable :list="hotelShowList" :loading="loading" :configList="configList.listFields" :editMethod="configList.editMethod" @successCallBack="fetchData" >
          <el-table-column width="150" label="操作" fixed="right">
              <template scope="scope">
                  <el-button size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
                    <DeleteButton api="hotelShowApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
              </template>
          </el-table-column>
        </CustomTable>
        <!-- <el-table :data="hotelShowList" ref="table" style="width: 100%;margin-top:20px;" element-loading-text="拼命加载中" v-loading="loading" border>
            <el-table-column label="酒店ID" prop="HotelID"></el-table-column>
            <el-table-column label="房间数量" prop="Rooms"></el-table-column>
            <el-table-column label="楼层数" prop="FloorLevelsNum"></el-table-column>
            <el-table-column label="经营时间" prop="BusinessTime"></el-table-column>
            <el-table-column label="入住政策" prop="CheckInPolicy"></el-table-column>
            <el-table-column label="离店" prop="CheckOutPolicy"></el-table-column>
            <el-table-column label="特色标签" prop="Lable"></el-table-column>
            <el-table-column width="150" label="操作" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <el-dialog :title="form.ID?'编辑酒店展示信息':'添加酒店展示信息'" v-model="showDialog" size="" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules">
                <el-row :gutter="5">
                    <el-col :span="6">
                        <el-form-item label="入住政策" prop="CheckInPolicy">
                            <el-input v-model="form.CheckInPolicy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="离店" prop="CheckOutPolicy">
                            <el-input v-model="form.CheckOutPolicy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="服务设施" prop="ServiceFacility">
                            <el-input v-model="form.ServiceFacility"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="餐饮设施" prop="DiningFacility">
                            <el-input v-model="form.DiningFacility"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="6">
                        <el-form-item label="娱乐设施" prop="RecreationFacility">
                            <el-input v-model="form.RecreationFacility"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="会议设施" prop="ConferenceFacility">
                            <el-input v-model="form.ConferenceFacility"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客房设施" prop="RoomFacility">
                            <el-input v-model="form.RoomFacility"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="楼层数" prop="FloorLevelsNum">
                            <el-input v-model="form.FloorLevelsNum"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="6">
                        <el-form-item label="交通状况" prop="Traffic">
                            <el-input v-model="form.Traffic"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="特色标签" prop="Lable">
                            <el-input v-model="form.Lable"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="商圈" prop="HotArea">
                            <el-input v-model="form.HotArea"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="经纬度" prop="coordinate">
                            <el-input v-model="form.coordinate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="5">
                    <el-col :span="6">
                        <el-form-item label="房间数量" prop="Rooms">
                            <el-input v-model="form.Rooms"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="装修时间" prop="FilmentTime">
                            <el-input v-model="form.FilmentTime"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="经营时间" prop="BusinessTime">
                            <el-input v-model="form.BusinessTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-upload :action="uploadUrl" :before-upload="beforeAvatarUpload" list-type="picture-card" :file-list="imageList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :with-credentials="true">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
        </el-dialog>
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import path from '../../../api/api.js'

import { hotelShowApi, hotelImageApi } from 'api'
export default {
  created() {
    this.form.hotelId = this.$route.params.ID
    this.fetchData()
    this.configList = hotelShowApi.getConfig()
  },
  data() {
    return {
      uploadUrl: path.uploadUrl,
      imageList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      hotelShowList: [],
      loading: false,
      isEditable: true,
      showDialog: false,
      form: {
        ID: '',
        hotelId: '',
        Rooms: '',
        FloorLevelsNum: 1,
        CheckInPolicy: '',
        CheckOutPolicy: '',
        ServiceFacility: '',
        DiningFacility: '',
        RecreationFacility: '',
        ConferenceFacility: '',
        RoomFacility: '',
        Traffic: '',
        Lable: '',
        HotArea: '',
        coordinate: '',
        FilmentTime: '',
        BusinessTime: ''
      },
      rules: {
        CheckInPolicy: [
          {
            required: true,
            message: '请填写入住政策',
            trigger: 'blur'
          }
        ],
        Rooms: [
          {
            required: true,
            message: '请填写房间数量',
            trigger: 'blur'
          }
        ],
        BusinessTime: [
          {
            required: true,
            message: '请填写经营时间',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async fetchData() {
      const _self = this
      _self.loading = true
      _self.hotelShowList = []
      try {
        const res = await hotelShowApi.list()
        if (res && res.data) {
          _self.hotelShowList = res.data
        }
        _self.loading = false
      } catch (e) {
        console.error(e)
        _self.loading = false
      }
    },
    async getImageList(id) {
      const res = await hotelImageApi.listByHotelId(id)
      if (res.data && Array.isArray(res.data)) {
        this.imageList = res.data.map(item => ({
          id: item.ID,
          name: item.ImageUrl,
          url: path.imageUrl + item.ImageUrl
        }))
      }
    },
    beforeAvatarUpload(file) {
      const _self = this
      if (!_self.form.hotelId && !Object.is(_self.form.hotelId, 0)) {
        _self.$message({
          message: '酒店不存在，无法添加！',
          type: 'warning'
        })
        return false
      }
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJPG) {
        _self.$message.error('上传图片只能是 JPG/PNG 格式!')
      }
      return isJPG
    },
    async handleRemove(file, fileList) {
      try {
        if (file && file.id) {
          await hotelImageApi.del(file.id)
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      } catch (e) {
        this.$message.error('删除失败,请重试！')
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    async handleSuccess(response, file, fileList) {
      try {
        if (!response) {
          this.$message.error('上传失败,请重新上传')
          return false
        }
        const form = {
          hotelId: this.form.hotelId,
          imageUrl: response,
          smallImageUrl: '',
          imageType: file.type,
          description: '',
          imgWidth: 0,
          imgHeight: 0,
          imgGroup: ''
        }
        await hotelImageApi.add(form)
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (e) {
        this.$message.error('上传失败,请重新上传')
      }
    },
    handleError(err, file, fileList) {
      this.$message.error('上传失败,请重新上传')
    },
    async clickEditBtn(row) {
      const _self = this
      try {
        const res = await hotelShowApi.detail(row.ID)
        _self.form = res.data
        _self.form.hotelId = res.data.HotelID
        _self.getImageList(_self.form.hotelId)
        _self.showDialog = true
      } catch (e) {
        console.error(e)
      }
    },
    hotelShowAdd() {
      const _self = this
      _self.form = {
        hotelId: this.$route.params.ID
      }
      _self.imageList = []
      _self.showDialog = true
    },
    async submitForm() {
      const _self = this
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false
            if (_self.form.ID) {
              await hotelShowApi.edit(_self.form)
            } else {
              let form = {
                ..._self.form
              }
              delete form.ID
              await hotelShowApi.add(form)
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
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
#hotel-show {}
</style>
