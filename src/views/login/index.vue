<template>
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-form">
        <div class="title-container">
          <span class="logo" />
        </div>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          autocomplete="off"
          label-position="left"
        >
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="email" />
            </span>
            <el-input
              type="text"
              name="username"
              style="position: fixed; left: -99999px"
            />
            <el-input
              ref="username"
              v-model.trim="loginForm.username"
              placeholder="登录邮箱"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="off"
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              type="password"
              name="password"
              style="position: fixed; left: -99999px"
            />
            <el-input
              :key="passwordType"
              ref="passwordRef"
              v-model.trim="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="off"
              @keyup="checkCapslock"
              @keyup.enter="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon
                :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
              />
            </span>
          </el-form-item>

          <div
            class="flex"
            style="margin-bottom: 24px; height: 24px; text-align: right"
          >
            <el-button type="primary" link style="font-size: 12px">
              忘记密码？
            </el-button>
          </div>
          <el-button
            :loading="loading"
            type="primary"
            class="login-btn"
            @click.prevent="handleLogin"
            >登 录
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, toRefs, nextTick } from 'vue'

// 组件依赖
import { ElForm, ElInput } from 'element-plus'
import router from '@/router'

// 状态管理依赖
import useStore from '@/store'

// API依赖
import { useRoute } from 'vue-router'

const { user } = useStore()
const route = useRoute()

const loginFormRef = ref(ElForm)
const passwordRef = ref(ElInput)

const state = reactive({
  redirect: '',
  loginForm: {
    username: '',
    password: ''
  },
  loginRules: {
    username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }]
  },
  loading: false,
  passwordType: 'password',
  verifyCodeImgUrl: '',
  // 大写提示禁用
  capslockTooltipDisabled: true,
  otherQuery: {},
  clientHeight: document.documentElement.clientHeight,
  showCopyright: true
})

function validatePassword(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('请输入密码且不少于六位'))
  } else {
    callback()
  }
}

const { loginForm, loginRules, loading, passwordType } = toRefs(state)

function checkCapslock(e: any) {
  const { key } = e
  state.capslockTooltipDisabled =
    key && key.length === 1 && key >= 'A' && key <= 'Z'
}

function showPwd() {
  if (state.passwordType === 'password') {
    state.passwordType = ''
  } else {
    state.passwordType = 'password'
  }
  nextTick(() => {
    passwordRef.value.focus()
  })
}

function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      state.loading = true
      user
        .login(state.loginForm)
        .then(() => {
          router.push({ path: '/' })
          state.loading = false
        })
        .catch(() => {
          state.loading = false
        })
    } else {
      return false
    }
  })
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #303133;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input .el-input__wrapper .el-input__inner {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 36px;
    flex: 1;
    .el-input__wrapper {
      padding: 0;
      background: transparent;
      box-shadow: none;
      .el-input__inner {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        color: $cursor;
        height: 36px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $light_gray inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
  }
  .el-input__inner {
    background: transparent;
  }

  .el-form-item {
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    color: #454545;
  }
  .el-form-item__content {
    // background: #fff;
    height: 42px;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
}

.login-container {
  min-height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-image: url('../../assets/images/bg.png');
  background-repeat: no-repeat;
  background-size: cover;
  .logo {
    background: url('../../assets/images/logo_2.svg') center no-repeat;
    background-size: 100%;
    width: 220px;
    height: 30px;
    display: inline-block;
    position: relative;
    top: 5px;
    // margin-right: 8px;
  }
  .login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 48px;
    // margin: 0 auto;
    overflow: hidden;
    width: 420px;
    // height: 377px;
    background: #ffffff;

    border-radius: 8px;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 4px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    position: relative;
    margin-right: 20px;
    &::after {
      position: absolute;
      content: '';
      width: 1px;
      height: 14px;
      background: #f2f2f2;
      right: -8px;
      top: 14px;
    }
  }

  .title-container {
    position: relative;
    text-align: center;
    margin-bottom: 36px;
    .title {
      font-size: 24px;
      font-family: PingFang SC, PingFang SC-Bold;
      font-weight: 700;
      color: #303133;
    }
  }

  .show-pwd {
    position: relative;
    right: 10px;
    top: 5px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login-btn {
  height: 42px;
  width: 100%;
  font-weight: 700;
  font-size: 14px;
}
</style>
