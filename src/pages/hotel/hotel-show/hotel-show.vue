<template lang="html">
  <div>
    <el-row>
        <el-button type="primary" @click="hotelShowAdd">创建</el-button>
    </el-row>
    <!-- table start -->
    <el-table :data="hotelShowList" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border>
        <el-table-column label="酒店ID" prop="HotelID"></el-table-column>
        <el-table-column label="房间数量" prop="Rooms"></el-table-column>
        <el-table-column label="楼层数" prop="FloorLevelsNum"></el-table-column>
        <el-table-column label="经营时间" prop="BusinessTime"></el-table-column>
        <el-table-column label="入住政策" prop="CheckInPolicy"></el-table-column>
        <el-table-column label="离店" prop="CheckOutPolicy"></el-table-column>
        <el-table-column label="特色标签" prop="Lable"></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="clickEditBtn(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
    </el-table>
    <!-- table end -->

    <!-- edit hotelshow start -->
    <el-dialog :title="form.ID?'编辑酒店展示信息':'添加酒店展示信息'" v-model="showDialog" size="" @close="resetForm('form')">
        <el-form ref="form" :model="form" :rules="rules">
            <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="入住政策" prop="CheckInPolicy">
                <el-input v-model="form.CheckInPolicy"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="离店" prop="CheckOutPolicy">
                <el-input v-model="form.CheckOutPolicy"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="服务设施" prop="ServiceFacility">
                <el-input v-model="form.ServiceFacility"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="餐饮设施" prop="DiningFacility">
                <el-input v-model="form.DiningFacility"></el-input>
                </el-form-item>
            </el-col>
            </el-row>

            <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="娱乐设施" prop="RecreationFacility">
                <el-input v-model="form.RecreationFacility"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="会议设施" prop="ConferenceFacility">
                <el-input v-model="form.ConferenceFacility"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="客房设施" prop="RoomFacility">
                <el-input v-model="form.RoomFacility"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="楼层数" prop="FloorLevelsNum">
                <el-input v-model="form.FloorLevelsNum"></el-input>
                </el-form-item>
            </el-col>
            </el-row>

            <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="交通状况" prop="Traffic">
                <el-input v-model="form.Traffic"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="特色标签" prop="Lable">
                <el-input v-model="form.Lable"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="商圈" prop="HotArea">
                <el-input v-model="form.HotArea"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="经纬度" prop="coordinate">
                <el-input v-model="form.coordinate"></el-input>
                </el-form-item>
            </el-col>
            </el-row>

            <el-row :gutter="20">
            <el-col :span="5">
                <el-form-item label="房间数量" prop="Rooms">
                <el-input v-model="form.Rooms"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="装修时间" prop="FilmentTime">
                <el-input v-model="form.FilmentTime"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="5">
                <el-form-item label="经营时间" prop="BusinessTime">
                <el-input v-model="form.BusinessTime"></el-input>
                </el-form-item>
            </el-col>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitEditForm('form')">确 定</el-button>
        </span>
    </el-dialog>
    <!-- edit hotelshow end -->

  </div>
</template>

<script>
import { hotelShowApi } from 'api';
export default {
  data () {
      return {
          hotelShowList: [],
          loading: true,
          showDialog: false,
          form: {
                ID:'',
                hotelId:'',
                Rooms:'',
                FloorLevelsNum: 1,
                CheckInPolicy:'',
                CheckOutPolicy:'',
                ServiceFacility:'',
                DiningFacility:'',
                RecreationFacility:'',
                ConferenceFacility:'',
                RoomFacility:'',
                Traffic:'',
                Lable:'',
                HotArea:'',
                coordinate:'',
                FilmentTime:'',
                BusinessTime:'',
          },
          rules: {
                CheckInPolicy: [{
                    required: true,
                    message: '请填写入住政策',
                    trigger: 'blur'
                }],
                Rooms: [{
                    required: true,
                    message: '请填写房间数量',
                    trigger: 'blur'
                }],
                BusinessTime: [{
                    required: true,
                    message: '请填写经营时间',
                    trigger: 'blur'
                }]
            },
      }
  },
  methods: {
        async fetchData() {
            const _self = this;
            _self.loading = true;
            _self.hotelShowList = [];
            try {
                const res = await hotelShowApi.list();
                if (res && res.data) {
                    _self.hotelShowList = res.data;
                }
                _self.loading = false;
            } catch (e) {
                console.error(e);
                _self.loading = false;
            }
        },
        async clickDelBtn($index, row) {
            const _self = this;
            _self.$confirm(`是否删除?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async() => {
                try {
                    await hotelShowApi.del(row.ID);
                    _self.fetchData();
                    _self.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                } catch (e) {
                    console.error(e);
                }
            }).catch(() => {});
        },
        async clickEditBtn(row) {
            const _self = this;
            try {
                const res = await hotelShowApi.detail(row.ID);
                _self.form = res.data;
                _self.showDialog = true;
            } catch (e) {
                console.error(e);
            }
        },
        hotelShowAdd() {
            const _self = this;
             _self.form = {
              hotelId : this.$route.params.ID
            }
            _self.showDialog = true;
        },
        async submitEditForm() {
            const _self = this;
            _self.$refs['form'].validate(async valid => {
                if (valid) {
                    try {
                        if (_self.form.ID) {
                            await hotelShowApi.edit(_self.form);
                        } else {
                            let form = { ..._self.form
                            }
                            delete form.ID
                            await hotelShowApi.add(form);
                        }
                        _self.fetchData();
                        _self.$refs['form'].resetFields();
                        _self.showDialog = false;
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
       this.form.hotelId = this.$route.params.ID
        this.fetchData();
    }
}
</script>
