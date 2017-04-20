import axios from 'axios';
import path from './api';
export default {
  listAll(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelPlatform/all', {params  : params});
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPlatform/add');
  },
  remove(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPlatform/remove/${id}`);
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelPlatform/edit/${id}`, params);
  }
}