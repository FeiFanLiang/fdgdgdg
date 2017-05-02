<template lang="html">
  <el-dialog title="批量修改售卖价" v-model="priceChangeForMore" >
    <div v-for="n in cycle" style="position: relative;" @mouseover="showDelete(n)">

      <el-row>
          <el-col :span="23" :offset="1">生效时间  <el-date-picker
                  v-model="value7"
                  type="daterange"
                  align="left"
                  placeholder="选择日期范围"
                  >
                </el-date-picker></el-col>

    </el-row>

    <el-row>
    <el-col :span="2" :offset="1"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
    <el-col :span="21"><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
      <el-checkbox v-for="(city,index) in cities" :label="city">{{city}}</el-checkbox>
    </el-checkbox-group></el-col>
    </el-row>
    <i class="el-icon-delete" style="    position: absolute;
      top: 50%;
      right: 0;" @click="deleteCycle(n,index)" v-show="chosenDelete===n&&cycle.length>1"></i>
  </div>

  <el-row>
    <el-col :span="23" :offset="1"><el-button type="text" @click="addCycle" >添加周期</el-button></el-col>
    </el-row>

  <el-row>
  <el-col :span="2" :offset="1"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
  <el-col :span="21"><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
    <el-checkbox v-for="type in homeType" :label="type">{{type}}</el-checkbox>
  </el-checkbox-group></el-col>
  </el-row>
  <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
        show-overflow-tooltip
          prop="date"
          label="房型名称"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="name"
          label="产品名称"
          >
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="address"
          label="早餐">
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="address"
          label="最高采购价">
        </el-table-column>
        <el-table-column
        show-overflow-tooltip
          prop="address"
          label="售卖价">
        </el-table-column>
      </el-table>
  <div slot="footer" class="dialog-footer">
    <el-button @click="priceChangeForMore = false">取 消</el-button>
    <el-button type="primary" @click="priceChangeForMore = false">确 定</el-button>
  </div>
  </el-dialog>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
