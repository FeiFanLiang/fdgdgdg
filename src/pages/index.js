// other
import Abstract from './common/abstract';
import NotFound from './common/404';
const other = { Abstract, NotFound }

// auth
import Login from './account/login';
import Register from './account/register';
const auth = { Login, Register }

// hotel
import HotelBase from './hotel/hotel-base/hotel-base';
import HotelBaseAdd from './hotel/hotel-base/hotel-base-add';
import HotelBaseEdit from './hotel/hotel-base/hotel-base-edit';
import HotelPlatform from './hotel/hotel-platform/hotel-platform';
import HotelPolicy from './hotel/hotel-policy/hotel-policy';
import HotelPrice from './hotel/hotel-price/hotel-price';
import HotelRoom from './hotel/hotel-room/hotel-room';
import HotelShow from './hotel/hotel-show/hotel-show';
import HotelShowAddAndEdit from './hotel/hotel-show/hotel-show-add-and-edit';
import RoomShow from './hotel/room-show/room-show';
const hotel = { HotelBase, HotelBaseAdd, HotelBaseEdit, HotelPlatform, HotelPolicy, HotelPrice, HotelRoom, HotelShow, HotelShowAddAndEdit, RoomShow }

// show
import BargainsRoom from './show/bargains-room/bargains-room';
const show = { BargainsRoom }

// policy
import PayCompany from './policy/pay-company/pay-company';
import HotelPayMode from './policy/hotel-paymode/hotel-paymode';
const policy = { PayCompany, HotelPayMode }

// order
import CarOrder from './order/car-order';
import HotelOrder from './order/hotel-order';
const order = { CarOrder, HotelOrder }

// images
import ImagesInfo from './images/imagesInfo';
import ImagesInfoAdd from './images/imagesInfoAdd';
import ImagesInfoEdit from './images/imagesInfoEdit';
import ImagesInfoList from './images/imagesInfoList';
const images = { ImagesInfo, ImagesInfoAdd, ImagesInfoEdit, ImagesInfoList }

// user
import User from './user/user';
const user = { User }

// role
import Role from './role/role';
const role = { Role }

// wechat
import CustomMenu from './weichat/custom-menu';
import CustomService from './weichat/custom-service'
const wechat = { CustomMenu,CustomService}

export default {
    ...other,
    ...auth,
    ...hotel,
    ...show,
    ...policy,
    ...order,
    ...user,
    ...role,
    ...wechat
};
