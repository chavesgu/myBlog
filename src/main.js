// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './vuex/store'
import './http.js'
import Vuelazyload from 'vue-lazyload'
import Iview from 'iview'
import "./assets/reset.css";
// import 'iview/dist/styles/iview.css';
import './assets/theme/index.less';

Vue.config.productionTip = false;
Vue.use(Vuelazyload, {
    preLoad: 1.3,
    attempt: 3
});
Vue.use(Iview);

/* eslint-disable no-new */
window.OneVue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
