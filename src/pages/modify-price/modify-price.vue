<template lang="html">
<div class="modify-price">
  <el-button @click="chooseHotelPop">选择酒店</el-button>
  <el-date-picker
     v-model="chosenDateRange"
     type="daterange"
     align="right"
     placeholder="选择日期范围"
     :picker-options="pickerOptions">
   </el-date-picker>
   <el-dialog title="选择酒店" :visible.sync="dialogChooseHotelVisible" >

    <el-transfer
      v-model="value3"
      filterable
      filter-placeholder="请输入酒店名称"
      :filter-method="filterMethod"
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['未选择的酒店', '已选择的酒店']"
      :button-texts="['取消', '选择']"
      :footer-format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="data">

      <el-button class="transfer-footer" slot="right-footer" size="small" type="primary" @click="chooseHotel">确定</el-button>
    </el-transfer>


</el-dialog>
<el-table
    ref="multipleTable"
    :data="tableData3"
    border
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="日期"
      width="120">
      <template scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
</div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = []
      for (let i = 1; i <= 25; i++) {
        data.push({
          key: i,
          label: `${i}酒店`,
          disabled: i % 4 === 0
        })
      }
      return data
    }
    return {
      chosenHotels: [],
      data: generateData(),
      value3: [1],
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        )
      },
      dialogChooseHotelVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      chosenDateRange: '',
      tableData3: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: []
    }
  },
  methods: {
    chooseHotelPop() {
      this.dialogChooseHotelVisible = true
    },
    filterMethod(ietm) {
      console.log(ietm)
      return true
    },
    handleChange(value, direction, movedKeys) {
      this.chosenHotels = value
      console.log(value, direction, movedKeys)
    },
    chooseHotel() {
      console.log(this.chosenHotels)
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" >
.modify-price{

  .el-transfer{
    text-align: center;
  }
  .el-transfer-panel__item .el-checkbox__label{
    text-align: left;
  }
  .el-transfer-panel .el-transfer-panel__footer{
    text-align: left;
  }
  .el-transfer-panel__body{
    height: 500px!important;
  }
  .el-transfer-panel__list.is-filterable{
    height: 470px!important;
  }
  .el-transfer-panel{
    width: 300px!important;
  }
}


</style>
