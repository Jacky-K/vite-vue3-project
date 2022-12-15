import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/index.css'
import '@/styles/index.scss'
import '@/permission'
// 自动注册全局组件
import components from './components'

// 引入svg注册脚本
import 'virtual:svg-icons-register'

const app = createApp(App)

app
  .use(components)
  .use(ElementPlus)
  .use(createPinia())
  .use(router)
  .use(components)
  .mount('#app')
