<template lang="html">

  <el-popover placement="top" width="220"  v-model="visible">
<el-input v-model="input" :placeholder="'请输入'+propData.label"></el-input>
<div style="    text-align: right;
    margin: 5px;">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="submit">确定</el-button>
  </div>
       <el-button type="text" slot="reference" >{{rowData[propData.name]}}</el-button>
   </el-popover>
</template>

<script>
export default {
  props: {
    rowData: '',
    propData: '',
    index: ''
  },
  data() {
    return {
      input: '',
      visible: false
    }
  },
  methods: {
    submit() {
      console.log(this.rowData)
    }
  }
}
</script>

<style lang="css">
</style>
