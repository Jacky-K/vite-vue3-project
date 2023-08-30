<template>
  <div class="page-container">
    <el-input placeholder="请输入" />
    <div>
      <el-button type="primary">ceshi</el-button>
    </div>
    <div class="page-main">
      <BaseTable
        :data="tableData"
        :column="column"
        :total="tableData.length"
        pagination
      >
        <template #date="{ scope }">
          自定义插槽--- {{ scope.row.date }}
        </template>
        <template #operation>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </BaseTable>
    </div>
    <InputModel v-model="obj" />
    {{ count }}
    <el-button @click="handleAdd">点击</el-button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputModel from './InputModel.vue'
import useHooks from '../hook'

const { count } = useHooks()

const handleAdd = () => {
  count.value++
}
const tableData: any = []
for (let index = 0; index < 100; index++) {
  tableData.push({
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  })
}

const column = [
  {
    prop: 'date',
    label: '日期',
    slot: true,
    fixed: true
  },
  {
    prop: 'name',
    label: '姓名'
  },
  {
    prop: 'address',
    label: '地址'
  },
  {
    prop: 'operation',
    label: '操作',
    slot: true
  }
]

const obj = ref({
  name: '123'
})

console.log(obj)
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.page-main {
  flex: 1;
  overflow: hidden;
}
</style>
