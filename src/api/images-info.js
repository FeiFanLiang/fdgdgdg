import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'images/imagesInfo/'

export default {
  fetchImages (params) {
    return axios.get(base + 'all', { params: params }).then(res => res.data)
  },
  removeImages (id, params) {
    return axios.post(base + `remove/${id}`, params).then(res => res.data)
  },
  editImages (id, params) {
    return axios.put(base + `edit/${id}`, params).then(res => res.data)
  }
}
