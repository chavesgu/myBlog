<template>
  <div class="change-email">
    <el-form ref="pass" :model="passInfo" :rules="passRule" label-position="right" label-width="150px">
      <el-form-item class="item" label="email">
        <el-input type="text" v-model="email" readonly disabled style="width: 200px;"></el-input>
        <SendCode @click="sendCode" :startTiming="timingStatus"></SendCode>
      </el-form-item>
      <el-form-item class="item" prop="new" label="new">
        <el-input type="password" v-model="passInfo.new" placeholder="请输入新密码"></el-input>
      </el-form-item>
      <el-form-item class="item" prop="confirmNew" label="confirm new">
        <el-input type="password" v-model="passInfo.confirmNew" placeholder="请确认新密码"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="code">
        <el-input type="text" size="large" v-model="passInfo.code" placeholder="Code" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item class="item">
        <el-button type="primary" @click="changePass">确认</el-button>
        <el-button @click="$router.push({name:'admin'})">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import SendCode from '@/components/SendCode'
  export default {
    name: "Email",
    components:{SendCode},
    data(){
      return{
        timingStatus: false,
        passInfo:{
          new:'',
          confirmNew:'',
          code:''
        },
        passRule:{
          new:[
            {required:true, message: "Must not be empty", trigger: "blur"},
            {min: 6, message: "Must be 6 at least", trigger: "change"}
          ],
          confirmNew:[
            {required:true, message: "Must not be empty", trigger: "blur"},
            {min: 6, message: "Must be 6 at least", trigger: "change"},
            {
              validator: (rule, value, callback, source, options) => {
                var errors = [];
                if (this.passInfo.new !== value) {//自定义规则 两次密码不一样
                  errors.push(
                    new Error("password is different", rule.field)
                  )
                }
                callback(errors);
              }, trigger: "change"
            }
          ],
          code:[
            {required:true, message: "Must not be empty", trigger: "blur"}
          ],
        }
      }
    },
    computed:{
      email(){
        return this.$store.state.info.info.email || ''
      }
    },
    methods:{
      sendCode(){
        this.$store.dispatch('password/emailChangePassCode').then(res=>{
          this.timingStatus = true;
        }).catch(err=>{
          this.timingStatus = true;
        })
      },
      changePass(){
        this.$refs["pass"].validate(valid=>{
          if (valid){
            this.$store.dispatch('password/phoneChangePass',{
              newPass:this.passInfo.new,
              code:this.passInfo.code
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  .change-email {
    padding: 40px;
    text-align: left;
    form{

      .item{
        margin: 30px 0;
      }
      input{
        width: 200px;
      }
    }
  }
</style>
