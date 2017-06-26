import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicy/'

const listFields = [
  { label: 'ID', name: 'ID', is: true },
  { label: '政策负责人', name: 'PersonName', is: true },
  { label: '政策采购人', name: 'PurchasingName', is: true },
  { label: '酒店联系人', name: 'LinkMan', is: true },
  { label: '酒店联系电话', name: 'PhoneNum', is: true },
  { label: '保密类型', name: 'SecretType.SecretName', is: true },
  { label: '酒店预订方式', name: 'ReserveMode.ModeName', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listByID (id) {
    return axios.get(base + id)
  },
  listByHotelID (hotelid) {
    return axios.get(base + `Hotel/${hotelid}`)
  },
  add (params) {
    return axios.post(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  },
  edit (params) {
    return axios.put(base + params.ID, params)
  }
}
