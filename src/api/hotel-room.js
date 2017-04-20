import axios from 'axios';
import path from './api';
export default {
  listAll(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelRoom/all', {params : params});
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelRoom/add');
  },
  remove(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelRoom/remove/${id}`);
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelRoom/edit/${id}`, params);
  }
}
