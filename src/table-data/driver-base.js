import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/Driver/'

const listFields = [
  { label: 'ID', name: 'ID', is: true },
  { label: '工号', name: 'JobNnumber', is: true },
  { label: '姓名', name: 'Name', is: true },
  { label: '电话', name: 'Phone', is: true },
  { label: '备注', name: 'Remark', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  detail (id) {
    return axios.get(base + id)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (id, params) {
    return axios.put(base, params)
  },
  del (id) {
    return axios.delete(base + id)
  }
}
