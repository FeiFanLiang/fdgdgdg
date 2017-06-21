<template lang="html">
<div id="hxjl">
    <el-button-group>
        <el-button @click="showKaquan">卡卷效果</el-button>
        <el-button @click="showYeji">各门店业绩</el-button>
    </el-button-group>
    <div v-if="kaquan">
        <el-card class="box-card" style="margin-left:0;">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="2">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                会员卡<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>会员卡</el-dropdown-item>
                                <el-dropdown-item>普通券</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="3">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                浏览次数趋势图<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>浏览次数趋势图</el-dropdown-item>
                                <el-dropdown-item>领取次数趋势图</el-dropdown-item>
                                <el-dropdown-item>核销次数趋势图</el-dropdown-item>
                                <el-dropdown-item>应收金额趋势图</el-dropdown-item>
                                <el-dropdown-item>实收金额趋势图</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="2">
                        <el-tooltip class="item" placement="bottom" effect="light">
                            <div slot="content" class="content">
                                <p style="font-size:14px;margin:10px;">“浏览”指用户在领取前打开会员卡<br>及优惠券，进入卡券领取页的操作。</p>
                                <p style="font-size:14px;margin:10px;"> “领取”即用户将卡券添加到“微信<br>卡券”的操作。</p>
                                <p style="font-size:14px;margin:10px;">“使用”指用户核销券或使用会员卡<br>的操作</p>
                                <p style="font-size:14px;margin:10px;">“朋友券核销”是指用户核销朋友券<br>的操作</p>
                                <p style="font-size:14px;margin:10px;">“实收金额”指用户通过“快速买<br>单”最终实际支付的金额，即“应收<br>金额”经过抵扣得到的用户需支付金<br>额</p>
                                <p style="font-size:14px;margin:10px;">此处的“次数”均为所有卡券被浏览<br>的次数总和</p>
                            </div>
                            <i class="el-icon-information"></i>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="2" :offset="7">
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
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围"></el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text">下载表格</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="min-height:150px;">
                暂无数据
            </div>
        </el-card>
        <el-table :data="tableData" style="width: 100%;min-height:250px;" border>
            <el-table-column label="会员卡效果数据">
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="countLiulan" label="浏览次数"></el-table-column>
                <el-table-column prop="countLingqu" label="领取次数"></el-table-column>
                <el-table-column prop="countJihuo" label="激活人数"></el-table-column>
                <el-table-column prop="countUse" label="使用次数"></el-table-column>
                <el-table-column prop="money1" label="应收金额(元)"></el-table-column>
                <el-table-column prop="money2" label="实收金额(元)"></el-table-column>
            </el-table-column>
        </el-table>
        <p style="color:lightgrey;margin-top:10px;">可在当日上午8点后，在报表中查看前一日数据</p>
    </div>
    <div v-if="yeji">
        <el-card class="box-card" style="margin-left:0;">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="3">
                        <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                暂无数据<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>暂无数据</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="2">
                        <el-tooltip class="item" placement="bottom" effect="light">
                            <div slot="content" class="content">
                                <p style="font-size:14px;margin:10px;">“浏览”指用户在领取前打开会员卡<br>及优惠券，进入卡券领取页的操作。</p>
                                <p style="font-size:14px;margin:10px;"> “领取”即用户将卡券添加到“微信<br>卡券”的操作。</p>
                                <p style="font-size:14px;margin:10px;">“使用”指用户核销券或使用会员卡<br>的操作</p>
                                <p style="font-size:14px;margin:10px;">“朋友券核销”是指用户核销朋友券<br>的操作</p>
                                <p style="font-size:14px;margin:10px;">“实收金额”指用户通过“快速买<br>单”最终实际支付的金额，即“应收<br>金额”经过抵扣得到的用户需支付金<br>额</p>
                                <p style="font-size:14px;margin:10px;">此处的“次数”均为所有卡券被浏览<br>的次数总和</p>
                            </div>
                            <i class="el-icon-information"></i>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="2" :offset="9">
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
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围"></el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text">下载表格</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="min-height:50px;">
                
            </div>
        </el-card>
        <p style="color:lightgrey;margin-top:10px;">可在当日上午8点后，在报表中查看前一日数据</p>
    </div>
</div>
</template>
<script>
export default {
  data() {
      return {
          dateValue:'',
          tableData:[],
          kaquan:true,
          yeji:false
      }
  },
  methods:{
          showKaquan(){
              this.kaquan = true;
              this.yeji = false;
          },
          showYeji(){
              this.kaquan = false;
              this.yeji = true;
          }
  }
}
</script>
