import { createRouter, createWebHashHistory } from 'vue-router';

import HelloWorld from '../common/components/HelloWorld';
import Clock from '../common/components/Clock';
import Counter from '../common/components/Counter';

const routes = [
    { path: '/', component: HelloWorld },
    { path: '/foo', component: Clock },
    { path: '/bar', component: Counter }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default function useRouter() {
    return {
        current: router.currentRoute.value
    }
}
