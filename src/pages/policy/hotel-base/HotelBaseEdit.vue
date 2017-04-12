<template lang='jade'>
div.mcontent
	Modal(title="提示", v-model="modalShow", @ok="goback", @cancel="goback") {{modalMessage}}
	div.title
		button.btn-primary(class="btn btn-default",@click="goback") 返回
	div.content
		div
			div.row
				div.col-xs-4
					div.form-group
						label id
						input.form-control(type="input", v-model='model.ID',disabled)
				div.col-xs-4
					div.form-group
						label 名称
						input.form-control(type="input", v-model='model.HotelName')
				div.col-xs-4
					div.form-group
						label 编码
						input.form-control(type="input", v-model='model.HotelNum')
				div.col-xs-6
					div.form-group
						label 英文名称
						input.form-control(type="input", v-model='model.HotelName_En')
			div.row
				div.col-xs-4
					div.form-group
						label 星级
						multiselect(v-model='model.Star', :options="stars", :searchable="false", track-by="ID", label="StarName", placeholder="酒店星级信息...")
				div.col-xs-4
					div.form-group
						label 前台电话
						input.form-control(type="input", v-model='model.FrontPhone')
				div.col-xs-4
					div.form-group
						label 传真
						input.form-control(type="input", v-model='model.FaxNum')
			div.row
				div.col-xs-4
					div.form-group
						label 区域
						multiselect(v-model='model.Area', track-by="ID", label="AreaName",
						 placeholder="酒店所在区域...", :options="areas", :loading="areaisLoading"
						 @search-change="asyncFind", :searchable="true")
							span(slot="noResult") 地址未找到<!--@click="asyncFind"-->
				div.col-xs-8
					div.form-group
						label 地址
						input.form-control(type="input", v-model='model.Address')
			div.row
				div.col-xs-12
					div.form-group
						label 备注
						textarea.form-control(v-model='model.Remark',rows='5',style='color:#FF0000')
			div.row
				div.col-xs-12
					div.form-group.text-center
						button.btn-primary-lg(type="submit", class="btn btn-default", @click='SumitModel') 提 交
		div
			Tab(:captions='["政策信息","房型信息","价格信息","平台映射"]')
				template(scope="actide")
					TabContent(:activeIndex='actide.index',:index=0)
						HotelPolicyList(:hotelID='Number(id)')
					TabContent(:activeIndex='actide.index',:index=1)
						HotelRoomList(:hotelID='Number(id)')
					TabContent(:activeIndex='actide.index',:index=2)
						HotelPrice(:hotelID='Number(id)')
					TabContent(:activeIndex='actide.index',:index=3)
						HotelPlatformInfo(:hotelID='Number(id)')
</template>
<script>
import Modal from 'components/common/Modal.vue'
import {Tab, TabContent} from 'components/common/tabs'
import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import HotelPolicyList from 'views/Hotel/HotelPolicyList.vue'
import HotelRoomList from 'views/Hotel/HotelRoomList.vue'
import HotelPlatformInfo from 'views/Hotel/HotelPlatformInfo.vue'
import HotelPrice from 'views/Hotel/HotelPrice.vue'
import {
  GetModel, SumitModel
} from 'api/Hotel/HotelBase'
import {
  GetStarList, QueryAreas
} from 'api/Hotel/common'
export default {
  name: 'HotelBaseEdit',
  data () {
    return {
      model: {},
      id: 0,
      modalShow: false,
      modalMessage: '',
      value: null,
      stars: [],
      areas: [],
      areaisLoading: false
    }
  },
  components: {
    Modal,
    Multiselect,
    vSelect,
    HotelPolicyList,
    HotelRoomList,
    HotelPlatformInfo,
    HotelPrice,
    Tab,
    TabContent
  },
  created: function () {
    console.log('created:' + this.$route.fullPath)
    this.id = this.$route.params.id
    this.getModel(this.id)
    this.getList()
  },
  methods: {
    getModel: async function () {
      const data = await GetModel(this.id)
      // debugger
      if (!data.isError) {
        this.model = data
      } else {
        console.log('getModel:' + data.message)
        this.modalMessage = data.message
        this.modalShow = true
        return
      }
    },
    getList: async function () {
      this.stars = await GetStarList()
      console.log('this.stars:' + this.stars)
    },
    SumitModel: async function () {
      // debugger
      let postobj = this.fomateObject(this.model)
      const data = await SumitModel(postobj)
      this.model = data.data
      console.log('SumitModel:')
      // debugger
      console.log(data)
    },
    goback: function () {
      this.$router.go(-1)
    },
    fomateObject: function (obj) {
      // 子对象模型，映射到id保存
      if (obj.star && obj.star.id !== obj.starID) {
        obj.starID = obj.star.id
        obj.star = null
      }
      if (obj.area && obj.area.id !== obj.areaID) {
        obj.areaID = obj.area.id
        obj.area = null
      }
      return obj
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
      // this.areas = await QueryAreas(query)
      // ajaxFindCountry(query).then(response => {
      //   this.countries = response
      //   this.isLoading = false
      // })
    }
  }
}
</script>
<style>

</style>
