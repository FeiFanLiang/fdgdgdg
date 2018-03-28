import lib from './lib'
import { platStatPriceApi } from 'api'

const listData = [
  // ['价格', 'Price', true, true, 'string'],
  // ['采购人', 'Policys.PersonName', true, true, 'string'],
  // ['政策负责人', 'Policys.PurchasingName', true, true, 'string'],
  // ['结款', 'Policys.PayMode.ModeName', true, true, 'string']
]

const listFields = lib.transTable(listData)
const searchFields = {}
export default {
  getConfig () {
    return {
      listFields: listFields,
      searchFields: searchFields,
      editMethod: platStatPriceApi.edit
    }
  }
}
