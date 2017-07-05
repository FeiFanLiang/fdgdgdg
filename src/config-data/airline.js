import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelPolicy/'
export default {
  listAll (params) {
    return axios.get(base + 'all', {
      params: params
    })
  },
  add (params) {
    return axios.post(base + 'add')
  },
  del (id) {
    return axios.delete(base + `remove/${id}`)
  },
  edit (id, params) {
    return axios.put(base + `edit/${id}`, params)
  }
}
