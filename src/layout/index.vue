<template>
  <div class="main-wrapper">
    <Sidebar />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
</script>

<style lang="scss" scoped>
.main-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
