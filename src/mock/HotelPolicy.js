import Mock from 'mockjs';
const API = {
    detailsById() {},
    detailsByPid() {},
    detailsByHotelid() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelPolicy/{id}').reply(API.detailsById);
        mock.onGet('/Hotel/HotelPolicy/Pid/{pid}').reply(API.detailsByPid);
        mock.onGet('/Hotel/HotelPolicy/Hotelid/{hotelid}').reply(API.detailsByHotelid);
        mock.onPost('/Hotel/HotelPolicy').reply(API.add);
        mock.onPut('/Hotel/HotelPolicy/{id}').reply(API.edit);
        mock.onPost('/Hotel/HotelPolicy/{id}').reply(API.remove);
    }
}
