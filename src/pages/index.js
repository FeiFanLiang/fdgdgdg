import Abstract from './common/abstract';
import NotFound from './common/404';
// auth
import Login from './login/login';
// hotel
import HotelPlatform from './policy/hotel-platform/HotelPlatform';
import HotelBase from './policy/hotel-base/HotelBase';
import HotelBaseAdd from './policy/hotel-base/HotelBaseAdd';
import HotelBaseEdit from './policy/hotel-base/HotelBaseEdit';
// policy
import PayCompany from './policy/pay-company/pay-company';
import PayType from './policy/pay-type/pay-type';
import HotelPayMode from './policy/hotel-paymode/hotel-paymode';
import PolicyImages from './policy/policy-images/policy-images';
import RserveMode from './policy/rserve-mode/rserve-mode';
import SecretType from './policy/secret-type/secret-type';
// order
import Order from './order/order';

export default {
  Abstract,
  NotFound,
  Login,
  HotelPlatform,
  HotelBase,
  PayCompany,
  HotelPayMode,
  HotelBaseAdd,
  HotelBaseEdit,
  PolicyImages,
  RserveMode,
  PayType,
  SecretType,
  Order
};
