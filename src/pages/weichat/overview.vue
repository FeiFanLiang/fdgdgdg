<template lang="html">
<div id="overview">
    <el-card class="box-card" style="width:95%">
        <div slot="header" class="clearfix">
            <span style="line-height: 36px;">昨日经营效果汇总
                <el-tooltip class="item" placement="bottom" effect="light">
                    <div slot="content" class="content" style="width:200px;">
                        <p style="font-size:14px;margin:10px;">“浏览”指用户在领取前打开会员卡及优惠券，进入卡券领取页的操作。</p>
                        <p style="font-size:14px;margin:10px;"> “领取”即用户将卡券添加到“微信卡券”的操作。</p>
                        <p style="font-size:14px;margin:10px;">“使用”指用户核销券或使用会员卡的操作</p>
                        <p style="font-size:14px;margin:10px;">“朋友券核销”是指用户核销朋友券的操作</p>
                        <p style="font-size:14px;margin:10px;">“实收金额”指用户通过“快速买单”最终实际支付的金额，即“应收<br>金额”经过抵扣得到的用户需支付金<br>额</p>
                        <p style="font-size:14px;margin:10px;">此处的“次数”均为所有卡券被浏览的次数总和</p>
                    </div>
                    <i class="el-icon-information"></i>
                </el-tooltip>
            </span>
            <el-button style="float: right;" type="text">
                <router-link :to="{path: 'Datas'}">查看详细数据</router-link>
            </el-button>
        </div>
        <div class="text item">
            <el-row :gutter="20">
                <el-col :span="4" class="center">
                    <div>
                        浏览次数
                    </div>
                    <div class="number">0</div>
                </el-col>
                <el-col :span="1" class="center vertical">
                    |
                </el-col>
                <el-col :span="4" class="center">
                    <div>
                        领取次数
                    </div>
                    <div class="number">0</div>
                </el-col>
                <el-col :span="1" class="center vertical">
                    |
                </el-col>
                <el-col :span="4" class="center">
                    <div>
                        使用次数
                    </div>
                    <div class="number">0</div>
                </el-col>
                <el-col :span="1" class="center vertical">
                    |
                </el-col>
                <el-col :span="4" class="center">
                    <div>
                        朋友券核销次数
                    </div>
                    <div class="number">0</div>
                </el-col>
                <el-col :span="1" class="center vertical">
                    |
                </el-col>
                <el-col :span="4" class="center">
                    <div>
                        实收金额(元)
                    </div>
                    <div class="number">0</div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</div>
</template>
<style lang="scss">
#overview{
    .center{
        text-align: center;
        font-size: 15px;
        padding: 20px;
    }
    .number{
        font-size: 18px;
        margin-top: 10px;
    }
    .vertical{
        font-size: 18px;
    }
}
</style>
