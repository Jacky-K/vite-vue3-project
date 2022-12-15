<template>
  <div class="sidebar-container">
    <!-- <el-button>Logo</el-button> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="item in asyncRoutes"
          :key="item.path"
          :item="item"
          :base-path="item.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import variables from '@/styles/variables.module.scss'
import useStore from '@/store'
import SidebarItem from './SidebarItem.vue'

const { app, permission } = useStore()
const route = useRoute()

const activeMenu = computed(() => {
  const { path } = route
  return path
})
const isCollapse = computed(() => !app.sidebar.opened)
const asyncRoutes = computed(() => permission.asyncRoutes)
</script>

<style lang="scss" scoped></style>
