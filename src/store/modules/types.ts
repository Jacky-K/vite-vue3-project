import { RouteRecordRaw } from 'vue-router'

export interface UserState {
  username: string
  token: string
  role_type: string
}

export interface LoginDataForm {
  username: string
  password: string
}

export interface PermissionState {
  routes: RouteRecordRaw[]
  asyncRoutes: Array<any>
}

export interface AppState {
  sidebar: {
    opened: boolean
  }
}
