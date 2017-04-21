<template lang="html">
<div id="imagesInfoAdd">
  <el-form>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">
                <span style="color: dodgerblue;font-size:26px">基本信息</span> 
                <span style="color: darkgray;font-size:18px">Basic information</span>
            </span>
        </div>
        <div class="text item">
            酒店名称：<el-input class="input"></el-input>
            上传人员：<el-input :disabled="true" class="input"></el-input>
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
          <div class="a">
            <div style="padding: 10px 0">打款截图：</div>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://www.uc123.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                list-type="picture"
                :before-upload="beforeAvatarUpload">
                <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadDK">上传</el-button>
            </el-upload>
          </div>
          <div class="a">
            <div style="padding: 10px 0">明细截图：</div>
            <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false"
                list-type="picture"
                :before-upload="beforeAvatarUpload">
                <el-button slot="trigger" size="small" type="primary" multiple="false">选取图片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUploadMX">上传</el-button>
            </el-upload>
          </div>
        </div>
    </el-card>

    <el-card class="box-card" body-style="padding-left:40%">
        <el-button size="large" type="primary" @click="">添加截图信息</el-button>
    </el-card>
 

  </el-form>
</div>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    methods: {
      submitUploadDK() {
        this.$refs.upload.submit();
      },
      submitUploadMX() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
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
  
  .a {
    display: inline-block;
    margin-left: 50px;
  }
</style>