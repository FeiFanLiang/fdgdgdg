import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AccountApi from './Account';
import HotelBaseAPI from './HotelBase';
import HotelPlatformAPI from './HotelPlatform';
import HotelThreePlatInfoAPI from './HotelThreePlatInfo';
import PayCompanyApi from './PayCompany';
import HotelPayModeApi from './HotelPayMode';
import HotelRoomApi from './HotelRoom';
import HotelPolicyApi from './HotelPolicy';
import imagesInfoApi from './imagesInfo';
import OrderApi from './Order';

export default {
  bootstrap() {
    let mock = new MockAdapter(axios);
    AccountApi.bootstrap(mock);
    HotelBaseAPI.bootstrap(mock);
    HotelPayModeApi.bootstrap(mock);
    HotelPlatformAPI.bootstrap(mock);
    HotelPolicyApi.bootstrap(mock);
    HotelRoomApi.bootstrap(mock);
    HotelThreePlatInfoAPI.bootstrap(mock);
    imagesInfoApi.bootstrap(mock);
    OrderApi.bootstrap(mock);
    PayCompanyApi.bootstrap(mock);

    // mock success request
    mock.onPost('/resume/add').reply(200, { msg: 'success' });

    // mock error request
    mock.onGet('/error').reply(500, { msg: 'failure' });
  }
};
