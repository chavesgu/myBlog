<template>
  <div class="admin">
    <h1>admin:{{user}}</h1>
    <div class="profile">
      <img src="" ref="photo" alt="" v-if="profileUrl">
      <i class="iconfont chaves-profile1" v-else></i>
    </div>
    <div class="upload">
      <Upload class="area" ref="upload" name="uploadImg" type="drag"
              :show-upload-list="false" :before-upload="upload"
              :format="['jpg','jpeg','png','gif']"
              :max-size="4096"
              :on-format-error="uploadFormatError"
              :on-exceeded-size="uploadMaxSize"
              action="https://admin.chavesgu.com/upload">
        <Button size="large">选择或拖拽头像图片</Button>
      </Upload>
      <p class="file-txt" v-if="file!==null">{{file.name}}</p>
      <div class="progress">
        <Progress :percent="uploadPercent" :stroke-width="10" v-if="file!==null"></Progress>
      </div>
      <Button type="primary" :disabled="!canUpload" @click="startUpload">开始上传</Button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as qiniu from 'qiniu-js'
  import myCookie from '@/assets/utils/cookie'
  export default {
    name: "admin",
    metaInfo:{
      titleTemplate:'%s - admin'
    },
    data() {
      return {
        file:null,
        canUpload:false,
        uploadToken:null,
        uploadPercent:0,
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
    mounted() {
      this.profileUrl = "//profile.chavesgu.com/"+myCookie.getItem('user')+'.jpg?time='+(+new Date());

      this.$nextTick(_=>{
        this.$refs.photo.src = this.profileUrl;
        this.$refs.photo.onerror = ()=> {
          this.profileUrl = null;
          console.clear();
          return false;
        }
      });
    },
    methods:{
      upload(file){
        this.$store.dispatch('info/qiniuToken',file).then(res=>{
          if (res.code===0){
            this.file = file;
            this.uploadToken=res.uploadToken;
            this.canUpload = true;
          }
          if (res.code===-1) {
            this.$Modal.error({
              title:'Message',
              content:res.msg
            })
          }
        }).catch(err=>{
          this.$Modal.error({
            title:'Message',
            content:err
          })
        });

        return false;
      },
      startUpload(){
        let filename = myCookie.getItem('user')+'.jpg';
        let newfile = new File([this.file ], filename,{type:"image/jpg"});

        let observable = qiniu.upload(
          newfile,
          newfile.name,
          this.uploadToken,
          {},
          {
            useCdnDomain: true,
            region: qiniu.region.z0
          }
        );
        let _this = this;
        let subscription = observable.subscribe({
          next(res){
            // ...
            _this.uploadPercent = res.total.percent;
          },
          error(err){
            // ...
            console.log(err);
          },
          complete(res){
            // ...
            console.log(res);
            _this.profileUrl = "//profile.chavesgu.com/"+myCookie.getItem('user')+'.jpg?time='+(+new Date());
            _this.canUpload = false;
            window.location.reload(true);
          }
        })
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
      margin: 0 auto;
      width: 300px;
      height: 100px;
      .area{
        height: 100px;
        line-height: 100px;
        margin-bottom: 30px;
      }
      .file-txt{
        width: 100%;
        text-align: center;
        height: auto;
        margin: 20px 0;
      }
      .progress{
        margin-bottom: 20px;
      }
    }
  }
</style>
