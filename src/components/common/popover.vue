<template lang="html">
    <div class="">
      <span v-popover:popover>{{popoverText  }}</span>
      <el-popover
      ref="popover"
      placement="bottom"
      title="标题"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      </el-popover>
    </div>
</template>

<script>
export default {
  props: {
    popoverText: ''
  }
}
</script>

<style lang="css">
</style>
