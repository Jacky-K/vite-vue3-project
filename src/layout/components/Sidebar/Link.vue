<template>
  <!-- 外部链接 -->
  <a v-if="isExternal(to)" :href="to" target="_blank" rel="noopener">
    <slot />
  </a>
  <div v-else @click="push">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isExternal } from '@/utils/validate'
import { useRouter } from 'vue-router'

// import useStore from '@/store'

// const { app } = useStore()

// const sidebar = computed(() => app.sidebar)

export default defineComponent({
  props: {
    to: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const router = useRouter()
    const push = () => {
      router.push(props.to).catch((err) => {
        console.log(err)
      })
    }
    return {
      push,
      isExternal
    }
  }
})
</script>
