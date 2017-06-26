import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import accountApi from './Account'
import HotelBaseAPI from './HotelBase'
import HotelPlatformAPI from './HotelPlatform'
import HotelThreePlatInfoAPI from './HotelThreePlatInfo'
import PayCompanyApi from './PayCompany'
import HotelPayModeApi from './HotelPayMode'
import hotelRoomApi from './HotelRoom'
import hotelPolicyApi from './HotelPolicy'

export default {
  bootstrap () {
    let mock = new MockAdapter(axios)
    accountApi.bootstrap(mock)
    HotelBaseAPI.bootstrap(mock)
    HotelPayModeApi.bootstrap(mock)
    HotelPlatformAPI.bootstrap(mock)
    hotelPolicyApi.bootstrap(mock)
    hotelRoomApi.bootstrap(mock)
    HotelThreePlatInfoAPI.bootstrap(mock)
    PayCompanyApi.bootstrap(mock)

    // mock success request
    mock.onPost('/resume/add').reply(200, { msg: 'success' })

    // mock error request
    mock.onGet('/error').reply(500, { msg: 'failure' })
  }
}
