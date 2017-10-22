<template lang="html">
<div id="HotelsOrder">
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading" border :default-sort = "{prop: 'BookTime', order: 'descending'}">
        <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="城市" prop="City"></el-table-column>
        <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
          <template scope="scope">
            <span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
            <span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="间/晚" prop="RoomNum">
          <template scope="scope">
            <span>{{ scope.row.RoomNum }}</span>/
            <span>{{ scope.row.NightNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人" prop="Passenger"></el-table-column>
        <el-table-column label="到店时间" prop="ArrivalTime"></el-table-column>
        <el-table-column label="预定时间" prop="BookTime" width="80" sortable>
            <template scope="scope">
                <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
            <template scope="scope">
                <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <el-button size="small" @click="check(scope.$index, scope.row)">审核</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog title="编辑订单信息" v-model="showDialog" @close="resetForm('form')" size="full">
        <el-form ref="form" :model="form" label-width="110px">
            <el-row :gutter="24"><el-col :span="3" style="text-align:center;color:orange;"><h1>客人信息</h1></el-col></el-row>
            <el-row :gutter="24">
              <el-col :span="6">
                    <el-form-item label="入住日期" prop="StayDateStart">
                        <el-date-picker v-model="form.StayDateStart" type="date" placeholder="选择入住日期" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="退房日期" prop="StayDateEnd">
                        <el-date-picker v-model="form.StayDateEnd" type="date" placeholder="选择退房日期" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="间数" prop="RoomNum">
                        <el-input placeholder="请输入间数" v-model="form.RoomNum" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="晚数" prop="NightNum">
                        <el-input placeholder="请输入晚数" v-model="form.NightNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="入住人" prop="Passenger">
                        <el-input placeholder="请输入入住人" v-model="form.Passenger"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系电话" prop="PassengerTel">
                        <el-input placeholder="请输入酒店名称" v-model="form.PassengerTel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="联系固话" prop="PassengerTel2">
                        <el-input placeholder="请输入联系固话" v-model="form.PassengerTel2"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="Email" prop="Email">
                        <el-input placeholder="请输入Email" v-model="form.Email"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="到店时间" prop="ArrivalTime">
                        <el-input placeholder="请输入到店时间" v-model="form.ArrivalTime"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="特殊要求" prop="PassengerAsk">
                        <el-input type="textarea" v-model="form.PassengerAsk"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24"><el-col :span="3" style="text-align:center;color:orange;"><h1>订单信息</h1></el-col></el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="酒店名称" prop="HotelName">
                        <el-input placeholder="请输入酒店名称" v-model="form.HotelName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="房型" prop="Room">
                        <el-input placeholder="请输入房型" v-model="form.Room"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="城市名称" prop="City">
                        <el-input placeholder="请输入城市名称" v-model="form.City"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="预定时间" prop="BookTime">
                        <el-date-picker v-model="form.BookTime" type="datetime" placeholder="选择预定时间" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="付款货币" prop="CurrencyFuKuan">
                        <el-input placeholder="请输入付款货币" v-model="form.CurrencyFuKuan"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款货币" prop="CurrencyShouKuan">
                        <el-input placeholder="请输入收款货币" v-model="form.CurrencyShouKuan"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="应收款额" prop="AmountYingShou">
                        <el-input placeholder="请输入应收款额" v-model="form.AmountYingShou"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="应付款额" prop="AmountYingFu">
                        <el-input placeholder="请输入应付款额" v-model="form.AmountYingFu"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="实收款额" prop="AmountShiShou">
                        <el-input placeholder="请输入实收款额" v-model="form.AmountShiShou"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="实付款额" prop="AmountShiFu">
                        <el-input placeholder="请输入实付款额" v-model="form.AmountShiFu"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="酒店低价" prop="HotelFee">
                        <el-input placeholder="请输入酒店低价" v-model="form.HotelFee"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="利润" prop="Profit">
                        <el-input placeholder="请输入利润" v-model="form.Profit"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="优惠金额" prop="Discounts">
                        <el-input placeholder="请输入优惠金额" v-model="form.Discounts"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="其他费用" prop="OherFee">
                        <el-input placeholder="请输入其他费用" v-model="form.OherFee"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="改期费" prop="FeeChange">
                        <el-input placeholder="请输入改期费" v-model="form.FeeChange"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="退票费" prop="FeeCancel">
                        <el-input placeholder="请输入退票费" v-model="form.FeeCancel"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="佣金" prop="Commission">
                        <el-input placeholder="请输入佣金" v-model="form.Commission"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（付款）" prop="SettlementCycleFu">
                        <el-select v-model="form.SettlementCycleFu">
                          <el-option v-for="item in SCycle" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（收款）" prop="SettlementCycle">
                        <el-select v-model="form.SettlementCycleFu">
                          <el-option v-for="item in SCycle" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="订单状态" prop="OrderState">
                        <el-select v-model="form.OrderState">
                          <el-option v-for="item in OrderState" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型" prop="OrderType">
                        <el-select v-model="form.OrderType">
                          <el-option v-for="item in OrderType" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="酒店预订号" prop="HotelBookingNo">
                        <el-input placeholder="请输入酒店预订号" v-model="form.HotelBookingNo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="5">
                    <el-form-item label="紧急打款" prop="UrgentPay">
                        <el-radio-group v-model="form.UrgentPay">
                          <el-radio :label="1">紧急</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="不可合并支付" prop="UnMergePay">
                        <el-radio-group v-model="form.UnMergePay">
                          <el-radio :label="1">不可合并</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="酒店区域" prop="HotelArea">
                        <el-radio-group v-model="form.HotelArea">
                          <el-radio :label="1">国际</el-radio>
                          <el-radio :label="0">国内</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="回填状态" prop="BackfillState">
                        <el-radio-group v-model="form.BackfillState">
                          <el-radio :label="0">未回填</el-radio>
                          <el-radio :label="1">回传成功</el-radio>
                          <el-radio :label="2">回填失败</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="24">
                <el-col :span="7">
                    <el-form-item label="订单截图状态" prop="StateScreenshot">
                        <el-radio-group v-model="form.StateScreenshot">
                          <el-radio :label="0">未截图</el-radio>
                          <el-radio :label="1">截图完成</el-radio>
                          <el-radio :label="2">不截图</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="保密状态" prop="SecretState">
                        <el-radio-group v-model="form.SecretState">
                          <el-radio :label="0">未处理</el-radio>
                          <el-radio :label="1">已经保密</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="是否保密" prop="Secret">
                        <el-radio-group v-model="form.Secret">
                          <el-radio :label="0">不需要保密</el-radio>
                          <el-radio :label="1">需要保密</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col>
                <el-form-item label="备注" prop="Remark">
                    <el-input type="textarea" v-model="form.Remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24"><el-col :span="3" style="text-align:center;color:orange;"><h1>财务信息</h1></el-col></el-row>
            <el-row :gutter="24">
              <el-col>
                <el-table :data="money" style="width: 90%;margin-left:40px;">
                  <el-table-column label="类别" prop="PaymentType">
                    <template scope="scope">
                        <span v-if="scope.row.PaymentType === 0">收款</span>
                        <span v-if="scope.row.PaymentType === 1">付款</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="货币类型" prop="Currency"></el-table-column>
                  <el-table-column label="编号" prop="PaymentNo"></el-table-column>
                  <el-table-column label="金额" prop="Amount"></el-table-column>
                  <el-table-column label="收付时间" prop="PaymentDate"></el-table-column>
                  <el-table-column label="收付方式" prop="PaymentModel"></el-table-column>
                  <el-table-column label="状态" prop="State">
                    <template scope="scope">
                        <span v-if="scope.row.State === 0">待处理</span>
                        <span v-if="scope.row.State === 1">已处理，待对账</span>
                        <span v-if="scope.row.State === 2">已对账，待结算</span>
                        <span v-if="scope.row.State === 3">结算完成</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="截图" prop="StateScreenshot">
                    <template scope="scope">
                        <span v-if="scope.row.StateScreenshot === 0">未截图</span>
                        <span v-if="scope.row.StateScreenshot === 1">截图完成</span>
                        <span v-if="scope.row.StateScreenshot === 2">不截图</span>
                    </template>
                  </el-table-column>                  
                </el-table>
              </el-col>
            </el-row>
            <el-row :gutter="24"><el-col :span="3" style="text-align:center;color:orange;"><h1>截图信息</h1></el-col></el-row>
            <el-row :gutter="20">
              <el-col style="margin-left:40px;">
                <el-upload :action="action" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showDialog = false">取 消</el-button>
            <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import { hotelsOrderApi,paymentCheckApi } from 'api'

export default {
  data() {
    return {
      action:'',
      dialogImageUrl: '',
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      hotelsOrder: [],
      form: {
        StayDateStart:'',
        StayDateEnd:'',
        DateTime:'',
        OrderState:'',
        OrderType:'',
        UrgentPay:'',
        UnMergePay:'',
        HotelArea:'',
        BackfillState:'',
        StateScreenshot:''
      },
      copyForm: {},
      showDialog: false,
      isEditable: true,
      active: 0,
      checkList:[],
      remsgstateList: [],
      oderstateList: [],
      active: 0,
      ID: '',
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      OrderState:['未处理','已处理','已拒绝','未处理+未发单','待排房','风险订单+未处理','风险订单+已处理'],
      OrderType:['新订','修改','取消','延住','无效','新订+修改','改期'],
      money:[],
      fujia:{},
      SCycle:['单结','周结','月结']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async getStateList() {
      const _self = this
      _self.remsgstateList = []
      _self.oderstateList = []
      const res = await hotelsOrderApi.getState()
      let d = res.data.Data
      for (let i in d) {
        if (d[i].FCode == 'remsgstate') {
          _self.remsgstateList.push(d[i].Name)
        }
        if (d[i].FCode == 'oderstate') {
          _self.oderstateList.push(d[i].Name)
        }
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    searchCallback(filters) {
      this.filters = filters
      this.fetchData()
    },
    async fetchData(currentPage, pageSize) {
      const _self = this
      _self.loading = true
      _self.currentPage = currentPage || _self.currentPage
      _self.pageSize = pageSize || _self.pageSize
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'BookTime'
      }
      try {
        const res = await hotelsOrderApi.check(options)
        _self.hotelsOrder = res.data.Data
        _self.active = 0
        _self.count = res.data.Count
        _self.loading = false
      } catch (e) {
        _self.loading = false
      }
    },
    async clickEditBtn($index, row) {
      const _self = this
      try {
        _self.showDialog = true
        const res = await hotelsOrderApi.detail(row.ID)
        _self.form = res.data.Data
        const res2 = await paymentCheckApi.detail(row.ID)
        let a = res2.data.Data
        for(let i in a){
          _self.money.push(a[i].HotelPayment)
        }
        _self.copyForm = Object.assign({}, _self.form)
        _self.getStateList()
        _self.action = 'http://192.168.10.95:8500/Hotel/Image'
      } catch (e) {
        console.error(e)
      }
    },
    async submitForm() {
      const _self = this
      const form = {}
      for (let [k, v] of Object.entries(_self.form)) {
        if (_self.form[k] != _self.copyForm[k]) {
          form[k] = v
        }
      }
      try {
        _self.isEditable = false
        await hotelsOrderApi.edit(_self.form.ID, form)
        _self.fetchData()
        _self.showDialog = false
        _self.$message({
          message: '编辑成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
        _self.$message.error('编辑失败!!!')
      } finally {
        _self.isEditable = true
      }
    },
    async check($index,row){
        const _self = this
        try {
            await hotelsOrderApi.check2(row.ID)
            _self.$message({
                message: '审核成功',
                type: 'success'
            })
        } catch (e) {
            console.error(e)
            _self.$message.error('审核失败!!!')
        } 
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>
<style lang="scss">
#HotelsOrder{
    .pagination-wrapper{
      text-align: center;
      margin: 10px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 132px;
        height: 132px;
        line-height: 132px;
        text-align: center;
    }
    .avatar {
        width: 132px;
        height: 132px;
        display: block;
    }
}
</style>
