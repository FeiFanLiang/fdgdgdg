import lib from './lib'
import { bargainsRoomApi } from 'api'

const listData = [
  ['ID', 'ID', true, true, 'string'],
  ['入住日期', 'UseDate', true, true, 'string'],
  ['入住天数', 'Days', true, true, 'string'],
  ['网站最低价', 'WebLowestPrice', true, true, 'string'],
  ['售卖价格', 'Price', true, true, 'string'],
  ['卖点标签', 'Label', true, true, 'string'],
  ['退改规则', 'CancleReason', true, true, 'string'],
  ['已售出', 'IsSolded', true, true, 'string'],
  ['购买人手机号', 'BuyUserPhone', true, true, 'string'],
  ['创建人', 'CreateUser', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: bargainsRoomApi.edit
    }
  }
}
