<template>
    <section class="login">
      <div class="choose">
        <ButtonGroup>
          <Button @click="goTo('register','registerType','signInType')" :type="registerType">Register</Button>
          <Button @click="goTo('signIn','signInType','registerType')" :type="signInType">Sign In</Button>
        </ButtonGroup>
      </div>
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </div>
    </section>
</template>

<script>
    export default {
        name: "login",
      metaInfo:{
        titleTemplate:'%s - login'
      },
      data(){
          return {
            registerType:'primary',
            signInType:'ghost'
          }
      },
      methods:{
          goTo(url,select,unselect){
            this.$router.push({name:url});
            this[select] = 'primary';
            this[unselect] = 'ghost';
          },
        checkUrl(){
          if (this.$route.name==='signIn'){
            this['signInType'] = 'primary';
            this['registerType'] = 'ghost';
          }else {
            this['signInType'] = 'ghost';
            this['registerType'] = 'primary';
          }
        }
      },
      created(){
        this.checkUrl();
      },
      watch:{
          $route(){
            this.checkUrl();
          }
      }
    }
</script>

<style lang="less">
  .login{
    padding: 50px 0;
    .choose{
      text-align: right;
      padding-right: 20px;
      a{
        color: #495060;
      }
    }
    .content{
      width: 900px;
      margin: 0 auto;
      padding: 50px 30px;
      form {
        width: 520px;
        margin: 0 auto;
        text-align: left;
      }
    }
  }
</style>
