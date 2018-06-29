<template>
  <div class="signIn">
    <el-form ref="signIn" :model="signInInfo" :rules="signInRule" label-position="right" label-width="150px">
      <el-form-item prop="user" label="User">
        <el-input type="text" size="large" v-model="signInInfo.user" placeholder="User name"  @keyup.enter.native="mySubmit('signIn')" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" size="large" v-model="signInInfo.password" placeholder="Password"  @keyup.enter.native="mySubmit('signIn')"
               style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" size="large" @click="mySubmit('signIn')" @keyup.enter.native="mySubmit('signIn')">Sign In</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import secret from 'crypto-js'
  import myCookie from '@/assets/utils/cookie'
  export default {
    name: "sign-in",
    metaInfo:{
      titleTemplate:'%s - signIn'
    },
    data() {
      return {
        signInInfo: {
          user: '',
          password: ''
        },
        signInRule: {
          user: [
            {required: true, message: "Must not be empty", trigger: "blur"},
            {pattern: /[0-9A-z]/, message: "Must not use special sign", trigger: "change"}
          ],
          password: [
            {required: true, message: "Must not be empty", trigger: "blur"},
            {min: 6, message: "Must be 6 at least", trigger: "change"}
          ]
        }
      }
    },
    computed:{
      ...mapGetters({
        apiUrl:'apiUrl'
      })
    },
    methods: {
      mySubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$http.post(this.apiUrl+'/signIn', {
              user: this.signInInfo.user,
              password: secret.SHA256(this.signInInfo.password).toString(secret.enc.Hex)
            }).then(res => {
              const _this = this;
              this.$alert(res.data.msg,{
                title: 'Message',
                type: res.data.code===200?"success":"error",
                callback() {
                  if (res.data.code===200) {
                    myCookie.setItem("user",res.data.userInfo.name,30*60);
                    if (_this.$route.query.redirect&&_this.$route.query.redirect!=='admin') {
                      _this.$router.replace({name:_this.$route.query.redirect});
                    }else {
                      _this.$router.replace({name: 'admin', params: {userName: res.data.userInfo.name}});
                    }
                  }
                }
              })
            }).catch(error=>{
              console.log(error);
              this.$alert(error,{
                title: 'Error',
                type: 'error'
              })
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
