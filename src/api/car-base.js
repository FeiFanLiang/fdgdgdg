import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/Car/'

const listFields = [
  { label: '车型', name: 'CarMode', is: true },
  { label: '车牌号', name: 'CarNumber', is: true },
  { label: '运营城市', name: 'OperationCity', is: true },
  { label: '座位数', name: 'SeatNum', is: true },
  { label: '最大载客数', name: 'SeatingNum', is: true },
  { label: '行李数', name: 'LuggageNum', is: true },
  { label: '备注', name: 'Remark', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listByQuery (params) {
    return axios.get(base + 'list', { params: params })
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  },
  del (id) {
    return axios.delete(base + id)
  }
}
