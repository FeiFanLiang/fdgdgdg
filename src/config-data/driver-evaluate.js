import lib from './lib'
import { driverEvaluateApi } from 'api'

const listData = [
  ['ID', 'ID', true, false, 'string'],
  ['工号', 'Driver', true, false, 'string'],
  ['司机姓名', 'Openid', true, false, 'string'],
  ['关注人次', 'field3', true, false, 'string'],
  ['取消人次', 'field2', true, false, 'string'],
  ['评论次数', 'field1', true, false, 'string'],
  ['总分', 'Rate', true, false, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: driverEvaluateApi.edit
    }
  }
}
