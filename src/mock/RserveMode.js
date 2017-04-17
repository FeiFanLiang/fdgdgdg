import Mock from 'mockjs'
const API = {
    list() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/RserveMode').reply(API.list)
    }
}
