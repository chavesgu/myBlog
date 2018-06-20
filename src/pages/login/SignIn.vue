<template>
  <div class="signIn">
    <Form ref="signIn" :model="signInInfo" :rules="signInRule" label-position="right" :label-width="150">
      <FormItem prop="user" label="User">
        <Input type="text" size="large" v-model="signInInfo.user" placeholder="User name"  @keyup.enter.native="mySubmit('signIn')" style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="password" label="Password">
        <Input type="password" size="large" v-model="signInInfo.password" placeholder="Password"  @keyup.enter.native="mySubmit('signIn')"
               style="width: 200px;"></Input>
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="mySubmit('signIn')" @keyup.enter.native="mySubmit('signIn')">Sign In</Button>
      </FormItem>
    </Form>
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
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {pattern: /[0-9A-z]/, message: "Must not use special sign", trigger: "change,blur"}
          ],
          password: [
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {min: 6, message: "Must be 6 at least", trigger: "change,blur"}
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
              this.$Modal[res.data.result?"success":"error"]({
                title: 'Message',
                content: res.data.msg,
                onOk() {
                  if (res.data.result) {
                    myCookie.setItem("token",res.data.token,30*60);
                    myCookie.setItem("user",res.data.userName,30*60);
                    _this.$router.push({name: 'admin', params: {userName: res.data.userName}});
                  }
                }
              })
            }, error => {
              this.$Modal.error({
                title: 'Error',
                content: error
              })
            })
          } else {

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
