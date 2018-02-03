<template>
  <div class="signIn">
    <Form ref="signIn" :model="signInInfo" :rules="signInRule" label-position="right" :label-width="150">
      <FormItem prop="user" label="User">
        <Input type="text" size="large" v-model="signInInfo.user" placeholder="User name" style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="password" label="Password">
        <Input type="password" size="large" v-model="signInInfo.password" placeholder="Password"
               style="width: 200px;"></Input>
      </FormItem>
      <FormItem label="">
        <Button type="primary" size="large" @click="mySubmit('signIn')">Sign In</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: "sign-in",
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
    methods: {
      mySubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            this.$http.post('http://admin.chavesgu.com/signIn.php', {
              user: this.signInInfo.user,
              password: this.signInInfo.password
            }).then(res => {
              const _this = this;
              this.$Modal.info({
                title: 'Message',
                content: res.data,
                onOk() {
                  if (res.data === '登陆成功') {
                    _this.$router.push({name: 'admin', params: {userName: _this.signInInfo.user}});
                    localStorage.setItem('admin', JSON.stringify({
                        user: _this.signInInfo.user,
                        sign: true,
                        signTime: new Date().getTime()
                      })
                    );

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
