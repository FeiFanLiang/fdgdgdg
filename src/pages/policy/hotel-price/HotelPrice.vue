<!--<template>
<div>
  <h1>酒店价格信息</h1>
</div>
</template>-->
<template lang='jade'>
div.content
  Modal(title="确认删除", v-model="modalIsDel", @ok="affdelprice", @cancel="") 确认要删除吗？
  a(@click="addprice") 添加
  table.table
    thead
      tr
        th ID
        th 酒店ID
        th 酒店名称
        th 床型
        th 价格
        th 备注
        th 操作
    tbody
      tr(v-for="item in list")
        td {{item.ID}}
        td {{item.HotelID}}
        td {{item.HotelName}}
        <!--td {{arrs(item.Beds)}}-->
        td 床型
        td {{item.Price}}
        td {{item.Remark}}
        td
          a(@click="editprice(item.ID)") 编辑
          span |
          a(@click="delprice(item.ID)") 刪除
  component( :is="showEdit?'HotelPriceEdit':''", :hotelID='hotelID', :priceID='pid', :mode='EditMode', @Sumit='UPList', @Cancel='hideEdit')
</template>
<script>
import HotelPriceEdit from 'views/Hotel/HotelPriceEdit.vue'
import Modal from 'components/common/Modal.vue'
import {
  GetList
} from 'api/Hotel/HotelPrice'
export default {
  name: 'HotelPrice',
  props: {
    hotelID: Number
  },
  data () {
    return {
      list: {
        ID: ''
      },
      EditMode: 'add',
      showEdit: false,
      modalIsDel: false,
      pid: -1
    }
  },
  components: {
    HotelPriceEdit,
    Modal
  },
  created: function () {
    console.log('ready')
    this.UPList()
  },
  methods: {
    UPList: async function () {
      const result = await GetList(this.hotelID)
      this.list = result
      this.showEdit = false
      this.$nextTick(function () {
      })
    },
    editprice (id) {
      this.pid = id
      this.EditMode = 'edit'
      this.showEdit = true
      console.log('123456789:' + this.EditMode)
    },
    hideEdit () {
      this.showEdit = false
    },
    delprice (id) {
      this.modalIsDel = true
    },
    affdelprice () {
      this.modalIsDel = false
    },
    addprice () {
      this.pid = -1
      this.EditMode = 'add'
      this.showEdit = true
    }
    // arrs (bads) {
    //   let bname = ''
    //   for (let b of bads) {
    //     bname += b.BedName
    //     bname += ' | '
    //   }
    //   return bname
    // }
  }
}
</script>
