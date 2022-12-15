import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { PermissionState } from './types'
import { getUserMenu } from '@/api/user'
import { constantRoutes } from '@/router'
export const Layout = () => import('@/layout/index.vue')

const modules = import.meta.glob('../../views/**/**.vue')

export default defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    routes: [],
    asyncRoutes: []
  }),
  actions: {
    getAsyncMenu() {
      return new Promise((resolve) => {
        getUserMenu().then((res) => {
          // 后端返回的路由菜单
          const asyncRoutes = filterAsyncRoutes(res.data)

          // 根据自己项目设置动态路由
          this.asyncRoutes = getFinalRouters(asyncRoutes)
          // this.asyncRoutes = asyncRoutes
          // concat静态路由
          this.routes = constantRoutes.concat(this.asyncRoutes)

          resolve(this.asyncRoutes)
        })
      })
    }
  }
})

function getFinalRouters(data: RouteRecordRaw[]) {
  const routes = [] as any

  data.forEach((val) => {
    const item = { ...val } as any
    if (item.type !== 1) {
      routes.push(item)
    }

    if (item.children) {
      item.children = getFinalRouters(item.children)
    }
  })
  return routes
}

export const filterAsyncRoutes = (routes: RouteRecordRaw[]) => {
  const res = [] as any
  routes.forEach((route) => {
    const tmp = { ...route } as any
    if (tmp.parent_id === '') {
      tmp.component = Layout
    } else {
      let sub_view = tmp.path
      sub_view = sub_view.replace(/^\/*/g, '')
      if (sub_view) {
        tmp.component = modules[`../../views/${sub_view}/index.vue`]
      }
    }

    // 根据自己项目中的字段
    if (tmp.authInfoVoList) {
      tmp.children = filterAsyncRoutes(tmp.authInfoVoList)
      delete tmp.authInfoVoList
    }
    res.push(tmp)
  })
  return res
}
