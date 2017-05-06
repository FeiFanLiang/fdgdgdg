<template lang="html">
  <div  class="bread-crumbs-wapper">
    <el-breadcrumb separator="/">
      <span class="db-breadcrumb-loc">位置：</span>
      <el-breadcrumb-item v-for="(item,index) in breadcrumbs" :to="item" :key="index" v-if="item.name!=='酒店信息编辑'">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="" style="position: absolute;right: -321px;top: -5px;">
      {{hotelName}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'db-breadcrumb',
  data() {
    return {
      hotelName: '',
      breadcrumbs: []
    };
  },
  watch: {
    $route() {
      const _self = this;
      _self.hotelName = _self.$route.query.hotelName;
      _self.breadcrumbs = (_self.$parent && _self.$parent.$route && _self.$parent.$route.matched) || [];

    }
  },
  mounted() {
    const _self = this;
    _self.hotelName = _self.$route.query.hotelName;
    _self.breadcrumbs = (_self.$parent && _self.$parent.$route && _self.$parent.$route.matched) || [];
  }
};
</script>

<style lang="scss" >
.db-breadcrumb-loc {
    float: left;
}
.bread-crumbs-wapper{
  display: inline-block;margin-top: 24px;position: relative;
}
</style>
