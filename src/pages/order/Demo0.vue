<template lang="html">
<!-- /order/CheckShoukuan  主页 / 财务 / 待对账收款列表  -->
<div id="CheckShoukuan">
    <CustomSearchCopy :configList="configList.searchFields" @searchCallback="searchCallback">
        <el-form-item label="销售平台" slot="PlatPolicyID">
            <el-select v-model="filters.PlatPolicyID">
                <el-option v-for="(item,index) in PlatPolicyID " :key="index" :label="item.Account" :value="item.ID"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="收款日期" slot="ExpectSettlement">
            <el-date-picker
                v-model="filters.ExpectSettlement"
                type="date"
                placeholder="选择日期"
                format="yyyy 年 MM 月 dd 日">
            </el-date-picker>
      </el-form-item>
      <el-form-item label="收款状态" slot='StateCheck'>
          <el-select v-model="filters.StateCheck" placeholder="请选择" clearable>
              <el-option v-for="(item,index) in StateCheck" :label="item.label" :value="item.value" :key="index"></el-option>
          </el-select>
      </el-form-item>
      <el-button style="margin:10px 0;" @click="collection" slot="button-add">收款</el-button>
    </CustomSearchCopy>

  <el-table ref="multipleTable" :data="shoukuanList" border style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" @selection-change="handleSelectionChange"
  :default-sort = "{prop: 'BookTime', order: 'descending'}">
    <el-table-column type="selection" width="55"></el-table-column>
    <el-table-column label="订单号" prop="HotelOrder.PlatOrderNo" show-overflow-tooltip></el-table-column>
    <el-table-column label="酒店名称" prop="HotelOrder.HotelName" show-overflow-tooltip></el-table-column>
    <el-table-column label="入住/退房日期" width="200">
        <template scope="scope">
        <span v-if="scope.row.HotelOrder.StayDateStart != null">{{ scope.row.HotelOrder.StayDateStart.split(' ')[0] }}</span>/
        <span v-if="scope.row.HotelOrder.StayDateEnd != null">{{ scope.row.HotelOrder.StayDateEnd.split(' ')[0] }}</span>
        </template>
    </el-table-column>
    <el-table-column label="间/晚" width="80">
        <template scope="scope">
            <span>{{ scope.row.HotelOrder.RoomNum }}</span>/
            <span>{{ scope.row.HotelOrder.NightNum }}</span>
        </template>
    </el-table-column>
    <el-table-column label="入住人" prop="HotelOrder.Passenger"></el-table-column>
    <el-table-column label="预定时间" prop="HotelOrder.BookTime" width="80" sortable>
        <template scope="scope">
            <span v-if="scope.row.HotelOrder.BookTime != null">{{ scope.row.HotelOrder.BookTime.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="销售渠道">
        <template scope="scope">
          <span v-for="item in PlatPolicyID">
            <span v-if="scope.row.HotelOrder.PlatPolicyID==item.ID">{{item.Account}}</span>
          </span>
        </template>
    </el-table-column>
    <el-table-column label="预计到款时间" prop="ExpectGetMoney" width="80">
        <template scope="scope">
            <span v-if="scope.row.ExpectGetMoney != null">{{ scope.row.ExpectGetMoney.substring(5,16) }}</span>
        </template>
    </el-table-column>
    <el-table-column label="金额" prop="AmountUse" width="100"></el-table-column>
    <el-table-column label="对冲" prop="DuiChong" width="100"></el-table-column>
    <el-table-column label="状态" prop="StateCheck">
        <template scope="scope">
            <span v-if="scope.row.StateCheck == 0">未对账</span>
            <span v-if="scope.row.StateCheck == 1">未到款</span>
            <!-- <span v-if="scope.row.StateCheck == 2">结清</span> -->
        </template>
    </el-table-column>
  </el-table>
  <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
  </div>

</div>
</template>
<script>
import { hotelPaymentInfoApi, hotelsOrderApi, policyApi } from "api";

export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      count: 0,
      shoukuanList: [],
      loading: false,
      multipleSelection: [],
      filters: {
        StateCheck: "",
        PlatPolicyID: "",
        ExpectSettlement: ""
      },
      StateCheck: [
        {
          label: "未对账",
          value: 0
        },
        {
          label: "未到款",
          value: 1
        }
      ],
      PlatPolicyID: []
    };
  },
  created() {
    var dd = new Date();
    let y = dd.setDate(dd.getDate() + 1);
    // this.filters.ExpectSettlement = new Date(y).Format("yyyy-MM-dd");
    this.fetchData();
    this.configList = hotelsOrderApi.getConfig();
    this.platformAccount();
  },
  methods: {
    async platformAccount() {
      const options = {
        pageSize: 1000,
        order: "ID"
      };
      const res = await policyApi.getPolicyPlatform(options);
      this.PlatPolicyID = res.data.Data;
      this.PlatPolicyID.splice(0, 0, {
        Account: "全部",
        ID: ""
      });
    },
    searchCallback(filters) {
      Object.assign(filters, filters, this.filters);
      this.filters = filters;
      this.filters.ExpectSettlement = "";
      this.fetchData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData(1, this.pageSize);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData(this.currentPage);
    },
    async fetchData(currentPage, pageSize) {
      const _self = this;
      _self.loading = true;
      _self.showButton = false;
      let time1 = "";
      let time2 = "";
      if (typeof _self.filters.BookTime != "undefined") {
        if (_self.filters.BookTime[0] != null) {
          time1 = new Date(_self.filters.BookTime[0]).Format("yyyy-MM-dd");
          time2 = new Date(_self.filters.BookTime[1]).Format("yyyy-MM-dd");
        }
      }
      const options = {
        pageIndex: currentPage || _self.currentPage,
        pageSize: pageSize || _self.pageSize,
        order: "ID",
        query: {
          HotelName: _self.filters.HotelName,
          PlatOrderNo: _self.filters.PlatOrderNo,
          StayDateStart: _self.filters.StayDateStart
            ? new Date(_self.filters.StayDateStart).Format("yyyy-MM-dd")
            : "",
          StayDateEnd: _self.filters.StayDateEnd
            ? new Date(_self.filters.StayDateEnd).Format("yyyy-MM-dd")
            : "",
          "BookTime>": time1,
          "BookTime<": time2,
          "ExpectSettlement<=": _self.filters.ExpectSettlement
            ? _self.filters.ExpectSettlement.Format("yyyy-MM-dd")
            : "",
          StateCheck: _self.filters.StateCheck,
          PlatPolicyID: _self.filters.PlatPolicyID
        }
      };
      try {
        const res = await hotelPaymentInfoApi.checkIn(options);
        _self.shoukuanList = res.data.Data;
        _self.count = res.data.Count;
        _self.loading = false;
      } catch (e) {
        _self.loading = false;
      }
    },
    async collection() {
      const _self = this;
      if (_self.multipleSelection.length != 0) {
        this.$router.push({
          path: "Shoukuan",
          query: {
            multipleSelection: _self.multipleSelection
          }
        });
      } else {
        this.$message({
          message: "请选择收款订单",
          type: "warning"
        });
      }
    }
  }
};
</script>
