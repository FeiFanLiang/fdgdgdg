import axios from 'axios';
import path from './api';
export default {
  list(pid) {
    // 根据酒店id获取房间列表
    return axios.get(path.apiBaseUrl + `Hotel/HotelRoom/Hotel/${pid}`);
  },
  details(id) {
    // 根据房间id获取详情
    return axios.get(path.apiBaseUrl + `Hotel/HotelRoom/${id}`);
  },
  add(params) {
    // {
    // "HotelID": 3,
    //   "RoomName": "string",酒店名称
    //   "RoomCode": "string",酒店code
    //   "RoomCount": 0,房间类型数量
    //   "Remark": "string"备注
    // }

    return axios.post(path.apiBaseUrl + 'Hotel/HotelRoom', params);
  },
  del(id) {
    return axios.delete(path.apiBaseUrl + `Hotel/HotelRoom/${id}`);
  },
  edit(id, params) {
    return axios.put(path.apiBaseUrl + `Hotel/HotelRoom/${id}`, params);
  }
};
