<template>
  <div class="register">
    <el-form ref="register" :model="registerInfo" :rules="registerRule" label-position="right" label-width="150px">
      <el-form-item prop="user" label="User">
        <el-input type="text" size="large" v-model="registerInfo.user" placeholder="User name"
               style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Password">
        <el-input type="password" size="large" v-model="registerInfo.password" placeholder="Password"
               style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPassword" label="Confirm Password">
        <el-input type="password" size="large" v-model="registerInfo.confirmPassword" placeholder="Confirm Password"
               style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="E-mail">
        <el-input type="text" size="large" v-model="registerInfo.email" placeholder="E-mail" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="Phone">
        <el-input type="text" size="large" v-model="registerInfo.phone" placeholder="Mobile Phone" :disabled="!phoneStatus"
               style="width: 200px;"></el-input>
        <SendCode @click="sendCode" :startTiming.sync="timingStatus"></SendCode>
      </el-form-item>
      <el-form-item prop="code" label="Code">
        <el-input type="text" size="large" v-model="registerInfo.code" placeholder="Code" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="danger" size="large" @click="mySubmit('register')">Submit</el-button>
        <el-button size="large" class="reset" @click="myReset('register')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SendCode from '@/components/SendCode.vue';
  import secret from 'crypto-js'
  export default {
    name: "register",
    components:{SendCode},
    metaInfo:{
      titleTemplate:'%s - register'
    },
    data() {
      return {
        timingStatus:false,
        phoneStatus:true,
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
            {required: true, message: "Must not be empty", trigger: "blur"},
            {pattern: /[0-9A-z]/, message: "Must not use special sign", trigger: ["change","blur"]}
          ],
          password: [
            {required: true, message: "Must not be empty", trigger: "blur"},
            {min: 6, message: "Must be 6 at least", trigger: ["change","blur"]}
          ],
          confirmPassword: [
            {required: true, message: "Must not be empty", trigger: "blur"},
            {
              validator: (rule, value, callback, source, options) => {
                var errors = [];
                if (this.registerInfo.password !== value) {//自定义规则 两次密码不一样
                  errors.push(
                    new Error("password is different", rule.field)
                  )
                }
                callback(errors);
              }, trigger: ["change","blur"]
            }
          ],
          email: [
            {required: true, message: "Must not be empty", trigger: "blur"},
            {type: 'email', message: "Mailbox format error", trigger: ["change","blur"]}
          ],
          phone: [
            {required: true, message: "Must not be empty", trigger: "blur"},
            {pattern: /^1[34578][0-9]{9}$/, message: "Phone format error", trigger: ["change","blur"]}
          ],
          code: [
            {required: true, message: "Must not be empty", trigger: "blur"}
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
      sendCode() {
        this.phoneStatus = false;
        this.$refs["register"].validateField("phone",err=>{
          if (!err){
            this.$http.post(this.apiUrl+'/phoneCode', {phone: this.registerInfo.phone}).then(res => {
              if (res.data.result === 0) {
                this.$alert('Send Success',{
                  type:'success',
                  title: 'Message'
                });
              } else {
                this.$alert(res.data.errmsg,{
                  title: 'Message',
                  type: 'error'
                });
                this.phoneStatus = true;
              }
              this.timingStatus=true;
            }, error => {
              console.log(error);
              this.phoneStatus = true;
              this.timingStatus=true;
            });
          }else {
            this.phoneStatus = true;
          }
        });
      },
      mySubmit(name) {
        let _this = this;
        this.$refs[name].validate(valid => {
          if (valid) {//验证通过
            this.$http.post(this.apiUrl+'/register', {
              user: this.registerInfo.user,
              password: secret.SHA256(this.registerInfo.password).toString(secret.enc.Hex),
              email: this.registerInfo.email,
              phone: this.registerInfo.phone,
              code: this.registerInfo.code
            }).then(res => {
              this.$alert(res.data.msg,{
                title: 'Message',
                type:res.data.type,
                callback(){
                  if (res.data.type==="success"){
                    _this.$router.push({name:'signIn'});
                  }
                }
              });
              this.phoneStatus = true;
            }, error => {
              this.$alert(error,{
                title: 'Error',
                type: 'error'
              });
            })
          } else {
            this.$message.error('<span style="padding: 0 30px;">Fail!</span>');
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
      .reset {
        margin-left: 20px;
      }
    }
  }
</style>
