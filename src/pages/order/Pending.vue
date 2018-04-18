<template lang="html">
<div id="pending">
    <CustomSearchCopy :configList="configList.searchOrderFields" @searchCallback="searchCallback">
      <!-- <el-form-item label="订单平台" slot="ThreePlatID">
        <el-select v-model="filters.ThreePlatID" @change="changeValue">
          <el-option v-for="item in ThreePlatID" :key="item.ID" :label="item.PlatName" :value="item.ID"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="平台信息" slot="PlatPolicyID">
                  <el-select v-model="filters.PlatPolicyID" @change="changeValue">
                      <el-option v-for="(item,index) in PlatPolicyIDs " :key="index" :label="item.Account" :value="item.ID"></el-option>
                  </el-select>
      </el-form-item>
      <!--
      <el-form-item label="人工处理状态" slot="HandState">
        <el-select v-model="filters.HandState" clearable @change="changeValue2">
          <el-option v-for="item in HandState" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="订单状态" slot="OrderState" style="margin-bottom:20px" >
        <el-select v-model="filters.OrderState" clearable @change="changeValue4">
          <el-option v-for="item in OrderState" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类别" slot="OrderType"  style="margin-bottom:40px">
        <el-select v-model="filters.OrderType" clearable @change="changeValue5">
          <el-option v-for="item in OrderType" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="外采渠道" slot="WaiCaiPlatID"  style="margin-bottom:20px">
        <el-select v-model="filters.WaiCaiPlatID" clearable @change="changeValue7">
          <el-option v-for="item in WaiCaiPlatID" :key="item.value" :label="item.Account" :value="item.ID"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购方式" slot="WaiCaiFlag" style="margin-bottom:20px">
        <el-select v-model="filters.WaiCaiFlag" clearable @change="changeValue6">
          <el-option v-for="item in WaiCaiFlag" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="付款周期" slot="SettlementCycleFu" >
          <el-select v-model="filters.SettlementCycleFu" clearable placeholder="请选择付款周期" @change="changeValue3">
              <el-option v-for="(item,index) in payPeriodList" :key="index" :label="item.text" :value="item.value"></el-option>
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
      <el-button  slot="button-add" style="cursor:default;border:none">{{RoomNight}}间夜 &nbsp; 拒单率{{JuDanLv}}%</el-button>
      <!--
      <el-col slot="col-add">
          <el-form ref="form" :model="form2" label-width="130px">
          <el-col :span="6">
          <el-form-item label="修改人工处理状态" prop="HandState" style="margin-bottom:0px">
                <el-select v-model="form2.HandState" clearable style="width:170px;">
                    <el-option v-for="item in HandState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                </el-form-item>
          </el-col>                
          </el-form>
            <el-button type="primary" @click="toState()" style="margin-left:180px">修改</el-button>
                
       </el-col> -->
    </CustomSearchCopy>
    <el-table :data="hotelsOrder" element-loading-text="拼命加载中" v-loading="loading"  border
       :default-sort = "{prop: 'BookTime', order: 'descending'}" row-key="ID" id="tabs" @selection-change="handleSelectionChange2">                  
        <el-table-column label="订单号" prop="PlatOrderNo" show-overflow-tooltip width=170></el-table-column>
        <el-table-column label="账户-平台" width="120">
          <template scope="scope">
              <span v-for="item in PlatPolicyIDs">
                <span v-if="scope.row.PlatPolicyID==item.ID">{{item.Account}}</span>
              </span>
          </template>
        </el-table-column>
        <el-table-column label="酒店名称" prop="HotelName" show-overflow-tooltip width="180">
            <template slot-scope="scope" >
                 <span @dblclick="chuli(scope.$index, scope.row)" style="display:inline-block" >{{scope.row.HotelName}}</span>
            </template> 
                
        </el-table-column>
        <el-table-column label="采购" prop="WaiCaiFlag" width=70>
          <template scope="scope">
            <span v-if="scope.row.WaiCaiFlag == 0">自营</span>
            <span v-if="scope.row.WaiCaiFlag == 1">外采</span>
          </template>
        </el-table-column>
        <el-table-column label="入住人" prop="Passenger" show-overflow-tooltip></el-table-column>
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
                            <el-select v-model="form.HotelName" clearable filterable remote placeholder="请输入酒店名称" :remote-method="remoteHotelList" :loading="loadingHotel" @change="changv" clearable>
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
                    <el-form-item label="平台信息" prop="PlatPolicyID">
                                <el-select v-model="form.PlatPolicyID" clearable>
                                    <el-option v-for="(item,index) in PlatPolicyIDs " :key="index" :label="item.Account" :value="item.ID"></el-option>
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
                        <el-select v-model="form.OrderType" clearable>
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
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="结算周期（收）" prop="SettlementCycle">
                        <el-select v-model="HotelOrderDetail.SettlementCycle" clearable>
                          <el-option v-for="item in SCycle" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
    
    <el-dialog title="失败处理" v-model="showc" width="35%">
      <el-form  ref="form" :model="form2"  label-width="70px" >
        <el-row style="margin-bottom:10px">    
            <el-col>
            <span>酒店&nbsp;:{{form2.HotelName}}&nbsp; &nbsp;入住人&nbsp;:{{form2.Passenger}}</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                  <el-form-item label="处理备注" prop="HandRemark" >
                      <el-input  type="textarea" v-model="form2.HandRemark" autosize :minlength="200"></el-input>
                  </el-form-item>
            </el-col>
        </el-row>
        <el-row>
        <el-col>
                <el-button @click="addtext($event)">无房拒单</el-button>
                <el-button @click="addtext($event)">政策不符</el-button>
                <el-button @click="addtext($event)">赔钱拒单</el-button>
        </el-col>
        </el-row>            
        </el-form>
         <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="toState()">确定</el-button>
      </span> 
    </el-dialog> 
    
</div>
</template>

<script>
import {
  hotelsOrderApi,
  paymentCheckApi,
  policyApi,
  hotelThreePlatInfoApi,
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
      Room:"",
      Pts:"",
      Qy:"",
      Fs:"",
      Zt:"",
      Lb:"",
      Wcfs:"",
      Wcqd:"",
      Rstate:"",
      Night:"",
      RoomNight:"",
      JuDanLv:"",
      hotelList: [],
      multipleSelection2:[],
      imageList: [],
      text: -1,
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      showDialog: false,
      showc:false,
      isEditable: true,
      form: {
        PlatOrderNo: "",
        HotelName: "",
        HotelID: "",
        PlatPolicyID:"",
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
      form2:{
        HandState:"",        
        HandRemark:""
      },
      HotelOrderDetail: {},
      hotelsOrder: [],
      PlatPolicyIDs:[],
      WaiCaiPlatID:[],
      ID: "",
      filters: {
        HotelName: "",
        ThreePlatID: "",
        SettlementCycle: "",
        checkList: "",
        PlatPolicyID:"",
        HandState:"",
        HotelArea: "",
        SettlementCycleFu:"",
        WaiCaiNo:"",
        OrderState:"",
        OrderType:"",
        WaiCaiFlag:"",
        WaiCaiPlatID:"",
        BackfillTime:""
      },
      ThreePlatID: [
        {
          PlatName: "全部",
          value: ""
        }
      ],
      SettlementCycle: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "单结",
          value: 0
        },
        {
          label: "周结",
          value: 1
        },
        {
          label: "月结",
          value: 2
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
      SCycle: [
          {
              value: 0,
              label: '其他（每单备注）'
          }, 
          {
              value: 1,
              label: '预付款'
          },
          {
              value: 2,
              label: '单结'
          },
          {
              value: 3,
              label: '日结'
          },

          {
              value: 4,
              label: '月结'
          },
          {
              value: 5,
              label: '半月结'
          },
          {
              value: 6,
              label: '周结'
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
        //   { required: true, message: "请输入酒店名称", trigger: "blur" }
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
      detail: {}
    };
  },
  created() {
    this.fetchData();
    this.ThreePlat();
    this.platformAccount();
    this.platformAccounts()
    this.configList = hotelsOrderApi.getConfig();
  },
  methods: {
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
          timeh1 = new Date(_self.filters.BackfillTime[0]).Format("yyyy-MM-dd");
          timeh2 = new Date(_self.filters.BackfillTime[1]).Format("yyyy-MM-dd");
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
          StayDateStart: _self.filters.StayDateStart
            ? new Date(_self.filters.StayDateStart).Format("yyyy-MM-dd")
            : "",
          "BookTime>": time1,
          "BookTime<": time2,
          "BackfillTime>": timeh1,
          "BackfillTime<": timeh2,
          ThreePlatID: _self.filters.ThreePlatID,
          SettlementCycle: _self.filters.SettlementCycle,
          HotelBookingNo: _self.filters.HotelBookingNo,
          HotelArea: _self.filters.HotelArea,
          StateAuditor: _self.filters.StateAuditor,
          StateFuKuan: _self.filters.StateFuKuan,
          PlatPolicyID:_self.filters.PlatPolicyID,          
          SettlementCycleFu: _self.filters.SettlementCycleFu,
          OrderState:_self.filters.OrderState,
          OrderType:_self.filters.OrderType,
          WaiCaiFlag:_self.filters.WaiCaiFlag,
          WaiCaiPlatID:_self.filters.WaiCaiPlatID,  
          HandState:0,
          // OrderState:0,
          // BackfillState:0,
          // OrderType:0,
          IsDelete:false, 
          WaiCaiNo:_self.filters.WaiCaiNo,
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
    async platformAccounts(){
            const options = {
                pageSize: 1000,
                order: 'Sort',
                query:{CanSale:true}
            }     
            const res = await policyApi.getPolicyPlatform(options)
            this.PlatPolicyIDs = res.data.Data
       //     console.log(this.PlatPolicyIDs)
    },
    chuli($index, row){
        const _self =this
        _self.showc = true
         _self.form2.HandRemark = ''
         _self.form2.HotelName = row.HotelName
         _self.form2.Passenger = row.Passenger      
        // console.log(row) 
         _self.multipleSelection2 = row.ID
    },
    addtext(e){
            const _self = this
            const ntes = e.target.innerText    
            let up = _self.form2.BookTime += ntes
            let num = ''                                        
            up = _self.form2.HandRemark += ntes + ','
            //console.log(up.length)
            if(up.indexOf(ntes) == -1){
       
            }else{
                num = up.split(ntes)
              //  console.log(up.length)                                        
                if(num.length-1 == 2){
                    up = up.replace(ntes,'')
                    up = up.replace(",",'')        
                }
            _self.form2.HandRemark = up                               
            }        
    },
    async toState(){
      try{
        let ids =[]
        ids.push(this.multipleSelection2)
          const options={
            ids: ids,
            state:3,
            remark:this.form2.HandRemark
          }
          await hotelsOrderApi.revise(options);
          this.showc = false                    
          this.fetchData()
          this.$message({
              message: '修改成功',
              type: 'success'
          })
      
          }catch(e){
             this.$message.error('修改失败!!!')
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
    changv(value){
      const _self = this;      
    //   if(_self.detail.HotelOrderDetail == undefined){   
    //     _self.form.HotelID = value 
    //   }else{
    //     _self.form.HotelID = _self.detail.HotelOrderDetail[0].HotelID    
    //   }
        _self.form.HotelID = value    
    },
    searchCallback(filters) {
      const now =  Object.assign(this.filters, filters );   
      Object.assign(filters, filters, this.filters);
      this.filters = filters;
      this.filters.WaiCaiNo = now.WaiCaiNo   
      this.filters.PlatPolicyID = this.Pts
      this.filters.HotelArea = this.Qy
      this.filters.SettlementCycleFu = this.Fs
     // this.filters.HandState = this.Rstate    
      this.filters.OrderState = this.Zt
      this.filters.OrderType = this.Lb
      this.filters.WaiCaiFlag = this.Wcfs  
      this.filters.WaiCaiPlatID = this.Wcqd  
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
    handleSelectionChange2(val) {
        this.multipleSelection2 = val;  
       // console.log(this.multipleSelection2)       
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
       // this.form.RoomNum = 1;
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
       // this.form.RoomNum = 1;
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
          timeh1 = new Date(_self.filters.BackfillTime[0]).Format("yyyy-MM-dd");
          timeh2 = new Date(_self.filters.BackfillTime[1]).Format("yyyy-MM-dd");
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
          SettlementCycle: _self.filters.SettlementCycle,
          HotelBookingNo: _self.filters.HotelBookingNo,
          HotelArea: _self.filters.HotelArea,
          StateAuditor: _self.filters.StateAuditor,
          StateFuKuan: _self.filters.StateFuKuan,
          PlatPolicyID:_self.filters.PlatPolicyID,
          WaiCaiNo:_self.filters.WaiCaiNo,
          SettlementCycleFu: _self.filters.SettlementCycleFu,
          OrderState:_self.filters.OrderState,
          OrderType:_self.filters.OrderType,
          WaiCaiFlag:_self.filters.WaiCaiFlag,
          WaiCaiPlatID:_self.filters.WaiCaiPlatID,  
          HandState:0,
          // OrderState:0,
          // OrderType:0,          
          // BackfillState:0,
          IsDelete:false,        
          PlatOrderNo: _self.filters.PlatOrderNo
        }
      };
      try {
        const res = await hotelsOrderApi.fetch(options);
      //  console.log(res)
        _self.hotelsOrder = res.data.Data;
         _self.RoomNight = res.data.RoomNight;  
        _self.JuDanLv = res.data.JuDanLv;        
        _self.count = res.data.Count;
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
    async findd() {
      const _self = this;
      //添加订单前判断是否存在
     // console.log(_self.form.PlatOrderNo);
      const res = await hotelsOrderApi.getDetail(_self.form.PlatOrderNo);
      _self.detail = res.data.Data;
     // console.log(_self.detail)
      if (_self.detail) {
        _self.form = _self.detail;
        _self.HotelOrderDetail = _self.detail.HotelOrderDetail[0];
        _self.form.CurrencyFuKuan =  _self.detail.CurrencyFu
        _self.form.CurrencyShouKuan =  _self.detail.CurrencyShou
        //console.log(_self.detail) 
      }
      if (typeof _self.detail == "undefined") {
          _self.text = 0;
        } else {
          _self.text = 1;
        }
    },
    find(){
      this.findd()
      this.findd()
    },
    clickAddBtn() {
      const _self = this;
      _self.showDialog = true;
      _self.text = -1;
      _self.form = {};
      _self.HotelOrderDetail = {};
      _self.form.CurrencyFuKuan = 'CNY';
      _self.form.CurrencyShouKuan = 'CNY';
      _self.HotelOrderDetail.SettlementCycleFu = 3
      _self.HotelOrderDetail.SettlementCycle = 3  
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
            let hname
            nowF.HotelFee = _self.HotelOrderDetail.HotelFee
              for(let i in _self.hotelList){
                 if(_self.hotelList[i].ID==nowF.HotelID){
                       hname = _self.hotelList[i].HotelName
                 }
             }
           console.log(hname)
           nowF.HotelName = hname
          _self.form.HotelName = hname
            _self.form = { ..._self.form, ..._self.HotelOrderDetail };  
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
           //return false
          const res = await hotelsOrderApi.add(f);
          const ertext = res.data.Msg
          if(res.data.State !=true){
                _self.$message.error(ertext)          
            }else{
                _self.fetchData();
                _self.showDialog = false;
                _self.$message({
                  message: "保存成功",
                  type: "success"
                });
            }    
          
           
          } catch (e) {
            _self.$message.error("添加失败!!!");
          } finally {
            _self.isEditable = true;
          }
        } else {
          this.$message({
            showClose: true,
            message: "请输入第三方订单号",
            type: "error"
          });
        }
      });
      }
    }
  }
};
</script>

<style lang="scss">
#pending {
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
  .el-dialog--small{
    width:37%;
  }
  .avatar {
    width: 132px;
    height: 132px;
    display: block;
  }
}
</style>
