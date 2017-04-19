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
            label.form-control {{model.id}}
        div.col-xs-4
          div.form-group
            label 酒店名称{{model.hotelName}}
            input.form-control(type="input", v-model='model.hotelName')
        div.col-xs-4
          div.form-group
            label 支出
            input.form-control(type="input", v-model='model.zhiChu')
      div.row
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
            button.btn-primary-lg(type="submit", class="btn btn-default", @click='AddModel2') 提 交 
            //
</template>
<script>
import {
  GetModel, AddModel
} from 'api/Hotel/HotelFinance'
export default {
  name: 'HotelFinanceAdd',
  data () {
    return {
      model: {
        id: null,
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
    this.getModel2(this.id)
  },
  methods: {
    // getModel: async function () {
    //   const data = await GetModel(this.id)
    //   if (!data.isError) {
    //     this.model = data
    //   } else {
    //     console.log('getModel:' + data.message)
    //     return
    //   }
    // },
    // SumitModel: async function () {
    //   debugger
    //   let postobj = this.model
    //   const data = await SumitModel(postobj)
    //   this.model = data.data
    //   console.log('SumitModel:')
    //   debugger
    //   console.log(data)
    // },
    AddModel2: async function () {
      console.log('Submit')
      const data = await AddModel(this.model)
      console.log('AddModel:')
      console.log(data)
    },
    getModel2: async function () {
      const data = await GetModel(this.id)
      this.model = data
      console.log('22222:' + this.model)
    },
    goback: function () {
      this.$router.go(-1)
    }
  }
}
</script>
