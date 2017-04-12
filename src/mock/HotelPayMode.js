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
        let mock = new MockAdapter(axios);
        mock.onGet('/Hotel/HotelPayMode/All').reply(API.list);
        mock.onGet('/Hotel/HotelPayMode/{id}').reply(API.details);
        mock.onPost('/Hotel/HotelPayMode').reply(API.add);
        mock.onPut('/Hotel/HotelPayMode/{id}').reply(API.edit);
        mock.onPost('/Hotel/HotelPayMode/{id}').reply(API.remove);
    }
}
