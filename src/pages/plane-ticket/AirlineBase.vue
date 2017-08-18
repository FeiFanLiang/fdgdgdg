<template lang='jade'>
div.content
	div 每页条数
		select#limit(v-model="limit")
			option 10
			option 20
			option 20
	router-link(to="airline/add") 添加
	table.table
		thead
			tr
				th ID
				th 二字码
				th 名称
				th 编码
				th 操作
		tbody
			tr(v-for="item in List")
				td(v-for="tdcol in item") {{tdcol}}
				td
					router-link(v-bind:to="{name: 'AirlineEdit', params: { id: item.id }}") 编辑
					router-link(to="del") 刪除
					{{item.id}}
	pagination(:index="page" , :count="countpage" , :loading="false" , @change="pages(arguments[0])")
</template>
<script>
// router-link(:to="{ path: 'edit', params: {id: 2}}") 编辑
import pagination from 'components/common/pagination.vue'
import {
  GetList
} from 'api/airline/airlines'
export default {
  name: 'AirlineBase',
  data () {
    return {
      List: [],
      page: 1,
      order: '',
      limit: 10,
      query: '',
      countpage: 1
    }
  },
  components: {
    pagination
  },
  created () {
    this.UPList()
  },
  methods: {
    UPList: async function () {
      const data = await GetList(this.page, this.limit, this.order, this.query)
      this.List = data.list
      this.page = data.page
      this.order = data.order
      this.limit = data.limit
      this.count = data.count
      this.countpage = data.countpage
      this.query = data.query
    },
    pages (index) {
      this.page = index
      // this.loading = true

      this.UPList()
      // ajax处理代码
      // setTimeout(() => {
      //   this.loading = false
      // }, 300)
    }

  }
}
</script>
<style>

</style>
