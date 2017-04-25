<template lang="html">
  <div class="">
  <Menu path="price"><el-button type="primary" @click="hotelroomAdd">创建</el-button></Menu >
  </div>
</template>

<script>
import Menu from '../../../components/menu.vue'
export default {
  components: {
    Menu
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    console.dir(this.$route.params);
  }
};
</script>

<style lang="css">
</style>
