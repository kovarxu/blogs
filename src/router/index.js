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
        component: () => import('../pages/index/index'),
        meta: {
            title: '个人主页'
        }
    },
    {
        path: '/login',
        component: () => import('../pages/login/index'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        component: () => import('../pages/login/index'),
        meta: {
            title: '注册'
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
