<template lang='jade'>
div.content
	div 每页条数
		select
			option 10
			option 20
			option 30
	div
		a(v-bind:class="{ 'class-a' : showEdit, 'class-b': !showEdit}", @click="addfinance") 添加
		table.table
			thead
				tr
					th ID
					th 酒店名称
					th 支出
					th 收入
					th 利润
					th 负责人
					th 操作
			tbody
				tr(v-for="item in list")
					// td(v-for="tdcol in item") {{tdcol}}
					td {{item.ID}}
					td {{item.hotelName}}
					td {{item.zhiChu}}
					td {{item.shouRu}}
					td {{item.liRun}}
					td {{item.personName}}
					td
						router-link(v-bind:to="{name: 'HotelFinaceEdit', params: { id: item.ID }}") 编辑
						span  |
						router-link(:to="{ path: 'del' , params: { Id: 123 }}") 删除
	component(:is="showEdit?'HotelFinanceAdd':''", @Cancel='hideEdit')
</template>
<script>
import HotelFinanceAdd from 'views/Hotel/HotelFinanceAdd.vue'
import HotelFinaceEdit from 'views/Hotel/HotelFinaceEdit.vue'
import { GetList } from 'api/Hotel/HotelFinance'
// import { mapState } from 'vuex'

export default {
  data () {
    return {
      list: [],
      showEdit: false
    }
  },
  // computed: {
    // ...mapState(['hotelid'])
  // },
  components: {
    HotelFinanceAdd,
    HotelFinaceEdit
  },
  created: function () {
    this.UpList()
    console.log(this)
  },
  methods: {
    async UpList () {
      console.log('UpList')
      // debugger
      const data = await GetList()
      this.list = data.list
    },
    addfinance: function () {
      this.showEdit = !this.showEdit
    },
    hideEdit: function () {
    }
  }
}
</script>
