<template lang="html">
<div id="HotelbaseEdit">
  <!-- form start -->
  <el-form ref="form" :model="form" style="margin-top:25px" :label-position="labelPosition">

      <el-row :gutter="20">
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店ID">
              <el-input v-model="form.id" :disabled='true'></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7" :offset="1">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店名称">
              <el-input v-model="form.HotelName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="酒店英文名称">
              <el-input v-model="form.HotelName_En"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="星级" prop="Star">
              <el-select v-model="form.Star" clearable placeholder="请选择酒店星级">
                <el-option v-for="item in StarOptions" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="前台电话">
              <el-input v-model="form.FrontPhone"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="地址">
              <el-input v-model="form.Address"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item label="结款" prop="PayMode">
              <el-select v-model="form.PayMode" clearable placeholder="请选择结款账户" >
                <el-option v-for="item in PayModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="7">
          <div class="grid-content bg-purple">
            <el-form-item label="采购人">
              <el-input v-model="form.PersonName"></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-form-item label="政策负责人">
              <el-input v-model="form.PurchasingName"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="20">
          <div class="grid-content bg-purple">
            <el-form-item label="备注">
              <el-input type="textarea" v-model="form.Remark"></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="15">
        <el-col :span="5" :offset="5">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content bg-purple">
            <el-form-item>
              <el-button @click="Cancel">取消</el-button>
            </el-form-item>
          </div>
        </el-col>
      </el-row>

  </el-form>
  <!-- form end -->

  <!-- tab start -->
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="政策信息" name="first">政策信息
      <HotelPolicyList></HotelPolicyList>
    </el-tab-pane>
    <el-tab-pane label="房型信息" name="second">房型信息
      <HotelRoomList></HotelRoomList>
    </el-tab-pane>
    <el-tab-pane label="价格信息" name="third">价格信息</el-tab-pane>
    <el-tab-pane label="平台映射" name="fourth">平台映射
      <HotelPlatformInfo></HotelPlatformInfo>
    </el-tab-pane>
  </el-tabs>
  <!-- tab end -->
</div>
</template>

<script>
import { HotelPayModeApi, HotelBaseApi } from 'api';
import HotelPlatformInfo from '../hotel-platform/HotelPlatformInfo';
import HotelRoomList from '../hotel-room/HotelRoomList';
import HotelPolicyList from '../hotel-policy/HotelPolicyList';

export default {
  data() {
    return {
      activeName: 'first',
      labelPosition: 'top',
      PayModeOptions: [],
      form: {
        id: '',
        HotelName: '',
        HotelName_En: '',
        FrontPhone: '',
        Address: '',
        Star: '',
        PersonName: '',
        PurchasingName: '',
        PayMode: '',
        Remark: ''
      },
      StarOptions: [
        {
          value: '1',
          label: '一星级'
        },
        {
          value: '2',
          label: '二星级'
        },
        {
          value: '3',
          label: '三星级'
        },
        {
          value: '4',
          label: '四星级'
        },
        {
          value: '5',
          label: '五星级'
        },
        {
          value: '6',
          label: '六星级'
        }
      ],
      PayModeOptions: []
    };
  },
  components: {
    HotelPlatformInfo,
    HotelRoomList,
    HotelPolicyList
  },

  created() {
    this.id = this.$route.params.id;
    this.getHotelbaseList(this.id);
    this.getPayModeOptions();
  },
  methods: {
    async getHotelbaseList(id) {
      let options = {
        id: this.id
      };
      await HotelBaseApi.listAll(options).then(data => {
        let { code, hotelbase_list } = data;
        if (code === 200) {
          this.hotelbase = hotelbase_list;
        }
      });
    },
    async getPayModeOptions() {
      const data = await HotelPayModeApi.getDetail();
      let { code, paymodeOptions } = data;
      if (code === 200) {
        this.PayModeOptions = paymodeOptions;
      }
    },
    onSubmit() {
      try {
        HotelBaseApi.edit(this.form);
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      } catch (e) {}
    },
    Cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
  #HotelbaseEdit {
    margin: 20px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
