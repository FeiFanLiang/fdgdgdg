import Mock from 'mockjs'
const API = {
    list() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/SecretType').reply(API.list)
    }
}
