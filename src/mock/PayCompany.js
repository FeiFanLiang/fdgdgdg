import Mock from 'mockjs'
const API = {
    list() {},
    details() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/PayCompany/All').reply(API.list)
        mock.onGet('/Hotel/PayCompany/{id}').reply(API.details)
        mock.onPost('/Hotel/PayCompany').reply(API.add)
        mock.onPut('/Hotel/PayCompany/{id}').reply(API.edit)
        mock.onPost('/Hotel/PayCompany/{id}').reply(API.remove)
    }
}
