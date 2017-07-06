<template lang="html">
<div class="delete_button" >
  <el-popover
  ref="popover"
  placement="top"
  width="160"
  v-model="visible">
  <p>你确定删除这条数据吗？</p>
  <div style="text-align: right; margin: 0">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button  type="primary" size="mini" @click="del">确定</el-button>
  </div>
</el-popover>
<el-button size="small" type="danger" v-popover:popover>删除</el-button>
</div>
</template>

<script>
import * as ApiService from 'api';

export default {
  name: 'DeleteButton',
  props: {
    api: '',
    id: ''
  },
  data() {
    return {
      visible: false
    };
  },
  methods: {
    async del() {
      const _self = this;
      try {
        await ApiService[_self.api].del(this.id);
        _self.$emit('successCallBack');
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
        this.visible=false;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style lang="css" scoped>
.delete_button{
  display: inline-block;
}
.el-button+.delete_button {
    margin-left: 10px;
}
</style>
