import { App, defineAsyncComponent } from 'vue'

const components = import.meta.glob('./*/index.vue')

export default {
  install(Vue: App) {
    for (const path in components) {
      const modulesConent: any = components[path]
      const name = path.split('/')[1]

      Vue.component(name, defineAsyncComponent(modulesConent))
    }
  }
}
