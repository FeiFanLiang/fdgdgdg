<template lang="html">
<div id="HotelsOrder">
    <CustomSearch :configList="configList.searchFields" @searchCallback="searchCallback">
        <el-button type="primary" @click="clickAddBtn" slot="button-add">创建</el-button>
    </CustomSearch>
    <el-table :data="hotelsOrder" :loading="loading" @expand="expand" border row-key="ID" :expand-row-keys="expandRowKeys">
        <el-table-column type="expand">
            <template scope="props">
              <div>
                <h4 style="color:orange;">当前步骤流程</h4>
                <el-steps :space="100" :active="active" finish-status="success">
                    <el-step title="审核"></el-step>
                    <el-step title="打款"></el-step>
                    <el-step title="提交"></el-step>
                    <el-step title="截图"></el-step>
                </el-steps>
              </div>
              <div>
                <el-card class="box-card">
                    <p><span>订单来源ID</span><span class="span-text">{{ props.row.ThreePlatID }}</span></p>
                    <p><span>政策ID</span><span class="span-text">{{ props.row.HotelPolicyID }}</span></p>
                    <p><span>入住人</span><span class="span-text">{{ props.row.Passenger }}</span></p>
                    <p><span>联系电话</span><span class="span-text">{{ props.row.PassengerTel }}</span></p>
                    <p><span>联系固话</span><span class="span-text">{{ props.row.PassengerTel2 }}</span></p>
                    <p><span>Email</span><span class="span-text">{{ props.row.Email }}</span></p>
                    <p><span>特殊要求</span><span class="span-text">{{ props.row.PassengerAsk }}</span></p>
                    <p><span>备注</span><span class="span-text">{{ props.row.Remark }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <p><span>实收款额</span><span class="span-text">{{ props.row.AmountShouldIn }}</span></p>
                    <p><span>应支款额</span><span class="span-text">{{ props.row.AmountShouldOut }}</span></p>
                    <p><span>已支付金额</span><span class="span-text">{{ props.row.AmountPaid }}</span></p>
                    <p><span>支付状态</span><span class="span-text">{{ props.row.PayState }}</span></p>
                    <p><span>优惠金额</span><span class="span-text">{{ props.row.Discounts }}</span></p>
                    <p><span>其他费用</span><span class="span-text">{{ props.row.OherFee }}</span></p>
                    <p><span>卖价</span><span class="span-text">{{ props.row.Price }}</span></p>
                    <p><span>底价</span><span class="span-text">{{ props.row.PriceFloor }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <p><span>酒店回传状态</span><span class="span-text">{{ props.row.HoltelReMsgState }}</span></p>
                    <p><span>发单状态</span><span class="span-text">{{ props.row.FaDanState }}</span></p>
                    <p><span>发单单号</span><span class="span-text">{{ props.row.FaDanNo }}</span></p>
                    <p><span>订单状态</span><span class="span-text">{{ props.row.OrderState }}</span></p>
                    <p><span>酒店预订号</span><span class="span-text">{{ props.row.BookingNo }}</span></p>
                    <p><span>审核状态</span><span class="span-text">{{ props.row.StateAuditor }}</span></p>
                    <p><span>提交状态</span><span class="span-text">{{ props.row.StateSubmit }}</span></p>
                    <p><span>打款状态</span><span class="span-text">{{ props.row.StateDaKuan }}</span></p>
                    <p><span>截图状态</span><span class="span-text">{{ props.row.StateScreenshot }}</span></p>
                    <p><span>对冲金额</span><span class="span-text">{{ props.row.DuiChongMoney }}</span></p>
                    <p><span>对冲单号</span><span class="span-text">{{ props.row.DuiChongID }}</span></p>
                </el-card>
                <el-card class="box-card">
                    <p><span>创建时间</span><span class="span-text">{{ props.row.CreateTime }}</span></p>
                    <p><span>创建ID</span><span class="span-text">{{ props.row.CreateUserID }}</span></p>
                    <p><span>创建用户名</span><span class="span-text">{{ props.row.CreateUserName }}</span></p>
                    <p><span>更新时间</span><span class="span-text">{{ props.row.UpdateTime }}</span></p>
                    <p><span>更新用户ID</span><span class="span-text">{{ props.row.UpdateUserID }}</span></p>
                    <p><span>更新用户姓名</span><span class="span-text">{{ props.row.UpdateUserName }}</span></p>
                    <p><span>是否已删除</span>
                        <span class="span-text" v-if="props.row.IsDelete">是</span>
                        <span class="span-text" v-else>否</span>
                    </p>
                    <p><span>删除用户</span><span class="span-text">{{ props.row.DeleteUser }}</span></p>
                    <p><span>删除时间</span><span class="span-text">{{ props.row.DeleteTime }}</span></p>
                </el-card>
              </div>
              <div>
                <el-card class="box-card2">
                    <img :src="imageUrl" width="132px" height="132px" style="display:inline-block" v-if="imageUrl"/>
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" 
                        :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeAvatarUpload" style="display:inline-block">
                        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <!-- <el-upload
                        class="upload-demo"
                        ref="upload"
                        :action="action"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false"
                        :on-success="handleSuccess" show-file-list>
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload> -->
                </el-card>
              </div>
            </template>
        </el-table-column>

        <el-table-column label="订单编号" prop="OrderNo" show-overflow-tooltip></el-table-column>
        <el-table-column label="酒店名称" prop="Hotel" show-overflow-tooltip></el-table-column>
        <el-table-column label="城市" prop="City"></el-table-column>
        <el-table-column label="房型" prop="Room" show-overflow-tooltip></el-table-column>
        <el-table-column label="入住日期" prop="StayDateStart"></el-table-column>
        <el-table-column label="退房日期" prop="StayDateEnd"></el-table-column>
        <el-table-column label="间数" prop="RoomNum"></el-table-column>
        <el-table-column label="晚数" prop="NightNum"></el-table-column>
        <el-table-column label="到店时间" prop="ArrivalTime"></el-table-column>
        <el-table-column label="货币" prop="Currency"></el-table-column>
        <el-table-column label="总金额" prop="AmountTotal"></el-table-column>
        <el-table-column label="订单状态" prop="OrderState"></el-table-column>
        
        <el-table-column label="操作" width="150">
            <template scope="scope">
                <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                <DeleteButton api="hotelsOrderApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton> 
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrapper">
        <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
    </div>
     <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')">
        <el-form ref="form" :model="form" label-width="110px">
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="酒店名称" prop="Hotel">
                        <el-input placeholder="请输入酒店名称" v-model="form.Hotel"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="房型" prop="Room">
                        <el-input placeholder="请输入房型" v-model="form.Room"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="间数" prop="RoomNum">
                        <el-input placeholder="请输入间数" v-model="form.RoomNum" style="width:100%"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="晚数" prop="NightNum">
                        <el-input placeholder="请输入晚数" v-model="form.NightNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="入住日期" prop="StayDateStart">
                        <el-date-picker v-model="form.StayDateStart" type="datetime" placeholder="选择日期时间" style="width:100%;"></el-date-picker>
                    </el-form-item>
                </el-col> 
                <el-col :span="12">
                    <el-form-item label="总金额" prop="AmountTotal">
                        <el-input placeholder="请输入总金额" v-model="form.AmountTotal"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="入住人" prop="Passenger">
                        <el-input placeholder="请输入入住人" v-model="form.Passenger"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="联系电话" prop="PassengerTel">
                        <el-input placeholder="请输入酒店名称" v-model="form.PassengerTel"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="支付状态" prop="PayState">
                        <el-select v-model="form.PayState" placeholder="请选择">
                            <el-option v-for="item in payState" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="酒店回传状态" prop="HoltelReMsgState">
                        <el-select v-model="form.HoltelReMsgState" placeholder="请选择">
                            <el-option v-for="(item,index) in remsgstateList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="发单状态" prop="FaDanState">
                        <el-switch v-model="form.FaDanState" on-text="已发" off-text="未发" on-value="已发单" off-value="未发单"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="订单状态" prop="OrderState">
                        <el-select v-model="form.OrderState" placeholder="请选择">
                            <el-option v-for="(item,index) in oderstateList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="审核状态" prop="StateAuditor">
                        <el-switch v-model="form.StateAuditor" on-text="已审" off-text="未审" on-value="已审核" off-value="未审核"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="提交状态" prop="StateSubmit">
                        <el-switch v-model="form.StateSubmit" on-text="已提" off-text="未提" on-value="已提交" off-value="未提交"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="打款状态" prop="StateDaKuan">
                        <el-switch v-model="form.StateDaKuan" on-text="已打" off-text="未打" on-value="已打款" off-value="未打款"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="截图状态" prop="StateScreenshot">
                        <el-switch v-model="form.StateScreenshot" on-text="已有" off-text="无" on-value="已截图" off-value="未截图"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="24">
                    <el-form-item label="特殊要求" prop="PassengerAsk">
                        <el-input type="textarea" v-model="form.PassengerAsk"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :loading="!isEditable">{{isEditable?'确 定':'提交中'}}</el-button>
        </span>
    </el-dialog> 
</div>
</template>
 
<script>
import { hotelsOrderApi } from 'api'

  export default {
    data() {
      return {
        imageUrl:'',
        imageUrl2:'',
        action:'',
        fileList: [],
        currentPage: 1,
        pageSize: 10,
        count: 0,
        loading: false,
        hotelsOrder:[],
        form:{
            PayState:'',
            HoltelReMsgState:'',
            OrderState:'',
            StayDateStart:'',
            FaDanState:'已发单',
            StateAuditor:'已审核',
            StateSubmit:'已提交',
            StateDaKuan:'已打款',
            StateScreenshot:'已截图',
            Screenshot:''
        },
        copyForm:{},
        showDialog:false,
        isEditable: true,
        title:'',
        active:0,
        payState:[
            {
                label:'未付款',
                value:0
            },
            {
                label:'未结清',
                value:1
            },
            {
                label:'已结清',
                value:2
            }
        ],
        filters: {
            Hotel: '',
            City: ''
        },
        remsgstateList:[],
        oderstateList:[],
        active:0,
        ID:'',
        expandRowKeys:[]
      }
    },
    created() {
        this.fetchData()
        this.configList = hotelsOrderApi.getConfig()
    },
    methods: {
        expand(row,expanded){
            const _self = this
            _self.active = 0
            _self.imageUrl = ''
            if(expanded){
                _self.action = "http://liukai.iok.la/Hotel/HotelOrder/UploadPic/" + row.OrderID
                if(row.Screenshot){
                    _self.imageUrl = 'http://liukai.iok.la/Upload/hotelorder/' + row.Screenshot
                }
                console.log(_self.imageUrl)
                _self.expandRowKeys.length = 0
                _self.expandRowKeys.push(row.ID)
                _self.ID = row.ID
                if(row.StateAuditor == '已审核'){
                    _self.active = 1
                }
                if(row.StateAuditor == '已提交'){
                    _self.active = 2
                }
                if(row.StateAuditor == '已打款'){
                    _self.active = 3
                }
                if(row.StateAuditor == '已截图'){
                    _self.active = 4
                }
            }
        },
        async getStateList(){
            const _self = this
            _self.remsgstateList = []
            _self.oderstateList = []
            const res = await hotelsOrderApi.getState();
            let d = res.data.Data;
            for(let i in d){
                if(d[i].FCode == 'remsgstate'){
                    _self.remsgstateList.push(d[i].Name)
                }
                if(d[i].FCode == 'oderstate'){
                    _self.oderstateList.push(d[i].Name)
                }
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        searchCallback(filters) {
            this.filters = filters
            this.fetchData()
        },
        async fetchData(currentPage, pageSize) {
            const _self = this
            _self.loading = true
            _self.currentPage = currentPage || _self.currentPage
            _self.pageSize = pageSize || _self.pageSize
            const options = {
                pageIndex: _self.currentPage,
                pageSize: _self.pageSize,
                order: 'ID',
                query: {
                    Hotel: _self.filters.Hotel,
                    City: _self.filters.City
                }
            }
            try {
                const res = await hotelsOrderApi.listByQuery(options)
                _self.hotelsOrder = res.data.Data
                _self.active = 0
                _self.count = res.data.Count
                _self.loading = false
            } catch (e) {
                _self.loading = false
            }
        },
        async clickEditBtn($index, row) {
            const _self = this
            try {
                _self.showDialog = true
                _self.form.ID = row.ID
                _self.form.Hotel = row.Hotel
                _self.form.Room = row.Room
                _self.form.RoomNum = row.RoomNum
                _self.form.NightNum = row.NightNum
                _self.form.StayDateStart = row.StayDateStart
                _self.form.AmountTotal = row.AmountTotal
                _self.form.Passenger = row.Passenger
                _self.form.PassengerTel = row.PassengerTel
                _self.form.PayState = row.PayState
                _self.form.HoltelReMsgState = row.HoltelReMsgState
                _self.form.FaDanState = row.FaDanState
                _self.form.OrderState = row.OrderState
                _self.form.StateAuditor = row.StateAuditor
                _self.form.StateSubmit = row.StateSubmit
                _self.form.StateDaKuan = row.StateDaKuan
                _self.form.StateScreenshot = row.StateScreenshot
                _self.form.PassengerAsk = row.PassengerAsk
                _self.copyForm = Object.assign({}, _self.form)
                _self.getStateList()
            } catch (e) {
                console.error(e)
            }
        },
        async clickAddBtn(){
            const _self = this
            _self.title = '添加酒店订单信息'
            _self.showDialog = true
            _self.form = {
                PayState:'',
                HoltelReMsgState:'',
                OrderState:'',
                StayDateStart:'',
                FaDanState:'已发单',
                StateAuditor:'已审核',
                StateSubmit:'已提交',
                StateDaKuan:'已打款',
                StateScreenshot:'已截图'
            }
            _self.getStateList()
        },
        submitForm() {
            const _self = this
            if (_self.form.ID) {
                _self.editSave()
            } else {
                _self.addSave()
            }
        },
        async addSave() {
            const _self = this
            /* _self.$refs['form'].validate(async valid => {
                if (valid) { */
                try {
                    _self.isEditable = false
                    await hotelsOrderApi.add(_self.form)
                    _self.fetchData()
                    //_self.$refs['form'].resetFields()
                    _self.showDialog = false
                    _self.$message({
                        message: '保存成功',
                        type: 'success'
                    })
                } catch (e) {
                    _self.$message.error('添加失败!!!')
                } finally {
                    _self.isEditable = true
                }
                /* } else {
                return false
                }
            }) */
        },
        async editSave() {
            const _self = this
            const form = {}
            for (let [k, v] of Object.entries(_self.form)) {
                if (_self.form[k] != _self.copyForm[k]) {
                form[k] = v
                }
            }
            try {
                _self.isEditable = false
                await hotelsOrderApi.edit(_self.form.ID, form)
                _self.fetchData()
                _self.showDialog = false
                _self.$message({
                    message: '编辑成功',
                    type: 'success'
                })
            } catch (e) {
                console.error(e)
                _self.$message.error('编辑失败!!!')
            } finally {
                _self.isEditable = true
            }
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        /* submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }, */
        async handleSuccess(response, file, fileList) {
            console.log(file)
            this.imageUrl2 = URL.createObjectURL(file.raw);
        }

    }
  }
</script>
<style lang="scss">
#HotelsOrder{
    .demo-table-expand{
        .el-col{
            height: 32px;
            text-align: center;
            border-right: 1px solid lightgrey;
            color:orange
        }
    }
    .el-card {
        background-color: #fbfdff;
        box-shadow: none;
    }
    .box-card{
        width:24.7%;
        height:34rem;
        display:inline-block;
    }
    .span-text{
        margin-left:20px;
        color:orange;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 132px;
        height: 132px;
        line-height: 132px;
        text-align: center;
    }
    .avatar {
        width: 132px;
        height: 132px;
        display: block;
    }
}
</style>
