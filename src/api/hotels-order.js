import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'Hotel/HotelOrder/'
const base2 = path.apiBaseUrl + 'System/Tag/'

import { hotelsOrderApi } from '../config-data'

export default {
  getConfig: hotelsOrderApi.getConfig,
  listByQuery (params) {
    return axios.get(base + 'list', {
      params: params
    })
  },
  detail (ID) {
    return axios.get(base + ID)
  },
  add (params) {
    return axios.post(base, params)
  },
  edit (ID,params) {
    return axios.put(base + ID, params)
  },
  del (ID) {
    return axios.delete(base + ID)
  },
  getState(){
    return axios.get(base2 + 'list')
  },
  img(ID){
    return axios.post(base + 'UploadPic/' + ID,ID)
  }
}
