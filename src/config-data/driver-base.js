import lib from './lib'
import { driverBaseApi } from 'api'

const listData = [
  ['ID', 'ID', true, false, 'string'],
  ['工号', 'JobNnumber', true, true, 'string'],
  ['姓名', 'Name', true, true, 'string'],
  ['电话', 'Phone', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: driverBaseApi.edit
    }
  }
}
