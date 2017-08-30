import lib from './lib'
import { hotelsOrderApi } from 'api'

const listData = [
  ['订单编号', 'OrderNo', true, false, 'string']
]
const searchData = [
  ['请输入酒店名称', 'Hotel', 'input', ''], 
  ['请输入城市名称', 'City', 'input', ''],
  ['请输入预约时间', 'CreateTime', 'input', ''],
]

const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields
    }
  }
}
