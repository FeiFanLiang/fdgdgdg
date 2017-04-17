import axios from 'axios';
let base = '';

export default {

    fetchPlatformList(params) {
        return axios.get(`${base}/Hotel/HotelThreePlatInfo/all`, {params: params}).then(res => res.data);
    },
    addPlatform(params) {
        return axios.post(`${base}/Hotel/HotelThreePlatInfo/add`, params).then(res => res.data);
    },
    editPlatform(params) {
        return axios.put(`${base}/Hotel/HotelThreePlatInfo/edit`, params).then(res => res.data);
    },
    removePlatform(params) {
        return axios.post(`${base}/Hotel/HotelThreePlatInfo/remove`, params).then(res => res.data);
    },
    fetchHotelbaseList(params) {
        return axios.get(`${base}/Hotel/HotelBase/All`, {params: params}).then(res => res.data);
    },
    addHotelBase(params) {
        return axios.post(`${base}/Hotel/HotelBase/add`, params).then(res => res.data);
    },
    
};