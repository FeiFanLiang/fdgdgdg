<template lang="html">
<div id="HotelbaseAdd">
<el-form :rules="rules" ref="form" :model="form" :label-position="labelPosition" style="margin-top:25px">

    <el-row :gutter="20">
      <el-col :span="4">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店ID" prop="id">
            <el-input v-model="form.id" :disabled='true'></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店名称" prop="HotelName">
            <el-input v-model="form.HotelName"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店英文名称" prop="HotelName_En">
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
          <el-form-item label="前台电话" prop="FrontPhone">
            <el-input v-model="form.FrontPhone"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="地址" prop="Address">
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
          <el-form-item label="采购人" prop="PersonName">
            <el-input v-model="form.PersonName"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <el-form-item label="政策负责人" prop="PurchasingName">
            <el-input v-model="form.PurchasingName"></el-input>
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
import { HotelPayModeApi, HotelBaseApi } from 'api';

export default {
  data() {
    return {
      labelPosition: 'top',
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
      rules: {
        HotelName: [{ required: true, message: '请输入酒店名称', trigger: 'blur' }],
        HotelName_En: [
          { required: true, message: '请输入酒店英文名称', trigger: 'blur' }
        ],
        FrontPhone: [{ required: true, message: '请输入联系人电话', trigger: 'blur' }],
        Address: [{ required: true, message: '请输入酒店地址', trigger: 'blur' }],
        Star: [{ required: true, message: '请选择酒店星级', trigger: 'change' }],
        PersonName: [{ required: true, message: '请输入采购人姓名', trigger: 'blur' }],
        PurchasingName: [
          { required: true, message: '请输入政策负责人姓名', trigger: 'blur' }
        ],
        PayMode: [{ required: true, message: '请选择付款账户', trigger: 'change' }]
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
  created() {
    this.getPayModeOptions();
  },
  methods: {
    async getPayModeOptions() {
      const data = await HotelPayModeApi.getDetail();
      let { code, paymodeOptions } = data;
      if (code === 200) {
        this.PayModeOptions = paymodeOptions;
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
      try {
        const data = HotelBaseApi.add(this.form);
        this.$route.params.form;
        this.$message({
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
