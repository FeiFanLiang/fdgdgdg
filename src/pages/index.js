import Abstract from './common/abstract';
import NotFound from './common/404';
// auth
import Login from './account/login';
import Register from './account/register';
// hotel
import HotelBase from './hotel/hotel-base/hotel-base';
import HotelBaseAdd from './hotel/hotel-base/hotel-base-add';
import HotelBaseEdit from './hotel/hotel-base/hotel-base-edit';
import HotelPlatform from './hotel/hotel-platform/hotel-platform';
import HotelPolicy from './hotel/hotel-policy/hotel-policy';
import HotelPrice from './hotel/hotel-price/hotel-price';
import HotelRoom from './hotel/hotel-room/hotel-room';
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
// user
import User from './user/user';
// role
import Role from './role/role';
// show
import HotelShow from './show/hotel-show/hotel-show';
// import RoomShow from './show/room-show/room-show'
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
  HotelPlatform,
  Order,
  HotelPolicy,
  HotelPrice,
  HotelRoom,
  ImagesInfo,
  ImagesInfoAdd,
  ImagesInfoEdit,
  ImagesInfoList,
  User,
  Role,
  HotelShow
};
