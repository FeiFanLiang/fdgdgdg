<template lang="html">
<div id="hxjl">
    <div style="margin-top: 15px;">
        <el-input placeholder="请输入卡券号" v-model="input">
            <el-button slot="append" icon="search"></el-button>
        </el-input>
        <br><br>
        <el-button-group>
            <el-button @click="showKaquan">卡卷效果</el-button>
            <el-button @click="showYeji">各门店业绩</el-button>
        </el-button-group>
    </div>
    <div style="width:100%;">
        <el-row :gutter="24">
            <el-col :span="5">
                <p>卡券类型</p>
                <el-select v-model="value2" placeholder="请选择" style="width:100%;" size="small">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
            <!--<el-col :span="12"></el-col>-->
        </el-row>
    </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        input:'',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value2: ''
      }
    },
    methods:{
        showKaquan() {

        },
        showYeji() {

        }
    }
  }
</script>