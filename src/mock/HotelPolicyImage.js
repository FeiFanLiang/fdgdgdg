DELETE /Hotel/HotelPolicyImage/{id}
GET /Hotel/HotelPolicyImage/{id}
PUT /Hotel/HotelPolicyImage/{id}
GET /Hotel/HotelPolicyImage/Pid/{pid}
POST /Hotel/HotelPolicyImage
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
        mock.onGet('/Values').reply(API.list);
        mock.onGet('/Values/{id}').reply(API.details);
        mock.onPost('/Values').reply(API.add);
        mock.onPut('/Values/{id}').reply(API.edit);
        mock.onPost('/Values/{id}').reply(API.remove);
    }
}
