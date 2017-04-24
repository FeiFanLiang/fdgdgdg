<template lang="html">
<div id="HotelbaseAdd">
<el-form :rules="rules" ref="form" :model="form" :label-position="labelPosition" style="margin-top:25px">

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店ID" prop="id">
            <el-input v-model="form.id" :disabled='true'></el-input>
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
</div>
</template>

<script>
import { hotelPayModeApi, HotelBaseApi, hotelStarApi, hotelAreaApi } from 'api';

export default {
  data() {
    return {
      labelPosition: 'top',
      form: {
        id: '',
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
        ],
        FrontPhone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }],
        Address: [{ required: true, message: '请输入酒店地址', trigger: 'blur' }],
        PersonName: [{ required: true, message: '请输入采购人姓名', trigger: 'blur' }],
        PurchasingName: [
          { required: true, message: '请输入政策负责人姓名', trigger: 'blur' }
        ]
      },
      AreaOptions: [],
      StarOptions: [],
      PayModeOptions: []
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
        console.log(res);

        // 这个接口返回的数据量过大,会造成页面卡顿和假死

        //this.AreaOptions = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    async getPayModeOptions() {
      try {
        const res = await hotelPayModeApi.getList();
        this.PayModeOptions = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    async getStarOptions() {
      try {
        const res = await hotelStarApi.list();
        this.StarOptions = res.data;
      } catch (e) {
        console.error(e);
      }
    },
    onSubmit(formName) {
      const _self = this;
      _self.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
      try {
        const data = HotelBaseApi.add(_self.form);
        _self.$route.params.form;
        _self.$message({
          message: '保存成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    Cancel() {
      this.$router.go(-1);
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
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>
