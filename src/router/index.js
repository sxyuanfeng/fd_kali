import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountValue from '../pages/account-value';
import AccountValueSearch from '../pages/search/account-value-search';
import HotTag from '../pages/hot-tag';
import Repost from '../pages/repost';
import RepostSearch from '../pages/search/repost-search';
import MblogSearch from '../pages/search/mblog-search';
import Mblog from '../pages/mblog';
import RentingSearch from '../pages/search/renting-search';
import Renting from '../pages/renting';
import Covid from '../pages/covid';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: AccountValueSearch,
    },
    {
        path: '/accountvalue',
        component: AccountValue,
        children: [
            {
                path: 'follow',
                component: () => import('../components/account-value/account-chart/follow.vue')
            },
            {
                path: 'fan',
                component: () => import('../components/account-value/account-chart/fan.vue')
            },
            {
                path: 'status',
                component: () => import('../components/account-value/account-chart/status.vue')
            },
            {
                path: 'overview',
                component: () => import('../components/account-value/account-chart/overview.vue')
            }
        ]
    },
    {
        path: '/mblogsearch',
        component: MblogSearch
    },
    {
        path: '/mblog',
        component: Mblog,
        children: [
            {
                path: 'participant',
                component: () => import('../components/mblog/mblog-chart/participant.vue')
            },
            {
                path: 'spread',
                component: () => import('../components/mblog/mblog-chart/spread.vue')
            },
            {
                path: 'overview',
                component: () => import('../components/mblog/mblog-chart/overview.vue')
            }
        ]
    },
    {
        path: '/rentingsearch',
        component: RentingSearch,
    },
    {
        path: '/renting',
        component: Renting,
        children: [
            {
                path: 'rentingwordcloud',
                component: () => import('../components/renting/renting-wordcloud.vue')
            },
            {
                path: 'rentinghuntinglist',
                component: () => import('../components/renting/renting-hunting-list.vue')
            },
            {
                path: 'rentingoutlist',
                component: () => import('../components/renting/renting-out-list.vue')
            },
        ]
    },
    {
        path: '/covid',
        component: Covid,
    },
    {
        path: '/hottag',
        component: HotTag,
        children: [
        ]
    },
    {
        path: '/repostsearch',
        component: RepostSearch,
        children: [
        ]
    },
    {
        path: '/repost',
        component: Repost,
        children: [
        ]
    },
];

export default new VueRouter({
    routes
});
