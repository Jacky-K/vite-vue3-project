import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import '@/styles/theme-light.scss'
import '@/styles/theme-dark.scss'
import '@/styles/index.scss'

import '@/permission'
// 自动注册全局组件
import components from './components'

// 引入svg注册脚本
import 'virtual:svg-icons-register'

import * as directive from './directive'
const app = createApp(App)

// 注册全局自定义指令
Object.keys(directive).forEach((item) => {
  app.directive(item, directive[item])
})

app
  .use(components)
  .use(ElementPlus, { locale: zhCn })
  .use(createPinia())
  .use(router)
  .use(components)
  .mount('#app')
