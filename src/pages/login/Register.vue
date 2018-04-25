<template>
  <div class="register">
    <Form ref="register" :model="registerInfo" :rules="registerRule" label-position="right" :label-width="150">
      <FormItem prop="user" label="User">
        <Input type="text" size="large" v-model="registerInfo.user" placeholder="User name"
               style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="password" label="Password">
        <Input type="password" size="large" v-model="registerInfo.password" placeholder="Password"
               style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="confirmPassword" label="Confirm Password">
        <Input type="password" size="large" v-model="registerInfo.confirmPassword" placeholder="Confirm Password"
               style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="email" label="E-mail">
        <Input type="text" size="large" v-model="registerInfo.email" placeholder="E-mail" style="width: 200px;"></Input>
      </FormItem>
      <FormItem prop="phone" label="Phone">
        <Input type="text" size="large" v-model="registerInfo.phone" placeholder="Mobile Phone" :disabled="!phoneStatus"
               style="width: 200px;"></Input>
        <Button type="primary" size="large" class="sendBtn" :disabled="sendingCode" @click="sendCode">
          <span v-if="!sendingCode">发送验证码</span>
          <span v-else>{{sendTime}}秒后重新发送</span>
        </Button>
      </FormItem>
      <FormItem prop="code" label="Code">
        <Input type="text" size="large" v-model="registerInfo.code" placeholder="Code" style="width: 200px;"></Input>
      </FormItem>
      <FormItem label="">
        <Button type="error" size="large" @click="mySubmit('register')">Submit</Button>
        <Button size="large" class="reset" @click="myReset('register')">Reset</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "register",
    metaInfo:{
      titleTemplate:'%s - register'
    },
    data() {
      return {
        phoneStatus:true,
        sendingCode: false,
        sendTime: 0,
        timer: null,
        sessionId:'',
        registerInfo: {
          user: '',
          password: '',
          confirmPassword: '',
          email: '',
          phone: '',
          code: ''
        },
        registerRule: {
          user: [
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {pattern: /[0-9A-z]/, message: "Must not use special sign", trigger: "change,blur"}
          ],
          password: [
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {min: 6, message: "Must be 6 at least", trigger: "change,blur"}
          ],
          confirmPassword: [
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {
              validator: (rule, value, callback, source, options) => {
                var errors = [];
                if (this.registerInfo.password !== value) {//自定义规则 两次密码不一样
                  errors.push(
                    new Error("password is different", rule.field)
                  )
                }
                callback(errors);
              }, trigger: "change,blur"
            }
          ],
          email: [
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {type: 'email', message: "Mailbox format error", trigger: "change,blur"}
          ],
          phone: [
            {required: true, message: "Must not be empty", trigger: "change,blur"},
            {pattern: /[0-9]/, message: "Phone must be number", trigger: "change,blur"}
          ],
          code: [
            {required: true, message: "Must not be empty", trigger: "change,blur"}
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
      sendCode() {
        this.sendingCode = true;
        this.sendTime = 30;
        this.phoneStatus = false;
        this.$http.post(this.apiUrl+'/code.php', {phone: this.registerInfo.phone}).then(res => {
          console.log(res.data);
          if (res.data.result === 0) {
            this.$Modal.success({
              title: 'Message',
              content: 'Send Success'
            });
            this.sessionId = res.data.ext;
          } else {
            this.$Modal.error({
              title: 'Message',
              content: res.data.errmsg
            });
            this.phoneStatus = true;
          }
          this.startTimer();
        }, error => {
          console.log(error);
          this.phoneStatus = true;
          this.startTimer();
        });
      },
      startTimer() {//重新发送短信验证码计时器
        this.timer = setInterval(() => {
          this.sendTime--;
          if (this.sendTime <= 0) {
            this.sendingCode = false;
            clearInterval(this.timer);
          }
        }, 1000);
      },
      mySubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {//验证通过
            this.$http.post(this.apiUrl+'/register.php', {
              user: this.registerInfo.user,
              password: this.registerInfo.password,
              email: this.registerInfo.email,
              phone: this.registerInfo.phone,
              code: this.registerInfo.code,
              sessionId:this.sessionId
            }).then(res => {
              console.log(res.data);
              this.$Modal.info({
                title: 'Message',
                content: res.data
              });
              this.phoneStatus = true;
            }, error => {
              this.$Modal.error({
                title: 'Error',
                content: error
              });
            })
          } else {
            this.$Message.error('<span style="padding: 0 30px;">Fail!</span>');
          }
        })
      },
      myReset(name) {
        this.$refs[name].resetFields();
      }
    },
    mounted() {
      this.$refs['register'].resetFields();
    }
  }
</script>

<style scoped lang="less">
  .register {
    form {
      .sendBtn {
        margin-left: 20px;
      }
      .reset {
        margin-left: 20px;
      }
    }
  }
</style>
