<template lang='jade'>
div.mcontant
  div.content
    div
      div.row
        div.col-xs-4
          div.form-group
            label ID
            label.form-control {{model.ID}}
        div.col-xs-4
          div.form-group
            label 平台ID
            multiselect(v-model='model.PlatformID', :options="plats", :searchable="false", track-by="id", label="ID", placeholder="酒店平台选择...")
        div.col-xs-4
          div.form-group
            label 酒店ID
            label.form-control {{hotelID}}
      div.row
        div.col-xs-4
          div.form-group
            label 酒店平台ID
            input.form-control(type="input", v-model="model.PlatHotelID", disabled)
        div.col-xs-4
          div.form-group
            label 平台访问路径
            input.form-control(type="input", v-model="model.PlatURL")
        div.col-xs-4
          div.form-group
            label 酒店平台名称
            input.form-control(type="input", v-model="model.PlatHotelName")
      div.row
        div.col-xs-4
          div.form-group
            label 酒店平台英文名
            input.form-control(type="input", v-model="model.PlatHotelName_En")
      div.row
        div.col-xs-12
          div.form-group
            label 备注
            textarea.form-control(rows='5',style='color:#FF0000', v-model="model.Ramark")
      div.row
        div.col-xs-12
          div.form-group.text-center
            button.btn-primary-lg(type="button", class="btn btn-default", @click='SumitHotelPlatInfo') 提 交
            &nbsp;&nbsp;
            button.btn-primary-lg(type="button", class="btn btn-default", @click='Cancel') 取 消
</template>
<script>
import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import {
  SaveModel, GetModel, CreateModel
} from 'api/Hotel/HotelPlatformInfo'
import {
  GetList
} from 'api/Hotel/HotelPlatform'
export default {
  name: 'HotelPlatInfoEdit',
  props: {
    mode: String,
    hotelID: Number,
    platID: Number
  },
  data () {
    return {
      model: {},
      ID: 0,
      plats: [],
      areas: [],
      areaisLoading: false
    }
  },
  components: {
    Multiselect,
    vSelect
  },
  created: async function () {
    console.log('created:HotelPlatInfoEdit')
    console.log('hotelID:' + this.hotelID)
    this.plats = await GetList()
    if (this.mode === 'edit' && this.platID > 0) {
      this.id = this.platID
      this.Get(this.platID)
      console.log('plats:' + this.plats)
    }
  },
  methods: {
    Get: async function () {
      // debugger
      const data = await GetModel(this.id)
      this.model = data
      console.log('platID：' + this.platID)
      console.log('model:' + data)
      console.log('id:' + this.id)
      // debugger
    },
    Create: async function (obj) {
      await CreateModel(obj)
    },
    Save: async function (obj) {
      // debugger
      await SaveModel(obj)
    },
    SumitHotelPlatInfo: async function () {
      this.model.hotelID = this.hotelID
      console.log('this.model.hotelID' + this.hotelID)
      // debugger
      if (this.mode === 'add') {
        await this.Create(this.model)
      } else {
        await this.Save(this.model)
      }
      this.$emit('Sumit')
    },
    Cancel: function () {
      this.$emit('Cancel')
    }
  }
}
</script>
