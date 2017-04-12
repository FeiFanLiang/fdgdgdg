import Mock from 'mockjs';
const API = {
    listByPArea() {},
    listByQuery() {},
    listByQue() {},
    listById() {},
}
export default {
    bootstrap(mock) {
        let mock = new MockAdapter(axios);
        mock.onGet('/Hotel/HotelArea/pid/{PArea}').reply(API.listByPArea);
        mock.onGet('/Hotel/HotelArea/query').reply(API.listByQuery);
        mock.onGet('/Hotel/HotelArea/query/{que}').reply(API.listByQue);
        mock.onGet('/Hotel/HotelArea/{id}').reply(API.listById);
    }
}
