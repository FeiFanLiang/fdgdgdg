<template lang="html">
    <div id="gasoline-log">
        <el-row :gutter="20">
            <!-- <el-col :span="4">
                <el-select v-model="filters.labelVal"  placeholder="请选择">
                    <el-option
                        v-for="(item,index) in selectedOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="index">
                    </el-option>
                </el-select>
            </el-col> -->
            <!-- <el-col :span="4">
                <el-select v-model="filters.CarID" filterable clearable placeholder="请选择车牌号" v-show="filters.labelVal == '1'">
                    <el-option v-for="(item,index) in carList" :key="index" :label="item.CarNumber" :value="item.ID"></el-option>
                </el-select>
                <el-select v-model="filters.DriverID" filterable clearable placeholder="请选择司机姓名" v-show="filters.labelVal == '2'">
                    <el-option v-for="(item,index) in driverList" :key="index" :label="item.Name" :value="item.ID"></el-option>
                </el-select>
            </el-col> -->
            <el-col :span="10">
                <el-button type="primary" @click="fetchData(filters)">搜索</el-button>
                <!-- <el-button type="primary" @click="clickAddBtn">添加加油记录</el-button>
                <el-button type="primary" @click="recharge">加油卡充值</el-button> -->
                <el-button type="primary" @click="downloadList()">下载<i class="el-icon-document el-icon--right" ></i></el-button>
            </el-col >
        </el-row>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border>
        <el-table-column prop="ID" label="ID" show-overflow-tooltip width="80"></el-table-column>
        <el-table-column prop="HotelOrderId" label="订单ID" show-overflow-tooltip></el-table-column>
        <el-table-column prop="HotelOrderDetailId" label="订单详单ID" show-overflow-tooltip></el-table-column>
         <el-table-column prop="HotelID" label="酒店ID" show-overflow-tooltip></el-table-column>
            <el-table-column prop="AmountUse" label="实付/实收" show-overflow-tooltip width="150"></el-table-column>
            <el-table-column prop="CompanyAcount" label="公司账户" show-overflow-tooltip></el-table-column>
            <!-- <el-table-column prop="CreateDate" label="CreateDate" show-overflow-tooltip></el-table-column> -->
            <el-table-column prop="Currency" label="币种" show-overflow-tooltip></el-table-column>
            <el-table-column prop="DuiChong" label="对冲" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ExpectGetMoney" label="预计到款日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Partner" label="对方账号名" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PartnerAccount" label="对方账号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PartnerAccountModel" label="对方开户行" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PaymentDate" label="预计收付时间" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PaymentModel" label="收付方式" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PaymentNo" label="财务编号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="PaymentType" label="收款/付款" show-overflow-tooltip></el-table-column>
            <el-table-column prop="State" label="状态" show-overflow-tooltip></el-table-column>
            <el-table-column prop="StateCheck" label="对账" show-overflow-tooltip></el-table-column>
            <el-table-column prop="TypeID" label="项目类别" show-overflow-tooltip></el-table-column>
            <el-table-column prop="UnMergePay" label="不可合并支付" show-overflow-tooltip></el-table-column>
            <el-table-column prop="UrgentPay" label="紧急打款" show-overflow-tooltip></el-table-column>
            <el-table-column prop="YingShouFu" label="应收/应付" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ExpectSettlement" label="预计 结算日期/付款日期"  width="65" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="pagination-wrapper">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import path from "api/api";
import { hotelPaymentInfoApi } from "api";
export default {
  created() {
    this.fetchData();
  },
  data() {
    return {
      filters: {
        CarID: "",
        DriverID: "",
        labelVal: "1"
      },
      list: [],
      currentPage: 1,
      pageSize: 10,
      count: 0,
      loading: false,
      form: {
        AmountUse: "",
        CompanyAcount: "",
        CreateDate: "",
        Currency: "",
        DuiChong: "",
        ExpectGetMoney: "",
        ExpectSettlement: "",
        HotelID: "",
        HotelOrderDetailId: "",
        HotelOrderId: "",
        ID: "",
        Partner: "",
        PartnerAccount: "",
        PartnerAccountModel: "",
        PaymentDate: "",
        PaymentModel: "",
        PaymentNo: "",
        PaymentType: "",
        State: "",
        StateCheck: "",
        TypeID: "",
        UnMergePay: "",
        UrgentPay: "",
        YingShouFu: ""
      },
      rechargeForm: {
        GasolineCardID: "",
        DateTime: "",
        Total: "",
        Balance: ""
      },
      carList: [],
      driverList: [],
      pickerOptions: {},
      isEditable: true,
      isRechargeEditable: true,
      cardBalance: ""
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.oilList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return restaurant.value.indexOf(queryString.toLowerCase()) === 0;
      };
    },
    handleSelect(item) {},
    querySearch1(queryString, cb) {
      var restaurants = this.stationList;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      cb(results);
    },
    handleSelect1(item) {},
    async fetchData(currentPage, pageSize) {
      const _self = this;
      _self.loading = true;
      _self.currentPage = currentPage || _self.currentPage;
      _self.pageSize = pageSize || _self.pageSize;
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: "ID",
        query: {
          //   CarID: _self.filters.labelVal === "1" ? _self.filters.CarID : "",
          //   DriverID: _self.filters.labelVal === "2" ? _self.filters.DriverID : ""
        }
      };
      try {
        const res = await hotelPaymentInfoApi.getDownList(options);
        _self.list = res.data.Data;
        _self.count = res.data.Count;
        _self.loading = false;
      } catch (e) {
        console.error(e);
        _self.loading = false;
      }
    },
    async downloadList() {
      const _self = this;
      const options = {
        pageIndex: _self.currentPage,
        pageSize: _self.pageSize,
        order: "ID",
        query: {
          //   CarID: _self.filters.labelVal === "1" ? _self.filters.CarID : "",
          //   DriverID: _self.filters.labelVal === "2" ? _self.filters.DriverID : ""
        }
      };
      try {
        const res = await hotelPaymentInfoApi.downloadList(options);
        if (res.request.responseURL) {
          window.location.href = res.request.responseURL;
        }
      } catch (e) {
        _self.$message.error("数据下载失败!!!");
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.currentPage);
    }
  }
};
</script>
<style lang="scss">
#gasoline-log {
  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
  .el-table__expanded-cell {
    padding: 20px 15px 20px 66px !important;
  }
  .demo-table-expand {
    padding: 0 0 10px 16px !important;
  }
  .demo-table-expand .el-form-item span {
    color: orange;
  }
}
</style>
