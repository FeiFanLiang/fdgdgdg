<template lang="html">
<div id="hxjl">
    <el-radio-group v-model="radio" @change="showChange">
        <el-radio-button label="卡卷效果"></el-radio-button>
        <el-radio-button label="各门店业绩"></el-radio-button>
    </el-radio-group>
    <div v-if="kaquan">
        <el-card class="box-card" style="margin:10px 0 20px 0;">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="2" class="text">
                        <el-dropdown trigger="click" menu-align="start" @command="handleCommand1">
                            <span class="el-dropdown-link">
                                {{message1}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="会员卡">会员卡</el-dropdown-item>
                                <el-dropdown-item command="普通券">普通券</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="3" class="text">
                        <el-dropdown trigger="click" @command="handleCommand2">
                            <span class="el-dropdown-link">
                                {{message2}}<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="浏览次数趋势图">浏览次数趋势图</el-dropdown-item>
                                <el-dropdown-item command="领取次数趋势图">领取次数趋势图</el-dropdown-item>
                                <el-dropdown-item command="核销次数趋势图">核销次数趋势图</el-dropdown-item>
                                <el-dropdown-item command="应收金额趋势图">应收金额趋势图</el-dropdown-item>
                                <el-dropdown-item command="实收金额趋势图">实收金额趋势图</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="2" class="text">
                        <el-tooltip class="item" placement="bottom" effect="light">
                            <div slot="content" class="contents" style="width:200px;">
                                <div style="font-size:14px;">
                                    <p>“浏览”指用户在领取前打开会员卡及优惠券，进入卡券领取页的操作。</p>
                                    <p> “领取”即用户将卡券添加到“微信卡券”的操作。</p>
                                    <p>“使用”指用户核销券或使用会员卡的操作</p>
                                    <p>“朋友券核销”是指用户核销朋友券的操作</p>
                                    <p>“实收金额”指用户通过“快速买单”最终实际支付的金额，即“应收金额”经过抵扣得到的用户需支付金额</p>
                                    <p>此处的“次数”均为所有卡券被浏览的次数总和</p>
                                </div>
                            </div>
                            <i class="el-icon-information"></i>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="2" :offset="7" class="text">
                        {{dataTime}}
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围" 
                        style="width:95%;" :picker-options="pickerOptions" @change="dataTimes"></el-date-picker>
                    </el-col>
                    <el-col :span="3">
                        <el-button type="text">下载表格</el-button>
                    </el-col>
                </el-row>
            </div>
            <div style="min-height:150px;margin-left:45%;color:#5E7382;">
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
        <el-card class="box-card" style="margin:10px 0 0 0;">
            <div slot="header" class="clearfix">
                <el-row>
                    <el-col :span="2">
                        <el-dropdown trigger="click" class="title">
                            <span class="el-dropdown-link">
                                暂无数据<i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>暂无数据</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </el-col>
                    <el-col :span="2" class="title">
                        <el-tooltip class="item" placement="bottom" effect="light"> 
                            <div slot="content" class="contents" style="width:200px;">
                                <div style="font-size:14px;">
                                    <p>“浏览”指用户在领取前打开会员卡及优惠券，进入卡券领取页的操作。</p>
                                    <p> “领取”即用户将卡券添加到“微信卡券”的操作。</p>
                                    <p>“使用”指用户核销券或使用会员卡的操作</p>
                                    <p>“朋友券核销”是指用户核销朋友券的操作</p>
                                    <p>“实收金额”指用户通过“快速买单”最终实际支付的金额，即“应收金额”经过抵扣得到的用户需支付金额</p>
                                    <p>此处的“次数”均为所有卡券被浏览的次数总和</p>
                                </div>
                            </div>
                            <i class="el-icon-information"></i>
                        </el-tooltip>
                    </el-col>
                    <el-col :span="2" :offset="10" class="title">
                        {{dataTime2}}
                    </el-col>
                    <el-col :span="5">
                        <el-date-picker v-model="dateValue2" type="daterange" placeholder="选择日期范围" 
                        style="width:95%;" :picker-options="pickerOptions" @change="dataTimes2"></el-date-picker>
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
            radio:'卡卷效果',
            dateValue: '',
            dateValue2: '',
            dataTime:'不限',
            dataTime2:'不限',
            tableData: [],
            kaquan: true,
            yeji: false,
            message1: '会员卡',
            message2: '浏览次数趋势图',
            message3: '最近7天',
            pickerOptions: {
                shortcuts: [{
                    text: '最近7天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近15天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近30天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }]
          },
        }
    },
    methods: {
        dataTimes(){
            let date = this.dateValue[1]-this.dateValue[0];
            let days=Math.floor(date/(24*3600*1000));
            switch (days){ 
                case 7 : this.dataTime='最近7天'; break; 
                case 15 :this.dataTime='最近15天'; break; 
                case 30 :this.dataTime='最近30天'; break;
                default :this.dataTime='不限'; break; 
            } 
        },
        dataTimes2(){
            let date = this.dateValue2[1]-this.dateValue2[0];
            let days=Math.floor(date/(24*3600*1000));
            switch (days){ 
                case 7 : this.dataTime2='最近7天'; break; 
                case 15 :this.dataTime2='最近15天'; break; 
                case 30 :this.dataTime2='最近30天'; break;
                default :this.dataTime2='不限'; break; 
            } 
        },
        showChange() {
            if(this.radio == '卡卷效果'){
                this.kaquan = true;
                this.yeji = false;
            }
            if(this.radio == '各门店业绩'){
                this.kaquan = false;
                this.yeji = true;
            }
        },
        handleCommand1(command) {
            this.message1 = command;
        },
        handleCommand2(command) {
            this.message2 = command;
        },
        handleCommand3(command) {
            this.message3 = command;

        },
    }
}
</script>
<style lang="scss">
#hxjl{
   .text{
        margin-top: 6px; 
    }
    .title{
        margin-top:8px;
    }
}
</style>

