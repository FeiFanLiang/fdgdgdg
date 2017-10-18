<template lang="html">
<div id="HotelsOrder">
    <el-form label-width="80px">
      <el-row :gutter="24">
          <!-- <el-col :span="4">
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
              <el-option v-for="item in ['日本']" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col> -->
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
            <el-form-item label="订单来源">
              <el-select v-model="filters.FromID">
                <el-option v-for="item in FromID" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row :gutter="24">
          <!-- <el-col :span="5">
            <el-form-item label="打款日期">
              <el-date-picker  v-model="filters.BookTime" type="date"></el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span="6">
            <el-form-item label="结款方式">
              <el-select v-model="filters.SettlementCycle">
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
          <!-- <el-col :span="6">
            <el-form-item label="最晚打款">
              <el-date-picker  v-model="filters.StayDateStart" type="date"></el-date-picker>
            </el-form-item>
          </el-col> -->
      </el-row>
      <el-row :gutter="24">
          <el-col :span="6">
            <el-form-item label="确认号">
              <el-input v-model="filters.HotelBookingNoNeed"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="打款账户">
              <el-select v-model="filters.CompanyAcount">
                <el-option v-for="item in CompanyAcount" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="酒店区域">
              <el-select v-model="filters.HotelArea">
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
          <el-tag style="background-color:#FD5921">单结</el-tag>
          <el-tag style="background-color:#FD1393">日结</el-tag>
          <el-tag style="background-color:#1297E8">周结</el-tag>
          <el-tag style="background-color:#A127BE">半月结</el-tag>
          <el-tag style="background-color:#20A228">月结</el-tag>
        </el-col>
      </el-row>
    </el-form>
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
                    ////////////////////////
                    <p><span>酒店区域</span><span class="span-text" v-if="props.row.HotelArea === 1">国际</span><span class="span-text" v-if="props.row.HotelArea === 0">国内</span></p>
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
              <div>
                <el-card class="box-card2" v-if="imageUrl">
                    <img :src="imageUrl" width="132px" height="132px" style="display:inline-block" v-if="imageUrl"/>
                    <!-- <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" style="display:inline-block">
                        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                </el-card>
              </div>
            </template>
        </el-table-column>

        <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip>
            <template scope="scope">
              <span v-bind:style="styleObject">{{ scope.row.OrderNo }}</span>
            </template>
        </el-table-column>
        <!-- <el-table-column label="订单类型" prop="OrderType" show-overflow-tooltip></el-table-column> -->
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip></el-table-column>
        <el-table-column label="城市" prop="City"></el-table-column>
        <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住/退房日期" width="200">
          <template scope="scope">
            <span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>/
            <span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
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
                <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
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
    <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')" size="full">
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
                <!-- <el-col :span="6">
                    <el-form-item label="订单标题" prop="OrderTitle">
                        <el-input placeholder="请输入订单标题" v-model="form.OrderTitle"></el-input>
                    </el-form-item>
                </el-col> -->
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
                <!-- <el-col :span="6">
                    <el-form-item label="应收未收" prop="AmountYingShouWei">
                        <el-input placeholder="请输入应收未收" v-model="form.AmountYingShouWei"></el-input>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :span="6">
                    <el-form-item label="应付未付" prop="AmountYingFuWei">
                        <el-input placeholder="请输入应付未付" v-model="form.AmountYingFuWei"></el-input>
                    </el-form-item>
                </el-col> -->
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
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（收款）" prop="SettlementCycle">
                        <el-select v-model="form.SettlementCycleFu">
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="订单状态" prop="OrderState">
                        <el-select v-model="form.OrderState">
                          <el-option v-for="item in OrderState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型" prop="OrderType">
                        <el-select v-model="form.OrderType">
                          <el-option v-for="item in OrderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="酒店预订号" prop="HotelBookingNo">
                        <el-input placeholder="请输入酒店预订号" v-model="form.HotelBookingNo"></el-input>
                    </el-form-item>
                </el-col>
                <!-- <el-col :span="6">
                    <el-form-item label="确认号" prop="HotelBookingNoNeed">
                        <el-input placeholder="请输入确认号必填" v-model="form.HotelBookingNoNeed"></el-input>
                    </el-form-item>
                </el-col> -->
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
                          <el-radio :label="1">回填成功</el-radio>
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
            <div v-show="showEdit">
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
            </div>
            <el-row :gutter="24"><el-col :span="3" style="text-align:center;color:orange;"><h1>截图信息</h1></el-col></el-row>
            <el-row :gutter="20">
              <el-col style="margin-left:40px;">
                <img :src="imageUrl" width="132px" height="132px" style="display:inline-block" v-if="imageUrl"/>
                <el-upload class="avatar-uploader" :action="action"
                    :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" style="display:inline-block">
                    <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
            </el-row>
            <!-- <div v-show="showEdit">
            <el-row :gutter="24">
              <el-col :span="3" style="text-align:center;color:orange;"><h1>附加项目</h1></el-col>
            </el-row>
            <div style="text-align:right;width:90%;">
              <el-button>添加</el-button>
            </div>
            <el-row :gutter="24">
              <el-col>
                <el-table :data="fujia" style="width: 90%;margin-left:40px;">
                  <el-table-column label="订单类型" prop="TypeID">
                    <template scope="scope">
                        <span v-if="scope.row.TypeID === 0">门票</span>
                        <span v-if="scope.row.TypeID === 1">车票</span>
                        <span v-if="scope.row.TypeID === 2">自助餐</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="金额" prop="Money"></el-table-column>
                  <el-table-column label="创建时间" prop="CreateDate"></el-table-column> -->
                  <!-- <el-table-column label="来源" prop="PlateName"></el-table-column>
                  <el-table-column label="订单编号" prop="PlateOrderNo"></el-table-column>
                  <el-table-column label="使用时间" prop="UseDate"></el-table-column> -->
                  <!-- <el-table-column label="创建人" prop="UserID"></el-table-column> -->
                <!-- </el-table> -->
                <!-- <div style="margin-left:40px;">
                  金额：{{fujia.Money}}
                  <br>
                  订单类型：<span v-if="fujia.TypeID === 0">门票</span>
                          <span v-if="fujia.TypeID === 1">车票</span>
                          <span v-if="fujia.TypeID === 2">自助餐</span>
                </div> -->
              <!-- </el-col>
            </el-row>
            </div> -->
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
      testValue: '日本',
      imageUrl: '',
      imageUrl2: '',
      fileList: [],
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
      showEdit:false,
      isEditable: true,
      title: '',
      active: 0,
      // filters: {
      //   HotelName: '',
      //   City: '',
      //   CreateTime: ['', '']
      // },
      filters: {
        OrderNo:'',
        HotelName:'',
        Passenger:'',
        BookTime:'',
        StayDateStart:'',
        FromID:'',
        SettlementCycle:'',
        HotelBookingNoNeed:'',
        CompanyAcount:'',
        HotelArea:'',
        StateAuditor:'',
        StateFuKuan:'',
        UrgentPay:''
      },
      checkList:[],
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
      },
      FromID:[
        {label:'全部',value:''}
      ],
      SettlementCycle:[
        {label:'全部',value:''},
        {label:'单结',value:'单结'},
        {label:'日结',value:'日结'},
        {label:'周结',value:'周结'},
        {label:'半月结',value:'半月结'},
        {label:'月结',value:'月结'},
      ],
      CompanyAcount:[
        {label:'全部',value:''},
        {label:'惠和',value:'惠和'},
        {label:'奥讯',value:'奥讯'}
      ],
      HotelArea:[
        {label:'全部',value:''},
        {label:'国内',value:0},
        {label:'国际',value:1}
      ],
      styleObject:{},
      OrderState:[
        {label:'未处理',value:0},
        {label:'已处理',value:1},
        {label:'已拒绝',value:2},
        {label:'未处理+未发单',value:3},
        {label:'待排房',value:4},
        {label:'风险订单+未处理',value:5},
        {label:'风险订单+已处理',value:6},
      ],
      OrderType:[
        {label:'新订',value:0},
        {label:'修改',value:1},
        {label:'取消',value:2},
        {label:'延住',value:3},
        {label:'无效',value:4},
        {label:'新订+修改',value:5},
        {label:'改期',value:6},
      ],
      money:[],
      fujia:[],
      SCycle:[
        {label:'单结',value:0},
        {label:'周结',value:1},
        {label:'月结',value:2},
      ]
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
          'http://liukai.iok.la/Hotel/Image'
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
      // let query = {}
      // if (_self.filters.CreateTime[0] && _self.filters.CreateTime[1]) {
      //   let d1 = new Date(_self.filters.CreateTime[0])
      //   let d2 = new Date(_self.filters.CreateTime[1])

      //   let d11 =
      //     d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate()
      //   let d22 =
      //     d2.getFullYear() + '-' + (d2.getMonth() + 1) + '-' + d2.getDate()
      //   query = {
      //     HotelName: _self.filters.HotelName,
      //     City: _self.filters.City,
      //     'CreateTime>': d11,
      //     'CreateTime<': d22
      //   }
      // } else {
      //   query = {
      //     HotelName: _self.filters.HotelName,
      //     City: _self.filters.City
      //   }
      // }
      _self.filters.StateAuditor = ''
      _self.filters.StateFuKuan = ''
      _self.filters.UrgentPay = ''
      for(let item in _self.checkList){
        if(_self.checkList[item]=='已审核未打款'){
          _self.filters.StateAuditor = 2
          _self.filters.StateFuKuan = 0
        }
        if(_self.checkList[item]=='未审核'){
          _self.filters.StateAuditor = 1
        }
        if(_self.checkList[item]=='紧急打款'){
          _self.filters.UrgentPay = 1
        }
      }
      let d11 = ''
      let d22 = ''
      if(_self.filters.BookTime[0] != null){
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
        order: 'ID',
        query: { 
          OrderNo:_self.filters.OrderNo,
          HotelName:_self.filters.HotelName,
          Passenger:_self.filters.Passenger,
          'BookTime>': d11,
          'BookTime<': d22,
          StayDateStart:new Date(_self.filters.StayDateStart).Format('yyyy-MM-dd'),
          FromID:_self.filters.FromID,
          SettlementCycle:_self.filters.SettlementCycle,
          HotelBookingNoNeed:_self.filters.HotelBookingNoNeed,
          CompanyAcount:_self.filters.CompanyAcount,
          HotelArea:_self.filters.HotelArea,
          StateAuditor:_self.filters.StateAuditor,
          StateFuKuan:_self.filters.StateFuKuan,
          UrgentPay:_self.filters.UrgentPay
        }
      }
      try {
        const res = await hotelsOrderApi.listByQuery(options)
        _self.hotelsOrder = res.data.Data
        for(let item in _self.hotelsOrder){
          let a = _self.hotelsOrder[item].SettlementCycle;
          if(a == '单结'){
            _self.styleObject = {
              color:'#FD5921'
            }
          }
          if(a == '日结'){
            _self.styleObject = {
              color:'#FD1393'
            }
          }
          if(a == '周结'){
            _self.styleObject = {
              color:'#1297E8'
            }
          }
          if(a == '半月结'){
            _self.styleObject = {
              color:'#A127BE'
            }
          }
          if(a == '月结'){
            _self.styleObject = {
              color:'#20A228'
            }
          }
        }
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
        _self.showEdit = true
        const res = await hotelsOrderApi.detail(row.ID)
        _self.form = res.data.Data
        const res2 = await paymentCheckApi.detail(row.ID)
        let a = res2.data.Data
        const options = {
          query:{
            HotelOrderID: row.ID
          }
        }
        console.log(options)
        // const res3 = await paymentCheckApi.fujiaList(options)
        // console.log(res3)
        // _self.fujia = res3.data.Data
        for(let i in a){
          _self.money.push(a[i].HotelPayment)
        }
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
      _self.showEdit = false
      _self.form={
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
