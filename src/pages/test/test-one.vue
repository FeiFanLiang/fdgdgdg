<template lang="html">
<div class="">
  <el-button @click="priceOne('2017-01-01')">测试修改售卖价</el-button>
    <el-button @click="priceMore('2017-01-01')">测试批量修改售卖价</el-button>
<vue-event-calendar :events="demoEvents"></vue-event-calendar>
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

<div class="ui-table ui-table-bordered">
  <table>
    <thead>
      <tr>
        <th class="ui-table-col-center w170">房型名称</th>
        <th class="ui-table-col-center w170">产品名称</th>
        <th class="ui-table-col-center w100">早餐</th>
        <th class="ui-table-col-center w120">最高采购价
          <i class="ui-icon helper" title="所选有效日期段的最高采购价"></i>
        </th>
        <th class="ui-table-col-center w150">售卖价</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="2">
          <div style="margin-left: 5px;">标准房</div>
        </td>
        <td>
          预付无早（双床双人入住）
        </td>
        <td class="ui-table-col-center">
          无早
        </td>
        <!-- 今日最高采购价 -->
        <td class="ui-table-col-center">
          <span>
                                        --
                                        <a target="_blank" href="javascript:void(0)">录入</a>
                                        </span>
          <span class="helper" title="供应商:undefined" style="display: none;">0 CNY</span>
        </td>
        <td class="ui-table-col-center">
          <div class="oni-textbox">
            <div class="oni-textbox-input-wrap">
              <!--ms-if-->
              <input data-textbox-width="60" maxlength="8" avalonctrl="textbox223286466218" class="oni-textbox-input" style="width: 60px;"></div>
          </div>
          CNY
        </td>
      </tr>
      <tr>
        <!--ms-if-->
        <td>
          预付含早（双床双人入住）
        </td>
        <td class="ui-table-col-center">
          双早
        </td>
        <!-- 今日最高采购价 -->
        <td class="ui-table-col-center">
          <span>
                                        --
                                        <a target="_blank" href="javascript:void(0)">录入</a>
                                        </span>
          <span class="helper" title="供应商:undefined" style="display: none;">0 CNY</span>
        </td>
        <td class="ui-table-col-center">
          <div class="oni-textbox">
            <div class="oni-textbox-input-wrap">
              <!--ms-if-->
              <input data-textbox-width="60" maxlength="8" avalonctrl="textbox834999740479" class="oni-textbox-input" style="width: 60px;"></div>
          </div>
          CNY
        </td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td rowspan="2">
          <div style="margin-left: 5px;">单人房</div>
        </td>
        <td>
          预付无早
        </td>
        <td class="ui-table-col-center">
          无早
        </td>
        <!-- 今日最高采购价 -->
        <td class="ui-table-col-center">
          <span>
                                        --
                                        <a target="_blank" href="javascript:void(0)">录入</a>
                                        </span>
          <span class="helper" title="供应商:undefined" style="display: none;">0 CNY</span>
        </td>
        <td class="ui-table-col-center">
          <div class="oni-textbox">
            <div class="oni-textbox-input-wrap">
              <!--ms-if-->
              <input data-textbox-width="60" maxlength="8" avalonctrl="textbox904173609814" class="oni-textbox-input" style="width: 60px;"></div>
          </div>
          CNY
        </td>
      </tr>
      <tr>
        <!--ms-if-->
        <td>
          预付含早
        </td>
        <td class="ui-table-col-center">
          单早
        </td>
        <!-- 今日最高采购价 -->
        <td class="ui-table-col-center">
          <span>
                                        --
                                        <a target="_blank" href="javascript:void(0)">录入</a>
                                        </span>
          <span class="helper" title="供应商:undefined" style="display: none;">0 CNY</span>
        </td>
        <td class="ui-table-col-center">
          <div class="oni-textbox">
            <div class="oni-textbox-input-wrap">
              <!--ms-if-->
              <input data-textbox-width="60" maxlength="8" avalonctrl="textbox09802206752" class="oni-textbox-input" style="width: 60px;"></div>

          </div>
          CNY
        </td>
      </tr>
    </tbody>
  </table>
</div>


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
import Vue from 'vue';

import vueEventCalendar from '../../components/vue-event-calendar';

Vue.use(vueEventCalendar, { locale: 'pt-br' });
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export default {
  data() {
    return {
      demoEvents: [
        {
          date: '2016/12/15',
          title: 'eat',
          desc: 'longlonglong description'
        },
        {
          date: '2016/11/12',
          title: 'this is a title'
        }
      ],
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
      ],
      chosenDelete: ''
    };
  },
  methods: {
    showDelete(item) {
      this.chosenDelete = item;
    },
    addCycle() {
      this.cycle.push(Math.random().toString(36).substr(2));
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
