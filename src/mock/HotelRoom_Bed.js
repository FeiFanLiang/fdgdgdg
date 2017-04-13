import Mock from 'mockjs'
const API = {
    details() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelRoom_Bed/{roomid}').reply(API.details)
    }
}
