import Abstract from './common/abstract';
import NotFound from './common/404';
// auth
import Login from './account/login';
import Register from './account/register';
// hotel
import HotelBase from './hotel/hotel-base/hotel-base';
import HotelBaseAdd from './hotel/hotel-base/hotel-base-add';
import HotelBaseEdit from './hotel/hotel-base/hotel-base-edit';
import HotelPlatformInfo from './hotel/hotel-platform/HotelPlatformInfo';
import HotelPolicyList from './hotel/hotel-policy/HotelPolicyList';
import HotelPrice from './hotel/hotel-price/hotel-price';
import HotelRoomList from './hotel/hotel-room/HotelRoomList';

// policy
import PayCompany from './policy/pay-company/pay-company';
import HotelPayMode from './policy/hotel-paymode/hotel-paymode';
// order
import Order from './order/order';

// images
import ImagesInfo from './images/imagesInfo';
import ImagesInfoAdd from './images/imagesInfoAdd';
import ImagesInfoEdit from './images/imagesInfoEdit';
import ImagesInfoList from './images/imagesInfoList';

export default {
  Abstract,
  NotFound,
  Login,
  Register,
  HotelBase,
  PayCompany,
  HotelPayMode,
  HotelBaseAdd,
  HotelBaseEdit,
  HotelPlatformInfo,
  Order,
  HotelPolicyList,
  HotelPrice,
  HotelRoomList,
  ImagesInfo,
  ImagesInfoAdd,
  ImagesInfoEdit,
  ImagesInfoList
};
