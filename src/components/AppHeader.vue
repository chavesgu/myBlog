<template>
    <header>
      <nav>
        <router-link to="/" class="logo"><img src="../assets/images/logo.png" alt=""></router-link>
        <router-link :to="{name:'signIn'}" class="signIn" v-if="!token">
          <i class="iconfont chaves-account"></i>
          <span>Sign In</span>
        </router-link>
        <router-link :to="'/admin/'+user" class="signIn" v-else>
          <i class="iconfont chaves-account"></i>
          <span>Admin</span>
        </router-link>
        <div class="menu">
          <ul class="left-menu">
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
          </ul>
          <ul class="right-menu">
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/about">About</router-link></li>
          </ul>
        </div>
      </nav>
    </header>
</template>

<script>
  import myCookie from '@/assets/utils/cookie'
    export default {
      name: "app-header",
      data(){
          return {
            signStatus:false,
            user:'',
            token:null
          }
      },
      created(){
        this.user = myCookie.getItem("user");
        this.token = myCookie.getItem("token") || null;
      },
      watch:{
        $route(){
          this.token = myCookie.getItem("token") || null;
        }
      }
    }
</script>

<style scoped lang="less">
  header{
    height: 52px;
    background: #f3f3f3;
    box-shadow: 0 0 1px 1px rgba(0,0,0,0.3);
    nav{
      width: 100%;
      height: 52px;
      position: relative;
      overflow: hidden;
      text-align: center;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .menu{
        height: 52px;
        font-size: 0;
        ul[class$="-menu"]{
          width: 50%;
          display: inline-block;
          height: 52px;
          box-sizing: border-box;
          li{
            height: 52px;
            padding: 0 15px;
            a{
              font-size: 14px;
              line-height: 52px;
              letter-spacing: 1px;
              display: block;
            }
          }
        }
        .left-menu{
          padding-right: 100px;
          li{
            float: right;
          }
        }
        .right-menu{
          padding-left: 100px;
          li{
            float: left;
          }
        }
      }
      a.logo{
        width: 166px;
        height: 32px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
        img{
          height: 100%;
        }
        &:hover{
          animation: logo-scale .5s linear 1;
        }
      }
      a.signIn{
        position: absolute;
        right: -48px;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 2;
        font-size: 14px;
        line-height: 52px;
        transition: right .6s;
        &:hover{
          right: 12px;
          transition: right .6s;
        }
        i{
          margin-right: 20px;
        }
      }
    }
  }
  @keyframes logo-scale {
    0%,100%{
      transform: scale(1);
    }
    50%{
      transform: scale(1.4);
    }
  }
</style>
