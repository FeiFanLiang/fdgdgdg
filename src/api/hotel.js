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
    editHotelbase(params) {
        return axios.put(`${base}/Hotel/HotelBase/edit/{id}`, params).then(res => res.data);
    },
    removeHotelbase(params) {
        return axios.post(`${base}/Hotel/HotelBase/remove/{id}`, params).then(res => res.data);
    },
    fetchPlatforminfoList(params) {
        return axios.get(`${base}/Hotel/HotelPlatform/all`, {params: params}).then(res => res.data);
    },
    addPlatforminfo(params) {
        return axios.post(`${base}/Hotel/HotelPlatform/add`, params).then(res => res.data);
    },
    editPlatforminfo(params) {
        return axios.put(`${base}/Hotel/HotelPlatform/edit/{id}`, params).then(res => res.data);
    },
    removePlatforminfo(params) {
        return axios.post(`${base}/Hotel/HotelPlatform/remove`, params).then(res => res.data);
    },
    fetchHotelroomList(params) {
        return axios.get(`${base}/Hotel/HotelRoom/all`, {params: params}).then(res => res.data);
    },
    addHotelroom(params) {
        return axios.post(`${base}/Hotel/HotelRoom/add`, params).then(res => res.data);
    },
    editHotelroom(params) {
        return axios.put(`${base}/Hotel/HotelRoom/edit/{id}`, params).then(res => res.data);
    },
    removeHotelroom(params) {
        return axios.post(`${base}/Hotel/HotelRoom/remove/{id}`, params).then(res => res.data);
    },
    fetchHotelpolicyList(params) {
        return axios.get(`${base}/Hotel/HotelPolicy/all`, {params: params}).then(res => res.data);
    },
    addHotelpolicy(params) {
        return axios.post(`${base}/Hotel/HotelPolicy/add`, params).then(res => res.data);
    },
    editHotelpolicy(params) {
        return axios.put(`${base}/Hotel/HotelPolicy/edit/{id}`, params).then(res => res.data);
    },
    removeHotelpolicy(params) {
        return axios.post(`${base}/Hotel/HotelPolicy/remove/{id}`, params).then(res => res.data);
    },

};