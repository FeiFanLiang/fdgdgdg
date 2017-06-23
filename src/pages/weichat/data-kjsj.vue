<template lang="html">
<div id="hxjl">
    <div class="huiyuanka">
        <div class="div">
            <div class="div1">会员卡数据</div>
            <div class="div2">
                <el-button type="text">下载表格</el-button>
            </div>
            <div class="div2">
                <el-date-picker v-model="dateValue" type="daterange" placeholder="选择日期范围" 
                style="width:100%;" :picker-options="pickerOptions" @change="dataTimes"></el-date-picker>
            </div>
            <div class="div2 div22">
                {{message}}
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
                <el-date-picker v-model="dateValue2" type="daterange" placeholder="选择日期范围" 
                style="width:100%;" :picker-options="pickerOptions" @change="dataTimes2"></el-date-picker>
            </div>
            <div class="div2 div22">
                {{message2}}
            </div>
        </div>
        <el-table :data="tableData" border style="width: 100%;min-height:250px;">
            <el-table-column prop="tag" :label="kinds" :filter-multiple="false" 
            :filters="[{ text: '全部类型', value: '全部类型' },{ text: '优惠券', value: '优惠券' },{ text: '代金券', value: '代金券' },{ text: '团购券', value: '团购券' },{ text: '折扣券', value: '折扣券' },{ text: '兑换券', value: '兑换券' }]" 
            :filter-method="filterTag" filter-placement="bottom-end" width="120px">
                <template scope="scope">
                    <el-tag type="primary" close-transition>{{scope.row.tag}}</el-tag>
                </template>
            </el-table-column>
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
          kinds:'全部类型',
          tableData:[{
          tag: '优惠券'
        }],
          dateValue:'',
          dateValue2:'',
          message: '最近7天',
          message2: '最近7天',
          pickerOptions: {
                shortcuts: [{
                    text: '最近7天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近15天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                    picker.$emit('pick', [start, end]);
                    }
                },{
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
  methods:{
        dataTimes(){
            let date = this.dateValue[1]-this.dateValue[0];
            let days=Math.floor(date/(24*3600*1000));
            switch (days){ 
                case 7 : this.message='最近7天'; break; 
                case 15 :this.message='最近15天'; break; 
                case 30 :this.message='最近30天'; break;
                default :this.message='不限'; break; 
            } 
        },
        dataTimes2(){
            let date = this.dateValue2[1]-this.dateValue2[0];
            let days=Math.floor(date/(24*3600*1000));
            switch (days){ 
                case 7 : this.message2='最近7天'; break; 
                case 15 :this.message2='最近15天'; break; 
                case 30 :this.message2='最近30天'; break;
                default :this.message2='不限'; break; 
            } 
        },
        filterTag(value, row) {
            this.kinds = value;
            if (value === '全部类型') return true
            return row.tag === value;
        },
        handleCommand(command) {
            this.message = command;
        },
        handleCommand1(command) {
            this.message1 = command;
        },
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

