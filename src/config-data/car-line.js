import lib from './lib'
import { carLineApi } from 'api'

const listData = [
  ['名称', 'Name', true, true, 'string'],
  ['描述', 'Description', true, true, 'string'],
  ['全程用时', 'TotalTime', true, true, 'TimeSpan']
]
const searchData = [
  ['请输入线路名称', 'Name', 'input', '']
]
const listFields = lib.transTable(listData)
const searchFields = lib.transSearch(searchData)

export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: carLineApi.edit
    }
  }
}
