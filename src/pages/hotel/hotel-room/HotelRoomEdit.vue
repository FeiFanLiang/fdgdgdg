<template lang='jade'>
div.mcontent
	div.content
		div
			div.row
				div.col-xs-4
					div.form-group
						label id
						input.form-control(type="input", v-model='model.ID',disabled)
				div.col-xs-8
					div.form-group
						label 名称
						input.form-control(type="input", v-model='model.RoomName')
			div.row
				div.col-xs-4
					div.form-group
						label 数量
						input.form-control(type="input", v-model='model.RoomCount')
				div.col-xs-8
					div.form-group
						label 床型
						multiselect(v-model='selbeds', track-by="ID", label="BedName",
						 placeholder="床型", :options="beds", :multiple="true",
             :hide-selected="true", :close-on-select="false", :searchable="false")
			div.row
				div.col-xs-12
					div.form-group
						label 备注
						textarea.form-control(v-model='model.remark',rows='5',style='color:#FF0000')
			div.row
				div.col-xs-12
					div.form-group.text-center
						button.btn-primary-lg(type="button", class="btn btn-default", @click='SumitHotelRoom') 提 交
						button.btn-primary-lg(type="button", class="btn btn-default", @click='Cancel') 取 消
</template>
<script>
import Modal from 'components/common/Modal.vue'
import Multiselect from 'vue-multiselect'
import vSelect from 'vue-select'
import {
  GetModel, SaveModel, CreateModel
} from 'api/Hotel/HotelRoom'
import {
  GetBedList
} from 'api/Hotel/common'
export default {
  name: 'HotelRoomEdit',
  props: {
    hotelID: Number,
    mode: String,
    roomID: Number
  },
  data () {
    return {
      model: {
        id: 0,
        roomName: '',
        roomCount: 0,
        remark: ''
      },
      id: 0,
      beds: [],
      selbeds: []
    }
  },
  components: {
    Modal,
    Multiselect,
    vSelect
  },
  created: async function () {
    console.log('created:HotelBaseEdit')
    // debugger
    if (this.mode === 'edit' && this.roomID > 0) {
      this.Get(this.roomID)
    }
    this.beds = await GetBedList()
  },
  watch: {
    crrID (val) {
      // 在显示时去掉body滚动条，防止出现双滚动条
      // if (val) {
      //   document.body.className += ' modal-open'
      // } else {
      //   // 在modal动画结束后再加上body滚动条
      //   if (!this.duration) {
      //     this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000
      //   }
      //
      //   window.setTimeout(() => {
      //     document.body.className = document.body.className.replace(/\s?modal-open/, '')
      //   }, this.duration || 0)
      // }
    }
  },
  methods: {
    Get: async function (id) {
      debugger
      const data = await GetModel(id)
      this.model = data
      debugger
    },
    Create: async function (obj) {
      await CreateModel(obj)
    },
    Save: async function (obj) {
      debugger
      await SaveModel(obj)
      // const data = await SaveModel(obj)
      // this.model = data.data
    },
    SumitHotelRoom: async function () {
      console.log('SumitHotelRoom')
      let postobj = this.fomateObject(this.model)
      // debugger
      if (this.mode === 'add') {
        await this.Create(postobj)
      } else {
        await this.Save(postobj)
      }
      this.$emit('Sumit')
    },
    Cancel () {
      this.$emit('Cancel')
    },
    fomateObject: function (obj) {
      // 床型映射表，
      console.log('fomateObject')
      obj.hotelID = this.hotelID
      if (this.selbeds && this.selbeds.length > 0) {
        obj.beds = []
        for (var i of this.selbeds) {
          obj.beds.push({id: i.id})
        }
      } else {
        obj.beds = null
      }
      return obj
    }
  }
}
</script>
<style>

</style>
