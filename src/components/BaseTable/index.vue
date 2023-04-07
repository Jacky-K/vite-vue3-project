<template>
  <el-table
    ref="tableRef"
    :data="data"
    :column="column"
    :max-height="`calc(100% - 38px)`"
  >
    <el-table-column
      v-for="item in column"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      v-bind="{ ...item }"
    >
      <template #default="scope">
        <template v-if="item.slot">
          <slot :name="item.prop" :scope="scope" />
        </template>
        <template v-else>{{ scope.row[item.prop] }}</template>
      </template>
    </el-table-column>
    <template #empty>
      <el-empty :image-size="200" />
    </template>
  </el-table>
  <Pagination v-if="pagination" :total="total" v-bind="$attrs" />
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

defineProps({
  data: {
    type: Array,
    default: () => []
  },
  column: {
    type: Array,
    default: () => []
  },
  pagination: {
    type: Boolean,
    default: true
  }
})
const tableRef = ref(null)
const maxHeight = ref()

onMounted(() => {
  console.log(tableRef.value.$el.offsetTop)
  maxHeight.value = window.innerHeight - tableRef.value.$el.offsetTop - 150
  console.log(maxHeight.value, 'maxHeight')
})
</script>
