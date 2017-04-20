import Abstract from './common/abstract';
import NotFound from './common/404';
// auth
import Login from './account/login';
import Register from './account/register';
// hotel
import HotelPlatform from './hotel/hotel-platform/HotelPlatform';
import HotelBase from './hotel/hotel-base/HotelBase';
import HotelBaseAdd from './hotel/hotel-base/HotelBaseAdd';
import HotelBaseEdit from './hotel/hotel-base/HotelBaseEdit';
import HotelPlatformInfo from './hotel/hotel-platform/HotelPlatformInfo';
<<<<<<< HEAD
import HotelPolicyList from './hotel/hotel-policy/HotelPolicyList';

=======


>>>>>>> c72ca36f594c8a2847b3fbed9819c54a3db99ecb
// policy
import PayCompany from './policy/pay-company/pay-company';
import PayType from './policy/pay-type/pay-type';
import HotelPayMode from './policy/hotel-paymode/hotel-paymode';
import PolicyImages from './policy/policy-images/policy-images';
// order
import Order from './order/order';
<<<<<<< HEAD
//images
import imagesInfo from './images/imagesInfo';
import imagesInfoAdd from './images/imagesInfoAdd';
import imagesInfoEdit from './images/imagesInfoEdit';
import imagesInfoList from './images/imagesInfoList';
=======
>>>>>>> c72ca36f594c8a2847b3fbed9819c54a3db99ecb

// test
import Test from './test/test';
import TestOne from './test/test-one';
export default {
  Abstract,
  NotFound,
  Login,
  Register,
  HotelPlatform,
  HotelBase,
  PayCompany,
  HotelPayMode,
  HotelBaseAdd,
  HotelBaseEdit,
  HotelPlatformInfo,
  PolicyImages,
  PayType,
  Order,
<<<<<<< HEAD
  HotelPolicyList,
  imagesInfo,
  imagesInfoAdd,
  imagesInfoEdit,
  imagesInfoList,
=======
>>>>>>> c72ca36f594c8a2847b3fbed9819c54a3db99ecb
  Test,
  TestOne
};
