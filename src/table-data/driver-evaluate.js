import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['ID', 'ID', true, true, 'string'],
  ['工号', 'Driver', true, true, 'string'],
  ['司机姓名', 'Openid', true, true, 'string'],
  ['关注人次', 'field3', true, true, 'string'],
  ['评论次数', 'field1', true, true, 'string'],
  ['总分', 'Rate', true, true, 'string']
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
