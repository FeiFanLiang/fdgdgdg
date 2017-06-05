<template lang="html">
    <div id="bargains-room-page">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="开始日期">
                <el-date-picker v-model="searchForm.beginDate" type="date" placeholder="选择开始日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束日期">
                <el-date-picker v-model="searchForm.endDate" type="date" placeholder="选择结束日期" :picker-options="pickerOptions">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="fetchData">搜索</el-button>
                <el-button type="primary" @click="clickAddBtn">创建</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list" ref="table" style="width: 100%" element-loading-text="拼命加载中" v-loading="loading" border row-key="ID">
            <!--Hotel HotelShowID Room RoomShowID SonRoom SonRoomID-->
            <el-table-column prop="ID" label="ID" width="55"></el-table-column>
            <el-table-column prop="UseDate" label="入住日期" show-overflow-tooltip></el-table-column>
            <el-table-column prop="Days" label="入住天数" show-overflow-tooltip></el-table-column>
            <el-table-column prop="WebLowestPrice" label="网站最低价"></el-table-column>
            <el-table-column prop="Price" label="售卖价格"></el-table-column>
            <el-table-column prop="Label" label="卖点标签" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CancleReason" label="退改规则" show-overflow-tooltip></el-table-column>
            <el-table-column prop="IsSolded" label="已售出"></el-table-column>
            <el-table-column prop="BuyUserPhone" label="购买人手机号" show-overflow-tooltip></el-table-column>
            <el-table-column prop="CreateUser" label="创建人"></el-table-column>
            <el-table-column label="操作" fixed="right">
                <template scope="scope">
                    <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <p>{{bargainsForm.hotelId}}</p>
        <el-dialog :title="bargainsForm.id?'编辑特价房信息':'添加特价房信息'" v-model="showDialog" size="small" @close="resetForm('bargainsForm')">
            <el-form :model="bargainsForm" ref="bargainsForm" :rules="bargainsRules" label-width="105px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="ID">
                            <el-input v-model="bargainsForm.id" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="!bargainsForm.id">
                        <el-form-item label="酒店" prop="hotelId">
                            <el-select v-model="bargainsForm.hotelId" clearable filterable remote placeholder="请输入酒店" :remote-method="remoteHotelList" :loading="loadingHotel">
                                <el-option v-for="(item,index) in hotelList" :key="index" :label="item&&item.HotelName" :value="item&&item.ID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="!bargainsForm.id">
                        <el-form-item label="选择子房型" prop="rooms">
                            <el-cascader :options="hotelRoomList" v-model="bargainsForm.rooms" @change="handleChange">
                            </el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="子房型ID" prop="sonRoomId">
                            <el-input v-model="bargainsForm.sonRoomId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="入住时间" prop="useDate">
                            <el-date-picker v-model="bargainsForm.useDate" type="date" placeholder="入住时间" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="入住天数" prop="days">
                            <el-input v-model="bargainsForm.days"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="网站最低价" prop="webLowestPrice">
                            <el-input v-model="bargainsForm.webLowestPrice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="售卖价格" prop="price">
                            <el-input v-model="bargainsForm.price"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="卖点标签">
                            <el-input v-model="bargainsForm.label"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="创建人">
                            <el-input v-model="bargainsForm.createUser"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="bargainsForm.id">
                    <el-col :span="12">
                        <el-form-item label="购买人手机号">
                            <el-input v-model="bargainsForm.buyUserPhone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-form-item label="已售出">
                        <el-switch v-model="bargainsForm.isSolded" on-text="" off-text=""></el-switch>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="退改规则">
                        <el-input type="textarea" v-model="bargainsForm.cancleReason"></el-input>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-upload :action="uploadUrl" :before-upload="beforeAvatarUpload" list-type="picture-card" :file-list="imageList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess" :on-error="handleError" :with-credentials="true">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="handleBargainsRoomSaveAndEdit('bargainsForm')">确 定</el-button>
      </span>
        </el-dialog>
        <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
import path from '../../../api/api.js'
import {
    bargainsRoomApi,
    hotelBaseApi,
    hotelRoomApi,
    hotelImageApi
} from 'api';

export default {
    data() {
            return {
                uploadUrl: path.uploadUrl,
                imageList: [],
                dialogVisible: false,
                dialogImageUrl: '',
                list: [],
                loading: true,
                loadingHotel: false,
                hotelList: [],
                hotelRoomList: [],
                searchForm: {
                    beginDate: '',
                    endDate: ''
                },
                pickerOptions: {
                    // disabledDate(time) {
                    //     return time.getTime() < Date.now() - 8.64e7;
                    // }
                },
                showDialog: false,
                roomId: '',
                bargainsForm: {
                    id: 0,
                    hotelId: '',
                    rooms: [],
                    sonRoomId: '',
                    useDate: '',
                    days: '',
                    price: '',
                    createUser: '',
                    webLowestPrice: '',
                    label: '',
                    cancleReason: '',
                    isSolded: false,
                    buyUserPhone: ''
                },
                bargainsRules: {
                    hotelId: [{
                        required: true,
                        message: '请输入酒店名称'
                    }],
                    rooms: [{
                        required: true,
                        message: '请选择子房型'
                    }],
                    sonRoomId: [{
                        required: true,
                        message: '请填写子房型ID'
                    }],
                    useDate: [{
                        required: true,
                        message: '请填写入住日期'
                    }],
                    days: [{
                        required: true,
                        message: '请填写入住天数'
                    }],
                    price: [{
                        required: true,
                        message: '请填写价格'
                    }],
                    webLowestPrice: [{
                        required: true,
                        message: '请填写网站最低价'
                    }]
                }
            };
        },
        watch: {
            'bargainsForm.hotelId': async function(newQuestion) {
                const _self = this;
                _self.hotelRoomList = [];
                _self.bargainsForm.id ? '' : _self.bargainsForm.sonRoomId = '';
                if (newQuestion !== '') {
                    const res = await hotelRoomApi.list(newQuestion);
                    // _self.hotelRoomList = res.data;
                    for (let [a, elem] of res.data.entries()) {
                        if (res.data[a].SonRooms.length > 0) {
                            _self.hotelRoomList.push({
                                label: '',
                                value: '',
                                children: []
                            });
                            _self.hotelRoomList[a].label = res.data[a].RoomName;
                            _self.hotelRoomList[a].value = res.data[a].ID;
                            for (let [b, elem] of res.data[a].SonRooms.entries()) {
                                _self.hotelRoomList[a].children.push({});
                                _self.hotelRoomList[a].children[b].label = res.data[a].SonRooms[b].SonRoomName;
                                _self.hotelRoomList[a].children[b].value = res.data[a].SonRooms[b].ID;
                            }
                        }
                    }
                    console.dir(_self.hotelRoomList)
                }
            },
            'bargainsForm.sonRoomId': async function() {
                const _self = this;
                if (_self.roomId || Object.is(_self.roomId, 0)) {
                    _self.getImageList(_self.roomId)
                }
            }
        },
        methods: {
            async getImageList(id) {
                const res = await hotelImageApi.listByRoomId(id);
                if (res.data && Array.isArray(res.data)) {
                    this.imageList = res.data.map(item => ({
                        id: item.ID,
                        name: item.Path,
                        url: path.imageUrl + item.Path
                    }))
                }
            },
            beforeAvatarUpload(file) {
                const _self = this;
                if (!_self.bargainsForm.sonRoomId && !Object.is(_self.bargainsForm.sonRoomId, 0)) {
                    _self.$message({
                        message: '请先选择子房型',
                        type: 'warning'
                    });
                    return false;
                }
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJPG) {
                    _self.$message.error('上传图片只能是 JPG/PNG 格式!');
                }
                return isJPG;
            },
            async handleRemove(file, fileList) {
                try {
                    if (file && file.id) {
                        await hotelImageApi.remove(file.id);
                        // hotelImageApi.listByRoomId(this.roomId);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                } catch (e) {
                    this.$message.error('删除失败,请重试！');
                }
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            async handleSuccess(response, file, fileList) {
                try {
                    if (!response) {
                        this.$message.error('上传失败,请重新上传');
                        return false;
                    }
                    const form = {
                        hotelId: this.bargainsForm.hotelId,
                        roomId: this.roomId,
                        path: response
                    };
                    await hotelImageApi.add(form);
                    hotelImageApi.listByRoomId(this.roomId);
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                } catch (e) {
                    this.$message.error('上传失败,请重新上传');
                }
            },
            handleError(err, file, fileList) {
                this.$message.error('上传失败,请重新上传');
            },
            handleCurrentChange(val) {
                this.currentPage = val;
            },
            handleChange(value) {
                console.log(value);
                this.bargainsForm.sonRoomId = value[1];
                this.roomId = value[0]
            },
            async fetchData() {
                const _self = this;
                _self.loading = true;
                try {
                    _self.searchForm.beginDate = new Date(_self.searchForm.beginDate).Format('yyyy-MM-dd');
                    _self.searchForm.endDate = new Date(_self.searchForm.endDate).Format('yyyy-MM-dd');
                    const res = await bargainsRoomApi.list(_self.searchForm);
                    _self.list = res.data;
                    for (let [index, elem] of _self.list.entries()) {
                        _self.list[index].UseDate = new Date(_self.list[index].UseDate).Format('yyyy-MM-dd')
                    }
                    _self.loading = false;
                } catch (e) {
                    console.error(e);
                    _self.loading = false;
                }
            },
            async remoteHotelList(querys) {
                const _self = this;
                if (querys !== '') {
                    _self.loadingHotel = true;
                    const options = {
                        pageIndex: 1,
                        pageSize: 20,
                        order: 'ID',
                        query: {
                            HotelName: querys
                        }
                    };
                    const res = await hotelBaseApi.listAll(options);
                    if (res && res.data && res.data.Data) {
                        _self.hotelList = res.data.Data;
                        _self.loadingHotel = false;
                    }
                } else {
                    _self.hotelList = [];
                }
            },
            clickAddBtn() {
                const _self = this;
                _self.showDialog = true;
                _self.bargainsForm = {
                    id: 0,
                    hotelId: '',
                    rooms: [],
                    sonRoomId: '',
                    useDate: '',
                    days: '',
                    price: '',
                    createUser: '',
                    webLowestPrice: '',
                    label: '',
                    cancleReason: '',
                    isSolded: true,
                    buyUserPhone: ''
                }
            },
            async clickEditBtn($index, row) {
                const _self = this;
                try {
                    const res = await bargainsRoomApi.detail(row.ID);
                    // Hotel
                    // RoomroomShowIdhotelShowId
                    // SonRoom
                    _self.showDialog = true;
                    _self.bargainsForm.id = res.data.ID;
                    _self.bargainsForm.sonRoomId = res.data.SonRoom.ID;
                    _self.bargainsForm.useDate = res.data.UseDate;
                    _self.bargainsForm.days = res.data.Days;
                    _self.bargainsForm.price = res.data.Price;
                    _self.bargainsForm.createUser = res.data.CreateUser;
                    _self.bargainsForm.webLowestPrice = res.data.WebLowestPrice;
                    _self.bargainsForm.label = res.data.Label;
                    _self.bargainsForm.cancleReason = res.data.CancleReason;
                    _self.bargainsForm.isSolded = res.data.IsSolded;
                    _self.bargainsForm.buyUserPhone = res.data.BuyUserPhone;
                    _self.bargainsForm.hotelId = res.data.Hotel.ID;
                    _self.roomId = res.data.Room.ID;
                } catch (e) {
                    console.error(e);
                }
            },
            async handleBargainsRoomSaveAndEdit(formName) {
                const _self = this;
                _self.$refs[formName].validate(async valid => {
                    if (valid) {
                        try {
                            _self.bargainsForm.useDate = new Date(_self.bargainsForm.useDate).Format('yyyy-MM-dd');
                            if (_self.bargainsForm.id) {
                                await bargainsRoomApi.edit(_self.bargainsForm);
                            } else {
                                await bargainsRoomApi.add(_self.bargainsForm);
                            }
                            _self.$refs[formName].resetFields();
                            _self.showDialog = false;
                            _self.fetchData();
                            _self.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                        } catch (e) {
                            console.error(e);
                            _self.$message.error('保存失败!!!');
                        }
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {

            Date.prototype.Format = function(fmt) {
                let o = {
                    'M+': this.getMonth() + 1, //月份
                    'd+': this.getDate(), //日
                    'h+': this.getHours(), //小时
                    'm+': this.getMinutes(), //分
                    's+': this.getSeconds(), //秒
                    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
                    S: this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt))
                    fmt = fmt.replace(
                        RegExp.$1,
                        (this.getFullYear() + '').substr(4 - RegExp.$1.length)
                    );
                for (let k in o)
                    if (new RegExp('(' + k + ')').test(fmt))
                        fmt = fmt.replace(
                            RegExp.$1,
                            RegExp.$1.length == 1 ?
                            o[k] :
                            ('00' + o[k]).substr(('' + o[k]).length)
                        );
                return fmt;
            };

            this.searchForm.beginDate = new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01').Format('yyyy-MM-dd');
            this.searchForm.endDate = new Date().Format('yyyy-MM-dd');
            this.fetchData();
        }
};
</script>
<style lang="scss">
#bargains-room-page {
    .el-row {
        margin-bottom: 0px;
    }
    // .el-date-editor.el-input {
    //     width: 178px;
    // }
}
</style>
