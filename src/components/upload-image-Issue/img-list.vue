<template lang="html">
<div id="list" style="display: inline-block;">
  <ul class="img-list">
    <li id="my-mask" class="mask-wrapper img-item test" v-for="(img,index) in images">
      <img class="" :src="img">
      <div class="mask-inner">
        <i class="el-icon-view" @click="view(img)"></i>
        <i class="el-icon-delete" @click="del(index)"></i>
      </div>
    </li>
  </ul>
  <el-dialog v-model="dialogVisible" ref="dialog" size="small" :modal-append-to-body="false" :modal="true" >
    <el-form :model="form" ref="form" label-width="130px">
      <img width="100%" :src="form.dialogImageUrl" alt="">
    </el-form>
  </el-dialog>
</div>
</template>

<script>
import path from 'api/api'

export default {
  props: {
    lists: {
      type: Array
    }
  },
  mounted() {
    document.body.appendChild(this.$refs.dialog.$el)
  },
  computed: {
    images() { 
      return this.lists.map(item => path.imageIssueUrl + item)       
    }
  },
  data() {
    return {
      form: {
        dialogImageUrl: ''
      },
      dialogVisible: false
    }
  },
  methods: {
    view(url) {
      this.dialogVisible = true
      this.form.dialogImageUrl = url
    },
    del(index) {
      this.$emit('del', index)
    }
  }
}
</script>

<style lang="scss" scoped>

#list {
  .el-upload--picture-card {
    display: none !important;
  }
  .el-upload {
    display: none !important;
  }
  .img-list {
    margin: 10px auto;
    padding: 0;
    overflow: hidden;
  }
  .img-item {
    position: relative;
    float: left;
    margin: 0 10px 10px 0;
    width: 112px;
    height: 112px;
    border: 1px solid #ccc;
    border-radius: 3px;
    overflow: hidden;
  }
  .img-item:nth-child(5n) {
    margin-right: 0px;
  }
  .img-item img {
    width: 100%;
    height: 100%;
  }
  .mask-wrapper {
    position: relative;
    overflow: hidden;
  }
  .mask-inner {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    height: 100%;
    -moz-transition: top ease 200ms;
    -o-transition: top ease 200ms;
    -webkit-transition: top ease 200ms;
    transition: top ease 200ms;
    text-align: center;
    //padding-top: 33%;
  }
  .mask-wrapper:hover .mask-inner {
    top: 0;
  }
  #my-mask {
    // width: 200px;
    // height: 200px;
    width: auto;
    height: auto;
  }
  #my-mask .mask-inner {
    background: rgba(0, 0, 0, .5);
  }
  .el-icon-view {
    width: 60px;
    height: 60px;
    font-size: 30px;
    padding-top: 5px;
    cursor: pointer;
    color: white;
  }
  .el-icon-delete {
    width: 60px;
    height: 60px;
    font-size: 30px;
    padding-top: 10px;
    cursor: pointer;
    color: white;
  }
}
</style>
