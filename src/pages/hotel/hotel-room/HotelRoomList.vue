<template>
<div id="hotel-platform-info">
  <Menu path="room">
    <el-button type="primary" @click="hotelroomAdd">创建</el-button>
  </Menu>
  <el-table :data="hotelroomlist" border style="width: 100%">
    <el-table-column prop="RoomName" label="房间名称"></el-table-column>
    <el-table-column prop="RoomCode" label="房间编号"></el-table-column>
    <el-table-column prop="RoomCount" label="数量"></el-table-column>
    <el-table-column prop="Remark" label="备注"></el-table-column>
    <el-table-column label="操作" width="180">
      <template scope="scope">
          <el-button size="mini" @click="hotelroomEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="hotelroomDelete(scope.$index, scope.row)">删除</el-button>
        </template>
    </el-table-column>
  </el-table>
  <div class="ui-table sheet">
              <div class="ui-table-header">
                  <table>
                      <tbody>
                      <tr>
                          <th class="ui-table-col-left w150">
                              <input type="checkbox" class="checkbox"> 房型名称
                          </th>
                          <th class="ui-table-col-left w150">
                              <input type="checkbox" class="checkbox"> 产品名称
                          </th>
                          <th class="ui-table-col-center w50">早餐</th>
                          <th class="ui-table-col-center w80">支付方式</th>
                          <th class="ui-table-col-center w250">退款规则</th>
                          <th class="ui-table-col-center w250">生效规则</th>
                          <th class="ui-table-col-center w80">状态</th>
                          <th class="ui-table-col-center w80"> 操作
                          </th>
                      </tr>
                      </tbody>
                  </table>
              </div>
              <div class="ui-table-body">
                  <table>
                      <tbody>
                        <tr>
                          <td class="ui-table-col-left w150" rowspan="2">
                              <input type="checkbox" class="checkbox" value="2536469">
                              单人间
                          </td>
                          <td class="ui-table-col-left w150">
                              <input type="checkbox" class="checkbox" value="3693326">
                              <!-- 当点击一个ruleName的时候，批量设置规则 batchEdit -->
                                  <a href="javascript: void 0">预付无早
                                      <i class="ui-icon" title="批量编辑同名称产品"></i>
                                  </a>
                          </td>
                          <td class="ui-table-col-center w50">无早</td>
                          <td class="ui-table-col-center w80">预付</td>
                          <td class="ui-table-col-center w250">不可退改
                          </td>
                          <td class="ui-table-col-center w250"> 仅07:00:00到当日23:00:00可售 需提前7天22:00:00之前可订</td>
                          <td class="ui-table-col-center w80">
                              <i class="ui-icon green"></i>
                              <!--ms-if--></td>
                          <td class="ui-table-col-center w80">
                              <a href="/web/hotel/modifyProduction?hotelId=1054691&amp;productId=3693326" data-auth-uri="/product/api/product/edit">编辑</a>
                          </td>
                      </tr>
                      </tbody>
                  </table>
              </div>
          </div>
  <el-dialog :title="form.hotelId?'编辑房间信息':'添加房间信息'" v-model="dialogVisible" size="small" @close="dialogClose">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row>
        <el-col :span="11">
          <el-form-item label="房间名称" prop="roomName">
            <el-input v-model="form.roomName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="房间编号" prop="RoomCode">
            <el-input v-model="form.RoomCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="11">
          <el-form-item label="数量" prop="roomCount">
            <el-input v-model="form.roomCount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item label="备注">
            <el-input v-model="form.remark" type="textarea"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSaveAndEdit()">确 定</el-button>
      </span>
  </el-dialog>

</div>
</template>

<script>
import {
  hotelRoomApi,
} from 'api';
import {Menu} from 'components'
export default {
  components: {
    Menu
  },
  data() {
    return {
      form: {
        hotelId: '',
        roomName: '',
        RoomCode: '',
        roomCount: '',
        remark: ''
      },
      rules: {
        roomName: [{
          required: true,
          message: '请填写房间名称',
          trigger: 'blur'
        }],
        RoomCode: [{
          required: true,
          message: '请填写房间编号',
          trigger: 'blur'
        }],
        roomCount: [{
          required: true,
          message: '请填写房间数量',
          trigger: 'blur'
        }]
      },
      dialogVisible: false,
      bedsOptions: [],
      hotelroomlist: [],
    };
  },
  mounted() {
    this.form.hotelId = this.$route.params.ID
    this.fetchData();
  },
  methods: {
    hotelSonRoomEdit(index,row){

    },
    dialogClose() {
      for (let item in this.form) {
        this.form[item] = '';
      }
    },
    async handleSaveAndEdit() {
      const _self = this;
      _self.$refs['form'].validate(async valid => {
        if (valid) {
          try {
            if (_self.form.ID) {
              await hotelRoomApi.edit(_self.form.ID, _self.form);
            } else {
              await hotelRoomApi.add(_self.form);
            }
            _self.fetchData();
            _self.dialogVisible = false;
            _self.$message({
              message: '保存成功',
              type: 'success'
            });
          } catch (e) {
            console.error(e);
          }
        } else {
          return false;
        }
      });

    },
    hotelroomAdd() {
      this.dialogVisible = true;
    },
    hotelroomEdit($index, row) {
      const _self = this;
      _self.form.ID = row.ID;
      _self.form.hotelId = row.HotelID;
      _self.form.roomName = row.RoomName;
      _self.form.roomCount = row.RoomCount;
      _self.form.remark = row.Remark;
      _self.dialogVisible = true;
    },
    async hotelroomDelete($index, row) {
      const _self = this;
      try {
        await _self.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await hotelRoomApi.remove(row.ID);
        _self.fetchData();
        _self.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    async fetchData() {
      if (!this.$route.params.ID) return;
      const res = await hotelRoomApi.list(this.$route.params.ID);
      this.hotelroomlist = res.data;
    }
  }
};
</script>
<style lang="scss">
#hotel-platform-info {
    .filters {
        margin: 0 0 20px;
        border: 1px #efefef solid;
        padding: 10px;
        background: #f9f9f9;

        .filter {
            display: inline-block;
            width: auto;
            padding: 10px;
            border-radius: 5px;
            .el-select {
                display: inline-block;
            }
        }

        .el-input {
            width: 150px;
            display: inline-block;
        }
    }
}
</style>
