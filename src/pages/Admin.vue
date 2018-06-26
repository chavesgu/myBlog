<template>
  <div class="admin">
    <h1 style="line-height: 30px;">account:{{user}}</h1>
    <div class="profile">
      <img src="" ref="photo" alt="" v-if="profileUrl">
      <i class="iconfont chaves-profile1" v-else></i>
    </div>
    <div class="upload">
      <el-upload class="area" ref="upload"
              :show-file-list="false"
              :before-upload="upload"
              action="https://admin.chavesgu.com/upload">
        <el-button size="large">选择头像图片</el-button>
      </el-upload>
      <p class="file-txt" v-if="file!==null">{{file.name}}</p>
      <div class="progress">
        <el-progress :percentage="uploadPercent" :color="progressColor" :stroke-width="10" v-if="file!==null"></el-progress>
      </div>
      <el-button type="primary" :disabled="!canUpload" @click="startUpload">开始上传</el-button>
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
    beforeRouteEnter (to, from, next) {
      if (to.params.userName!==myCookie.getItem("user")) {
        next({name:'admin',params:{userName:myCookie.getItem("user")}});
      }else {
        next();
      }
    },
    data() {
      return {
        file:null,
        canUpload:false,
        uploadToken:null,
        uploadPercent:0,
        profileUrl:null,
        progressColor:'#409EFF'
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
        if (file.size/1024/1024 > 2){
          this.uploadMaxSize();
          return false
        }
        if (!/^image\/(jpg|jpeg|png|gif)$/.test(file.type)) {
          this.uploadFormatError();
          return false
        }
        this.$store.dispatch('info/qiniuToken',file).then(res=>{
          if (res.code===0){
            this.file = file;
            this.filename = myCookie.getItem('user')+'.jpg';
            this.uploadToken=res.uploadToken;
            this.canUpload = true;
          }
          if (res.code===-1) {
            this.$alert(res.msg,{
              title:'Message',
              type:'error'
            })
          }
        }).catch(err=>{
          this.$alert(err.toString(),{
            title:'Message',
            type:'error'
          })
        });
        return false
      },
      startUpload(){
        let newfile = new File([this.file ], this.filename,{type:"image/jpg"});

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
            _this.progressColor = '#67c23a';
            _this.profileUrl = "//profile.chavesgu.com/"+myCookie.getItem('user')+'.jpg?time='+(+new Date());
            _this.canUpload = false;
            window.location.reload();
          }
        })
      },
      uploadFormatError(file) {
        this.$alert('只支持jpg,png,gif格式',{
          title:'Message',
          type:'error'
        })
      },
      uploadMaxSize(file) {
        this.$alert('图片大小不能超过2M',{
          title:'Message',
          type:'error'
        })
      }
    }
  }
</script>

<style scoped lang="scss">
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
