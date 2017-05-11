<template lang="html">
<div id="hotelbaseEdit">
  <HotelTopMenu path="">
  </HotelTopMenu>
  <el-form ref="form" :model="form" label-position="top" style="margin-top:25px">
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="酒店ID" prop="ID">
            <el-input v-model="form.id" :disabled='true'></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店编号" prop="HotelNum">
            <el-input v-model="form.hotelNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店名称" prop="HotelName">
            <el-input v-model="form.hotelName"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="酒店英文名称" prop="HotelName_En">
            <el-input v-model="form.hotelName_En"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="前台电话" prop="FrontPhone">
            <el-input v-model="form.frontPhone"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="传真号" prop="FaxNum">
            <el-input v-model="form.faxNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="区域" prop="Area">
            <!--<el-select v-model="form.Area" clearable filterable placeholder="请选择酒店所在区域">
              <el-option v-for="(item,index) in areaOptions" :key="index" :label="item.AreaName" :value="item.ID"></el-option>
            </el-select>-->
            <el-select
              v-model="form.area"
              clearable
              filterable
              remote
              placeholder="请选择酒店所在区域"
              :remote-method="remoteMethod"
              :loading="loading">
              <el-option
                v-for="(item,index) in areaOptions"
                :key="index"
                :label="item&&item.AreaName"
                :value="item&&item.ID">
              </el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="6">
          <el-form-item label="地址" prop="Address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
          <el-form-item label="星级">
            <el-select v-model="form.star" clearable placeholder="请选择酒店星级">
              <el-option v-for="(item,index) in starOptions" :key="index" :label="item.StarName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="18">
          <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="18">
      <el-col :span="2" :offset="19">
        <el-form-item>
          <el-button @click="Cancel">取消</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="3">
        <el-form-item>
          <el-button type="primary" @click="submit">保存</el-button>
        </el-form-item>
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
  hotelAreaApi
} from 'api';
import {
  HotelTopMenu
} from 'components'
export default {
  components: {
    HotelTopMenu
  },
  data() {
    return {
      id:'',
      hotelName: '',
      form: {
        id: '',
        hotelNum: '',
        hotelName: '',
        hotelName_En: '',
        frontPhone: '',
        faxNum: '',
        area: '',
        address: '',
        star: '',
        remark: ''
      },
      loading: false,
      list: [],
      areaOptions: [],
      starOptions: [],
    };
  },
  mounted() {
    this.id = this.$route.params.ID;
    if(this.id){
      this.getHotelbaseList();
      this.getStarOptions();
    }
    this.hotelName = this.$route.query.name;

  },
  methods: {

    async remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        const res = await hotelAreaApi.listByQue(query);
        this.list = res.data;
        setTimeout(() => {
          this.loading = false;
          for (let i = 0; i < 20; i++) {
            this.areaOptions[i] = this.list[i];
          }
          //this.areaOptions = this.list;
        }, 200);
      } else {
        this.areaOptions = [];
      }
    },
    async getStarOptions() {
      const res = await hotelStarApi.list();
      if(res&&res.data&&Array.isArray(res.data)){
        this.starOptions = res.data;
      }
    },
    async getHotelbaseList() {
      const res = await hotelBaseApi.detailsById(this.id);
      if(res&&res.data){
        const data = res.data;
        this.form.id = data.ID
        this.form.hotelNum = data.HotelNum
        this.form.hotelName = data.HotelName
        this.form.hotelName_En = data.HotelName_En
        this.form.frontPhone = data.FrontPhone
        this.form.faxNum = data.FaxNum
        this.form.area = data.Area
        this.form.address = data.Address
        this.form.star = data.Star
        this.form.remark = data.Remark
      }
    },
    async submit() {
      try {
        await hotelBaseApi.edit(this.form.id, this.form);
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
