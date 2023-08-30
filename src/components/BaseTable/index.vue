<template>
  <el-table ref="tableRef" :data="data" :column="column">
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

<script setup>
import { ref } from 'vue'

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
  },
  total: {
    type: [String, Number],
    default: 0
  }
})
const tableRef = ref(null)
</script>
