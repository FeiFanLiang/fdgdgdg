import axios from 'axios'
import path from './api'
export default {
  getList (params) {
    return axios.get(path.apiBaseUrl + 'Hotel/Order/All', { params: params })
  },
  getDetail (id) {
    return axios.get(path.apiBaseUrl + `Hotel/Order/${id}`)
  },
  editInfo (id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/Order/${id}`, params)
  }
}
