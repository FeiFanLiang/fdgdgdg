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
>>>>>>> a452ac6ab2790c3c16906c05121215285a0a47db
    },
    getPlatformList(platid) {
        return axios.get(path.apiBaseUrl + `Hotel/HotelPlatform/plat/${platid}`);
    }
}
