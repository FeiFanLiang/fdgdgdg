<template lang="html">
  <div class="">
    <!--:rules="rules"-->
      <el-form ref="form" :model="form">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="入住政策" prop="CheckInPolicy">
              <el-input v-model="form.CheckInPolicy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="离店" prop="CheckOutPolicy">
              <el-input v-model="form.CheckOutPolicy"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="服务设施" prop="ServiceFacility">
              <el-input v-model="form.ServiceFacility"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="餐饮设施" prop="DiningFacility">
              <el-input v-model="form.DiningFacility"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="娱乐设施" prop="RecreationFacility">
              <el-input v-model="form.RecreationFacility"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="会议设施" prop="ConferenceFacility">
              <el-input v-model="form.ConferenceFacility"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="客房设施" prop="RoomFacility">
              <el-input v-model="form.RoomFacility"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="楼层数" prop="FloorLevelsNum">
              <el-input v-model="form.FloorLevelsNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="交通状况" prop="Traffic">
              <el-input v-model="form.Traffic"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="特色标签" prop="Lable">
              <el-input v-model="form.Lable"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="商圈" prop="HotArea">
              <el-input v-model="form.HotArea"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="经纬度" prop="coordinate">
              <el-input v-model="form.coordinate"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="房间数量" prop="Rooms">
              <el-input v-model="form.Rooms"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="装修时间" prop="FilmentTime">
              <el-input v-model="form.FilmentTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="经营时间" prop="BusinessTime">
              <el-input v-model="form.BusinessTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="2" :offset="15">
              <el-form-item>
                <el-button @click="Cancel">取消</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
              </el-form-item>
            </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
import { hotelShowApi } from 'api'
export default {
  data() {
    return {
      isEditable: true,
      form: {}
    }
  },
  methods: {
    async getHotelShowList(ID) {
      const _self = this
      ID = _self.ID
      const res = await hotelShowApi.detail(ID)
      _self.form = res.data
    },
    async submitForm() {
      try {
        _self.isEditable = false
        await hotelShowApi.edit(this.form)
        this.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
      } finally {
        _self.isEditable = true
      }
    },
    Cancel() {
      this.$router.go(-1)
    }
  },
  mounted() {
    this.ID = this.$route.params.hotelShowID
    this.getHotelShowList(this.ID)
  }
}
</script>

<style lang="css">
</style>
