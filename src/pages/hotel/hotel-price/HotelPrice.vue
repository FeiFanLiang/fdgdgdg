<template lang="html">
  <div >
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
    :data="list"
    row-key="id"
      :expand-row-keys="expandRowKeys"
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
            <td class="ui-table-col-center w100 current " v-for="day in week" @click="priceOne(day.date)">
                <div class="dayname">{{day.date}}</div>
                <div class="price">CNY{{day.CNY}}</div>
                <div class="remain">余{{day.odd}}</div>
            </td>
        </tr>
      </template>
    </el-table-column>
    <el-table-column label="房型" prop="name" min-width="400"></el-table-column>
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
import {Menu} from 'components';
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export default {

  data(){
    return {
        stateText: '全部',
        chosenDate: '',
        expandRowKeys: [],
        list: [{
          id: '1',
            name: '单人间',
            isExpand: false
          },
          {
            id: '2',
            name: '双人(Double)',
            isExpand: false
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
        chosenDelete: ''
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
  methods: {
    expand(item) {
      item.isExpand = !item.isExpand;
    },
    pre() {
      let nowdays = new Date(this.chosenDate);
      let year = nowdays.getFullYear();
      let month = nowdays.getMonth();
      if (month == 0) {
        month = 12;
        year = year - 1;
      }
      if (month < 10) {
        month = '0' + month;
      }
      this.chosenDate = year + '-' + month + '-' + '01'; // 上个月的第一天
    },
    next() {
      let nowdays = new Date(this.chosenDate);
      let year = nowdays.getFullYear();
      let month = nowdays.getMonth();
      if (month == 11) {
        month = -1;
        year = year + 1;
      }
      month += 2;
      if (month < 10) {
        month = '0' + month;
      }
      this.chosenDate = year + '-' + month + '-' + '01'; // 上个月的第一天
    },
    showDelete(item) {
      this.chosenDelete = item;
    },
    addCycle() {
      this.cycle.push(Math.random().toString(36).substr(2));
    },
    deleteCycle(item, index) {
      this.cycle.splice(index, 1);
    },
    priceOne(date) {
      this.priceChangeForOne = true;
      this.value7=[new Date(date),new Date(date)];

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
  },
  mounted() {
    this.expandRowKeys.push(this.list[0].id)
    Date.prototype.Format = function(fmt) {
      let o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        S: this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          (this.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
      for (let k in o)
        if (new RegExp('(' + k + ')').test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            RegExp.$1.length == 1 ?
            o[k] :
            ('00' + o[k]).substr(('' + o[k]).length)
          );
      return fmt;
    };
    this.chosenDate = Date.now();
  },
  components: {
    Menu
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
