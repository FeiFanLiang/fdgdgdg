<template lang="html">
<div id="imagesInfoAdd">
  <el-form :model="form" ref="form">

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
                <span style="color: dodgerblue;font-size:26px">基本信息</span> 
                <span style="color: darkgray;font-size:18px">Basic information</span>
            </span>
        </div>
        <div class="text item">
            酒店名称：<el-input class="input" v-model="form.hotelName"></el-input>
            上传人员：<el-input :disabled="true" class="input" v-model="form.upPersonName"></el-input>
        </div>
    </el-card>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
                <span style="color: dodgerblue;font-size:26px">截图信息</span> 
                <span style="color: darkgray;font-size:18px">Picture information</span>
            </span>
        </div>
        <div class="text item">
            <label>打款截图：</label>
            <label>明细截图：</label>    
        </div>
    </el-card>

    <el-card class="box-card" body-style="padding-left:40%">
        <el-button size="large" type="primary" @click="imagesInfoEdit()">修改截图信息</el-button>
    </el-card>
 

  </el-form>
</div>
</template>

<script>
import {imagesInfoApi} from 'api'
  export default {
    data() {
      return {
        fileList: [],
        form: {
          id: '',
          hotelName: '',
          upPersonName: ''
        }
      };
    },
    methods: {
      imagesInfoEdit() {
        try {
            imagesInfoApi.editImages(this.form)
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
 .box-card {
    width: 100%;
    margin: 10px;
  }
  .input {
      width: 260px;
      margin-right: 60px
  }
  
  .upload-demo {
      display: inline-block;
  }
  
</style>