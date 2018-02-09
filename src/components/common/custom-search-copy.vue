<template lang="html">
  <el-row :gutter="24" class="align-center">
      <template v-for="(item,index) in configList">
        <el-form label-width="80px" style="margin-left:-20px;">
          <el-col :span="6" v-if="item.type==='input'">
            <el-form-item :label="item.label">
              <el-input v-model="filters[item.name]"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="item.type==='date'">
            <el-form-item :label="item.label">
              <el-date-picker v-model="filters[item.name]" type="date" style="width:100%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="item.type==='daterange'">
            <el-form-item :label="item.label">
              <el-date-picker v-model="filters[item.name]" type="daterange" style="width:105%"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="item.type==='checkbox'">
            <el-form-item :label="item.label">
              <el-checkbox v-model="filters[item.name]">{{item.label}}</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :span="6" v-if="item.type==='select'">
            <slot :name="item.name"></slot>
          </el-col>
        </el-form>
      </template>
      <el-col :span="24">
          <el-button type="primary" @click="search">搜索</el-button>
          <slot name="button-add"></slot>
      </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
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
      return obj || ''
    },
    search() {
      this.$emit('searchCallback', this.filters)
    },
  }
}
</script>

<style lang="css">
</style>
