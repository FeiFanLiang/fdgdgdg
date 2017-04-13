import Mock from 'mockjs';
const API = {
    list() {},
    add() {},
    edit() {},
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelThreePlatInfo').reply(API.list);
        mock.onPost('/Hotel/HotelThreePlatInfo').reply(API.add);
        mock.onPut('/Hotel/HotelThreePlatInfo').reply(API.edit);
    }
}
