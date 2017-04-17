import axios from 'axios'
import path from './api'
export default {
  //获取购物车中的所有商品信息
  getCartList(data){
      return axios.get(path.oldUrl+`ShoppingCart/items`,data)
  },
  //增加商品到购物车
  addToCart(data){
      return axios.post(path.oldUrl+`ShoppingCart/items`,data)
  },
  //删除购物车商品信息
  deleteProduct(id){
      return axios.post(path.oldUrl+`shoppingCart/items/delete/${id}`)
  },
  //更新购物车中商品的数量
  changeNumber(skuCode,data){
      return axios.put(path.oldUrl+`shoppingCart/items/${skuCode}`,data)
  },
  //清除购物车失效商品
  clearInvalid(){
      return axios.put(path.oldUrl+`shoppingCart/invalidItems/clear`)
  },
}
