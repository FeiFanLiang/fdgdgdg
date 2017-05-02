
<template lang="html">
  <el-dialog title="修改售卖价" v-model="priceChangeForOne" >

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
    <el-checkbox v-for="city in cities" :label="city">{{city}}</el-checkbox>
  </el-checkbox-group></el-col>
  </el-row>

  <el-row>
    <el-col :span="12" :offset="1"><el-input placeholder="最高采购价" v-model="input3">
   <template slot="prepend">最高采购价</template>
   <template slot="append">CNY</template>
  </el-input></el-col>
   </el-row>

   <el-row>
       <el-col :span="12" :offset="1"><el-input placeholder="售卖价" v-model="input3">
      <template slot="prepend">售卖价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
      <template slot="append">CNY</template>
      </el-input></el-col>
    </el-row>

    <el-row>  <el-col :span="23" :offset="1"><el-radio-group v-model="radio2">
      <el-radio :label="3">不变</el-radio>
      <el-radio :label="6">开房</el-radio>
      <el-radio :label="9">关房</el-radio>
    </el-radio-group></el-col>
  </el-row>

  <div slot="footer" class="dialog-footer">
    <el-button @click="priceChangeForOne = false">取 消</el-button>
    <el-button type="primary" @click="priceChangeForOne = false">确 定</el-button>
  </div>

  </el-dialog>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
