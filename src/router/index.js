import Vue from 'vue';
import Pages from '../pages';
import hotelRoute from './hotel';
import orderRoute from './order';
import policyRoute from './policy';
import roleRoute from './role';
import userRoute from './user';
import showRoute from './show';
import wechatRoute from './wechat';
const children = [hotelRoute, showRoute, policyRoute, orderRoute, roleRoute, userRoute, wechatRoute];
const root = Vue.component('root', {
    template: '<router-view></router-view>'
});

let routes = [{
        path: '/login',
        component: Pages.Login,
        name: 'login',
        meta: {
            hidden: true,
            alone: true
        }
    }, {
        path: '/register',
        component: Pages.Register,
        name: 'register',
        meta: {
            hidden: true,
            alone: true
        }
    }, {
        path: '/404',
        component: Pages.NotFound,
        name: '404',
        meta: {
            requiresAuth: true
        }
    }, {
        path: '/',
        component: root,
        name: '主页',
        meta: {
            requiresAuth: true
        },
        children: children
    },

    {
        path: '*',
        redirect: { path: '/404' }
    }
];
let menuCount = routes.length;
routes[menuCount - 2].children.forEach(route => {
    if (route.children) {
        if (!route.meta) route.meta = {};
        route.meta.children = route.children;
    }
});

export default routes;
