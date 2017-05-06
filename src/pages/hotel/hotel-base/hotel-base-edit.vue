<template lang="html">
<div id="hotelbaseEdit">
  <db-breadcrumb></db-breadcrumb>
  <HotelTopMenu path="">
  </HotelTopMenu>
  <!-- form start -->
  <el-form ref="form" :model="form" :label-position="labelPosition" style="margin-top:25px">

    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="酒店ID" prop="ID">
            <el-input v-model="form.ID" :disabled='true'></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店编号" prop="HotelNum">
            <el-input v-model="form.HotelNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店名称" prop="HotelName">
            <el-input v-model="form.HotelName"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店英文名称" prop="HotelName_En">
            <el-input v-model="form.HotelName_En"></el-input>
          </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">

      <el-col :span="6">
          <el-form-item label="前台电话" prop="FrontPhone">
            <el-input v-model="form.FrontPhone"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="传真号" prop="FaxNum">
            <el-input v-model="form.FaxNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="区域" prop="Area">
            <el-select v-model="form.Area" clearable filterable placeholder="请选择酒店所在区域">
              <el-option v-for="item in areaOptions" :label="item.AreaName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="地址" prop="Address">
            <el-input v-model="form.Address"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="星级">
            <el-select v-model="form.Star" clearable placeholder="请选择酒店星级">
              <el-option v-for="item in starOptions" :label="item.StarName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="18">
          <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form.Remark"></el-input>
          </el-form-item>
      </el-col>
      <!--<el-col :span="5">
          <el-form-item label="结款">
            <el-select v-model="form.PayMode" clearable  placeholder="请选择结款账户" >
              <el-option v-for="item in payModeOptions" :label="item.ModeName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>-->
    </el-row>
    <el-row :gutter="18">
      <el-col :span="2" :offset="19">
        <el-form-item>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
  <!-- form end -->
</div>
</template>

<script>
import { hotelPayModeApi, hotelBaseApi, hotelStarApi, hotelAreaApi } from 'api';
import {
    HotelTopMenu
} from 'components'
export default {
  components: {
      HotelTopMenu
  },
  data() {
    return {
      hotelName:'',
      labelPosition: 'top',
      form: {
        Star: '',
        PayMode: ''
      },
      areaOptions: [],
      starOptions: [],
      payModeOptions: [],
    };
  },
  mounted() {
    this.ID = this.$route.params.ID;
    this.hotelName=this.$route.query.name;
    this.getHotelbaseList(this.ID);
    this.getPayModeOptions();
    this.getStarOptions();
    // this.getAreaOptions();
  },
  methods: {
    async getAreaOptions(query) {
      const res = await hotelAreaApi.listByQuery(query);
      //this.areaOptions = res.data;
    },
    async getPayModeOptions() {
      const res = await hotelPayModeApi.getList();
      this.payModeOptions = res.data;
    },
    async getStarOptions() {
      const res = await hotelStarApi.list();
      this.starOptions = res.data;
    },
    async getHotelbaseList(ID) {
      ID = this.ID;
      const res = await hotelBaseApi.detailsById(ID);
      this.form = res.data;
    },
    onSubmit() {
      try {
        hotelBaseApi.edit(this.form.ID, this.form);
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

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
