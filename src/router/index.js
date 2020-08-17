import { createRouter, createWebHashHistory } from 'vue-router';

import HelloWorld from '../common/components/HelloWorld';
import Clock from '../common/components/Clock';
import Counter from '../common/components/Counter';

const routes = [
    { path: '/hello', component: HelloWorld },
    { path: '/foo', component: Clock },
    { path: '/bar', component: Counter },
    {
        path: '/',
        component: () => import(/* webpackChunkName: "blog" */ '../pages/blog/index'),
        meta: {
            title: '个人主页'
        }
    },
    {
        path: '/blog',
        redirect: '/'
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '../pages/login/index'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        component: () => import(/* webpackChunkName: "login" */ '../pages/login/index'),
        meta: {
            title: '注册'
        }
    },
    {
        path: '/article/detail',
        component: () => import(/* webpackChunkName: "detail" */ '../pages/article/detail'),
        meta: {
            title: '文章详情'
        }
    },
    {
        path: '/article/preview',
        component: () => import(/* webpackChunkName: "detail" */ '../pages/article/detail'),
        meta: {
            title: '文章预览'
        },
    },
    {
        path: '/article/add',
        component: () => import(/* webpackChunkName: "add" */ '../pages/article/add'),
        meta: {
            title: '写文章'
        },
    },
    {
        path: '/article/edit',
        component: () => import(/* webpackChunkName: "add" */ '../pages/article/add'),
        meta: {
            title: '修改文章'
        }
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export function useRouter() {
    return {
        current: router.currentRoute.value
    }
}
