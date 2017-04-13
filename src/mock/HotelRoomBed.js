import Mock from 'mockjs';
const API = {
    list() {},
    details() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelRoomBed').reply(API.list);
        mock.onGet('/Hotel/HotelRoomBed/{id}').reply(API.details);
        mock.onPost('/Hotel/HotelRoomBed').reply(API.add);
        mock.onPut('/Hotel/HotelRoomBed/{id}').reply(API.edit);
        mock.onPost('/Hotel/HotelRoomBed/{id}').reply(API.remove);
    }
}
