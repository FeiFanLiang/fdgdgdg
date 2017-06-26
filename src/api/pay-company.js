import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/PayCompany/'
const listFields = [
  { label: '账户名称', name: 'AccountName', is: true },
  { label: '银行帐户', name: 'AccountNum', is: true },
  { label: '备注', name: 'Remark', is: true },
  { label: 'ID', name: 'ID', is: true }
]
const searchFields = {}
export default {
  getConfig () {
    return { listFields, searchFields }
  },
  list (params) {
    return axios.get(base + `All`, params)
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
