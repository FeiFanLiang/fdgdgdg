<template lang="html">
    <div id="Spider">
        <el-tabs v-model="activeName" @tab-click="task(activeName)">
            <el-tab-pane label="爬虫信息" name="add">
                <el-row>
                    <el-button type="primary" @click="clickAddBtn()">创建</el-button>
                    <el-button type="primary" @click="clickAddBtnOnce()">创建一次性比价</el-button>
                </el-row>
                <el-table :data="list" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading">
                    <el-table-column prop="PlatformHotelID" label="平台酒店ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="HotelID" label="平台酒店ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="PlatformID" label="平台酒店ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="PlatformAccountID" label="平台酒店ID" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="Period" label="抓取频率" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="StartDate" label="开始日期" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="EndDate" label="结束日期" width="110" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="IsStop" label="状态" width="110" show-overflow-tooltip>
                        <template scope="scope">
                            <span>{{scope.row.IsStop?'停止':'开始'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ComparisonRule" label="比价规则" width="600" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" width="150" fixed="right" show-overflow-tooltip>
                        <template scope="scope">
                            <DeleteButton api="spiderSettingApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-wrapper" v-show="!loading&&list.length">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
                <el-dialog title="爬虫配置" v-model="showDialog" :modal-append-to-body="false" @close="resetForm('form')" :modal="false">
                    <el-form label-position="right">
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="状态" v-if="addType==='normal'">
                                    <el-switch on-text="开始" off-text="停止" v-model="isStop"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" v-if="addType==='once'">
                                <el-form-item label="酒店id">
                                    <el-input v-model="hotelIds" placeholder="酒店id,逗号分隔" type="textarea" autosize> </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="日期格式">
                                    <el-switch on-text="数字" off-text="日期" v-model="isDateTypeNum"></el-switch>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="开始日期">
                                    <el-input-number size="small" v-model="startDate" :min="0" :disabled="!isDateTypeNum"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="结束日期">
                                    <el-input-number size="small" v-model="endDate" :min="0" :disabled="!isDateTypeNum"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="开始日期">
                                    <el-date-picker v-model="startDateAbs" type="date" placeholder="选择日期" :disabled="isDateTypeNum"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="结束日期">
                                    <el-date-picker v-model="endDateAbs" type="date" placeholder="选择日期" :disabled="isDateTypeNum"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="addType==='normal'">
                                <el-form-item label="周期">
                                    <el-input-number size="small" v-model="period" :min="0"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12" v-if="addType==='normal'">
                                <el-form-item label="搜索人数">
                                    <el-input v-model="guestNum" placeholder="逗号分隔的搜索人数"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="保底">
                                    <el-input-number size="small" v-model="basePrice" :min="0"></el-input-number>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="">
                                    <el-radio class="radio" v-model="addPriceType" label="person">每人加价
                                        <el-input-number size="small" v-model="personPrice" :disabled="addPriceType!=='person'" :min="0"></el-input-number>
                                    </el-radio>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="">
                                    <el-radio class="radio" v-model="addPriceType" label="percent">加价百分比%
                                        <el-input-number size="small" v-model="percentPrice" :disabled="addPriceType!=='percent'" :min="1"></el-input-number>
                                    </el-radio>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog()">取 消</el-button>
              <el-button type="primary" @click="addSave()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </span>
                </el-dialog>
            </el-tab-pane>
            <el-tab-pane label="任务列表" name="task" v-loading="loadingT">
                <el-button @click="fresh()" type="primary">刷新</el-button>
                <el-row :gutter="24">
                    <el-col :span="9">
                        <ul v-for="(item,index) in taskList" style="list-style:none">
                            <li>
                                <el-button @click="getTask(item)" style="width:100%;margin:10px 0;">{{item}}</el-button>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="14">
                        <div class="searchBar" id="searchBar" v-if="taskList.length != 0">
                            <p class="p" :class="searchBarFixed == true ? 'isFixed' :''">
                                <pre id="songReqJson" style="font-size:18px;">
                   {{taskDetail}}
                 </pre>
                                <!-- <div v-for="item in taskDetail">{{item}}</div> -->
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="当前价格" name="price" v-loading="loadingP">
                <el-button @click="fresh2()" type="primary">刷新</el-button>
                <el-row :gutter="24">
                    <el-col :span="9">
                        <ul v-for="(item,index) in priceList" style="list-style:none">
                            <li>
                                <el-button @click="getPrice(item)" style="width:50%;margin:10px 0;">{{item}}</el-button>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="14">
                        <div class="searchBar price" id="searchBar" v-if="priceList.length != 0">
                            <p class="p pprice" :class="searchBarFixed == true ? 'isFixed' :''">
                                <!-- <pre id="songReqJson">
                   {{priceDetail}}
                 </pre> -->
                                <el-collapse accordion>
                                    <el-collapse-item v-for="item in priceDetail" style="width:980px;border-right:none;">
                                        <template slot="title">
                                            <!-- {{item.房型+'---'+item.人数+'---'+item.早餐}} -->
                                            <span v-if="flag == 'agoda'">{{item.roomName+'---'+item.maxAdults+'---'+item.benefits}}</span>
                                            <span v-if="flag == 'haoding'">{{item.PlatRoomName+'---'+item.GuestsNum+'---'+item.Breakfast}}</span>
                                            <span v-if="flag == ''">{{item.ID}}</span>
                                        </template>
                                        <pre id="songReqJson">
                        {{item}}
                      </pre>
                                    </el-collapse-item>
                                </el-collapse>
                            </p>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { spiderSettingApi } from 'api'

import { HotelTopMenu } from 'components'

export default {
  components: {
    HotelTopMenu
  },
  props: {
    spiderData: {
      required: true
    },
    isShow: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  watch: {
    isShow(val) {
      val && this.fetchData()
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      loading: false,
      isEditable: true,
      showDialog: false,
      addType: 'normal',
      rules: {
        period: [
          {
            required: true,
            message: '请选择周期',
            type: 'number'
          }
        ],
        startDateAbs: [
          {
            required: true,
            message: '请选择周期',
            type: 'date'
          }
        ],
        endDateAbs: [
          {
            required: true,
            message: '请选择周期',
            type: 'date'
          }
        ],
        startDate: [
          {
            required: true,
            message: '请选择周期',
            type: 'number'
          }
        ],
        endDate: [
          {
            required: true,
            message: '请选择周期',
            type: 'number'
          }
        ]
      },
      activeName: 'add',
      taskList: [],
      styleObject: {},
      searchBarFixed: true,
      taskDetail: {},
      priceDetail: {},
      priceList: [],
      loadingT: false,
      loadingP: false,
      flag: '',
      isDateTypeNum: true,
      hotelIds: '',
      period: '',
      startDateAbs: '',
      endDateAbs: '',
      startDate: '',
      endDate: '',
      basePrice: 0,
      addPriceType: 'person',
      percentPrice: 100,
      personPrice: 0,
      guestNum: '',
      isStop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.getTaskList()
    this.getPriceList()
  },
  methods: {
    task(name) {
      if (name == 'task') {
        if (!this.taskList.length) {
          this.loadingT = true
        }
      }
      if (name == 'price') {
        if (!this.priceList.length) {
          this.loadingP = true
        }
      }
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
      var offsetTop = document.querySelector('#searchBar').offsetTop
      if (scrollTop > offsetTop) {
        this.searchBarFixed = true
      } else {
        this.searchBarFixed = false
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    async fetchData() {
      const _self = this
      _self.loading = true
      try {
        const res = await spiderSettingApi.listByHotel(this.spiderData.ID)
        _self.list = res.data
        _self.total = _self.list.length
      } catch (e) {
        _self.list = []
        _self.total = 0
      }
      _self.loading = false
    },
    clickAddBtn() {
      const _self = this
      _self.addType = 'normal'
      _self.flag = 'add'
      _self.resetForm()
      _self.showDialog = true
    },
    clickAddBtnOnce() {
      const _self = this
      _self.addType = 'once'
      _self.flag = 'add'
      _self.showDialog = true
    },
    closeDialog() {
      const _self = this
      _self.showDialog = false
    },
    async addSave() {
      this.addType === 'normal' && this.addSaveNormal()
      this.addType === 'once' && this.addSaveOnce()
    },
    async addSaveNormal() {
      const {
        isDateTypeNum,
        startDateAbs,
        endDateAbs,
        startDate,
        endDate,
        basePrice,
        addPriceType,
        percentPrice,
        personPrice,
        guestNum,
        period,
        isStop,
        spiderData
      } = this
      const form = {
        PlatformHotelID: spiderData.ID,
        HotelID: spiderData.HotelID,
        PlatformID: spiderData.PlatformID,
        PlatformAccountID: spiderData.PlatformAccountID,
        period,
        // startDateAbs: isDateTypeNum ? '' : startDateAbs.Format('yyyy-MM-dd'),
        // endDateAbs: isDateTypeNum ? '' : endDateAbs.Format('yyyy-MM-dd'),
        // startDate: isDateTypeNum ? startDate : 0,
        // endDate: isDateTypeNum ? endDate : 0,
        UpdateTime: '',
        ComparisonRule: JSON.stringify({
          basePrice,
          addPriceType,
          percentPrice,
          personPrice
        }),
        isPriceComparison: true,
        guestNum,
        isStop
      }
      if (isDateTypeNum) {
        form.startDate = startDate
        form.endDate = endDate
      } else {
        form.startDateAbs = startDateAbs.Format('yyyy-MM-dd')
        form.endDateAbs = endDateAbs.Format('yyyy-MM-dd')
      }
      const _self = this
      try {
        _self.isEditable = false

        await spiderSettingApi.setPeriod(form)
        _self.fetchData()
        _self.showDialog = false
        _self.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
        console.log(e)
        _self.$message.error('添加失败!!!')
      } finally {
        _self.isEditable = true
      }
    },
    async addSaveOnce() {
      const {
        isDateTypeNum,
        hotelIds,
        startDateAbs,
        endDateAbs,
        startDate,
        endDate,
        basePrice,
        addPriceType,
        percentPrice,
        personPrice
      } = this
      const form = {
        hotelIds: hotelIds ? hotelIds.split(',') : [],
        platformHotelCarwlerPeriod: {
          // startDateAbs: isDateTypeNum ? '' : startDateAbs.Format('yyyy-MM-dd'),
          // endDateAbs: isDateTypeNum ? '' : endDateAbs.Format('yyyy-MM-dd'),
          // startDate: isDateTypeNum ? startDate : 0,
          // endDate: isDateTypeNum ? endDate : 0,
          isPriceComparison: false,
          comparisonRule: JSON.stringify({
            basePrice,
            addPriceType,
            percentPrice,
            personPrice
          })
        }
      }
      if (isDateTypeNum) {
        form.platformHotelCarwlerPeriod.startDate = startDate
        form.platformHotelCarwlerPeriod.endDate = endDate
      } else {
        form.platformHotelCarwlerPeriod.startDateAbs = startDateAbs.Format(
          'yyyy-MM-dd'
        )
        form.platformHotelCarwlerPeriod.endDateAbs = endDateAbs.Format(
          'yyyy-MM-dd'
        )
      }
      console.log(form)

      const _self = this
      try {
        _self.isEditable = false
        await spiderSettingApi.singlePriceRatio(
          this.spiderData.PlatformID,
          form
        )
        _self.fetchData()
        _self.showDialog = false
        _self.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
        console.log(e)
        _self.$message.error('添加失败!!!')
      } finally {
        _self.isEditable = true
      }
    },
    async getTaskList() {
      const _self = this
      try {
        const res = await spiderSettingApi.GetTaskList(_self.spiderData.ID)
        _self.taskList = res.data.sort()
        _self.getTask(_self.taskList[0])
        _self.loadingT = false
        _self.$message({
          message: '任务列表获取成功',
          type: 'success'
        })
      } catch (e) {
        _self.$message.error('任务列表获取失败!!!')
      }
    },
    async getTask(item) {
      const res = await spiderSettingApi.GetTask(item)
      this.taskDetail = res.data
    },
    async getPriceList() {
      const _self = this
      try {
        const res = await spiderSettingApi.GetPriceList(_self.spiderData.ID)
        _self.priceList = res.data.sort()
        _self.getPrice(_self.priceList[0])
        _self.loadingP = false
        _self.$message({
          message: '价格获取成功',
          type: 'success'
        })
      } catch (e) {
        _self.$message.error('价格获取失败!!!')
      }
    },
    async getPrice(item) {
      try {
        const res = await spiderSettingApi.GetPrice(item)
        if (item.substring(0, 1) == 9) {
          this.flag = 'agoda'
        }
        if (item.substring(0, 1) == 5) {
          this.flag = 'haoding'
        }
        this.priceDetail = res.data
      } catch (e) {
        this.$message.error('价格详情获取失败!!!')
      }
    },
    fresh() {
      this.loadingT = true
      this.getTaskList()
    },
    fresh2() {
      this.loadingP = true
      this.getPriceList()
    },
    resetForm() {
      const _self = this
      _self.isDateTypeNum = true
      _self.hotelIds = ''
      _self.period = ''
      _self.startDateAbs = ''
      _self.endDateAbs = ''
      _self.startDate = ''
      _self.endDate = ''
      _self.basePrice = 0
      _self.addPriceType = 'person'
      _self.percentPrice = 100
      _self.personPrice = 0
      _self.guestNum = ''
      _self.isStop = false
    }
  }
}
</script>
<style lang="scss">
#Spider {
  .searchBar {
    .isFixed {
      position: fixed;
      background-color: #fff;
      top: 100;
      left: 40%;
      z-index: 999;
      overflow: scroll;
    }
    .p {
      width: 55%;
      display: flex;
      border: solid 1px lightgrey;
      height: 600px;
    }
    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    * html pre {
      word-wrap: break-word;
      white-space: normal;
    }
  }
  .price {
    .isFixed {
      left: 25%;
    }
    .pprice {
      width: 70%;
    }
  }
}
</style>
