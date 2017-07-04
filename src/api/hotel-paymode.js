import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPayMode/'
const listFields = [
  { label: '账户名称', name: 'ModeName', is: true, isEditable: true },
  { label: '备注', name: 'Remark', is: true, isEditable: true },
  { label: 'ID', name: 'ID', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields, editMethod: this.edit }
  },
  list (params) {
    return axios.get(base + 'All')
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (params) {
    return axios.put(base + params.id, params)
  },
  del (id) {
    return axios.delete(base + id)
  }
}
