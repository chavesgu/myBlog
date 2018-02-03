<template>
<div class="admin">
  admin:{{user}}
</div>
</template>

<script>
    export default {
        name: "admin",
      data(){
          return{
            user:''
          }
      },
      created(){
          var admin = JSON.parse(localStorage.admin);
          this.user = admin.user;
      }
    }
</script>

<style scoped>

</style>
