import axios from 'axios'
import path from './api'

const base = path.apiBaseUrl + 'Hotel/HotelBase/'
const listFields = [
  { label: '酒店名称', name: 'HotelName', is: true, isEditable: true },
  { label: '英文名称', name: 'HotelName_En', is: true, isEditable: true },
  { label: '前台电话', name: 'FrontPhone', is: true, isEditable: true },
  { label: '地址', name: 'Address', is: true, isEditable: true },
  { label: '星级', name: 'Star.StarName', is: true, isEditable: false },
  { label: '采购人', name: 'Policys.PersonName', is: true, isEditable: true },
  {
    label: '政策负责人',
    name: 'Policys.PurchasingName',
    is: true,
    isEditable: true
  },
  { label: '结款', name: 'Policys.PayMode.ModeName', is: true, isEditable: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields, editMethod: this.edit }
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
  edit (params) {
    return axios.put(base + params.id, params)
  }
}
