GET /Hotel/HotelRoomBed
POST /Hotel/HotelRoomBed
DELETE /Hotel/HotelRoomBed/{id}
GET /Hotel/HotelRoomBed/{id}
PUT /Hotel/HotelRoomBed/{id}
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
