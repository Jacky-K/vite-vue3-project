import useUserStore from './modules/user'
import usePermissionStore from './modules/permission'
import useAppStore from './modules/app'

const useStore = () => ({
  user: useUserStore(),
  permission: usePermissionStore(),
  app: useAppStore()
})

export default useStore
