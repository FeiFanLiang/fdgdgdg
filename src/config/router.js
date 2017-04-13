import {
    Login,
    Home,
    NotFound,
    Content,
    Modules
} from '../components/'

module.exports = [{
    path: '/',
    redirect: to => {
        return 'login'
    },
    hidden: true
}, {
    path: '/login',
    component: Login,
    hidden: true
}, {
    path: '/404',
    component: Home,
    hidden: true,
    children: [{
        path: '',
        component: NotFound
    }]
},
 {
    path: '/demo',
    name: '演示模块',
    icon: 'inbox',
    component: Home,
    children: [{
        hidden: true,
        path: '',
        redirect: to => {
            return 'user'
        }
    }, {
        path: 'user',
        name: '用户管理',
        icon: 'inbox',
        component: Content,
        children: [{
            hidden: true,
            path: '',
            redirect: to => {
                return 'list'
            }
        }, {
            path: 'list',
            name: '用户列表',
            icon: 'reorder',
            component: Modules.Demo.User.List
        }, {
            path: 'edit',
            name: '编辑用户',
            icon: 'edit',
            component: Modules.Demo.User.Edit
        }]
    }, {
        path: 'article',
        name: '文章管理',
        icon: 'inbox',
        component: Content,
        children: [{
            hidden: true,
            path: '',
            redirect: to => {
                return 'list'
            }
        }, {
            path: 'list',
            name: '文章列表',
            icon: 'reorder',
            component: Modules.Demo.Article.List
        }, {
            path: 'edit',
            name: '编辑文章',
            icon: 'edit',
            component: Modules.Demo.Article.Edit
        }]
    }
  ]
},
]
