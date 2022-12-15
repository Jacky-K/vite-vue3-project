<script setup lang="ts">
import { ref } from 'vue'
import useStore from '@/store'

const store = useStore().user

defineProps<{ msg: string }>()

const count = ref(0)

const add = () => {
  count.value++
  store.name = 'kj'
}
</script>

<template>
  <h1>{{ msg }}</h1>
  <h2>{{ store.name }}</h2>
  <el-select></el-select>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<style lang="scss" scoped>
.test {
  a {
    color: green;
  }
}
</style>
