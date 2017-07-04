import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/BargainsRoom/'

const listFields = [
  { label: 'ID', name: 'ID', is: true },
  { label: '入住日期', name: 'UseDate', is: true },
  { label: '入住天数', name: 'Days', is: true },
  { label: '网站最低价', name: 'WebLowestPrice', is: true },
  { label: '售卖价格', name: 'Price', is: true },
  { label: '卖点标签', name: 'Label', is: true },
  { label: '退改规则', name: 'CancleReason', is: true },
  { label: '已售出', name: 'IsSolded', is: true },
  { label: '购买人手机号', name: 'BuyUserPhone', is: true },
  { label: '创建人', name: 'CreateUser', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  list (params) {
    return axios.get(base, {
      params: params
    })
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base, params)
  }
}
