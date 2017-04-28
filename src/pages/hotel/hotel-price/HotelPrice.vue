<template lang="html">
  <div >
  <Menu path="price"><el-button type="primary" @click="hotelroomAdd">创建</el-button></Menu >
    <el-row>
  <el-col :span="2"><dt class="legend" style="color:#FF4949;background-color:#FF4949"></dt><dd>关房</dd></el-col>
  <el-col :span="2"><dt class="legend"><i class="el-icon-caret-top" style="color:#13CE66"></i></dt><dd>允许超售</dd></el-col>
  <el-col :span="2"><dt class="legend" style="color:#D3DCE6;background-color:#D3DCE6"></dt><dd>不可售</dd></el-col>
  <el-col :span="3">
    <el-dropdown trigger="click" @command="toggleStatus" menu-align="start">
      <span class="el-dropdown-link">
        状态<i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>全部</el-dropdown-item>
        <el-dropdown-item>有效</el-dropdown-item>
        <el-dropdown-item>无效</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
</el-row>
<el-row :gutter="20">
  <el-col :span="3" >
    <el-dropdown trigger="click"  @command="priceMore('2017-01-01')">
      <el-button >批量修改价格
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="批量修改售卖价" >批量修改售卖价</el-dropdown-item>
        <el-dropdown-item command="批量修改采购价" >批量修改采购价</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
  <el-col :span="3" >
    <el-dropdown trigger="click" @command="toggleStatus">
      <el-button >售卖价
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="售卖价" disabled>售卖价</el-dropdown-item>
        <el-dropdown-item command="售卖价" class="smalltext" divided>售卖价</el-dropdown-item>
        <el-dropdown-item command="渠道价" disabled>渠道价</el-dropdown-item>
        <el-dropdown-item command="渠道价B" class="smalltext" divided>渠道价B</el-dropdown-item>
        <el-dropdown-item command="渠道价C" class="smalltext">渠道价C</el-dropdown-item>
        <el-dropdown-item command="采购价" disabled>采购价</el-dropdown-item>
        <el-dropdown-item command="采购价" class="smalltext" divided>采购价</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-col>
  <el-col :span="3" :offset="5">
    <el-dropdown trigger="click" @command="togglePeriod">
      <el-button >按周显示
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
       <el-dropdown-menu slot="dropdown">
         <el-dropdown-item command="按周显示">按周显示</el-dropdown-item>
         <el-dropdown-item command="按月显示">按月显示</el-dropdown-item>
       </el-dropdown-menu>
     </el-dropdown>
  </el-col>
  <el-col :span="10" >
    <el-button  icon="arrow-left" @click="pre">前一月</el-button>
    <el-date-picker class="mydate"
        v-model="chosenDate"
        type="date"
        placeholder="选择日期">
    </el-date-picker>
    <el-button  @click="next">后一月<i class="el-icon-arrow-right "></i></el-button>
  </el-col>
</el-row>
      <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand" label="周日">
      <template scope="props">
        <!-- <tr v-for="(week,index) in dayList" style="float: right;">
            <td class="ui-table-col-center w100 current " v-for="day in week" @click="priceOne(day.date)">
                <div class="dayname">{{day.date}}</div>
                <div class="price">CNY{{day.CNY}}</div>
                <div class="remain">余{{day.odd}}</div>
            </td>
        </tr> -->
        <tr v-for="(week,index) in dayList" style="float: right;">
            <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
                <div style="margin-left: 30px;">
                    标准房-预付无早（双床双人入住）
                    <span class="gray" style="display: none;">(无效)</span>
                </div>
            </td>
            <td class="ui-table-col-center w100 current " v-for="day in week" @click="priceOne(day.date)">
                <div class="dayname">{{day.date}}</div>
                <div class="price">CNY{{day.CNY}}</div>
                <div class="remain">余{{day.odd}}</div>
            </td>
        </tr>
        <tr v-for="(week,index) in dayList" style="float: right;">
            <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
                <div style="margin-left: 30px;">
                    标准房-预付有早（双床双人入住）
                    <span class="gray" style="display: none;">(无效)</span>
                </div>
            </td>
            <td class="ui-table-col-center w100 current " v-for="day in week" @click="editPrice(day)">
                <div class="dayname">{{day.date}}</div>
                <div class="price">CNY{{day.CNY}}</div>
                <div class="remain">余{{day.odd}}</div>
            </td>
        </tr>
      </template>
    </el-table-column>
    <el-table-column label="房型" prop="type" min-width="400"></el-table-column>
    <el-table-column label="周日" width="100"></el-table-column>
    <el-table-column label="周一" width="100"></el-table-column>
    <el-table-column label="周二" width="100"></el-table-column>
    <el-table-column label="周三" width="100"></el-table-column>
    <el-table-column label="周四" width="100"></el-table-column>
    <el-table-column label="周五" width="100"></el-table-column>
    <el-table-column label="周六" width="100"></el-table-column>
  </el-table>
  </div>
</template>

<script>
import chunk from 'lodash/chunk';
import {Menu,Calendar} from 'components'
export default {

  data(){
    return {
      chosenDate: '',
      tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          type: '单人间',
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          type: '双人间',
        }]
    }
  },
  computed:{
    calendar() {
      if (!this.chosenDate)
        return {
          curYear: '2017',
          curMonth: '4',
          curDay: '12'
        };
      let time1 = new Date(this.chosenDate).Format('yyyy-MM-dd');
      let arry = time1.split('-');
      return {
        curYear: arry[0],
        curMonth: arry[1],
        curDay: arry[2]
      };
    },
    dayList() {
      let firstDay = new Date(
        this.calendar.curYear + '/' + this.calendar.curMonth + '/01'
      );
      let startTimestamp = firstDay - 1000 * 60 * 60 * 24 * firstDay.getDay();
      let item, status, tempArr = [],
        tempItem;
      for (let i = 0; i < 42; i++) {
        item = new Date(startTimestamp + i * 1000 * 60 * 60 * 24);
        if (this.calendar.curMonth === item.getMonth()) {
          status = 1;
        } else {
          status = 0;
        }
        tempItem = {
          date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
          status: status,
          CNY:'100',
          odd:'3'
        };
        // this.events.forEach(event => {
        //   if (isEqualDateStr(event.date, tempItem.date)) {
        //     tempItem.title = event.title;
        //     tempItem.desc = event.desc || '';
        //   }
        // });
        tempArr.push(tempItem);
      }
      return chunk(tempArr, 7);
    }
  },
  components: {
    Menu,
    Calendar
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    console.dir(this.$route.params);
  }
};
</script>

<style lang="css">
.legend{
  display: inline;
    float: left;
    margin: 1px 3px 0 0;
    background-color: #fff;
    border: 1px solid #e1e1e1;
    height: 14px;
    overflow: hidden;
    text-align: center;
    width: 14px;
}
</style>
