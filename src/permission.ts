import router from '@/router'
import { ElMessage } from 'element-plus'
import { Page404 } from '@/router'
import getPageTitle from '@/utils/get-page-title'
import useStore from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }) // 进度环显示/隐藏

function getPathList(list: [], paths: any, prefix: any) {
  list.forEach((item: any) => {
    if (item.children && item.children.length > 0) {
      getPathList(item.children, paths, `${prefix}${item.path}`)
    } else {
      // if (prefix === '/') prefix = ''
      if (item.path[0] === '/') {
        paths.push(item.path)
      } else {
        paths.push(`${prefix}/${item.path}`)
      }
    }
  })
  return paths
}

// 白名单路由
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.name)
  const { user, permission } = useStore()
  const hasToken = user.token
  if (hasToken) {
    // 登录成功，跳转到首页
    if (to.path === '/login') {
      next({ path: '/login' })
      NProgress.done()
      await user.resetToken()
    } else {
      if (user.role_type !== '') {
        next()
      } else {
        try {
          await user.getUserInfo()
          const accessRoutes: any = await permission.getAsyncMenu()
          accessRoutes.forEach((route: any) => {
            router.addRoute(route)
          })

          router.addRoute(Page404)
          const pathList = getPathList(accessRoutes, [], '')

          if (!pathList.includes(to.path)) {
            next({
              ...to,
              path: pathList[0],
              replace: true
            })
          } else {
            next({ ...to, replace: true })
          }
        } catch (error) {
          // 移除 token 并跳转登录页
          await user.resetToken()
          ElMessage.error((error as any) || 'Has Error')
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录可以访问白名单页面(登录页面)
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
