import axios from 'axios'
import path from './api'

const base = path.apiBaseUrl + 'Hotel/HotelGroup/'

export default {
  listAll(params = {}) {
    return axios.get(base + 'list/', {
      params: params
    })
  },
  add(params) {
    return axios.post(base, params)
  },
  del(id) {
    return axios.delete(base + id)
  },
  keep(params) {
    return axios.put(base + params.id, params)
  },
  addbase(id,params){
    return axios.get(base + `AddHotel/${id}?hotelListStr=`+params)
    
  },
  removehotel(id,params){
    return axios.get(base + `RemoveHotel/${id}?hotelListStr=`+params)
  }
}
