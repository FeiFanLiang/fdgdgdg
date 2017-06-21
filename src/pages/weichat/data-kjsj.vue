<template lang="html">
<div id="hxjl">
    <div class="huiyuanka">
        <div class="div">
            <div class="div1">会员卡数据</div>
            <div class="div2">
                <el-button type="text">下载表格</el-button>
            </div>
            <div class="div2">
                <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围"></el-date-picker>
            </div>
            <div class="div2 div22">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        最近7天<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>不限</el-dropdown-item>
                        <el-dropdown-item>最近7天</el-dropdown-item>
                        <el-dropdown-item>最近15天</el-dropdown-item>
                        <el-dropdown-item>最近30天</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%;min-height:250px;">
            <el-table-column prop="allCards" label="全部会员卡"></el-table-column>
            <el-table-column label="浏览">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
            </el-table-column>
            <el-table-column label="领取">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
            </el-table-column>
            <el-table-column label="总使用">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
            </el-table-column>
            <el-table-column prop="newMember" label="新增会员"></el-table-column>
            <el-table-column prop="money" label="实收金额（元）"></el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>

    <div class="youhuiquan">
        <div class="div">
            <div class="div1">优惠券数据</div>
            <div class="div2">
                <el-button type="text">下载表格</el-button>
            </div>
            <div class="div2">
                <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围"></el-date-picker>
            </div>
            <div class="div2 div22">
                <el-dropdown trigger="click">
                    <span class="el-dropdown-link">
                        最近7天<i class="el-icon-caret-bottom el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>不限</el-dropdown-item>
                        <el-dropdown-item>最近7天</el-dropdown-item>
                        <el-dropdown-item>最近15天</el-dropdown-item>
                        <el-dropdown-item>最近30天</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%;min-height:250px;">
            <el-table-column prop="tag" label="全部类型"></el-table-column>
            <el-table-column prop="cardName" label="卡券名称"></el-table-column>
            <el-table-column label="浏览">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
            </el-table-column>
            <el-table-column label="领取">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
            </el-table-column>
            <el-table-column label="核销">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
            </el-table-column>
            <el-table-column label="朋友核销">
                <el-table-column prop="people" label="人数"></el-table-column>
                <el-table-column prop="times" label="次数"></el-table-column>
                <el-table-column prop="percent" label="朋友核销占比"></el-table-column>
            </el-table-column>
            <el-table-column label="操作"></el-table-column>
        </el-table>
    </div>
    
</div>
</template>
<script>
export default {
  data() {
      return {
          tableData:[],
          dateValue:''
      }
  }
}
</script>
<style lang="scss">
#hxjl{
    .div{
        width:99.80%;
        height: 50px;
        border: 1px solid #D1DBE5;
        border-bottom: none;
        background-color: #EEF1F6;
    }
    .div1{
        float:left;
        padding: 12px 0 0 20px;
    }
    .div2{
        float:right;
        padding: 8px 10px 0 20px;
    }
    .div22{
        padding-top: 12px;
    }
    .youhuiquan{
        margin-top: 20px;
    }
}
</style>

