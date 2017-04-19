import Abstract from './common/abstract';
import NotFound from './common/404';
// auth
import Login from './login/login';
import Register from './register/register';
// hotel
import HotelPlatform from './policy/hotel-platform/HotelPlatform';
import HotelBase from './policy/hotel-base/HotelBase';
import HotelBaseAdd from './policy/hotel-base/HotelBaseAdd';
import HotelBaseEdit from './policy/hotel-base/HotelBaseEdit';
<<<<<<< HEAD
import HotelPlatformInfo from './policy/hotel-platform/HotelPlatformInfo';
=======
// policy
import PayCompany from './policy/pay-company/pay-company';
import PayType from './policy/pay-type/pay-type';
import HotelPayMode from './policy/hotel-paymode/hotel-paymode';
import PolicyImages from './policy/policy-images/policy-images';
import RserveMode from './policy/rserve-mode/rserve-mode';
import SecretType from './policy/secret-type/secret-type';
// order
import Order from './order/order';
>>>>>>> 98631576dc894e8283a4c4d0bcdfd2cd887fa089

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
<<<<<<< HEAD
  HotelPlatformInfo
=======
  PolicyImages,
  RserveMode,
  PayType,
  SecretType,
  Order
>>>>>>> 98631576dc894e8283a4c4d0bcdfd2cd887fa089
};
