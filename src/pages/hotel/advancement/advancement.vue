<template>
<div id="Advancement">
    <el-row :gutter="20">
        <el-col :span="5">
            <el-input placeholder="请输入酒店名称" v-model="filters.HotelName"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="advancementSearch(filters)">搜索</el-button>
        </el-col>
    </el-row>
    <el-table :data="advancement" border style="width: 100%" v-loading="loading">
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="HotelID" label="酒店ID"></el-table-column>
        <el-table-column prop="Deposit" label="存款"></el-table-column>
        <el-table-column prop="Frozen" label="冻结金额"></el-table-column>
        <el-table-column prop="Remark" label="备注"></el-table-column>
        <el-table-column prop="IsDelete" label="是否已删除">
            <template scope="scope">
                <span v-if="scope.row.IsDelete == true">是</span>
                <span v-if="scope.row.IsDelete == false">否</span>
            </template>
        </el-table-column>
        <el-table-column prop="CreateTime" label="创建时间" width=150>
            <template scope="scope">
                <span v-if="scope.row.CreateTime != ''">{{scope.row.CreateTime.substring(0,16)}}</span>
            </template>
        </el-table-column>
        <el-table-column label="操作" width=80>
            <template scope="scope">
                <el-button type="primary" size="small" @click="detail(scope.row.ID)">详细</el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog title="预存款详情" v-model="showDialog" size="tiny">
      <div style="margin:10px;font-size:16px;">
          <p>酒店ID:{{detailList.HotelID}}</p>
          <p>订单ID:{{detailList.OrderID}}</p>
          <p>对冲ID:{{detailList.AdvancementID}}</p>
          <p>对冲:{{detailList.Advancement}}</p>
          <p>金额（存）:{{detailList.Money}}</p>
          <p>余额:{{detailList.Remark}}</p>
          <p>备注:{{detailList.HotelID}}</p>
          <p>状态:
              <span v-if="detailList.State == 0">冻结未解除</span>
              <span v-if="detailList.State == 1">冻结解除并在预存款减取</span>
              <span v-if="detailList.State == 2">冻结解除作废</span>
          </p>
          <p>流向:<span v-if="detailList.TypeUse == 0">预存</span><span v-if="detailList.TypeUse == 1">使用</span></p>
      </div>
    </el-dialog>
</div>
</template>
<script>
import { advancementApi } from 'api'
export default {
  data(){
    return{
        advancement:[],
        loading:false,
        showDialog:false,
        detailList:{},
        filters:{
            HotelName:''
        }
    }
  },
  created(){
    this.fetchData()
  },
  methods:{
    advancementSearch(){
        this.fetchData()
    },
    async fetchData(){
    const _self = this
    try{
        const options = {
            query: {
                HotelName: _self.filters.HotelName
            }
        }
        const res = await advancementApi.list(options)
        _self.advancement = res.data.Data
    }catch(e){
        console.log(e)
    }
    },
    async detail(id){
    const _self = this
    try{
        _self.showDialog = true
        const options = {
            query: {
                AdvancementID: id
            }
        }
        const res = await advancementApi.detail(options)
        _self.detailList = res.data.Data
    }catch(e){
        console.log(e)
    }
    }
  }
}
</script>

