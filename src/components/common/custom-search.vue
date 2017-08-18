<template lang="html">
  <el-row :gutter="20" class="align-center">
      <template v-for="(item,index) in configList" >
        <el-col :span="4" v-if="item.type==='select'">
          <el-select  v-model="filters[item.name]" clearable  style="width:100%" @change="search">
              <el-option :label="item.label" value="">{{item.label}}</el-option>
              <el-option v-for="(n,oindex) in item.data" :key="oindex" :label="n.label" :value="n.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="4" v-if="item.type==='input'">
          <el-input  :placeholder="item.label" v-model="filters[item.name]"></el-input>
        </el-col>
          <el-col :span="4" v-if="item.type==='checkbox'">
                          <el-checkbox  v-model="filters[item.name]">{{item.label}}</el-checkbox>
          </el-col >
                <multiple @multipleChangeCallBack="multipleChangeCallBack" v-if="item.type==='multiple'" :list="item.data"></multiple>
      </template>
      <el-col :span="6">
          <el-button type="primary" @click="search">搜索</el-button>
            <slot name="button-add"></slot>
      </el-col>
  </el-row>
</template>

<script>
import multiple from './multiple-input.vue'
export default {
  props: {
    configList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    multiple
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
        if (item.type !== 'multiple') {
          obj[item.name] = item.data
        }
      })
      return obj
    },
    search() {
      this.$emit('searchCallback', this.filters)
    },
    multipleChangeCallBack(data) {
      this.filters = { ...this.filters, ...data }
    }
  }
}
</script>

<style lang="css">
</style>
