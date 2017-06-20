// 房间类型的增删改查
import axios from 'axios';
import path from './api';
export default {
  list(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelRoomBed', {
      params: params
    });
  },
  details(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelRoomBed/${id}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelRoomBed', params);
  },
  del(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelRoomBed/${id}`);
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelRoomBed/${id}`, params);
  }
};
