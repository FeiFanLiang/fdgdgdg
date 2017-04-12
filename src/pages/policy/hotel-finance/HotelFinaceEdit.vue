<template lang='jade'>
div.mcontant
  div.title
    button.btn-primary(class="btn btn-default", @click="goback") 返回
  div.content
    div
      div.row
        div.col-xs-4
          div.form-group
            label id
            input.form-control(type="input", v-model='model.id',disabled)
        div.col-xs-4
          div.form-group
            label hotelID
            input.form-control(type="input",disabled)
        div.col-xs-4
          div.form-group
            label 酒店名称
            input.form-control(type="input", v-model='model.hotelName')
      div.row
        div.col-xs-4
          div.form-group
            label 支出
            input.form-control(type="input", v-model='model.zhiChu')
        div.col-xs-4
          div.form-group
            label 收入
            input.form-control(type="input", v-model='model.shouRu')
        div.col-xs-4
          div.form-group
            label 利润
            input.form-control(type="input", v-model='model.liRun')
        div.col-xs-4
          div.form-group
            label 负责人
            input.form-control(type="input", v-model='model.personName')
      div.row
        div.col-xs-12
          div.form-group
            label 备注
            textarea.form-control(v-model='model.remark',rows='5',style='color:#FF0000')
      div.row
        div.col-xs-12
          div.form-group.text-center
            button.btn-primary-lg(type="submit", class="btn btn-default") 提 交
            // , @click='SumitModel'
</template>
<script>
import {
  GetModel
} from 'api/Hotel/HotelFinance'
// , SumitModel
export default {
  name: 'HotelFinanceEdit',
  data () {
    return {
      // id: 1,
      model: {
        id: '333',
        hotelID: null,
        hotelName: '',
        zhiChu: '',
        shouRu: '',
        liRun: '',
        personName: '',
        remark: null
      }
    }
  },
  created: function () {
    // debugger
    console.log('created:' + this.$route.fullPath)
    this.id = this.$route.params.id
    console.log('id33333:' + this.id)
    this.getModel(this.id)
  },
  methods: {
    getModel: async function () {
      const data = await GetModel(this.id)
      if (!data.isError) {
        this.model = data
      } else {
        console.log('getModel:' + data.message)
        return
      }
    },
    // SumitModel: async function () {
    //   debugger
    //   let postobj = this.model
    //   const data = await SumitModel(postobj)
    //   this.model = data.data
    //   console.log('SumitModel:')
    //   debugger
    //   console.log(data)
    // },
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>
