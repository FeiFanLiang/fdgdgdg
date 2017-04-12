<template>
<div class="content">
  <form class="navbar-form navbar-left" role="search">
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Search" v-model="keys">
    </div>
    <!--<button type="submit" class="btn btn-default" v-bind:click="search">查找</button>-->
  </form>
  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>平台名称</th>
        <th>平台信息</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in lists">
        <td>{{item.ID}}</td>
        <td>{{item.PlatName}}</td>
        <td>{{item.Ramark}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
import {
  GetList
} from 'api/Hotel/HotelPlatform'
export default {
  name: 'HotelPlatform',
  data () {
    return {
      list: [],
      keys: ''
      // query: ''
    }
  },
  created: function () {
    console.log('ready')
    // if (this.$route.query.query) {
    //   this.query = this.$route.query.query
    // }
    // if (this.$route.query.key) {
    //   this.key = this.$route.query.key
    // }
    this.UPList()
  },
  methods: {
    UPList: async function () {
      const result = await GetList()
      this.list = result
      // this.key = result.key
      // this.query = result.query
    }
    // search: function (key) {
    //   // let thisrou = {
    //   //   path: this.$route.path,
    //   //   query: {
    //   //     key: this.key
    //   //     // query: this.query
    //   //   }
    //   // }
    //   // this.$router.replace(thisrou)
    //   // // this.$router.push(thisrou)
    //   // getModel(this.key)
    // }
  },
  computed: {
    lists: function () {
      var keys = this.keys
      console.log('keys:' + keys)
      if (keys) {
        return this.list.filter(function (a) {
          return Object.keys(a).some(function (key) {
            return String(a[key]).toLowerCase().indexOf(keys) > -1
          })
        })
      }
      return this.list
    }
  }
}
</script>