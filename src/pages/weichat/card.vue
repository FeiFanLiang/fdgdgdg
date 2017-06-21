<template lang="html">
<div id="card">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="卡券概况" name="a">
        <OverviewPage></OverviewPage>
    </el-tab-pane>
    <el-tab-pane label="优惠券" name="b">
        <TicketPage></TicketPage>
    </el-tab-pane>
    <el-tab-pane label="会员卡" name="c">
        <MembershipCard></MembershipCard>
    </el-tab-pane>
    <el-tab-pane label="卡券投放" name="d">卡券投放</el-tab-pane>
    <el-tab-pane label="卡券核销" name="e">卡券核销</el-tab-pane>
    <el-tab-pane label="经营工具" name="f">经营工具</el-tab-pane>
    <el-tab-pane label="数据与对账" name="g">
        <Data></Data>
    </el-tab-pane>
  </el-tabs>
</div> 
</template>
<script>
import OverviewPage from './overview';
import TicketPage from './ticket';
import MembershipCard from './membership-card';
import Data from './data';
  export default {
    components: {
        OverviewPage,
        TicketPage,
        MembershipCard,
        Data
    },
    data() {
      return {
        activeName: 'a'
      };
    },
    methods: {
      handleClick(tab, event) {
        
      }
    }
  };
</script>
<style lang="scss">
#card{
  .bottom {
    clear: both;
    text-align: center;
  }
  .el-tooltip__popper {
    padding: 8px 10px;
  }
  .content{
    padding: 20px;
    font-size: 14px;
    line-height: 22px;
    p{
        margin-top: 10px;
    }
  }
}
</style>

