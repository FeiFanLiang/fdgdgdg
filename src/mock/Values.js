import Mock from 'mockjs';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
const API = {
    list() {},
    details() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap() {
        let mock = new MockAdapter(axios);
        mock.onGet('/Values').reply(API.list);
        mock.onGet('/Values/{id}').reply(API.details);
        mock.onPost('/Values').reply(API.add);
        mock.onPut('/Values/{id}').reply(API.edit);
        mock.onPost('/Values/{id}').reply(API.remove);
    }
}
