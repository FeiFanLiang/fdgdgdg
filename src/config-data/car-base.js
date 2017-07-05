import lib from './lib'
import { carBaseApi } from 'api'

const data = [
  ['车型', 'CarMode', true, true, 'string'],
  ['车牌号', 'CarNumber', true, true, 'string'],
  ['运营城市', 'OperationCity', true, true, 'string'],
  ['座位数', 'SeatNum', true, true, 'string'],
  ['最大载客数', 'SeatingNum', true, true, 'string'],
  ['行李数', 'LuggageNum', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: carBaseApi.edit
    }
  }
}
