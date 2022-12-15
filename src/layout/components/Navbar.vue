<template>
  <div class="navbar-container">
    {{ route.name }}
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
const route = useRoute()
console.log(route.path)
</script>

<style lang="scss" scoped>
.navbar-container {
  height: 50px;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px #00152914;
  padding: 0 20px;
  line-height: 50px;
}
</style>
