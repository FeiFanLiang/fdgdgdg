import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Utility/Issue/'

export default {
  async listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  async detail(id) {
    return axios.get(base + id)
  },
  async add(params) {
    return axios.post(base, params)
  },
  async edit(id,params) {
    return axios.put(base + id,params)
  },
  async states(params) {
    return axios.post(base+'SetState',params)
  },
  async del(id) {
    return axios.delete(base + id)
  },
  async downloadList(params) {
    return axios.get(base + 'DownloadList', {
      params: params
    })
  }
}
