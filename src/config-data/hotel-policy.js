import lib from './lib'
import { hotelPolicyApi } from 'api'

const data = [
  ['ID', 'ID', true, false, 'string'],
  ['政策负责人', 'PersonName', true, true, 'string'],
  ['政策采购人', 'PurchasingName', true, true, 'string'],
  ['酒店联系人', 'LinkMan', true, true, 'string'],
  ['酒店联系电话', 'PhoneNum', true, true, 'string'],
  ['保密类型', 'SecretType.SecretName', true, true, 'string'],
  ['酒店预订方式', 'ReserveMode.ModeName', true, true, 'string']
]

const listFields = lib.trans(data)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPolicyApi.edit
    }
  }
}
