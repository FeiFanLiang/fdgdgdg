<template lang="html">
    <div id="login-page" @keyup.enter="login">
        <div class="login-form">
            <div class="input-group">
                <div class="title">美票</div>
                <el-input :autofocus="true" placeholder="请输入用户名" icon="message" v-model="username">
                </el-input>
            </div>
            <div class="input-group">
                <el-input placeholder="请输入密码" type="password" icon="edit" v-model="password">
                </el-input>
            </div>
            <div class="input-group">
                <el-col :span="18">
                    <label>记住我？</label>
                    <el-switch v-model="rememberMe" on-text="" off-text="">
                    </el-switch>
                </el-col>
                <el-col :span="6">
                    <el-button type="text" @click.native="register">注册</el-button>
                </el-col>
            </div>
            <div class="input-group">
                <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { accountApi } from 'api'
import Particle from 'zhihu-particle'
export default {
  mounted() {
    new Particle(document.getElementById('login-page'), {
      interactive: true,
      density: 'low'
    })
  },
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      isBtnLoading: false
    }
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...'
      return '登录'
    }
  },
  methods: {
    async login() {
      const _self = this
      if (!_self.username) {
        _self.$message.error('请填写用户名！！！')
        return
      }
      if (!_self.password) {
        _self.$message.error('请填写密码')
        return
      }

      const loginParams = {
        username: _self.username,
        password: _self.password
      }
      _self.isBtnLoading = true
      try {
        const data = await accountApi.login(loginParams)
        _self.isBtnLoading = false
        const user = {
          id: '1',
          username: _self.username,
          avatar: ''
        }
        // const { msg, code, user } = data;

        // if (code !== 200) {
        // _self.$message.error(msg);
        // } else {
        localStorage.setItem('user', JSON.stringify(user))
        if (_self.$route.query.redirect) {
          _self.$router.push({
            path: _self.$route.query.redirect
          })
        } else {
          _self.$router.push({
            path: '/'
          })
        }

        // }
      } catch (e) {
        //_self.$message.error(e)
        _self.$message.error('用户名或密码错误!!!')
        //this.username='',
        this.password= '', 
        this.isBtnLoading= false
      }
      if (_self.$route.query.redirect) {
        _self.$router.push({
          path: _self.$route.query.redirect
        })
      } else {
        _self.$router.push({
          path: '/'
        })
      }
    },
    async register() {
      this.$router.push({
        path: 'register'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efeeee;
    .login-form {
        display: flex;
        position: absolute;
        z-index: 100;
        flex-direction: column;
        align-items: center;
        width: 500px;
        height: 450px;
        border-radius: 10px;
        background: white;
        border: 1px #eaeaea solid;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            color: #20a0ff;
            font-weight: bold;
            font-size: 40px;
            text-align: center;
            line-height: 2.2;
            font-family: sans-serif;
        }
        .input-group {
            margin-top: 30px;
            width: 80%;
            button {
                width: 100%;
            }
        }
    }
}
</style>
