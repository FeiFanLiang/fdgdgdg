<template lang="html">
<div id="imagesInfo">

    <!-- breadcrumb start  -->
    <db-breadcrumb></db-breadcrumb>
    <!-- breadcrumb end  -->

    <!-- filters start -->
      <div class="filters">
        <div class="filter">
          酒店名称：<el-input placeholder="请输入酒店名称" v-model="hotelName"></el-input>
          添加日期：
            <el-date-picker
                v-model="date1"
                align="right"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
            --
            <el-date-picker
                v-model="date2"
                align="right"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
        </div>
        <el-button type="primary" @click="imagesSearch">搜索</el-button>
        <el-button type="primary">
            <router-link :to="{path: 'imagesInfoAdd'}">新增截图信息</router-link>
        </el-button>
      </div>
      <!-- filters end -->

      <!-- table start -->
      <el-table
        :data="imagesInfo"
        border
        stripe
        style="width: 100%">
        <el-table-column prop="hotelName" label="酒店名称"></el-table-column>
        <el-table-column   label="截图信息">

            <template scope="scope">
              <!--<router-link id="look" @click="imagesInfos(scope.$index, scope.row)">点击查看</router-link>-->
              <router-link id="look" :to="{name: 'imagesInfoList',params: { id: scope.row.id }}">点击查看</router-link>
             </template>
        </el-table-column>
        <el-table-column prop="uploadDate" label="上传日期"></el-table-column>
        <el-table-column prop="upPersonName" label="上传人"></el-table-column>
        <el-table-column  label="操作">
            <template scope="scope">
              <el-button size="mini" type="primary" @click="imagesInfoEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="imagesInfoDelete(scope.$index, scope.row)">删除</el-button>
              </template>
        </el-table-column>
      </el-table>
      <!-- table end -->

      <!-- pagination start  -->
      <div class="pagination-wrapper" style="align=center">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="10">
        </el-pagination>
      </div>
    <!-- pagination end  -->

</div>
</template>

<script>
import { imagesInfoApi } from 'api';
export default {
  data() {
    return {
      id: 1,
      page: 0,
      imagesInfo: [
        {
          id: 1,
          hotelName: 'aaa',
          uploadDate: '11.21',
          upPersonName: 'cdd'
        }
      ],
      hotelName: '',
      date1: '',
      date2: ''
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData(page) {
      this.page = page || this.page;
      let options = {
        id: this.id,
        page: this.page,
        hotelName: this.hotelName,
        date1: this.date1,
        date2: this.date2
      };
      await imagesInfoApi.fetchImages(options).then(data => {
        let { code, imagesInfo_list } = data;
        if (code === 200) {
          this.imagesInfo = imagesInfo_list;
        }
      });
    },
    handleCurrentChange(val) {
      this.fetchData(val);
    },
    imagesSearch() {
      this.fetchData();
    },
    async imagesInfoDelete($index, row) {
      try {
        await this.$confirm('是否删除此条信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });
        await imagesInfoApi.removeImages({
          id: row.id
        });
        this.fetchData();
        this.$message({
          message: '删除成功',
          type: 'success'
        });
      } catch (e) {
        console.error(e);
      }
    },
    imagesInfoEdit($index, row) {
      this.$router.push({
        name: 'imagesInfoEdit',
        params: { id: row.id }
      });
    }
  }
};
</script>

<style lang="scss">
#imagesInfo {

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
            el-date-picker {
                display: inline-block;
                margin-left: 15px;
            }
        }

        .el-input {
            width: 150px;
            display: inline-block;
        }
    }

    .pagination-wrapper {
        text-align: center;
        padding: 30px;
    }

    #look {
      color: dodgerblue;
      &:hover {
        color: orange;
        text-decoration: underline;
      }
    }

}
</style>
