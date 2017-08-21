
<template lang="html">
  <div>
    <!-- <HotelTopMenu path="price"></HotelTopMenu > -->
    <el-row>
      <el-col :span="2"><dt class="legend" style="color:#FF4949;background-color:#FF4949"></dt>
        <dd>关房</dd>
      </el-col>
      <el-col :span="2"><dt class="legend"><i class="el-icon-caret-top" style="color:#13CE66"></i></dt>
        <dd>允许超售</dd>
      </el-col>
      <el-col :span="2"><dt class="legend" style="color:#D3DCE6;background-color:#D3DCE6"></dt>
        <dd>不可售</dd>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3">
        <el-dropdown trigger="click" @command="priceMore('2017-01-01')">
          <el-button>批量修改价格
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="批量修改售卖价">批量修改售卖价</el-dropdown-item>
            <el-dropdown-item command="批量修改采购价">批量修改采购价</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="3">
        <el-select v-model="value7" placeholder="请选择">
          <el-option-group v-for="(group,gIndex) in options3" :key="group.label" :label="group.label">
            <el-option v-for="(item,index) in group.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-option-group>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select v-model="status" placeholder="请选择状态">
          <el-option v-for="item in [{value:'0',label:'全部'},{value:'1',label:'有效'},{value:'2',label:'无效'}]" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="3" :offset="2">
        <el-select v-model="periodType" placeholder="请选择">
          <el-option v-for="item in [{label:'按周显示',value:'week'},{label:'按月显示',value:'month'}]" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="10">
        <el-button icon="arrow-left" @click="pre">前一{{periodType==='week'?'周':'月'}}</el-button>
        <el-date-picker class="mydate" v-model="chosenDate" type="date" placeholder="选择日期">
        </el-date-picker>
        <el-button @click="next">后一{{periodType==='week'?'周':'月'}}<i class="el-icon-arrow-right "></i></el-button>
      </el-col>
    </el-row>
    <el-table :data="roomList" row-key="id" :expand-row-keys="expandRowKeys" style="width: 100%">
      <el-table-column type="expand" label="周日">
        <template scope="props">
  <!-- <tr v-for="(month,index) in props.row.SonRooms" style="float: right;" v-if="periodType==='month'">
  <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
  <div style="margin-left: 30px;">{{month.SonRoomName}}
  <span class="gray" style="display: none;">(无效)</span>
  </div>
  </td>
  <div v-for="(week,index) in month.timeDate">
  <td class="ui-table-col-center w100 current mytd" v-for="(day,index) in month.timeDate" @click="priceOne(day.date)">
  <div class="dayname">{{day.date}}</div>
  <div class="price">CNY{{day.CNY}}</div>
  <div class="remain">余{{day.Count}}</div>
  </td>
  </div>
  </tr> -->
  <tr v-for="(week,index) in monthList" style="float: right;" v-if="periodType==='month'">
  <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
  <div style="margin-left: 30px;">
  标准房-预付无早（双床双人入住）
  <span class="gray" style="display: none;">(无效)</span>
  </div>
  </td>
  <td class="ui-table-col-center w100 current mytd" v-for="day in week" @click="priceOne(day.date)">
  <div class="dayname">{{props.row.SonRooms[0].timeDate[day.date]}}</div>
  <div class="price">CNY{{day.CNY}}</div>
  <div class="remain">余{{day.odd}}</div>
  </td>
  </tr>
  <tr v-for="(week,index) in monthList" style="float: right;" v-if="periodType==='month'">
  <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0">
  <div style="margin-left: 30px;">
  标准房-预付有早（双床双人入住）
  <span class="gray" style="display: none;">(无效)</span>
  </div>
  </td>
  <td class="ui-table-col-center w100 current mytd" v-for="day in week" @click="priceOne(day.date)">
  <div class="dayname">{{day.date}}</div>
  <div class="price">CNY{{day.CNY}}</div>
  <div class="remain">余{{day.odd}}</div>
  </td>
  </tr>
  <tr style="float: right;" v-if="periodType==='week'">
  <td class="ui-table-col-left" colspan="1" rowspan="6" >
  <div style="margin-left: 30px;">
  标准房-预付无早（双床双人入住）
  <span class="gray" style="display: none;">(无效)</span>
  </div>
  </td>
  <td class="ui-table-col-center w100 current mytd" v-for="day in weekList" @click="priceOne(day.date)">
  <div class="dayname">{{day.date}}</div>
  <div class="price">CNY{{day.CNY}}</div>
  <div class="remain">余{{day.odd}}</div>
  </td>
  </tr>
  <tr style="float: right;" v-if="periodType==='week'">
  <td class="ui-table-col-left" colspan="1" rowspan="6" >
  <div style="margin-left: 30px;">
  标准房-预付有早（双床双人入住）
  <span class="gray" style="display: none;">(无效)</span>
  </div>
  </td>
  <td class="ui-table-col-center w100 current mytd" v-for="day in weekList" @click="priceOne(day.date)">
  <div class="dayname">{{day.date}}</div>
  <div class="price">CNY{{day.CNY}}</div>
  <div class="remain">余{{day.odd}}</div>
  </td>
  </tr>
</template>
</el-table-column>
<el-table-column label="房型" prop="RoomName" min-width="400"></el-table-column>
<el-table-column label="周日" width="100"></el-table-column>
<el-table-column label="周一" width="100"></el-table-column>
<el-table-column label="周二" width="100"></el-table-column>
<el-table-column label="周三" width="100"></el-table-column>
<el-table-column label="周四" width="100"></el-table-column>
<el-table-column label="周五" width="100"></el-table-column>
<el-table-column label="周六" width="100"></el-table-column>
</el-table>
<el-dialog title="修改售卖价" v-model="priceChangeForOne" >
<el-row>
<el-col :span="23" :offset="1">生效时间 <el-date-picker
v-model="value7"
type="daterange"
align="left"
placeholder="选择日期范围"
>
</el-date-picker></el-col>
</el-row>
<el-row style="margin-top:20px;">
<el-col :span="2" :offset="1"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
<el-col :span="21"><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
<el-checkbox v-for="(city,index) in cities" :key="index" :label="city">{{city}}</el-checkbox>
</el-checkbox-group></el-col>
</el-row>
<el-row style="margin-top:20px;">
<el-col :span="12" :offset="1"><el-input placeholder="最高采购价" v-model="input3">
<template slot="prepend">
   最高采购价
</template>
<template slot="append">
   CNY
</template>
</el-input></el-col>
</el-row>
<el-row style="margin-top:20px;">
<el-col :span="12" :offset="1"><el-input placeholder="售卖价" v-model="input3">
<template slot="prepend">
   售卖价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</template>
<template slot="append">
   CNY
</template>
</el-input></el-col>
</el-row>
<el-row style="margin-top:20px;">
<el-col :span="23" :offset="1"><el-radio-group v-model="radio2">
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
<el-col :span="23" :offset="1">生效时间
<el-date-picker
v-model="value7"
type="daterange"
align="left"
placeholder="选择日期范围"
>
</el-date-picker>
</el-col>
</el-row>
<el-row>
<el-col :span="2" :offset="1"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
<el-col :span="21"><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
<el-checkbox v-for="(city,index) in cities" :key="index" :label="city">{{city}}</el-checkbox>
</el-checkbox-group></el-col>
</el-row>
<i class="el-icon-delete" style=" position: absolute;
top: 50%;
right: 0;" @click="deleteCycle(n,index)" v-show="chosenDelete===n&&cycle.length>1"></i>
</div>
<el-row>
<el-col :span="23" :offset="1"><el-button type="text" @click="addCycle" >添加周期</el-button></el-col>
</el-row>
<el-row>
<el-col :span="2" :offset="1"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox></el-col>
<el-col :span="21"><el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
<el-checkbox v-for="(type,index) in homeType" :key="index" :label="type" >{{type}}</el-checkbox>
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
</div>
</template>

<script>
  import {
    roomStatPriceApi
  } from 'api'
  import chunk from 'lodash/chunk'
  import {
    HotelTopMenu
  } from 'components'
  const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  export default {
    components: {
      HotelTopMenu
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      console.dir(this.$route.params)
      this.expandRowKeys.push(this.list[0].id)
      this.chosenDate = Date.now()
      this.fetchData()
    },
    data() {
      return {
        roomList: [],
        roomInfoList: [],
        status: '1',
        input3: '',
        tableData: [{
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
        checkedCities: cityOptions,
        cities: cityOptions,
        homeType: ['标准房', '单人房'],
        isIndeterminate: true,
        radio2: 3,
        chosenDelete: '',
        periodType: 'month',
        options3: [{
            label: '售卖价',
            options: [{
              value: 'Shanghai',
              label: '售卖价'
            }]
          },
          {
            label: '渠道价',
            options: [{
                value: 'Chengdu',
                label: '去哪儿B'
              },
              {
                value: 'Shenzhen',
                label: '去哪儿C'
              }
            ]
          },
          {
            label: '采购价',
            options: [{
              value: 'Beijing',
              label: '采购价'
            }]
          }
        ]
      }
    },
    computed: {
      calendar() {
        if (!this.chosenDate) return
        let time1 = new Date(this.chosenDate).Format('yyyy-MM-dd')
        let arry = time1.split('-')
        return {
          curYear: arry[0],
          curMonth: arry[1],
          curDay: arry[2]
        }
      },
      monthList() {
        if (!this.calendar) return
        let firstDay = new Date(
          this.calendar.curYear + '/' + this.calendar.curMonth + '/01'
        )
        let startTimestamp = firstDay - 1000 * 60 * 60 * 24 * firstDay.getDay()
        let item,
          status,
          tempArr = [],
          tempItem
        for (let i = 0; i < 42; i++) {
          item = new Date(startTimestamp + i * 1000 * 60 * 60 * 24)
          if (this.calendar.curMonth === item.getMonth()) {
            status = 1
          } else {
            status = 0
          }
          tempItem = {
            // date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
            date: item.toLocaleDateString(),
            status: status,
            CNY: '100',
            odd: '3'
          }
          // this.events.forEach(event => {
          // if (isEqualDateStr(event.date, tempItem.date)) {
          // tempItem.title = event.title;
          // tempItem.desc = event.desc || '';
          // }
          // });
          tempArr.push(tempItem)
        }
        return chunk(tempArr, 7)
      },
      weekList() {
        const weekList = []
        const now = new Date(this.chosenDate)
        const nowTime = now.getTime()
        const day = now.getDay()
        const oneDayTime = 24 * 60 * 60 * 1000
        const SundayTime = nowTime + (6 - day) * oneDayTime
        new Array(7).fill(1).forEach((item, index) => {
          weekList.unshift({
            date: new Date(SundayTime - index * oneDayTime).toLocaleDateString(),
            status: false,
            CNY: '100',
            odd: '3'
          })
        })
        return weekList
      }
    },
    watch: {
      chosenDate: async function() {
        const form = {
          SonRooms: [1],
          BeginDate: '2017-07-01',
          EndDate: '2017-07-31'
        }
        // this.roomInfoList = []
        const res = await roomStatPriceApi.getPriceList(form)
        this.roomInfoList = res.data
        // for(let i in res.data.Sonrooms){
        // console.warn(i,res.data.Sonrooms[i])
        // }
        this.roomList[0].SonRooms.forEach((item, index) => {
          item.timeDate = this.roomInfoList.Sonrooms[String(item.SonRoomID)].STSes
          // item.timeDate = []
          // for (let i in this.roomInfoList.Sonrooms[String(item.SonRoomID)]
          // .STSes) {
          // this.roomInfoList.Sonrooms[String(item.SonRoomID)].STSes[i].date = i
          // item.timeDate.push(
          // this.roomInfoList.Sonrooms[String(item.SonRoomID)].STSes[i]
          // )
          // }
          // item.timeDate = chunk(item.timeDate, 7)
        })
      }
    },
    methods: {
      async fetchData() {
        const _self = this
        const res = await roomStatPriceApi.getSonRoomList('2')
        _self.roomList = res.data
        console.dir(_self.roomList[0].SonRooms)
      },
      expand(item) {
        item.isExpand = !item.isExpand
      },
      pre() {
        let nowdays = new Date(this.chosenDate)
        if (this.periodType === 'week') {
          const oneDayTime = 24 * 60 * 60 * 1000
          this.chosenDate = new Date(+nowdays - 7 * oneDayTime).toLocaleDateString()
        }
        if (this.periodType === 'month') {
          let year = nowdays.getFullYear()
          let month = b.getMonth()
          if (month == 0) {
            month = 12
            year = year - 1
          }
          if (month < 10) {
            month = '0' + month
          }
          this.chosenDate = year + '-' + month + '-' + '01' // 上个月的第一天
        }
      },
      next() {
        let nowdays = new Date(this.chosenDate)
        if (this.periodType === 'week') {
          const oneDayTime = 24 * 60 * 60 * 1000
          this.chosenDate = new Date(+nowdays + 7 * oneDayTime).toLocaleDateString()
        }
        if (this.periodType === 'month') {
          let year = nowdays.getFullYear()
          let month = nowdays.getMonth()
          if (month == 11) {
            month = -1
            year = year + 1
          }
          month += 2
          if (month < 10) {
            month = '0' + month
          }
          this.chosenDate = year + '-' + month + '-' + '01' // 上个月的第一天
        }
      },
      showDelete(item) {
        this.chosenDelete = item
      },
      addCycle() {
        this.cycle.push(Math.random().toString(36).substr(2))
      },
      deleteCycle(item, index) {
        this.cycle.splice(index, 1)
      },
      priceOne(date) {
        this.priceChangeForOne = true
        this.value7 = [new Date(date), new Date(date)]
      },
      priceMore() {
        this.priceChangeForMore = true
      },
      handleCheckAllChange(event) {
        this.checkedCities = event.target.checked ? cityOptions : []
        this.isIndeterminate = false
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.cities.length
        this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cities.length
      }
    }
  }
</script>

<style lang="css" scoped>
  .legend {
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
  .ui-table-col-center {
    background-color: #fbfbfb;
    cursor: pointer;
    vertical-align: top;
    border: 1px solid #ececec;
  }
  .mytd {
    width: 100px;
    height: 100px;
    background-color: #c8e4ec;
    padding: 10px;
  }
</style>
