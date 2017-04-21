<template lang="html">
<div id="imagesInfoAdd">
  <h1>imagesList</h1>
  <el-form :model="form" ref="form">

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
                <span style="color: dodgerblue;font-size:26px">打款截图</span> 
                <span style="color: darkgray;font-size:18px">Money picture</span>
            </span>
        </div>
        <div class="text item">
            <h2>打款截图</h2>
        </div>
    </el-card>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
                <span style="color: dodgerblue;font-size:26px">明细截图</span> 
                <span style="color: darkgray;font-size:18px">Detail picture</span>
            </span>
        </div>
        <div class="text item">
            <h2>明细截图</h2>  
        </div>
    </el-card>

  </el-form>
</div>
</template>

<script>
import {imagesInfoApi} from 'api'
  export default {
    data() {
      return {
        
      };
    },
    methods: {
      
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