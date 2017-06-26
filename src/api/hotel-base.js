import axios from 'axios'
import path from './api'

const base = path.apiBaseUrl + 'Hotel/HotelBase/'
const listFields = [
  { label: '酒店名称', name: 'HotelName', is: true },
  { label: '英文名称', name: 'HotelName_En', is: true },
  { label: '前台电话', name: 'FrontPhone', is: true },
  { label: '地址', name: 'Address', is: true },
  { label: '星级', name: 'Star.StarName', is: true },
  { label: '采购人', name: 'Policys.PersonName', is: true },
  { label: '政策负责人', name: 'Policys.PurchasingName', is: true },
  { label: '结款', name: 'Policys.PayMode.ModeName', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listAll (params = {}) {
    return axios.get(base, { params: params })
  },
  listByQuery (params) {
    return axios.get(base, { params: params })
  },
  listDefault () {
    return axios.get(base + 'default')
  },
  detailsById (id) {
    return axios.get(base + id)
  },
  detailsByHotelNum (id) {
    return axios.get(base + `HotelNum/${id}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (id, params) {
    return axios.put(base + id, params)
  }
}
