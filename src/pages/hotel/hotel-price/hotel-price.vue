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
    <el-table :data="roomList" row-key="id" :default-expand-all="true" :expand-row-keys="expandRowKeys" style="width: 100%">
      <el-table-column type="expand" label="周日">
        <template scope="props">
        <template  v-for="sonRoom in props.row.SonRooms" >
          <table style="width: 100%;">
            <tr v-for="(week,index) in monthListChunk" class="column_tr" v-if="periodType==='month'">
            <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0" style="width:12%;">
            <div style="margin-left: 30px;">
            {{sonRoom.SonRoomName}}
            <!-- <span class="gray" style="display: none;">(无效)</span> -->
            </div>
            </td>
            <td class="ui-table-col-center w100 current mytd" v-for="day in week" @click="priceOne(sonRoom,day.date)">
            <div class="dayname">{{day.date}}</div>
            <div class="price">底价￥{{price(sonRoom,day.date)}}</div>
            <div class="price">飞猪￥{{otherPrice('飞猪',sonRoom,day.date)}}</div>
            <div class="price">去哪￥{{otherPrice('去哪',sonRoom,day.date)}}</div>
            <div class="price">携程￥{{otherPrice('携程',sonRoom,day.date)}}</div>
            <div class="price">全日空￥{{otherPrice('全日空',sonRoom,day.date)}}</div>
            <div class="remain">余{{count(sonRoom,day.date)}}</div>
            </td>
            </tr>
          </table>
          <table style="width: 100%;">
              <tr class="column_tr" v-if="periodType==='week'">
              <td class="ui-table-col-left" colspan="1" rowspan="6" style="width:12%;">
              <div style="margin-left: 30px;">
                {{sonRoom.SonRoomName}}
              <!-- <span class="gray" style="display: none;">(无效)</span> -->
              </div>
              </td>
              <td class="ui-table-col-center w100 current mytd" v-for="day in weekList" @click="priceOne(sonRoom,day.date)">
                <div class="dayname">{{day.date}}</div>

                <div class="price">￥{{price(sonRoom,day.date)}}</div>
                <div class="remain">余{{count(sonRoom,day.date)}}</div>
              </td>
              </tr>
          </table >
        </template>
        </template>
      </el-table-column>
      <el-table-column label="房型" prop="RoomName" min-width="300"></el-table-column>
      <el-table-column label="周日" width="120"></el-table-column>
      <el-table-column label="周一" width="120"></el-table-column>
      <el-table-column label="周二" width="120"></el-table-column>
      <el-table-column label="周三" width="120"></el-table-column>
      <el-table-column label="周四" width="120"></el-table-column>
      <el-table-column label="周五" width="120"></el-table-column>
      <el-table-column label="周六" width="120"></el-table-column>
    </el-table>
    <el-dialog title="" v-model="priceChangeForOne">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">

    <el-tab-pane label="修改售卖价" name="price">
      <el-row>
        <el-col :span="23" :offset="1">生效时间
          <el-date-picker v-model="priceForm.time" type="daterange" align="left" placeholder="选择日期范围">
          </el-date-picker>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px;" v-for="(item,index) in priceForm.price" :key="index">
        <el-col :span="12" :offset="1">
          <el-input placeholder="售卖价" v-model="priceForm.price[index].price">
            <template slot="prepend">
               {{item.title}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </template>
            <template slot="append">
               ￥
            </template>
          </el-input>
        </el-col>
        <el-col :span="10" :offset="1" v-if="index!==0">
          <el-radio class="radio" v-model="priceForm.price[index].stat" :label="0">自动更新</el-radio>
          <el-radio class="radio" v-model="priceForm.price[index].stat" :label="1">人工维护</el-radio>
          <el-radio class="radio" v-model="priceForm.price[index].stat" :label="2">关房</el-radio>
        </el-col>
      </el-row>

    </el-tab-pane>
    <el-tab-pane label="修改房间状态" name="state">
      <el-form ref="form" :model="stateForm" label-width="80px">
        <el-form-item label="生效时间">
      <el-col >
        <el-date-picker v-model="stateForm.date" type="daterange" align="left" placeholder="选择日期范围">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="和否开房">
      <el-radio-group v-model="stateForm.isOpen">
        <el-radio-button :label="true">开房</el-radio-button>
        <el-radio-button :label="false">关房</el-radio-button>
      </el-radio-group>
  </el-form-item>
  <!-- <el-form-item label="房间类型">
    <el-radio-group v-model="stateForm.roomType">
      <el-radio-button :label="0">物理房型</el-radio-button>
      <el-radio-button :label="1">子房型</el-radio-button>
    </el-radio-group>
  </el-form-item> -->
  <!-- <el-form-item label="获取渠道">
    <el-radio-group v-model="stateForm.updateChannel">
      <el-radio-button :label="0">机器抓取</el-radio-button>
      <el-radio-button :label="1">人工更改</el-radio-button>
    </el-radio-group>
  </el-form-item> -->
  <el-form-item label="剩余数量">
     <el-input-number v-model="stateForm.count"  :min="1" ></el-input-number>
  </el-form-item>
        </el-form>
    </el-tab-pane>
  </el-tabs>
  <div slot="footer" class="dialog-footer">
    <el-button @click="priceChangeForOne = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
    </el-dialog>
  </div>
</template>

<script>
import { roomStatPriceApi, hotelThreePlatInfoApi } from 'api'
import chunk from 'lodash/chunk'
import { HotelTopMenu } from 'components'
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  components: {
    HotelTopMenu
  },

  created() {
    const _self = this
    _self.stateForm.hotelId = _self.$route.params.ID
    _self.stateForm.hotelId = 2
    _self.chosenDate = Date.now()
    _self.fetchData()
    _self.getHotelThreePlatInfoList()
  },
  data() {
    return {
      activeName: 'price',
      platInfoList: {},
      roomList: [],
      roomInfoList: [],
      roomId: '',
      stateForm: {
        hotelId: '',
        roomId: '',
        sonRoomId: '',
        roomType: 1,
        date: '',
        count: '',
        isOpen: '',
        updateChannel: 0
      },
      priceForm: {
        sonRoomId: '',
        time: '',
        price: [
          {
            title: '最高采购价',
            id: -1,
            price: ''
          },
          {
            title: '飞猪',
            id: 0,
            price: '',
            stat: 0
          },
          {
            title: '携程',
            id: 1,
            price: '',
            stat: 0
          },
          {
            title: '去哪',
            id: 2,
            price: '',
            stat: 0
          },
          {
            title: '全日空',
            id: 3,
            price: '',
            stat: 0
          }
        ]
      },
      status: '1',
      chosenDate: '',
      expandRowKeys: [0],
      value7: '',
      priceChangeForOne: false,
      checkAll: true,
      checkedCities: cityOptions,
      cities: cityOptions,
      isIndeterminate: true,
      radio2: 3,
      periodType: 'month',
      options3: [
        {
          label: '售卖价',
          options: [
            {
              value: 'Shanghai',
              label: '售卖价'
            }
          ]
        },
        {
          label: '渠道价',
          options: [
            {
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
          options: [
            {
              value: 'Beijing',
              label: '采购价'
            }
          ]
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
      const _self = this
      if (!_self.calendar) return
      let firstDay = new Date(
        _self.calendar.curYear + '/' + _self.calendar.curMonth + '/01'
      )
      let startTimestamp = firstDay - 1000 * 60 * 60 * 24 * firstDay.getDay()
      let item,
        status,
        tempArr = [],
        tempItem
      for (let i = 0; i < 42; i++) {
        item = new Date(startTimestamp + i * 1000 * 60 * 60 * 24)
        if (_self.calendar.curMonth === item.getMonth()) {
          status = 1
        } else {
          status = 0
        }
        tempItem = {
          // date: `${item.getFullYear()}/${item.getMonth() + 1}/${item.getDate()}`,
          date: item.toLocaleDateString(),
          status: status,
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
      return tempArr
    },
    monthListChunk() {
      return chunk(this.monthList, 7)
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
          odd: '3'
        })
      })
      return weekList
    },
    startAndEndDay() {
      const _self = this
      if (
        !_self.monthList ||
        !_self.monthList.length ||
        !_self.weekList ||
        !_self.weekList.length
      ) {
        return
      }
      let list = []
      if (_self.periodType === 'month') {
        list = _self.monthList
      }
      if (_self.periodType === 'week') {
        list = _self.weekList
      }
      return [list[0], list[list.length - 1]]
    }
  },
  watch: {
    startAndEndDay() {
      this.getPriceList()
    }
  },
  methods: {
    handleTabClick(tab) {
      this.activeName = tab.name
    },
    async getPriceList() {
      const _self = this
      if (!_self.startAndEndDay || !_self.startAndEndDay.length) {
        return
      }
      const form = {
        SonRooms: [1],
        BeginDate: _self.startAndEndDay[0].date,
        EndDate: _self.startAndEndDay[1].date
      }
      // _self.roomInfoList = []
      const res = await roomStatPriceApi.getPriceList(form)
      _self.roomInfoList = res.data
      // for(let i in res.data.Sonrooms){
      // console.warn(i,res.data.Sonrooms[i])
      // }
      const roomList = [..._self.roomList]
      roomList[0].SonRooms.forEach((item, index) => {
        item.timeDate =
          _self.roomInfoList.Sonrooms[String(item.SonRoomID)].STSes
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
      // console.log(SonRooms)
      this.roomList = roomList
    },
    price(item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('SonRoomPurchasePrice') &&
        item.timeDate[date].SonRoomPurchasePrice.hasOwnProperty('Price')
      ) {
        return item.timeDate[date].SonRoomPurchasePrice.Price
      }

      return ''
    },
    otherPrice(type, item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('salePrice') &&
        Array.isArray(item.timeDate[date].salePrice) &&
        item.timeDate[date].salePrice.length > 0
      ) {
        let value = item.timeDate[date].salePrice.find(
          item => item.ThreePlatId === this.platInfoList[type]
        )
        return value ? value.Price : ''
      }

      return ''
    },
    count(item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('Count')
      ) {
        return item.timeDate[date].Count
      }
      return ''
    },
    async fetchData() {
      const res = await roomStatPriceApi.getSonRoomList(this.stateForm.hotelId)
      this.roomList = res.data
    },
    expand(item) {
      item.isExpand = !item.isExpand
    },
    pre() {
      const _self = this
      let nowdays = new Date(_self.chosenDate)
      if (_self.periodType === 'week') {
        const oneDayTime = 24 * 60 * 60 * 1000
        _self.chosenDate = new Date(
          +nowdays - 7 * oneDayTime
        ).toLocaleDateString()
      }
      if (_self.periodType === 'month') {
        let year = nowdays.getFullYear()
        let month = b.getMonth()
        if (month == 0) {
          month = 12
          year = year - 1
        }
        if (month < 10) {
          month = '0' + month
        }
        _self.chosenDate = year + '-' + month + '-' + '01' // 上个月的第一天
      }
    },
    next() {
      const _self = this
      let nowdays = new Date(_self.chosenDate)
      if (_self.periodType === 'week') {
        const oneDayTime = 24 * 60 * 60 * 1000
        _self.chosenDate = new Date(
          +nowdays + 7 * oneDayTime
        ).toLocaleDateString()
      }
      if (_self.periodType === 'month') {
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
        _self.chosenDate = year + '-' + month + '-' + '01' // 上个月的第一天
      }
    },
    dateScope(begin, end) {
      function format(dateIn) {
        let date = new Date(dateIn)
        let s = ''
        let mouth =
          date.getMonth() + 1 >= 10
            ? date.getMonth() + 1
            : '0' + (date.getMonth() + 1)
        let day = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
        s += date.getFullYear() + '-' // 获取年份。
        s += mouth + '-' // 获取月份。
        s += day // 获取日。
        return s // 返回日期。
      }
      let arry = []
      let ab = format(begin).split('-')
      let ae = format(end).split('-')
      let db = new Date()
      db.setUTCFullYear(ab[0], ab[1] - 1, ab[2])
      let de = new Date()
      de.setUTCFullYear(ae[0], ae[1] - 1, ae[2])
      let unixDb = db.getTime()
      let unixDe = de.getTime()
      for (let k = unixDb; k <= unixDe; ) {
        console.log(format(new Date(parseInt(k))))
        arry.push(format(new Date(parseInt(k))))

        k = k + 24 * 60 * 60 * 1000
      }
      return arry
    },
    priceOne(item, date) {
      const _self = this

      _self.priceChangeForOne = true
      _self.priceForm.sonRoomId = item.SonRoomID
      _self.priceForm.time = [new Date(date), new Date(date)]
      _self.priceForm.price[0].price = _self.price(item, date)
      ;['飞猪', '去哪', '携程', '全日空'].forEach((i, index) => {
        _self.priceForm.price[index + 1].price = _self.otherPrice(i, item, date)
      })
      _self.stateForm.count = item.timeDate[date].Count
      _self.stateForm.isOpen = item.timeDate[date].IsOpen
      _self.stateForm.sonRoomId = item.SonRoomID
      _self.stateForm.date = [new Date(date), new Date(date)]
    },
    async priceSubmit() {
      const _self = this
      let priceForm = []
      let otherPriceForm = []
      let timeList = _self.dateScope(
        _self.priceForm.time[0],
        _self.priceForm.time[1]
      )
      timeList.forEach(time => {
        _self.priceForm.price.forEach(item => {
          if (item.id === -1) {
            priceForm.push({
              sonRoomId: _self.priceForm.sonRoomId,
              price: item.price,
              useTime: time
            })
          } else {
            otherPriceForm.push({
              sonRoomId: _self.priceForm.sonRoomId,
              price: item.price,
              useTime: time,
              threePlatId: item.id,
              stat: item.stat
            })
          }
        })
      })
      const otherPriceFormRes = await roomStatPriceApi.updateRoomSalePrice(
        otherPriceForm
      )
      const priceFormRes = await roomStatPriceApi.updateRoomPurchasePrice(
        priceForm
      )
      _self.getPriceList()
      _self.priceChangeForOne = false
    },
    async stateSubmit() {
      const _self = this
      let stateForm = []
      console.log(_self.stateForm.date[0], _self.stateForm.date[1])

      let timeList = _self.dateScope(
        _self.stateForm.date[0],
        _self.stateForm.date[1]
      )

      timeList.forEach(time => {
        stateForm.push({
          hotelId: _self.stateForm.hotelId,
          roomId: _self.roomList[0].roomId,
          sonRoomId: _self.stateForm.sonRoomId,
          roomType: 1,
          date: time,
          count: _self.stateForm.count,
          isOpen: _self.stateForm.isOpen,
          updateChannel: 0
        })
      })
      const res = await roomStatPriceApi.UpdateRoomState(stateForm)
      _self.getPriceList()
      _self.priceChangeForOne = false
    },
    submit() {
      const _self = this
      if (_self.activeName === 'price') {
        _self.priceSubmit()
        return
      }
      if (_self.activeName === 'state') {
        _self.stateSubmit()
      }
    },
    handleCheckAllChange(event) {
      this.checkedCities = event.target.checked ? cityOptions : []
      this.isIndeterminate = false
    },
    async getHotelThreePlatInfoList() {
      const res = await hotelThreePlatInfoApi.getList()
      if (res && res.data && Array.isArray(res.data)) {
        res.data.forEach(item => (this.platInfoList[item.PlatName] = item.ID))
      }
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
    width: 12%;
    height: 100px;
    background-color: #c8e4ec;
    padding: 10px;
  }
  .column_tr {
    width: 100%;
  }
  .column_tr:after {
    clear: both;
  }
</style>
