<template lang="html">
<div id="hxjl">
    <div style="margin-top: 15px;width:30%;">
        <el-input placeholder="请输入卡券号" v-model="input">
            <el-button slot="append" icon="search"></el-button>
        </el-input>
        <br><br>
        <el-button-group>
            <el-button @click="showKaquan">卡卷核销</el-button>
            <el-button @click="showYeji">买单</el-button>
        </el-button-group>
    </div>
    <div style="width:100%;margin-top:0px;" v-if="verification">
        <el-row :gutter="24" class="title">
            <el-col :span="3">
                <p>卡券类型</p>
                <el-select v-model="value1" placeholder="会员卡">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="8">
                <p>时间</p>
                <el-select v-model="value2" placeholder="请选择" style="width:30%;">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-date-picker v-model="value22" type="daterange" placeholder="选择日期范围" style="width:60%;"></el-date-picker>
            </el-col>
            <el-col :span="3">
                <p>核销方式</p>
                <el-select v-model="value3" placeholder="请选择">
                    <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="3">
                <p>门店</p>
                <el-select v-model="value4" placeholder="请选择">
                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <br><br><br>
                <el-button type="text">清除</el-button>
            </el-col>
            <el-col :span="2" :offset="3">
                <br><br><br>
                <el-button type="text">下载表格</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%;min-height:200px;">
          <el-table-column prop="time" label="时间" width="200" sortable></el-table-column>
          <el-table-column prop="name" label="券名"></el-table-column>
          <el-table-column prop="mode" label="核销方式"></el-table-column>
          <el-table-column prop="integral" label="积分"></el-table-column>
          <el-table-column prop="store" label="门店"></el-table-column>
          <el-table-column prop="verifier" label="核销员"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
                <el-button type="primary" size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <!--<el-button type="danger" size="mini" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>-->
                <DeleteButton :id="scope.row.ID"></DeleteButton>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <div v-if="pay">
        <el-row :gutter="24">
            <el-col :span="8">
                <p>时间</p>
                <el-select v-model="value2" placeholder="请选择" style="width:100px;">
                    <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-date-picker v-model="value22" type="daterange" placeholder="选择日期范围"></el-date-picker>
            </el-col>
            <el-col :span="3">
                <p>门店</p>
                <el-select v-model="value4" placeholder="请选择">
                    <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <br><br><br>
                <el-button type="text">清除</el-button>
            </el-col>
            <el-col :span="2" :offset="9">
                <br><br><br>
                <el-button type="text">下载表格</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%;min-height:200px;margin-top:10px;">
          <el-table-column prop="time" label="时间" width="200" sortable></el-table-column>
          <el-table-column prop="dealnumber" label="交易单号"></el-table-column>
          <el-table-column prop="money" label="实收金额(元)"></el-table-column>
          <el-table-column prop="store" label="门店"></el-table-column>
          <el-table-column prop="nickname" label="用户昵称"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
                <el-button type="primary" size="mini" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    <p style="margin-top:10px;"><a href="#" style="color:#4BA6FF;">支付后台</a>可查看买单收入</p>
</div>
</template>
<script>
export default {
  data() {
    return {
      verification: true,
      pay: false,
      input: '',
      options: [
        {
          value: '选项1',
          label: '会员卡'
        },
        {
          value: '选项2',
          label: '普通券'
        }
      ],
      value1: '会员卡',
      options2: [
        {
          value: '选项1',
          label: '不限'
        },
        {
          value: '选项2',
          label: '最近7天'
        },
        {
          value: '选项3',
          label: '最近15天'
        },
        {
          value: '选项4',
          label: '最近30天'
        }
      ],
      value2: '最近7天',
      value22: '',
      options3: [
        {
          value: '选项1',
          label: '全部'
        },
        {
          value: '选项2',
          label: '自助买单'
        },
        {
          value: '选项3',
          label: '激活'
        },
        {
          value: '选项4',
          label: '自助核销'
        },
        {
          value: '选项5',
          label: '手机核销'
        },
        {
          value: '选项6',
          label: '网页核销'
        },
        {
          value: '选项7',
          label: 'API核销'
        }
      ],
      value3: '全部',
      options4: [
        {
          value: '选项1',
          label: '全部门店'
        },
        {
          value: '选项2',
          label: '良辰美景'
        }
      ],
      value4: '全部门店',
      tableData: []
    }
  },
  methods: {
    showKaquan() {
      this.verification = true
      this.pay = false
    },
    showYeji() {
      this.pay = true
      this.verification = false
    }
  }
}
</script>
<style lang="scss">
#hxjl{
  .title{
    p{
      margin:10px;
    }
  }
}
</style>

