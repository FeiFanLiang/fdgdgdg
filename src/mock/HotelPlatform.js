import Mock from 'mockjs';
const API = {
    detailsById() {},
    detailsByHotelid() {},
    detailsByPlatid() {},
    add() {},
    edit() {},
}
export default {
    bootstrap(mock) {
          mock.onGet('/Hotel/HotelPlatform/{id}').reply(API.detailsById);
        mock.onGet('/Hotel/HotelPlatform/hotel/{id}').reply(API.detailsByHotelid);
          mock.onGet('/Hotel/HotelPlatform//plat/{id}').reply(API.detailsByPlatid);
        mock.onPost('/Hotel/HotelPlatform').reply(API.add);
        mock.onPut('/Hotel/HotelPlatform/{id}').reply(API.edit);
    }
}
