import { defineStore } from 'pinia'
import { SettingState } from './types'
import { localStorage } from '@/utils/storage'
import defaultSettings from '../../settings'

const { showSettings } = defaultSettings
const el = document.documentElement

export default defineStore({
  id: 'setting',
  state: (): SettingState => ({
    theme:
      localStorage.get('theme') ||
      getComputedStyle(el).getPropertyValue(`--el-color-primary`),
    showSettings: showSettings
  }),
  actions: {
    async changeSetting(payload: { key: string; value: any }) {
      const { key, value } = payload
      switch (key) {
        case 'theme':
          this.theme = value
          break
        case 'showSettings':
          this.showSettings = value
          break
      }
    }
  }
})
