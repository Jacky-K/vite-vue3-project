<template>
  <div class="main-wrapper" :class="{ hideSidebar: !app.sidebar.opened }">
    <Sidebar />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
    <RightPanel>
      <settings />
    </RightPanel>
  </div>
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar/index.vue'
import Navbar from './components/Navbar.vue'
import Settings from './components/Settings/index.vue'

import useStore from '@/store'

const { app } = useStore()
</script>

<style lang="scss" scoped>
.main-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
