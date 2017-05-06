<template>
<section class="db">
  <template v-if="!$route.meta.alone">
      <header class="db-header-left">
        <router-link class="logo" :to="{path: '/'}">美票</router-link>
      </header>
      <header class="db-header-right">
        <db-breadcrumb></db-breadcrumb>
        <div class="user-info" v-if="user.id">
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
        <aside class="db-menu-wrapper">
          <el-menu :default-active="activeMenu" class="db-menu-bar" router  theme="dark">
            <template v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children" >
              <template v-if="route.children && route.name">
                <el-submenu :index="route.name">
                  <template slot="title"><i :class="route.iconClass"></i>{{route.name}}</template>
                  <el-menu-item v-if="!(cRoute.meta&&cRoute.meta.hidden)" :index="cRoute.name" v-for="(cRoute, cIndex) in route.children" :route="cRoute" :key="cIndex">{{cRoute.name}}</el-menu-item>
                </el-submenu>
              </template>
              <template v-if="!route.children && route.name">
                <el-menu-item :index="route.name" :route="route"><i :class="route.iconClass"></i>{{route.name}}</el-menu-item>
              </template>
            </template>
          </el-menu>
        </aside>
  <div class="db-content-wrapper">
    <section class="db-content">
      <router-view></router-view>
    </section>
  </div>
  </div>
  </template>
  <template v-else>
      <router-view></router-view>
    </template>
</section>
</template>

<script>
import {
  accountApi
} from 'api';
export default {
  data() {
    return {
      hotelName: '',
      user: {
        id: '',
        username: '',
        avatar: ''
      },
      activeMenu: ''
    };
  },
  created() {
    const _self = this;
    _self.activeMenu = _self.$route.name;
    _self.hotelName = _self.$route.query.hotelName;
    _self.user = JSON.parse(localStorage.getItem('user'));
  },
  watch: {
    $route(to, from) {
      const _self = this;
      _self.activeMenu = _self.$route.name;
      _self.hotelName = _self.$route.query.hotelName;
      _self.user = JSON.parse(localStorage.getItem('user'));
    }
  },
  methods: {
    async logout() {
      try {
        await this.$confirm('确定要注销吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        });
        localStorage.removeItem('user');

        this.$router.push({
          path: '/login'
        });
        await accountApi.logout();
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="scss">
@import './styles/_variables.scss';

.db {
    .el-dropdown-menu {
        margin-top: 20px;
    }
    // header
    .db-header-left {
        width: 200px;
        height: 60px;
        background: #324057;
        padding: 13px 20px;
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
        width: calc(100% - 200px);
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
            position: fixed;
            left: 0;
            top: 60px;
            height: 100%;
            overflow: auto;
            z-index: 98;
            box-shadow: 0 0 3px rgba(0, 0, 0, 0.35);
            border-right: 1px solid #eee;
            .db-menu-bar {
                height: 100%;
                flex-grow: 0;
                width: 200px;
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
