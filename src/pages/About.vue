<template>
  <section class="about">
    <Card class="card">
      <p slot="title"><i class="iconfont chaves-make"></i>网站制作</p>
      <p>前端编码：<a href="https://github.com/guchunwen" target="_blank">@chaves</a></p>
      <p>后端编码：<a href="https://github.com/guchunwen" target="_blank">@chaves</a></p>
      <p>页面风格：<a href="https://www.iviewui.com" target="_blank">@Iview</a></p>
      <p>logo以及title-icon设计：<a href="http://www.zcool.com.cn/u/14228135" target="_blank">@Arey睿</a></p>
    </Card>
    <Card class="card">
      <p slot="title"><i class="iconfont chaves-contact"></i>联系站长</p>
      <p><i class="iconfont chaves-email"></i> chavesgu@qq.com / mail@chavesgu.com</p>
      <p><i class="iconfont chaves-qq"></i> <a href="http://wpa.qq.com/msgrd?v=3&uin=595077937&site=qq&menu=yes" target="_blank">在线联系qq</a></p>
      <p><i class="iconfont chaves-wechat"></i> <a href="javascript:;" @click="wechat = true">@chaves</a></p>
    </Card>
    <Modal v-model="wechat" width="360">
      <p slot="header" style="text-align:center">
        <span>微信二维码</span>
      </p>
      <div style="text-align:center">
        <img src="http://images.chavesgu.com/wechat.jpg" alt="" style="width: 100%;">
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long @click="wechat = false">确认</Button>
      </div>
    </Modal>
  </section>
</template>

<script>
    export default {
        name: "about",
      metaInfo:{
        titleTemplate:'%s - about'
      },
      data(){
          return{
            wechat:false
          }
      }
    }
</script>

<style scoped lang="less">
  .about{
    width: 900px;
    margin: 0 auto;
    padding: 30px 0;
    .card{
      margin-bottom: 30px;
      &:last-child{
        margin-bottom: 0;
      }
      i{
        font-size: 18px;
        line-height: 20px;
      }
    }
  }
</style>
