# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## 项目介绍

   是基于 [vue3-element-admin]升级的 Vue3 版本有来商城管理前端工程；使用前端主流技术栈 Vue3 + Vite3 + TypeScript + Vue Router + Pinia + Volar + Element Plus 等；实现功能包括不限于动态权限路由、动态添加全局公共组件。


## 技术栈

| 技术栈       | 描述                                   | 官网                                 |
| ------------ | -------------------------------------- | ------------------------------------ |
| Vue3         | 渐进式 JavaScript 框架                 | https://v3.cn.vuejs.org/             |
| TypeScript   | JavaScript 的一个超集                  | https://www.tslang.cn/               |
| Vite        | 前端开发与构建工具                     | https://cn.vitejs.dev/               |
| Element Plus | 基于 Vue 3，面向设计师和开发者的组件库 | https://element-plus.gitee.io/zh-CN/ |
| Pinia        | 新一代状态管理工具                     | https://pinia.vuejs.org/             |
| Vue Router   | Vue.js 的官方路由                      | https://router.vuejs.org/zh/         |
                                             |

## 启动部署

### 环境准备

- 安装 Node

  版本：≥v14.0.0

- 开发工具

  VSCode

- 必装插件

  - Vue Language Features (Volar) 
  - TypeScript Vue Plugin (Volar)


### 项目启动

1. npm install
2. npm run dev
3. 浏览器访问 http://localhost:8080


### 项目部署

- 本地打包

  ```
  npm run build:prod
  ```

  生成的静态文件位于项目根目录 dist 文件夹下

  ```