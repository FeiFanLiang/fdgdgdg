<template lang='jade'>
div.mcontent
  div.title
    button(@click="goback") 返回
  div.content
    div
      div.form-group
        label id
        label.form-control {{model.id}}
      div.row
        div.col-xs-6
          div.form-group
            label 名称
            input.form-control(type="input", v-model='model.hotelName')
        div.col-xs-6
          div.form-group
            label 英文名称
            input.form-control(type="input", v-model='model.HotelName_En')
      div.row
        div.col-xs-4
          div.form-group
            label 星级
            multiselect(v-model='model.star', :options="stars", :searchable="false", track-by="Id", label="StarName", placeholder="酒店星级信息...")
        div.col-xs-4
          div.form-group
            label 前台电话
            input.form-control(type="input", v-model='model.frontPhone')
        div.col-xs-4
          div.form-group
            label 传真
            input.form-control(type="input", v-model='model.faxNum')
    div.row
      div.col-xs-4
        div.form-group
          label 区域
          multiselect(v-model='model.area', track-by="Id", label="AreaName",
            placeholder="酒店所在区域...", :options="areas", :loading="areaisLoading"
            @search-change="asyncFind", :searchable="true")
              span(slot="noResult") 地址未找到
      div.col-xs-8
        div.form-group
          label 地址
          input.form-control(type="input", v-model='model.address')
      div.col-xs-12
        div.form-group
          label 备注
          textarea.form-control(v-model='model.remark',rows='5',style='color:#FF0000')
    div.row
      div.col-xs-12
      div.form-group.text-center
        button.btn-primary-lg(type="submit", class="btn btn-default", @click='AddModel') 提 交
</template>
<script>
import Modal from 'components/common/Modal.vue'
import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import {GetStarList, QueryAreas} from 'api/Hotel/common'
import {
  AddModel
} from 'api/Hotel/HotelBase'
export default {
  name: 'HotelBaseAdd',
  data () {
    return {
      model: {
        id: 0,
        policys: [],
        deleteTime: null,
        creatUserName: '管理员',
        creatUserID: 'admin',
        creatTime: '0001-01-01T00:00:00',
        address: null,
        area: null,
        areaID: null,
        hotelName: '',
        HotelName_En: null,
        hotelNum: '',
        deleteUser: null,
        frontPhone: null,
        faxNum: null,
        isDelete: false,
        remark: null,
        star: null,
        starID: null,
        updateTime: null,
        updateUserID: null,
        updateUserName: null
      },
      stars: [],
      areas: [],
      areaisLoading: false,
      id: 0
    }
  },
  components: {
    Modal,
    Multiselect,
    vSelect
  },
  created: function () {
    console.log('created:' + this.$route.fullPath)
    this.getList()
  },
  methods: {
    AddModel: async function () {
      console.log('Submit')
      const data = await AddModel(this.model)
      console.log('AddModel:')
      console.log(data)
      let oid = data.ID
      this.$notify.success({
        title: '添加成功',
        message: '酒店ID:' + oid,
        offset: 100
      })
      this.$router.push({name: 'HotelBaseEdit', params: { id: oid }})
    },
    getList: async function () {
      this.stars = await GetStarList()
    },
    goback: function () {
      this.$router.go(-1)
    },
    asyncFind: function (query, loading) {
      // debugger
      if (loading) {
        loading(true)
      }
      this.areaisLoading = true
      QueryAreas(query).then(data => {
        this.areas = data
        this.areaisLoading = false
        if (loading) {
          loading(false)
        }
      })
    }
  }
}
</script>
<style>

</style>
