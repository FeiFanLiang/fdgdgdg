import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/Advancement/'
const base2 = path.apiBaseUrl + 'Hotel/AdvancementDetail/'

export default {
  list (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  detail(params) {
    return axios.get(base2 + 'list', {
      params: params
    })
  },
  add(params) {
    return axios.post(base2 + 'Add',params)
  },
}
