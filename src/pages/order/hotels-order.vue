<template lang="html">
<div id="HotelsOrder">
    <CustomSearchCopy :configList="configList.searchOrderFields" @searchCallback="searchCallback">
      <el-form-item label="订单平台" slot="ThreePlatID">
        <el-select v-model="filters.ThreePlatID" @change="changeValue">
          <el-option v-for="item in ThreePlatID" :key="item.ID" :label="item.PlatName" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人工处理状态" slot="HandState">
        <el-select v-model="filters.HandState" clearable @change="changeValue2">
          <el-option v-for="item in HandState" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态" slot="OrderState" style="margin-bottom:30px">
        <el-select v-model="filters.OrderState" clearable @change="changeValue4">
          <el-option v-for="item in OrderState" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类别" slot="OrderType" style="margin-bottom:10px" >
        <el-select v-model="filters.OrderType" clearable @change="changeValue5">
          <el-option v-for="item in OrderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="外采渠道" slot="WaiCaiPlatID" style="margin-bottom:30px">
        <el-select v-model="filters.WaiCaiPlatID" clearable @change="changeValue7">
          <el-option v-for="item in WaiCaiPlatID" :key="item.value" :label="item.Account" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购方式" slot="WaiCaiFlag">
        <el-select v-model="filters.WaiCaiFlag" clearable @change="changeValue6">
          <el-option v-for="item in WaiCaiFlag" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款周期" slot="SettlementCycleFu" >
          <el-select v-model="filters.SettlementCycleFu" clearable placeholder="请选择付款周期" @change="changeValue3">
              <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="回填人" slot="BackfillUserName" >
        <el-select v-model="filters.BackfillUserName" clearable @change="changeValue9">
          <el-option v-for="item in BackfillUserName" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="外采订单号" slot="WaiCaiNo">
          <el-input v-model="filters.WaiCaiNo"></el-input>
      </el-form-item>
      
      <el-form-item label="筛选条件" slot="checkList">
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="已审核未打款"></el-checkbox>
          <el-checkbox label="未审核"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      
      <el-button type="primary" @click="clickAddBtn" slot="button-add">添加新订单</el-button>
      <el-button type="" @click="downloadList($event)" slot="button-add">下载<i class="el-icon-document el-icon--right" ></i></el-button>
      <el-button type="" @click="downloadList($event)" slot="button-add">汇总下载<i class="el-icon-document el-icon--right" ></i></el-button>      
      <el-button  slot="button-add" style="cursor:default;border:none">{{RoomNight}}间夜 &nbsp; 拒单率{{JuDanLv}}%</el-button>
      
    </CustomSearchCopy>
    
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading" @expand="expand" border
      :expand-row-keys="expandRowKeys" :default-sort = "{prop: 'BookTime', order: 'descending'}" row-key="ID" id="tabs">
        <el-table-column type="expand" v-if="Namen">
            <template scope="props">
              <div>
                <p><el-button size="big" @click="qrh(props.row.ID)">确认函</el-button></p>
                <el-card class="box-card">
                    <h4>预订其他信息</h4>
                    <!-- <p><span>城市</span><span class="span-text">{{ props.row.City }}</span></p> -->
                    <p><span>房型</span><span class="span-text">{{ props.row.Room }}</span></p>
                    <p><span>间数</span><span class="span-text">{{ props.row.RoomNum }}</span></p>
                    <p><span>晚数</span><span class="span-text">{{ props.row.NightNum }}</span></p>
                    <!-- <p><span>联系电话</span><span class="span-text">{{ props.row.PassengerTel }}</span></p> -->
                    <p><span>政策ID</span><span class="span-text">{{ props.row.HotelPolicyID }}</span></p>
                    <p><span>平台政策ID</span><span class="span-text">{{ props.row.PlatPolicyID }}</span></p>
                    <!-- <p><span>订单标题</span><span class="span-text">{{ props.row.OrderTitle }}</span></p> -->
                    <p><span>订单号</span><span class="span-text">{{ props.row.PlatOrderNo}}</span></p>
                    <p><span>订单编号</span><span class="span-text">{{ props.row.OrderNo}}</span></p>
                    <!-- <p><span>其他订单状态</span><span class="span-text">{{ props.row.PlatOrderState }}</span></p>
                    <p><span>其他订单类型</span><span class="span-text">{{ props.row.PlatOrderType }}</span></p>
                    <p><span>来源订单ID</span><span class="span-text">{{ props.row.FromID }}</span></p> -->
                    <p><span>备注</span><span class="span-text">{{ props.row.PassengerAsk }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <h4>财务付款</h4>
                    <p><span>账户名称</span><span class="span-text">{{ props.row.AccountName }}</span></p>
                    <p><span>付款货币</span><span class="span-text">{{ props.row.CurrencyFuKuan }}</span></p>
                    <p><span>收款货币</span><span class="span-text">{{ props.row.CurrencyShouKuan }}</span></p>
                    <p><span>收款额</span><span class="span-text">{{ props.row.AmountShou }}</span></p>
                    <p><span>付款额</span><span class="span-text">{{ props.row.AmountFu }}</span></p>
                    <!-- <p><span>酒店底价</span><span class="span-text">{{ props.row.HotelFee }}</span></p> -->
                    <p><span>利润</span><span class="span-text">{{ props.row.Profit }}</span></p>
                    <!-- <p><span>优惠金额</span><span class="span-text">{{ props.row.Discounts }}</span></p>
                    <p><span>其他费用</span><span class="span-text">{{ props.row.OherFee }}</span></p>
                    <p><span>改期费</span><span class="span-text">{{ props.row.FeeChange }}</span></p>
                    <p><span>退票费</span><span class="span-text">{{ props.row.FeeCancel }}</span></p>
                    <p><span>佣金</span><span class="span-text">{{ props.row.Commission }}</span></p>
                    <p><span>手续费</span><span class="span-text">{{ props.row.Fee }}</span></p> -->
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
                    <!-- <h4>外采、关联消息</h4>
                    <p><span>外采类型</span><span class="span-text">{{ props.row.WaiCaiType }}</span></p>
                    <p><span>外采编号</span><span class="span-text">{{ props.row.WaiCaiNo }}</span></p>
                    <p><span>关联订单</span><span class="span-text">{{ props.row.POrderID }}</span></p> -->
                    <h4>其他信息</h4>
                    <!-- <p><span>最后抓取时间</span><span class="span-text">{{ props.row.GrabberTimeLast }}</span></p>
                    <p><span>抓取的渠道</span><span class="span-text">{{ props.row.FetchChannel }}</span></p> -->
                    <p>
                      <span>第三方平台</span>
                      <span class="span-text">
                        <span v-for="item in ThreePlatID">
                          <span v-if="props.row.ThreePlatID==item.ID">{{item.PlatName}}</span>
                        </span>
                      </span>
                    </p>
                    <p><span>是否保密</span><span class="span-text" v-if="props.row.Secret === 0">不需要保密</span><span class="span-text" v-if="props.row.Secret === 1">需要保密</span></p>
                    <p><span>保密状态</span><span class="span-text" v-if="props.row.SecretState === 0">未处理</span><span class="span-text" v-if="props.row.SecretState === 1">已经保密</span></p>
                    <!-- <p><span>结算周期</span>
                        <span class="span-text" v-if="props.row.SettlementCycle == 0">单结</span>
                        <span class="span-text" v-if="props.row.SettlementCycle == 1">周结</span>
                        <span class="span-text" v-if="props.row.SettlementCycle == 2">月结</span>
                    </p> -->
                </el-card>
                <el-card class="box-card">
                    <h4>财务、对账信息、操作流程</h4>
                    <p><span>审核状态</span><span class="span-text" v-if="props.row.StateAuditor === 1">审核</span><span class="span-text" v-if="props.row.StateAuditor === 2">结束</span></p>
                    <p><span>付款状态</span><span class="span-text" v-if="props.row.StateFuKuan === 0">未付</span><span class="span-text" v-if="props.row.StateFuKuan === 1">已付款</span></p>
                    <p><span>收款状态</span><span class="span-text" v-if="props.row.StateShouKuan === 1">完成</span></p>
                    <!-- <p><span>对账付款</span><span class="span-text" v-if="props.row.StateCheckFuKuan === 1">完成</span></p>
                    <p><span>对账收款</span><span class="span-text" v-if="props.row.StateCheckShouKuan === 1">完成</span></p>
                    <p><span>审核对账</span><span class="span-text" v-if="props.row.StateCheckEnd === 1">平</span></p>
                    <p><span>紧急打款</span><span class="span-text" v-if="props.row.UrgentPay === 1">紧急</span></p>
                    <p><span>不可合并支付</span><span class="span-text" v-if="props.row.UnMergePay === 1">不可合并</span></p> -->
                    <br>
                    <p><span>订单渠道</span>
                        <span class="span-text" v-if="props.row.HotelArea === 1">国际</span>
                        <span class="span-text" v-if="props.row.HotelArea === 0">国内</span>
                        <span class="span-text" v-if="props.row.HotelArea === 2">美国1009</span>
                        <span class="span-text" v-if="props.row.HotelArea === 3">美国2462</span>
                        <span class="span-text" v-if="props.row.HotelArea === 4">好订1009</span>
                        <span class="span-text" v-if="props.row.HotelArea === 5">好订2462</span>
                    </p>
                    <p>
                      <span>回填状态</span>
                      <span class="span-text" v-if="props.row.BackfillState === 0">未回填</span>
                      <span class="span-text" v-if="props.row.BackfillState === 1">回传成功</span>
                      <span class="span-text" v-if="props.row.BackfillState === 2">回填失败</span>
                    </p>
                    <!-- <p>
                      <span>订单截图状态</span>
                      <span class="span-text" v-if="props.row.StateScreenshot === 0">未截图</span>
                      <span class="span-text" v-if="props.row.StateScreenshot === 1">截图完成</span>
                      <span class="span-text" v-if="props.row.StateScreenshot === 2">不截图</span>
                    </p> -->
                    <p><span>锁定</span><span class="span-text" v-if="props.row.LockState === 1">锁定</span><span>锁定</span><span class="span-text" v-if="props.row.LockState === 0">未锁定</span></p>
                </el-card>
              </div>
            </template>
        </el-table-column>  
        <el-table-column label="订单号" prop="PlatOrderNo" show-overflow-tooltip width=120></el-table-column>
        <el-table-column label="账户-平台" width="120">
          <template scope="scope">
              {{scope.row.AccountName}}--
              <span v-for="item in ThreePlatID">
                <span v-if="scope.row.ThreePlatID==item.ID">{{item.PlatName}}</span>
              </span>
          </template>
        </el-table-column>
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip width="180"></el-table-column>
        <el-table-column label="采购" prop="WaiCaiFlag" width=70>
          <template scope="scope">
            <span v-if="scope.row.WaiCaiFlag == 0">自营</span>
            <span v-if="scope.row.WaiCaiFlag == 1">外采</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人" prop="Passenger" show-overflow-tooltip></el-table-column>
        <el-table-column label="订单状态" prop="OrderState" show-overflow-tooltip>
        <template scope="scope">
          <span  v-if="scope.row.OrderState == 0">未处理</span>
          <span  v-if="scope.row.OrderState == 1">已处理</span>
          <span  v-if="scope.row.OrderState == 2">已拒绝</span>
          <span  v-if="scope.row.OrderState == 3">未处理+未发单</span>
          <span  v-if="scope.row.OrderState == 4">待排房</span>
          <span  v-if="scope.row.OrderState == 5">风险订单</span>
          <span  v-if="scope.row.OrderState == 6">风险订单+未处理</span>
          <span  v-if="scope.row.OrderState == 7">风险订单+已处理</span>
          </template>
        </el-table-column>
        <el-table-column label="订单类别" prop="OrderType"  width="80">
        <template scope="scope">
            <span  v-if="scope.row.OrderType == 0">新订</span>
            <span  v-if="scope.row.OrderType == 1">修改</span>
            <span  v-if="scope.row.OrderType == 2">取消</span>
            <span  v-if="scope.row.OrderType == 3">延住</span>
            <span  v-if="scope.row.OrderType == 4">无效</span>
            <span  v-if="scope.row.OrderType == 5">新订+修改</span>
            <span  v-if="scope.row.OrderType == 6">改期</span>
          </template>
        </el-table-column>        
        <el-table-column label="入住/退房日期" width="200">
          <template scope="scope">
            <span v-if="scope.row.StayDateStart != null">{{ scope.row.StayDateStart.split(' ')[0] }}</span>
            /
            <span v-if="scope.row.StayDateEnd != null">{{ scope.row.StayDateEnd.split(' ')[0] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预定时间" prop="BookTime" width="80" sortable>
          <template scope="scope">
            <span v-if="scope.row.BookTime != null">{{ scope.row.BookTime.substring(5,16) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template scope="scope">
            <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
            <DeleteButton api="hotelsOrderApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
          </template>
        </el-table-column>
        
    </el-table>
    <div class="pagination-wrapper">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog title="添加订单信息" v-model="showDialog" @close="resetForm('form')" size="full">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-row :gutter="24"><el-col :span="24" style="color:orange;"><h1>订单信息</h1></el-col></el-row>
            <el-row :gutter="24">
              <!-- <el-col :span="8">
                <el-form-item label="酒店名称" prop="HotelName">
                    <el-input placeholder="请输入酒店名称" v-model="form.HotelName"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="8">
                        <el-form-item label="酒店名称" prop="HotelName">
                            <el-select v-model="form.HotelName"  filterable remote placeholder="请输入酒店名称" :remote-method="remoteHotelList" :loading="loadingHotel" @change="changv">
                                <el-option v-for="(item,index) in hotelList" :key="index" :label="item&&item.HotelName" :value="item&&item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
              <el-col :span="6">
                <el-form-item label="第三方订单号" prop="PlatOrderNo">
                    <el-input placeholder="请输入第三方订单号" v-model="form.PlatOrderNo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                  <el-button @click="find">查询</el-button>
                  <span v-if="text == 0">暂无此订单</span>
                  <span v-if="text == 1">订单存在</span>
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="6">
                <el-form-item label="酒店id" prop="HotelID">
                    <el-input placeholder="请输入酒店id" v-model="form.HotelID" disabled></el-input>
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
                  <el-form-item label="房型" prop="Room">
                      <el-input placeholder="请输入房型" v-model="form.Room"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                      <el-form-item label="确认号" prop="HotelBookingNo">
                          <el-input placeholder="请输入确认号" v-model="form.HotelBookingNo"></el-input>
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
                    <el-form-item label="入住日期" prop="StayDateStart">
                        <el-date-picker v-model="form.StayDateStart" type="date" placeholder="选择入住日期" style="width:100%;" :picker-options="pickerOptions" @change="ruzhu"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="退房日期" prop="StayDateEnd">
                        <el-date-picker v-model="form.StayDateEnd" type="date" placeholder="选择退房日期" style="width:100%;" :picker-options="pickerOptions2" @change="tuifang"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="6">
                    <el-form-item label="间数" prop="RoomNum">
                        <el-input placeholder="请输入间数" v-model="form.RoomNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="晚数" prop="NightNum">
                        <el-input placeholder="请输入晚数" v-model="form.NightNum"></el-input>
                    </el-form-item>
                </el-col>                
                <el-col :span="6">
                    <el-form-item label="联系电话" prop="PassengerTel">
                        <el-input placeholder="请输入联系电话" v-model="form.PassengerTel"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="6">
                    <el-form-item label="订单状态" prop="OrderState">
                        <el-select v-model="form.OrderState" clearable>
                          <el-option v-for="item in OrderState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="订单类型" prop="OrderType">
                        <el-select v-model="form.OrderType" clearable @change="changeValue8">
                          <el-option v-for="item in OrderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
              <el-col :span="6">
                  <el-form-item label="预定时间" prop="BookTime">
                      <el-date-picker v-model="form.BookTime" type="datetime" placeholder="选择预定时间" style="width:100%;"></el-date-picker>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="客人要求" prop="PassengerAsk">
                        <el-input type="textarea" v-model="form.PassengerAsk"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="备注" prop="Remark">
                        <el-input type="textarea" v-model="form.Remark"></el-input>
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
                    <el-form-item label="酒店底价" prop="HotelFee">
                        <el-input placeholder="请输入酒店底价" v-model="HotelOrderDetail.HotelFee"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                
                <!-- <el-col :span="6">
                    <el-form-item label="应付款额" prop="AmountYingFu">
                        <el-input placeholder="请输入应付款额" v-model="HotelOrderDetail.AmountYingFu"></el-input>
                    </el-form-item>
                </el-col> -->
                <!-- <el-col :span="6">
                    <el-form-item label="实收款额" prop="AmountShiShou">
                        <el-input placeholder="请输入实收款额" v-model="HotelOrderDetail.AmountShiShou"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="实付款额" prop="AmountShiFu">
                        <el-input placeholder="请输入实付款额" v-model="HotelOrderDetail.AmountShiFu"></el-input>
                    </el-form-item>
                </el-col> -->
            </el-row>   
            <el-row :gutter="24">
              <el-col :span="6">
                    <el-form-item label="应收款额" prop="AmountYingShou">
                        <el-input placeholder="请输入应收款额" v-model="HotelOrderDetail.AmountYingShou"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（付）" prop="SettlementCycleFu">
                        <el-select v-model="HotelOrderDetail.SettlementCycleFu" clearable>
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（收）" prop="SettlementCycle">
                        <el-select v-model="HotelOrderDetail.SettlementCycle" clearable>
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.text" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>  
            <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
            <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>订单截图</h1></el-col></el-row>
            <el-row :gutter="20">
              <el-col style="margin-left:40px;">
                <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
              </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center;">
          <el-button @click="showDialog = false" size="large">取 消</el-button>
          <el-button type="primary" @click="submitForm()" :loading="!isEditable" size="large">{{isEditable?'确 定':'提交中'}}</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import {
  hotelsOrderApi,
  paymentCheckApi,
  hotelThreePlatInfoApi,
  policyApi,
  hotelBaseApi
} from "api";
import UploadImage from "components/upload-image";
export default {
  components: {
    UploadImage
  },
  data() {
    let that = this;
    return {
      loadingHotel: false,
      Namen:true,
      Room:"",
      Pts:"",
      Qy:"",
      Fs:"",
      Zt:"",
      Lb:"",
      Wcfs:"",
      Wcqd:"",
      Rstate:"",
      Htr:"",
      Night:"",
      hotelList: [],
      imageList: [],
      nows:{},
      RoomNight:"",
      JuDanLv:"",
      text: -1,
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      showDialog: false,
      isEditable: true,
      form: {
        PlatOrderNo: "",
        Nowtate:"",
        HotelName: "",
        HotelID: "",
        ThreePlatID: "",
        Room: "",
        HotelBookingNo: "",
        Passenger: "",
        StayDateStart: "",
        StayDateEnd: "",
        RoomNum: "",
        NightNum: "",
        PassengerTel: "",
        OrderState: "",
        OrderType: "",
        BookTime: "",
        PassengerAsk: "",
        Remark: "",
        CurrencyFuKuan: "",
        CurrencyShouKuan: ""
      },
      HotelOrderDetail: {},
      hotelsOrder: [],
      WaiCaiPlatID:[],
      ID: "",
      filters: {
        HotelName: "",
        ThreePlatID: "",
        SettlementCycleFu: "",
        checkList: "",
        OrderState:"",
        HandState:"",
        OrderType:"",
        WaiCaiFlag:"",
        WaiCaiPlatID:"",
        HotelArea: "",
        BackfillTime:"",
        WaiCaiNo:""
      },
      ThreePlatID: [
        {
          PlatName: "全部",
          value: ""
        }
      ],
      WaiCaiFlag:[
                {
                    label:'自营',
                    value:0
                },
                {
                    label:'外采',
                    value:1
                }
      ],
      HandState: [{
                label: '未处理',
                value: 0
                },
                {
                label: '处理中',
                value: 1
                },
                {
                label: '处理成功',
                value: 2
                },
                {
                label: '处理失败',
                value: 3
                }
      ],
      HotelArea: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "国内",
          value: 0
        },
        {
          label: "国际",
          value: 1
        },
        {
          label: "美国1009",
          value: 2
        },
        {
          label: "美国2462",
          value: 3
        },
        {
          label: "好订1009",
          value: 4
        },
        {
          label: "好订2462",
          value: 5
        }
      ],
      checkList: [],
      expandRowKeys: [],
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() > new Date(that.form.StayDateEnd).getTime() - 8.64e7
          );
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          return (
            time.getTime() < Date.now() - 8.64e7 ||
            time.getTime() < new Date(that.form.StayDateStart).getTime()
          );
        }
      },
      OrderState: [
        {
          label: "未处理",
          value: 0
        },
        {
          label: "已处理",
          value: 1
        },
        {
          label: "已拒绝",
          value: 2
        },
        {
          label: "未处理+未发单",
          value: 3
        },
        {
          label: "待排房",
          value: 4
        },
        {
          label: "风险订单+未处理",
          value: 5
        },
        {
          label: "风险订单+已处理",
          value: 6
        }
      ],
      OrderType: [
        {
          label: "新订",
          value: 0
        },
        {
          label: "修改",
          value: 1
        },
        {
          label: "取消",
          value: 2
        },
        {
          label: "延住",
          value: 3
        },
        {
          label: "无效",
          value: 4
        },
        {
          label: "新订+修改",
          value: 5
        },
        {
          label: "改期",
          value: 6
        }
      ],
      payPeriodList: [
                {
                    value: 0,
                    text: '其他（每单备注）'
                }, 
                {
                    value: 1,
                    text: '预付款'
                },
                {
                    value: 2,
                    text: '单结'
                },
                {
                    value: 3,
                    text: '日结'
                },

                {
                    value: 4,
                    text: '月结'
                },
                {
                    value: 5,
                    text: '半月结'
                },
                {
                    value: 6,
                    text: '周结'
                }

            ],
      BackfillUserName: [
          {
            value: '张雪',
            text: '张雪'
          },
          {
            value: '吴庆莲',
            text: '吴庆莲'
          },
          {
            value: '马铭悦',
            text: '马铭悦'
          },
          {
            value: '王娇',
            text: '王娇'
          },
          {
            value: '林梅霞',
            text: '林梅霞'
          },
      ],
      SCycle: [
        {
                    value: 0,
                    text: '其他（每单备注）'
                }, 
                {
                    value: 1,
                    text: '预付款'
                },
                {
                    value: 2,
                    text: '单结'
                },
                {
                    value: 3,
                    text: '日结'
                },

                {
                    value: 4,
                    text: '月结'
                },
                {
                    value: 5,
                    text: '半月结'
                },
                {
                    value: 6,
                    text: '周结'
                }
      ],
      Currency: [
        {
          label: "CNY",
          value: "CNY"
        },
        {
          label: "USD",
          value: "USD"
        },
        {
          label: "JPY",
          value: "JPY"
        }
      ],
      rules: {
        // HotelName: [
        //   { required: true, message: "请输入酒店名称", trigger: "change" }
        // ]
        // ThreePlatID: [
        //   { required: true, type:Number,message: "请输入订单平台", trigger: "blur" }
        // ],
        // Room: [
        //   { required: true, message: "请输入房型", trigger: "blur" }
        //   ],
        // Passenger: [
        //   { required: true, message: "请输入入住人", trigger: "blur" }
        // ],
        // StayDateStart: [
        //   { required: true, message: "请输入入住日期", trigger: "blur" }
        // ],
        // StayDateEnd: [
        //   { required: true, message: "请输入退房日期", trigger: "blur" }
        // ],
        // RoomNum: [
        //   { required: true, message: "请输入间数", trigger: "blur" }
        // ],
        // NightNum: [
        //   { required: true, message: "请输入晚数", trigger: "blur" }
        // ],
        // PassengerTel: [
        //   { required: true, message: "请输入联系电话", trigger: "blur" }
        // ],
        // OrderState: [
        //   { required: true, message: "请输入订单状态", trigger: "blur" }
        // ],
        // OrderType: [
        //   { required: true, message: "请输入订单类型", trigger: "blur" }
        // ],
        // BookTime: [
        //   { required: true, message: "请输入预定时间", trigger: "blur" }
        // ]
      },
      detail: {},
      type:""
    };
  },
  created() {
    const _self = this
    _self.fetchData();
    _self.ThreePlat();
    _self.type = _self.$route.name
    _self.platformAccount();
    _self.configList = hotelsOrderApi.getConfig();
  },
  watch:{
    "$route":function(val){
      console.log(val)
        this.type = val.name
        this.nowName()
        this.fetchData()        
        this.filters = {
            HotelName: "",
            ThreePlatID: "",
            SettlementCycleFu: "",
            checkList: "",
            OrderState:"",
            HandState:"",
            OrderType:"",
            WaiCaiFlag:"",
            WaiCaiPlatID:"",
            HotelArea: "",
            WaiCaiNo:""
        }
    }
  },
  methods: {
    changeValue(value) {
          this.Pts = value
    },
    changeValue1(value) {
          this.Qy = value
    },
    changeValue2(value) {
          this.Rstate = value
    },
    changeValue3(value) {
          this.Fs = value
    },
    changeValue4(value) {
          this.Zt = value
    },
    changeValue5(value) {
          this.Lb = value
    },
    changeValue6(value) {
          this.Wcfs = value
    },
    changeValue7(value) {
          this.Wcqd = value
    },
    changeValue8(value){
      const _self = this;            
      _self.form.OrderType = value
    },
    changeValue9(value) {
          this.Htr = value
    },
    nowName(){
      const _self = this;                  
      if(_self.type == '酒店订单'){
          _self.Namen = true
      }else{
          _self.Namen = false   
      }
    },
    async platformAccount(){
            const options = {
                pageSize: 1000,
                order: 'Sort',
                query:{CanPurchase:true}
            }     
            const res = await policyApi.getPolicyPlatform(options)
            this.WaiCaiPlatID = res.data.Data
       //     console.log(this.WaiCaiPlatID)
    },
    async downloadList(e) {
      const _self = this;
      const text = e.target.innerText;  
      let time1 = "";
      let time2 = "";
      if (typeof _self.filters.BookTime != "undefined") {
        if (_self.filters.BookTime[0] != null) {
          time1 = new Date(_self.filters.BookTime[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.BookTime[1]).Format("yyyy-MM-dd");
        }
      }
      let timeh1 = "";
      let timeh2 = "";
      if (typeof _self.filters.BackfillTime != "undefined") {
        if (_self.filters.BackfillTime[0] != null) {
          time1 = new Date(_self.filters.BackfillTime[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.BackfillTime[1]).Format("yyyy-MM-dd");
        }
      }
      let options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: "BookTime",
        desc: true,
        query: {
          OrderNo: _self.filters.OrderNo,
          HotelName: _self.filters.HotelName,
          Passenger: _self.filters.Passenger,
          HandState:_self.filters.HandState,
          StayDateStart: _self.filters.StayDateStart
            ? new Date(_self.filters.StayDateStart).Format("yyyy-MM-dd")
            : "",
          "BookTime>": time1,
          "BookTime<": time2,
          "BackfillTime>": timeh1,
          "BackfillTime<": timeh2,
          ThreePlatID: _self.filters.ThreePlatID,
          SettlementCycleFu: _self.filters.SettlementCycleFu,
          HotelBookingNo: _self.filters.HotelBookingNo,
          HotelArea: _self.filters.HotelArea,
          OrderState:_self.filters.OrderState,
          OrderType:_self.filters.OrderType,
          StateAuditor: _self.filters.StateAuditor,
          StateFuKuan: _self.filters.StateFuKuan,
          WaiCaiNo:_self.filters.WaiCaiNo,
          WaiCaiFlag:_self.filters.WaiCaiFlag,
          BackfillUserName:_self.filters.BackfillUserName,
          WaiCaiPlatID:_self.filters.WaiCaiPlatID,
          PlatOrderNo: _self.filters.PlatOrderNo
        }
      };
      try {  
        if(text=="下载"){
          const res = await hotelsOrderApi.downloadList(options);
            if (res.request.responseURL) {
          window.location.href = res.request.responseURL;
        }
        }else{
          const res = await hotelsOrderApi.downloadOrder(options);
            if (res.request.responseURL) {
          window.location.href = res.request.responseURL;
        }
        }         
      } catch (e) {
        _self.$message.error("数据下载失败!!!");
      }
    },
    async remoteHotelList(querys) {
      const _self = this;
      if (querys !== "") {
        _self.loadingHotel = true;
        const options = {
          pageIndex: 1,
          pageSize: 20,
          order: "ID",
          query: {
            HotelName: querys
          }
        };
        const res = await hotelBaseApi.listAll(options);
        console.log(res)
        if (res && res.data && res.data.Data) {
          _self.hotelList = res.data.Data;
          // _self.form.HotelID = _self.hotelList[0].ID;
          // _self.form.HotelName = _self.hotelList[0].HotelName;

          _self.loadingHotel = false;
        }
      } else {
        _self.hotelList = [];
      }
    },
    changv(value){
    
      const _self = this;      
      console.log(_self.detail.HotelOrderDetail)
      if(_self.detail.HotelOrderDetail == undefined){
        _self.form.HotelID = value 
      }else{
      console.log(value)
        _self.form.HotelID = _self.detail.HotelOrderDetail[0].HotelID    
      }
    },
    searchCallback(filters) {
      const now =  Object.assign(this.filters, filters );   
      Object.assign(filters, filters, this.filters);
      this.filters = filters;
      this.filters.WaiCaiNo = now.WaiCaiNo   
      this.filters.ThreePlatID = this.Pts
      this.filters.HotelArea = this.Qy
      this.filters.SettlementCycleFu = this.Fs
     // console.log(this.filters)
      this.filters.HandState = this.Rstate    
      this.filters.OrderState = this.Zt
      this.filters.OrderType = this.Lb
      this.filters.WaiCaiFlag = this.Wcfs  
      this.filters.WaiCaiPlatID = this.Wcqd
      this.filters.BackfillUserName = this.Htr
                          
      this.fetchData();
    },
    qrh(id) {
      const _self = this;
      _self.$router.push({
        name: "编辑器",
        params: {
          ID: id
        }
      });
    },
    async getImageList(list) {
      if (list) {
        const images = list.split(",");
        if (Array.isArray(images)) {
          this.imageList = images;
        }
      }
    },
    async handleSuccess(response, file, fileList) {
      if (!response) {
        this.$message.error("上传失败,请重新上传");
        return false;
      }
      this.imageList.push(response);
    },
    handleRemove(index, file, fileList) {
      this.imageList.splice(index, 1);
    },
    ruzhu(val) {
      this.form.StayDateStart = val;
      if (this.form.StayDateEnd != "") {
        let date1 = new Date(val); //开始时间
        let date2 = new Date(this.form.StayDateEnd); //结束时间
        let date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数
        let days = Math.floor(date3 / (24 * 3600 * 1000));
        this.form.RoomNum = 1;
        this.form.NightNum = days;
      }
    },
    tuifang(val) {
      this.form.StayDateEnd = val;
      if (this.form.StayDateStart != "") {
        let date1 = new Date(this.form.StayDateStart); //开始时间
        let date2 = new Date(val); //结束时间
        let date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数
        let days = Math.floor(date3 / (24 * 3600 * 1000));
        this.form.RoomNum = 1;
        this.form.NightNum = days;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(1, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.currentPage);
    },
    async ThreePlat() {
      const res = await hotelThreePlatInfoApi.getList();
      this.ThreePlatID = res.data;
    },
    expand(row, expanded) {
      const _self = this;
      if (expanded) {
        _self.expandRowKeys.length = 0;
        _self.expandRowKeys.push(row.ID);
        _self.ID = row.ID;
      }
      _self.showWeixin = false;
    },
    trim(s){
      if(s){
    return s.replace(/(^\s*)|(\s*$)/g, '');
      }
    },
    async fetchData(currentPage, pageSize) {
      const _self = this;
      _self.loading = true;
      _self.currentPage = currentPage || _self.currentPage;
      _self.pageSize = pageSize || _self.pageSize;
      _self.filters.StateAuditor = "";
      _self.filters.StateFuKuan = "";
      for (let item in _self.checkList) {
        if (_self.checkList[item] == "已审核未打款") {
          _self.filters.StateAuditor = 1;
          _self.filters.StateFuKuan = 0;
        }
        if (_self.checkList[item] == "未审核") {
          _self.filters.StateAuditor = 0;
        }
      }
      let time1 = "";
      let time2 = "";
      if (typeof _self.filters.BookTime != "undefined") {
        if (_self.filters.BookTime[0] != null) {
          time1 = new Date(_self.filters.BookTime[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.BookTime[1]).Format("yyyy-MM-dd");
        }
      }
      let timeh1 = "";
      let timeh2 = "";
      if (typeof _self.filters.BackfillTime != "undefined") {
        if (_self.filters.BackfillTime[0] != null) {
          time1 = new Date(_self.filters.BackfillTime[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.BackfillTime[1]).Format("yyyy-MM-dd");
        }
      }
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: "BookTime",
        desc: true,
        query: {
          OrderNo:_self.trim( _self.filters.OrderNo),
          HotelName:_self.trim( _self.filters.HotelName),
          Passenger:_self.trim(_self.filters.Passenger),
          StayDateStart: _self.filters.StayDateStart
            ? new Date(_self.filters.StayDateStart).Format("yyyy-MM-dd")
            : "",
          "BookTime>": time1,
          "BookTime<": time2,
          "BackfillTime>": timeh1,
          "BackfillTime<": timeh2,
          ThreePlatID: _self.filters.ThreePlatID,
          SettlementCycleFu: _self.filters.SettlementCycleFu,
          HandState:_self.filters.HandState,
          HotelBookingNo: _self.filters.HotelBookingNo,
          HotelArea: _self.filters.HotelArea,
          StateAuditor: _self.filters.StateAuditor,
          StateFuKuan: _self.filters.StateFuKuan,
          WaiCaiNo:_self.filters.WaiCaiNo,
          OrderState:_self.filters.OrderState,
          OrderType:_self.filters.OrderType,
          WaiCaiFlag:_self.filters.WaiCaiFlag,
          WaiCaiPlatID:_self.filters.WaiCaiPlatID,
          BackfillUserName:_self.filters.BackfillUserName,                                                            
          PlatOrderNo: _self.filters.PlatOrderNo
        }
      }
      console.log(options)
      try {
            _self.type = _self.$route.name
             if(_self.type == '酒店订单'){
                _self.Namen = true
            }else{
                _self.Namen = false   
            }
       // if(_self.type == '酒店订单'){
           const res = await hotelsOrderApi.fetch(options);
           console.log(res)
          _self.hotelsOrder = res.data.Data;
          _self.RoomNight = res.data.RoomNight;     
          _self.JuDanLv = res.data.JuDanLv;            
          _self.count = res.data.Count;
       // }
        // if(_self.type == '有用单列表'){
        //     options.query.HandState = 2;
        //     options.query.IsDelete = false;   
        //    const res = await hotelsOrderApi.fetchy(options);
        //  //  console.log(res)
        //   _self.hotelsOrder = res.data.Data;
        //   _self.RoomNight = res.data.RoomNight;                 
        //   _self.count = res.data.Count;
        // }
        // if(_self.type == '待处理列表'){
        //     options.query={
        //         "HandState<" : 3
        //     }
        //     options.query.IsDelete = false; 
        //     options.query.OrderType = 0; 
        //     options.query.OrderState = 0; 
        //     options.query.BackfillState = 0;  
        //    const res = await hotelsOrderApi.fetchy(options);
        //  //  console.log(res)
        //   _self.hotelsOrder = res.data.Data;
        //   _self.RoomNight = res.data.RoomNight;                 
        //   _self.count = res.data.Count;
        // }
       
        _self.loading = false;
      } catch (e) {
        _self.loading = false;
      }
    },
    async clickEditBtn($index, row) {
      const _self = this;
      _self.$router.push({
        name: "酒店订单信息编辑",
        params: {
          ID: row.ID,
          POrderID: row.ID,
          HotelName: row.HotelName,
          type: "酒店订单"
        }
      });
    },
    async find() {
      const _self = this;
      //添加订单前判断是否存在
      console.log(_self.form.PlatOrderNo);
      const res = await hotelsOrderApi.getDetail(_self.form.PlatOrderNo);
      _self.detail = res.data.Data;
      if (_self.detail) {
        _self.form = _self.detail;
        _self.HotelOrderDetail = _self.detail.HotelOrderDetail[0];
        if (typeof _self.detail == "undefined") {
          _self.text = 0;
        } else {
          _self.text = 1;
        }
      }
    },
    clickAddBtn() {
      const _self = this;
      _self.showDialog = true;
      _self.text = -1;
      _self.form = {};
      _self.HotelOrderDetail = {};
    },
    async submitForm() {
      const _self = this;
    
      if(_self.form.HotelID == undefined){
          this.$message({
            showClose: true,
            message: "请输入酒店名称",
            type: "error"
          });
      }
      else{
      _self.$refs["form"].validate(async valid => {
        if (valid) {
          try {
            _self.isEditable = false;
            let time = new Date().Format("yyyy-MM-dd");
            
            switch (_self.form.OrderType) {
              case 0:
                _self.form.PlatOrderType = "新订";
                break;
              case 1:
                _self.form.PlatOrderType = "修改";
                break;
              case 2:
                _self.form.PlatOrderType = "取消";
                break;
              case 3:
                _self.form.PlatOrderType = "延住";
                break;
              case 4:
                _self.form.PlatOrderType = "无效";
                break;
              case 5:
                _self.form.PlatOrderType = "新订+修改";
                break;
              case 6:
                _self.form.PlatOrderType = "改期";
                break;
              default:
                _self.form.PlatOrderType = "";
            }
            _self.form.UpdateTime = time;
          
            let nowF = _self.form
            nowF.HotelFee = _self.HotelOrderDetail.HotelFee
         //   console.log(_self.form);
            // _self.form.HotelOrderDetail = _self.HotelOrderDetail;
            _self.form = { ..._self.form, ..._self.HotelOrderDetail };
           // nowF = { nowF, ..._self.HotelOrderDetail }
         //   console.log(_self.form);
            if (typeof _self.detail == "undefined") {
              var f = {
                Picture: _self.imageList.toString(),
                HotelOrderDetail: [_self.form]
              };
            } else {
              let id = _self.detail.ID;
              nowF.ID = "";
              _self.HotelOrderDetail.ID = "";
              var f = {
                HotelArea: _self.detail.HotelArea,
                Picture: _self.imageList.toString(),
                HotelOrderDetail: [nowF]
              };
            }
            console.log(f)
           // return false
            await hotelsOrderApi.add(f);
            _self.fetchData();
            _self.showDialog = false;
            _self.$message({
              message: "保存成功",
              type: "success"
            });
          } catch (e) {
            _self.$message.error("添加失败!!!");
          } finally {
            _self.isEditable = true;
          }
        } 
      });
    }
    }
  }
};
</script>

<style lang="scss">
#HotelsOrder {
  p {
    display: block;
  }
  .pagination-wrapper {
    text-align: center;
    margin: 10px;
  }
  .demo-table-expand {
    .el-col {
      height: 32px;
      text-align: center;
      border-right: 1px solid lightgrey;
      color: orange;
    }
  }
  .el-card {
    background-color: #fbfdff;
    box-shadow: none;
  }
  .box-card {
    width: 24.7%;
    height: 35rem;
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
