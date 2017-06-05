import Pages from '../pages';
module.exports = {
    path: 'wechat',
    component: Pages.Abstract,
    name: '微信',
    redirect: '/wechat/CustomMenu',
    iconClass: 'el-icon-picture',
    children: [{
            path: 'CustomMenu',
            component: Pages.CustomMenu,
            name: '自定义菜单',
        }, {
            path: 'CustomService',
            component: Pages.CustomService,
            name: '客服消息'
        }
    ]
};
