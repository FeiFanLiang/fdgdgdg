import axios from 'axios';
import path from './api';

export default {
  getList(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelPayMode/All');
  },
  getDetail(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`);
  },
  addInfo(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelPayMode', params);
  },
  editInfo(params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelPayMode/${params.id}`, params);
  },
  delInfo(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelPayMode/${id}`);
  }
};
