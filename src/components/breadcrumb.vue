<template lang="html">
  <div class="">
    <el-breadcrumb separator="/">
      <span class="db-breadcrumb-loc">位置：</span>
      <el-breadcrumb-item v-for="item in breadcrumbs" :to="item" v-if="item.name!=='酒店信息编辑'">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line">

    </div>
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
  watch:{
    breadcrumbs(){
        console.log(this.breadcrumbs)
    }
  },

  mounted() {
    this.breadcrumbs = (this.$parent && this.$parent.$route && this.$parent.$route.matched) || [];

  }
};
</script>

<style lang="css">
.db-breadcrumb-loc {
  float: left;
}
</style>
