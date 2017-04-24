import axios from 'axios';
import path from './api';
export default {

    getHotelList(hotelid) {
        return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/hotel/${hotelid}`);
    },
    getDetail(id) {
        return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
    },
    addInfo(params) {
        console.log(params)
        return axios.post(path.apiBaseUrl + `Hotel/HotelPlatform`, params);
    },
<<<<<<< HEAD
    remove(id) {
        return axios.delete(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
    },
    edit(id, params) {
        return axios.put(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`, params);
=======
    delInfo(id) {
        return axios.delete(path.apiBaseUrl + `Hotel/HotelPlatform/${id}`);
    },
    editInfo(params) {
        return axios.put(path.apiBaseUrl + `Hotel/HotelPlatform/${params.ID}`, params);
    },
    getPlatformList(platid) {
        return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/plat/${platid}`);
>>>>>>> 51943615a48aec885acc04ac6eb9205a0111462c
    }
}
