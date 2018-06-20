import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview';
import HelloWorld from '@/components/HelloWorld'
import myCookie from '@/assets/utils/cookie'

Vue.use(Router);

iView.LoadingBar.config({
  color:'#f60'
});

export const router = new Router({
  mode:'history',
  base:'/',
  routes: [
    {
      path:'/',
      component:HelloWorld
    },
    {
      path:'/blog',
      name:'blog',
      component:()=>import('../pages/Blog.vue'),
    },
    {
      path:'/article/:id',
      name:'article',
      component:()=>import('../pages/MyArticle.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: ()=>import('../pages/About.vue')
    },
    {
      path: '/admin/:userName',
      name:'admin',
      component: ()=>import('../pages/Admin.vue'),
    },
    {
      path: '/login',
      name: 'login',
      redirect:{name:'signIn'},
      component: ()=>import('../pages/Login.vue'),
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
  iView.LoadingBar.start();
  if (myCookie.getItem("token") || to.path==='/'){
    if (to.name==='signIn') {
      next({name:'admin',params:{userName:myCookie.getItem("user")}});
      return
    }
    next();
  }else {
    if (to.name==='signIn') {
      next();
      return
    }
    next({name:'signIn'});
  }
});

router.afterEach((to, from) => {
  // ...
  iView.LoadingBar.finish();
});
