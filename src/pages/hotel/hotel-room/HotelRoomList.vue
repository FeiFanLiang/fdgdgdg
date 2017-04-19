<template lang='jade'>
div.content
  a(@click="addroom") 添加
  Modal(title="确认删除", v-model="modalIsDel", @ok="affdelroom", @cancel="") 确认要删除这个房型吗？相关政策价格也会被动删除
  Modal(title="设为默认", v-model="modalIsDef", @ok="affdef", @cancel="") 设为默认？
  Modal(title="取消默认", v-model="modalIsCalDef", @ok="", @cancel="") 取消默认？
  table.table
    thead
      tr
        th ID
        th 房间名称
        th 床型
        th 数量
        th 备注
        th 默认
        th 操作
    tbody
      tr(v-for="item in List")
        td {{item.ID}}
        td {{item.RoomName}}
        td {{arrs(item.Beds)}}
        td {{item.RoomCount}}
        td {{item.Remark}}
        td {{item.IsDelete?"是":"否"}}
        td
          a(@click="editroom(item.ID)") 编辑
          span |
          a(@click='setdef(item.ID)') 设为默认
          span |
          a(@click="delroom(item.ID)") 刪除
  component( :is="showEdit?'hotelroomedit':''", :hotelID='hotelID', :mode='EditMode', :roomID='crrID', @Sumit='UPList', @Cancel='hideEdit')
</template>
<script>
import hotelroomedit from 'views/Hotel/HotelRoomEdit.vue'
import Modal from 'components/common/Modal.vue'
import {
  GetList
} from 'api/Hotel/HotelRoom'
export default {
  name: 'HotelRoomList',
  props: {
    hotelID: Number
  },
  data () {
    return {
      List: [],
      crrID: -1,
      showEdit: false,
      EditMode: 'add',
      modalIsDel: false,
      modalIsDef: false,
      modalIsCalDef: false
    }
  },
  components: {
    hotelroomedit,
    Modal
  },
  created: function () {
    console.log('ready')
    this.UPList()
    console.log('roomlist' + this.hotelID)
  },
  methods: {
    UPList: async function () {
      const result = await GetList(this.hotelID)
      this.List = result
      this.showEdit = false
      this.$nextTick(function () {
      })
    },
    setdef (id) {
      this.modalIsDef = true
    },
    affdef (id) {
      this.modalIsDef = false
    },
    editroom (id) {
      // debugger
      this.crrID = id
      this.EditMode = 'edit'
      this.showEdit = true
    },
    closeEdit () {
      this.showEdit = false
    },
    delroom (id) {
      this.modalIsDel = true
    },
    affdelroom (id) {
      this.modalIsDel = false
    },
    arrs (bads) {
      let bname = ''
      for (let b of bads) {
        bname += b.BedName
        bname += ' | '
      }
      return bname
    },
    addroom () {
      // debugger
      this.crrID = -1
      this.EditMode = 'add'
      this.showEdit = true
    },
    hideEdit () {
      this.showEdit = false
    }
  }
}
</script>
<style>

</style>
