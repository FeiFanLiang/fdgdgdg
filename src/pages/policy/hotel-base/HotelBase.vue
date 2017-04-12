<template lang='jade'>
div.content
	div 每页条数
		select#limit(v-model="limit")
			option 10
			option 20
			option 30
	router-link(to="add", append) 添加
	table.table
		thead
			tr
				th ID
				th 酒店名称
				th 英文名称
				th 前台电话
				th 地址
				th 星级
				th 采购人
				th 政策负责人
				th 结款
				th 操作
		tbody
			tr(v-for="item in List")
				// td(v-for="tdcol in item") {{tdcol}}
				td {{item.ID}}
				td {{item.HotelName}}
				td {{item.HotelName_En}}
				td {{item.FrontPhone}}
				td {{item.Address}}
				td {{item.Star?item.Star.StarName:''}}
				td {{getDef(item.Policys,'PersonName')}}
				td {{getDef(item.Policys,'PurchasingName')}}
				td {{getDef(item.Policys,'PayType').typeName}}
				td
					router-link(v-bind:to="{name: 'HotelBaseEdit', params: { id: item.ID }}") 编辑
					span  |
					router-link(:to="{ path: 'del' , params: { Id: item.ID }}") 删除
	pagination(:index="page" , :count="countpage" , :loading="false" , @change="pages(arguments[0])")
</template>
<script>
import pagination from 'components/common/pagination.vue'
import {
  GetList
} from 'api/Hotel/HotelBase'
export default {
  name: 'HotelBase',
  data () {
    return {
      List: [],
      page: 1,
      order: '',
      limit: 10,
      query: '',
      countpage: 1,
      loading: false
    }
  },
  components: {
    pagination
  },
  created: function () {
    console.log('ready')
    this.loading = true
    // debugger
    if (this.$route.query.query) {
      this.query = this.$route.query.query
    }

    if (this.$route.query.limit) {
      this.limit = this.$route.query.limit
    }

    if (this.$route.query.order) {
      this.order = this.$route.query.order
    }

    if (this.$route.query.page) {
      this.page = Number(this.$route.query.page)
    }
    //

    console.log(this.page)
    this.UPList()
  },
  watch: {
    loading: function (newloading) {
      if (newloading) {
        // 显示缓冲
      } else {
        // 关闭缓冲
      }
    }
  },
  methods: {
    UPList: async function () {
      const result = await GetList(this.page, this.limit, this.order, this.query)
      this.List = result.Data
      // debugger
      this.page = result.pageIndex
      this.order = result.order
      this.limit = result.pageSize
      this.count = result.count
      this.countpage = result.countpage
      this.query = result.query
    },
    pages (index) {
      this.page = index
      // this.loading = true

      // this.UPList()
      // debugger
      // let pa = '/hotel/HotelBase?a=q'
      let thisrou = {
        path: this.$route.path,
        query: {
          page: this.page,
          limit: this.limit,
          order: this.order,
          query: this.query
        }
      }
      this.$router.replace(thisrou)
      // this.$router.push(thisrou)
      this.UPList()
    },
    getDef (obj, pro) {
      if (obj === null || obj.length === 0) {
        return '无协议'
      }
      for (let o in obj) {
        if (o.isDefault) {
          return o[pro]
        }
      }
      return (obj[0])[pro]
    }
  }
}
</script>
<style>
.table thead{ background-color: #0094ea; text-align: center;color:#FFFFFF;}
.table thead th{border: solid 1px #FFFFFF;text-align: center;}
.table tbody{ background-color: #FFFFFF; text-align: center;}
</style>
