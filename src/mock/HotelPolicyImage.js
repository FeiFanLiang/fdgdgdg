
import Mock from 'mockjs';
const API = {
    detailsById() {},
    detailsByPid() {},
    add() {},
    edit() {},
    remove() {}
}
export default {
    bootstrap(mock) {
        mock.onGet('/Hotel/HotelPolicyImage/{id}').reply(API.detailsById);
        mock.onGet('/Hotel/HotelPolicyImage/Pid/{id}').reply(API.detailsByPid);
        mock.onPost('/Hotel/HotelPolicyImage').reply(API.add);
        mock.onPut('/Hotel/HotelPolicyImage/{id}').reply(API.edit);
        mock.onPost('/Hotel/HotelPolicyImage/{id}').reply(API.remove);
    }
}
