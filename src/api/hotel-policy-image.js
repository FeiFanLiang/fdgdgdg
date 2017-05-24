import axios from 'axios';
import path from './api';
export default {
  detailsById(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPolicyImage/${id}`);
  },
  listByPid(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPolicyImage/Pid/${id}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPolicyImage', params);
  },
  remove(id) {
    return axios.delete(
      path.apiBaseUrl + `Hotel/HotelPolicyImage/${id}`
    );
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelPolicyImage/${id}`, params);
  }
};
