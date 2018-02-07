<template>
  <div class="admin">
    <h1>admin:{{user}}</h1>
    <div class="profile">
      <img :src="profileUrl" alt="" v-if="profileUrl">
      <i class="iconfont chaves-profile1" v-else></i>
    </div>
    <div class="upload">
      <Upload ref="upload" name="uploadImg" type="drag" :show-upload-list="false" :before-upload="upload"
              :format="['jpg','jpeg','png','gif']"
              :max-size="4096"
              :on-format-error="uploadFormatError"
              :on-exceeded-size="uploadMaxSize"
              action="http://admin.chavesgu.com/upload.php">
        <Button type="primary" size="large">上传头像</Button>
      </Upload>
    </div>
  </div>
</template>

<script>
  export default {
    name: "admin",
    data() {
      return {
        user: '',
        profileUrl:''
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
          if (res.data.isTimeOut){
            this.$Modal.warning({
              title: 'Warning',
              content: '登录超时',
              onOk() {
                localStorage.removeItem('signId');
                localStorage.removeItem('signUser');
                _this.$router.push({name: 'signIn'});
              }
            });
          }else {
            this.profileUrl = 'http://admin.chavesgu.com/'+res.data.profile;
          }
        },error=>{
          console.log(error);
          localStorage.removeItem('signId');
          localStorage.removeItem('signUser');
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
    methods:{
      upload(file){
        let render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = () =>{
          let type = render.result.split(',')[0].split('/')[1].split(';')[0];
          let base64data = render.result.split(',')[1];
          this.$http.post('http://admin.chavesgu.com/upload.php',{signId:localStorage.signId,pic:base64data,type:type}).then(res=>{
            if (res.data){
              this.profileUrl = 'http://admin.chavesgu.com/'+res.data;
            }else {
              this.$Modal.error({
                title:'Error',
                content:'图片上传出错，请重新上传。'
              })
            }
          },error=>{
            console.log(error);
          });
        };
        return false;
      },
      uploadFormatError(file) {
        this.$Modal.error({
          title:'Message',
          content:'只支持jpg,png,gif格式'
        })
      },
      uploadMaxSize(file) {
        this.$Modal.error({
          title:'Message',
          content:'图片大小不能超过4M'
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .admin{
    .profile{
      display: inline-block;
      width: 128px;
      height: 128px;
      i{
        font-size: 80px;
      }
      img{
        width: 100%;
      }
    }
  }
</style>
