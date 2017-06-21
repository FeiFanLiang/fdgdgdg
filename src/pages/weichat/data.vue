<template>
<div id="data">
    <el-tabs type="border-card">
        <el-tab-pane label="经营概况"><JYGK></JYGK></el-tab-pane>
        <el-tab-pane label="卡券数据"><KJSJ></KJSJ></el-tab-pane>
        <el-tab-pane label="核销记录"><HXJL></HXJL></el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
import JYGK from './data-jygk'
import KJSJ from './data-kjsj'
import HXJL from './data-hxjl'
  export default {
    components: {
        JYGK,
        KJSJ,
        HXJL
    },
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
     
    }
  }
</script>
