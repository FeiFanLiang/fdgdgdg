import axios from 'axios';
import path from './api';
export default {
  listByPArea(PArea) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelArea/pid/${PArea}`);
  },
  listByQuery(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/HotelArea/query', {
      params: params
    });
  },
  listByQue(que) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelArea/query/${que}`);
  },
  listById(id) {
    return axios.get(path.apiBaseUrl + `Hotel/HotelArea/${id}`);
  }
};
