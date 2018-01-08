import axios from 'axios'
import path from './api'
const base = path.apiBaseUrl + 'ParkSale/AirInformations/GetAirInfo'
export default {
    listAll(params) {
        return axios.get(base, {
            params: params
        })
    }
}

/*  "FlightNo": "TZ168",//航班号
  "TakeOffTime": "2017-07-25 02:20:00",//起飞时间
  "ArrivalTime": "2017-07-25 07:43:00",//到达时间
  "Stat": "到达",//状态
  "PreStat": "暂无前序航班",//前序航班状态
  "UpdateTime": "2017-07-25 09:55:23",//更新时间
  "LastQueryResult": true,//最后查询结果
   */