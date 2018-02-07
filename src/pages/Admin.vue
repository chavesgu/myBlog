<template>
  <div class="admin">
    admin:{{user}}


  </div>
</template>

<script>
  export default {
    name: "admin",
    data() {
      return {
        user: ''
      }
    },
    created() {
      let _this = this;
      let signInfo = localStorage.admin ? JSON.parse(localStorage.admin) : null;
      if (signInfo) {
        let time = (new Date().getTime()) - signInfo.signTime;
        if (time / 1000 / 60 > 5) {//5分钟登录过期
          _this.$Modal.warning({
            title: 'Warning',
            content: '登录超时',
            onOk() {
              localStorage.removeItem('admin');
              _this.$router.push({name: 'signIn'});
            }
          });
        } else {
          this.user = signInfo.user;
        }
      }
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
