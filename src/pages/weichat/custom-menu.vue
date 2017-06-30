<template lang="html">
<div id="customMenu">
    <div style="width:200px;height:600px;border:solid 1px #A9A9A9;float:left;">
        <p style="background-color:#EAEAEA;margin:0;padding:10px;">
           <el-row>
               <el-col :span="22">菜单管理</el-col>
               <el-col :span="2"><i class="el-icon-plus"></i></el-col>
           </el-row>
        </p>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="false" :render-content="renderContent"></el-tree>
    </div>
    <div style="width:600px;height:600px;border:solid 1px #A9A9A9;float:left;">
        <p style="background-color:#EAEAEA;margin:0;padding:10px;">
           设置动作--子菜单
        </p>
        <div>
            <p style="padding:10px;">
                <el-row>
                    <el-col :span="4">子菜单名称</el-col>
                    <el-col :span="20"><el-input v-model="input" placeholder="请输入内容" style="width:50%"></el-input></el-col>
                </el-row>
                <el-row>
                    <el-col :offset="4" :span="20"><span style="color:lightgrey;">字数不超过8个汉字或16个字母</span></el-col>
                </el-row>
            </p>
            <p style="padding:10px;">
                <el-row>
                    <el-col :span="4">子菜单内容</el-col>
                    <el-col :span="20">
                        <el-radio-group v-model="radio">
                            <el-radio :label="1">发送消息</el-radio>
                            <el-radio :label="2">跳转网页</el-radio>
                            <el-radio :label="3">跳转小程序</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <div style="border:solid 1px #A9A9A9;margin:10px;height:300px;">
                    <p style="padding:0px;margin:0px;">
                        <el-menu :default-active="activeIndex2" class="el-menu-demo"
                         mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1"><i class="el-icon-menu">图文消息</i></el-menu-item>
                            <el-menu-item index="2"><i class="el-icon-picture">图片</i></el-menu-item>
                            <el-menu-item index="3"><i class="el-icon-document">语音</i></el-menu-item>
                            <el-menu-item index="4"><i class="el-icon-document">视频</i></el-menu-item>
                        </el-menu>
                    </p>
                    <hr>
                    <div>
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <br>
                            <span class="el-upload__text">从素材库中选择</span>
                        </el-upload>
                        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            <br>
                            <span class="el-upload__text">新建图文消息</span>
                        </el-upload>
                    </div>
                </div>
            </p>
        </div>
    </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      input: '',
      radio: '',
      activeIndex2: '1',
      imageUrl: '',
      data: [
        {
          id: 1,
          label: '美票旅游',
          /*children: [{
            label: '机票',
            label: '酒店',
            label: '机场专车',
            label: '自由行',
            label: '跟团游'
          }]*/
          children: [
            {
              id: 4,
              label: '机票'
            },
            {
              id: 5,
              label: '酒店'
            },
            {
              id: 6,
              label: '机场专车'
            },
            {
              id: 7,
              label: '自由行'
            },
            {
              id: 8,
              label: '跟团游'
            }
          ]
        },
        {
          id: 2,
          label: '我的'
        },
        {
          id: 3,
          label: '关于美票',
          children: [
            {
              id: 9,
              label: '微店商城'
            },
            {
              id: 10,
              label: '美票说'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    append(store, data) {
      store.append({ id: id++, label: 'testtest', children: [] }, data)
    },

    remove(store, data) {
      store.remove(data)
    },

    renderContent(h, { node, data, store }) {
      // let a = [

      // ]
      return (
        <span>
          <span>
            <span>{node.label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" on-click={() => this.append(store, data)}>
              Append
            </el-button>
            <el-button size="mini" on-click={() => this.remove(store, data)}>
              Delete
            </el-button>
          </span>
        </span>
      )
    }
  }
}
</script>
<style lang="scss">
#customMenu{
    .el-menu--horizontal>.el-menu-item:hover{
        border-bottom: solid 0px white;
    }
    .el-menu--horizontal .el-menu-item:hover{
        background-color: white;
    }
    .el-menu {
        background-color: white;
    }
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    height: 178px;
    margin: 20px;
    margin-left: 50px;
    float:left;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 18px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload__text{
      color: lightgrey;
      padding-top: 10px;
  }
}
</style>
