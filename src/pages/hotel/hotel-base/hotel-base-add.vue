<template lang="html">
<div id="HotelbaseAdd">
<el-form ref="form" :model="form" :label-position="labelPosition"  :rules="rules">

    <el-row :gutter="20">
      <el-col :span="8">
          <el-form-item label="酒店编号" prop="HotelNum" >
            <el-input v-model="form.HotelNum"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="酒店名称" prop="HotelName" >
            <el-input v-model="form.HotelName"></el-input>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="酒店英文名称" prop="HotelName_En" >
            <el-input v-model="form.HotelName_En"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
          <el-form-item label="星级" prop="Star" >
            <el-select v-model="form.Star" clearable placeholder="请选择酒店星级">
              <el-option v-for="(item,index) in starOptions" :key="index" :label="item.StarName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="区域" prop="Area" >
            <el-select v-model="form.Area" clearable filterable placeholder="请选择酒店所在区域">
              <el-option v-for="(item,index) in areaOptions" :key="index" :label="item.AreaName" :value="item.ID"></el-option>
            </el-select>
          </el-form-item>
      </el-col>
      <el-col :span="8">
          <el-form-item label="地址" prop="Address" >
            <el-input v-model="form.Address"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
          <el-form-item label="结款" prop="PayMode" >
            <el-select v-model="form.PayMode" clearable placeholder="请选择结款账户" >
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
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20">
          <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form.Remark"></el-input>
          </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="18">
      <el-col :span="3" :offset="18">
          <el-button @click="Cancel">取消</el-button>
      </el-col>
      <el-col :span="3"
      <el-button type="primary" @click="onSubmit('form')">创建</el-button>
      </el-col>
    </el-row>
  </el-form>
</div>
</template>

<script>
import { hotelPayModeApi, hotelBaseApi, hotelStarApi, hotelAreaApi } from 'api';

export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
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
      rules: {
        HotelName: [{ required: true, message: '请输入酒店名称', trigger: 'blur' }],
        HotelName_En: [
          { required: true, message: '请输入酒店英文名称', trigger: 'blur' }
        ]
      },
      areaOptions: [],
      starOptions: [],
      payModeOptions: []
    };
  },
  mounted() {
    const _self = this;

    _self.getPayModeOptions();

    _self.getStarOptions();

    _self.getAreaOptions();
  },
  methods: {
    async getAreaOptions(query) {
      try {
        const res = await hotelAreaApi.listByQuery(query);

        // 这个接口返回的数据量过大,会造成页面卡顿和假死

        //this.areaOptions = res.data;
      } catch (e) {
        console.error(e);
      }
    },
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
    onSubmit(formName) {
      const _self = this;
      _self.$refs[formName].validate(async valid => {
        if (valid) {
          try {
            const data = await hotelBaseApi.add(_self.form);
            _self.$route.params.form;
            _self.$message({
              message: '保存成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          return false;
        }
      });
    },
    Cancel() {
      this.$emit('hide')
    }
  }
};
</script>

<style lang="scss">
  #HotelbaseAdd {
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
  .row-bg {
    padding: 10px 0;
  }
</style>
