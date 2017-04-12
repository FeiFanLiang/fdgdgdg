<!--<template>
<div>
  <h1>平台映射信息</h1>
</div>
</template>-->
<template lang='jade'>
div.content
  Modal(title="确认删除", v-model="modalIsDel", @ok="affdelplatinfo", @cancel="") 确认要删除吗？
  a(@click="addplatinfo") 添加
  table.table
    thead
      tr
        th ID
        th 平台ID
        th 酒店ID
        th 区域
        th 地址
        th 酒店平台ID
        th 平台访问路径
        th 酒店平台名称
        th 酒店平台英文名
        th 备注
        th 操作
    tbody
      tr(v-for="item in list")
        td {{item.ID}}
        td {{item.PlatformID}}
        td {{item.HotelID}}
        td {{item.AreaID}}
        td {{item.Address}}
        td {{item.PlatHotelID }}
        td {{item.PlatURL}}
        td {{item.PlatHotelName}}
        td {{item.PlatHotelName_En}}
        td {{item.Remark}}
        td
          a(@click="editroom(item.ID)") 编辑
          span  |
          a(@click="delplatinfo(item.ID)")  刪除

  component( :is="showEdit?'HotelPlatInfoEdit':''", :hotelID='hotelID', :platID='pid', :mode='EditMode', @Sumit='UPList', @Cancel='hideEdit')
</template>
<script>
import HotelPlatInfoEdit from 'views/Hotel/HotelPlatInfoEdit.vue'
import Modal from 'components/common/Modal.vue'
import {
  GetList
} from 'api/Hotel/HotelPlatformInfo'
export default {
  name: 'HotelPlatformInfo',
  props: {
    hotelID: Number
  },
  data () {
    return {
      list: [],
      showEdit: false,
      EditMode: 'add',
      modalIsDel: false,
      pid: -1
    }
  },
  components: {
    HotelPlatInfoEdit,
    Modal
  },
  created: function () {
    console.log('ready')
    this.UPList()
    console.log('platinfo' + this.hotelID)
  },
  methods: {
    UPList: async function () {
      // if(item.HotelID)
      const result = await GetList(this.hotelID)
      for (var re of result) {
        console.log('list.HotelID:' + re.HotelID)
        if (re.HotelID === this.hotelID) {
          this.list = result
        } else {
          this.list = null
        }
      }
      // this.list = result
      this.showEdit = false
      this.$nextTick(function () {
      })
    },
    editroom (id) {
      // debugger
      this.pid = id
      this.EditMode = 'edit'
      this.showEdit = true
    },
    delplatinfo (id) {
      this.modalIsDel = true
    },
    affdelplatinfo (id) {
      this.modalIsDel = false
    },
    addplatinfo () {
      // debugger
      this.pid = -1
      this.EditMode = 'add'
      this.showEdit = true
    },
    hideEdit () {
      this.showEdit = false
    }
  }
}
</script>
