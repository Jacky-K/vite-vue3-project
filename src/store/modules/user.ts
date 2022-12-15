import { defineStore } from 'pinia'
import { login, getUserInfo, getUserMenu } from '@/api/user'
import { localStorage } from '@/utils/storage'
import { UserState, LoginDataForm } from './types'
import { JSEncrypt } from 'jsencrypt'
import { public_key } from '@/utils/encrypt'

const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    username: '',
    token: localStorage.get('token') || '',
    role_type: ''
  }),
  actions: {
    resetToken() {
      return new Promise((resolve) => {
        this.token = ''
        localStorage.remove('token')
        resolve('')
      })
    },
    login(data: LoginDataForm) {
      const { password, username } = data
      return new Promise((resolve) => {
        // 密码加密
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(public_key)
        const encrypt_pwd = encrypt.encrypt(password)
        login({ username, password: encrypt_pwd, save: true }).then((res) => {
          const { data } = res
          localStorage.set('token', data.token)
          this.token = data.token
          resolve(null)
        })
      })
    },
    getUserInfo() {
      return new Promise((resolve) => {
        getUserInfo().then((res) => {
          const { type, name } = res.data
          this.role_type = type
          this.username = name
          resolve(type)
        })
      })
    }
  }
})

export default useUserStore
