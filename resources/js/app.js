/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
// window.Vue = require('vue');

import Vue from 'vue';

/** 引入element-ui */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/* 引入axios */
import Axios from 'axios';

/* 引入vue-router */
import VueRouter from 'vue-router';
Vue.use(VueRouter);

/* 引入主组件 */
import App from './components/App.vue';

/* 引入子组件 -->已改为另一种引入方法*/
// import Home from './components/Home.vue';
// import System from './components/system/System.vue';
// import DataBackup from './components/system/DataBackup.vue';
// import SystemLog from './components/system/SystemLog.vue';

/* 定义vue 路由 */
const router = new VueRouter({
    // 定义为history模式则url不会带#号
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: ()=>import('./components/Home.vue'),
            name:'控制面板'
        },
        {
            path:'/in-bound',
            name:'in-bound',
            component:()=>import('./components/bound/InBound.vue'),
            name:'商品入库'
        },
        {
            path:'/out-bound',
            name:'out-bound',
            component:()=>import('./components/bound/OutBound.vue'),
            name:'商品出库'
        },
        {
            path:'/bound-early',
            name:'bound-early',
            component:()=>import('./components/bound/BoundEarly.vue'),
            name:'库存预警'
        },
        {
            path:'/warehouse-set',
            name:'warehouse-set',
            component:()=>import('./components/basic-set/Warehouse.vue'),
            name:'仓库设置'
        },
        {
            path: '/system-info',
            name: 'system-info',
            component: ()=>import('./components/system/SystemInfo.vue'),
            name:'系统信息'
        },
        {
            path:'/data-backup',
            name:'data-backup',
            component:()=>import('./components/system/DataBackup.vue'),
            name:'数据备份'
        },
        {
            path:'/system-log',
            name:'system-log',
            component:()=>import('./components/system/SystemLog.vue'),
            name:'系统日志'
        }
    ],
});


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

Vue.component('app-template', require('./components/App.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const app = new Vue({
    el: '#app',
    components: { App },
    router,
});
