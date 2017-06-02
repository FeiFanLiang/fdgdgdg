import Pages from '../pages';
module.exports = {
    path: 'order',
    component: Pages.Abstract,
    name: '订单',
    redirect: '/order/CarOrder',
    iconClass: 'el-icon-setting',
    children: [ {
        path: 'CarOrder',
        component: Pages.CarOrder,
        name: '专车订单'
    }, {
        path: 'HotelOrder',
        component: Pages.HotelOrder,
        name: '特价房订单',
    }]
};
