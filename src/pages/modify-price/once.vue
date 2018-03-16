<template lang="html">
    <div id="Spider">
        <el-row :gutter="20">
                    <el-button type="primary" @click="clickAddBtnOnce()">创建一次性比价</el-button>
     <el-col :span="5">
        <el-input placeholder="请输入要搜索的名字" v-model="filterName" ></el-input>
    </el-col>
    <el-col :span="5">
      <el-button type="primary" @click="fetchData()">搜索</el-button>
    </el-col>
                </el-row>
                <el-table :data="list" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" >
                 <el-table-column prop="Name" label="名字" width="200" show-overflow-tooltip>
                    </el-table-column>
                      <el-table-column prop="CreateTime" label="创建时间" width="200" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column  label="开始日期" width="200" show-overflow-tooltip>
                     <template scope="scope">
                            <span>{{!scope.row.StartDate && !scope.row.EndDate?scope.row.StartDateAbs:scope.row.StartDate}}</span>
                        </template>
                        </el-table-column>
                    <el-table-column  label="结束日期" width="200" show-overflow-tooltip>
                     <template scope="scope">
                            <span>{{!scope.row.StartDate && !scope.row.EndDate?scope.row.EndDateAbs:scope.row.EndDate}}</span>
                        </template>
                        </el-table-column>
                    <el-table-column prop="IsStop" label="状态" width="100" show-overflow-tooltip>
                        <template scope="scope">
                            <span>{{scope.row.IsStop?'停止':'开始'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="ComparisonRule" label="比价规则"  show-overflow-tooltip>
                     <template scope="scope">
                            <span>{{getComparisonRuleStr(JSON.parse(scope.row.ComparisonRule))}}</span>
                        </template>
                    </el-table-column>
                     <el-table-column label="操作" width="200" fixed="right" show-overflow-tooltip>
                        <template scope="scope">
                          <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
                            <DeleteButton api="singlePriceRatioLogApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination-wrapper" v-show="!loading&&list.length">
                    <el-pagination @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
                <el-dialog title="爬虫配置" v-model="showDialog" :modal-append-to-body="false"  :modal="false">
                    <el-form label-position="left">
                        <el-row>
                        <el-col :span="12" >
                                <el-form-item label="">
                                    <el-input v-model="name" placeholder="一次性比价名字" > </el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" >
                                <el-form-item label="">
                                    <el-input v-model="hotelIds" placeholder="酒店id,逗号分隔" type="textarea" > </el-input>
                                </el-form-item>
                            </el-col>
                             <el-col :span="24">
                                <el-form-item label="是否改价">
                                    <el-switch on-text="是" off-text="否" v-model="isPriceComparison"></el-switch>
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
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="保底">
                                    <el-input-number size="small" v-model="basePrice" ></el-input-number>
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
              <el-button @click="showDialog = false">取 消</el-button>
              <el-button type="primary" @click="save()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
            </span>
                </el-dialog>
    </div>
</template>

<script>
import { spiderSettingApi, singlePriceRatioLogApi } from 'api'

export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      loading: false,
      isEditable: true,
      showDialog: false,
      flag: '',
      name: '',
      platformID: '3',
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
      isStop: false,
      isPriceComparison: false,
      filterName: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getComparisonRuleStr(comparisonRule) {
      if (!comparisonRule || !comparisonRule.addPriceType) return ''
      if (comparisonRule.addPriceType === 'person') {
        return `基础加价${comparisonRule.basePrice},每人加价${
          comparisonRule.personPrice
        }`
      }
      if (comparisonRule.addPriceType === 'percent') {
        return `基础加价${comparisonRule.basePrice},加价百分比${
          comparisonRule.percentPrice
        }`
      }
      return ''
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        query: {
          name: _self.filterName
        }
      }

      _self.loading = true
      try {
        const res = await singlePriceRatioLogApi.list(options)
        _self.list = res.data.Data
        _self.total = res.data.Count
      } catch (e) {
        _self.list = []
        _self.total = 0
      }
      _self.loading = false
    },
    clickAddBtnOnce() {
      const _self = this
      _self.flag = 'add'
      _self.resetForm()
      _self.showDialog = true
    },
    async save() {
      const {
        name,
        isDateTypeNum,
        hotelIds,
        startDateAbs,
        endDateAbs,
        startDate,
        endDate,
        basePrice,
        addPriceType,
        percentPrice,
        personPrice,
        platformID,
        isPriceComparison,
        $message
      } = this
      if (!hotelIds) {
        $message.error('请输入酒店id!!!')
        return
      }
      if (isDateTypeNum && (!startDate || !endDate)) {
        $message.error('请输入日期')
        return
      }
      if (!isDateTypeNum && (!startDateAbs || !endDateAbs)) {
        $message.error('请输入日期')
        return
      }
      const form = {
        name,
        hotelIds: hotelIds ? hotelIds.split(',').filter(item => !!item) : [],
        platformHotelCarwlerPeriod: {
          isPriceComparison,
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

      const _self = this
      try {
        _self.isEditable = false
        await spiderSettingApi.singlePriceRatio(platformID, form)
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
    async edit(row) {
      const _self = this
      _self.flag = 'edit'
      _self.resetForm()
      _self.hotelIds = row.HotelIDs
      _self.name = row.Name
      _self.startDate = row.StartDate
      _self.endDate = row.EndDate
      _self.startDateAbs = row.StartDateAbs ? new Date(row.StartDateAbs) : ''
      _self.endDateAbs = row.EndDateAbs ? new Date(row.EndDateAbs) : ''
      _self.isStop = row.IsStop
      const comparisonRule = row.ComparisonRule
        ? JSON.parse(row.ComparisonRule)
        : {}
      _self.basePrice = comparisonRule.basePrice
      _self.addPriceType = comparisonRule.addPriceType
      _self.percentPrice = comparisonRule.percentPrice
      _self.personPrice = comparisonRule.personPrice
      _self.isDateTypeNum = !row.StartDate && !row.EndDate ? false : true
      _self.showDialog = true
    },

    resetForm() {
      const _self = this

      _self.name = ''
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
      _self.isPriceComparison = false
    }
  }
}
</script>
<style lang="scss">

</style>
