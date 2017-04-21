import axios from 'axios';
import path from './api';
export default {
  detailById(id) {
    return axios.get(path.apiBaseUrl + `Hotel/SonRoomPlatformControll/${id}`);
  },
  detailRoomById(id) {
    return axios.get(
      path.apiBaseUrl + `Hotel/SonRoomPlatformControll/Room/${id}`
    );
  },
  detailSonRoomById(id) {
    return axios.get(
      path.apiBaseUrl + `Hotel/SonRoomPlatformControll/SonRoom/${id}`
    );
  },
  detailHotelById(id) {
    return axios.get(
      path.apiBaseUrl + `Hotel/SonRoomPlatformControll/Hotel/${id}`
    );
  },
  add(params) {
    return axios.post(
      path.apiBaseUrl + 'Hotel/SonRoomPlatformControll',
      params
    );
  },
  remove(id) {
    return axios.delete(
      path.apiBaseUrl + `Hotel/SonRoomPlatformControll/${id}`
    );
  },
  edit(id, params) {
    return axios.put(
      path.apiBaseUrl + `Hotel/SonRoomPlatformControll/${id}`,
      params
    );
  }
};
