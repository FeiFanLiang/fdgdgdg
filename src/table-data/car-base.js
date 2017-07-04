// const listFields = [
//    '车型',  'CarMode',  true, isEditable: true ],
//    '车牌号',  'CarNumber',  true, isEditable: true ],
//    '运营城市',  'OperationCity',  true, isEditable: true ],
//    '座位数',  'SeatNum',  true, isEditable: true ],
//    '最大载客数',  'SeatingNum',  true, isEditable: true ],
//    '行李数',  'LuggageNum',  true, isEditable: true ],
//    '备注',  'Remark',  true, isEditable: true ]
// ]
import lib from './lib'
import { hotelPayModeApi } from 'api'

const data = [
  ['账户名称', 'ModeName', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string'],
  ['ID', 'ID', true, false, 'string']
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
