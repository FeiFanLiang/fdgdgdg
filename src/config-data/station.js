import lib from './lib'
import { stationApi } from 'api'

const listData = [
  ['名称', 'Name', true, true, 'string'],
  ['地址', 'Address', true, true, 'int'],
  ['描述', 'Description', true, true, 'string'],
  ['经度', 'StartLongitude', true, true, 'decimal'],
  ['纬度', 'StartLatitude', true, true, 'decimal']
]
const searchData = [
  ['请输入车站名称', 'Name', 'input', '']
]
const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)

export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: stationApi.edit
    }
  }
}
 