<template>
  <div class="login_page">
    <div class="login_box">
      <div class="center_box">
        <!-- 登录&注册-->
        <div :class="{login_form: true, rotate: tab === 2}">
          <div :class="{tabs: true, r180: reverse === 2}">
            <div class="fl tab" @click="changetab(1)">
              <span :class="{on: tab === 1}">登录</span>
            </div>
            <div class="fl tab" @click="changetab(2)">
              <span :class="{on: tab === 2}">注册</span>
            </div>
          </div>
          <!-- 登录 -->
          <div class="form_body" v-if="reverse === 1">
            <form @submit.prevent="loginSubmit">
              <input type="text" v-model="loginData.username" placeholder="请输入用户名" autocomplete="off">
              <input type="password" v-model="loginData.password" placeholder="请输入密码" autocomplete="off">
              <div class="error_msg">{{ loginMessage }}</div>
              <input type="submit" v-if="subState" disabled="disabled" value="登录中···" class="btn"/>
              <input type="submit" v-else value="登录" @submit="loginSubmit" class="btn"/>
            </form>
          </div>
          <!-- 注册 -->
          <div class="form_body r180" v-if="reverse === 2">
            <form @submit.prevent="regSubmit">
              <input type="text" v-model="registerData.username" placeholder="请输入用户名" autocomplete="off">
              <input type="password" v-model="registerData.password" placeholder="6-30位密码，可用数字/字母/符号组合"
                     autocomplete="off">
              <input type="password" v-model="registerData.repassword" placeholder="确认密码">
              <div class="error_msg">{{ regMessage }}</div>
              <div class="agree">
                <input type="checkbox" id="tongyi" v-model="registerData.check">
                <label for="tongyi">我已经阅读并同意</label><a href="javascript:;" @click="xieyi = true">《用户协议》</a>
              </div>
              <input type="submit" v-if="subState" disabled="disabled" value="提交中···" class="btn">
              <input type="submit" v-else value="注册" class="btn">
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- 用户协议 -->
    <div class="xieyi" v-if="xieyi" @click.self="xieyi = false">
      <div class="xieyi_content">
        <div class="xieyi_title">请认真阅读用户协议</div>
        <div class="xieyi_body" v-if="xieyiContent" v-html="xieyiContent">
        </div>
        <input type="button" class="xieyi_btn" value="确定" @click="xieyi = false">
      </div>
    </div>
  </div>
</template>
<script>
import {isvalidUsername} from "@/utils/validate";
import {getXieyi, usernameExists, register} from "@/api/auth";

export default {
  data() {
    return {
      tab: 1, // 高亮当前标签名
      reverse: 1, // 旋转 1 登录，2 注册
      loginMessage: '', // 登录错误提示信息
      regMessage: '', // 注册错误提示信息
      subState: false, // 提交状态
      xieyi: false, // 显示隐藏协议内容
      xieyiContent: null, // 协议内容
      redirectURL: '//www.baldbear.cn', // 登录成功后重写向地址
      loginData: { // 登录表单数据
        username: '',
        password: ''
      },
      registerData: { // 注册表单数据
        username: '',
        password: '',
        repassword: '',
        check: false
      },
    }
  },

  async created() {
    if (this.$route.query.redirectURL) {
      this.redirectURL = this.$route.query.redirectURL
    }
    const xieYiContent = await getXieyi()
    this.xieyiContent = xieYiContent
  },
  methods: {
    // 切换标签
    changetab(int) {
      this.tab = int;
      setTimeout(() => {
        this.reverse = int
      }, 200)
    },
    // 提交登录
    loginSubmit() {
      // 处于提交状态
      if (this.subState)
        return false
      if (!isvalidUsername(this.loginData.username) || this.loginData.password.length < 6) {
        this.loginMessage = '用户名或密码不正确'
        return false
      }
      this.loginMessage = ''
      this.subState = true //提交中
      this.$store.dispatch('toLogin', this.loginData).then(res => {
        const {code, message} = res
        if (code === 20000) {
          // 登陆成功，跳转到原页面
          window.location.href = this.redirectURL
        } else {
          //登陆失败
          this.loginMessage = message
        }
        this.subState = false

      }).catch(() => {
        this.subState = false
        this.loginMessage = '系统繁忙，请稍后再试'
      })
    },
    // 提交注册
    async regSubmit() {
      // 处于提交状态
      if (this.subState)
        return false

      if (!this.registerData.check) {
        this.regMessage = '请阅读并同意协议'
        return false
      }
      if (!isvalidUsername(this.registerData.username)) {
        this.regMessage = '请输入4-20位用户名，中文，数字，字母'
        return false
      }
      const {code, message, data} = await usernameExists(this.registerData.username)

      if (code !== 20000) {
        this.regMessage = message
        return false
      }
      if (data) {
        this.regMessage = '用户名已存在，请重新输入用户名'
        return false
      }
      if (this.registerData.password.length < 6 || this.registerData.password.length > 18) {
        this.regMessage = '密码长度应该在6-18位，且不能包含空格'
        return false
      }
      if (this.registerData.password !== this.registerData.repassword) {
        this.regMessage = '两次密码不一致'
        return false
      }
      this.loginMessage = ''
      this.subState = true //提交中
      register(this.registerData).then(res => {
        if (res.code === 20000) {
          this.regMessage = '注册成功'
          setTimeout(() => {
            location.reload()
          }, 500)
        } else {
          this.regMessage = res.message
        }
        this.subState = false
      }).catch(() => {
        this.subState = false
        this.regMessage = '系统繁忙，请稍后再试'
      })
    }
  },
}
</script>
<style scoped>
@import '../../assets/style/login.css';
</style>

