<template lang="html">
<div id="customService">
  <el-row class="tac" :guiter="24">
    <!--<el-col :span="1">
      <el-menu style="min-height:700px;" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" theme="dark">
        <img src="../../assets/images/common/hh.png" width="70%" style="margin:15%;">
        <el-menu-item index="1"><i class="el-icon-message"></i></el-menu-item>
        <el-menu-item index="2"><i class="el-icon-menu"></i></el-menu-item>
      </el-menu>
    </el-col>-->
    <!--<el-col :span="4">
      <el-menu style="width:200px;min-height:700px;max-height:700px;overflow-y:scroll;position:fixed;" default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
        <el-input placeholder="搜索" icon="search" v-model="input" :on-icon-click="handleIconClick" style="position:fixed;width:180px;z-index:99"></el-input>
        <el-menu-item index="1"><i class="el-icon-message"></i></el-menu-item>
        <el-menu-item index="2"><i class="el-icon-menu"></i></el-menu-item>
      </el-menu>
      aaa
    </el-col>-->
    <el-col :span="6">
      <el-menu default-active="2" class="el-menu-vertical-demo" style="height:700px;overflow-y:auto;">
        <div style="position:relative;">
          <img src="../../assets/images/img/dog.jpg" width="30%" style="margin:10% 15px 10px 10%;"><span style="position:absolute;top:45%;">admin</span>
        </div>
        <el-input placeholder="搜索" icon="search" :on-icon-click="handleIconClick" style="width:95%;margin-left:2%;"></el-input>
        <el-submenu index="1">
          <template slot="title">
            <img src="../../assets/images/message.png" style="width:15%;margin:0px 15px 0 0;vertical-align: middle;">
            <span>消息</span>
          </template>
          <el-menu-item-group style="height:400px;overflow-y:auto;">
            <el-menu-item index="1-1" style="padding:40px;">
              <el-row :guiter="24">
                <el-col :span="4">
                  <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                </el-col>
                <el-col :span="10" style="margin:-35px 0 0 0;">
                  <p style="padding:0;margin:0;">昵称(时间)</p>
                  <p style="padding:0;margin-top:-20px;">消息</p>
                </el-col>
              </el-row>
            </el-menu-item>
            <el-menu-item index="1-2" style="padding:40px;">
              <el-row :guiter="24">
                <el-col :span="4">
                  <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                </el-col>
                <el-col :span="10" style="margin:-35px 0 0 0;">
                  <p style="padding:0;margin:0;">昵称(时间)</p>
                  <p style="padding:0;margin-top:-20px;">消息</p>
                </el-col>
              </el-row>
            </el-menu-item>
            <el-menu-item index="1-3" style="padding:40px;">
              <el-row :guiter="24">
                <el-col :span="4">
                  <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                </el-col>
                <el-col :span="10" style="margin:-35px 0 0 0;">
                  <p style="padding:0;margin:0;">昵称(时间)</p>
                  <p style="padding:0;margin-top:-20px;">消息</p>
                </el-col>
              </el-row>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <img src="../../assets/images/linkman.png" style="width:15%;margin:0px 15px 0 0;vertical-align: middle;">
            <span>联系人</span>
          </template>
          
            <div class="contact-friends" style="height:400px;overflow-y:auto;">
              <template v-for="(grouping,key) in contact_friends">        
                  <el-menu-item-group>
                    <p class="contact-alpha" v-text="grouping.alpha" style="margin-left:10px;"></p>
                    <div v-for="item in grouping.list">
                      <el-menu-item :index='item.ID'>
                          <div class="weui_cells weui_cells_access">
                              <div class="weui_cell">
                                  <el-tooltip class="item" placement="top" effect="light"> 
                                    <img :src="item.imgSrc" height="35px" style="vertical-align:middle;margin-right:10px;">
                                    <div slot="content" class="contents" style="width:200px;">
                                            <div style="font-size:14px;">
                                                <p>昵称:{{item.remark}}</p>
                                                <p>签名</p>
                                                <hr>
                                                <p>备注</p>
                                                <p>地区</p>
                                                <p>微信号</p>
                                            </div>
                                      </div>
                                  </el-tooltip>
                                  <span v-text="item.remark"></span>                                 
                              </div>
                            </div>
                      </el-menu-item>
                    </div>
                  </el-menu-item-group>
              </template>
            </div>

          <!--<el-menu-item-group style="height:400px;overflow-y:scroll;">
            <el-menu-item index="2-1" style="padding:40px;">
              <el-row :guiter="24">
                <el-col :span="4">
                  <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                </el-col>
                <el-col :span="10" style="margin:-20px 0 0 0;">
                  <p style="padding:0;margin:0;">昵称</p>
                </el-col>
              </el-row>
            </el-menu-item>
            <el-menu-item index="2-2" style="padding:40px;">
              <el-row :guiter="24">
                <el-col :span="4">
                  <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                </el-col>
                <el-col :span="10" style="margin:-20px 0 0 0;">
                  <p style="padding:0;margin:0;">昵称</p>
                </el-col>
              </el-row>
            </el-menu-item>
            <el-menu-item index="2-3" style="padding:40px;">
              <el-row :guiter="24">
                <el-col :span="4">
                  <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                </el-col>
                <el-col :span="10" style="margin:-20px 0 0 0;">
                  <p style="padding:0;margin:0;">昵称</p>
                </el-col>
              </el-row>
            </el-menu-item>
          </el-menu-item-group>-->
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="18">
      <el-card class="box-card" style="height:700px;z-index:-1;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;font-size:17px;">昵称</span>
          <i class="el-icon-star-off" style="float: right;margin-top:10px;"></i>
        </div>
        <div class="text item">
          <Message :session="session" :user="user" :user-list="userList" style="height:350px;overflow-y:auto;"></Message>
          <div><Texts :session="session"></Texts></div>
          
        </div>
      </el-card>
    </el-col>
  </el-row>
</div>
</template>
<script>
import Message from './message'
import store from '../store';
import Texts from './texts';
  export default {
    components: {
      Message,
      Texts
    },
    data() {
      let serverData = store.fetch();
      return{
        // 登录用户
        user: serverData.user,
        // 用户列表
        userList: serverData.userList,
        // 会话列表
        sessionList: serverData.sessionList,
        // 搜索key
        search: '',
        // 选中的会话Index
        sessionIndex: 0,
        contact_friends:[
          {
            alpha:'A',
            list:[
              {
                ID:'1',
                remark:'昵称',
                imgSrc:'http://localhost:8081/static/img/dog.b3efc3f.jpg'
              },
              {
                ID:'2',
                remark:'昵称2',
                imgSrc:'http://localhost:8081/static/img/dog.b3efc3f.jpg'
              }
            ]
          },
          {
            alpha:'B',
            list:[
              {
                ID:'3',
                remark:'昵称',
                imgSrc:'http://localhost:8081/static/img/dog.b3efc3f.jpg'
              },
              {
                ID:'4',
                remark:'昵称2',
                imgSrc:'http://localhost:8081/static/img/dog.b3efc3f.jpg'
              }
            ]
          }
        ]
      }
    },
     computed: {
            session () {
                return this.sessionList[this.sessionIndex];
            }
        },
        watch: {
            // 每当sessionList改变时，保存到localStorage中
            sessionList: {
                deep: true,
                handler () {
                    store.save({
                        user: this.user,
                        userList: this.userList,
                        sessionList: this.sessionList
                    });
                }
            }
        },
    methods: {
      handleIconClick(){

      }
    }
  }
</script>
<style lang="scss">
#customService{
  .el-input__inner {
    background-color: #EEF1F6;
  }
  .el-menu-item.is-active {
    background-color: #D1DBE5;
  }
}
</style>

