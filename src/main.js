// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
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
import './assets/prism.css'
import VuePrism from 'vue-prism'

Vue.config.productionTip = false;
Vue.use(Vuelazyload, {
    preLoad: 1.3,
    attempt: 3
});
Vue.use(Iview);
Vue.use(VuePrism);


/* eslint-disable no-new */
window.OneVue = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});


if (window.ActiveXObject){
  if (document.documentMode < 10){ //小于 IE 10
    OneVue.$Modal.error({
      title:'Error',
      content:'抱歉，本站暂不支持低版本浏览器。(点击确认下载高版本浏览器)',
      onOk(){
        window.location.href = 'https://support.microsoft.com/en-us/help/18520/download-internet-explorer-11-offline-installer'
      }
    });
  }
}
