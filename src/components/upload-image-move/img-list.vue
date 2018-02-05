<template lang="html">
<div id="listMove" style="display: inline-block;">
  <ul class="img-list">
    <li id="my-mask" class="mask-wrapper img-item test" v-for="(img,index) in images">
      <img class="" :src="img">
      <div class="mask-inner">
        <i class="el-icon-view" @click="view(img)"></i>
        <i class="el-icon-delete" @click="del(index)"></i>
      </div>
    </li>
  </ul>
  <el-dialog v-model="dialogVisible" ref="dialog" size="small" :modal-append-to-body="false" :modal="true" custom-class="listMoveDialog" :show-close="false">
    <div class="left">
      <el-form :model="form" ref="form" label-width="130px">
        <img width="100%" :src="form.dialogImageUrl" alt="" style="position:absolute;z-index:999;" @mousedown="drag">
      </el-form>
    </div>
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
    //document.body.appendChild(this.$refs.dialog.$el)
  },
  computed: {
    images() {
      return this.lists.map(item => path.imageUrl + item)
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
    drag:function(e,index){
        //clientX 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（或客户区）的水平坐标。
        var Left=e.target.parentNode.children[0]
        let leftW=Left.offsetLeft
        let leftH=Left.offsetTop
        let disX = e.clientX - Left.offsetLeft;
        let disY = e.clientY - Left.offsetTop;

        document.onmousemove=function(e){
            e.preventDefault()
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            //移动当前元素  
            Left.style.left = l + 'px';
            Left.style.top = t + 'px';
        }

        document.onmouseup=function(){
            document.onmousemove=null
            document.onmouseup = null
        }
    },
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

<style lang="scss">

#listMove {
  .listMoveDialog{
    .el-dialog__body{
      padding:0
    }
    .el-dialog__header{
      padding:0
    }
  }

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
    padding-top: 33%;
  }
  .mask-wrapper:hover .mask-inner {
    top: 0;
  }
  #my-mask {
    width: 200px;
    height: 200px;
  }
  #my-mask .mask-inner {
    background: rgba(0, 0, 0, .5);
  }
  .el-icon-view {
    width: 60px;
    height: 60px;
    font-size: 30px;
    padding-top: 10px;
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
