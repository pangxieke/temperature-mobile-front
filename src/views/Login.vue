<template>
  <div class="login">
    <div class="tip">
      <p>请先登录</p>
    </div>
    <div class="form">
      <div class="form-content">
        <van-field clearable v-model="mobile" type="tel" placeholder="请输入手机号" />
        <van-field clearable v-model="code" type="tel" ref="code" placeholder="请输入验证码">
          <template #button>
            <van-button
              round
              disabled
              v-if="hasSent"
              size="small"
              type="info"
              color="linear-gradient(to right, #1BB3EC, #477AFB)"
              @click="getVerificationCode"
            >
              重新获取{{ remainSeconds }}s
            </van-button>
            <van-button
              round
              v-else
              size="small"
              type="info"
              color="linear-gradient(to right, #1BB3EC, #477AFB)"
              @click="getVerificationCode"
            >
              获取验证码
            </van-button>
          </template>
        </van-field>
        <van-button
          block
          round
          type="info"
          color="linear-gradient(to right, #1BB3EC, #477AFB)"
          style="margin-top: 50px;"
          @click="login"
        >
          登 录
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      mobile: '',
      code: '',
      remainSeconds: 30,
      hasSent: false
    }
  },
  methods: {
    isMobile() {
      return /^1\d{10}$/g.test(this.mobile)
    },
    isCode() {
      return /^\d{6}$/g.test(this.code)
    },
    countdown() {
      this.remainSeconds--
      if (this.remainSeconds > 0) {
        window.setTimeout(this.countdown, 1000)
      } else {
        this.hasSent = false
      }
    },
    async getVerificationCode() {
      if (!this.isMobile()) {
        this.$toast('请输入正确的手机号')
        return
      }

      try {
        const res = await this.$api.getVerificationCode({ mobile: this.mobile })
        if (res.code === 0) {
          this.$notify({ type: 'success', message: '短信验证码已发送' })
          this.$refs.code.focus()
          this.hasSent = true
          this.countdown()
        } else {
          this.$notify({ type: 'error', message: res.msg })
        }
      } catch (e) {
        this.$notify({ type: 'danger', message: e.msg })
      }
    },
    async login() {
      if (!(this.isMobile() || this.isCode())) {
        this.$toast('请输入正确的手机号或验证码')
        return
      }

      try {
        const res = await this.$api.login({
          mobile: this.mobile,
          code: this.code
        })
        if (res.code === 0) {
          localStorage.setItem('token', res.data.token)
          this.$router.replace('/me')
        }
      } catch (e) {
        this.$notify({ type: 'danger', message: e.msg })
      }
    }
  }
}
</script>

<style lang="less">
.login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background: url('../assets/login-bg@2x.jpg') center no-repeat;
  background-size: cover;
  z-index: 22;

  .tip {
    margin-top: 130px;
    padding: 0 52px;

    p {
      font-size: 21px;
      color: #fff;
    }
  }

  .form {
    padding: 0 35px;

    .form-content {
      margin-top: 35px;
      padding: 30px 15px 45px;
      background-color: #fff;
      border-radius: 10px;
    }
  }
}
</style>
