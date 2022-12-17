<template>
  <div>
    <!-- 弹窗 -->
    <div v-show="visible" >
      <div class="content">
        <span v-text="message"></span>
      </div>
      <!--遮罩层-->
      <div class="mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "refresh",
  data () {
    return {
      visible: 1, // 1 打开弹窗，0 关闭弹窗
      message: '请稍等，正在重新登录...',
      redirectURL: null
    }
  },
  created () {
    this.redirectURL = this.$route.query.redirectURL || '/'
    this.refreshLogin()
  },
  methods: {

    // 刷新令牌登录
    refreshLogin () {
      this.$store.dispatch('toRefresh').then(() =>{
        //登陆成功，回到原页面
        window.location.href = this.redirectURL || '/'
      }).catch(() =>{
        //登陆失败，回到登陆页
        this.message = `您的身份已过期，请点击<a href="/?redirectURL=${this.redirectURL}">重新登录</a>`
      })
    }
  }
}
</script>

<style scoped>
.content {
  position: fixed;
  height: 120px;
  width: 500px;
  line-height: 120px;
  text-align: center;
  font-size: 19px;
  color: #303133;
  background-color: #fff;
  border-radius: 0.25rem;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
a {
  color: #345dc2;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  opacity: 0.5; /* 透明度为50% */
  filter: alpha(opacity=50);
  top: 0;
  left: 0;
  z-index: 999;
  background-color: #000;
}
</style>