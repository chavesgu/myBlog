<template>
  <div class="hello">
    http://52.187.146.95/



    <div style="width: 58px;height:58px;line-height: 58px;">
      <Upload ref="upload" name="uploadImg" type="drag" :show-upload-list="false" :before-upload="upload"
              :format="['jpg','jpeg','png','gif']"
              :max-size="4096"
              :on-format-error="uploadFormatError"
              :on-exceeded-size="uploadMaxSize"
              action="http://admin.chavesgu.com/upload.php">
        <div style="width: 58px;height:58px;line-height: 58px;">
          <i class="iconfont chaves-account"></i>
        </div>
      </Upload>

    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

    }
  },
  methods:{
    upload(file){
      let render = new FileReader();
      render.readAsDataURL(file);
      render.onloadend = () =>{
        // let type = render.result.split(',')[0].split('/')[1].split(';')[0];
        let base64data = render.result.split(',')[1];
        this.$http.post('http://admin.chavesgu.com/upload.php',{pic:base64data,name:file.name}).then(res=>{
          console.log(res.data);
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
