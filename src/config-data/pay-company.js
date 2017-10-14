import lib from './lib'
import { payCompanyApi } from 'api'

const listData = [
  ['账户名称', 'AccountName', true, true, 'string'],
  ['简称', 'ShortName', true, true, 'string'],
  ['序号', 'SortNo', true, true, 'string'],
  // ['状态', 'State', true, true, 'string'], // 0 废除 1 正常
  ['公司', 'Company', true, true, 'string'],
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
