<template lang="html">
  <div class="l-workspace-body m-price">
      <div  >
          <div class="l-bar w960">
              <div class="left">
                  <div class="l-bar-item">
                      <div class="m-price-legend m-roomcontrol-legend">
                          <dl class="item">
                              <dt class="close"></dt>
                              <dd>关房</dd>
                          </dl>
                          <dl class="item">
                              <dt class="normal" @click=""><span class="oversale"><i class="el-icon-arrow-up"></i></span></dt>
                              <dd>允许超售</dd>
                          </dl>
                          <dl class="item">
                              <dt class="disable"></dt>
                              <dd>不可售</dd>
                          </dl>
                      </div>
                  </div>
                  <div class="l-bar-item">
                      <!-- <div class="l-bar-label w70">状态</div> -->
                      <div class="oni-dropdown" tabindex="0">
                        <el-dropdown trigger="click" @command="toggleStatus">
                          <span class="el-dropdown-link">{{stateText}}
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                          </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="全部">全部</el-dropdown-item>
                            <el-dropdown-item command="有效">有效</el-dropdown-item>
                            <el-dropdown-item command="无效">无效</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                  </div>
              </div>
              <div class="right"></div>
          </div>
        <div class="l-bar w960">
            <div class="left">
                <div class="l-bar-item">
                      <el-dropdown trigger="click"  @command="priceMore('2017-01-01')">
                        <el-button type="primary">批量修改价格
                          <i class="el-icon-caret-bottom el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="批量修改售卖价" >批量修改售卖价</el-dropdown-item>
                          <el-dropdown-item command="批量修改采购价" >批量修改采购价</el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                  </div>
                <div class="l-bar-item">
                    <el-dropdown trigger="click" @command="toggleStatus">
                      <el-button type="primary">售卖价
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
                  </div>
            </div>
            <div class="right">
                <div class="mydate">
                   <el-dropdown trigger="click" @command="togglePeriod">
                      <span class="el-dropdown-link">按周显示
                        <i class="el-icon-caret-bottom el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="按周显示">按周显示</el-dropdown-item>
                        <el-dropdown-item command="按月显示">按月显示</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </div>
                <el-button type="primary" icon="arrow-left" @click="pre">前一月</el-button>
                <el-date-picker class="mydate"
                    v-model="chosenDate"
                    type="date"
                    placeholder="选择日期">
                </el-date-picker>
                <el-button type="primary" @click="next">后一月<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            </div>
          </div>
      </div>
      <div class="l-section w960">
          <div class="ui-table ui-table-bordered m-price-sheet" >
            <div class="ui-table-header">
                <table>
                    <tbody>
                    <tr class="ui-table-dark">
                        <th class="ui-table-col-left">房型/可用房型名称</th>
                        <th class="ui-table-col-center w80">周日</th>
                        <th class="ui-table-col-center w80">周一</th>
                        <th class="ui-table-col-center w80">周二</th>
                        <th class="ui-table-col-center w80">周三</th>
                        <th class="ui-table-col-center w80">周四</th>
                        <th class="ui-table-col-center w80 red">周五</th>
                        <th class="ui-table-col-center w80 red">周六</th>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div class="ui-table-body m-roomcontrol-sheet">
                <table>
                    <tbody v-for="n in list">
                        <tr @click="expand(n)">
                            <td style="background: #f8f8f8;border-right-color: #f8f8f8;border-top:2px solid #2eb5e7;" colspan="9">
                                <span >
                                    <i :class="n.isExpand?'el-icon-arrow-up':'el-icon-arrow-down'" style="margin-right:10px"></i>{{n.name}}
                                </span>
                            </td>
                        </tr>
                        <template v-if="n.isExpand">
                          <tr v-for="(week,index) in dayList" >
                              <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
                                  <div style="margin-left: 30px;">
                                      标准房-预付无早（双床双人入住）
                                      <span class="gray" style="display: none;">(无效)</span>
                                  </div>
                              </td>
                              <td class="ui-table-col-center w80 current " v-for="day in week" @click="priceOne(day.date)">
                                  <div class="dayname">{{day.date}}</div>
                                  <div class="price">CNY{{day.CNY}}</div>
                                  <div class="remain">余{{day.odd}}</div>
                              </td>
                          </tr>
                          <tr v-for="(week,index) in dayList" >
                              <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
                                  <div style="margin-left: 30px;">
                                      标准房-预付有早（双床双人入住）
                                      <span class="gray" style="display: none;">(无效)</span>
                                  </div>
                              </td>
                              <td class="ui-table-col-center w80 current " v-for="day in week" @click="priceOne(day.date)">
                                  <div class="dayname">{{day.date}}</div>
                                  <div class="price">CNY{{day.CNY}}</div>
                                  <div class="remain">余{{day.odd}}</div>
                              </td>
                          </tr>
                        </template>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      <div class="l-secction w960">无效：表示该产品不可售卖</div>
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
        <el-checkbox v-for="(city,index) in cities" :key="index" :label="city">{{city}}</el-checkbox>
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
        <el-checkbox v-for="(city,index) in cities" :label="city" :key="index">{{city}}</el-checkbox>
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
      <el-checkbox v-for="(type,index) in homeType" :key="index" :label="type">{{type}}</el-checkbox>
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
  </div>
</template>

<script>
import chunk from 'lodash/chunk';
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export default {
  data() {
    return {
      stateText: '全部',
      chosenDate: '',
      list: [{
          name: '单人间',
          isExpand: false
        },
        {
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
    };
  },
  computed: {
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
    editPrice(day) {
      alert(JSON.stringify(day));
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
  }
};
</script>

<style lang="scss">
.smalltext {
    font-size: 10px;
}
.mydate {
    display: inline-block;
    margin: 0 10px;
}
.listp {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    padding: 0 !important;
}
.listc {
    box-sizing: border-box;
    -ms-flex: 0 0 14.28%;
    flex: 0 0 14.28%;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
    text-align: center;
    height: 85px;
    padding-top: 10px;
    line-height: 20px;
    font-size: 10px;
}
html {
    background: #fff none;
    color: #333;
    font: normal 12px/1.5 tahoma,arial,"hiragino sans gb",simsun,sans-serif;
    -moz-font-feature-settings: "liga","kern";
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
}
body,
dd,
dl,
form,
p,
pre {
    margin: 0;
}
table {
    border-collapse: collapse;
    border-spacing: 0;
}
ol,
ul {
    list-style: none;
    margin: 0;
    padding: 0;
}
em,
i {
    font-style: normal;
}
.block {
    display: block;
}
.inline {
    display: inline;
}
.inlineblock {
    display: inline-block;
    *display: inline;
    vertical-align: middle;
    *zoom: 1;
}
.left {
    display: inline;
    float: left;
}
.right {
    display: inline;
    float: right;
}
.w960 {
    width: 960px;
}

.ui-table table {
    width: 100%;
}
.ui-table td,
.ui-table th {
    border-bottom: 1px solid #ececec;
    font-weight: 400;
    padding: 11px 5px;
}
.ui-table th {
    color: #9e9e9e;
    cursor: default;
}

.ui-table-dark th {
    background-color: #353a47;
    border-bottom: 0 none;
    color: #fff;
}

.ui-table-bordered table,
.ui-table-bordered td,
.ui-table-bordered th {
    border: 1px solid #ececec;
}
.ui-table-bordered .ui-table-header {
    margin-bottom: -1px;
}
.ui-table-bordered .ui-table-dark th {
    border: 1px solid #353a47;
}
.ui-table-bordered .ui-table-child .ui-table {
    margin: 0 -1px;
    position: relative;
    top: -1px;
}

.l-bar {
    zoom: 1;
    font-size: 0;
    margin-bottom: 20px;
}
.l-bar:after {
    clear: both;
    content: "\0020";
    display: block;
    height: 0;
    overflow: hidden;
}
.l-bar-item {
    display: inline-block;
    *display: inline;
    vertical-align: middle;
    *zoom: 1;
    font-size: 12px;
    margin-right: 5px;
}

.l-bar-label {
    display: inline-block;
    *display: inline;
    vertical-align: middle;
    *zoom: 1;
    margin-right: 1px;
    *margin-right: 5px;
    text-align: right;
    white-space: nowrap;
}

.m-roomcontrol-legend {
    zoom: 1;
}
.m-roomcontrol-legend:after {
    clear: both;
    content: "\0020";
    display: block;
    height: 0;
    overflow: hidden;
}
.m-roomcontrol-legend .item {
    display: inline;
    float: left;
    margin-right: 15px;
}
.m-roomcontrol-legend dt {
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
.m-roomcontrol-legend dt.close {
    background-color: #ff7474;
    border-color: #ff7474;
}

.m-roomcontrol-legend dt.disable {
    background-color: #e0e0e0;
    border-color: #e0e0e0;
}

.m-roomcontrol-legend dd {
    display: inline;
    float: left;
}
.m-roomcontrol-legend .oversale {
    color: #52be7f;
}
.m-roomcontrol-legend .oversale .ui-icon {
    font-size: 12px;
    position: relative;
    top: -2px;
}

.m-roomcontrol-sheet .disable {
    background-color: #e0e0e0;
}

.m-sysbar .userinfo .lang {
    display: inline;
    float: left;
    border-left: 1px solid #e0e0e0;
    padding-left: 20px;
}
.m-sysbar .userinfo .info {
    display: inline;
    float: left;
    border-left: 1px solid #e0e0e0;
    margin-left: 20px;
}

.m-price-sheet .current {
    background-color: #fbfbfb;
    cursor: pointer;
    vertical-align: top;
}
</style>
