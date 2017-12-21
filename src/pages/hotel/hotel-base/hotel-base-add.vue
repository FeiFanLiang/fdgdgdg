<template lang="html">
<div id="HotelbaseAdd">
    <el-form ref="form" :model="form" :label-position="labelPosition" :rules="rules" @close="resetForm()">
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="酒店编号" prop="HotelNum">
                    <el-input v-model="form.HotelNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="酒店名称" prop="HotelName">
                    <el-input v-model="form.HotelName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="酒店英文名称">
                    <el-input v-model="form.HotelName_En"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="星级" prop="StarID">
                    <el-select v-model="form.StarID" clearable placeholder="请选择酒店星级">
                        <el-option v-for="(item,index) in starOptions" :key="index" :label="item.StarName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="国家">
                    <el-autocomplete
                    class="inline-input"
                    v-model="form.Country"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入酒店所在国家"
                    @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="城市">
                    <el-autocomplete
                    class="inline-input"
                    v-model="form.City"
                    :fetch-suggestions="querySearch1"
                    placeholder="请输入酒店所在城市"
                    @select="handleSelect1"
                    ></el-autocomplete>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="8">
                <el-form-item label="区域" prop="AreaID">
                    <el-select v-model="form.AreaID" clearable filterable remote placeholder="请输入酒店所在区域" :remote-method="remoteMethod" :loading="loading">
                        <el-option v-for="(item,index) in areaOptions" :key="index" :label="item&&item.AreaName" :value="item&&item.ID">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->
            <el-col :span="8">
                <el-form-item label="地址" prop="Address">
                    <el-input v-model="form.Address"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-form-item label="结款" prop="PayMode">
                    <el-select v-model="form.PayMode" clearable placeholder="请选择结款账户">
                        <el-option v-for="(item,index) in payModeOptions" :key="index" :label="item.ModeName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="前台电话" prop="FrontPhone">
                    <el-input v-model="form.FrontPhone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="传真号" prop="FaxNum">
                    <el-input v-model="form.FaxNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-form-item label="国内国外">
                        <el-switch on-text="国外" off-text="国内" :on-value="true" :off-value="false" v-model="form.IsForeign"></el-switch>
                    </el-form-item>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-form-item label="备注" prop="Remark">
                    <el-input type="textarea" v-model="form.Remark"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="18">
            <el-col :span="3" :offset="17">
                <el-button @click="resetForm()">取消</el-button>
            </el-col>
            <el-col :span="4" <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </el-col>
        </el-row>
    </el-form>
</div>
</template>
<script>
import {
  hotelPayModeApi,
  hotelBaseApi,
  hotelStarApi,
  hotelAreaApi,
  hotelAreaApi2
} from "api";

export default {
  data() {
    return {
      countryOptions: [],
      cityOptions: [],
      labelPosition: "top",
      form: {
        HotelNum: "",
        HotelName: "",
        HotelName_En: "",
        FrontPhone: "",
        FaxNum: "",
        Country: "",
        City: "",
        Address: "",
        StarID: "",
        PayMode: "",
        Remark: "",
        IsForeign: false
      },
      loading: false,
      isEditable: true,
      list: [],
      rules: {},
      areaOptions: [],
      starOptions: [],
      payModeOptions: []
    };
  },
  mounted() {
    const _self = this;

    _self.getPayModeOptions();

    _self.getStarOptions();
  },
  watch: {
    "form.country": async function(newVal) {
      const _self = this;
      if (newVal) {
        const res = await hotelAreaApi2.listByLevelAndQuery("3", newVal);
        _self.cityOptions = res.data;
        console.log(_self.cityOptions);
      }
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.countryOptions;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    querySearch1(queryString, cb) {
      var restaurants = this.cityOptions;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.AreaName.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {
      console.log(item);
    },
    handleSelect1(item) {
      console.log(item);
    },
    async getCountryOptions() {
      const _self = this;
      const res = await hotelAreaApi2.listByLevel("1");
      _self.countryOptions = res.data;
    },
    // async remoteMethod(query) {
    //   const _self = this;
    //   if (query !== "") {
    //     _self.loading = true;
    //     const res = await hotelAreaApi.listByQue(query);
    //     _self.list = res.data;
    //     setTimeout(() => {
    //       _self.loading = false;
    //       _self.areaOptions = _self.list.splice(0, 20);
    //     }, 200);
    //   } else {
    //     _self.areaOptions = [];
    //   }
    // },
    async getPayModeOptions() {
      try {
        const res = await hotelPayModeApi.list();
        this.payModeOptions = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    async getStarOptions() {
      try {
        const res = await hotelStarApi.list();
        this.starOptions = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    submitForm() {
      const _self = this;
      if (!_self.form.HotelName && !_self.form.HotelName_En) {
        this.$message.error("请填写酒店中文名或英文名");
      } else {
        _self.$refs["form"].validate(async valid => {
          if (valid) {
            try {
              _self.isEditable = false;
              const data = await hotelBaseApi.add(_self.form);
              _self.$route.params.form;
              // _self.form = {};
              this.$emit("hide");
              _self.$refs["form"].resetFields();
              _self.$message({
                message: "保存成功",
                type: "success"
              });
            } catch (e) {
              console.error(e);
            } finally {
              _self.isEditable = true;
            }
          } else {
            return false;
          }
        });
      }
    },
    resetForm() {
      this.$refs["form"].resetFields();
      this.$emit("hide");
    }
  }
};
</script>
