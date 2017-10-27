<template lang="html">
<div id="HotelsOrder">
    <el-form label-width="80px">
      <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="订单编号">
              <el-input v-model="filters.OrderNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="酒店名称">
              <el-input v-model="filters.HotelName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="客人姓名">
              <el-input v-model="filters.Passenger"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="订单平台">
              <el-select v-model="filters.ThreePlatID" clearable>
                <el-option v-for="item in ThreePlatID" :key="item.ID" :label="item.PlatName" :value="item.ID"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="结款方式">
              <el-select v-model="filters.SettlementCycle" clearable>
                <el-option v-for="item in SettlementCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
           <el-col :span="6">
            <el-form-item label="入住日期">
              <el-date-picker  v-model="filters.StayDateStart" type="date"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预定日期">
              <el-date-picker  v-model="filters.BookTime" type="daterange"></el-date-picker>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="确认号">
              <el-input v-model="filters.HotelBookingNoNeed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款账户">
              <el-select v-model="filters.CompanyAcount" clearable>
                <el-option v-for="item in CompanyAcount" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="酒店区域">
              <el-select v-model="filters.HotelArea" clearable>
                <el-option v-for="item in HotelArea" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="24">
          <el-form-item label="筛选条件">
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="已审核未打款"></el-checkbox>
                <el-checkbox label="未审核"></el-checkbox>
                <!-- <el-checkbox label="有联系方式"></el-checkbox>
                <el-checkbox label="需要打款"></el-checkbox>
                <el-checkbox label="已打款"></el-checkbox> -->
                <el-checkbox label="紧急打款"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="10">
            <el-button type="primary" @click="clickAddBtn">添加新订单</el-button>
            <el-button type="primary" @click="hotelsOrderSearch(filters)">搜索</el-button>
        </el-col>
        <el-col :span="14" style="text-align:right;">
          <el-tag style="background-color:#FD5921;margin:0 10px;">单结</el-tag>
          <!-- <el-tag style="background-color:#FD1393">日结</el-tag> -->
          <el-tag style="background-color:#1297E8;margin:0 10px;">周结</el-tag>
          <!-- <el-tag style="background-color:#A127BE">半月结</el-tag> -->
          <el-tag style="background-color:#20A228;margin:0 10px;">月结</el-tag>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading" @expand="expand" border
      :expand-row-keys="expandRowKeys" :default-sort = "{prop: 'BookTime', order: 'descending'}" row-key="ID">
        <el-table-column type="expand">
            <template scope="props">
              <div>
                <el-card class="box-card">
                    <h4>预订其他信息</h4>
                    <p><span>联系电话</span><span class="span-text">{{ props.row.PassengerTel }}</span></p>
                    <p><span>联系固话</span><span class="span-text">{{ props.row.PassengerTel2 }}</span></p>
                    <p><span>Email</span><span class="span-text">{{ props.row.Email }}</span></p>
                    <p><span>特殊要求</span><span class="span-text">{{ props.row.PassengerAsk }}</span></p>
                    <p><span>政策ID</span><span class="span-text">{{ props.row.HotelPolicyID }}</span></p>
                    <p><span>订单标题</span><span class="span-text">{{ props.row.OrderTitle }}</span></p>
                    <p><span>订单号</span><span class="span-text">{{ props.row.PlatOrderNo }}</span></p>
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
                    <p><span>酒店底价</span><span class="span-text">{{ props.row.HotelFee }}</span></p>
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
                    <p><span>订单状态</span>
                        <span class="span-text" v-if="props.row.OrderState == 0">未处理</span>
                        <span class="span-text" v-if="props.row.OrderState == 1">已处理</span>
                        <span class="span-text" v-if="props.row.OrderState == 2">已拒绝</span>
                        <span class="span-text" v-if="props.row.OrderState == 3">未处理+未发单</span>
                        <span class="span-text" v-if="props.row.OrderState == 4">待排房</span>
                        <span class="span-text" v-if="props.row.OrderState == 5">风险订单</span>
                        <span class="span-text" v-if="props.row.OrderState == 6">风险订单+未处理</span>
                        <span class="span-text" v-if="props.row.OrderState == 7">风险订单+已处理</span>
                    </p>
                    <p><span>订单类型</span>
                        <span class="span-text" v-if="props.row.OrderType == 0">新订</span>
                        <span class="span-text" v-if="props.row.OrderType == 1">修改</span>
                        <span class="span-text" v-if="props.row.OrderType == 2">取消</span>
                        <span class="span-text" v-if="props.row.OrderType == 3">延住</span>
                        <span class="span-text" v-if="props.row.OrderType == 4">无效</span>
                        <span class="span-text" v-if="props.row.OrderType == 5">新订+修改</span>
                        <span class="span-text" v-if="props.row.OrderType == 6">改期</span>
                    </p>
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
                    <p><span>结算周期</span>
                        <span class="span-text" v-if="props.row.SettlementCycle == 0">单结</span>
                        <span class="span-text" v-if="props.row.SettlementCycle == 1">周结</span>
                        <span class="span-text" v-if="props.row.SettlementCycle == 2">月结</span>
                    </p>
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
                    <br>
                    <p><span>酒店区域</span>
                        <span class="span-text" v-if="props.row.HotelArea === 1">国际</span>
                        <span class="span-text" v-if="props.row.HotelArea === 0">国内</span>
                        <span class="span-text" v-if="props.row.HotelArea === 2">美国</span>
                    </p>
                    <p>
                      <span>回填状态</span>
                      <span class="span-text" v-if="props.row.BackfillState === 0">未回填</span>
                      <span class="span-text" v-if="props.row.BackfillState === 1">回传成功</span>
                      <span class="span-text" v-if="props.row.BackfillState === 2">回填失败</span>
                    </p>
                    <p>
                      <span>订单截图状态</span>
                      <span class="span-text" v-if="props.row.StateScreenshot === 0">未截图</span>
                      <span class="span-text" v-if="props.row.StateScreenshot === 1">截图完成</span>
                      <span class="span-text" v-if="props.row.StateScreenshot === 2">不截图</span>
                    </p>
                    <p><span>锁定</span><span class="span-text" v-if="props.row.LockState === 1">锁定</span></p>
                </el-card>
              </div>
</template>
        </el-table-column>
        <!-- <el-table-column label="ID" prop="ID"></el-table-column> -->
        <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip>
            <template scope="scope">
              <span v-if="scope.row.SettlementCycle == 0" style="color:#FD5921">{{ scope.row.OrderNo }}</span>
              <span v-if="scope.row.SettlementCycle == 1" style="color:#1297E8">{{ scope.row.OrderNo }}</span>
              <span v-if="scope.row.SettlementCycle == 2" style="color:#20A228">{{ scope.row.OrderNo }}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="订单类型" prop="OrderType" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="城市" prop="City" width="70"></el-table-column>
        <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
<template scope="scope">
<span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>
/
<span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
</template>
        </el-table-column>
        <!-- <el-table-column label="退房日期" prop="StayDateEnd"></el-table-column> -->
        <el-table-column label="间/晚" prop="RoomNum" width="72">
<template scope="scope">
<span>{{ scope.row.RoomNum }}</span>
/
<span>{{ scope.row.NightNum }}</span>
</template>
        </el-table-column>
        <!-- <el-table-column label="晚数" prop="NightNum"></el-table-column> -->
        <el-table-column label="入住人" prop="Passenger" show-overflow-tooltip></el-table-column>
        <!-- <el-table-column label="联系电话" prop="PassengerTel" width="128"></el-table-column> -->
        <!-- <el-table-column label="联系固话" prop="PassengerTel2"></el-table-column> -->
        <el-table-column label="到店时间" prop="ArrivalTime"></el-table-column>
        <el-table-column label="预定时间" prop="BookTime" width="80" sortable>
<template scope="scope">
<span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
</template>
        </el-table-column>
        <!-- <el-table-column label="货币" prop="Currency"></el-table-column>
        <el-table-column label="总金额" prop="AmountTotal"></el-table-column>
        <el-table-column label="订单状态" prop="OrderState"></el-table-column> -->

        <el-table-column label="操作" width="150">
<template scope="scope">
<el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
  编辑</el-button>
<DeleteButton api="hotelsOrderApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')" size="full">
        <el-form ref="form" :model="form" label-width="110px">
            <el-row :gutter="24"><el-col :span="24" style="color:orange;"><h1>订单信息</h1></el-col></el-row>
            <el-row :gutter="24">
              <el-col :span="6">
                    <el-form-item label="订单号" prop="PlatOrderNo">
                        <el-input placeholder="请输入订单号" v-model="form.PlatOrderNo"></el-input>
                    </el-form-item>
              </el-col>
              <el-col :span="6">
                    <el-form-item label="订单平台" prop="ThreePlatID">
                        <el-select v-model="form.ThreePlatID" clearable>
                          <el-option v-for="item in ThreePlatID" :key="item.ID" :label="item.PlatName" :value="item.ID"></el-option>
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
              <el-col :span="6">
                    <el-form-item label="入住日期" prop="StayDateStart">
                        <el-date-picker v-model="form.StayDateStart" type="date" placeholder="选择入住日期" style="width:100%;" :picker-options="pickerOptions" @change="ruzhu"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="退房日期" prop="StayDateEnd">
                        <el-date-picker v-model="form.StayDateEnd" type="date" placeholder="选择退房日期" style="width:100%;" :picker-options="pickerOptions2" @change="tuifang"></el-date-picker>
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
                        <el-time-select v-model="form.ArrivalTime" :picker-options="{start:'00:00',step:'00:15',end:'24:00'}" placeholder="选择时间"></el-time-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="特殊要求" prop="PassengerAsk">
                        <el-input type="textarea" v-model="form.PassengerAsk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单状态" prop="OrderState">
                        <el-select v-model="form.OrderState" clearable>
                          <el-option v-for="item in OrderState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型" prop="OrderType">
                        <el-select v-model="form.OrderType" clearable>
                          <el-option v-for="item in OrderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
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
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
            <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>财务信息</h1></el-col></el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="付款货币" prop="CurrencyFuKuan">
                        <el-select v-model="form.CurrencyFuKuan" clearable>
                          <el-option v-for="item in Currency" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="收款货币" prop="CurrencyShouKuan">
                        <el-select v-model="form.CurrencyShouKuan" clearable>
                          <el-option v-for="item in Currency" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
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
                    <el-form-item label="酒店底价" prop="HotelFee">
                        <el-input placeholder="请输入酒店底价" v-model="form.HotelFee"></el-input>
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
                    <el-form-item label="优惠金额" prop="Discounts">
                        <el-input placeholder="请输入优惠金额" v-model="form.Discounts"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="佣金" prop="Commission">
                        <el-input placeholder="请输入佣金" v-model="form.Commission"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（付）" prop="SettlementCycleFu">
                        <el-select v-model="form.SettlementCycleFu" clearable>
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（收）" prop="SettlementCycle">
                        <el-select v-model="form.SettlementCycle" clearable>
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
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
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
            <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>处理信息</h1></el-col></el-row>
            <el-row :gutter="24">
            <el-col :span="7">
                  <el-form-item label="回填状态" prop="BackfillState">
                      <el-radio-group v-model="form.BackfillState">
                        <el-radio :label="0">未回填</el-radio>
                        <el-radio :label="1">回填成功</el-radio>
                        <el-radio :label="2">回填失败</el-radio>
                      </el-radio-group>
                  </el-form-item>
              </el-col>
              <el-col :span="7">
                  <el-form-item label="酒店区域" prop="HotelArea">
                      <el-radio-group v-model="form.HotelArea">
                        <el-radio :label="1">国际</el-radio>
                        <el-radio :label="0">国内</el-radio>
                        <el-radio :label="3">美国</el-radio>
                      </el-radio-group>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
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
                    <el-form-item label="紧急打款" prop="UrgentPay">
                        <el-radio-group v-model="form.UrgentPay">
                          <el-radio :label="1">紧急</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="不可合并支付" prop="UnMergePay">
                        <el-radio-group v-model="form.UnMergePay">
                          <el-radio :label="1">不可合并</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
            <div v-show="showEdit">
            <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>财务信息</h1></el-col></el-row>
            <el-row :gutter="24">
              <el-col>
                <el-table :data="money" style="width: 95%;margin-left:40px;">
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
            </div>
            <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>截图信息</h1></el-col></el-row>
            <el-row :gutter="20">
              <el-col style="margin-left:40px;">
                <!-- <el-upload :action="action" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                  <i class="el-icon-plus"></i>
                </el-upload> -->
                <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
                <el-dialog v-model="dialogVisible" size="tiny">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
              </el-col>
            </el-row>
            <div v-show="showEdit">
            <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>附加项目</h1></el-col></el-row>
            <div style="text-align:right;width:95%;margin-top:-30px;">
              <el-button @click="addFujia">添加</el-button>
            </div>
            <el-row :gutter="24">
              <el-col>
                <el-table :data="fujia" style="width: 95%;margin-left:40px;">
                  <el-table-column label="订单类型" prop="TypeID">
<template scope="scope">
<span v-if="scope.row.TypeID === 0">门票</span>
<span v-if="scope.row.TypeID === 1">车票</span>
<span v-if="scope.row.TypeID === 2">自助餐</span>
</template>
                  </el-table-column>
                  <el-table-column label="金额" prop="Money"></el-table-column>
                  <el-table-column label="创建时间" prop="CreateDate"></el-table-column>
                  <!-- <el-table-column label="来源" prop="PlateName"></el-table-column>
                  <el-table-column label="订单编号" prop="PlateOrderNo"></el-table-column>
                  <el-table-column label="使用时间" prop="UseDate"></el-table-column> -->
                  <!-- <el-table-column label="创建人" prop="UserID"></el-table-column> -->
                </el-table>
              </el-col>
            </el-row>
            </div>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="showDialog = false" size="large">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable" size="large">{{isEditable?'确 定':'提交中'}}</el-button>
        </div>
    </el-dialog>

    <el-dialog title="添加附加项目" v-model="showFujia" @close="resetForm('form2')" size="tiny">
      <el-form ref="form2" :model="form2" label-width="110px">
        <el-form-item label="订单ID" prop="HotelOrderID">
            <el-input placeholder="请输入订单ID" v-model="form2.HotelOrderID" style="width:100%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="Money">
            <el-input placeholder="请输入金额" v-model="form2.Money" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="PlateName">
            <el-input placeholder="请输入来源" v-model="form2.PlateName" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="订单编号" prop="PlateOrderNo">
            <el-input placeholder="请输入订单编号" v-model="form2.PlateOrderNo" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="使用时间" prop="UseDate">
            <el-date-picker v-model="form2.UseDate" type="date" placeholder="选择使用时间" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单类型" prop="TypeID">
            <el-select v-model="form2.TypeID" clearable>
              <el-option v-for="item in TypeID" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="CreateDate">
            <el-input placeholder="请输入创建时间" v-model="form2.CreateDate" style="width:100%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="form2.Remark" style="width:100%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showFujia = false">取 消</el-button>
        <el-button type="primary" @click="submitForm2()">保存</el-button>
      </span>
    </el-dialog>
</div>
</template>

<script>
import {
  hotelsOrderApi,
  paymentCheckApi,
  hotelThreePlatInfoApi,
  hotelImageApi
} from 'api'
import UploadImage from 'components/upload-image'

export default {
  components: {
    UploadImage
  },
  data() {
    let that = this;
    return {
      imageList: [],
      action: '',
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      hotelsOrder: [],
      form: {
        StayDateStart: '',
        StayDateEnd: '',
        BookTime: '',
        OrderState: '',
        OrderType: '',
        UrgentPay: '',
        UnMergePay: '',
        HotelArea: '',
        BackfillState: '',
        StateScreenshot: '',
        SettlementCycle: '',
        SettlementCycleFu: '',
        ThreePlatID: '',
        OrderNo: '',
        NightNum: '',
        RoomNum: '',
        CurrencyFuKuan: '',
        CurrencyShouKuan: ''
      },
      copyForm: {},
      showFujia: false,
      showDialog: false,
      showEdit: false,
      isEditable: true,
      title: '',
      active: 0,
      filters: {
        OrderNo: '',
        HotelName: '',
        Passenger: '',
        BookTime: '',
        StayDateStart: '',
        ThreePlatID: '',
        SettlementCycle: '',
        HotelBookingNoNeed: '',
        CompanyAcount: '',
        HotelArea: '',
        StateAuditor: '',
        StateFuKuan: '',
        UrgentPay: '',
        SecretState: '',
        Secret: ''
      },
      checkList: [],
      remsgstateList: [],
      oderstateList: [],
      active: 0,
      ID: '',
      expandRowKeys: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(that.form.StayDateStart).getTime();
        }
      },
      ThreePlatID: [],
      SettlementCycle: [{
          label: '全部',
          value: ''
        },
        {
          label: '单结',
          value: 0
        },
        // {
        //   label: '日结',
        //   value: '日结'
        // },
        {
          label: '周结',
          value: 1
        },
        // {
        //   label: '半月结',
        //   value: '半月结'
        // },
        {
          label: '月结',
          value: 2
        },
      ],
      CompanyAcount: [{
          label: '全部',
          value: ''
        },
        {
          label: '惠和',
          value: '惠和'
        },
        {
          label: '奥讯',
          value: '奥讯'
        }
      ],
      HotelArea: [{
          label: '全部',
          value: ''
        },
        {
          label: '国内',
          value: 0
        },
        {
          label: '国际',
          value: 1
        },
        {
          label: '美国',
          value: 2
        }
      ],
      styleObject: {},
      OrderState: [{
          label: '未处理',
          value: 0
        },
        {
          label: '已处理',
          value: 1
        },
        {
          label: '已拒绝',
          value: 2
        },
        {
          label: '未处理+未发单',
          value: 3
        },
        {
          label: '待排房',
          value: 4
        },
        {
          label: '风险订单+未处理',
          value: 5
        },
        {
          label: '风险订单+已处理',
          value: 6
        },
      ],
      OrderType: [{
          label: '新订',
          value: 0
        },
        {
          label: '修改',
          value: 1
        },
        {
          label: '取消',
          value: 2
        },
        {
          label: '延住',
          value: 3
        },
        {
          label: '无效',
          value: 4
        },
        {
          label: '新订+修改',
          value: 5
        },
        {
          label: '改期',
          value: 6
        },
      ],
      money: [],
      fujia: [],
      SCycle: [{
          label: '单结',
          value: 0
        },
        {
          label: '周结',
          value: 1
        },
        {
          label: '月结',
          value: 2
        },
      ],
      form2: {
        UseDate: '',
        TypeID: '',
        HotelOrderID: ''
      },
      TypeID: [{
          label: '门票',
          value: 0
        },
        {
          label: '车票',
          value: 1
        },
        {
          label: '自助餐',
          value: 2
        },
      ],
      Currency: [{
          label: 'CNY',
          value: 'CNY'
        },
        {
          label: 'USD',
          value: 'USD'
        },
        {
          label: 'JPY',
          value: 'JPY'
        },
      ]
    }
  },
  created() {
    this.fetchData()
    this.ThreePlat()
  },
  methods: {
    async ThreePlat() {
      const res = await hotelThreePlatInfoApi.getList()
      this.ThreePlatID = res.data
    },
    ruzhu(val) {
      this.form.StayDateStart = val
      if(this.form.StayDateEnd != ''){
        let date1= new Date(val);  //开始时间  
        let date2 = new Date(this.form.StayDateEnd);    //结束时间  
        let date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数        
        let days=Math.floor(date3/(24*3600*1000))
        this.form.RoomNum = 1
        this.form.NightNum = days
      }
    },
    tuifang(val) {
      this.form.StayDateEnd = val
      if(this.form.StayDateStart != ''){
        let date1= new Date(this.form.StayDateStart);  //开始时间  
        let date2 = new Date(val);   //结束时间  
        let date3 = date2.getTime() - new Date(date1).getTime();   //时间差的毫秒数        
        let days=Math.floor(date3/(24*3600*1000))  
        this.form.RoomNum = 1
        this.form.NightNum = days
      }
    },
    hotelsOrderSearch() {
      const _self = this
      _self.fetchData()
    },
    expand(row, expanded) {
      const _self = this
      _self.active = 0
      if (expanded) {
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
      _self.filters.StateAuditor = ''
      _self.filters.StateFuKuan = ''
      _self.filters.UrgentPay = ''
      for (let item in _self.checkList) {
        if (_self.checkList[item] == '已审核未打款') {
          _self.filters.StateAuditor = 2
          _self.filters.StateFuKuan = 0
        }
        if (_self.checkList[item] == '未审核') {
          _self.filters.StateAuditor = 1
        }
        if (_self.checkList[item] == '紧急打款') {
          _self.filters.UrgentPay = 1
        }
      }
      let d11 = ''
      let d22 = ''
      if (_self.filters.BookTime[0] != null) {
        let d1 = new Date(_self.filters.BookTime[0])
        let d2 = new Date(_self.filters.BookTime[1])
        d11 =
          d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate()
        d22 =
          d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate()
      }
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: 'BookTime',
        desc:true,
        query: { 
          OrderNo:_self.filters.OrderNo,
          HotelName:_self.filters.HotelName,
          Passenger:_self.filters.Passenger,
          'BookTime>': d11,
          'BookTime<': d22,
          StayDateStart: new Date(_self.filters.StayDateStart).Format('yyyy-MM-dd'),
          ThreePlatID: _self.filters.ThreePlatID,
          SettlementCycle: _self.filters.SettlementCycle,
          HotelBookingNoNeed: _self.filters.HotelBookingNoNeed,
          CompanyAcount: _self.filters.CompanyAcount,
          HotelArea: _self.filters.HotelArea,
          StateAuditor: _self.filters.StateAuditor,
          StateFuKuan: _self.filters.StateFuKuan,
          UrgentPay: _self.filters.UrgentPay
        }
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
      _self.title = '编辑酒店订单信息'
      _self.ID = row.ID
      _self.action = 'http://192.168.10.95:8500/Hotel/Image'
      try {
        _self.showDialog = true
        _self.showEdit = true
        const res = await hotelsOrderApi.detail(row.ID)
        _self.form = res.data.Data
        const res2 = await paymentCheckApi.detail(row.ID)
        let a = res2.data.Data
        const options = {
          query: {
            HotelOrderID: row.ID
          }
        }
        const res3 = await paymentCheckApi.fujiaList(options)
        _self.fujia = res3.data.Data
        for (let i in a) {
          _self.money.push(a[i].HotelPayment)
        }
        _self.copyForm = Object.assign({}, _self.form)
        _self.getStateList()
      } catch (e) {
        console.error(e)
      }
    },
    async addFujia() {
      const _self = this
      _self.showFujia = true
      let date = new Date().Format('yyyy-MM-dd hh:mm')
      _self.form2 = {
        HotelOrderID: _self.ID,
        Money: 0,
        PlateName: '',
        PlateOrderNo: '',
        UseDate: '',
        TypeID: '',
        Remark: '',
        CreateDate: date
      }
    },
    async submitForm2() {
      const _self = this
      try {
        await paymentCheckApi.addFujia(_self.form2)
        _self.showFujia = false
        _self.$message({
          message: '添加成功',
          type: 'success'
        })
        const options = {
          query: {
            HotelOrderID: _self.ID
          }
        }
        const res3 = await paymentCheckApi.fujiaList(options)
        _self.fujia = res3.data.Data
      } catch (e) {
        _self.$message.error('添加失败!!!')
      }
    },
    async clickAddBtn() {
      const _self = this
      _self.title = '添加酒店订单信息'
      _self.showDialog = true
      _self.showEdit = false
      _self.form = {
          StayDateStart: '',
          StayDateEnd: '',
          BookTime: '',
          OrderState: '',
          OrderType: '',
          UrgentPay: '',
          UnMergePay: '',
          HotelArea: '',
          BackfillState: '',
          StateScreenshot: '',
          SettlementCycle: '',
          SettlementCycleFu: '',
          SecretState: '',
          Secret: '',
          ThreePlatID: '',
          ArrivalTime: '',
          OrderNo: '',
          RoomNum: '',
          NightNum: '',
          CurrencyFuKuan: '',
          CurrencyShouKuan: ''
        },
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
      try {
        _self.isEditable = false
        await hotelsOrderApi.add(_self.form)
        _self.fetchData()
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
    async handleSuccess(response, file, fileList) {
      try {
        if (!response) {
          this.$message.error('上传失败,请重新上传')
          return false
        }
        const form = {
          hotelId: this.form.HotelID,
          imageUrl: response
        }
        await hotelImageApi.add(form)
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } catch (e) {
        this.$message.error('上传失败,请重新上传')
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
#HotelsOrder {
  .pagination-wrapper {
    text-align: center;
    margin: 10px;
  }
  .demo-table-expand {
    .el-col {
      height: 32px;
      text-align: center;
      border-right: 1px solid lightgrey;
      color: orange
    }
  }
  .el-card {
    background-color: #fbfdff;
    box-shadow: none;
  }
  .box-card {
    width: 24.7%;
    height: 50rem;
    display: inline-block;
  }
  .span-text {
    margin-left: 20px;
    color: orange;
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
