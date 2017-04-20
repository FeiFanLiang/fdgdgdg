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

>>>>>>> 0dd44daf128418475f5a2a79a95462eb8a535f9a
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
// test
import Test from './test/test';
import TestOne from './test/test-one';
>>>>>>> 0dd44daf128418475f5a2a79a95462eb8a535f9a
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
<<<<<<< HEAD
  SecretType,
  Order,
  HotelPolicyList,
  imagesInfo,
  imagesInfoAdd,
  imagesInfoEdit,
  imagesInfoList
=======
  Order,
  Test,
  TestOne
>>>>>>> 0dd44daf128418475f5a2a79a95462eb8a535f9a
};
