<template>
  <div class="navbar-container">
    <div class="nav-left">
      <div class="hamburger-container" @click="toggleSidebar">
        <svg
          :class="{ 'is-active': app.sidebar.opened }"
          class="hamburger"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
        >
          <path
            d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span>{{ route.name }}</span>
    </div>
    <div class="nav-right">
      <div class="theme-toggler-content theme-toggler" @click="toggleDark()">
        <button class="switch" role="switch" aria-label="切换暗色主题">
          <div class="switch__action">
            <div class="switch__icon">
              <i class="el-icon" style="font-size: 13px">
                <svg viewBox="0 0 24 24" class="dark-icon">
                  <path
                    d="M11.01 3.05C6.51 3.54 3 7.36 3 12a9 9 0 0 0 9 9c4.63 0 8.45-3.5 8.95-8c.09-.79-.78-1.42-1.54-.95A5.403 5.403 0 0 1 11.1 7.5c0-1.06.31-2.06.84-2.89c.45-.67-.04-1.63-.93-1.56z"
                    fill="currentColor"
                  ></path>
                </svg>
                <svg viewBox="0 0 24 24" class="light-icon">
                  <path
                    d="M6.05 4.14l-.39-.39a.993.993 0 0 0-1.4 0l-.01.01a.984.984 0 0 0 0 1.4l.39.39c.39.39 1.01.39 1.4 0l.01-.01a.984.984 0 0 0 0-1.4zM3.01 10.5H1.99c-.55 0-.99.44-.99.99v.01c0 .55.44.99.99.99H3c.56.01 1-.43 1-.98v-.01c0-.56-.44-1-.99-1zm9-9.95H12c-.56 0-1 .44-1 .99v.96c0 .55.44.99.99.99H12c.56.01 1-.43 1-.98v-.97c0-.55-.44-.99-.99-.99zm7.74 3.21c-.39-.39-1.02-.39-1.41-.01l-.39.39a.984.984 0 0 0 0 1.4l.01.01c.39.39 1.02.39 1.4 0l.39-.39a.984.984 0 0 0 0-1.4zm-1.81 15.1l.39.39a.996.996 0 1 0 1.41-1.41l-.39-.39a.993.993 0 0 0-1.4 0c-.4.4-.4 1.02-.01 1.41zM20 11.49v.01c0 .55.44.99.99.99H22c.55 0 .99-.44.99-.99v-.01c0-.55-.44-.99-.99-.99h-1.01c-.55 0-.99.44-.99.99zM12 5.5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm-.01 16.95H12c.55 0 .99-.44.99-.99v-.96c0-.55-.44-.99-.99-.99h-.01c-.55 0-.99.44-.99.99v.96c0 .55.44.99.99.99zm-7.74-3.21c.39.39 1.02.39 1.41 0l.39-.39a.993.993 0 0 0 0-1.4l-.01-.01a.996.996 0 0 0-1.41 0l-.39.39c-.38.4-.38 1.02.01 1.41z"
                    fill="currentColor"
                  ></path>
                </svg>
              </i>
            </div>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import useStore from '@/store'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  storageKey: 'themeKey',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)

const route = useRoute()
const { app } = useStore()

const toggleSidebar = () => {
  app.toggleSidebar()
}
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 50px;
  position: relative;
  background: var(--el-bg-color);
  box-shadow: 0 1px 4px #00152914;
  line-height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    padding-right: 14px;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  .hamburger.is-active {
    transform: rotate(180deg);
  }
}
.theme-toggler-content {
  color: var(--text-color);
  transition: border-color var(--el-transition-duration),
    background-color var(--el-transition-duration-fast);
  background-color: transparent;
  display: flex;
  align-items: center;
  border-radius: 50%;
  height: 24px;
  padding: 0 12px;
  .switch__icon {
    width: 16px;
    height: 16px;
    position: relative;
  }
  .switch__action {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    background-color: var(--el-bg-color);
    transform: translate(0);
    color: var(--text-color-light);
    transition: border-color var(--el-transition-duration),
      background-color var(--el-transition-duration),
      transform var(--el-transition-duration);
  }
  .switch {
    margin: 0;
    display: inline-block;
    position: relative;
    width: 40px;
    height: 20px;
    border: 1px solid var(--el-border-color);
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    cursor: pointer;
    // background: #fff;
  }
  .switch__icon .el-icon {
    position: absolute;
    left: 1px;
    bottom: 1px;
  }
  .light-icon {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
  }
  .dark-icon {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
  .dark-icon,
  .light-icon {
    transition: color var(--el-transition-duration),
      opacity var(--el-transition-duration);
  }
}
</style>

<style lang="scss">
.dark {
  .switch__action {
    transform: translate(20px) !important;
  }
  .light-icon {
    opacity: 0 !important;
  }
  .dark-icon {
    opacity: 1 !important;
  }
  .switch {
    background: #2c2c2c !important;
  }
}
</style>
