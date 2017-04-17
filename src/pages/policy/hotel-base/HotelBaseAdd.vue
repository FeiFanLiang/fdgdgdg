<template lang="html">
<el-form ref="form" :model="form">

  <el-row :gutter="20">  
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店ID">
            <el-input v-model="form.id"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple">
          <el-form-item label="酒店名称">
            <el-input v-model="form.HotelName"></el-input>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="7">
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

    <el-row :gutter="18">
      <el-col :span="5" :offset="5">
        <div class="grid-content bg-purple">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即创建</el-button>
          </el-form-item>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content bg-purple">
          <el-form-item>
            <el-button>取消</el-button>
          </el-form-item>
        </div>
      </el-col>     
    </el-row>

  </el-form>
  
    
    
  
</template>

<script>
import {
  oldApi, hotelApi
} from 'api';

  export default {
    data() {
      return {
        form: {
          id: '',
          HotelName: '',
          HotelName_En: '',
          FrontPhone: '',
          Address: '',
          Star: '',
          PersonName: '',
          PurchasingName: '',
          PayMode: null,
          Remark: ''
        },
        StarOptions: [{
          value: '1',
          label: '一星级'
        },{
          value: '2',
          label: '二星级'
        },{
          value: '3',
          label: '三星级'
        }],
        PayModeOptions: [],
        
      }
    },
    created() {
        console.log('222222222222222222222')
        console.log('this.Star' + this.Star)
        // this.getStarOptions();
        this.getPayModeOptions();
    },
    methods: {
      async getPayModeOptions() {
        console.log('1111111111111111111111111')
        const data = await oldApi.fetchPayModeOptions()
        let {
            code,
            paymodeOptions
        } = data;
        if (code === 200) {
          console.log('123456798941236412558452125')
          this.PayModeOptions = paymodeOptions;
          console.log('this.PayModeOptions' + this.PayModeOptions)
          this.PayModeOptions = paymodeOptions;
          console.log('this.PayMode' + this.PayMode)
        }
      },
      onSubmit() {
        console.log('submit!');
        try {
            const data = hotelApi.addHotelBase(this.form)
            let oform = data.form
            this.$router.push({path: '/policy/HotelBase', params: { form: oform }})
            this.$message({
                message: '保存成功',
                type: 'success'
            });
            } catch (e) {
                console.error(e);
            }
        
      },
             
      
    }
  }
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
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
  }
</style>