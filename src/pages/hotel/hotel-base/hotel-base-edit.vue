<template lang="html">
<div id="hotelbaseEdit">
    <!-- <HotelTopMenu path="">
  </HotelTopMenu> -->
    <el-form ref="form" :model="form" label-position="top" style="margin-top:25px">
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="酒店ID">
                    <el-input v-model="form.id" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="酒店编号">
                    <el-input v-model="form.hotelNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="酒店名称">
                    <el-input v-model="form.hotelName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="酒店英文名称">
                    <el-input v-model="form.hotelName_En"></el-input>
                </el-form-item>
            </el-col>
        </el-row>    
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="前台电话">
                    <el-input v-model="form.frontPhone"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="传真号">
                    <el-input v-model="form.faxNum"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="国家">
                    <el-autocomplete
                    class="inline-input"
                    v-model="form.country"
                    :fetch-suggestions="querySearch"
                    placeholder="请输入酒店所在国家"
                    @select="handleSelect"
                    ></el-autocomplete>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="城市">
                    <el-autocomplete
                    class="inline-input"
                    v-model="form.city"
                    :fetch-suggestions="querySearch1"
                    placeholder="请输入酒店所在城市"
                    @select="handleSelect1"
                    ></el-autocomplete>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-col>
            
            <el-col :span="6">
                <el-form-item label="星级">
                    <el-select v-model="form.starNum" clearable placeholder="请选择酒店星级">
                        <el-option v-for="(item,index) in starOptions" :key="index" :label="item.StarName" :value="item.ID"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
                <el-form-item label="经纬度">
                    <el-input v-model="form.coordinates"></el-input>
                </el-form-item>
            </el-col> -->
            <el-col :span="6">
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6" :offset="18">
                <el-form-item>
                    <el-button @click="Cancel">取消</el-button>
                    <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
                </el-form-item>
            </el-col>
        </el-row>

        <!-- <el-row :gutter="18">
      <el-col :span="2" :offset="19">
        <el-form-item>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button type="primary" @click="submitForm">保存</el-button>
        </el-form-item>
      </el-col>
    </el-row> -->
    </el-form>
    <!-- <div class="line">

  </div> -->
    <el-tabs v-model="activeName" @tab-click="handleChange">
        <el-tab-pane label="房型信息" name="room">
            <HotelRoomPage></HotelRoomPage>
        </el-tab-pane>
        <!-- <el-tab-pane label="政策信息" name="policy">
            <HotelPolicyPage></HotelPolicyPage>
        </el-tab-pane> -->
        <el-tab-pane label="价格信息" name="price">
            <HotelPricePage></HotelPricePage>
        </el-tab-pane>
        <el-tab-pane label="平台映射" name="platform">
            <HotelPlatformPage></HotelPlatformPage>
        </el-tab-pane>
        <el-tab-pane label="展示信息" name="show">
            <HotelShowPage></HotelShowPage>
        </el-tab-pane>
        <el-tab-pane label="酒店协议" name="policy">
            <PolicyList></PolicyList>
        </el-tab-pane>
        <el-tab-pane label="预存款信息" name="advancement">
            <Advancement></Advancement>
        </el-tab-pane>
        <el-tab-pane label="规则信息" name="hotelPlatform">
            <HotelPlatform></HotelPlatform>
        </el-tab-pane>
        <el-tab-pane label="平台价格信息" name="hotelPricePagept">
            <HotelPricePagept></HotelPricePagept>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import {
  hotelPayModeApi,
  hotelBaseApi,
  hotelAreaApi,
  hotelAreaApi2
} from "api";
import { HotelTopMenu } from "components";
const HotelRoomPage = () => import("../hotel-room/hotel-room.vue");
const HotelPlatformPage = () => import("../hotel-platform/hotel-platform.vue");
const HotelPlatform = () => import("../hotel-platform/rule-seve.vue");
// const HotelPolicyPage = () =>
//     import ('../hotel-policy/hotel-policy.vue')
const HotelPricePage = () => import("../hotel-price/hotel-price.vue");
const HotelPricePagept = () => import("../hotel-price/hotel-pricept.vue");
const HotelShowPage = () => import("../hotel-show/hotel-show.vue");
const PolicyList = () => import("../policy/policy-list.vue");
const Advancement = () => import("../advancement/advancement.vue");

export default {
  components: {
    HotelTopMenu,
    HotelRoomPage,
    HotelPlatformPage,
    HotelPlatform,
    // HotelPolicyPage,
    HotelPricePage,
    HotelShowPage,
    HotelPricePagept,
    PolicyList,
    Advancement
  },
  data() {
    return {
      countryOptions: [],
      cityOptions: [],
      activeName: "room",
      id: "",
      hotelName: "",
      form: {
        id: "",
        hotelNum: "",
        hotelName: "",
        hotelName_En: "",
        country: "",
        city: "",
        // coordinates: "",
        frontPhone: "",
        faxNum: "",
        // areaId: "",
        address: "",
        starNum: "",
        remark: ""
      },
      loading: false,
      isEditable: true,
      list: [],
      areaOptions: [],
      starOptions: [
        {
          ID: 1,
          StarName: "一星级"
        },
        {
          ID: 2,
          StarName: "二星级"
        },
        {
          ID: 3,
          StarName: "三星级"
        },
        {
          ID: 3.5,
          StarName: "准四星/3.5"
        },
        {
          ID: 4,
          StarName: "四星级"
        },
        {
          ID: 4.5,
          StarName: "准五星/4.5"
        },
        {
          ID: 5,
          StarName: "五星级"
        },
        {
          ID: 5.5,
          StarName: "超5星[国内]"
        },
        {
          ID: 7,
          StarName: "七星级"
        }
      ]
    };
  },
  mounted() {
    const _self = this;
    _self.id = _self.$route.params.ID;
    if (_self.id) {
      _self.getHotelbaseList();
    }
    _self.getCountryOptions();
    _self.hotelName = _self.$route.query.name;
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
    async getHotelbaseList() {
      const _self = this;
      const res = await hotelBaseApi.detailsById(_self.id);
      if (res && res.data) {
        const data = res.data.Data;
        _self.form.id = data.ID;
        _self.form.hotelNum = data.HotelNum;
        _self.form.hotelName = data.HotelName;
        _self.form.hotelName_En = data.HotelName_En;
        _self.form.country = data.Country;
        _self.form.city = data.City;
        // _self.form.coordinates = data.Coordinates;
        _self.form.frontPhone = data.FrontPhone;
        _self.form.faxNum = data.FaxNum;
        // _self.form.areaId = data.AreaID;
        _self.form.address = data.Address;
        _self.form.starNum = data.StarNum;
        _self.form.remark = data.Remark;
      }
    },
    async submitForm() {
      const _self = this;
      try {
        _self.isEditable = false;
        await hotelBaseApi.edit(_self.form);
        _self.$message({
          message: "保存成功",
          type: "success"
        });
      } catch (e) {
      } finally {
        _self.isEditable = true;
      }
    },
    Cancel() {
      this.$router.go(-1);
    },
    handleChange() {}
  }
};
</script>
<style lang="scss">
#hotelbaseEdit > .el-collapse {
  border: 0;
}
</style>
