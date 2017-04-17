<template lang="html">
  <div id="HotelBasePage">
    
    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->
    
    <!-- search start -->
    <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal" clearable placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入酒店ID" v-model="filters.id" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入酒店名称" v-model="filters.HotelName" v-show="filters.labelVal == '2'"></el-input>
          <el-input placeholder="请输入酒店英文名称" v-model="filters.HotelName_En" v-show="filters.labelVal == '3'"></el-input>
      </div>
        <el-button type="primary" @click="hotelbaseSearch()">搜索</el-button>
        <el-button type="primary">
          <router-link :to="{path: '/HotelBaseAdd'}">创建</router-link>
        </el-button>
    </div>
    <!-- search end -->

    <!-- table start -->
    <div class="eltable">
      <el-table
      :data="hotelbase"
      border stripe
      :default-sort = "{prop: 'id', order: 'descending'}"
      style="width: 100%">
        <el-table-column prop="id" label="酒店ID" sortable></el-table-column>
        <el-table-column prop="HotelName" label="酒店名称"></el-table-column>
        <el-table-column prop="HotelName_En" label="英文名称"></el-table-column>
        <el-table-column prop="FrontPhone" label="前台电话"></el-table-column>
        <el-table-column prop="Address" label="地址"></el-table-column>
        <el-table-column prop="Star" label="星级"></el-table-column>
        <el-table-column prop="PersonName" label="采购人"></el-table-column>
        <el-table-column prop="PurchasingName" label="政策负责人"></el-table-column>
        <el-table-column prop="PayMode" label="结款"></el-table-column>
        <el-table-column :context="_self" inline-template label="操作" width="150">
          <div>
            <!-- <el-button type="primary">
              <router-link :to="{path: '/HotelBaseEdit/id', params: { id: this.id }}">编辑</router-link>
            </el-button> -->
            <el-button size="small" @click="hotelbaseEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="hotelbaseDelete($index, row)">删除</el-button>
          </div>
        </el-table-column>        
      </el-table>
    </div>
    <!-- table end -->

    <!-- pagination start  -->
      <div class="pagination-wrapper">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          :total="300">
        </el-pagination>
        
      </div>
    <!-- pagination end  -->

    <!-- edit dialog start -->
    <el-dialog title="编辑酒店信息" v-model="editDialog" size="full">
      <el-form ref="editFrom" :model="editForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="酒店ID">
                <el-input v-model="editForm.id" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="酒店名称">
                <el-input v-model="editForm.HotelName"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="酒店英文名称">
                <el-input v-model="editForm.HotelName_En"></el-input>
              </el-form-item>
            </div>
          </el-col>  
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="星级" prop="Star">
                <el-select v-model="editForm.Star" clearable placeholder="请选择酒店星级">
                  <el-option v-for="item in StarOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>    
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="前台电话">
                <el-input v-model="editForm.FrontPhone"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="地址">
                <el-input v-model="editForm.Address"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-form-item label="结款" prop="PayMode">
                <el-select v-model="editForm.PayMode" clearable placeholder="请选择结款账户" >
                  <el-option v-for="item in PayModeOptions" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-col>    
          <el-col :span="7">
            <div class="grid-content bg-purple">
              <el-form-item label="采购人">
                <el-input v-model="editForm.PersonName"></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-form-item label="政策负责人">
                <el-input v-model="editForm.PurchasingName"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <el-form-item label="备注">
                <el-input type="textarea" v-model="editForm.Remark"></el-input>
              </el-form-item>
            </div>
          </el-col>    
        </el-row>
        <span style="margin-left:100px">
          <el-button type="primary" @click="hotelbaseEditSave()">确 定</el-button>
          <el-button @click="editDialog = false">取 消</el-button>
        </span>
      </el-form>
      <div class="dialog-footer" style="margin-top:50px">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="政策信息" name="first">政策信息</el-tab-pane>
          <el-tab-pane label="房型信息" name="second">房型信息</el-tab-pane>
          <el-tab-pane label="价格信息" name="third">价格信息</el-tab-pane>
          <el-tab-pane label="平台映射" name="fourth">平台映射
            <HotelPlatformInfo></HotelPlatformInfo>
          </el-tab-pane>
        </el-tabs>
      </div>
  </el-tabs>
    </el-dialog>
    <!-- edit dialog end -->

  </div>
</template>

<script>
import {
  hotelApi,
} from 'api';
import HotelPlatformInfo from  '../hotel-platform/HotelPlatformInfo'

  export default {
    data() {
      return {
        activeName: 'first',        
        hotelbase: [],
        page: 0,
        editDialog:false,
        editForm: {
          id: '',
          HotelName: '',
          HotelName_En: '',
          FrontPhone: '',
          Address: '',
          Star: '',
          PersonName: '',
          PurchasingName: '',
          PayMode: ''
        },
        filters: {
          id: '',
          HotelName: '',
          HotelName_En: '',
          labelVal: '1'
        },
        selectedOptions: [{
          value: '1',
          label: '酒店ID'
          }, {
          value: '2',
          label: '酒店名称'
        }, {
          value: '3',
          label: '酒店英文名称'
        }],
        StarOptions: [{
          value: '一星级',
          label: '一星级'
        },{
          value: '二星级',
          label: '二星级'
        },{
          value: '三星级',
          label: '三星级'
        },{
          value: '四星级',
          label: '四星级'
        },{
          value: '五星级',
          label: '五星级'
        },{
          value: '六星级',
          label: '六星级'
        }],
        PayModeOptions: [{
          value: '惠和账户',
          label: '惠和账户'
        },{
          value: '惠和支付宝',
          label: '惠和支付宝'
        },{
          value: '澳迅',
          label: '澳迅'
        },{
          value: '鸿源迅达',
          label: '鸿源迅达'
        },{
          value: '济南美票',
          label: '济南美票'
        }]
      }
    },
    components: {
          HotelPlatformInfo
    },
    created() {
      this.getHotelbaseList();
      console.log('getHotelbaseListcreated')
    },
    methods: {
      hotelbaseSearch() {
        this.getHotelbaseList();
        console.log('hotelbaseSearch')
      },
      async getHotelbaseList(page) {
        this.page = page || this.page;
          let options = {
                page: this.page,
                id: this.filters.labelVal === '1' ? parseInt(this.filters.id, 10) : null,
                HotelName: this.filters.labelVal === '2' ? this.filters.HotelName : null,
                HotelName_En: this.filters.labelVal === '3' ? this.filters.HotelName_En : null

        };
        await hotelApi.fetchHotelbaseList(options).then(data => {
          let { code, hotelbase_list } = data;
          if (code === 200) {
            this.hotelbase = hotelbase_list;
          }
        });
        console.log('getHotelbaseList')
      },
      handleCurrentChange(val) {
        this.getHotelbaseList(val);
      },      
      async hotelbaseEditSave() {
            try {
                await hotelApi.editHotelbase(this.editForm)
                this.getHotelbaseList();
                this.editDialog = false;
                this.$message({
                    message: '编辑成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e)
            }
      },
      hotelbaseEdit($index, row) {
            this.editForm.id = row.id;
            this.editForm.HotelName = row.HotelName;
            this.editForm.HotelName_En = row.HotelName_En;
            this.editForm.FrontPhone = row.FrontPhone;
            this.editForm.Address = row.Address;
            this.editForm.Star = row.Star;
            this.editForm.id = row.id;
            this.editForm.PersonName = row.PersonName;
            this.editForm.PurchasingName = row.PurchasingName;
            this.editForm.PayMode = row.PayMode;
            this.editDialog = true;
      },
      async hotelbaseDelete($index, row) {
            try {
                await this.$confirm('是否删除此条信息?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                await hotelApi.removeHotelbase({
                    id: row.id
                }) 
                this.getHotelbaseList();
                this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            } catch (e) {
                console.error(e);
            }
      },
    }
  }
</script>

<style lang="scss">
#HotelBasePage {

  .eltable {
    margin: 20px 0 0 0 
  }

  .filters {
    margin: 20px 0 0 0;
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