<template lang='jade'>
div.mcontent
  div.title 添加/編輯
    button(@click="goback") 返回
  div.content
    div
      div.form-group
        label id
        label.form-control {{model.id}}
      div.form-group
        label 名稱
        input.form-control(type="input", v-model='model.name')
      div.form-group
        label 二字码
        input.form-control(type="input", v-model='model.code')
      div.form-group
        label 编码
        input.form-control(type="input", v-model='model.codeNum')
      button(type="submit", class="btn btn-default", @click=SumitModel) 提交

</template>
<script>
import {
  GetModel, SumitModel
} from 'api/airline/airlines'
export default {
  name: 'AirlineBase',
  data () {
    return {
      model: {},
      id: 0
    }
  },
  components: {
  },
  created: function () {
    console.log('created:' + this.$route.fullPath)
    this.id = this.$route.params.id
    this.getModel(this.id)
  },
  methods: {
    getModel: async function () {
      const data = await GetModel(this.id)
      this.model = data
    },
    SumitModel: async function () {
      const data = await SumitModel(this.model)
      console.log('SumitModel:')
      console.log(data)
    },
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>
<style>

</style>
