<!--<template>
<div>
  <h1>酒店展示信息</h1>
</div>
</template>-->
<template lang="jade">
div.content
  a(@click="addDetail") 添加
  Modal(title="确认删除", v-model="modalIsDel", @ok="affdeldetail", @cancle="")确认要删除吗
  table.table
    thead
      tr
        th 标题1
        th 标题2
        th 标题3
        th 标题4
        th 标题5
        th 标题6
        th 备注
        th 操作
    tbody
      tr
        td 内容1
        td 内容2
        td 内容3
        td 内容4
        td 内容5
        td 内容6
        td 备注内容
        td 编辑
          span |
          删除
      tr(v-for="item in list")
        td {{item.name}}
        td {{item.name}}
        td {{item.name}}
        td {{item.name}}
        td {{item.name}}
        td {{item.name}}
        td {{item.name}}
        td
          a(@click="editdetail(item.ID)") 编辑
          span |
          a(@click="deldetail(item.ID)") 删除
  component( :is="showEdit?'HotelDetailEdit':''", :detailID='did', :mode='EditMode', @Submit='UPList', @Cancel='hideEdit')
  img(:src="imgs")
</template>
<script>
import imgsrc from 'assets/xiaomiao.jpg'
import Modal from 'components/common/Modal.vue'
import HotelDetailEdit from 'views/Hotel/HotelDetailEdit'
import {
  GetList
} from 'api/Hotel/HotelDetail'
export default {
  name: 'HotelDetail',
  data () {
    return {
      list: [{ID: 1, name: 'a'}],
      showEdit: false,
      EditMode: 'add',
      did: -1,
      modalIsDel: false,
      imgs: imgsrc
    }
  },
  components: {
    HotelDetailEdit,
    Modal
  },
  methods: {
    UPList: async function () {
      const result = await GetList()
      this.list = result
      this.showEdit = false
      this.$nextTick(function () {
      })
    },
    editdetail (id) {
      this.did = id
      this.EditMode = 'edit'
      this.showEdit = true
    },
    addDetail () {
      this.EditMode = 'add'
      this.showEdit = true
    },
    hideEdit () {
      this.showEdit = false
    },
    deldetail (id) {
      this.modalIsDel = true
    },
    affdeldetail () {
      this.modalIsDel = false
    }
  }
}
</script>
<style>
.content {
  background-image: 'assets/小喵.jpg' no-repeat
}
</style>