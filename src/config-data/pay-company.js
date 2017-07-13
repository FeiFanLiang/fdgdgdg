import lib from './lib'
import { payCompanyApi } from 'api'

const listData = [
  ['账户名称', 'AccountName', true, true, 'string'],
  ['银行帐户', 'AccountNum', true, true, 'string'],
  ['备注', 'Remark', true, true, 'string'],
  ['ID', 'ID', false, false, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: payCompanyApi.edit
    }
  }
}