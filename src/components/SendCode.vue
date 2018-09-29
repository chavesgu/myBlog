<template>
  <el-button type="primary" style="margin-left: 20px;" :disabled="sendingCode" @click="send">
    <span v-if="!sendingCode">发送验证码</span>
    <span v-else>{{sendTime}}秒后重新发送</span>
  </el-button>
</template>

<script>
  export default {
    name: "SendCode",
    data(){
      return{
        sendingCode: false,
        sendTime: 0,
        timer: null
      }
    },
    props:{
      startTiming:{
        type:Boolean,
        default:false,
        required: true
      }
    },
    watch:{
      startTiming(newV,oldV){
        if (newV && !oldV){
          this.startTimer();
        }
      }
    },
    methods:{
      send(){
        this.$emit('click');
      },
      startTimer() {//重新发送短信验证码计时器
        this.sendingCode = true;
        this.sendTime = 30;
        this.timer = setInterval(() => {
          this.sendTime--;
          if (this.sendTime <= 0) {
            this.sendingCode = false;
            this.$emit('update:startTiming',false);
            clearInterval(this.timer);
          }
        }, 1000);
      },
    }
  }
</script>

<style scoped>

</style>
