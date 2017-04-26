<template>
  <section class="db">
    <template v-if="!$route.meta.alone">
      <header class="db-header-left">
        <router-link class="logo" :to="{path: '/'}">美票</router-link>
      </header>
      <header class="db-header-right">
        <div class="db-title">
          {{hotelName}}
        </div>
        <div class="user-info" v-if="user.id">
          <span v-text="user.username"></span>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              <img :src="user.avatar">
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
          <el-menu :default-active="activeMenu" class="db-menu-bar" router>
            <template v-for="(route, index) in $router.options.routes[$router.options.routes.length - 2].children">
              <template v-if="route.children && route.name">
                <el-submenu :index="route.name">
                  <template slot="title"><i :class="route.iconClass"></i>{{route.name}}</template>
                  <el-menu-item v-if="!(cRoute.meta&&cRoute.meta.hidden)"  :index="cRoute.name" v-for="(cRoute, cIndex) in route.children" :route="cRoute">{{cRoute.name}}</el-menu-item>
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
import { accountApi } from 'api';
export default {
  data() {
    return {
      hotelName:'',
      user: {
        id: '',
        username: '',
        avatar: ''
      },
      activeMenu: ''
    };
  },
  beforeRouteUpdate (to,from,next){
    console.log(1)

    next(vm => {
      console.log(to)
      console.log(from)
      console.log(next)
      vm.hotelName=vm.$route.query.hotelName;
 })

  },
  created() {
    this.activeMenu = this.$route.name;

    this.user = JSON.parse(localStorage.getItem('user'));
  },
  watch: {
    $route(to, from) {
      this.activeMenu = this.$route.name;

      this.user = JSON.parse(localStorage.getItem('user'));
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

        this.$router.push({ path: '/login' });
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
    background: #58B7FF;
    padding: 13px 20px;
    box-sizing: border-box;
    color: #ffffff;
    z-index: 99;
    position: fixed;
    left: 0;
    top: 0;
    .logo{
      font-size: 2.4rem;
    }

  }
  .db-header-right {
    width: calc(100% - 200px);
    height: 60px;
    background: #58B7FF;
    padding: 0 20px;
    box-sizing: border-box;
    color: #ffffff;
    z-index: 99;
    position: fixed;
    left: 200px;
    top: 0;

    .db-title{
      float: left;
      height: 60px;
    line-height: 60px;
    }
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
      background: red;
      height: 100%;
      overflow: auto;
      z-index: 98;

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
      padding: 60px 0px 0px 200px;

      .db-content {
        padding: 25px;

        .db-content-inner {
          padding: 30px 0px;
        }
      }
    }
  }
}
</style>
