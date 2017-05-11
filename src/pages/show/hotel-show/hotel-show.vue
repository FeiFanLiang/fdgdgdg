<template lang="html">
  <div >
    <!-- 搜索框 start -->
    <el-row :gutter="20">
      <el-col :span="3">
        <el-select v-model="filters.labelVal"  placeholder="请选择">
          <el-option
              v-for="(item,index) in selectedOptions"
              :label="item.label"
              :value="item.value"
              :key="index">
          </el-option>
        </el-select>
        </el-col>
        <el-col :span="5">
            <el-input placeholder="请输入列表ID" v-model="filters.ID" v-show="filters.labelVal == '1'"></el-input>
        </el-col>
        <el-button type="primary" @click="handleSearch(filters)">搜索</el-button>
    </el-row>
    <!-- 搜索框 end -->
    <!-- table start -->
    <el-table :data="hotelShowList" ref="table" style="width: 100%" element-loading-text="拼命加载中"
      v-loading="loading" border @expand="hotelShowExpand" row-key="ID" :expand-row-keys="expandRowKeys">
        <!--<el-table-column type="expand">
            <template scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                  <el-row :gutter="20">
                      <el-col :span="4">
                        <el-form-item label="列表ID：">
                            <span>{{ props.row.ID }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="酒店ID：">
                            <span>{{ props.row.HotelID }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                         <el-form-item label="酒店名称：">
                            <span>{{ props.row.Hotel }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="入住政策：">
                            <span>{{ props.row.CheckInPolicy }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="离店：">
                            <span>{{ props.row.CheckOutPolicy }}</span>
                        </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="4">
                        <el-form-item label="服务设施：">
                            <span>{{ props.row.ServiceFacility }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                         <el-form-item label="餐饮设施：">
                            <span>{{ props.row.DiningFacility }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="娱乐设施：">
                            <span>{{ props.row.RecreationFacility }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="会议设施：">
                            <span>{{ props.row.ConferenceFacility }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="客房设施：">
                            <span>{{ props.row.RoomFacility }}</span>
                        </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="4">
                         <el-form-item label="楼层数：">
                            <span>{{ props.row.FloorLevelsNum }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="交通状况：">
                            <span>{{ props.row.Traffic }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="特色标签：">
                            <span>{{ props.row.Lable }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="商圈：">
                            <span>{{ props.row.HotArea }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="经纬度：">
                            <span>{{ props.row.coordinate }}</span>
                        </el-form-item>
                      </el-col>
                  </el-row>

                  <el-row :gutter="20">
                      <el-col :span="4">
                         <el-form-item label="房间数量：">
                            <span>{{ props.row.Rooms }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="装修时间：">
                            <span>{{ props.row.FilmentTime }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="经营时间：">
                            <span>{{ props.row.BusinessTime }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                        <el-form-item label="酒店图片：">
                            <span>{{ props.row.HotelImages }}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="4">
                      </el-col>
                  </el-row>
              </el-form>
            </template>
        </el-table-column>-->
        <el-table-column label="酒店ID" prop="HotelID"></el-table-column>
        <el-table-column label="房间数量" prop="Rooms"></el-table-column>
        <el-table-column label="楼层数" prop="FloorLevelsNum"></el-table-column>
        <el-table-column label="经营时间" prop="BusinessTime"></el-table-column>
        <el-table-column label="入住政策" prop="CheckInPolicy"></el-table-column>
        <el-table-column label="离店" prop="CheckOutPolicy"></el-table-column>
        <el-table-column label="特色标签" prop="Lable"></el-table-column>
        <el-table-column  width="150"  label="操作" fixed="right">
          <template scope="scope">
            <el-button size="small" @click="clickEditBtn(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="clickDelBtn(scope.$index, scope.row)">删除</el-button>
           </template>
        </el-table-column>
    </el-table>
    <!-- table end -->


  </div>
</template>

<script>
import { hotelShowApi } from 'api';
export default {
  data () {
      return {
          filters: {
            ID: '',
            labelVal: '1',
          },
          selectedOptions: [{
                value: '1',
                label: '列表ID'
            },
          ],
          hotelShowList: [],
          expandRowKeys: [],
          loading: true,
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
        hotelShowExpand(row, expanded) {
            const _self = this;
            if (expanded) {
                _self.expandRowKeys.length = 0;
                _self.expandRowKeys.push(row.ID);
            }
        },
        handleSearch() {
            this.fetchData();
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
        clickEditBtn($index, row) {
            this.$router.push({
                name: '编辑酒店展示',
                params: {
                    hotelID: row.HotelID,
                    hotelShowID: row.ID
                }
            });
        }
  },
   mounted() {
        this.fetchData();
    }
}
</script>
