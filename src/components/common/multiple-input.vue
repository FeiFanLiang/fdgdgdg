<template lang="html">
  <el-col :span="6">
    <el-input placeholder="请输入内容" v-model="input" @change="inputChange" >
<el-select v-model="select" slot="prepend" placeholder="请选择" @change="selectChange" style="width: 110px;">
<el-option :label="item.label" :value="item.value" v-for="(item,index) in list" :key="index"></el-option>

</el-select>

</el-input>
  </el-col>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      select: this.list[0].value,
      input: ''
    }
  },
  methods: {
    inputChange() {
      let form = { [this.select]: this.input }
      this.$emit('multipleChangeCallBack', form)
    },
    selectChange() {
      this.input = ''
      this.inputChange()
    },
    trans() {
      let obj = {}
      this.configList.forEach(item => {
        obj[item.name] = item.data
      })
      return obj
    }
  }
}
</script>

<style lang="css" scoped>

</style>
