<template>
<section class="db">
    <template v-if="!$route.meta.alone">
      <header class="db-header-left" :style="{width:!isCollapse?'200px':'80px'}">
        <router-link class="logo" :to="{path: '/'}">美票</router-link>
      </header>
      <header class="db-header-right" :style="{left:!isCollapse?'200px':'80px'}">
         <el-radio-group v-model="isCollapse" style="margin-right:20px;">
           <el-radio-button :label="false"><i class="el-icon-menu"></i></el-radio-button>
           <el-radio-button :label="true"><i class="el-icon-minus"></i></el-radio-button>
        </el-radio-group>
        <db-breadcrumb></db-breadcrumb>
        <div class="user-info" v-if="user.id"  :style="{'padding-right':!isCollapse?'200px':'80px'}">
          <span v-text="user.username"></span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img src="./assets/images/common/hh.png">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item @click.native="logout">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </header>
      <div class="db-body">
        <aside class="db-menu-wrapper" :style="{width:!isCollapse?'200px':'80px'}">
          <!-- :default-active="activeMenu" class="db-menu-bar" router  theme="dark"  -->
          <el-menu default-active="activeMenu" class="sidebar-container" router theme="dark" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
            <template v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children" >
              <template v-if="route.children && route.name">
                <el-submenu :index="route.name">
                  <template slot="title"><i :class="route.iconClass"></i>
                    <span slot="title">{{route.name}}</span>
                  </template>
                    <!-- <template v-if="!(cRoute.meta&&cRoute.meta.hidden)"  v-for="(cRoute, cIndex) in route.children"  >
                        <el-menu-item :route="cRoute" :index="cRoute.name">{{cRoute.name}}</el-menu-item>
                        </template> -->
                  <el-menu-item-group v-if="!(cRoute.meta&&cRoute.meta.hidden)"  v-for="(cRoute, cIndex) in route.children"  :key="cIndex">
                    <el-menu-item :route="cRoute" :index="cRoute.name">{{cRoute.name}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </template>
              <template v-if="!route.children && route.name">
                  <el-menu-item :index="route.name" :route="route">
                    <i :class="route.iconClass"></i>
                    <span slot="title">{{route.name}}</span>
                  </el-menu-item>
              </template>
            </template>
          </el-menu>
        </aside>
        <div class="db-content-wrapper" :style="{'padding-left':!isCollapse?'200px':'80px'}">
          <section class="db-content">
            <router-view></router-view>
          </section>
        </div>
  </div>
  </template>
  <template v-else>
<router-view>
</router-view>
</template>
</section>
</template>

<script>
import { accountApi } from 'api'
export default {
  data() {
    return {
      isCollapse: false,
      hotelName: '',
      user: {
        id: '',
        username: '',
        avatar: ''
      },
      activeMenu: ''
    }
  },
  created() {
    const _self = this
    _self.activeMenu = _self.$route.name
    _self.hotelName = _self.$route.query.hotelName
    _self.user = JSON.parse(localStorage.getItem('user'))
  },
  watch: {
    $route(to, from) {
      const _self = this
      _self.activeMenu = _self.$route.name
      _self.hotelName = _self.$route.query.hotelName
      _self.user = JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async logout() {
      try {
        await this.$confirm('确定要注销吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        })
        localStorage.removeItem('user')

        this.$router.push({
          path: '/login'
        })
        await accountApi.logout()
      } catch (e) {
        console.error(e)
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">@import './styles/_variables.scss';

 .sidebar-container{
   transition: width .28s ease-out;
   height: calc(100% - 60px);
   top: 0;
   bottom: 0;
   left: 0;
   z-index: 1001;
   overflow-y: auto;
 }
 .sidebar-container::-webkit-scrollbar {
    display: none;
}
.db {
    .el-dropdown-menu {
        margin-top: 20px;
    }
    // header
    .db-header-left {
        width: 201px;
        height: 60px;
        background: #324057;
        padding: 13px 9px;
        box-sizing: border-box;
        color: #ffffff;
        z-index: 99;
        position: fixed;
        left: 0;
        top: 0;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
        border-right: 1px solid #eee;
        .logo {
            font-size: 2.4rem;
        }

    }
    .db-header-right {
        // width: calc(100% - 200px);
        width:100%;
        height: 60px;
        background: #fff;
        padding: 0 20px;
        box-sizing: border-box;
        z-index: 99;
        position: fixed;
        left: 200px;
        top: 0;
        box-shadow: 0 0 3px rgba(0,0,0,0.35);
        border-bottom: 1px solid #eee;
        .user-info {
            float: right;
            height: 60px;
            line-height: 60px;
            img {
                width: 25px;
                height: 25px;
                vertical-align: -7px;
                margin: 0 0 0 10px;
                cursor: pointer;
            }
        }
    }

    // body
    .db-body {

        // menu
        .db-menu-wrapper {
          width:200px;
            position: fixed;
            left: 0;
            top: 60px;
            height: 100%;
            // overflow: auto;
            z-index: 98;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
            background-color: #324157;
            border-right: 1px solid #eee;
            .db-menu-bar {
                flex-grow: 0;
                width: 200px;
                padding-bottom: 60px;
            }
        }

        // content
        .db-content-wrapper {
            width: 100%;
            z-index: 97;
            box-sizing: border-box;
            padding: 60px 0 0 200px;

            .db-content {
                padding: 25px;

                .db-content-inner {
                    padding: 30px 0;
                }
            }
        }
    }
}
</style>
