<template lang="html">
<div id="HotelShow">
    <el-row :gutter="24">
        <!-- <el-col :span="4">
                <el-select v-model="filters.labelVal"  placeholder="请选择">
                    <el-option
                        v-for="(item,index) in selectedOptions"
                        :label="item.label"
                        :value="item.value"
                        :key="index">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select v-model="filters.CarID" filterable clearable placeholder="请选择车牌号" v-show="filters.labelVal == '1'">
                    <el-option v-for="(item,index) in carList" :key="index" :label="item.CarNumber" :value="item.ID"></el-option>
                </el-select>
                <el-select v-model="filters.DriverID" filterable clearable placeholder="请选择司机姓名" v-show="filters.labelVal == '2'">
                    <el-option v-for="(item,index) in driverList" :key="index" :label="item.Name" :value="item.ID"></el-option>
                </el-select>
            </el-col> -->
        <el-col :offset="2" :span="6">
            <!-- <el-button type="primary" @click="search()">搜索</el-button> -->
            <el-button type="primary" @click="clickAddBtn">创建</el-button>
        </el-col>
    </el-row>
    <el-table :data="hotelShowList" border style="width: 100%" v-loading="loading2" row-key="ID" :expand-row-keys="expandRowKeys" @expand="getInfo">
        <!-- <el-table-column type="selection" width="55"></el-table-column> -->
        <el-table-column type="expand">
            <template scope="props">
                    <el-form label-position="left" inline class="demo-table-expand" label-width="110px">
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="服务设施">
                                <span>{{ props.row.SeviceFacility }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="餐饮设施">
                                    <span>{{ props.row.DiningFacility }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="娱乐设施">
                                <span>{{ props.row.RecreationFacilicy }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="会议设施">
                                    <span>{{ props.row.ConferenceFacilicy }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="客房设施">
                                <span>{{ props.row.RoomFacilicy }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="楼层数">
                                    <span>{{ props.row.FloorLevelsNum }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="交通状况">
                                <span>{{ props.row.Traffic }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="特色标签">
                                    <span>{{ props.row.Label }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="商圈">
                                <span>{{ props.row.HotArea }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="房间数量">
                                    <span>{{ props.row.Rooms }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="装修时间">
                                <span>{{ props.row.FilmentTime }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="早餐时间">
                                    <span>{{ props.row.BreakfastTime }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="面积">
                                <span>{{ props.row.Acreage }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="入住人数">
                                    <span>{{ props.row.CheckInNum }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="24">
                            <el-col :span="12">
                                <el-form-item label="楼层数">
                                <span>{{ props.row.Floor }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="网络状况">
                                    <span>{{ props.row.NetWork }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="吸烟状况">
                                    <span>{{ props.row.Smoke }}</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
</template>
            </el-table-column>
        <el-table-column prop="ID" label="ID"></el-table-column>
        <el-table-column prop="HotelID" label="HotelID"></el-table-column>
        <el-table-column prop="BusinessTime" label="经营时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="CheckInPolicy" label="入住政策" show-overflow-tooltip></el-table-column>
        <el-table-column prop="CheckOutPolicy" label="离店政策" show-overflow-tooltip></el-table-column>
        <el-table-column prop="Favorable" label="好评率"></el-table-column>
        <el-table-column prop="FloorLevelsNum" label="楼层数"></el-table-column>
        <el-table-column prop="IsTransfer" label="接送机服务"></el-table-column>
        <el-table-column prop="Rooms" label="房间数"></el-table-column>
        <el-table-column label="操作" width="150">
<template scope="scope">
<el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">

    编辑</el-button>
<DeleteButton api="hotelShowApi" @successCallBack="fetchData" :id="scope.row.ID"></DeleteButton>
</template>
        </el-table-column>
    </el-table>
    <el-row :gutter="24" style="margin-top:20px;">
        <!-- <el-col :span="1">
            <el-button type="danger" size="small">删除</el-button>
        </el-col>
        <el-col :span="2">
            <el-dropdown @command="handleCommand">
                <el-button type="primary" size="small">
                    批量设置<i class="el-icon-caret-bottom el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">目的地</el-dropdown-item>
                    <el-dropdown-item command="b">属性</el-dropdown-item>
                    <el-dropdown-item command="c">图标</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col> -->
        <el-col :offset="14" :span="6">
            <div>
                <el-pagination layout="total, sizes, prev, pager, next, jumper" :page-sizes="[10, 20, 30]" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :total="count"></el-pagination>
            </div>
        </el-col>
    </el-row>
    <el-dialog :title="title" v-model="showDialog" @close="resetForm('form')">
        <el-form ref="form" :model="form" :rules="rules" label-width="110px">
            <el-row :gutter="24">
            <el-col :span="12">
                    <el-form-item label="ID">
                        <el-input placeholder="ID" v-model="form.ID"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                        <el-form-item label="酒店" prop="HotelID">
                            <el-select v-model="form.HotelID" clearable filterable remote placeholder="请输入酒店" :remote-method="remoteHotelList" :loading="loadingHotel">
                                <el-option v-for="(item,index) in hotelList" :key="index" :label="item&&item.HotelName" :value="item&&item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                
                 </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="入住政策" prop="CheckInPolicy">
                        <el-input placeholder="请输入入住政策" v-model="form.CheckInPolicy"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="离店政策" prop="CheckOutPolicy">
                        <el-input placeholder="请输入离店政策" v-model="form.CheckOutPolicy"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="经营时间" prop="BusinessTime">
                        <el-date-picker v-model="form.BusinessTime" type="date" placeholder="请输入经营时间" :picker-options="pickerOptions">
                            </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="好评率" prop="Favorable">
                        <el-input placeholder="请输入好评率" v-model="form.Favorable"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="接送机服务" prop="IsTransfer">
                        <!-- <el-input placeholder="接送机服务" v-model="form.IsTransfer"></el-input> -->
                        <el-switch v-model="form.IsTransfer" on-text="" off-text=""></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="楼层数" prop="FloorLevelsNum">
                        <el-input placeholder="请输入楼层数" v-model="form.FloorLevelsNum"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="服务设施" prop="SeviceFacility">
                        <el-input placeholder="请输入服务设施" v-model="form.SeviceFacility"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="餐饮设施" prop="DiningFacility">
                        <el-input placeholder="请输入餐饮设施" v-model="form.DiningFacility"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="娱乐设施" prop="RecreationFacilicy">
                        <el-input placeholder="请输入娱乐设施" v-model="form.RecreationFacilicy"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会议设施" prop="ConferenceFacilicy">
                        <el-input placeholder="请输入会议设施" v-model="form.ConferenceFacilicy"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="客房设施" prop="RoomFacilicy">
                        <el-input placeholder="请输入客房设施" v-model="form.RoomFacilicy"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="交通状况" prop="Traffic">
                        <el-input placeholder="请输入交通状况" v-model="form.Traffic"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="特色标签" prop="Label">
                        <el-input placeholder="请输入特色标签" v-model="form.Label"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商圈" prop="HotArea">
                        <el-input placeholder="请输入商圈" v-model="form.HotArea"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="房间数" prop="Rooms">
                        <el-input placeholder="请输入房间数" v-model="form.Rooms"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="装修时间" prop="FilmentTime">
                        <el-date-picker v-model="form.FilmentTime" type="date" placeholder="请输入装修时间" :picker-options="pickerOptions2">
                            </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="早餐时间" prop="BreakfastTime">
                        <el-date-picker v-model="form.BreakfastTime" type="datetime" placeholder="请输入早餐时间" :picker-options="pickerOptions3" style="width:100%"></el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="面积" prop="Acreage">
                        <el-input placeholder="请输入面积" v-model="form.Acreage"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="入住人数" prop="CheckInNum">
                        <el-input placeholder="请输入入住人数" v-model="form.CheckInNum"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Floor" prop="Floor">
                        <el-input placeholder="请输入Floor" v-model="form.Floor"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <el-col :span="12">
                    <el-form-item label="网络" prop="NetWork">
                        <el-input placeholder="请输入网络" v-model="form.NetWork"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="吸烟" prop="Smoke">
                        <el-input placeholder="请输入吸烟" v-model="form.Smoke"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                    <el-upload :action="uploadUrl" :before-upload="beforeAvatarUpload" list-type="picture-card" :file-list="imageList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :with-credentials="true">
                        <i class="el-icon-plus"></i>
                    </el-upload>
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
import path from '../../../api/api.js'
import {
    hotelShowApi,
    hotelImageApi,
    hotelBaseApi
} from 'api'
export default {
    created() {
        // this.form.hotelId = this.$route.params.ID
        this.fetchData()
    },
    data() {
        return {
            rules: {},
            uploadUrl: path.uploadUrl,
            imageList: [],
            currentPage: 1,
            pageSize: 10,
            count: 0,
            loading2: false,
            loadingHotel: false,
            hotelList: [],
            hotelShowList: [],
            expandRowKeys: [],
            pickerOptions: {},
            pickerOptions2: {},
            pickerOptions3: {},
            // filters: {
            //     CarID: '',
            //     DriverID: '',
            //     labelVal: '1'
            // },
            // selectedOptions: [{
            //         value: '1',
            //         label: '车牌号'
            //     },
            //     {
            //         value: '2',
            //         label: '司机姓名'
            //     }
            // ],
            form: {
                ID: 0,
                BusinessTime: '',
                CheckInPolicy: '',
                CheckOutPolicy: '',
                Favorable: '',
                FloorLevelsNum: '',
                HotelID: '',
                IsTransfer: false,
                Rooms: '',
                SeviceFacility: '',
                DiningFacility: '',
                RecreationFacilicy: '',
                ConferenceFacilicy: '',
                RoomFacilicy: '',
                FloorLevelsNum: '',
                Traffic: '',
                Label: '',
                HotArea: '',
                FilmentTime: '',
                BreakfastTime: '',
                Acreage: '',
                CheckInNum: '',
                Floor: '',
                NetWork: '',
                Smoke: '',
                // HotelImages: []
            },
            title: '',
            showDialog: false,
            isEditable: true
        }
    },
    methods: {
        beforeAvatarUpload(file) {
            const _self = this
            // if (!_self.bargainsForm.sonRoomId &&
            //     !Object.is(_self.bargainsForm.sonRoomId, 0)
            // ) {
            //     _self.$message({
            //         message: '请先选择子房型',
            //         type: 'warning'
            //     })
            //     return false
            // }
            const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJPG) {
                _self.$message.error('上传图片只能是 JPG/PNG 格式!')
            }
            return isJPG
        },
        async handleRemove(file, fileList) {
            try {
                if (file && file.id) {
                    await hotelImageApi.del(file.id)
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                }
            } catch (e) {
                this.$message.error('删除失败,请重试！')
            }
        },
        handlePictureCardPreview(file) {
            // this.dialogImageUrl = file.url;
            // this.dialogVisible = true;
        },
        async handleSuccess(response, file, fileList) {
            try {
                if (!response) {
                    this.$message.error('上传失败,请重新上传')
                    return false
                }
                const form = {
                    hotelId: this.form.HotelID,
                    imageUrl: response,
                    smallImageUrl: '',
                    imageType: file.type,
                    description: '',
                    imgWidth: 0,
                    imgHeight: 0,
                    imgGroup: ''
                }
                await hotelImageApi.add(form)
                this.$message({
                    message: '上传成功',
                    type: 'success'
                })
            } catch (e) {
                this.$message.error('上传失败,请重新上传')
            }
        },
        handleError(err, file, fileList) {
            this.$message.error('上传失败,请重新上传')
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.fetchData(1, this.pageSize)
        },
        handleCurrentChange(val) {
            this.currentPage = val
            this.fetchData(this.currentPage)
        },
        search() {
            this.fetchData()
        },
        async fetchData() {
            const _self = this
            _self.loading2 = true
            try {
                const res = await hotelShowApi.list()
                if (res && res.data) {
                    _self.hotelShowList = res.data
                    _self.hotelShowList.forEach(function(item1) {
                        item1.BusinessTime = new Date(item1.BusinessTime).Format('yyyy-MM-dd')
                        item1.BreakfastTime = new Date(item1.BreakfastTime).Format('yyyy-MM-dd')
                        item1.FilmentTime = new Date(item1.FilmentTime).Format('yyyy-MM-dd')
                    })
                }
                _self.loading2 = false
            } catch (e) {
                console.error(e)
                _self.loading2 = false
            }
        },
        getInfo(row, expanded) {
            const _self = this
            if (expanded) {
                _self.expandRowKeys.length = 0
                _self.expandRowKeys.push(row.ID)
            }
        },
        async remoteHotelList(querys) {
            const _self = this
            if (querys !== '') {
                _self.loadingHotel = true
                const options = {
                    pageIndex: 1,
                    pageSize: 20,
                    order: 'ID',
                    query: {
                        HotelName: querys
                    }
                }
                const res = await hotelBaseApi.listAll(options)
                if (res && res.data && res.data.Data) {
                    _self.hotelList = res.data.Data
                    _self.loadingHotel = false
                }
            } else {
                _self.hotelList = []
            }
        },
        clickAddBtn() {
            const _self = this
            _self.title = '添加酒店展示信息'
            _self.showDialog = true
            _self.form = {
                ID: 0,
                BusinessTime: '',
                CheckInPolicy: '',
                CheckOutPolicy: '',
                Favorable: '',
                FloorLevelsNum: '',
                HotelID: '',
                IsTransfer: false,
                Rooms: '',
                SeviceFacility: '',
                DiningFacility: '',
                RecreationFacilicy: '',
                ConferenceFacilicy: '',
                RoomFacilicy: '',
                FloorLevelsNum: '',
                Traffic: '',
                Label: '',
                HotArea: '',
                FilmentTime: '',
                BreakfastTime: '',
                Acreage: '',
                CheckInNum: '',
                Floor: '',
                NetWork: '',
                Smoke: '',
                // HotelImages: []
            }
            _self.imageList = []
        },
        async clickEditBtn($index, row) {
            const _self = this
            _self.title = '酒店展示信息编辑'
            _self.imageList = []
            _self.showDialog = true
            const res = await hotelShowApi.detail(row.ID)
            _self.form = res.data
            if (Array.isArray(_self.form.HotelImages)) {
                this.imageList = _self.form.HotelImages.map(item => ({
                    id: item.ID,
                    name: item.ImageUrl,
                    url: path.imageUrl + item.ImageUrl
                }))
            }
        },
        handleCommand(command) {
            this.$message('click on item ' + command);
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
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        _self.isEditable = false
                        _self.form.BusinessTime ? _self.form.BusinessTime = new Date(_self.form.BusinessTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                        _self.form.BreakfastTime ? _self.form.BreakfastTime = new Date(_self.form.BreakfastTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                        _self.form.FilmentTime ? _self.form.FilmentTime = new Date(_self.form.FilmentTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                        await await hotelShowApi.add(_self.form)
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
                    } finally {
                        _self.isEditable = true
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
                        _self.isEditable = false
                        _self.form.BusinessTime ? _self.form.BusinessTime = new Date(_self.form.BusinessTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                        _self.form.BreakfastTime ? _self.form.BreakfastTime = new Date(_self.form.BreakfastTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                        _self.form.FilmentTime ? _self.form.FilmentTime = new Date(_self.form.FilmentTime).Format('yyyy-MM-dd hh:mm:ss') : ''
                        await hotelShowApi.edit(_self.form.ID, _self.form)
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
                    } finally {
                        _self.isEditable = true
                    }
                } else {
                    return false
                }
            })
        }
    }
}
</script>
<style lang="scss">
#HotelShow {
    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }
    .el-table__expanded-cell {
        padding: 20px 15px 20px 66px !important;
    }
    .demo-table-expand {
        padding: 0 0 10px 16px !important;
    }
    .demo-table-expand .el-form-item span {
        color: orange;
    }
}
</style>
