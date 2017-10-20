import lib from './lib'
import { hotelPolicyApi } from 'api'

const listData = [
  ['ID', 'ID', true, false, 'string'],
  ['政策负责人', 'PersonName', true, true, 'string'],
  ['政策采购人', 'PurchasingName', true, true, 'string'],
  ['开户行', 'BankName', true, true, 'string'],
  ['酒店账户名', 'AccountName', true, true, 'string'],
  ['酒店账号', 'AccountNum', true, true, 'string'],
  ['财务联系人', 'FinanceLinkMan', true, true, 'string'],
  ['财务联系人电话', 'FinancePhoneNum', true, true, 'string'],
  // ['付款公司', 'PayCompanyID', true, true, 'string'],
  // ['付款方式', 'PayModeID', true, true, 'string'],
  // ['付款类型', 'PayPeriod', true, true, 'string'],
  ['酒店财务信息备注', 'FinanceRemark', true, true, 'string'],
  ['酒店联系人', 'LinkMan', true, true, 'string'],
  ['酒店联系电话', 'PhoneNum', true, true, 'string'],
  // ['保密类型', 'SecretType.SecretName', true, true, 'string'],
  // ['酒店预订方式', 'ReserveMode.ModeName', true, true, 'string'],
  // ['退改规则备注', 'Remark1', true, true, 'string'],
  // ['费用信息备注', 'Remark2', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig() {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: hotelPolicyApi.edit
    }
  }
}
