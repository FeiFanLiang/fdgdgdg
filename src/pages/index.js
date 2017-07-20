// other
import Abstract from './common/abstract'
import NotFound from './common/404'
const other = { Abstract, NotFound }

// auth
import Login from './account/login'
import Register from './account/register'
const auth = { Login, Register }

// hotel
import HotelBase from './hotel/hotel-base/hotel-base'
import HotelBaseAdd from './hotel/hotel-base/hotel-base-add'
import HotelBaseEdit from './hotel/hotel-base/hotel-base-edit'
import HotelPlatform from './hotel/hotel-platform/hotel-platform'
import HotelPolicy from './hotel/hotel-policy/hotel-policy'
import HotelPrice from './hotel/hotel-price/hotel-price'
import HotelRoom from './hotel/hotel-room/hotel-room'
import HotelShow from './hotel/hotel-show/hotel-show'
import HotelShowAddAndEdit from './hotel/hotel-show/hotel-show-add-and-edit'
import RoomShow from './hotel/room-show/room-show'
const hotel = {
    HotelBase,
    HotelBaseAdd,
    HotelBaseEdit,
    HotelPlatform,
    HotelPolicy,
    HotelPrice,
    HotelRoom,
    HotelShow,
    HotelShowAddAndEdit,
    RoomShow
}

// show
import BargainsRoom from './show/bargains-room/bargains-room'
const show = { BargainsRoom }

// policy
import PayCompany from './policy/pay-company/pay-company'
import HotelPayMode from './policy/hotel-paymode/hotel-paymode'
const policy = { PayCompany, HotelPayMode }

// order
import CarOrderManage from './order/car-order-manage'
import HotelOrder from './order/hotel-order'
const order = { CarOrderManage, HotelOrder }

// user
import User from './user/user'
const user = { User }

// role
import Role from './role/role'
const role = { Role }

// wechat
import CustomMenu from './weichat/custom-menu'
import CustomService from './weichat/custom-service'
import PayWeichat from './weichat/pay-weichat'
import Card from './weichat/card'
import Datas from './weichat/datas'
import MembershipCard from './weichat/membership-card'
import Verification from './weichat/verification'
import Texts from './weichat/texts'
const wechat = {
    CustomMenu,
    CustomService,
    PayWeichat,
    Card,
    Datas,
    MembershipCard,
    Verification,
    Texts
}

// fleet
import CarBase from './fleet/car-base/car-base'
import DriverBase from './fleet/driver-base/driver-base'
import CarArrange from './fleet/car-arrange/car-arrange'
import CarUse from './fleet/car-use/car-use'
import GasolineLog from './fleet/gasoline-log/gasoline-log'
import DriverEvaluate from './fleet/driver-evaluate/driver-evaluate'
import CarLine from './fleet/car-line/car-line'
import LineStation from './fleet/line-station/line-station'
import Station from './fleet/station/station'
const fleet = { CarBase, DriverBase, CarArrange, CarUse, GasolineLog, DriverEvaluate, CarLine, LineStation, Station }

export default {
    ...other,
    ...auth,
    ...hotel,
    ...show,
    ...policy,
    ...order,
    ...user,
    ...role,
    ...wechat,
    ...fleet
}
