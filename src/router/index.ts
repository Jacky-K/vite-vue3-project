import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import useStore from '@/store'

export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export const Page404 = {
  path: '/:pathMatch(.*)*',
  name: '404',
  component: () => import('@/views/error-page/404.vue')
}

// 重置路由
export function resetRouter() {
  const { permission } = useStore()
  permission.routes.forEach((route) => {
    const name = route.name
    if (name && router.hasRoute(name)) {
      router.removeRoute(name)
    }
  })
}

export default router
