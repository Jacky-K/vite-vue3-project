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
