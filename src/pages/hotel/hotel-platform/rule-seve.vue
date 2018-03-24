<template>
<div id="Rule">
    <el-button @click="returns()">返回</el-button>
    <el-button @click="addrule()">创建规则</el-button>    
    <el-table :data="RuleCheck" style="width: 100%" border element-loading-text="拼命加载中" v-loading="loading"
     row-key="ID"  ref="table">
        <el-table-column label="优先级" prop="Rank" sortable width=100></el-table-column>     
        <el-table-column label="渠道" prop="PlatName" width=130>
        <template scope="scope">
         <span>{{scope.row.Platform.PlatName}}</span>
        </template>
        </el-table-column>        
        <el-table-column label="折扣" prop="Discount" ></el-table-column>
        <el-table-column label="金额" prop="AddMoney" ></el-table-column>
        <el-table-column label="预定天数" prop="BookDay" show-overflow-tooltip width=125></el-table-column>
        <el-table-column label="人工修改" prop="SetType" width=125 show-overflow-tooltip>
            <template scope="scope">
                <span  v-if="scope.row.SetType == 0">非人工更改</span>
                <span  v-if="scope.row.SetType == 1">人工更改</span>            
            </template>
        </el-table-column>
        <el-table-column label="模式" prop="ModeType" show-overflow-tooltip>
            <template scope="scope">
                <span  v-if="scope.row.ModeType == 1">模式二</span>
                <span  v-if="scope.row.ModeType == 0">模式一</span>                
            </template>
        </el-table-column>
        <el-table-column label="开始时间" width=150>
            <template scope="scope">
                <span  v-if="scope.row.StartDate != null">{{scope.row.StartDate.substring(0,10)}}</span>
            </template>
        </el-table-column>
            <el-table-column label="结束日期" width=150>
            <template scope="scope">
                <span  v-if="scope.row.EndDate != null">{{scope.row.EndDate.substring(0,10)}}</span>                
            </template>
        </el-table-column>
        <el-table-column label="开始天数" prop="StartDay" width=125></el-table-column>
        <el-table-column label="结束天数" prop="EndDay" width=125></el-table-column>
        <el-table-column label="创建时间" width=150>
            <template scope="scope">
                <span  v-if="scope.row.CreateTime != null">{{scope.row.CreateTime.substring(0,10)}}</span>
            </template>
        </el-table-column>
            <el-table-column label="更新时间" prop="" width=150>
            <template scope="scope">
                <span  v-if="scope.row.UpdateTime != null">{{scope.row.UpdateTime.substring(0,10)}}</span>                
            </template>
        </el-table-column>        
        <el-table-column label="操作" prop="" width=170>
            <template scope="scope">
                <el-button type="primary" @click="Rulecom(scope.$index, scope.row)" size="small">编辑</el-button>            
             <!--   <el-button type="danger" @click="Det(scope.$index, scope.row)" size="small">删除</el-button> -->
             <el-popover ref="popover" placement="top" width="160"  v-model="visible">
                    <p>你确定删除这条数据吗？</p>
                    <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                    <el-button  type="primary" size="mini" @click="Det(scope.$index, scope.row)">确定</el-button>
                    </div>
                    </el-popover>
                    <el-button size="small" type="danger" v-popover:popover>删除</el-button>
            </template>
        </el-table-column>
     
    </el-table>
    <div class="pagination-wrapper" style="text-align:center;margin:10px;">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30,50,100,200]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
    <el-dialog :title="dialogTitle" v-model="showDialog"   @close="resetForm('form')">
      <el-form  ref="form" :model="form" :label-position="labelPosition" label-width="90px" :rules="rules">
      <el-row> 
      <el-col :span="12">
       <el-form-item label="酒店ID" prop="HotelID" >
            <el-input v-model="form.HotelID"  :disabled="true"></el-input>
        </el-form-item>
        </el-col>
      <el-col :span="12">        
        <el-form-item label="渠道" prop="PlatformID">
            <el-select  v-model="form.PlatformID" placeholder="请选择">
              <el-option v-for="(item,index) in PlatPolicyIDs"
                :label="item.PlatName"
                :value="item.ID"
                :key="index">
              </el-option>
            </el-select>
        </el-form-item>
        </el-col>
      </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item label="折扣" prop="Discount">
            <el-input v-model="form.Discount"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">        
        <el-form-item label="添加的金额" prop="AddMoney">
            <el-input v-model="form.AddMoney" ></el-input>
        </el-form-item>
        </el-col>        
        </el-row>
        <el-row>
        <el-col :span="12">
        <el-form-item label="预定天数" prop="BookDay">
            <el-input v-model="form.BookDay" ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="优先级" prop="Rank">
            <el-input v-model="form.Rank" ></el-input>
        </el-form-item>
        </el-col>        
        </el-row>
        <el-form-item label="选择模式" prop='StateCheck'>
          <el-select v-model="form.StateCheck" placeholder="请选择" clearable @change="changeValue">
              <el-option v-for="(item,index) in StateCheck" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-row v-if=isShow>
        <el-col :span="12">
        <el-form-item label="开始天数" prop="StartDay">
            <el-input v-model="form.StartDay" ></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="结束天数" prop="EndDay">
            <el-input v-model="form.EndDay" ></el-input>
        </el-form-item>
        </el-col>
        </el-row>
        <el-row v-if=!isShow>
        <el-col :span="12">
        <el-form-item label="开始日期" prop="StartDate">
                <el-date-picker v-model="form.StartDate" type="date" placeholder="选择入住日期"></el-date-picker>
         </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="结束日期" prop="EndDate">
            <el-date-picker v-model="form.EndDate" type="date" placeholder="选择入住日期"></el-date-picker>
        </el-form-item>
        </el-col>
        </el-row>
        <el-form-item label="人工更改">
           <el-switch v-model="form.isDisabled" :on-value="false" :off-value="true" on-text="" off-text=""></el-switch>
         </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm()">保存</el-button>
      </span>
    </el-dialog>
</div>
</template>
<script>
import {
  hotelPlatformApi, hotelThreePlatInfoApi, policyApi,hotelHotelpriceApi
} from 'api'
import { HotelTopMenu } from 'components'

export default {
    data(){
                let that = this;
        return{
            POrderID:'',
            currentPage: 1,
            pageSize: 10,
            count: 0,
            HotelPolicyID:'',
            Accoun:'',
            dialogTag: '',
            sheheSaveList:[],
            isShow:false,
            loading:true,
            visible:false,
            showDialog:false,
            labelPosition:'right',
            dialogTitle: '',
            RuleCheck:[],
            PlatPolicyIDs:[],
            StateCheck:[
                {
                    label: "模式一",
                    value: 0
                },
                {
                    label: "模式二",
                    value: 1
                }
            ],
            copyForm:{},
            CompanyAcount:'',
            HotelFee:'',
            PartnerAccount:'',
            PartnerAccountModel:'',
            form:{
                BackTypeID:1,
                ID:'',
                isDisabled:true,
                HotelID:'',
                Discount:'',
                AddMoney:'',
                BookDay:'',
                Rank:'',
                PlatformID:'',
                EndDay:'',
                StartDay:'',
                StartDate:'',
                EndDate:'',
                StateCheck:''  
            },
            rules: {
                PlatformID: [
                {
                    required: true,
                    message: '请选择渠道',
                    type: 'number'
                }
                ],
                Discount: [
                {
                    required: true,
                    message: '请输入折扣'
                }
                ],
                AddMoney: [
                {
                    required: true,
                    message: '请输入添加金额'
                }
                ]
        },
            
        }
    },
    created(){
            this.configList = hotelPlatformApi.getConfig()                        
    },
     mounted() {
        this.fetchData()
        this.platformAccount()
    },
    methods:{
        returns(){
            this.$router.go(-1)
        },
        remove($index){
            this.sheheSaveList.splice($index, 1);
        },
        hotelsOrderSearch(){
        this.fetchData()
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        changeValue(value){
            var _self =this
            if(value == 1){
                _self.isShow = true
            }else{
                _self.isShow = false
            }
        },
        addrule(){
            const _self = this
            _self.showDialog = true
            _self.dialogTag = 1
            _self.dialogTitle = '添加'
            const nowdate = new Date().Format('yyyy-MM-dd hh:mm:ss')
            console.log(nowdate)
            _self.form = {
                // id: '',
                HotelID:'',
                Discount:'',
                AddMoney:'',
                BookDay:1,
                isDisabled:false,                
                Rank:3,
                PlatformID:'',
                EndDay:1,
                StartDay:1,
                StartDate:nowdate,
                EndDate:nowdate,                
                StateCheck:0   
            }
                _self.form.HotelID = this.$route.params.ID
            
            
            console.log(_self.dialogTag)
        },
        submitForm() {
        const _self = this
        if (_self.dialogTag === 1) _self.addSave()
        if (_self.dialogTag === 2) _self.editSave()
        },
        Rulecom($index, row) {
            const _self = this
            console.log(row.Discount)
            _self.showDialog = true
            _self.dialogTag = 2
            _self.dialogTitle = '编辑规则信息'
            _self.form.HotelID = row.HotelID
            _self.form.ID = row.ID            
            _self.form.Discount = row.Discount
            _self.form.AddMoney = row.AddMoney
            _self.form.BookDay = row.BookDay
            _self.form.PlatformID = row.Platform.ID
            _self.form.Rank = row.Rank
            _self.form.EndDay = row.EndDay
            _self.form.StartDay = row.StartDay
            _self.form.StartDate = row.StartDate
            _self.form.EndDate = row.EndDate                
            _self.form.StateCheck = row.ModeType                
            
            if(row.SetType==1){
                _self.form.isDisabled = false
            }else{
                _self.form.isDisabled = true
                
            }
                console.log(_self.form.PlatformID)
            console.log(_self.dialogTag)
                 
           
        },
        async platformAccount(){
     
            const res = await hotelThreePlatInfoApi.getList()
            this.PlatPolicyIDs = res.data
            console.log(res)
        },
        async fetchData(currentPage, pageSize) {
          //  console.log(this.$route.params.ID)
            const _self = this
            _self.loading = true   
            try{
                const res = await hotelHotelpriceApi.getDetail(this.$route.params.ID)   
                _self.RuleCheck = res.data
                console.log(res)
                _self.count = res.data.length
                _self.loading = false             
            }catch (e) {
                _self.loading = false                         
                }                                 
        },
        async addSave() {
            const _self = this
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                try {
                    if( _self.form.isDisabled==false){
                        _self.form.SetType = 1
                    }else{
                        _self.form.SetType = 0
                        
                    }
                    if( _self.form.StateCheck==1){
                        _self.form.ModeType = 1
                    }else{
                        _self.form.ModeType = 0
                        
                    }
                    _self.form.StartDate ?
                            (_self.form.StartDate = new Date(
                                _self.form.StartDate
                            ).Format('yyyy-MM-dd hh:mm:ss')) :
                            ''
                    _self.form.EndDate ?
                            (_self.form.EndDate = new Date(
                                _self.form.EndDate
                            ).Format('yyyy-MM-dd hh:mm:ss')) :
                            ''
                            
                 const res =  await hotelHotelpriceApi.add(_self.form)
                 console.log(res)
                 
                    _self.fetchData()
                    _self.$refs['form'].resetFields()
                    _self.showDialog = false
                    _self.$message({
                    message: '保存成功',
                    type: 'success'
                    })
                } catch (e) {
                    console.error(e)
                    _self.$message.error('添加失败!!!')
                } 
                } else {
                return false
                }
            })
        },
       async editSave() {
            const _self = this
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                try {
                    if( _self.form.isDisabled==false){
                        _self.form.SetType = 1
                    }else{
                        _self.form.SetType = 0
                        
                    }
                     if( _self.form.StateCheck==1){
                        _self.form.ModeType = 1
                    }else{
                        _self.form.ModeType = 0
                        
                    }
                    _self.form.StartDate ?
                            (_self.form.StartDate = new Date(
                                _self.form.StartDate
                            ).Format('yyyy-MM-dd hh:mm:ss')) :
                            ''
                    _self.form.EndDate ?
                            (_self.form.EndDate = new Date(
                                _self.form.EndDate
                            ).Format('yyyy-MM-dd hh:mm:ss')) :
                            ''              
                 await hotelHotelpriceApi.xiug(_self.form)
                    console.log( _self.form)                   
                   _self.fetchData()
                    _self.$refs['form'].resetFields()
                    _self.showDialog = false
                    _self.$message({
                    message: '编辑成功',
                    type: 'success'
                    })
                } catch (e) {
                    console.error(e)
                    _self.$message.error('编辑失败!!!')
                }
                } else {
                return false
                }
           })
        },
        async Det($index, row) {
            const _self = this
    
       
                     await hotelHotelpriceApi.removeD(row.ID)    
                    _self.fetchData()          
                _self.$message({
                            message: '删除成功',
                            type: 'success'
                        }) 
                   
              
                
         
          
   
                                
                 
           
        },
        
        
        }
    }
 
</script>
