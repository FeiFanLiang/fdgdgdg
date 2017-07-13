<template lang="html">
<div id="customService">
  <el-row class="tac" :guiter="24">
    <el-col :span="6">
      <el-menu default-active="2-1" class="el-menu-vertical-demo" style="height:700px;overflow-y:auto;" @select="handleSelect">
        <div style="position:relative;">
          <img src="../../assets/images/img/dog.jpg" width="30%" style="margin:10% 15px 10px 10%;"><span style="position:absolute;top:45%;">admin</span>
        </div>
        <el-input placeholder="搜索" icon="search" :on-icon-click="handleIconClick" style="width:95%;margin-left:2%;"></el-input>
        <el-submenu index="1">
          <template slot="title">
            <img src="../../assets/images/message.png" style="width:15%;margin:0px 15px 0 0;vertical-align: middle;">
            <span>消息</span>
          </template>
          <div style="height:400px;overflow-y:auto;">
            <el-menu-item-group v-for="item in list" :key="item.ID">
              <el-menu-item :index="item.ID" style="padding:40px;" >
                <el-row :guiter="24">
                  <el-col :span="4">
                    <img src="../../assets/images/img/dog.jpg" height="50px" style="margin:-30px 0 0 -30px;">
                  </el-col>
                  <el-col :span="10" style="margin:-35px 0 0 0;">
                    <p style="padding:0;margin:0;overflow: hidden;text-overflow: ellipsis;width:10em;">{{item.name}}({{item.time}})</p>
                    <p style="padding:0;margin-top:-20px;overflow: hidden;text-overflow: ellipsis;width:10em;" >{{item.message}}</p>
                  </el-col>
                </el-row>
              </el-menu-item>
            </el-menu-item-group>
          </div>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <img src="../../assets/images/linkman.png" style="width:15%;margin:0px 15px 0 0;vertical-align: middle;">
            <span>联系人</span>
          </template>
          
            <div class="contact-friends" style="height:400px;overflow-y:auto;">
              <template v-for="grouping in contact_friends">        
                  <el-menu-item-group>
                    <p class="contact-alpha" v-text="grouping.alpha" style="margin-left:10px;"></p>
                    <div v-for="item in grouping.list">
                      <el-menu-item :index='item.ID'>
                          <div class="weui_cells weui_cells_access">
                              <div class="weui_cell">
                                <img :src="item.imgSrc" height="35px" style="vertical-align:middle;margin-right:10px;">
                                  <!-- <el-tooltip class="item" placement="top" effect="light"> 
                                    <img :src="item.imgSrc" height="35px" style="vertical-align:middle;margin-right:10px;">
                                    <div slot="content" class="contents" style="width:200px;">
                                            <div style="font-size:14px;">
                                                <p>昵称:{{item.name}}</p>
                                                <p>签名</p>
                                                <hr>
                                                <p>备注</p>
                                                <p>地区</p>
                                                <p>微信号</p>
                                            </div>
                                      </div>
                                  </el-tooltip> -->
                                  <span v-text="item.name"></span>
                              </div>
                            </div>
                      </el-menu-item>
                    </div>
                  </el-menu-item-group>
              </template>
            </div>
        </el-submenu>
      </el-menu>
    </el-col>
    <el-col :span="13">
      <!-- <el-card class="box-card" style="height:700px;z-index:-1;">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;font-size:17px;">{{names}}</span>
          <i class="el-icon-star-off" style="float: right;margin-top:10px;"></i>
        </div>
        <div class="text item">
          <Message :session="session" :user="user" :user-list="userList" style="height:350px;overflow-y:auto;"></Message>
          <div><Texts :session="session"></Texts></div>
        </div>
      </el-card> -->
      <div style="height:700px;z-index:-1;border:1px solid lightgrey;border-left:none;">
        <p style="height:50px;border-bottom:1px solid lightgrey;padding:10px;">{{names}}<i class="el-icon-star-off" style="float: right;margin-top:10px;"></i></p>
        <div class="text item">
          <Message :session="session" :user="user" :user-list="userList" style="height:350px;overflow-y:auto;"></Message>
          <div><Texts :session="session"></Texts></div>
        </div>
      </div>
    </el-col>
    <el-col :span="5">
      <div style="height:700px;z-index:-1;border:1px solid lightgrey;border-left:none;">
        <p style="height:30px;border-bottom:1px solid lightgrey;padding:10px;">用户资料</p>
        <div style="padding-left:10px;">
          <h4>个人信息</h4>
          <!-- <p>昵称:{{names}}</p>
          <p>签名</p>
          <br>
          <p>备注</p>
          <p>地区</p>
          <p>微信号</p> -->
          <!-- <el-row>
            <el-col :span="12">昵称</el-col>
            <el-col :span="10">{{names}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="12">昵称</el-col>
            <el-col :span="10">{{names}}</el-col>
          </el-row> -->
          <table style="width:80%">
            <tr>
              <td>昵称</td>
              <td>{{names}}</td>
            </tr>
            <tr>
              <td>签名</td>
              <td>11111111</td>
            </tr>
            <tr>
              <td>备注</td>
              <td>11111111111</td>
            </tr>
            <tr>
              <td>地区</td>
              <td>111111111111</td>
            </tr>
            <tr>
              <td>微信号</td>
              <td>111111111111</td>
            </tr>
            <tr>
              <td>其他</td>
              <td>11111111111</td>
            </tr>
          </table>
        </div>
      </div>
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
    return {
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
      names: 'aaa',
      contact_friends: [
        {
          alpha: 'A',
          list: [
            {
              ID: '1-1',
              name: '昵称1',
              imgSrc: 'http://localhost:8081/static/img/dog.b3efc3f.jpg'
            },
            {
              ID: '1-2',
              name: '昵称2',
              imgSrc: 'http://localhost:8081/static/img/dog.b3efc3f.jpg'
            }
          ]
        },
        {
          alpha: 'B',
          list: [
            {
              ID: '1-3',
              name: '昵称3',
              imgSrc: 'http://localhost:8081/static/img/dog.b3efc3f.jpg'
            },
            {
              ID: '1-4',
              name: '昵称4',
              imgSrc: 'http://localhost:8081/static/img/dog.b3efc3f.jpg'
            }
          ]
        }
      ],
      list: [
        {
          ID: '2-1',
          name: 'aaa',
          time: '2017-6-27',
          message: 'aaaaaaa'
        },
        {
          ID: '2-2',
          name: 'bbb',
          time: '2017-6-26',
          message: 'bbbbbbbbb'
        },
        {
          ID: '2-3',
          name: 'ccc',
          time: '2017-6-25',
          message: 'cccccccccccccccccccccccc11111111111111111111111111111cccccccccccccccccccccccccccc'
        }
      ]
    }
  },
  computed: {
    session() {
      return this.sessionList[this.sessionIndex];
    }
  },
  watch: {
    // 每当sessionList改变时，保存到localStorage中
    sessionList: {
      deep: true,
      handler() {
        store.save({
          user: this.user,
          userList: this.userList,
          sessionList: this.sessionList
        });
      }
    }
  },
  methods: {
    handleIconClick() {

    },
    handleSelect(key, keyPath) {
      for (let i = 0; i < this.list.length; i++) {
        if (key === this.list[i].ID) {
          this.names = this.list[i].name;
        }
      }
      for (let j = 0; j < this.contact_friends.length; j++) {
        for (let k = 0; k < this.contact_friends[j].list.length; k++) {
          if (key === this.contact_friends[j].list[k].ID) {
            this.names = this.contact_friends[j].list[k].name;
          }
        }
      }
    }
  }
}
</script>
<style lang="scss">
#customService {
  .el-input__inner {
    background-color: #EEF1F6;
  }
  .el-menu-item.is-active {
    background-color: #D1DBE5;
  }
  td{
    padding-top:10px;
  }
}
</style>

