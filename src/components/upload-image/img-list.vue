<template lang="html">
<div id="list">
  <ul class="img-list">
    <li class="img-item" v-for="img in lists">11
      <img :src="img.url">
    </li>
  </ul>
  <el-upload action="" :file-list="lists" list-type="picture-card" :on-preview="handlePictureCardPreview" :disabled="true">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-dialog v-model="dialogVisible" size="tiny">
    <img width="100%" :src="dialogImageUrl" alt="">
  </el-dialog>
</div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array
    }
  },
  created() {
    console.log(1)
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style scoped>
#list {
  .el-upload--picture-card {
    display: none !important;
  }
  .img-list {
    margin: 10px auto;
    padding: 0;
    width: 600px;
    overflow: hidden;
  }
  .img-item {
    float: left;
    margin: 0 10px 10px 0;
    width: 112px;
    height: 112px;
    border: 1px solid #ccc;
    padding: 3px;
    border-radius: 3px;
    overflow: hidden;
  }
  .img-item:nth-child(5n) {
    margin-right: 0px;
  }
  .img-item img {
    width: 100%;
  }
}
</style>
