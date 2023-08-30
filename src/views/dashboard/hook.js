import { ref, watch } from 'vue'
export default function () {
  const count = ref(0)

  watch(count, (val) => {
    console.log(val)
  })
  return {
    count
  }
}
