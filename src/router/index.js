import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountValue from '../pages/account-value'
import HotTag from '../pages/hot-tag';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: AccountValue,
        children: [
            {
                path: 'follow',
                component: () => import('../components/account-value/account-chart/follow.vue')
            },
            {
                path: 'fan',
                component: () => import('../components/account-value/account-chart/fan.vue')
            }
        ]
    },
    {
        path: '/hottag',
        component: HotTag,
        children: [
        ]
    },
];

export default new VueRouter({
    routes
});
