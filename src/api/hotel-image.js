import axios from 'axios';
import path from './api';

export default {
  listByHotelId(HotelID) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelImage/${HotelID}`);
  },
  listByRoomId(RoomID) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelImage/${RoomID}`);
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/HotelImage', params);
  },
  edit(params) {
    return axios.put(path.apiBaseUrl + 'Hotel/HotelImage', params);
  },
  remove(imgID) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelImage/${imgID}`);
  }
};
