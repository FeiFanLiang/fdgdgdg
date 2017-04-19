import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AccountApi from './Account';
import HotelBaseAPI from './HotelBase';
import HotelPlatformAPI from './HotelThreePlatInfo';
import HotelPlatformInfoAPI from './HotelPlatform';
import PayCompanyApi from './PayCompany';
import HotelPayModeApi from './HotelPayMode';

export default {
  bootstrap() {
    let mock = new MockAdapter(axios);
    AccountApi.bootstrap(mock);
    HotelBaseAPI.bootstrap(mock);
    HotelPlatformAPI.bootstrap(mock);
    HotelPlatformInfoAPI.bootstrap(mock);
    PayCompanyApi.bootstrap(mock);
    HotelPayModeApi.bootstrap(mock);

    // mock error request
    mock.onGet('/error').reply(500, { msg: 'failure' });
  }
};
