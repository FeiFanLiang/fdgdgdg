import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AccountApi from './Account';
import HotelBaseAPI from './HotelBase';
import HotelPlatformAPI from './HotelThreePlatInfo';
import HotelPlatformInfoAPI from './HotelPlatform';
import PayCompanyApi from './PayCompany';
import HotelPayModeApi from './HotelPayMode';
import HotelRoomApi from './HotelRoom';
<<<<<<< HEAD
import HotelPolicyApi from './HotelPolicy';
import imagesInfoApi from './imagesInfo';
=======
import OrderApi from './Order';
>>>>>>> 0dd44daf128418475f5a2a79a95462eb8a535f9a

export default {
  bootstrap() {
    let mock = new MockAdapter(axios);
    AccountApi.bootstrap(mock);
    HotelBaseAPI.bootstrap(mock);
    HotelPlatformAPI.bootstrap(mock);
    HotelPlatformInfoAPI.bootstrap(mock);
    PayCompanyApi.bootstrap(mock);
    HotelPayModeApi.bootstrap(mock);
    HotelRoomApi.bootstrap(mock);
<<<<<<< HEAD
    HotelPolicyApi.bootstrap(mock);
    imagesInfoApi.bootstrap(mock);

    // mock success request
    mock.onPost('/resume/add').reply(200, { msg: 'success' });
=======
    OrderApi.bootstrap(mock);
>>>>>>> 0dd44daf128418475f5a2a79a95462eb8a535f9a

    // mock error request
    mock.onGet('/error').reply(500, { msg: 'failure' });
  }
};
