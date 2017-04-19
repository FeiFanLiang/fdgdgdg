<template lang='jade'>
div.content
  a(@click="addpolicy") 添加
  table.table
    thead
      tr
        th ID
        th 政策负责人
        th 政策采购人
        th 酒店联系人
        th 酒店联系电话
        th 保密类型
        th 酒店预订方式
        th 默认政策
        th 操作
    tbody
      tr(v-for="item in List")
        td {{item.ID}}
        td {{item.PersonName}}
        td {{item.PurchasingName}} 
        td {{item.PersonName}}
        td {{item.PhoneNum}} 
        td {{item.SecretType?item.SecretType.SecretName : ''}}
        td {{item.ReserveMode?item.ReserveMode.ModeName : ''}}
        td {{item.IsDefault?'默认':''}}
        td         
          a(@click='editpolicy(item.ID)') 编辑 | 
          a(@click='setdef(item.ID)') 设为默认 | 
          a(@click='setdef(item.ID)') 删除
  div
  component(:is="showEdit?'hotelpolicyedit':''", :hotelID='hotelID', :policyid='crrpolicyID', :mode='EditMode', @Submit='UPList', @Cancel='hideEdit')

</template>
<script>
import hotelpolicyedit from 'views/Hotel/HotelPolicyEdit.vue'
import Modal from 'components/common/Modal.vue'
import {
   GetList
} from 'api/Hotel/HotelPolicy'
export default {
  name: 'HotelPolicyList',
  props: {
    hotelID: Number
  },
  data () {
    return {
      List: [],
      crrpolicyID: -1,
      showEdit: false,
      EditMode: 'add',
      modalIsDel: false,
      modalIsDef: false,
      modalIsCalDef: false
    }
  },
  components: {
    hotelpolicyedit,
    Modal
  },
  created: function () {
    console.log('ready')
    this.UPList()
    console.log('zhengce' + this.hotelID)
  },
  events: {
    'closeedit': function () {
      this.hideEdit()
    }
  },
  methods: {
    UPList: async function () {
      const result = await GetList(this.hotelID)
      this.List = result
      this.$nextTick(function () {
      })
    },
    addpolicy () {
      // debugger
      this.showEdit = !this.showEdit
      this.crrpolicyID = -1
      this.EditMode = 'add'
      this.showEdit = true
    },
    setdef (id) {
    },
    deletepolicy (id) {
    },
    editpolicy (id) {
      this.showEdit = !this.showEdit
      this.crrpolicyID = id
      this.EditMode = 'edit'
    },
    hideEdit () {
      debugger
      this.showEdit = false
    }
  }
}
</script>
<style>

</style>
