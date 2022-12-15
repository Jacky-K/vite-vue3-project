import { defineStore } from 'pinia'
import { localStorage } from '@/utils/storage'
import { AppState } from './types'

export default defineStore({
  id: 'app',
  state: (): AppState => ({
    sidebar: {
      opened: localStorage.get('sidebarStatus') || true
    }
  }),
  actions: {
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened
      if (this.sidebar.opened) {
        localStorage.set('sidebarStatus', true)
      } else {
        localStorage.set('sidebarStatus', false)
      }
    }
  }
})
