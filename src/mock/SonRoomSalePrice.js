import Mock from 'mockjs';
const API = {
    detailsById() {},
    detailsBySonRoomID() {},
    detailsByThreePlatId() {},
    add() {},
    edit() {},
}
export default {
    bootstrap(mock) {
        mock.onGet('/SonRoomSalePrice/{id}').reply(API.detailsById);
        mock.onGet('/SonRoomSalePrice/{SonRoomID}').reply(API.detailsBySonRoomID);
        mock.onGet('/SonRoomSalePrice/{ThreePlatId}').reply(API.detailsByThreePlatId);
        mock.onPost('/SonRoomSalePrice').reply(API.add);
        mock.onPut('/SonRoomSalePrice').reply(API.edit);
    }
}
