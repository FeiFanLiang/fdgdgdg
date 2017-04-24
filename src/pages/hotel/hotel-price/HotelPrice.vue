<template lang="html">
  <div class="">
    jiage
  </div>
</template>

<script>
export default {
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    console.dir(this.$route.params);
  }
};
</script>

<style lang="css">
</style>
