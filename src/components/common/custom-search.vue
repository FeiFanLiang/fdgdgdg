<template lang="html">
  <el-row :gutter="20" class="align-center">
      <el-col :span="4" v-for="(item,index) in configList" :key="index">
          <el-select v-if="item.type==='select'" v-model="filters[item.name]" clearable placeholder="车辆分类" style="width:100%" @change="search">
              <el-option :label="item.label" value="">{{item.label}}</el-option>
              <el-option v-for="(n,oindex) in item.data" :key="oindex" :label="n.label" :value="n.value"></el-option>
          </el-select>
            <el-input v-if="item.type==='input'" :placeholder="item.label" v-model="filters[item.name]"></el-input>
              <el-checkbox v-if="item.type==='checkbox'" v-model="filters[item.name]">{{item.label}}</el-checkbox>
      </el-col>
      <el-col :span="6">
          <el-button type="primary" @click="search">搜索</el-button>
            <slot name="button-add"></slot>
      </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    // list: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
    configList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      filters: this.trans()
    }
  },
  methods: {
    trans() {
      let obj = {}
      this.configList.forEach(item => {
        obj[item.name] = item.data
      })
      return obj
    },
    search() {
      this.$emit('searchCallback', this.filters)
    }
  }
}
</script>

<style lang="css">
</style>
