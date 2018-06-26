// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import {router} from './router'
import store from './store'
import './http'
import './directive';
import Vuelazyload from 'vue-lazyload'
import VueMeta from 'vue-meta'
import './initEcharts'
import './initElement'

// import css
import "./assets/reset.css";
import './assets/theme/index.scss';
import './assets/prism.css';


Vue.use(Vuelazyload, {
    preLoad: 1.3,
    attempt: 1
});
Vue.use(VueMeta);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
});


if (window.ActiveXObject){
  if (document.documentMode < 10){ //小于 IE 10
    Vue.prototype.$alert('抱歉，本站暂不支持低版本浏览器。(点击确认下载高版本浏览器)',{
      type:'error',
      title:'Error',
      callback(){
        window.location.href = 'https://support.microsoft.com/en-us/help/18520/download-internet-explorer-11-offline-installer'
      }
    });
  }
}
