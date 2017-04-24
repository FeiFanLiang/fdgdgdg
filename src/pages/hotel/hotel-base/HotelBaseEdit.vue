<template lang="html">
<div id="HotelbaseEdit">
  <!-- form start -->
  <el-form ref="form" :model="form" :label-position="labelPosition" style="margin-top:25px">

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店ID" prop="ID">
            <el-input v-model="form.ID" :disabled='true'></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店编号" prop="HotelNum">
            <el-input v-model="form.HotelNum"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-form-item label="传真号" prop="FaxNum">
            <el-input v-model="form.FaxNum"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店名称" prop="HotelName">
            <el-input v-model="form.HotelName"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店英文名称" prop="HotelName_En">
            <el-input v-model="form.HotelName_En"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-form-item label="前台电话" prop="FrontPhone">
            <el-input v-model="form.FrontPhone"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-form-item label="星级" prop="Star">
            <el-select v-model="form.Star" clearable placeholder="请选择酒店星级">
              <el-option v-for="item in StarOptions" :label="item.StarName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-form-item label="结款" prop="PayMode">
            <el-select v-model="form.PayMode" clearable placeholder="请选择结款账户" >
              <el-option v-for="item in PayModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-form-item label="区域" prop="Area">
            <el-select v-model="form.Area" clearable filterable placeholder="请选择酒店所在区域">
              <el-option v-for="item in AreaOptions" :label="item.AreaName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="13">
        <div class="grid-content bg-purple">
          <el-form-item label="地址" prop="Address">
            <el-input v-model="form.Address"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="20">
        <div class="grid-content bg-purple">
          <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form.Remark"></el-input>
          </el-form-item>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="18">
      <el-col :span="5" :offset="5">
        <div class="grid-content bg-purple">
          <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即创建</el-button>
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
  <el-button-group>
    <router-link :to="{path:'policy'}">政策信息</router-link>
      <router-link :to="{path:'room'}">房型信息</router-link>
        <router-link :to="{path:'price'}">价格信息</router-link>
          <router-link :to="{path:'platform'}">平台映射</router-link>
  <!-- <el-button type="text" @click>政策信息</el-button>
  <el-button type="text">房型信息</el-button>
<el-button type="text">价格信息</el-button>
<el-button type="text">平台映射</el-button> -->
</el-button-group>
  <!-- <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="政策信息" name="first">政策信息
      <HotelPolicyList :hotelID='Number(this.$route.params.ID)'></HotelPolicyList>
    </el-tab-pane>
    <el-tab-pane label="房型信息" name="second">房型信息
      <HotelRoomList :hotelID='Number(this.$route.params.ID)'></HotelRoomList>
    </el-tab-pane>
    <el-tab-pane label="价格信息" name="third">价格信息</el-tab-pane>
    <el-tab-pane label="平台映射" name="fourth">平台映射
      <HotelPlatformInfo :hotelID='Number(this.$route.params.ID)'></HotelPlatformInfo>
    </el-tab-pane>
  </el-tabs> -->
  <!-- tab end -->
</div>
</template>

<script>
import { hotelPayModeApi, HotelBaseApi, hotelStarApi, hotelAreaApi } from 'api';
import HotelPlatformInfo from '../hotel-platform/HotelPlatformInfo';
import HotelRoomList from '../hotel-room/HotelRoomList';
import HotelPolicyList from '../hotel-policy/HotelPolicyList';

export default {
  data() {
    return {
      activeName: 'first',
      labelPosition: 'top',
      form: {
        ID: '',
        HotelNum: '',
        HotelName: '',
        HotelName_En: '',
        FrontPhone: '',
        Area: '',
        Address: '',
        Star: '',
        PayMode: '',
        Remark: ''
      },
      //ID: 0,
      AreaOptions: [],
      StarOptions: [],
      PayModeOptions: []
    };
  },

  components: {
    HotelPlatformInfo,
    HotelRoomList,
    HotelPolicyList
  },


  mounted () {

    this.ID = this.$route.params.ID;
    this.getHotelbaseList(this.ID);
    this.getPayModeOptions();
    this.getStarOptions();
    // this.getAreaOptions();
  },
  methods: {
    async getAreaOptions(query) {
      const res = await hotelAreaApi.listByQuery(query);
      //this.AreaOptions = res.data;
    },
    async getPayModeOptions() {
      const res = await hotelPayModeApi.getList();
      this.PayModeOptions = res.data;
    },
    async getStarOptions() {
      const res = await hotelStarApi.list();
      this.StarOptions = res.data;
    },
    async getHotelbaseList(ID) {
      ID = this.ID;
      const res = await HotelBaseApi.detailsById(ID);
      this.form = res.data;
    },
    onSubmit() {
      try {
        HotelBaseApi.edit(this.form.ID,this.form);
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
