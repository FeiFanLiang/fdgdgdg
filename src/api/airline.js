// GET /Airline/Airline/all
// GET /Airline/Airline
// GET /Airline/Airline/query/{que}
// GET /Airline/Airline/query
// GET /Airline/Airline/{id}
import axios from 'axios'
import path from './api'
export default {
  listAll (params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelPolicy/all', {
      params: params
    })
  },
  add (params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPolicy/add')
  },
  del (id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPolicy/remove/${id}`)
  },
  edit (id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelPolicy/edit/${id}`, params)
  }
}
