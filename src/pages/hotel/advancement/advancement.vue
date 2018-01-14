<template>
<div id="Advancement">
    <el-row :gutter="20" v-if="typeof(HotelID) == 'undefined'">
        <el-col :span="5">
            <el-input placeholder="请输入酒店名称" v-model="filters.HotelName"></el-input>
        </el-col>
        <el-col :span="5">
            <el-button type="primary" @click="advancementSearch(filters)">搜索</el-button>
        </el-col>
    </el-row>
    <el-button type="primary" @click="advancementAdd()" v-if="typeof(HotelID) != 'undefined'">添加</el-button>
    <el-table :data="advancement" border style="width: 100%" v-loading="loading">
        <el-table-column prop="HotelName" label="酒店名称" show-overflow-tooltip></el-table-column>
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

                <el-button type="primary" size="small" @click="detail('','',scope.row.ID)">详细</el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="text-align:center;margin:10px;" v-if="typeof(HotelID) == 'undefined'">
      <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog title="预存款详情" v-model="showDialog" size="full">
        <el-table :data="detailList" border style="width: 100%">
            <el-table-column prop="HotelID" label="酒店ID"></el-table-column>
            <el-table-column prop="OrderID" label="订单ID"></el-table-column>
            <el-table-column prop="Money" label="交易金额"></el-table-column>
            <el-table-column prop="Surplus" label="余额"></el-table-column>
            <el-table-column prop="State" label="状态">
                <template scope="scope">
                    <span v-if="scope.row.State == 0">冻结未解除</span>
                    <span v-if="scope.row.State == 1">冻结解除并在预存款减取</span>
                    <span v-if="scope.row.State == 2">冻结解除作废</span>
                </template>
            </el-table-column>
            <el-table-column prop="TypeUse" label="流向">
                <template scope="scope">
                    <span v-if="scope.row.TypeUse == 0">预存</span>
                    <span v-if="scope.row.TypeUse == 1">使用</span>
                </template>
            </el-table-column>
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
        </el-table>
        <div style="text-align:center;margin:10px;">
            <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 100]" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pageSize2" :total="count2"></el-pagination>
        </div>
    </el-dialog>
    <el-dialog title="添加预存款信息" v-model="showAddDialog" @close="resetForm('form')">
        <el-form ref="form" :model="form" label-width="110px">
            <el-form-item label="酒店ID" prop="HotelID">
                <el-input placeholder="请输入酒店ID" v-model="form.HotelID" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="交易金额" prop="Money">
                <el-input placeholder="请输入交易金额" v-model="form.Money"></el-input>
            </el-form-item>
            <el-form-item label="余额" prop="Surplus">
                <el-input placeholder="请输入余额" v-model="form.Surplus" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="Remark">
                <el-input type="textarea" v-model="form.Remark"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="State">
                <el-input placeholder="请输入状态" v-model="form.State" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="流向" prop="TypeUse">
                <el-input placeholder="请输入流向" v-model="form.TypeUse" disabled="disabled"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align:center;margin:10px;">
            <el-button @click="showAddDialog = false" size="large">取 消</el-button>
            <el-button type="primary" @click="submit" :loading="!isEditable" size="large">{{isEditable?'保存':'提交中'}}</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import { advancementApi } from 'api'
export default {
  data(){
    return{
        HotelID:'',
        currentPage: 1,
        pageSize: 10,
        count: 0,
        currentPage2: 1,
        pageSize2: 10,
        count2: 0,
        advancement:[],
        loading:false,
        showDialog:false,
        detailList:[],
        filters:{
            HotelName:''
        },
        ID:'',
        showAddDialog:false,
        form:{
            HotelID:'',
            Surplus:'',
            Money:'',
            Remark:'',
            State:1,
            TypeUse:''
        },
        isEditable:true,
    }
  },
  created(){
    this.HotelID = this.$route.params.ID
    console.log(this.HotelID)
    this.fetchData()
  },
  methods:{
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(1, this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage)
    },
    handleSizeChange2(val) {
      this.pageSize2 = val
      this.detail(1, this.pageSize2,this.ID)
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val
      this.detail(this.currentPage2,this.pageSize2,this.ID)
    },
    advancementSearch(){
        this.fetchData()
    },
    async fetchData(currentPage, pageSize){
        const _self = this
        _self.loading = true
        _self.currentPage = currentPage || _self.currentPage
        _self.pageSize = pageSize || _self.pageSize
        const options = {
            pageIndex: _self.currentPage,
            pageSize: _self.pageSize,
            order: 'ID',
            query: {
                HotelName: _self.filters.HotelName
            }
        }
        try{
            if(typeof(_self.HotelID) === 'undefined'){
                _self.advancement = []
                const res = await advancementApi.list(options)
                _self.advancement = res.data.Data
                _self.count = res.data.Count
            }else{
                _self.advancement = []
                options.query = {
                    HotelID:_self.HotelID
                }
                const res2 = await advancementApi.list(options)
                _self.advancement = res2.data.Data
            }
            _self.loading = false
        }catch(e){
            console.log(e)
        }
    },
    async detail(currentPage, pageSize,id){
        const _self = this
        _self.ID = id
        console.log(id)
        _self.currentPage = currentPage || _self.currentPage
        _self.pageSize = pageSize || _self.pageSize
        try{
            _self.showDialog = true
            const options = {
                pageIndex: _self.currentPage2,
                pageSize: _self.pageSize2,
                order: 'ID',
                query: {
                    AdvancementID: id
                }
            }
            const res = await advancementApi.detail(options)
            _self.detailList = res.data.Data
            _self.count2 = res.data.Count
        }catch(e){
            console.log(e)
        }
    },
    advancementAdd(){
        const _self = this
        _self.showAddDialog = true
        _self.form.HotelID = _self.HotelID
    },
    async submit(){
        const _self = this
        _self.isEditable = false
        _self.form.Surplus = _self.form.Money
        _self.form.Money = _self.form.Money
        _self.form.Remark = _self.form.Remark
        try{
            console.log(_self.form)
            await advancementApi.add(_self.form)
            _self.$message({
                message: '保存成功',
                type: 'success'
            })
            _self.fetchData()
            _self.showAddDialog = false
        }catch(e){
            _self.$message.error('保存失败!!!')
        }finally{
            _self.isEditable = true
        }
    }
  }
}
</script>

