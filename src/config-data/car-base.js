import lib from './lib'
import { carBaseApi } from 'api'

const listData = [
  ['车型', 'CarMode', true, true, 'string'],
  ['车牌号', 'CarNumber', true, true, 'string'],
  ['运营城市', 'OperationCity', true, true, 'string'],
  ['座位数', 'SeatNum', true, true, 'string'],
  ['最大载客数', 'SeatingNum', true, true, 'string'],
  ['行李数', 'LuggageNum', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string']
]
const searchData = [
  [
    '车辆分类',
    'carClassify',
    'select',
    [
      {
        value: 0,
        label: '经济型'
      },
      {
        value: 1,
        label: '舒适型'
      },
      {
        value: 2,
        label: '商务型'
      },
      {
        value: 3,
        label: '豪华型'
      }
    ]
  ],
  ['请输入车型', 'carMode', 'input', ''],
  ['包含已删除车辆', 'isdelete', 'checkbox', true]
]
const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)

export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: carBaseApi.edit
    }
  }
}
