import useUserStore from './modules/user'
import usePermissionStore from './modules/permission'
import useAppStore from './modules/app'
import useSettingStore from './modules/setting'

const useStore = () => ({
  user: useUserStore(),
  permission: usePermissionStore(),
  app: useAppStore(),
  setting: useSettingStore()
})

export default useStore
// 自动导入
// const modulesFiles = import.meta.glob('./modules/*.ts', { eager: true })

// const modules = Object.keys(modulesFiles).reduce(
//   (modules: { [key: string]: any }, path: string) => {
//     const moduleName = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
//     modules[moduleName] = (modulesFiles[path] as any).default
//     return modules
//   },
//   {}
// )

// console.log(modules)
