<template lang="html">
<div id="HotelbaseEdit">
  <el-menu   mode="horizontal" >
  <el-menu-item v-for="item in routers" @click="goNextPage(item.path)">{{item.text}}</el-menu-item>
</el-menu>
<div class="line"></div>
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
            <el-button type="primary" @click="onSubmit('form')">保存</el-button>
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
</div>
</template>

<script>
import { hotelPayModeApi, HotelBaseApi, hotelStarApi, hotelAreaApi } from 'api';

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
      AreaOptions: [],
      StarOptions: [],
      PayModeOptions: [],
      routers: [
        { path: 'policy', text: '政策信息' },
        { path: 'room', text: '房型信息' },
        { path: 'price', text: '价格信息' },
        { path: 'platform', text: '平台映射' }
      ]
    };
  },
  mounted() {
    this.ID = this.$route.params.ID;
    this.getHotelbaseList(this.ID);
    this.getPayModeOptions();
    this.getStarOptions();
    // this.getAreaOptions();
  },
  methods: {
    goNextPage(path) {
      this.$router.push({ path });
    },
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
        HotelBaseApi.edit(this.form.ID, this.form);
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
