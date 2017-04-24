import axios from 'axios';
import path from './api';
export default {
    getList(id) {
        return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/hotel/${id}`);
    },
    addInfo(params) {
      console.log(params)
        return axios.post(path.apiBaseUrl + `Hotel/HotelPlatform`, params);
    },
    remove(id) {
        return axios.delete(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
    },
    edit(id, params) {
        return axios.put(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`, params);
    }
}
