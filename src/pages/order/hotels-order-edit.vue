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
            <el-form-item label="订单编号" prop="OrderNo">
                <el-input placeholder="请输入订单编号" v-model="form.OrderNo"></el-input>
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
                <el-form-item label="间数" prop="RoomNum">
                    <el-input placeholder="请输入间数" v-model="form.RoomNum"></el-input>
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
            <el-col :span="17">
            <el-form-item label="采购渠道" prop="HotelArea">
                <el-radio-group v-model="form.HotelArea">
                    <el-radio :label="1">国际</el-radio>
                    <el-radio :label="0">国内</el-radio>
                    <el-radio :label="2">美国1009</el-radio>
                    <el-radio :label="3">美国2462</el-radio>
                    <el-radio :label="4">好订1009</el-radio>
                    <el-radio :label="5">好订2462</el-radio>
                </el-radio-group>
            </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="24">
            <el-col :span="6">
                <el-form-item label="回填状态" prop="BackfillState">
                    <span v-if="form.BackfillState == 0" style="color:orange">未回填</span>
                    <span v-if="form.BackfillState == 1" style="color:orange">已回填</span>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="审核状态" prop="BackfillState">
                    <span v-if="form.StateAuditor == 0" style="color:orange">未审核</span>
                    <span v-if="form.StateAuditor == 1" style="color:orange">已审核</span>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-button @click="shenhe()" v-show="showTuigaiButton">退改审核</el-button>
            </el-col>
        </el-row>
        <hr style="height:3px;border:none;border-top:3px double #DEE5EB;margin-bottom:30px;" />
        <el-collapse accordion style="border-right: none;">
            <el-collapse-item :key="item.id" v-for="(item,index) in form.HotelOrderDetail" :name="index" style="border-right: none;">
                <template slot="title">
                    <span v-if="item.UpdateTime != ''">
                        {{item.PlatOrderType + '单' + item.UpdateTime.substring(5,10)}}
                    </span>
                </template>
                <!--///////////////////////////////////-->
                <el-form ref="item" :model="item" label-width="110px">
                    <el-row :gutter="24"><el-col :span="24" style="color:orange;"><h1>订单信息</h1></el-col></el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="酒店名称" prop="HotelName">
                                <el-input placeholder="请输入酒店名称" v-model="item.HotelName"></el-input>
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
                            <el-form-item label="订单平台" prop="ThreePlatID">
                                <el-select v-model="item.ThreePlatID" clearable>
                                <el-option v-for="items in ThreePlatID" :key="items.ID" :label="items.PlatName" :value="items.ID"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                        <el-form-item label="房型" prop="Room">
                            <el-input placeholder="请输入房型" v-model="item.Room"></el-input>
                        </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="确认号" prop="HotelBookingNoNeed">
                                <el-input placeholder="请输入确认号" v-model="item.HotelBookingNoNeed"></el-input>
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
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="间数" prop="RoomNum">
                                <el-input placeholder="请输入间数" v-model="item.RoomNum"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="晚数" prop="NightNum">
                                <el-input placeholder="请输入晚数" v-model="item.NightNum"></el-input>
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
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="24">
                            <el-form-item label="订单备注" prop="PassengerAsk">
                                <el-input type="textarea" v-model="item.PassengerAsk"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
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
                        <el-col :span="6">
                            <el-form-item label="预定时间" prop="BookTime">
                                <el-date-picker v-model="item.BookTime" type="datetime" placeholder="选择预定时间" style="width:100%;"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                    <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>财务信息1</h1></el-col></el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="付款货币" prop="CurrencyFuKuan">
                                <el-select v-model="item.CurrencyFuKuan" clearable>
                                <el-option v-for="items in Currency" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="收款货币" prop="CurrencyShouKuan">
                                <el-select v-model="item.CurrencyShouKuan" clearable>
                                <el-option v-for="items in Currency" :key="items.value" :label="items.label" :value="items.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="应收款额" prop="AmountYingShou">
                                <el-input placeholder="请输入应收款额" v-model="item.AmountYingShou"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="应付款额" prop="AmountYingFu">
                                <el-input placeholder="请输入应付款额" v-model="item.AmountYingFu"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
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
                        <el-col :span="6">
                            <el-form-item label="酒店底价" prop="HotelFee">
                                <el-input placeholder="请输入酒店底价" v-model="item.HotelFee"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="利润" prop="Profit">
                                <el-input placeholder="请输入利润" v-model="item.Profit"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="其他费用" prop="OherFee">
                                <el-input placeholder="请输入其他费用" v-model="item.OherFee"></el-input>
                            </el-form-item>
                        </el-col>
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
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="6">
                            <el-form-item label="优惠金额" prop="Discounts">
                                <el-input placeholder="请输入优惠金额" v-model="item.Discounts"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="佣金" prop="Commission">
                                <el-input placeholder="请输入佣金" v-model="item.Commission"></el-input>
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
                        <el-col>
                            <el-form-item label="财务备注" prop="Remark">
                                <el-input type="textarea" v-model="item.Remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <hr style="height:3px;border:none;border-top:3px double #DEE5EB;" />
                    <el-row :gutter="24"><el-col :span="3" style="color:orange;"><h1>订单截图</h1></el-col></el-row>
                    <el-row :gutter="20">
                        <el-col style="margin-left:40px;">
                            <UploadImage :images="imageList" @onRemove="handleRemove" @onSuccess="handleSuccess"></UploadImage>
                            <el-dialog v-model="dialogVisible" size="tiny">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
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
  hotelImageApi
} from 'api'
import UploadImage from 'components/upload-image'
export default{
    components: {
        UploadImage
    },
    data(){
        let that = this;
        return{
            ID: '',
            POrderID: '',
            HotelName: '',
            type:'',
            text:'',
            showTuigaiButton:false,
            imageList: [],
            action: '',
            dialogImageUrl: '',
            loading:false,
            dialogVisible: false,
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
                CurrencyShouKuan: '',
                HotelOrderDetail:[]
            },
            copyForm: {},
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
        }
    },
    created() {
        const _self = this
        _self.ID = _self.$route.params.ID
        _self.getHotel()
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
    },
    methods:{
        async getHotel(){

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
            _self.action = 'http://192.168.10.95:8500/Hotel/Image'
            _self.loading = true
            try {
                const res = await hotelsOrderApi.getOrderList(POrderID)
                _self.form = res.data.Data
                _self.HotelName = _self.form.HotelName
                const res2 = await paymentCheckApi.detail(ID)
                let a = res2.data.Data
                const options = {
                query: {
                    HotelOrderID: ID
                }
                }
                const res3 = await paymentCheckApi.fujiaList(options)
                _self.fujia = res3.data.Data
                for (let i in a) {
                _self.money.push(a[i].HotelPayment)
                }
                _self.copyForm = Object.assign({}, _self.form)
                _self.loading = false
            } catch (e) {
                console.error(e)
            }
        },
        async submitOrderList() {
            const _self = this
            // const form = {}
            // for (let [k, v] of Object.entries(_self.form)) {
            //     if (_self.form[k] != _self.copyForm[k]) {
            //     form[k] = v
            //     }
            // }
            try {
                _self.isEditable = false
                // let datas = {
                //     Addition : _self.fujia,
                //     PaymentInfo : _self.money,
                //     '' : _self.form
                // }
                if(_self.type == 0){
                    _self.form.BackfillState = 1
                }
                if(_self.type == 1){
                    _self.form.StateAuditor = 1
                }
                let datas = _self.form
                //datas.Addition = _self.fujia
                //datas.PaymentInfo = _self.money
                await hotelsOrderApi.edit( datas)
                _self.$message({
                message: '编辑成功',
                  type: 'success'
                })
                _self.$router.go(-1)
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
        },
        shenhe(){
            this.$router.push({
                name:'订单审核',
                params:{
                    POrderID:this.POrderID,
                    HotelPolicyID:this.form.HotelPolicyID
                }
            })
        }

    }
}
</script>