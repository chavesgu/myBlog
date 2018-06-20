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
              action="https://admin.chavesgu.com/upload">
        <Button type="primary" size="large">上传头像</Button>
      </Upload>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "admin",
    metaInfo:{
      titleTemplate:'%s - admin'
    },
    data() {
      return {
        profileUrl:null
      }
    },
    computed:{
      ...mapGetters({
        apiUrl:'apiUrl'
      }),
      user(){
        return this.$route.params.userName || '';
      }
    },
    created() {

    },
    methods:{
      upload(file){
        let render = new FileReader();
        render.readAsDataURL(file);
        render.onloadend = () =>{
          let type = render.result.split(',')[0].split('/')[1].split(';')[0];
          let base64data = render.result.split(',')[1];

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
    .upload{
      width: 100%;
      height: 100px;
      line-height: 100px;
    }
  }
</style>
