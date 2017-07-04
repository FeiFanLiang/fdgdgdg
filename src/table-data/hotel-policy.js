// const listFields = [
//    'ID',  'ID',  true ],
//    '政策负责人',  'PersonName',  true ],
//    '政策采购人',  'PurchasingName',  true ],
//    '酒店联系人',  'LinkMan',  true ],
//    '酒店联系电话',  'PhoneNum',  true ],
//    '保密类型',  'SecretType.SecretName',  true ],
//    '酒店预订方式',  'ReserveMode.ModeName',  true ]
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
