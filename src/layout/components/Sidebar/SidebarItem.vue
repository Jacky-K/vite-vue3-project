<template>
  <div v-if="!item.hidden" class="sub-menu">
    <template v-if="hasOneShowingChild(item.children, item)">
      <app-link v-if="onlyOneChild.name" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <template #title>
            <div class="el-submenu-content">
              <svg-icon
                v-if="onlyOneChild.code"
                :icon-class="onlyOneChild.code"
              ></svg-icon>
              <span>{{ onlyOneChild.name }}</span>
            </div>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)">
      <template #title>
        <div class="menu-title">
          <svg-icon v-if="item.code" :icon-class="item.code"></svg-icon>
          <span>{{ item.name }}</span>
        </div>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.code"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import path from 'path-browserify'
import { isExternal } from '@/utils/validate'
import AppLink from './Link.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    required: false
  },
  basePath: {
    type: String,
    required: true
  }
})

const onlyOneChild = ref()

function hasOneShowingChild(children = [] as any, parent: any) {
  if (!children) {
    children = []
  }
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

function resolvePath(routePath: string) {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>
