<template lang="html">
<div class="">
  <el-button @click="priceOne('2017-01-01')">测试修改售卖价</el-button>
    <el-button @click="priceMore('2017-01-01')">测试批量修改售卖价</el-button>

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
    </el-radio-group></el-col></el-row>

  <div slot="footer" class="dialog-footer">
    <el-button @click="priceChangeForOne = false">取 消</el-button>
    <el-button type="primary" @click="priceChangeForOne = false">确 定</el-button>
  </div>
</el-dialog>


<el-dialog title="批量修改售卖价" v-model="priceChangeForMore" >
  <div v-for="n in cycle" style="position: relative;">
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
    right: 0;" @click="deleteCycle(n,index)"></i>
</div>
<el-button type="text" @click="addCycle">添加周期</el-button>
<el-row>
<el-col :span="2" :offset="1"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
<el-col :span="21"><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
  <el-checkbox v-for="type in homeType" :label="type">{{type}}</el-checkbox>
</el-checkbox-group></el-col>
</el-row>
<el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="姓名"
      width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>住址: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag>{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row>  <el-col :span="23" :offset="1"><el-radio-group v-model="radio2">
    <el-radio :label="3">不变</el-radio>
    <el-radio :label="6">开房</el-radio>
    <el-radio :label="9">关房</el-radio>
  </el-radio-group></el-col></el-row>

<div slot="footer" class="dialog-footer">
  <el-button @click="priceChangeForMore = false">取 消</el-button>
  <el-button type="primary" @click="priceChangeForMore = false">确 定</el-button>
</div>
</el-dialog>
</div>
</template>

<script>
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export default {
  data() {
    return {
      cycle: ['one'],
      priceChangeForOne: false,
      priceChangeForMore: false,
      value7: '',
      checkAll: true,
      checkedCities: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      cities: cityOptions,
      homeType: ['标准房', '单人房'],
      isIndeterminate: true,
      radio2: 3,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    };
  },
  methods: {
    addCycle() {
      this.cycle.push('one');
    },
    deleteCycle(item, index) {
      this.cycle.splice(index, 1);
    },
    priceOne() {
      this.priceChangeForOne = true;
    },
    priceMore() {
      this.priceChangeForMore = true;
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<style lang="css">
</style>
