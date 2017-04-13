import axios from 'axios'
import path from './api'
export default {
  //收藏/取消二手车车源
  toggleUsedCarSources(no) {
      return axios.get(path.oldUrl + `usedCarSources/${no}/toggleFav`)
  },
  //收藏/取消商品
  toggleProduct(code) {
      return axios.get(path.oldUrl + `goods/${code}/toggleFav`)
  },
  //获取所有收藏的二手车车源
  getUsedCarCollection(params) {
      return axios.get(path.oldUrl + `favCars`, {params:params})
  },
  //获取所有收藏的产品
  getProductCollection(params) {
      return axios.get(path.oldUrl + `favGoods`, {params:params})
  },
}
