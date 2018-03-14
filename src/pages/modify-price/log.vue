<template lang="html">
  <div class="modify-price">
   <el-row :gutter="20">
    <el-col :span="5">
        <el-input placeholder="请输入酒店ID" v-model="hotelId" ></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="search()">搜索</el-button>
    </el-col>
  </el-row>
    <el-table ref="multipleTable"  :data="logs" border tooltip-effect="dark" style="width: 100%" >
      <el-table-column prop="hotelName" label="酒店名称" width="120" show-overflow-tooltip>
      </el-table-column>
       <el-table-column prop="useTime" label="使用时间" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="roomName" label="房型名称" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="badType" label="床型" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="breakfastType" label="早餐" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="maxPerson" label="人数" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="price" label="当前价格" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="purchasePrice" label="底价" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="platPrice" label="平台最低价" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="isRelateMoran" label="是否关联蓦然" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="secondPrice" label="平台次低价" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="newPrice" label="计算后价格" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="priceDifference" label="差价(平台最低价-底价)" width="120" show-overflow-tooltip sortable>
      </el-table-column>
       <el-table-column prop="comparisonRule" label="比价规则" show-overflow-tooltip sortable width="120">
      </el-table-column>
      <el-table-column prop="logTime" label="比价时间" show-overflow-tooltip sortable width="120">
      </el-table-column>
      
    </el-table>
  </div>
</template>

<script>
import { spiderSettingApi } from 'api'
export default {
  data() {
    return {
      hotelId: '',
      logs: []
    }
  },
  methods: {
    async getLogs(hotelId) {
      const res = await spiderSettingApi.HGETALL(hotelId)
      const array = []
      for (let [key, value] of Object.entries(res.data)) {
        array.push(JSON.parse(value))
      }
      console.log(array)
      this.logs = array
    },
    async search() {
      if (!this.hotelId) return
      await this.getLogs(this.hotelId)
    },
     filterTag(value, row) {
        return row.isPriceComparison === value;
      }
  }
}
</script>

<style lang="less" >
.modify-price {
  .el-transfer-panel__body {
    height: 500px !important;
  }
  .el-transfer-panel__list {
    height: 470px !important;
  }
  .el-transfer-panel {
    width: 400px !important;
  }
}
</style>
