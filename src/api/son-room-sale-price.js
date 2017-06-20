// GET /Hotel/SonRoomSalePrice/{id}
// GET /Hotel/SonRoomSalePrice/SonRoom/{SonRoomID}
// GET /Hotel/SonRoomSalePrice/Room/{SonRoomID}
// GET /Hotel/SonRoomSalePrice/ThreePlat/{ThreePlatId}
// POST /Hotel/SonRoomSalePrice
// PUT /Hotel/SonRoomSalePrice
import axios from 'axios';
import path from './api';
export default {
  listAll(params) {
    return axios.get(path.apiBaseUrl + 'Hotel/SonRoomSalePrice/all', {
      params: params
    });
  },
  add(params) {
    return axios.post(path.apiBaseUrl + 'Hotel/SonRoomSalePrice/add');
  },
  del(id) {
    return axios.delete(
      path.apiBaseUrl + `Hotel/SonRoomSalePrice/remove/${id}`
    );
  },
  edit(id, params) {
    return axios.put(
      path.apiBaseUrl + `Hotel/SonRoomSalePrice/edit/${id}`,
      params
    );
  }
};
