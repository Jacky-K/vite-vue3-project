<template>
  <el-table ref="tableRef" :data="data">
    <el-table-column
      v-for="item in columns"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
      v-bind="{ ...item }"
    >
      <template #header="{ column }">
        <slot
          v-if="item.headerSlot"
          :name="`${item.prop}Header`"
          :column="column"
        />
        <span v-else>{{ column.label }}</span>
      </template>

      <template #default="scope">
        <slot v-if="item.slot" :name="item.prop" v-bind="scope" />
        <span v-else>{{ scope.row[item.prop] }}</span>
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
  columns: {
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
