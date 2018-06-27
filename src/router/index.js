import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../Layout';
import Home from '@/pages/Home';
import Login from '../pages/Login.vue'
import myCookie from '@/assets/utils/cookie'
import LoadingBar from '../components/LoadingBar'
// add loading-bar
const loadingBar = Vue.prototype.$loadingBar = new Vue(LoadingBar).$mount();
document.body.appendChild(loadingBar.$el);

Vue.use(Router);

export const router = new Router({
  mode:'history',
  base:'/',
  routes: [
    {
      path: '/login',
      name: 'login',
      redirect:{name:'signIn'},
      component: Login,
      children:[
        {
          path: 'register',
          name: 'register',
          component: ()=>import(/* webpackChunkName: "login" */ '../pages/login/Register.vue')
        },
        {
          path: 'signIn',
          name: 'signIn',
          component: ()=>import(/* webpackChunkName: "login" */ '../pages/login/SignIn.vue')
        }
      ]
    },
    {
      path:'/',
      name:'layout',
      component:Layout,
      redirect:'home',
      children:[
        {
          path:'home',
          name:'home',
          meta:{
            show:true
          },
          component:Home,
        },
        {
          path:'blog',
          name:'blog',
          meta:{
            check:true,
            show:true
          },
          component:()=>import('../pages/Blog.vue'),
        },
        {
          path:'article/:id',
          name:'article',
          meta:{
            check:true,
            show:false
          },
          component:()=>import('../pages/MyArticle.vue')
        },
        {
          path: 'about',
          name: 'about',
          meta:{
            show:true
          },
          component: ()=>import('../pages/About.vue')
        },
        {
          path: 'admin/:userName',
          name:'admin',
          meta:{
            check:true,
            show:false
          },
          component: ()=>import('../pages/Admin.vue'),
        }
      ]
    }
  ],
  scrollBehavior:(to,from,savedPosition)=>{
    if (savedPosition) {
      // savedPosition is only available for popstate navigations.
      return savedPosition
    } else {
      const position = {};
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0;
        position.y = 0
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position
    }
  }
});
router.beforeEach((to, from, next)=>{
  loadingBar.start();
  if (to.name==='signIn'&&myCookie.getItem("user")) {
    next({name:'admin',params:{userName:myCookie.getItem("user")}});
    return
  }
  if (to.meta.check){
    if (myCookie.getItem("user")) {
      next()
    }else {
      next({name:'signIn',replace:true,query:{redirect:to.name}});
    }
  } else {
    next()
  }
});

router.afterEach((to, from) => {
  // ...
  loadingBar.finish();
});
