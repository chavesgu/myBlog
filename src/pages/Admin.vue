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
      if (!localStorage.signId){
        this.$Modal.warning({
          title: 'Warning',
          content: '登录信息错误',
          onOk() {
            _this.$router.push({name: 'signIn'});
          }
        });
      }else {
        let signId = localStorage.signId;
        this.$http.post('http://admin.chavesgu.com/loginStatus.php',{signId:signId}).then(res=>{
          if (res.data){
            this.$Modal.warning({
              title: 'Warning',
              content: '登录超时',
              onOk() {
                localStorage.removeItem('signId');
                localStorage.removeItem('signUser');
                _this.$router.push({name: 'signIn'});
              }
            });
          }
        },error=>{
          console.log(error);
          localStorage.removeItem('signId');
          this.$Modal.warning({
            title: 'Warning',
            content: '登录信息错误',
            onOk() {
              _this.$router.push({name: 'signIn'});
            }
          });
        })
      }
      //获取登录信息详细数据
      let signId = localStorage.signId;
      this.user = localStorage.signUser;


      // this.$http.post('http://admin.chavesgu.com/getUser.php',{signId:signId}).then(res=>{
      //   this.user = res.data.user;
      // },error=>{
      //   console.log(error);
      // })
    },
    methods: {

    }
  }
</script>

<style scoped>

</style>
