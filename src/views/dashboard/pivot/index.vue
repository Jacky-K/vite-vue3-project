<template>
  <div class="page-container">
    <el-input placeholder="请输入" />
    <div>
      <el-button @click="startRequest">开始请求</el-button>
      <el-button @click="cancelRequest">取消请求</el-button>
    </div>
    <div
      v-cancelRequest="{ loading, callback: cancelRequest }"
      class="page-main"
    >
      <BaseTable
        :data="tableData"
        :columns="columns"
        :total="tableData.length"
        pagination
      >
        <template #dateHeader="{ column }">
          <template v-if="column.property === 'date'">
            日期(自定义插槽--表头)
          </template>
        </template>

        <template #date="{ row }"> 自定义插槽--- {{ row.date }} </template>
        <template #operation>
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="danger" size="small">删除</el-button>
        </template>
      </BaseTable>
    </div>

    <!-- <InputModel v-model="obj" /> -->
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import InputModel from './InputModel.vue'
import useHooks from '../hook'
import { getUserInfo } from '@/api/user'

const { count } = useHooks()

const handleAdd = () => {
  count.value++
}
const tableData = []
for (let index = 0; index < 100; index++) {
  tableData.push({
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles'
  })
}

const columns = [
  {
    prop: 'date',
    label: '日期',
    fixed: true,
    headerSlot: true,
    slot: true
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

const loading = ref(true)
const cancelTest = ref(null)

onMounted(() => {
  startRequest()
})

/**
 * @description: 取消请求demo
 * @return {*}
 */
const startRequest = () => {
  const params = {
    cancelCallback: cancelRequestCb
  }
  loading.value = true
  getUserInfo(params)
}

const cancelRequestCb = (cancel) => {
  cancelTest.value = cancel
}

const cancelRequest = () => {
  cancelTest.value && cancelTest.value()
  loading.value = false
}
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
