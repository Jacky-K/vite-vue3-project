<template>
  <el-color-picker
    v-model="theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
      '#847bff'
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { mix } from '@/utils'
import { localStorage } from '@/utils/storage'
import useStore from '@/store'

const node = document.documentElement
const { setting } = useStore()
const theme = computed(() => setting.theme)

// 白色混合色
const mixWhite = '#ffffff'
// 黑色混合色
const mixBlack = '#000000'

watch(
  theme,
  (color: string) => {
    node.style.setProperty('--el-color-primary', color)
    localStorage.set('theme', color)

    for (let i = 1; i < 10; i += 1) {
      node.style.setProperty(
        `--el-color-primary-light-${i}`,
        mix(color, mixWhite, i * 0.1)
      )
    }
    node.style.setProperty(
      '--el-color-primary-dark-2',
      mix(color, mixBlack, 0.1)
    )
  },
  { immediate: true }
)
</script>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
