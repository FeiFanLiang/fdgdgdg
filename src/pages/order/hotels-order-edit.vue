<template>
<div id="HotelsOrderEdit">
    <h1>{{HotelName}}</h1>
    <el-form ref="form" :model="form" label-width="110px" element-loading-text="拼命加载中" v-loading="loading">
        <el-row :gutter="24">
            <el-col :span="6">
                <el-form-item label="酒店名称" prop="HotelName">
                    <el-input placeholder="请输入酒店名称" v-model="form.HotelName"></el-input>                  
                </el-form-item> 
            </el-col> 
            <el-col :span="6">
                <el-form-item label="订单号" prop="PlatOrderNo">
                    <el-input placeholder="请输入订单号" v-model="form.PlatOrderNo"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="订单状态" prop="OrderState">
                <el-select v-model="form.OrderState" clearable style="width:100%;">
                    <el-option v-for="item in OrderState" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                <el-form-item label="间/夜">
                        <el-input placeholder="请输入间数" v-model="form.RoomNum" style="width:40%;"></el-input> /
                        <el-input placeholder="请输入晚数" v-model="form.NightNum" style="width:40%;"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="订单编号" prop="OrderNo">
                    <el-input placeholder="请输入订单编号" v-model="form.OrderNo"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="6">
                <el-form-item label="付款货币" prop="CurrencyFu">
                    <el-select v-model="form.CurrencyFu" clearable style="width:100%;">
                        <el-option v-for="item in Currency" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="收款货币" prop="CurrencyShou">
                    <el-select v-model="form.CurrencyShou" clearable style="width:100%;">
                        <el-option v-for="item in Currency" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="收款金额" prop="AmountShou">
                    <el-input placeholder="请输入收款金额" v-model="form.AmountShou"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="付款金额" prop="AmountFu">
                    <el-input placeholder="请输入付款金额" v-model="form.AmountFu"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="6">
                <el-form-item label="人工处理状态" prop="HandState">
                <el-select v-model="form.HandState" clearable style="width:100%;">
                    <el-option v-for="item in HandState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                            <el-form-item label="处理备注" prop="HandRemark" >
                                <el-input  type="textarea" v-model="form.HandRemark" autosize :minlength="200"></el-input>
                            </el-form-item>
                     
                      
                      
                          <!---    <div>
                                <el-checkbox-group  @change="handleChecked(index)" v-model="check">
                                     <el-checkbox-button  label="无房拒单" ></el-checkbox-button>
                                     <el-checkbox-button  label="政策不符" ></el-checkbox-button>
                                     <el-checkbox-button  label="赔钱拒单" ></el-checkbox-button>                                                                     
                                </el-checkbox-group>
                            </div>         -->                                          
            </el-col>
            
        </el-row>
        <el-row :gutter="24">
            <el-col :span="6">
            <el-form-item label="酒店区域" prop="HotelArea">
                <el-radio-group v-model="form.HotelArea">
                    <el-radio :label="1">国际</el-radio>
                    <el-radio :label="0">国内</el-radio>
                </el-radio-group>
            </el-form-item>
            </el-col>
             <el-col :span="18">
                <el-button @click="addtext($event)" style="margin-left:110px;margin-bottom:22px">无房拒单</el-button>
                <el-button @click="addtext($event)">政策不符</el-button>
                <el-button @click="addtext($event)">赔钱拒单</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="6">
                <el-form-item label="回填状态" prop="BackfillState">
                    <span v-if="form.BackfillState == 0" style="color:orange">未回填</span>
                    <span v-if="form.BackfillState == 1" style="color:orange">已回填</span>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="审核状态" prop="BackfillState">
                    <span v-if="form.StateAuditor == 0" style="color:orange">未审核</span>
                    <span v-if="form.StateAuditor == 1" style="color:orange">已审核</span>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="submitOrderList()">保存</el-button>
            </el-col>
            <el-col :span="6">
                <el-button @click="shenhe()" v-show="showTuigaiButton">退改审核</el-button>
                <el-button @click="obsoleteShenhe()" v-show="showTuigaiButton">废单审核</el-button>
            </el-col>
        </el-row>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin-bottom:20px;" />
        <el-collapse accordion style="border-right: none;" @change="caiwuDetail(activeName)" v-model="activeName">
            <el-collapse-item :key="item.id" v-for="(item,index) in form.HotelOrderDetail" style="border-right: none;" :name="item.ID">
                <template slot="title">
                    <span v-if="item.UpdateTime != null">
                        {{item.PlatOrderType + '单' + item.UpdateTime.substring(5,10)}}
                    </span>
                </template>
                <!--///////////////////////////////////-->
                <el-form ref="item" :model="item" label-width="110px">
                    <el-row :gutter="24"><el-col :span="24" style="color:orange;"><h1>订单信息</h1></el-col></el-row>
                    <el-row :gutter="24">
                        <el-col :span="10">
                            <el-form-item label="酒店名称" prop="HotelName">
                                <el-input placeholder="请输入酒店名称" v-model="item.HotelName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :offset='2' :span="6">
                            <el-form-item label="外采标记" prop="WaiCaiFlag">
                                <!-- <span v-if="item.WaiCaiFlag == 0" style="color:orange">自营</span>
                                <span v-if="item.WaiCaiFlag == 1" style="color:orange">外采</span> -->
                                <el-select v-model="item.WaiCaiFlag" clearable>
                                    <el-option v-for="(item,index) in WaiCaiFlag " :key="index" :label="item.label" :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="外采渠道" prop="WaiCaiPlatID">
                                <el-select v-model="item.WaiCaiPlatID" clearable>
                                    <el-option v-for="(item,index) in WaiCaiPlatID " :key="index" :label="item.Account" :value="item.ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="订单号" prop="PlatOrderNo">
                                <el-input placeholder="请输入订单号" v-model="item.PlatOrderNo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="确认号" prop="HotelBookingNo">
                                <el-input placeholder="请输入确认号" v-model="item.HotelBookingNo"></el-input>
                            </el-form-item>
                        </el-col>
                       <el-col :span="6">
                            <el-form-item label="外采订单号" prop="WaiCaiNo">
                                <el-input placeholder="请输入外采订单号" v-model="item.WaiCaiNo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="外采支付账户" prop="WaiCaiPayAccount">
                                <el-select v-model="item.WaiCaiPayAccount" clearable>
                                    <el-option v-for="(item,index) in WaiCaiPayAccount " :key="index" :label="item.ShortName" :value="item.ShortName"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        
                        <el-col :span="6">
                            <el-form-item label="酒店ID" prop="HotelID">
                                <el-input placeholder="请输入酒店ID" v-model="item.HotelID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="平台酒店ID" prop="PlatHotelID">
                                <el-input placeholder="请输入平台酒店ID" v-model="item.PlatHotelID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="酒店协议ID" prop="HotelPolicyID">
                                <el-input placeholder="请输入酒店协议ID" v-model="item.HotelPolicyID"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="早餐" prop="Breakfast">
                                <el-input  placeholder="请输入早餐" v-model="item.Breakfast" autosize></el-input>
                            </el-form-item>                                                          
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="平台信息" prop="PlatPolicyID">
                                <el-select v-model="item.PlatPolicyID" clearable>
                                    <el-option v-for="(item,index) in PlatPolicyIDs " :key="index" :label="item.Account" :value="item.ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="订单平台" prop="ThreePlatID">
                                <el-select v-model="item.ThreePlatID" clearable>
                                <el-option v-for="items in ThreePlatID" :key="items.ID" :label="items.PlatName" :value="items.ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="账户名称" prop="AccountName">
                                <el-input placeholder="请输入账户名称" v-model="item.AccountName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                        <el-form-item label="房型" prop="Room">
                            <el-input placeholder="请输入房型" v-model="item.Room"></el-input>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        
                        <el-col :span="6">
                            <el-form-item label="入住人" prop="Passenger">
                                <el-input placeholder="请输入入住人" v-model="item.Passenger"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="入住日期" prop="StayDateStart">
                                <el-date-picker v-model="item.StayDateStart" type="date" placeholder="选择入住日期" style="width:100%;" :picker-options="pickerOptions" @change="ruzhu"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="退房日期" prop="StayDateEnd">
                                <el-date-picker v-model="item.StayDateEnd" type="date" placeholder="选择退房日期" style="width:100%;" :picker-options="pickerOptions2" @change="tuifang"></el-date-picker>
                            </el-form-item>
                        </el-col>
                         <el-col :span="6">
                            <el-form-item label="预定时间" prop="BookTime">
                                <el-date-picker v-model="item.BookTime" type="datetime" placeholder="选择预定时间" style="width:100%"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="间/夜">
                                <el-input placeholder="请输入间数" v-model="item.RoomNum" style="width:40%;"></el-input>/
                                <el-input placeholder="请输入晚数" v-model="item.NightNum" style="width:40%;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="到店时间" prop="ArrivalTime">
                                <el-time-select v-model="item.ArrivalTime" :picker-options="{start:'00:00',step:'00:15',end:'24:00'}" placeholder="选择时间" style="width:100%"></el-time-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="联系电话" prop="PassengerTel">
                                <el-input placeholder="请输入联系电话" v-model="item.PassengerTel"></el-input>
                            </el-form-item>
                        </el-col>
                         <el-col :span="6">
                            <el-form-item label="床型" prop="Bed">
                                <el-input  placeholder="请输入床型" v-model="item.Bed" autosize></el-input>
                            </el-form-item>                                                          
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="客人要求" prop="PassengerAsk">
                                <el-input type="textarea" v-model="item.PassengerAsk" autosize></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="订单状态" prop="OrderState">
                                <el-select v-model="item.OrderState" clearable>
                                <el-option v-for="items in OrderState" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="订单类型" prop="OrderType">
                                <el-select v-model="item.OrderType" clearable>
                                <el-option v-for="items in OrderType" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                       
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="17">
                            <el-form-item label="备注" prop="Remark" >
                                <el-input  type="textarea" v-model="item.Remark" autosize :autosize="{ minRows: 4}"></el-input>
                            </el-form-item>                                                          
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="20" >

                            <el-form-item label="确认函">
                                <el-button @click="tocreate()" style="margin:10px 0;" v-show="Tocreate">添加确认函</el-button>
                                <div v-show="!Tocreate">
                                <tinymce :height="0" :width="756" v-model="item.HotelBookingNote"></tinymce>
                                <el-button @click="create(item.ID,index)" style="margin:10px 0;">生成确认函</el-button>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                    <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>财务信息1</h1></el-col></el-row>
                    <el-row :gutter="24">
                        <el-col :span="10">
                            <el-form-item label="预计收款时间" prop="DateReceipt">
                                <el-date-picker v-model="item.DateReceipt" type="datetime" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="预计付款时间" prop="DatePayment">
                                <el-date-picker v-model="item.DatePayment" type="datetime" placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                    <!--    <el-col :span="6">
                            <el-form-item label="付款货币" prop="CurrencyFuKuan">
                                <el-select v-model="item.CurrencyFuKuan" clearable>
                                <el-option v-for="items in Currency" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                   <!--     <el-col :span="6">
                            <el-form-item label="收款货币" prop="CurrencyShouKuan">
                                <el-select v-model="item.CurrencyShouKuan" clearable>
                                <el-option v-for="items in Currency" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="应收款额" prop="AmountYingShou">
                            <el-select v-model="item.CurrencyShouKuan" clearable style="width:80px;position:relative;margin-right:10px">
                                <el-option v-for="items in Currency" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                                <el-input placeholder="请输入应收款额" v-model="item.AmountYingShou" style="position:absolute;"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" style="margin-left:70px">
                            <el-form-item label="酒店底价" prop="HotelFee">
                             <el-select v-model="item.CurrencyFuKuan" clearable style="width:80px;position:relative;margin-right:10px;">
                                <el-option v-for="items in Currency" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                                <el-input placeholder="请输入酒店底价" v-model="item.HotelFee" style="position:absolute;"></el-input>
                            </el-form-item>
                        </el-col>
                        <!--
                        <el-col :span="6">
                            <el-form-item label="应付款额" prop="AmountYingFu">
                                <el-input placeholder="请输入应付款额" v-model="item.AmountYingFu"></el-input>
                            </el-form-item>
                        </el-col>
                        -->
                    </el-row>
                    <el-row :gutter="24">
                        <!--
                        <el-col :span="6">
                            <el-form-item label="实收款额" prop="AmountShiShou">
                                <el-input placeholder="请输入实收款额" v-model="item.AmountShiShou"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="实付款额" prop="AmountShiFu">
                                <el-input placeholder="请输入实付款额" v-model="item.AmountShiFu"></el-input>
                            </el-form-item>
                        </el-col>
                        -->
                        <!--
                        <el-col :span="6">
                            <el-form-item label="利润" prop="Profit">
                                <el-input placeholder="请输入利润" v-model="item.Profit"></el-input>
                            </el-form-item>
                        </el-col>
                        -->
                    </el-row>
                    <el-row :gutter="24">
                        <!--
                        <el-col :span="6">
                            <el-form-item label="改期费" prop="FeeChange">
                                <el-input placeholder="请输入改期费" v-model="item.FeeChange"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="退票费" prop="FeeCancel">
                                <el-input placeholder="请输入退票费" v-model="item.FeeCancel"></el-input>
                            </el-form-item>
                        </el-col>
                        -->
                    </el-row>
                    <el-row :gutter="24">
                        <!--
                        <el-col :span="6">
                            <el-form-item label="优惠金额" prop="Discounts">
                                <el-input placeholder="请输入优惠金额" v-model="item.Discounts"></el-input>
                            </el-form-item>
                        </el-col>
                        -->
                        <el-col :span="6">
                            <el-form-item label="其他费用" prop="OherFee">
                                <el-input placeholder="请输入其他费用" v-model="item.OherFee"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="佣金" prop="CommissionStr">
                                <el-input placeholder="请输入佣金" v-model="item.CommissionStr"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算周期（付）" prop="SettlementCycleFu">
                                <el-select v-model="item.SettlementCycleFu" clearable>
                                <el-option v-for="items in SCycle" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="结算周期（收）" prop="SettlementCycle">
                                <el-select v-model="item.SettlementCycle" clearable>
                                <el-option v-for="items in SCycle" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="紧急打款" prop="UrgentPay">
                                <el-switch on-text="紧急" off-text="否" :on-value="1" :off-value="0" v-model="item.UrgentPay"></el-switch>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="是否合并支付" prop="UnMergePay">
                                <el-switch on-text="是" off-text="否" :on-value="0" :off-value="1" v-model="item.UnMergePay"></el-switch>
                                <span v-if="item.UnMergePay == 0" style="color:orange">可合并支付</span>
                                <span v-if="item.UnMergePay == 1" style="color:orange">不可合并支付</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                    <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>财务信息2</h1></el-col></el-row>
                    <div style="width:98%;height:50px;position: relative;">
                        <el-button @click="addCaiwu" style="position:absolute;right:0;">添加</el-button>
                    </div>
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
                    <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>附加项目</h1></el-col></el-row>
                    <div style="width:98%;height:50px;position: relative;"><el-button @click="addFujia" style="position:absolute;right:0;">添加</el-button></div>
                    <el-row :gutter="24">
                        <el-col>
                            <el-table :data="fujia" style="width: 95%;margin-left:40px;" border>
                            <el-table-column label="订单号" prop="PlateOrderNo"></el-table-column>
                            <el-table-column label="订单类型" prop="TypeID">
                                <template scope="scope">
                                    <span v-if="scope.row.TypeID === 0">门票</span>
                                    <span v-if="scope.row.TypeID === 1">车票</span>
                                    <span v-if="scope.row.TypeID === 2">自助餐</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="订单来源" prop="PlateName"></el-table-column>
                            <el-table-column label="金额" prop="Money"></el-table-column>
                            <el-table-column label="使用时间" prop="UseDate"></el-table-column>
                            <el-table-column label="创建时间" prop="CreateDate"></el-table-column>
                            <el-table-column label="创建人" prop="UserID"></el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin-top:20px;" />
        <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>订单截图</h1></el-col></el-row>
        <el-row :gutter="20">
            <el-col style="margin-left:40px;">
                <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
            </el-col>
        </el-row>
    </el-form>
    <div class="dialog-footer" style="text-align:center;margin-top:30px;">
        <el-button size="large" @click="cancel()">取消</el-button>
        <el-button type="primary" @click="submitOrderList()" :loading="!isEditable" size="large">{{isEditable?text:'提交中'}}</el-button>
    </div>
    <el-dialog title="添加附加项目" v-model="showFujia" @close="resetForm('formFujia')" size="small">
      <el-form ref="formFujia" :model="formFujia" label-width="110px">
        <el-form-item label="订单ID" prop="HotelOrderID">
            <el-input placeholder="请输入订单ID" v-model="formFujia.HotelOrderID" style="width:100%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="Money">
            <el-input placeholder="请输入金额" v-model="formFujia.Money" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="订单来源" prop="PlateName">
            <el-input placeholder="请输入订单来源" v-model="formFujia.PlateName" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="订单号" prop="PlateOrderNo">
            <el-input placeholder="请输入订单号" v-model="formFujia.PlateOrderNo" style="width:100%"></el-input>
        </el-form-item>
        <el-form-item label="使用时间" prop="UseDate">
            <el-date-picker v-model="formFujia.UseDate" type="date" placeholder="选择使用时间" style="width:100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="订单类型" prop="TypeID">
            <el-select v-model="formFujia.TypeID" clearable>
              <el-option v-for="item in TypeID" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="创建时间" prop="CreateDate">
            <el-input placeholder="请输入创建时间" v-model="formFujia.CreateDate" style="width:100%" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="Remark">
            <el-input type="textarea" v-model="formFujia.Remark" style="width:100%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showFujia = false">取 消</el-button>
        <el-button type="primary" @click="submitFormFujia()">保存</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import {
  hotelsOrderApi,
  paymentCheckApi,
  hotelThreePlatInfoApi,
  hotelOrderDetailApi,
  payCompanyApi,
  policyApi
} from 'api'
import UploadImage from 'components/upload-image'
import Tinymce from 'components/Tinymce'
export default{
    components: {
        UploadImage,
        Tinymce
    },
    data(){
        let that = this;
        return{
            stringWX:'',
            check:[],
            stringQRH:'',
            Tocreate:true,
            Passenger : '',
            StayDateStart : '',
            StayDateEnd : '',
            Room : '',
            RoomNum : '',
            NightNum : '',
            HotelName : '',
            Company:'',
            //////////////////////////////
            ID: '',
            POrderID: '',
            HotelName: '',
            type:'',
            text:'',
            imageList: [],
            HandRemark: '',
            showTuigaiButton:false,
            topform:'',
            loading:false,
            showFujia: false,
            showCaiwu: false,
            isEditable: true,
            fileList: [],
            ThreePlatID:[],
            form: {
                StayDateStart: '',
                StayDateEnd: '',
                BookTime: '',
                OrderState: '',
                HandState: '',
                OrderType: '',
                Bed:'',
                Breakfast:'',
                UrgentPay: '',
                UnMergePay: '',
                HotelArea: '',
                BackfillState: '',
                StateScreenshot: '',
                SettlementCycle: '',
                SettlementCycleFu: '',
                ThreePlatID: '',
                OrderNo: '',
                WaiCaiNo: '',
                NightNum: '',
                Remark: '',
                HandRemark:'',
                RoomNum: '',
                CurrencyFuKuan: '',
                CurrencyShouKuan: '',
                HotelOrderDetail:[],
                Picture:'',
                WaiCaiPlatID:'',
                WaiCaiNo:'',
                WaiCaiFlag:'',
                WaiCaiPayAccount:''
            },
            copyForm: {},
            pickerOptions: {
                disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(that.form.StayDateEnd).getTime() - 8.64e7;
                }
            },
            pickerOptions2: {
                disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7 || time.getTime() < new Date(that.form.StayDateStart).getTime();
                }
            },
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
            formFujia: {
                UseDate: '',
                TypeID: '',
                HotelOrderID: ''
            },
            formCaiwu: {},
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
                },
            ],
            WaiCaiPlatID:[],
            WaiCaiPayAccount:[],
            PlatPolicyIDs:[],
            Beizhu:[],
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
            activeName:''
        }
    },
    created() {
        
        const _self = this
        _self.ID = _self.$route.params.ID
        //_self.HotelName = _self.$route.params.HotelName,
        _self.POrderID = _self.$route.params.POrderID      
        _self.type = _self.$route.params.type
        if(_self.type == '回填'){
            _self.text = '确定回填'
        }else if(_self.type == '审核'){
            _self.text = '确定审核'
        }else if(_self.type == '退改'){
            _self.showTuigaiButton = true
            _self.text = '退改保存'
        }else{
            _self.text = '保存'
        }
        if (_self.ID) {
            _self.getHotelOrderList(_self.ID,_self.POrderID)
        }
        _self.ThreePlat()
        _self.platformAccount()
        _self.platformAccounts()
        _self.fetchData()
    },
    methods:{
        async caiwuDetail(id){
            const res = await paymentCheckApi.getAccount(id)
            this.money = res.data.Data
        },
        async fetchData() {
            const options = {
                query: { 
                    Own:1
                }
                }
            const res = await payCompanyApi.list(options)
            this.WaiCaiPayAccount = res.data.Data
          //  console.log(this.WaiCaiPayAccount)
                
        },
        async platformAccount(){
            const options = {
                pageSize: 1000,
                order: 'Sort',
                query:{CanPurchase:true}
            }     
            const res = await policyApi.getPolicyPlatform(options)
            this.WaiCaiPlatID = res.data.Data
            console.log(this.WaiCaiPlatID)
        },
        async platformAccounts(){
            const options = {
                pageSize: 1000,
                order: 'Sort',
                query:{CanSale:true}
            }     
            const res = await policyApi.getPolicyPlatform(options)
            this.PlatPolicyIDs = res.data.Data
            console.log(this.PlatPolicyIDs)
        },
        tocreate(){
            const _self = this
            if(_self.Tocreate){
                _self.Tocreate = false
            }            
        },
        setContent(){
            const _self = this
            _self.stringWX = `<div style="font-size: 18px;"><p>`+_self.Company+`<br />入住人：`+_self.Passenger+`<br />入离日期：`+_self.StayDateStart+`至`+_self.StayDateEnd+`<br />预订房型：`+_self.Room+`&nbsp; &nbsp;`+_self.RoomNum+`间`+_self.NightNum+`晚<br />早餐类型：含x早<br />房价：xx </p></div>`
            _self.stringQRH = `<div style="font-size: 18px;">
                <p style="text-align: center; font-size: 29px;">`+_self.Company+`订房确认函</p>
                <p style="text-align: left;">&nbsp; &nbsp; &nbsp; From:&nbsp;`+_self.Company+`</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;TO: <span style="font-size: 16px;">`+_self.HotelName+`</span>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;FAX:&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;TEL:</p>
                <p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 您好！&nbsp;</p>
                <p style="text-align: left;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;以下是我司客户订房消息，请查收！</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 顺祝商祺！</p>
                <p>确认信息：</p>
                <table style="border: 1px solid black; border-collapse: collapse; width: 756;">
                <tbody>
                <tr>
                <td style="border: solid black 1px;" colspan="2" width="756">
                <p>客人姓名：&nbsp;`+_self.Passenger+`</p>
                <p>&nbsp;</p>
                </td>
                </tr>
                <tr>
                <td style="border: solid black 1px;" width="305">
                <p>入住日期：<span style="font-size: 12px;">`+_self.StayDateStart+`</span></p>
                </td>
                <td style="border: solid black 1px;" width="318">
                <p>退房日期：<span style="font-size: 12px;">`+_self.StayDateEnd+`</span></p>
                </td>
                </tr>
                <tr>
                <td style="border: solid black 1px;" width="305">
                <p>房型名称：<span style="font-size: 14px;">`+_self.Room+`</span></p>
                </td>
                <td style="border: solid black 1px;" width="318">
                <p>间夜数：&nbsp;&nbsp;`+_self.NightNum+` 间`+_self.NightNum+`夜&nbsp;</p>
                </td>
                </tr>
                <tr>
                <td style="border: solid black 1px;" colspan="2" width="623">
                <p>房价：</p>
                </td>
                </tr>
                </tbody>
                </table>
                <p><br />&nbsp; &nbsp; &nbsp; 付费方式：网上转账&nbsp;</p>
                <p>&nbsp; &nbsp; &nbsp; 签发部门：`+_self.Company+`&nbsp; &nbsp; &nbsp;联系电话：15698161689</p>
                <p>&nbsp; &nbsp; &nbsp; 传&nbsp;&nbsp;&nbsp;&nbsp;真：0532-58715050转801&nbsp; &nbsp; &nbsp;联&nbsp;系&nbsp;人：孙</p>
                <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;签发日期：2017年&nbsp;6月25日</p>
                <p>&nbsp; &nbsp; &nbsp; 如无异议，请于2017年6月25日1200时前确认回执。谢谢！</p>
                <p>&nbsp;</p>
                </div>`;
        },
        async create(ID,index){
            const _self = this
            const res = await hotelOrderDetailApi.getDetail(_self.ID)
            _self.datas = res.data.Data
            //console.log(_self.datas)
            let detail = _self.datas.detail
            if(_self.datas.policy.ReserveModeID == 1 || _self.datas.policy.ReserveModeID == 2){
                _self.Passenger = detail.Passenger
                _self.StayDateStart = detail.StayDateStart ? detail.StayDateStart.substring(0,10) : ''
                _self.StayDateEnd = detail.StayDateEnd ? detail.StayDateEnd.substring(0,10) : ''
                _self.Room = detail.Room
                _self.RoomNum = detail.RoomNum
                _self.NightNum = detail.NightNum
                _self.Company = _self.datas.policy.FinancialInfo.Company
                _self.setContent()
                tinyMCE.editors[index].setContent(_self.stringWX)
            }
            if(_self.datas.policy.ReserveModeID == 3 || _self.datas.policy.ReserveModeID == 4){
                _self.HotelName = detail.HotelName
                _self.Passenger = detail.Passenger
                _self.StayDateStart = detail.StayDateStart ? detail.StayDateStart.substring(0,10) : ''
                _self.StayDateEnd = detail.StayDateEnd ? detail.StayDateEnd.substring(0,10) : ''
                _self.Room = detail.Room
                _self.RoomNum = detail.RoomNum
                _self.NightNum = detail.NightNum
                _self.Company = _self.datas.policy.FinancialInfo.Company
                _self.setContent()
                tinyMCE.editors[index].setContent(_self.stringQRH)
            }

        },
        async getImageList(list) {
            if (list) {
                const images = list.split(',')
                if (Array.isArray(images)) {
                    this.imageList = images
                }
            }
        },
        async handleSuccess(response, file, fileList) {
            if (!response) {
                this.$message.error('上传失败,请重新上传')
                return false
            }
            this.imageList.push(response)
            let f = this.imageList
            this.form.Picture = f.toString()
        },
        handleRemove(index,file, fileList) {
            this.imageList.splice(index, 1)
            let f = this.imageList
            this.form.Picture = f.toString()
        },
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
        async getHotelOrderList(ID,POrderID){
            const _self = this
            _self.loading = true
            try {
                const res = await hotelsOrderApi.getOrderList(POrderID)
                _self.form = res.data.Data
                _self.getImageList(_self.form.Picture)
                _self.HotelName = _self.form.HotelName
                const options = {
                    query: {
                        HotelOrderID: ID
                    }
                }
                const res3 = await paymentCheckApi.fujiaList(options)
                _self.fujia = res3.data.Data
                _self.copyForm = Object.assign({}, _self.form)
                _self.loading = false
            } catch (e) {
                console.error(e)
            }
        },
        async submitOrderList() {
            const _self = this
            for(let i in _self.form.HotelOrderDetail){
                _self.form.HotelOrderDetail[i].HotelBookingNote = tinyMCE.editors[i].getContent()
            }
            
            try {
                _self.isEditable = false
                if(_self.type == '回填'){
                    _self.form.BackfillState = 1
                }
                if(_self.type == '审核'){
                    _self.form.StateAuditor = 1
                }
              

                
                let datas = _self.form
                 console.log(datas)
                 return false
                //datas.Addition = _self.fujia
                //datas.PaymentInfo = _self.money
                if(_self.type == '审核'){
                   await hotelsOrderApi.checkSave(datas)                  
                }else{
                 
                   await hotelsOrderApi.edit(datas)
                  
                }
                 const mes = await hotelsOrderApi.edit(datas)
                 console.log(mes)
                
                if(mes.data.State != true){
                  _self.$message.error(mes.data.Msg)
                  }else{
                     _self.$message({
                        message: '编辑成功',
                        type: 'success'
                     })
                    _self.$router.go(-1)
                  }      
                } catch (e) {
                    console.error(e)
                    _self.$message.error('编辑失败!!!')
                } finally {
                    _self.isEditable = true
                }
        },
        cancel(){
            this.$router.go(-1)
        },
        async addFujia() {
            const _self = this
            _self.showFujia = true
            let date = new Date().Format('yyyy-MM-dd hh:mm')
            _self.formFujia = {
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
        async topsub(){
            const _self = this
            _self.topform = {
                HotelName:_self.form.HotelName,
                PlatOrderNo:_self.form.PlatOrderNo,
                OrderState:_self.form.OrderState,
                OrderState:_self.form.OrderState,
                
                
                
            }
            console.log(_self.topform)
            // try {
            //     await paymentCheckApi.addFujia(_self.formFujia)
            //     _self.showFujia = false
            //     _self.$message({
            //     message: '添加成功',
            //     type: 'success'
            //     })
            //     const options = {
            //     query: {
            //         HotelOrderID: _self.ID
            //     }
            //     }
            //     const res3 = await paymentCheckApi.fujiaList(options)
            //     _self.fujia = res3.data.Data
            // } catch (e) {
            //     _self.$message.error('添加失败!!!')
            // }
        },
        async submitFormFujia(){
            const _self = this
            try {
                await paymentCheckApi.addFujia(_self.formFujia)
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
        addCaiwu(){},
        shenhe(){
            this.$router.push({
                name:'订单审核',
                params:{
                    POrderID:this.POrderID,
                    HotelPolicyID:this.form.HotelPolicyID,
                    AmountYingShou:this.form.AmountYingShou,
                    HotelFee:this.form.HotelFee
                }
            })
        },
        async obsoleteShenhe(){
            try {
                await hotelsOrderApi.obsoleteCheck(this.POrderID)
                this.$message({
                    message: '审核成功',
                    type: 'success'
                })
            } catch (e) {
                this.$message.error('审核失败')
            }
        },
        remove(arr,val){
            for(var i=0; i<arr.length; i++) {
                if(arr[i] == val) {
                arr.splice(i, 1);
                break;
                }
            }
        },
         addtext(e){
             const _self = this
             const ntes = e.target.innerText    
             const tim =  _self.form.BookTime
                if(_self.form.HandRemark == undefined){
                    _self.form.HandRemark = ''
                }
                const now  = _self.form.HandRemark
                let up = _self.form.BookTime += ntes
                let num = ''                                        
                up = _self.form.HandRemark +=`,`+ntes
                //console.log(up.length)
                if(up.indexOf(ntes) == -1){
                
                }else{
                    num = up.split(ntes)
                    console.log(up.length)                                        
                    if(num.length-1 == 2){
                        up = up.replace(ntes,'')
                        up = up.replace(",",'')
                        
                    }
                _self.form.HandRemark = up
                _self.form.BookTime = tim                                
                }
//   console.log(_self.form.HotelOrderDetail[index].qweqrqwe)
         
            
        }

    }
}
</script>
