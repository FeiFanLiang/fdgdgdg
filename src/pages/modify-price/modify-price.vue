<template lang="html">
  <div class="modify-price">
    <el-button @click="chooseHotelPop">选择酒店</el-button>
    <el-date-picker v-model="chosenDateRange" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions">
    </el-date-picker>
    <el-dialog title="选择酒店" :visible.sync="dialogChooseHotelVisible" size="large">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-tree :data="regions" :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange">
          </el-tree>
        </el-col>
        <el-col :span="18">
          <el-transfer v-model="transferValue"  filter-placeholder="请输入酒店名称" :filter-method="filterMethod"  filterable  :render-content="renderFunc" :titles="['未选择的酒店', '已选择的酒店']" :button-texts="['取消', '选择']" :footer-format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }" @change="handleChange" :data="data">
            <el-button class="transfer-footer" slot="right-footer" size="small" type="primary" @click="chooseHotel">确定</el-button>
          </el-transfer>
        </el-col>
      </el-row>
    </el-dialog>
    <el-table ref="multipleTable" @row-click="tableRowClick" :data="tableData3" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="日期" width="120">
        <template scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
    </el-table>
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
          disabled: false
        })
      }
      return data
    }
    return {
      regions: [
        {
          name: '中国'
        },
        {
          name: '日本'
        }
      ],
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
      chosenHotels: [],
      transferValue: [],
      data: generateData(),
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
    tableRowClick(item) {
      console.log(item)
    },
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
      this.dialogChooseHotelVisible = false
      console.log(this.chosenHotels)
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate)
    },
    handleNodeClick(data) {
      console.log(data)
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: '中国' }, { name: '日本' }])
      }
      if (node.level > 3) return resolve([])

      var hasChild
      if (node.data.name === '中国') {
        hasChild = true
      } else if (node.data.name === '日本') {
        hasChild = false
      } else {
        hasChild = Math.random() > 0.5
      }

      setTimeout(() => {
        var data
        if (hasChild) {
          data = [
            {
              name: '城市' + this.count++
            },
            {
              name: '城市' + this.count++
            }
          ]
        } else {
          data = []
        }

        resolve(data)
      }, 500)
    }
  }
}
</script>

<style lang="less" >
.modify-price{

  // .el-transfer{
  //   text-align: center;
  // }
  // .el-transfer-panel__item .el-checkbox__label{
  //   text-align: left;
  // }
  // .el-transfer-panel .el-transfer-panel__footer{
  //   text-align: left;
  // }
  .el-transfer-panel__body{
    height: 500px!important;
  }
  .el-transfer-panel__list{
    height: 470px!important;
  }
  .el-transfer-panel{
    width: 400px!important;
  }
}


</style>
