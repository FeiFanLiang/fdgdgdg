<template lang="html">
<div id="HotelsOrder">
    <el-row :gutter="24">
        <el-col :span="4">
          <el-input  placeholder="请输入酒店名称" v-model="filters.HotelName"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input  placeholder="请输入城市名称" v-model="filters.City"></el-input>
        </el-col>
        <el-col :span="5">
            <el-date-picker  v-model="filters.CreateTime" type="daterange" align="right" placeholder="选择预约日期" :picker-options="pickerOptions"></el-date-picker>
        </el-col>
        <el-col :span="5">
          <el-select v-model="testValue" placeholder="区域">
      <el-option
        v-for="item in ['日本']"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
        </el-col>

        <el-col  :span="6">
            <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
            <el-button type="primary" @click="clickAddBtn">创建</el-button>
        </el-col>
    </el-row>
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading" @expand="expand" border row-key="ID" :expand-row-keys="expandRowKeys">
        <el-table-column type="expand">
            <template scope="props">
              <!-- <div>
                <h4 style="color:orange;">当前步骤流程</h4>
                <el-steps :space="100" :active="active" finish-status="success">
                    <el-step title="审核"></el-step>
                    <el-step title="打款"></el-step>
                    <el-step title="提交"></el-step>
                    <el-step title="截图"></el-step>
                </el-steps>
              </div> -->
              <div>
                <el-card class="box-card">
                    <h4>预订其他信息</h4>
                    <p><span>联系固话</span><span class="span-text">{{ props.row.PassengerTel2 }}</span></p>
                    <p><span>Email</span><span class="span-text">{{ props.row.Email }}</span></p>
                    <p><span>特殊要求</span><span class="span-text">{{ props.row.PassengerAsk }}</span></p>
                    <p><span>政策ID</span><span class="span-text">{{ props.row.HotelPolicyID }}</span></p>
                    <p><span>订单标题</span><span class="span-text">{{ props.row.OrderTitle }}</span></p>
                    <p><span>其他订单号</span><span class="span-text">{{ props.row.PlatOrderNo }}</span></p>
                    <p><span>其他订单状态</span><span class="span-text">{{ props.row.PlatOrderState }}</span></p>
                    <p><span>其他订单类型</span><span class="span-text">{{ props.row.PlatOrderType }}</span></p>
                    <p><span>来源订单ID</span><span class="span-text">{{ props.row.FromID }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <h4>财务付款</h4>
                    <p><span>付款货币</span><span class="span-text">{{ props.row.CurrencyFuKuan }}</span></p>
                    <p><span>收款货币</span><span class="span-text">{{ props.row.CurrencyShouKuan }}</span></p>
                    <p><span>应收款额</span><span class="span-text">{{ props.row.AmountYingShou }}</span></p>
                    <p><span>实收款额</span><span class="span-text">{{ props.row.AmountShiShou }}</span></p>
                    <p><span>应付款额</span><span class="span-text">{{ props.row.AmountYingFu }}</span></p>
                    <p><span>实付款额</span><span class="span-text">{{ props.row.AmountShiFu }}</span></p>
                    <p><span>酒店低价</span><span class="span-text">{{ props.row.HotelFee }}</span></p>
                    <p><span>利润</span><span class="span-text">{{ props.row.Profit }}</span></p>
                    <p><span>优惠金额</span><span class="span-text">{{ props.row.Discounts }}</span></p>
                    <p><span>其他费用</span><span class="span-text">{{ props.row.OherFee }}</span></p>
                    <p><span>改期费</span><span class="span-text">{{ props.row.FeeChange }}</span></p>
                    <p><span>退票费</span><span class="span-text">{{ props.row.FeeCancel }}</span></p>
                    <p><span>佣金</span><span class="span-text">{{ props.row.Commission }}</span></p>
                    <p><span>手续费</span><span class="span-text">{{ props.row.Fee }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <h4>订单状态、发单信息</h4>
                    <p><span>订单状态</span><span class="span-text">{{ props.row.OrderState }}</span></p>
                    <p><span>订单类型</span><span class="span-text">{{ props.row.OrderType }}</span></p>
                    <p><span>酒店预定号</span><span class="span-text">{{ props.row.HotelBookingNo }}</span></p>
                    <h4>外采、关联消息</h4>
                    <p><span>外采类型</span><span class="span-text">{{ props.row.WaiCaiType }}</span></p>
                    <p><span>外采编号</span><span class="span-text">{{ props.row.WaiCaiNo }}</span></p>
                    <p><span>关联订单</span><span class="span-text">{{ props.row.POrderID }}</span></p>
                    <h4>其他信息</h4>
                    <p><span>最后抓取时间</span><span class="span-text">{{ props.row.GrabberTimeLast }}</span></p>
                    <p><span>抓取的渠道</span><span class="span-text">{{ props.row.FetchChannel }}</span></p>
                    <p><span>第三方平台ID</span><span class="span-text">{{ props.row.ThreePlatID }}</span></p>
                    <p><span>是否保密</span><span class="span-text" v-if="props.row.Secret === 0">不需要保密</span><span class="span-text" v-if="props.row.Secret === 1">需要保密</span></p>
                    <p><span>保密状态</span><span class="span-text" v-if="props.row.SecretState === 0">未处理</span><span class="span-text" v-if="props.row.SecretState === 1">已经保密</span></p>
                    <p><span>结算周期</span><span class="span-text">{{ props.row.SettlementCycle }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <h4>财务、对账信息、操作流程</h4>
                    <p><span>审核状态</span><span class="span-text" v-if="props.row.StateAuditor === 1">审核</span><span class="span-text" v-if="props.row.StateAuditor === 2">结束</span></p>
                    <p><span>付款状态</span><span class="span-text" v-if="props.row.StateFuKuan === 0">未付</span><span class="span-text" v-if="props.row.StateFuKuan === 1">已付款</span></p>
                    <p><span>收款状态</span><span class="span-text" v-if="props.row.StateShouKuan === 1">完成</span></p>
                    <p><span>对账付款</span><span class="span-text" v-if="props.row.StateCheckFuKuan === 1">完成</span></p>
                    <p><span>对账收款</span><span class="span-text" v-if="props.row.StateCheckShouKuan === 1">完成</span></p>
                    <p><span>审核对账</span><span class="span-text" v-if="props.row.StateCheckEnd === 1">平</span></p>
                    <p><span>紧急打款</span><span class="span-text" v-if="props.row.UrgentPay === 1">紧急</span></p>
                    <p><span>不可合并支付</span><span class="span-text" v-if="props.row.UnMergePay === 1">不可合并</span></p>
                </el-card>
              </div>
              <div>
                <el-card class="box-card2">
                    <img :src="imageUrl" width="132px" height="132px" style="display:inline-block" v-if="imageUrl"/>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" style="display:inline-block">
                        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="action"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        :on-success="handleSuccess" show-file-list>
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload> -->
                </el-card>
              </div>
            </template>
        </el-table-column>

        <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="订单类型" prop="OrderType" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="城市" prop="City"></el-table-column>
        <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
          <template scope="scope">
            <span>{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
            <span>{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
     </template>
        </el-table-column>
        <!-- <el-table-column label="退房日期" prop="StayDateEnd"></el-table-column> -->
        <el-table-column label="间/晚" prop="RoomNum">
          <template scope="scope">
            <span>{{ scope.row.RoomNum }}</span>/
            <span>{{ scope.row.NightNum }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="晚数" prop="NightNum"></el-table-column> -->
        <el-table-column label="入住人" prop="Passenger"></el-table-column>
        <el-table-column label="联系电话" prop="PassengerTel" width="128"></el-table-column>
        <!-- <el-table-column label="联系固话" prop="PassengerTel2"></el-table-column> -->
        <el-table-column label="到店时间" prop="ArrivalTime"></el-table-column>
        <el-table-column label="预定时间" prop="BookTime" width="80">
            <template scope="scope">
                <span>{{ scope.row.BookTime.substring(5,16) }}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="货币" prop="Currency"></el-table-column>
        <el-table-column label="总金额" prop="AmountTotal"></el-table-column>
        <el-table-column label="订单状态" prop="OrderState"></el-table-column> -->

        <el-table-column label="操作" width="140">
            <template scope="scope">
                <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <DeleteButton api="hotelsOrderApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')">
        <el-form ref="form" :model="form" label-width="110px">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="酒店名称" prop="HotelName">
                        <el-input placeholder="请输入酒店名称" v-model="form.HotelName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="房型" prop="Room">
                        <el-input placeholder="请输入房型" v-model="form.Room"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="间数" prop="RoomNum">
                        <el-input placeholder="请输入间数" v-model="form.RoomNum" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="晚数" prop="NightNum">
                        <el-input placeholder="请输入晚数" v-model="form.NightNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="入住日期" prop="StayDateStart">
                        <el-date-picker v-model="form.StayDateStart" type="datetime" placeholder="选择日期时间" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="退房日期" prop="StayDateEnd">
                        <el-input placeholder="请输入退房日期" v-model="form.StayDateEnd"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="入住人" prop="Passenger">
                        <el-input placeholder="请输入入住人" v-model="form.Passenger"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="PassengerTel">
                        <el-input placeholder="请输入酒店名称" v-model="form.PassengerTel"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="特殊要求" prop="PassengerAsk">
                        <el-input type="textarea" v-model="form.PassengerAsk"></el-input>
                    </el-form-item>
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
import { hotelsOrderApi } from 'api'

export default {
  data() {
    return {
      testValue: '日本',
      imageUrl: '',
      imageUrl2: '',
      action: '',
      fileList: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      hotelsOrder: [],
      form: {},
      copyForm: {},
      showDialog: false,
      isEditable: true,
      title: '',
      active: 0,
      filters: {
        HotelName: '',
        City: '',
        CreateTime: ['', '']
      },
      remsgstateList: [],
      oderstateList: [],
      active: 0,
      ID: '',
      expandRowKeys: [],
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
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    hotelsOrderSearch() {
      const _self = this
      _self.fetchData()
    },
    expand(row, expanded) {
      const _self = this
      _self.active = 0
      _self.imageUrl = ''
      if (expanded) {
        _self.action =
          'http://liukai.iok.la/Hotel/HotelOrder/UploadPic/' + row.OrderID
        if (row.Screenshot) {
          _self.imageUrl =
            'http://liukai.iok.la/Upload/hotelorder/' + row.Screenshot
        }
        _self.expandRowKeys.length = 0
        _self.expandRowKeys.push(row.ID)
        _self.ID = row.ID
        if (row.StateAuditor == '已审核') {
          _self.active = 1
        }
        if (row.StateAuditor == '已提交') {
          _self.active = 2
        }
        if (row.StateAuditor == '已打款') {
          _self.active = 3
        }
        if (row.StateAuditor == '已截图') {
          _self.active = 4
        }
      }
    },
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
      let query = {}
      if (_self.filters.CreateTime[0] && _self.filters.CreateTime[1]) {
        let d1 = new Date(_self.filters.CreateTime[0])
        let d2 = new Date(_self.filters.CreateTime[1])

        let d11 =
          d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate()
        let d22 =
          d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate()
        query = {
          HotelName: _self.filters.HotelName,
          City: _self.filters.City,
          'CreateTime>': d11,
          'CreateTime<': d22
        }
      } else {
        query = {
          HotelName: _self.filters.HotelName,
          City: _self.filters.City
        }
      }

      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'ID',
        query: query
      }
      try {
        const res = await hotelsOrderApi.listByQuery(options)
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
        _self.form.ID = row.ID
        _self.form.HotelName = row.HotelName
        _self.form.Room = row.Room
        _self.form.RoomNum = row.RoomNum
        _self.form.NightNum = row.NightNum
        _self.form.StayDateStart = row.StayDateStart
        _self.form.StayDateEnd = row.StayDateEnd
        _self.form.Passenger = row.Passenger
        _self.form.PassengerTel = row.PassengerTel
        _self.form.PassengerAsk = row.PassengerAsk
        _self.copyForm = Object.assign({}, _self.form)
        _self.getStateList()
      } catch (e) {
        console.error(e)
      }
    },
    async clickAddBtn() {
      const _self = this
      _self.title = '添加酒店订单信息'
      _self.showDialog = true
      _self.form = {}
      _self.getStateList()
    },
    submitForm() {
      const _self = this
      if (_self.form.ID) {
        _self.editSave()
      } else {
        _self.addSave()
      }
    },
    async addSave() {
      const _self = this
      /* _self.$refs['form'].validate(async valid => {
                if (valid) { */
      try {
        _self.isEditable = false
        await hotelsOrderApi.add(_self.form)
        _self.fetchData()
        //_self.$refs['form'].resetFields()
        _self.showDialog = false
        _self.$message({
          message: '保存成功',
          type: 'success'
        })
      } catch (e) {
        _self.$message.error('添加失败!!!')
      } finally {
        _self.isEditable = true
      }
      /* } else {
                return false
                }
            }) */
    },
    async editSave() {
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    /* submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }, */
    async handleSuccess(response, file, fileList) {
      console.log(file)
      this.imageUrl2 = URL.createObjectURL(file.raw)
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
    .demo-table-expand{
        .el-col{
            height: 32px;
            text-align: center;
            border-right: 1px solid lightgrey;
            color:orange
        }
    }
    .el-card {
        background-color: #fbfdff;
        box-shadow: none;
    }
    .box-card{
        width:24.7%;
        height:50rem;
        display:inline-block;
    }
    .span-text{
        margin-left:20px;
        color:orange;
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
