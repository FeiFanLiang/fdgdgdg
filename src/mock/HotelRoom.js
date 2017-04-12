DELETE /Hotel/HotelRoom/{id}
GET /Hotel/HotelRoom/{id}
PUT /Hotel/HotelRoom/{id}
GET /Hotel/HotelRoom/Pid/{pid}
POST /Hotel/HotelRoom
import Mock from 'mockjs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const API = {
    getPArea() {},
    getQue() {},
    getQuery() {},
    getId() {}
}
export default {
    bootstrap() {
        let mock = new MockAdapter(axios);
        mock.onGet('/Hotel/HotelArea/pid/{PArea}').reply(API.getPArea);
        mock.onGet('/Hotel/HotelArea/pid/{que}').reply(API.getQue);
        mock.onGet('/Hotel/HotelArea/query').reply(API.getQuery);
        mock.onGet('/Hotel/HotelArea/{id}').reply(API.getId);
    }
}
