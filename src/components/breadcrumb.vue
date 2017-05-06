<template lang="html">
  <div  style="display: inline-block;margin-top: 30px;">
    <el-breadcrumb separator="/">
      <span class="db-breadcrumb-loc">位置：</span>
      <el-breadcrumb-item v-for="item in breadcrumbs" :to="item" v-if="item.name!=='酒店信息编辑'">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'db-breadcrumb',
  data() {
    return {
      breadcrumbs: []
    };
  },
  watch: {
    $route() {
      this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
    }
  },
  mounted() {
    this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];
  }
};
</script>

<style lang="scss">
.db-breadcrumb-loc {
    float: left;
}
</style>
