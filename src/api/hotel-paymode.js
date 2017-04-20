import axios from 'axios';
import path from './api';

export default {
  getList(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelPayMode/All', { params: params });
  },
  getDetail(id, params) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`, params);
  },
  addInfo(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPayMode', params);
  },
  editInfo(params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`, params);
  },
  delInfo(params) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`, params);
  }
};
