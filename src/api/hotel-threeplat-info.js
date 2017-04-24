import axios from 'axios';
import path from './api';
export default {
  getList() {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelThreePlatInfo');
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelThreePlatInfo/add', params);
  },
  remove(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelThreePlatInfo/remove/${id}`);
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelThreePlatInfo/edit/${id}`, params);
  }
}
