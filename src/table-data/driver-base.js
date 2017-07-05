import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['ID', 'ID', true, true, 'string'],
  ['工号', 'JobNnumber', true, true, 'string'],
  ['姓名', 'Name', true, true, 'string'],
  ['电话', 'Phone', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPayModeApi.edit
    }
  }
}
