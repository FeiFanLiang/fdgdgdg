import Mock from 'mockjs';
const API = {
    list() {},
}
export default {
    bootstrap(mock) {
        mock.onGet('/System/Menu').reply(API.list)
    }
}
