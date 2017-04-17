import Mock from 'mockjs'
const API = {
    detailsById() {},
    detailsByPid() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelRoom/{id}').reply(API.detailsById)
        mock.onGet('/Hotel/HotelRoom/Pid/{id}').reply(API.detailsByPid)
        mock.onPost('/Hotel/HotelRoom').reply(API.add)
        mock.onPut('/Hotel/HotelRoom/{id}').reply(API.edit)
        mock.onPost('/Hotel/HotelRoom/{id}').reply(API.remove)
    }
}
