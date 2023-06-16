<template>
  <div>
    <el-input v-model="model.name" />
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return new Proxy(props.modelValue, {
      set(obj, key, val) {
        emit('update:modelValue', {
          ...obj,
          [key]: val
        })
        return true
      }
    })
  },
  set(val) {
    emit('update:modelValue', val)
  }
})

watch(
  () => model.value.name,
  (val) => {
    console.log(props.modelValue)
  }
)
</script>
