<template lang="html">
<div class="hotel-price">
  <!-- <HotelTopMenu path="price"></HotelTopMenu > -->
  <el-row>
        <el-form  ref="form" :model="filters" label-width="90px">
      <el-form-item label="订单平台" prop="PlatformID">
        <el-select v-model="filters.PlatformID" clearable @change="changeValue">
          <el-option v-for="item in PlatPolicyIDs" :key="item.ID" :label="item.PlatName" :value="item.ID"></el-option>
        </el-select>
     <!--   <el-button @click="speek()">确定</el-button> -->
      </el-form-item>
      </el-form>
  </el-row>
  <el-row :gutter="20" style="display:flex;align-items: center;">
    <el-col :span="2"><dt class="legend" style="color:#FF4949;background-color:#c8e4ec"></dt>
      <dd>开房</dd>
    </el-col>
    <el-col :span="2"><dt class="legend" style="color:#D3DCE6;background-color:#e4e8f1"></dt>
      <dd>关房</dd>
    </el-col>
    <el-col :span="4">
      <el-button @click="mutipEdit()">批量修改房间状态</el-button>
      
    </el-col>
     
    <!-- <el-col :span="3">
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
      </el-col> -->
    <el-col :span="4" :offset="5">
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

  <el-table :data="roomList" row-key="ID" @expand="handleExpand" :expand-row-keys="expandRowKeys" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
    <el-table-column type="expand" label="周日">
      <template scope="props">
        <template  v-for="sonRoom in props.row.SonRooms" >
          <table style="width: 100%;">
            <tr v-for="(week,index) in monthListChunk" class="column_tr" v-if="periodType==='month'">
            <td class="ui-table-col-left" colspan="1" rowspan="6" v-if="index===0" style="width:12%;">
            <div style="margin-left: 30px;">
              <el-checkbox @change="mutipSelect(sonRoom)" v-model="sonRoom.select"></el-checkbox>
              <strong>  {{sonRoom.SonRoomName}}</strong>
              <br/>
              <br/>
            <strong v-if="sonRoom.Remark">备注1</strong>  {{sonRoom.Remark}}
              <br/>
              <br/>
            <!-- <strong v-if="sonRoom.Remark2">备注2</strong>  {{sonRoom.Remark2}}
            <br/> -->
            <p v-for="item in sonRoom.platTimeRange" v-if="item.platName&&item.platName==='全日空ANA'">  {{item.platName}}<br/>开始时间：{{item.beginDate}}<br/>结束时间：{{item.endDate}}</p>
            <!-- <span class="gray" style="display: none;">(无效)</span> -->
            </div>
            </td>
            <td class="ui-table-col-center w100 current" v-bind:class="{'close':!isOpen(sonRoom,day.date),'open':isOpen(sonRoom,day.date)}" v-for="day in week" @click="priceOne(sonRoom,day.date)">
            <div class="dayname">{{sonRoom.SonRoomName}}</div>
            <div class="dayname">{{day.date}}</div>
            <div class="price" v-if="currency(sonRoom,day.date)===0">底价<span>￥</span>{{price(sonRoom,day.date)}}</div>
            <div class="price" v-if="currency(sonRoom,day.date)===1">底价<span>YEN</span>{{price(sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('飞猪',sonRoom,day.date)===0">飞猪<span>￥</span>{{otherPrice('飞猪',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('飞猪',sonRoom,day.date)===1">飞猪<span>YEN</span>{{otherPrice('飞猪',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('去哪',sonRoom,day.date)===0">去哪<span>￥</span>{{otherPrice('去哪',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('去哪',sonRoom,day.date)===1">去哪<span>YEN</span>{{otherPrice('去哪',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('携程',sonRoom,day.date)===0">携程<span>￥</span>{{otherPrice('携程',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('携程',sonRoom,day.date)===1">携程<span>YEN</span>{{otherPrice('携程',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('全日空ANA',sonRoom,day.date)===0">全日空ANA<span>￥</span>{{otherPrice('全日空ANA',sonRoom,day.date)}}</div>
            <div class="price" v-if="otherCurrency('全日空ANA',sonRoom,day.date)===1">全日空ANA<span>YEN</span>{{otherPrice('全日空ANA',sonRoom,day.date)}}</div>
            <div class="remain">余{{count(sonRoom,day.date)}}</div>
            </td>
            </tr>
          </table>
          <table style="width: 100%;">
              <tr class="column_tr" v-if="periodType==='week'">
              <td class="ui-table-col-left" colspan="1" rowspan="6" style="width:12%;">
                <div style="margin-left: 30px;">
                  <strong>  {{sonRoom.SonRoomName}}</strong>
                  <br/>
                  <br/>
                <strong v-if="sonRoom.Remark">备注1</strong>  {{sonRoom.Remark}}
                  <br/>
                  <br/>
                <!-- <strong v-if="sonRoom.Remark2">备注2</strong>  {{sonRoom.Remark2}}
                <br/> -->
                <p v-for="item in sonRoom.platTimeRange" v-if="item.platName&&item.platName==='全日空ANA'">  {{item.platName}}<br/>开始时间：{{item.beginDate}}<br/>结束时间：{{item.endDate}}</p>
                <!-- <span class="gray" style="display: none;">(无效)</span> -->
                </div>
              </td>
              <td class="ui-table-col-center w100 current" v-bind:class="{'close':!isOpen(sonRoom,day.date),'open':isOpen(sonRoom,day.date)}" v-for="day in weekList" @click="priceOne(sonRoom,day.date)">
                <div class="dayname">{{sonRoom.SonRoomName}}</div>
                <div class="dayname">{{day.date}}</div>
                <div class="price" v-if="currency(sonRoom,day.date)===0">底价<span>￥</span>{{price(sonRoom,day.date)}}</div>
                <div class="price" v-if="currency(sonRoom,day.date)===1">底价<span>YEN</span>{{price(sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('飞猪',sonRoom,day.date)===0">飞猪<span>￥</span>{{otherPrice('飞猪',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('飞猪',sonRoom,day.date)===1">飞猪<span>YEN</span>{{otherPrice('飞猪',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('去哪',sonRoom,day.date)===0">去哪<span>￥</span>{{otherPrice('去哪',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('去哪',sonRoom,day.date)===1">去哪<span>YEN</span>{{otherPrice('去哪',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('携程',sonRoom,day.date)===0">携程<span>￥</span>{{otherPrice('携程',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('携程',sonRoom,day.date)===1">携程<span>YEN</span>{{otherPrice('携程',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('全日空ANA',sonRoom,day.date)===0">全日空ANA<span>￥</span>{{otherPrice('全日空ANA',sonRoom,day.date)}}</div>
                <div class="price" v-if="otherCurrency('全日空ANA',sonRoom,day.date)===1">全日空ANA<span>YEN</span>{{otherPrice('全日空ANA',sonRoom,day.date)}}</div>
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
    <el-form-item label="是否开房">
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
  <el-form-item label="获取渠道">
    <el-radio-group v-model="stateForm.updateChannel">
      <el-radio-button :label="0">机器抓取</el-radio-button>
      <el-radio-button :label="1">人工更改</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="剩余数量">
     <el-input-number v-model="stateForm.count"  :min="1" ></el-input-number>
  </el-form-item>
        </el-form>
    </el-tab-pane>
  </el-tabs>
  <div slot="footer" class="dialog-footer">
    <el-button @click="priceChangeForOne = false">取 消</el-button>
    <el-button type="primary" :loading="!isEditable" @click="submit()">{{isEditable?'确 定':'提交中'}}</el-button>
  </div>
    </el-dialog>

    <el-dialog title="批量修改房间状态" v-model="mutip">
      <el-tabs v-model="singalSonRoomId" @tab-click="handleSingalSonRoomId">
    <el-tab-pane :label="a.SonRoomName" :name="String(a.ID)" v-for="a in mutipList" :key="a.ID">
      <el-form ref="singalStateForm" :model="singalStateForm" label-width="80px">
        <el-form-item label="生效时间">
      <el-col >
        <el-date-picker v-model="singalStateForm.date" type="daterange" align="left" placeholder="选择日期范围">
        </el-date-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="是否开房">
      <el-radio-group v-model="singalStateForm.isOpen">
        <el-radio-button :label="true">开房</el-radio-button>
        <el-radio-button :label="false">关房</el-radio-button>
      </el-radio-group>
  </el-form-item>
  <el-form-item label="获取渠道">
    <el-radio-group v-model="singalStateForm.updateChannel">
      <el-radio-button :label="0">机器抓取</el-radio-button>
      <el-radio-button :label="1">人工更改</el-radio-button>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="剩余数量">
     <el-input-number v-model="singalStateForm.count"  :min="1" ></el-input-number>
  </el-form-item>
        </el-form>
    </el-tab-pane>
  </el-tabs>
  <div slot="footer" class="dialog-footer">
    <el-button type="primary" :loading="!isMutipEditable" @click="mutipSubmit()">{{isMutipEditable?'确认修改':'提交中'}}</el-button>
    <el-button @click="mutip = false">关闭</el-button>
  </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  platStatPriceApi,
  hotelThreePlatInfoApi,
  roomStatPriceApi,
  hotelRoomApi,
  sonRoomPlatformApi
} from 'api'
import chunk from 'lodash/chunk'
import {
  HotelTopMenu
} from 'components'
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
export default {
  created() {
    const _self = this
    _self.stateForm.hotelId = _self.$route.params.ID
    _self.singalStateForm.hotelId = _self.$route.params.ID
    _self.chosenDate = Date.now()
    _self.fetchData()
    _self.getHotelThreePlatInfoList()
  },
  data() {
    return {
      mutipValue: false,
      singalSonRoomId: '',
      mutipList: [],
      PlatPolicyIDs:[],
      PlatformID:'',
      mutip: false,
      filters:{
        ThreePlatID:''
      },
      singalStateForm: {
        hotelId: '',
        roomId: '',
        sonRoomId: '',
        roomType: 1,
        date: '',
        count: '',
        isOpen: '',
        updateChannel: ''
      },
      isMutipEditable: true,
      loading: false,
      isEditable: true,
      activeName: 'price',
      platInfoList: {},
      roomList: [],
      chosenRoom: {},
      stateForm: {
        hotelId: '',
        roomId: '',
        sonRoomId: '',
        roomType: 1,
        date: '',
        count: '',
        isOpen: '',
        updateChannel: ''
      },
      priceForm: {
        sonRoomId: '',
        time: '',
        price: [{
            title: '最高采购价',
            id: -1,
            price: ''
          },
          {
            title: '飞猪',
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
            title: '携程',
            id: 3,
            price: '',
            stat: 0
          },
          {
            title: '全日空ANA',
            id: 4,
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
          date: item.toLocaleDateString(),
          status: status
        }
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
          status: false
        })
      })
      return weekList
    },
    startAndEndDay() {
      const _self = this
      if (!_self.monthList ||
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
   async speek() {
      const _self =this
     const res = await platStatPriceApi.getSonRoomList(_self.stateForm.hotelId,_self.filters.PlatformID)
      console.log(res)
    },
    changeValue(){
       this.expandRowKeys.length = 0
        this.expandRowKeys.push(0)
    },
    handleSingalSonRoomId(tab) {
      const _self = this
      _self.mutipList.forEach(function(item) {
        if (Number(tab.name) === item.ID) {
          _self.singalSonRoomId = String(item.ID)
          _self.singalStateForm.sonRoomId = item.ID
          _self.singalStateForm.count = 0
          _self.singalStateForm.isOpen = false
          _self.singalStateForm.updateChannel = 0
          _self.singalStateForm.date = [new Date(), new Date()]
        }
      })
    },
    mutipSelect(a) {
      if (a.select) {
        this.mutipList.push(a)
      } else {
        for (let i = 0; i < this.mutipList.length; i++) {
          if (this.mutipList[i].ID === a.ID) {
            this.mutipList.splice(i, 1)
          }
        }
      }
    },
    mutipEdit() {
      const _self = this
      if (_self.mutipList.length > 0) {
        _self.mutip = true
        _self.singalSonRoomId = String(_self.mutipList[0].ID)
        _self.singalStateForm.sonRoomId = _self.mutipList[0].ID
        _self.singalStateForm.count = 0
        _self.singalStateForm.isOpen = false
        _self.singalStateForm.updateChannel = 0
        _self.singalStateForm.date = [new Date(), new Date()]
      } else {
        this.$message.error('请先选择子房型')
      }
    },
    async mutipSubmit() {
      const _self = this
      try {
        _self.isMutipEditable = false
        let form = []
        let timeList = _self.dateScope(
          _self.singalStateForm.date[0],
          _self.singalStateForm.date[1]
        )
        timeList.forEach(time => {
          form.push({
            hotelId: _self.singalStateForm.hotelId,
            roomId: _self.chosenRoom.roomId,
            sonRoomId: _self.singalStateForm.sonRoomId,
            roomType: 1,
            date: time,
            count: _self.singalStateForm.count,
            isOpen: _self.singalStateForm.isOpen,
            updateChannel: _self.singalStateForm.updateChannel
          })
        })
        const res = await platStatPriceApi.UpdateRoomState(form)
        _self.$message({
          message: '修改成功',
          type: 'success'
        })
        _self.mutip = false
        _self.isMutipEditable = true
        _self.getPriceList()
      } catch (e) {
        _self.isMutipEditable = true
        this.$message.error('修改失败！')
      }
    },
    async platTimeRange(pid) {
      if (!pid) {
        return ''
      }
      const res = await sonRoomPlatformApi.listBySonRoom(pid)
      if (!res.data || !res.data.length) {
        return ''
      }
      const data = res.data.map(item => ({
        platName: item.Platform.PlatName,
        beginDate: item.BeginDate,
        endDate: item.EndDate
      }))
      return data
    },
    handleExpand(row, expanded) {
      this.chosenRoom = row
      if (expanded) {
        this.getPriceList()
        this.expandRowKeys.length = 0
        this.expandRowKeys.push(row.ID)
      }
    },
    handleTabClick(tab) {
      this.activeName = tab.name
    },
    async getPriceList() {
      const _self = this
   
      
      if (!_self.startAndEndDay || !_self.startAndEndDay.length) {
        return
      }
      if (!_self.roomList.length) {
        return
      }
      _self.loading = true
      const form = {
        SonRooms: _self.chosenRoom.SonRooms.map(item => item.ID),
        BeginDate: _self.startAndEndDay[0].date,
        EndDate: _self.startAndEndDay[1].date
      }
      console.log(form)     
      
      const res = await platStatPriceApi.getPriceList(_self.filters.PlatformID,form)
      
      // let SonRooms = [..._self.chosenRoom.SonRooms]
    if( JSON.stringify(res.data.Sonrooms) == "{}"){
      _self.chosenRoom.SonRooms.forEach((item, index) => {
      //console.log(res.data.Sonrooms[String(item.ID)].STSes)
        
        this.$set(item, 'timeDate', '')
        this.$set(item, 'select', false)
      })
      _self.loading = false      
      return false
    }
      
      _self.chosenRoom.SonRooms.forEach((item, index) => {
      //console.log(res.data.Sonrooms[String(item.ID)].STSes)
        
        this.$set(item, 'timeDate', res.data.Sonrooms[String(item.ID)].STSes)
        this.$set(item, 'select', false)
      })
      // _self.chosenRoom.SonRooms = SonRooms
      // this.$set(this.chosenRoom, 'SonRooms', SonRooms)
      _self.mutipList = []
      _self.loading = false
    },
    isOpen(item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('IsOpen')
      ) {
        return item.timeDate[date].IsOpen
      }
      return ''
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
    otherCurrency(type, item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('platSalePrice') &&
        Array.isArray(item.timeDate[date].platSalePrice) &&
        item.timeDate[date].platSalePrice.length > 0
      ) {
        let value = item.timeDate[date].platSalePrice.find(
          item => item.ThreePlatId === this.platInfoList[type]
        )
        return value ? value.Currency : ''
      }
      return ''
    },
    currency(item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('SonRoomPurchasePrice') &&
        item.timeDate[date].SonRoomPurchasePrice.hasOwnProperty('Price')
      ) {
        return item.timeDate[date].SonRoomPurchasePrice.Currency
      }
      return ''
    },
    otherPrice(type, item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('platSalePrice') &&
        Array.isArray(item.timeDate[date].platSalePrice) &&
        item.timeDate[date].platSalePrice.length > 0
      ) {
        let value = item.timeDate[date].platSalePrice.find(
          item => item.ThreePlatId === this.platInfoList[type]
        )
        return value ? value.Price : ''
      }
      return ''
    },
    otherStat(type, item, date) {
      if (
        item &&
        item.timeDate &&
        item.timeDate[date] &&
        item.timeDate[date].hasOwnProperty('platSalePrice') &&
        Array.isArray(item.timeDate[date].platSalePrice) &&
        item.timeDate[date].platSalePrice.length > 0
      ) {
        let value = item.timeDate[date].platSalePrice.find(
          item => item.ThreePlatId === this.platInfoList[type]
        )
        return value ? value.Stat : ''
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
      // const res = await platStatPriceApi.getSonRoomList(this.stateForm.hotelId)
      const res = await hotelRoomApi.list(this.stateForm.hotelId)
      console.log(res)
      this.roomList = [...res.data]
      const newList = [...res.data]
      newList.forEach((room, rindex) => {
        room.SonRooms.forEach(async(sroom, srindex) => {
          const platTimeRange = await this.platTimeRange(sroom.ID)
          sroom.platTimeRange = platTimeRange
          if (rindex + 1 === newList.length && srindex + 1 === room.length) {
            this.roomList = newList
          }
        })

        // this.$set(newList[index], 'platTimeRange', platTimeRange)
      })
    },
    expand(item) {
      item.isExpand = !item.isExpand
    },
    pre() {
      const _self = this
      let nowdays = new Date(_self.chosenDate)
      if (_self.periodType === 'week') {
        const oneDayTime = 24 * 60 * 60 * 1000
        _self.chosenDate = new Date(+nowdays - 7 * oneDayTime).toLocaleDateString()
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
        _self.chosenDate = new Date(+nowdays + 7 * oneDayTime).toLocaleDateString()
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
          date.getMonth() + 1 >= 10 ?
          date.getMonth() + 1 :
          '0' + (date.getMonth() + 1)
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
      for (let k = unixDb; k <= unixDe;) {
        arry.push(format(new Date(parseInt(k))))
        k = k + 24 * 60 * 60 * 1000
      }
      return arry
    },
    priceOne(item, date) {
      const _self = this
      _self.priceChangeForOne = true
      _self.priceForm.sonRoomId = item.ID
      _self.priceForm.time = [new Date(date), new Date(date)]
      _self.priceForm.price[0].price = _self.price(item, date);
      ['飞猪', '去哪', '携程', '全日空ANA'].forEach((i, index) => {
        _self.priceForm.price[index + 1].price = _self.otherPrice(i, item, date)
        _self.priceForm.price[index + 1].stat = _self.otherStat(i, item, date)
      })
      _self.stateForm.count = item.timeDate[date].Count
      _self.stateForm.isOpen = item.timeDate[date].IsOpen
      _self.stateForm.updateChannel = item.timeDate[date].UpdateChannel
      _self.stateForm.sonRoomId = item.ID
      _self.stateForm.date = [new Date(date), new Date(date)]
    },
    async priceSubmit() {
      const _self = this
      try {
        _self.isEditable = false
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
                stat: item.stat || 0
              })
            }
          })
        })
        const otherPriceFormRes = await platStatPriceApi.updateRoomSalePrice(
          otherPriceForm
        )
        const priceFormRes = await platStatPriceApi.updateRoomPurchasePrice(
          priceForm
        )
        _self.getPriceList()
        _self.priceChangeForOne = false
        _self.isEditable = true
      } catch (e) {
        _self.isEditable = true
        this.$message.error('修改失败！')
      }

    },
    async stateSubmit() {
      const _self = this
      try {
        _self.isEditable = false
        let stateForm = []
        let timeList = _self.dateScope(
          _self.stateForm.date[0],
          _self.stateForm.date[1]
        )
        timeList.forEach(time => {
          stateForm.push({
            hotelId: _self.stateForm.hotelId,
            roomId: _self.chosenRoom.roomId,
            sonRoomId: _self.stateForm.sonRoomId,
            roomType: 1,
            date: time,
            count: _self.stateForm.count,
            isOpen: _self.stateForm.isOpen,
            updateChannel: _self.stateForm.updateChannel
          })
        })
        const res = await platStatPriceApi.UpdateRoomState(stateForm)
        _self.getPriceList()
        _self.priceChangeForOne = false
        _self.isEditable = true
      } catch (e) {
        _self.isEditable = true
        this.$message.error('修改失败！')
      }
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
        this.PlatPolicyIDs = res.data
        console.log(this.PlatPolicyIDs)
        this.PlatformID = ''
      if (res && res.data && Array.isArray(res.data)) {
        res.data.forEach(item => (this.platInfoList[item.PlatName] = item.ID))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.hotel-price {
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: rgba(255, 255, 255, 0);
    background-clip: padding-box;
  }
  .el-table--enable-row-hover .el-table__body td:hover.current {
    background-color: #ff000057!important;
    background-clip: padding-box;
  }
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
  .open {
    width: 12%;
    height: 100px;
    background-color: #c8e4ec!important;
    padding: 10px;
  }
  .close {
    width: 12%;
    height: 100px;
    background-color: #ffcfc9!important;
    padding: 10px;
  }
  .column_tr {
    width: 100%;
  }
  .column_tr:after {
    clear: both;
  }
  .dayname {
    color: #13ce66;
  }
  .price {
    color: #48576a;
  }
  .remain {
    color: #50bfff;
  }
}
</style>
