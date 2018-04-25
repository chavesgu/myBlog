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
        apiUrl
      })
    },
    methods: {
      mySubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$http.post(this.apiUrl+'/signIn.php', {
              user: this.signInInfo.user,
              password: this.signInInfo.password
            }).then(res => {
              const _this = this;
              this.$Modal.info({
                title: 'Message',
                content: res.data.msg,
                onOk() {
                  if (res.data.result === 1) {
                    localStorage.signId = res.data.id;
                    localStorage.signUser = res.data.user;
                    _this.$router.push({name: 'admin', params: {userName: res.data.user}});
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
