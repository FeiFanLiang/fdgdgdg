<template lang="html">
  <el-popover placement="top" width="220"  v-model="visible" @show="show" :disabled="!propData.isEditable">
<el-input v-model="input" :placeholder="'请输入'+propData.label" v-if="propData.isEditable"></el-input>
<div style="    text-align: right;
    margin: 5px;" v-if="propData.isEditable">
    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
    <el-button type="primary" size="mini" @click="submit">确定</el-button>
  </div>
       <el-button type="text" slot="reference" v-if="rowData[propData.name]&&propData.isEditable">{{rowData[propData.name]}}</el-button>
       <p  slot="reference" v-if="rowData[propData.name]&&!propData.isEditable">{{rowData[propData.name]}}</p>
       <el-button type="text" slot="reference" v-if="!rowData[propData.name]" icon="edit"></el-button>
   </el-popover>
</template>

<script>
export default {
  props: {
    rowData: '',
    propData: '',
    index: '',
    editMethod: ''
  },
  data() {
    return {
      input: '',
      visible: false
    }
  },
  methods: {
    show() {
      this.input = this.rowData[this.propData.name]
    },
    async submit() {
      if (!this.input) return
      const form = { ...this.rowData }
      form[this.propData.name] = this.input
      form.id = form.ID
      await this.editMethod(form)
      this.visible = false
      this.$emit('successCallBack')
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
    }
  }
}
</script>

<style lang="css">
</style>
