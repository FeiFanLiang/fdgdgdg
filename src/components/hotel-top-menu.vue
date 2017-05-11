<template lang="html">
  <div class="">
    <el-menu :default-active="activeMenu"  mode="horizontal" >
      <el-menu-item v-for="(item,index) in routers" :index="index+''" :key="index" @click="goNextPage(item.path)">
        {{item.text}}
      </el-menu-item>
        <div style="margin-top: 12px;margin-left: 500px;">
          <slot/>
        </div>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      routers: [{
          path: 'policy',
          text: '政策信息'
        },
        {
          path: 'room',
          text: '房型信息'
        },
        {
          path: 'price',
          text: '价格信息'
        },
        {
          path: 'platform',
          text: '平台映射'
        },
        {
          path: 'platform',
          text: '展示信息'
        }
      ]
    }
  },
  computed: {
    activeMenu() {
      return this.routers.findIndex((value, index) => {
        return value.path === this.path
      }) + ''
    }
  },
  methods: {
    goNextPage(path) {
      this.$router.replace({
        path,
        query:{hotelName:this.$route.query.hotelName}
      });
    },
  }
}
</script>

<style lang="css">
</style>
