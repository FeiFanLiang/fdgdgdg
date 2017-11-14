<template lang="html">
<div id="car-order-manage-page">
    <el-row :gutter="24">
        <el-col :span="3">
            <el-select v-model="filters.sortValue" placeholder="排序方式">
                <el-option v-for="(item,index) in sortList" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.channel" placeholder="订单渠道">
                <el-option label="全部渠道" value="">全部渠道</el-option>
                <el-option v-for="(item,index) in channelList" :key="index" :label="item.ChannelName" :value="item.ChannelName">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.externalOrderStete" placeholder="订单状态">
                <el-option label="全部状态" value="">全部状态</el-option>
                <el-option v-for="(item,index) in orderSteteList" :key="index" :label="item.label" :value="item.label">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.carTransportType" placeholder="产品类型">
                <el-option label="全部类型" value="">全部类型</el-option>
                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="3">
            <el-select v-model="filters.carClassify" placeholder="车型类别">
                <el-option label="全部车型" value="">全部车型</el-option>
                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
            <el-select v-model="filters.labelVal" placeholder="请选择">
                <el-option v-for="(item,index) in selectedOptions" :key="index" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-col>
        <el-col :span="5">
            <el-input placeholder="请输入姓名" v-model="filters.linkName" v-show="filters.labelVal == 1"></el-input>
            <el-input placeholder="请输入电话" v-model="filters.linkPhone" v-show="filters.labelVal == 2"></el-input>
            <el-input placeholder="请输入OrderKey" v-model="filters.orderKey" v-show="filters.labelVal == 3"></el-input>
            <el-input placeholder="请输入外部订单号" v-model="filters.externalOrderID" v-show="filters.labelVal == 4"></el-input>
        </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px;display:flex;align-items:center;">
        <el-col :span="4">
            <el-date-picker v-model="filters.useTimeS" type="date" placeholder="选择起始用车日期" :picker-options="pickerOptions">
            </el-date-picker>
        </el-col>
        <el-col :span="4">
            <el-date-picker v-model="filters.useTimeE" type="date" placeholder="选择终止用车日期" :picker-options="pickerOptions">
            </el-date-picker>
        </el-col>
        <el-col :span="4">
            <!-- <el-date-picker v-model="filters.bookTime" type="date" placeholder="选择提单日期" :picker-options="pickerOptions"></el-date-picker> -->
            <el-date-picker v-model="filters.bookTime" type="daterange" align="right" placeholder="选择提单日期" :picker-options="pickerOptions2"></el-date-picker>
        </el-col>
        <el-col :span="6" :offset="1">
            <el-radio-group v-model="filters.payStatus" @change="payStatusChange($event)">
                <el-radio label="">全部</el-radio>
                <el-radio :label="true">已支付</el-radio>
                <el-radio :label="false">未支付</el-radio>
            </el-radio-group>
            <el-radio-group v-model="filters.isCancel" @change="isCancelChange($event)">
                <el-radio label="">全部</el-radio>
                <el-radio :label="true">已取消</el-radio>
                <el-radio :label="false">未取消</el-radio>
            </el-radio-group>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="fetchData()">搜索</el-button>
            <el-button type="primary" @click="clear">清除</el-button>
        </el-col>
    </el-row>
    <el-row :gutter="24" style="margin-top:10px;display:flex;align-items:center;">
        <el-col :span="12">
            <el-button type="primary" @click="clickAddBtn">添加线下订单</el-button>
            <el-button type="primary" @click="syncList('xiecheng')">同步携程订单</el-button>
            <el-button type="primary" @click="syncList('mile')">同步订单里程信息</el-button>
            <el-button type="primary" @click="downloadList()">下载<i class="el-icon-document el-icon--right"></i></el-button>
        </el-col>
    </el-row>
    <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
        <el-table-column type="expand">
            <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="110px">
                      <el-form-item label="OrderKey">
                          <span>{{ props.row.OrderKey }}</span>
                      </el-form-item>
                        <el-form-item label="订单渠道">
                            <span>{{ props.row.Channel }}</span>
                        </el-form-item>
                        <el-form-item label="外部订单状态">
                            <span>{{ props.row.ExternalOrderStete }}</span>
                        </el-form-item>
                        <el-form-item label="始发地详细地址">
                            <span>{{props.row.OriginAddress}}</span>
                        </el-form-item>
                        <el-form-item label="目的地详细地址">
                            <span>{{props.row.DestinationAddress}}</span>
                        </el-form-item>
                        <el-form-item label="工作人员">
                            <span>{{ props.row.StaffUserName }}</span>
                        </el-form-item>
                        <el-form-item label="处理人员">
                            <span>{{ props.row.ProcessorUserName }}</span>
                        </el-form-item>
                        <el-form-item label="审核人员">
                            <span>{{ props.row.AuditorUserName }}</span>
                        </el-form-item>
                        <el-row class="mbtm-10">
                            <el-col :span="24">
                                <el-form-item label="客人要求">
                                    <span>{{ props.row.SpecReq }}</span>
                                </el-form-item>
                                </el-col/>
                        </el-row>
                        <el-form-item label="支付类型">
                            <span v-if="props.row.PayType === 0">支付宝</span>
                            <span v-if="props.row.PayType === 1">微信支付</span>
                            <span v-if="props.row.PayType === 2">银联支付</span>
                            <span v-if="props.row.PayType === 3">平台</span>
                            <span v-if="props.row.PayType === 4">线下支付</span>
                            <span v-if="props.row.PayType === 5">其他</span>
                        </el-form-item>
                        <el-form-item label="支付平台订单号">
                            <span>{{ props.row.PayOrder }}</span>
                        </el-form-item>
                        <el-form-item label="过路过桥费">
                            <span>{{ props.row.RoadBridgeFee }}</span>
                        </el-form-item>
                        <el-form-item label="停车费">
                            <span>{{ props.row.ParkingFee }}</span>
                        </el-form-item>
                        <el-form-item label="应收费用">
                            <span>{{ props.row.DealPrice }}</span>
                        </el-form-item>
                        <el-form-item label="其他费用">
                            <span>{{ props.row.OtherPrice }}</span>
                        </el-form-item>
                        <el-form-item label="实收费用">
                            <span>{{ props.row.RealPrice }}</span>
                        </el-form-item>
                        <el-form-item label="是否支付">
                            <span>{{ props.row.IsAppointment?"是":"否" }}</span>
                        </el-form-item>
                        <el-form-item label="是否支付">
                            <span>{{ props.row.PayStatus?"是":"否" }}</span>
                        </el-form-item>
                        <el-form-item label="支付时间">
                            <span>{{ props.row.PayTime }}</span>
                        </el-form-item>
                        <el-row class="mbtm-10">
                            <el-col :span="12">
                                <el-form-item label="是否取消">
                                    <span>{{ props.row.IsCancel?"是":"否" }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="取消时间">
                                    <span>{{ props.row.CancelTime }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="退款联系人">
                            <span>{{ props.row.CancelContactName }}</span>
                        </el-form-item>
                        <el-form-item label="退款联系方式">
                            <span>{{ props.row.CancelContact }}</span>
                        </el-form-item>
                        <el-form-item label="申请退款金额">
                            <span>{{ props.row.ApplyCancelPrice }}</span>
                        </el-form-item>
                        <el-form-item label="退款金额" class="mbtm-10">
                            <span>{{ props.row.CancelPrice }}</span>
                        </el-form-item>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="申请退款原因">
                                    <span>{{ props.row.Reason }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row class="mbtm-10">
                            <el-col :span="24">
                                <el-form-item label="退款审核意见">
                                    <span>{{ props.row.ApproveCancelRemark }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-form-item label="出发时间">
                            <span>{{ props.row.StartingTime }}</span>
                        </el-form-item>
                        <el-form-item label="到达时间">
                            <span>{{ props.row.ArrivalTime }}</span>
                        </el-form-item>
                    </el-form>
</template>
            </el-table-column>
            <!-- <el-table-column prop="OrderKey" label="OrderKey" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="Channel" label="渠道" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ExternalOrderID" label="外部订单号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ExternalOrderStete" label="外部订单状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkName" label="联系人" show-overflow-tooltip></el-table-column>
            <el-table-column prop="LinkPhone" label="联系电话" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CarriageNo" label="航班/车次" show-overflow-tooltip></el-table-column>
            <el-table-column label="产品类型" show-overflow-tooltip>
<template scope="scope">
<span v-if="scope.row.CarTransportType === 0">
        接机</span>
<span v-if="scope.row.CarTransportType === 1">送机</span>
<span v-if="scope.row.CarTransportType === 2">指定线路</span>
<span v-if="scope.row.CarTransportType === 3">接站</span>
<span v-if="scope.row.CarTransportType === 4">送站</span>
<span v-if="scope.row.CarTransportType === 5">包车</span>
</template>
            </el-table-column>
            <el-table-column label="车型类别" show-overflow-tooltip>
<template scope="scope">
<span v-if="scope.row.CarClassify === 0">
        经济型</span>
<span v-if="scope.row.CarClassify === 1">舒适型</span>
<span v-if="scope.row.CarClassify === 2">商务型</span>
<span v-if="scope.row.CarClassify === 3">豪华型</span>
</template>
            </el-table-column>
            <el-table-column prop="UseTime" label="用车时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Origin" label="始发地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Destination" label="目的地" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PreServiceMileage" label="预计服务里程" show-overflow-tooltip></el-table-column>
            <el-table-column prop="RealPrice" label="实收金额" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="PreServiceTime" label="预计服务用时" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="Remark" label="订单备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ProcessorUserName" label="处理人员" show-overflow-tooltip></el-table-column>
            <el-table-column label="是否支付" width="65">
<template scope="scope">
<i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.PayStatus">
    </i>
<i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
</template>
            </el-table-column>
            <el-table-column label="是否取消" width="65">
<template scope="scope">
<i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsCancel">
    </i>
<i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
</template>
            </el-table-column>
            <el-table-column label="是否退款" width="65">
<template scope="scope">
<i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsCancelPrice">
    </i>
<i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
</template>
            </el-table-column>
            <el-table-column label="是否外采单" width="65" >
<template scope="scope">
<el-popover ref="popover1" placement="top-start" width="200" trigger="hover">
    <p>外采渠道:{{scope.row.PurchaseChannel}}</p>
    <p>外采订单号:{{scope.row.PurchaseOrderNo}}</p>
    <p>外采金额:{{scope.row.PurchasePrice}}</p>
    <p>外采处理人:{{scope.row.PurchasProcessor}}</p>
    <p>外采备注:{{scope.row.PurchaseRemark}}</p>
    <p>是否报销:{{scope.row.IsPurchaseReturned?"是":"否"}}</p>
    <p>报销时间:{{scope.row.PurchaseReturnedTime}}</p>
    <p>报销处理人:{{scope.row.PurchaseReturnedProcessor}}</p>
</el-popover>
<div v-popover:popover1>
    <i class="el-icon-circle-check" style="color:#13CE66" v-if="scope.row.IsPurchase"></i>
    <i class="el-icon-circle-cross" style="color:#FF4949" v-else></i>
</div>
</template>
            </el-table-column>
            <el-table-column label="操作" width="90" fixed="right">
<template scope="scope">
<el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">
    编辑</el-button>
<el-popover ref="popover" placement="top" width="200">
    <h5>航班动态</h5>
    <p>航班号：{{airInformationList.FlightNo}}</p>
    <p>起飞时间：{{airInformationList.TakeOffTime}}</p>
    <p>到达时间：{{airInformationList.ArrivalTime}}</p>
    <p>状态：{{airInformationList.Stat}}</p>
    <p>前序航班状态：{{airInformationList.PreStat}}</p>
    <p>更新时间：{{airInformationList.UpdateTime}}</p>
    <p>最后查询结果：{{airInformationList.LastQueryResult}}</p>
</el-popover>
<el-button size="small" v-popover:popover @click="showAirInformations(scope.row.CarriageNo,scope.row.UseTime)">查询航班</el-button>
</template>
            </el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 30, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
        <el-dialog :title="form.id?'编辑线下订单':'添加线下订单'" size="small" v-model="showDialog" :append-to-body="true" @close="resetForm('form')">
            <el-form ref="form" :model="form" :rules="rules" label-width="110px">
                <el-row :gutter="24" >
                  <el-col :span="12">
                      <el-form-item label="订单渠道" prop="channel">
                          <el-select v-model="form.channel" placeholder="请选择订单渠道">
                              <el-option v-for="(item,index) in channelList" :key="index" :label="item.ChannelName" :value="item.ChannelName">
                                  <span style="float: left">{{ item.ChannelName }}</span>
                              </el-option>
                          </el-select>
                      </el-form-item>
                  </el-col>
                    <el-col :span="12" v-if="form.id">
                        <el-form-item>
                            <el-button type="primary" @click="syncOrderOperData()" :loading="loading2">查询订单里程信息</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">

                    <el-col :span="12">
                        <el-form-item label="外部订单号" prop="externalOrderID">
                            <el-input placeholder="请输入外部订单号" v-model="form.externalOrderID"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="产品类型" prop="carTransportType">
                            <el-select v-model="form.carTransportType" placeholder="请选择产品类型">
                                <el-option v-for="(item,index) in carTransportTypeList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="提单时间" prop="bookTime">
                            <el-date-picker v-model="form.bookTime" type="datetime" placeholder="请选择提单时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预约用车时间" prop="useTime">
                            <el-date-picker v-model="form.useTime" type="datetime" placeholder="请选择预约用车时间">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="车型类别" prop="carClassify">
                            <el-select v-model="form.carClassify" placeholder="请选择车型类别">
                                <el-option v-for="(item,index) in carClassifyList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="航班号/车次号" prop="carriageNo">
                            <el-input placeholder="请输入航班号/车次号" v-model="form.carriageNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地" prop="origin">
                            <el-input placeholder="请输入始发地" v-model="form.origin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地" prop="destination">
                            <el-input placeholder="请输入目的地" v-model="form.destination"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地详细地址" prop="originAddress">
                            <el-input placeholder="请输入始发地详细地址" v-model="form.originAddress"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地详细地址" prop="destinationAddress">
                            <el-input placeholder="请输入目的地详细地址" v-model="form.destinationAddress"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="联系人姓名" prop="linkName">
                            <el-input placeholder="请输入联系人姓名" v-model="form.linkName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系人电话" prop="linkPhone">
                            <el-input placeholder="请输入联系人电话" v-model="form.linkPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="过路过桥费" prop="roadBridgeFee">
                            <el-input placeholder="请输入过路过桥费" v-model="form.roadBridgeFee"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="停车费" prop="parkingFee">
                            <el-input placeholder="请输入停车费" v-model="form.parkingFee"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="应收费用" prop="dealPrice">
                            <el-input placeholder="请输入应收费用" v-model="form.dealPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="其它费用" prop="otherPrice">
                            <el-input placeholder="请输入其它费用" v-model="form.otherPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="实收费用" prop="realPrice">
                            <el-input placeholder="请输入实收费用" v-model="form.realPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="工作人员" prop="staffUserName">
                            <el-input placeholder="请输入工作人员" v-model="form.staffUserName" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24" v-if="form.id">
                    <el-col :span="12">
                        <el-form-item label="处理人员" prop="processorUserName">
                            <el-input placeholder="请输入处理人员" v-model="form.processorUserName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="审核人员" prop="auditorUserNaHme">
                            <el-input placeholder="请输入审核人员" v-model="form.auditorUserName"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="支付类型" prop="payType">
                            <el-select v-model="form.payType" placeholder="请选择支付类型">
                                <el-option v-for="(item,index) in payChannelList" :key="index" :label="item.label" :value="item.value">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否支付" prop="payStatus">
                            <el-switch v-model="form.payStatus" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="订单备注" prop="remark">
                            <el-input type="textarea" placeholder="请输入订单备注" v-model="form.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="外部订单状态" prop="externalOrderStete">
                            <el-select v-model="form.externalOrderStete" placeholder="请选择外部订单状态">
                                <el-option v-for="(item,index) in orderSteteList" :key="index" :label="item.label" :value="item.label">
                                    <span style="float: left">{{ item.label }}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否预约单" prop="isAppointment">
                            <el-switch v-model="form.isAppointment" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="始发地经纬度" prop="originCoordinates">
                            <el-input placeholder="请输入始发地经纬度" v-model="form.originCoordinates"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="目的地经纬度" prop="destinationCoordinates">
                            <el-input placeholder="请输入目的地经纬度" v-model="form.destinationCoordinates"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="预计服务里程" prop="preServiceMileage">
                            <el-input placeholder="请输入预计服务里程" v-model="form.preServiceMileage"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预计服务用时" prop="preServiceTime">
                            <el-input placeholder="请输入预计服务用时" v-model="form.preServiceTime"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="外采渠道" prop="purchaseChannel">
                            <el-autocomplete
                                class="inline-input"
                                v-model="form.purchaseChannel"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入外采渠道"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外采订单号" prop="purchaseOrderNo">
                            <el-input placeholder="请输入外采订单号" v-model="form.purchaseOrderNo"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="12">
                        <el-form-item label="外采金额" prop="purchasePrice">
                            <el-input placeholder="请输入外采金额" v-model="form.purchasePrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="是否外采单" prop="isPurchase">
                            <el-switch v-model="form.isPurchase" on-text="" off-text=""></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="外采处理人" prop="purchasProcessor">
                            <el-input placeholder="请输入外采处理人" v-model="form.purchasProcessor"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="外采备注" prop="purchaseRemark">
                            <el-input type="textarea" placeholder="请输入外采备注" v-model="form.purchaseRemark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="24">
                    <el-col :span="24">
                        <el-form-item label="客人要求" prop="specReq">
                            <el-input type="textarea" placeholder="请输入客人要求" v-model="form.specReq"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <p>外采图片</p>
                <el-row>
                    <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess" style="z-index:99999999"></UploadImage>
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
import path from '../../api/api.js'

import {
    carOrderManageApi,
    orderChannelApi,
    airInformationApi,
    hotelImageApi
} from 'api'
import UploadImage from 'components/upload-image'

export default {
    components: {
        UploadImage
    },
    created() {
        this.filters.useTimeS = new Date().Format('yyyy-MM-dd')
        const now = new Date()
        now.setDate(now.getDate() + 1)
        this.filters.useTimeE = now.Format('yyyy-MM-dd')
        this.loginData = JSON.parse(localStorage.getItem('user'))
        this.fetchData()
    },
    data() {
        return {
            imageList: [],
            airInformationList: [],
            list: [],
            currentPage: 1,
            pageSize: 100,
            count: 0,
            loading: false,
            loading2: false,
            isEditable: true,
            showDialog: false,
            pickerOptions: {},
            pickerOptions2: {
                shortcuts: [{
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
            loginData: '',
            copyForm: {},
            form: {
                id: 0,
                dealPrice: '',
                realPrice: '',
                payStatus: false,
                payType: '',
                linkName: '',
                linkPhone: '',
                specReq: '',
                remark: '',
                channel: '',
                externalOrderID: '',
                externalOrderStete: '',
                carTransportType: '',
                carClassify: '',
                origin: '',
                originAddress: '',
                originCoordinates: '',
                destination: '',
                destinationAddress: '',
                destinationCoordinates: '',
                preServiceMileage: 0,
                preServiceTime: '00:00:00',
                useTime: '',
                bookTime: '',
                isAppointment: true,
                carriageNo: '',
                staffUserId: '',
                staffUserName: '',
                processorUserName: '',
                auditorUserName: '',
                otherPrice: '',
                roadBridgeFee: 0,
                parkingFee: 0,
                isPurchase: false,
                purchaseChannel: '',
                purchaseOrderNo: '',
                purchasePrice: '',
                purchaseRemark: '',
                purchasProcessor: '',
                purchasImg: ''
            },
            sortList: [{
                    value: 'id',
                    label: '默认排序'
                },
                {
                    value: 'channel',
                    label: '按渠道'
                },
                {
                    value: 'carTransportType',
                    label: '产品类型'
                },
                {
                    value: 'carClassify',
                    label: '车型类别'
                },
                {
                    value: 'useTime',
                    label: '用车时间'
                }
            ],
            channelList: [],
            orderSteteList: [{
                    value: 0,
                    label: '待确认'
                },
                {
                    value: 1,
                    label: '已取消'
                },
                {
                    value: 2,
                    label: '已派车'
                },
                {
                    value: 3,
                    label: '已完成'
                }
            ],
            payChannelList: [{
                    value: 0,
                    label: '支付宝'
                },
                {
                    value: 1,
                    label: '微信支付'
                },
                {
                    value: 2,
                    label: '银联支付'
                },
                {
                    value: 3,
                    label: '平台'
                },
                {
                    value: 4,
                    label: '线下支付'
                },
                {
                    value: 5,
                    label: '其他'
                }
            ],
            carTransportTypeList: [{
                    value: 0,
                    label: '接机'
                },
                {
                    value: 1,
                    label: '送机'
                },
                {
                    value: 2,
                    label: '指定线路'
                },
                {
                    value: 3,
                    label: '接站'
                },
                {
                    value: 4,
                    label: '送站'
                },
                {
                    value: 5,
                    label: '包车'
                }
            ],
            carClassifyList: [{
                    value: 0,
                    label: '经济型'
                },
                {
                    value: 1,
                    label: '舒适型'
                },
                {
                    value: 2,
                    label: '商务型'
                },
                {
                    value: 3,
                    label: '豪华型'
                }
            ],
            filters: {
                sortValue: 'id',
                channel: '',
                externalOrderStete: '',
                payStatus: true,
                isCancel: false,
                useTimeS: '',
                useTimeE: '',
                bookTime: '',
                labelVal: 1,
                linkName: '',
                linkPhone: '',
                orderKey: '',
                externalOrderID: '',
                carTransportType: '',
                carClassify: ''
            },

            selectedOptions: [{
                    value: 1,
                    label: '姓名'
                },
                {
                    value: 2,
                    label: '电话'
                },
                {
                    value: 3,
                    label: 'orderKey'
                },
                {
                    value: 4,
                    label: '外部订单号'
                }
            ],
            rules: {
                channel: [{
                    required: true,
                    message: '请选择订单渠道'
                }],
                // externalOrderID: [{
                //     required: true,
                //     message: '请输入外部订单号'
                // }],
                // externalOrderStete: [{
                //     required: true,
                //     message: '请输入外部订单状态'
                // }],
                carTransportType: [{
                    required: true,
                    message: '请选择产品类型'
                }],
                carClassify: [{
                    required: true,
                    message: '请选择车型类别'
                }],
                useTime: [{
                    required: true,
                    message: '请选择预约用车时间'
                }],
                bookTime: [{
                    required: true,
                    message: '请选择提单时间'
                }],
                origin: [{
                    required: true,
                    message: '请输入始发地'
                }],
                destination: [{
                    required: true,
                    message: '请输入目的地'
                }],
                linkName: [{
                    required: true,
                    message: '请输入联系人姓名'
                }],
                linkPhone: [{
                    required: true,
                    message: '请输入联系人电话'
                }],
                dealPrice: [{
                    required: true,
                    message: '请输入应收费用'
                }],
                realPrice: [{
                    required: true,
                    message: '请输入实收费用'
                }],
                otherPrice: [{
                    required: true,
                    message: '请输入其它费用'
                }],
                payType: [{
                    required: true,
                    message: '请选择支付类型'
                }]
            },
            purchaseList: [{
                    value: '携程'
                },
                {
                    value: '滴滴'
                }
            ]
        }
    },
    watch: {
        'form.carTransportType': function(newQuestion) {
            const _self = this
            if (!_self.form.id) {
                if (newQuestion === 0) {
                    _self.form.origin = '流亭国际机场'
                    _self.form.originCoordinates = '120.385920000000,36.267751000000'
                    _self.form.destination = ''
                    _self.form.destinationCoordinates = ''
                } else if (newQuestion === 1) {
                    _self.form.destination = '流亭国际机场'
                    _self.form.destinationCoordinates = '120.385920000000,36.267751000000'
                    _self.form.origin = ''
                    _self.form.originCoordinates = ''
                } else {
                    _self.form.origin = ''
                    _self.form.originCoordinates = ''
                    _self.form.destination = ''
                    _self.form.destinationCoordinates = ''
                }
            }
        },
        imageList(newList) {
            this.form.purchasImg = newList.join(',')
        }
    },
    methods: {
        async handleRemove(index, fileList) {
            this.imageList.splice(index, 1)
        },
        async handleSuccess(response, file, fileList) {
            if (!response) {
                this.$message.error('上传失败,请重新上传')
                return false
            }
            this.imageList.push(response)
        },
        querySearch(queryString, cb) {
            var restaurants = this.purchaseList
            var results = queryString ?
                restaurants.filter(this.createFilter(queryString)) :
                restaurants
            cb(results)
        },
        createFilter(queryString) {
            return restaurant => {
                return restaurant.value.indexOf(queryString.toLowerCase()) === 0
            }
        },
        handleSelect(item) {},
        async showAirInformations(CarriageNo, UseTime) {
            let option = {
                flightNo: CarriageNo,
                begin: UseTime
            }
            const res = await airInformationApi.listAll(option)
            this.airInformationList = res.data
        },
        clear() {
            this.filters = {
                sortValue: 'id',
                channel: '',
                externalOrderStete: '',
                payStatus: '',
                isCancel: '',
                useTimeS: '',
                useTimeE: '',
                bookTime: '',
                labelVal: 1,
                linkName: '',
                linkPhone: '',
                orderKey: '',
                externalOrderID: '',
                carTransportType: '',
                carClassify: ''
            }
        },
        async syncList(type) {
            const _self = this
            _self.list = []
            _self.count = 0
            _self.loading = true
            if (type === 'xiecheng') {
                try {
                    const form = {
                        begin: _self.filters.useTimeS ?
                            new Date(_self.filters.useTimeS).Format('yyyy-MM-dd') : '',
                        end: _self.filters.useTimeE ?
                            new Date(_self.filters.useTimeE).Format('yyyy-MM-dd') : ''
                    }
                    const res = await carOrderManageApi.syncList(form)
                } catch (e) {
                    _self.$message.error('同步携程订单失败!!!')
                }
            } else if (type === 'mile') {
                try {
                    const res = await carOrderManageApi.syncOrderOperDataList()
                } catch (e) {
                    _self.$message.error('同步订单里程信息失败!!!')
                }
            }
            _self.fetchData()
        },
        async syncOrderOperData() {
            const _self = this
            _self.loading2 = true
            try {
                await carOrderManageApi.syncOrderOperData(_self.form.id)
                _self.loading2 = false
            } catch (e) {
                _self.loading2 = false
                console.error(e)
            }
        },
        payStatusChange(a) {
            this.filters.payStatus = a
        },
        isCancelChange(a) {
            this.filters.isCancel = a
        },
        async fetchChannelList() {
            const _self = this
            const res = await orderChannelApi.channelByQuery('用车')
            console.log(res.data)
            _self.channelList = res.data
            let value = {}
            for (var i = 0; i < _self.channelList.length; i++) {
                if (_self.channelList[i].ID === 2003) {
                    value = _self.channelList[i]
                    _self.channelList.splice(i, 1);
                    break;
                }
            }
            _self.channelList.unshift(value)
        },
        async fetchData(currentPage, pageSize) {
            const _self = this
            _self.loading = true
            _self.currentPage = currentPage || _self.currentPage
            _self.pageSize = pageSize || _self.pageSize
            const options = {
                pageIndex: _self.currentPage,
                pageSize: _self.pageSize,
                order: _self.filters.sortValue,
                query: {
                    channel: _self.filters.channel,
                    payStatus: _self.filters.payStatus,
                    isCancel: _self.filters.isCancel,
                    'useTime>': _self.filters.useTimeS ?
                        new Date(_self.filters.useTimeS).Format('yyyy-MM-dd') : '',
                    'useTime<': _self.filters.useTimeE ?
                        new Date(_self.filters.useTimeE).Format('yyyy-MM-dd') : '',
                    'bookTime>': _self.filters.bookTime[0] ?
                        new Date(_self.filters.bookTime[0]).Format('yyyy-MM-dd') : '',
                    'bookTime<': _self.filters.bookTime[1] ?
                        new Date(_self.filters.bookTime[1]).Format('yyyy-MM-dd') : '',
                    linkName: _self.filters.labelVal === 1 ? _self.filters.linkName : '',
                    linkPhone: _self.filters.labelVal === 2 ? _self.filters.linkPhone : '',
                    orderKey: _self.filters.labelVal === 3 ? _self.filters.orderKey : '',
                    externalOrderID: _self.filters.labelVal === 4 ? _self.filters.externalOrderID : '',
                    externalOrderStete: _self.filters.externalOrderStete,
                    carTransportType: _self.filters.carTransportType,
                    carClassify: _self.filters.carClassify
                }
            }
            try {
                const res = await carOrderManageApi.listByQuery(options)
                _self.list = res.data.Data
                _self.count = res.data.Count
                _self.loading = false
                _self.channelList.length === 0 ? _self.fetchChannelList() : ''
            } catch (e) {
                console.error(e)
                _self.loading = false
                _self.$message.error('数据获取失败!!!')
            }
        },
        async downloadList() {
            const _self = this
            const {
                currentPage,
                pageSize,
                filters
            } = this

            const options = {
                order: filters.sortValue,
                query: {
                    channel: filters.channel,
                    payStatus: filters.payStatus,
                    isCancel: filters.isCancel,
                    'useTime>': filters.useTimeS ?
                        new Date(filters.useTimeS).Format('yyyy-MM-dd') : '',
                    'useTime<': filters.useTimeE ?
                        new Date(filters.useTimeE).Format('yyyy-MM-dd') : '',
                    'bookTime>': filters.bookTime[0] ?
                        new Date(filters.bookTime[0]).Format('yyyy-MM-dd') : '',
                    'bookTime<': filters.bookTime[1] ?
                        new Date(filters.bookTime[1]).Format('yyyy-MM-dd') : '',
                    linkName: filters.labelVal === 1 ? filters.linkName : '',
                    linkPhone: filters.labelVal === 2 ? filters.linkPhone : '',
                    orderKey: filters.labelVal === 3 ? filters.orderKey : '',
                    externalOrderID: filters.labelVal === 4 ? filters.externalOrderID : '',
                    externalOrderStete: filters.externalOrderStete,
                    carTransportType: filters.carTransportType,
                    carClassify: filters.carClassify
                }
            }
            try {
                const res = await carOrderManageApi.downloadList(options)
                if (res.request.responseURL) {
                    window.location.href = res.request.responseURL
                }
            } catch (e) {
                _self.$message.error('数据下载失败!!!')
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
        clickAddBtn() {
            const _self = this
            _self.showDialog = true
            _self.form = {
                id: 0,
                dealPrice: '',
                realPrice: '',
                payStatus: false,
                payType: '',
                linkName: '',
                linkPhone: '',
                specReq: '',
                remark: '',
                channel: '',
                externalOrderID: '',
                externalOrderStete: '',
                carTransportType: '',
                carClassify: '',
                origin: '',
                originAddress: '',
                originCoordinates: '',
                destination: '',
                destinationAddress: '',
                destinationCoordinates: '',
                preServiceMileage: 0,
                preServiceTime: '00:00:00',
                useTime: '',
                bookTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
                isAppointment: true,
                carriageNo: '',
                staffUserId: '',
                staffUserName: '',
                processorUserName: '',
                auditorUserName: '',
                otherPrice: '',
                roadBridgeFee: '',
                parkingFee: '',
                isPurchase: false,
                purchaseChannel: '',
                purchaseOrderNo: '',
                purchasePrice: '',
                purchaseRemark: '',
                purchasProcessor: '',
                purchasImg: ''
            }
            _self.form.staffUserId = _self.loginData.id
            _self.form.staffUserName = _self.loginData.username
        },
        async getImageList(list) {
            if (list) {
                const images = list.split(',')
                if (Array.isArray(images)) {
                    this.imageList = images
                }
            }
        },
        async clickEditBtn($index, row) {
            const _self = this
            _self.imageList = []
            try {
                const res = await carOrderManageApi.detail(row.ID)
                // _self.copyForm = res.data.Data
                _self.showDialog = true
                _self.form.id = res.data.Data.ID
                _self.form.dealPrice = res.data.Data.DealPrice
                _self.form.realPrice = res.data.Data.RealPrice
                _self.form.payStatus = res.data.Data.PayStatus
                _self.form.payType = res.data.Data.PayType
                _self.form.linkName = res.data.Data.LinkName
                _self.form.linkPhone = res.data.Data.LinkPhone
                _self.form.specReq = res.data.Data.SpecReq
                _self.form.remark = res.data.Data.Remark
                _self.form.channel = res.data.Data.Channel
                _self.form.externalOrderID = res.data.Data.ExternalOrderID
                _self.form.externalOrderStete = res.data.Data.ExternalOrderStete
                _self.form.carTransportType = res.data.Data.CarTransportType
                _self.form.carClassify = res.data.Data.CarClassify
                _self.form.origin = res.data.Data.Origin
                _self.form.originAddress = res.data.Data.OriginAddress
                _self.form.originCoordinates = res.data.Data.OriginCoordinates
                _self.form.destination = res.data.Data.Destination
                _self.form.destinationAddress = res.data.Data.DestinationAddress
                _self.form.destinationCoordinates = res.data.Data.DestinationCoordinates
                _self.form.preServiceMileage = res.data.Data.PreServiceMileage
                _self.form.preServiceTime = res.data.Data.PreServiceTime
                _self.form.useTime = res.data.Data.UseTime
                _self.form.bookTime = res.data.Data.BookTime
                _self.form.isAppointment = res.data.Data.IsAppointment
                _self.form.carriageNo = res.data.Data.CarriageNo
                // staffUserId
                _self.form.staffUserName = res.data.Data.StaffUserName
                _self.form.processorUserName = res.data.Data.ProcessorUserName
                _self.form.auditorUserName = res.data.Data.AuditorUserName
                _self.form.otherPrice = res.data.Data.OtherPrice
                _self.form.roadBridgeFee = res.data.Data.RoadBridgeFee
                _self.form.parkingFee = res.data.Data.ParkingFee
                _self.form.isPurchase = res.data.Data.IsPurchase
                _self.form.purchaseChannel = res.data.Data.PurchaseChannel
                _self.form.purchaseOrderNo = res.data.Data.PurchaseOrderNo
                _self.form.purchasePrice = res.data.Data.PurchasePrice
                _self.form.purchaseRemark = res.data.Data.PurchaseRemark
                _self.form.purchasProcessor = res.data.Data.PurchasProcessor
                _self.form.purchasImg = res.data.Data.PurchasImg
                _self.copyForm = Object.assign({}, _self.form)
                _self.getImageList(_self.form.purchasImg)
            } catch (e) {
                console.error(e)
            }
        },
        submitForm() {
            const _self = this
            if (_self.form.id) {
                _self.editSave()
            } else {
                _self.addSave()
            }
        },
        async addSave() {
            const _self = this
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        _self.form.useTime = new Date(_self.form.useTime).Format(
                            'yyyy-MM-dd hh:mm:ss'
                        )
                        _self.form.bookTime = new Date(_self.form.bookTime).Format(
                            'yyyy-MM-dd hh:mm:ss'
                        )
                        _self.isEditable = false
                        await carOrderManageApi.add(_self.form)
                        _self.fetchData()
                        _self.$refs['form'].resetFields()
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
                } else {
                    return false
                }
            })
        },
        async editSave() {
            const _self = this
            console.log(66666, _self.form)
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        const form = {}
                        for (let [k, v] of Object.entries(_self.form)) {
                            if (_self.form[k] != _self.copyForm[k]) {
                                form[k] = v
                            }
                        }
                        form.useTime ?
                            (form.useTime = new Date(_self.form.useTime).Format(
                                'yyyy-MM-dd hh:mm:ss'
                            )) :
                            ''
                        form.bookTime ?
                            (form.bookTime = new Date(_self.form.bookTime).Format(
                                'yyyy-MM-dd hh:mm:ss'
                            )) :
                            ''
                        _self.isEditable = false
                        await carOrderManageApi.edit(_self.form.id, form)
                        _self.fetchData()
                        _self.$refs['form'].resetFields()
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
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
#car-order-manage-page {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .mbtm-10 {
        margin-bottom: 10px;
    }
    .demo-table-expand .el-form-item span {
        color: orange;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 100px 10px 16px !important;
    }
    .el-autocomplete,
    .el-dropdown {
        display: block !important;
    }
}
</style>
